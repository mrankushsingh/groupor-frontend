import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { apiUrl, hasRemoteApi } from "@/lib/api";

export type ReportedEntry = {
  groupId: string;
  inviteCode: string;
  reason: string;
  description: string;
  reportedAt: string;
};

type Store = { entries: ReportedEntry[] };
type Snapshot = { ids: string[]; codes: string[] };

const STORE_PATH = path.join(process.cwd(), "data", "reported-groups.json");

let cache: Store | null = null;

function normalizeCode(code: string) {
  return (code ?? "").trim().toLowerCase();
}

function normalizeSnapshot(raw: Partial<Snapshot> | null | undefined): Snapshot {
  return {
    ids: Array.isArray(raw?.ids) ? raw.ids.map(String) : [],
    codes: Array.isArray(raw?.codes)
      ? raw.codes.map((c) => normalizeCode(String(c))).filter(Boolean)
      : [],
  };
}

async function readStore(): Promise<Store> {
  if (cache) return cache;
  try {
    const raw = await readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Store;
    cache = {
      entries: Array.isArray(parsed?.entries) ? parsed.entries : [],
    };
  } catch {
    cache = { entries: [] };
  }
  return cache;
}

async function writeStore(store: Store) {
  cache = store;
  try {
    await mkdir(path.dirname(STORE_PATH), { recursive: true });
    await writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
  } catch (error) {
    console.error("[reported-groups] failed to persist store", error);
  }
}

export async function listReported(): Promise<ReportedEntry[]> {
  const store = await readStore();
  return store.entries;
}

async function fetchRemoteSnapshot(): Promise<Snapshot> {
  const res = await fetch(apiUrl("/api/reports"), {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Remote reports failed: ${res.status}`);
  }
  const json = (await res.json()) as Partial<Snapshot>;
  return normalizeSnapshot(json);
}

export async function getReportedSnapshot(): Promise<Snapshot> {
  if (hasRemoteApi()) {
    try {
      return await fetchRemoteSnapshot();
    } catch (error) {
      console.error("[reported-groups] remote snapshot failed, using local fallback", error);
    }
  }
  const entries = await listReported();
  return {
    codes: [...new Set(entries.map((e) => normalizeCode(e.inviteCode)).filter(Boolean))],
    ids: [...new Set(entries.map((e) => String(e.groupId)).filter(Boolean))],
  };
}

export async function isInviteReported(code: string): Promise<boolean> {
  const normalized = normalizeCode(code);
  if (!normalized) return false;
  const { codes } = await getReportedSnapshot();
  return codes.includes(normalized);
}

export async function isGroupReported(groupId: string, inviteCode?: string): Promise<boolean> {
  const snapshot = await getReportedSnapshot();
  if (snapshot.ids.includes(String(groupId))) return true;
  if (inviteCode && snapshot.codes.includes(normalizeCode(inviteCode))) return true;
  return false;
}

/** Persist a report and ban the invite code + group id for everyone. */
export async function addReportedGroup(
  entry: Omit<ReportedEntry, "reportedAt"> & { reportedAt?: string },
) {
  const inviteCode = normalizeCode(entry.inviteCode);
  const groupId = String(entry.groupId);

  if (hasRemoteApi()) {
    const res = await fetch(apiUrl("/api/reports"), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        group_id: groupId,
        invite_code: inviteCode,
        reason: entry.reason,
        description: entry.description,
      }),
    });
    if (!res.ok) {
      const detail = await res.text();
      throw new Error(detail || `Remote report failed: ${res.status}`);
    }
    const json = (await res.json()) as Partial<Snapshot> & {
      already?: boolean;
      message?: string;
    };
    return {
      groupId,
      inviteCode,
      reason: entry.reason,
      description: entry.description,
      reportedAt: entry.reportedAt ?? new Date().toISOString(),
      snapshot: normalizeSnapshot(json),
      already: Boolean(json.already),
      message: json.message,
    };
  }

  const store = await readStore();
  const nextEntry: ReportedEntry = {
    groupId,
    inviteCode,
    reason: entry.reason,
    description: entry.description,
    reportedAt: entry.reportedAt ?? new Date().toISOString(),
  };
  store.entries = [
    nextEntry,
    ...store.entries.filter((e) => e.inviteCode !== inviteCode && String(e.groupId) !== groupId),
  ];
  await writeStore(store);
  return nextEntry;
}
