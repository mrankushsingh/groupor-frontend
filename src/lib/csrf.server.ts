import { useSession } from "@tanstack/react-start/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { CSRF_FIELD, CSRF_HEADER } from "@/lib/csrf.shared";

const TOKEN_TTL_MS = 30 * 60 * 1000;
/** Blocks instant script: token → POST in the same tick. Humans always wait longer. */
const MIN_AGE_MS = 400;

type CsrfSession = {
  csrfHash?: string;
  csrfIssuedAt?: number;
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
    name: "group-guard",
    maxAge: 60 * 60,
  };
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export type CsrfCheckResult =
  | { ok: true }
  | { ok: false; message: string; status: number };

/** Validate + consume the submit guard from a request body/header. */
export async function consumeSubmitGuard(
  request: Request,
  body: Record<string, unknown>,
): Promise<CsrfCheckResult> {
  const session = await useSession<CsrfSession>(sessionConfig());
  const expectedHash = session.data.csrfHash;
  const issuedAt = session.data.csrfIssuedAt ?? 0;

  if (!expectedHash || !issuedAt) {
    return {
      ok: false,
      status: 403,
      message: "Missing security check. Refresh the page and try again.",
    };
  }

  const age = Date.now() - issuedAt;
  if (age > TOKEN_TTL_MS) {
    await session.update({ csrfHash: "", csrfIssuedAt: 0 });
    return {
      ok: false,
      status: 403,
      message: "Security check expired. Refresh the page and try again.",
    };
  }
  if (age < MIN_AGE_MS) {
    return {
      ok: false,
      status: 403,
      message: "Please wait a moment, then submit again.",
    };
  }

  const fromBody = typeof body[CSRF_FIELD] === "string" ? String(body[CSRF_FIELD]) : "";
  const fromHeader = request.headers.get(CSRF_HEADER) ?? "";
  const provided = (fromBody || fromHeader).trim();
  if (!provided) {
    return {
      ok: false,
      status: 403,
      message: "Missing security check. Refresh the page and try again.",
    };
  }

  if (fromBody && fromHeader && fromBody !== fromHeader) {
    return { ok: false, status: 403, message: "Security check failed." };
  }

  const ok = safeEqual(hashToken(provided), expectedHash);
  await session.update({ csrfHash: "", csrfIssuedAt: 0 });

  if (!ok) {
    return {
      ok: false,
      status: 403,
      message: "Security check failed. Refresh the page and try again.",
    };
  }
  return { ok: true };
}
