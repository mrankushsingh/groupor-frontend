import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type RateKind = "upload" | "report";

const STORE_PATH = path.join(process.cwd(), "data", "ip-rate-limits.json");
const WINDOW_MS = 24 * 60 * 60 * 1000;
const LIMIT = 5;

type Bucket = Record<string, number[]>;
type Store = {
  uploads: Bucket;
  reports: Bucket;
};

let cache: Store | null = null;

function emptyStore(): Store {
  return { uploads: {}, reports: {} };
}

async function readStore(): Promise<Store> {
  if (cache) return cache;
  try {
    const raw = await readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<Store>;
    cache = {
      uploads: parsed.uploads && typeof parsed.uploads === "object" ? parsed.uploads : {},
      reports: parsed.reports && typeof parsed.reports === "object" ? parsed.reports : {},
    };
  } catch {
    cache = emptyStore();
  }
  return cache;
}

async function writeStore(store: Store) {
  cache = store;
  try {
    await mkdir(path.dirname(STORE_PATH), { recursive: true });
    await writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
  } catch (error) {
    console.error("[ip-rate-limits] failed to persist store", error);
  }
}

function normalizeIp(ip: string) {
  const value = (ip ?? "").trim().toLowerCase();
  if (!value) return "unknown";
  // Strip IPv6-mapped IPv4 prefix.
  if (value.startsWith("::ffff:")) return value.slice(7);
  return value;
}

function bucketKey(kind: RateKind): keyof Store {
  return kind === "upload" ? "uploads" : "reports";
}

function prune(timestamps: number[], now: number) {
  return timestamps.filter((t) => typeof t === "number" && now - t < WINDOW_MS);
}

function formatWait(ms: number) {
  const totalMinutes = Math.max(1, Math.ceil(ms / 60_000));
  if (totalMinutes < 60) {
    return `${totalMinutes} minute${totalMinutes === 1 ? "" : "s"}`;
  }
  const hours = Math.ceil(totalMinutes / 60);
  if (hours >= 24) return "24 hours";
  return `${hours} hour${hours === 1 ? "" : "s"}`;
}

export type IpQuotaResult =
  | { ok: true; used: number; remaining: number; limit: number }
  | {
      ok: false;
      code: "daily_limit";
      used: number;
      remaining: number;
      limit: number;
      retryAfterMs: number;
      message: string;
    };

function limitMessage(kind: RateKind, retryAfterMs: number) {
  const wait = formatWait(retryAfterMs);
  if (kind === "upload") {
    return `You can only upload ${LIMIT} groups every 24 hours. Please wait for ${wait}.`;
  }
  return `You can only report ${LIMIT} groups every 24 hours. Please wait for ${wait}.`;
}

/** Check quota and, if allowed, record this action under the IP. */
export async function consumeIpQuota(ip: string, kind: RateKind): Promise<IpQuotaResult> {
  const key = normalizeIp(ip);
  const store = await readStore();
  const field = bucketKey(kind);
  const now = Date.now();
  const recent = prune(store[field][key] ?? [], now);

  if (recent.length >= LIMIT) {
    const oldest = Math.min(...recent);
    const retryAfterMs = Math.max(0, WINDOW_MS - (now - oldest));
    store[field][key] = recent;
    await writeStore(store);
    return {
      ok: false,
      code: "daily_limit",
      used: recent.length,
      remaining: 0,
      limit: LIMIT,
      retryAfterMs,
      message: limitMessage(kind, retryAfterMs),
    };
  }

  const next = [...recent, now];
  store[field][key] = next;
  await writeStore(store);

  return {
    ok: true,
    used: next.length,
    remaining: Math.max(0, LIMIT - next.length),
    limit: LIMIT,
  };
}

/** Record a successful action (call only after the action succeeds). */
export async function recordIpQuota(ip: string, kind: RateKind): Promise<IpQuotaResult> {
  const key = normalizeIp(ip);
  const store = await readStore();
  const field = bucketKey(kind);
  const now = Date.now();
  const recent = prune(store[field][key] ?? [], now);
  const next = [...recent, now];
  store[field][key] = next;
  await writeStore(store);
  return {
    ok: true,
    used: next.length,
    remaining: Math.max(0, LIMIT - next.length),
    limit: LIMIT,
  };
}

/** Read-only quota check (does not record). */
export async function peekIpQuota(ip: string, kind: RateKind): Promise<IpQuotaResult> {
  const key = normalizeIp(ip);
  const store = await readStore();
  const field = bucketKey(kind);
  const now = Date.now();
  const recent = prune(store[field][key] ?? [], now);

  if (recent.length >= LIMIT) {
    const oldest = Math.min(...recent);
    const retryAfterMs = Math.max(0, WINDOW_MS - (now - oldest));
    return {
      ok: false,
      code: "daily_limit",
      used: recent.length,
      remaining: 0,
      limit: LIMIT,
      retryAfterMs,
      message: limitMessage(kind, retryAfterMs),
    };
  }

  return {
    ok: true,
    used: recent.length,
    remaining: Math.max(0, LIMIT - recent.length),
    limit: LIMIT,
  };
}

export function clientIpFromHeaders(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return normalizeIp(first);
  }
  const real = headers.get("x-real-ip")?.trim();
  if (real) return normalizeIp(real);
  const cf = headers.get("cf-connecting-ip")?.trim();
  if (cf) return normalizeIp(cf);
  return "unknown";
}
