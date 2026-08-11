import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders, getRequestIP, useSession } from "@tanstack/react-start/server";
import { z } from "zod";
import {
  addReportedGroup,
  getReportedSnapshot,
  isInviteReported,
} from "@/lib/reported-groups.store";
import { clientIpFromHeaders, peekIpQuota, recordIpQuota } from "@/lib/ip-rate-limit.store";

const COOLDOWN_MS = 30_000;

type ReportSession = {
  lastReportAt?: number;
  captchaSum?: number;
  captchaIssuedAt?: number;
};

function sessionPassword() {
  return (
    process.env["REPORT_SESSION_SECRET"] ||
    "dev-only-report-session-secret-change-me-32chars"
  );
}

function sessionConfig() {
  return {
    password: sessionPassword(),
    name: "group-report",
    maxAge: 60 * 60,
  };
}

function resolveIp() {
  try {
    const ip = getRequestIP({ xForwardedFor: true });
    if (ip) return ip;
  } catch {
    /* fall through */
  }
  try {
    return clientIpFromHeaders(getRequestHeaders());
  } catch {
    return "unknown";
  }
}

const reportSchema = z.object({
  groupId: z.string().trim().min(1).max(64),
  inviteCode: z
    .string()
    .trim()
    .min(1)
    .max(128)
    .regex(/^[A-Za-z0-9_-]+$/, "Invalid invite code"),
  reason: z.string().trim().min(1).max(64),
  description: z.string().trim().min(1).max(500),
  captchaAnswer: z.number().int().min(0).max(99),
});

const inviteSchema = z.object({
  inviteCode: z
    .string()
    .trim()
    .min(1)
    .max(128)
    .regex(/^[A-Za-z0-9_-]+$/, "Invalid invite code"),
});

export const getReportChallenge = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<ReportSession>(sessionConfig());
  const a = Math.floor(Math.random() * 6) + 1;
  const b = Math.floor(Math.random() * 6) + 1;
  await session.update({
    ...session.data,
    captchaSum: a + b,
    captchaIssuedAt: Date.now(),
  });

  const last = session.data.lastReportAt ?? 0;
  const remainingMs = Math.max(0, COOLDOWN_MS - (Date.now() - last));
  const quota = await peekIpQuota(resolveIp(), "report");

  return {
    a,
    b,
    remainingMs,
    remainingSeconds: Math.ceil(remainingMs / 1000),
    totalMs: COOLDOWN_MS,
    dailyRemaining: quota.ok ? quota.remaining : 0,
    dailyLimit: quota.limit,
    dailyBlocked: !quota.ok,
    dailyMessage: quota.ok ? "" : quota.message,
  };
});

export const getReportCooldown = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<ReportSession>(sessionConfig());
  const last = session.data.lastReportAt ?? 0;
  const remainingMs = Math.max(0, COOLDOWN_MS - (Date.now() - last));
  return {
    remainingMs,
    remainingSeconds: Math.ceil(remainingMs / 1000),
    totalMs: COOLDOWN_MS,
  };
});

export const getReportedGroups = createServerFn({ method: "GET" }).handler(async () => {
  return getReportedSnapshot();
});

export const checkInviteAllowed = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inviteSchema.parse(data))
  .handler(async ({ data }) => {
    const banned = await isInviteReported(data.inviteCode);
    if (banned) {
      return {
        ok: false as const,
        message: "This group link was reported and removed. It cannot be submitted again.",
      };
    }
    const quota = await peekIpQuota(resolveIp(), "upload");
    if (!quota.ok) {
      return { ok: false as const, message: quota.message, code: quota.code };
    }
    return { ok: true as const, remainingUploads: quota.remaining };
  });

export const submitReport = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => reportSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await useSession<ReportSession>(sessionConfig());
    const last = session.data.lastReportAt ?? 0;
    const remaining = COOLDOWN_MS - (Date.now() - last);

    if (remaining > 0) {
      return {
        ok: false as const,
        remainingMs: remaining,
        remainingSeconds: Math.ceil(remaining / 1000),
        totalMs: COOLDOWN_MS,
        message: "Please wait before submitting another report.",
      };
    }

    const issuedAt = session.data.captchaIssuedAt ?? 0;
    const expected = session.data.captchaSum;
    const captchaFresh = issuedAt > 0 && Date.now() - issuedAt < 10 * 60 * 1000;
    if (!captchaFresh || expected === undefined || data.captchaAnswer !== expected) {
      return {
        ok: false as const,
        remainingMs: Math.max(0, remaining),
        remainingSeconds: Math.ceil(Math.max(0, remaining) / 1000),
        totalMs: COOLDOWN_MS,
        message: "Wrong answer to the verification sum. Please try again.",
      };
    }

    const quota = await peekIpQuota(resolveIp(), "report");
    if (!quota.ok) {
      return {
        ok: false as const,
        code: quota.code as "daily_limit",
        remainingMs: 0,
        remainingSeconds: 0,
        totalMs: COOLDOWN_MS,
        retryAfterMs: quota.retryAfterMs,
        message: quota.message,
      };
    }

    const already = await isInviteReported(data.inviteCode);
    const saved = await addReportedGroup({
      groupId: data.groupId,
      inviteCode: data.inviteCode,
      reason: data.reason,
      description: data.description,
    });
    // Keep the listing record so the group page can show “Reported for review”.
    // Home/category feeds hide it via the reported-codes check.
    const recorded = await recordIpQuota(resolveIp(), "report");

    await session.update({
      lastReportAt: Date.now(),
      captchaSum: 0,
      captchaIssuedAt: 0,
    });

    console.log("[report]", {
      groupId: data.groupId,
      inviteCode: data.inviteCode,
      reason: data.reason,
      already,
    });

    const remoteAlready =
      saved && typeof saved === "object" && "already" in saved
        ? Boolean((saved as { already?: boolean }).already)
        : already;
    const remoteMessage =
      saved && typeof saved === "object" && "message" in saved
        ? String((saved as { message?: string }).message || "")
        : "";

    return {
      ok: true as const,
      remainingMs: COOLDOWN_MS,
      remainingSeconds: Math.ceil(COOLDOWN_MS / 1000),
      totalMs: COOLDOWN_MS,
      message:
        remoteMessage ||
        (remoteAlready
          ? "This group was already reported. It stays removed for everyone."
          : "Thanks — the group was reported and removed for all visitors."),
      inviteCode: data.inviteCode.toLowerCase(),
      groupId: data.groupId,
      dailyRemaining: recorded.ok ? recorded.remaining : 0,
      ...(saved &&
      typeof saved === "object" &&
      "snapshot" in saved &&
      saved.snapshot
        ? { snapshot: (saved as { snapshot: { ids: string[]; codes: string[] } }).snapshot }
        : {}),
    };
  });
