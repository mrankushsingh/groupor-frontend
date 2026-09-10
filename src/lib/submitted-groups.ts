import { useEffect, useState } from "react";
import { groups as staticGroups, inviteCodeOf, type Group } from "@/data/groups";
import { apiUrl, hasRemoteApi } from "@/lib/api";

const KEY = "submitted-groups";

const listeners = new Set<(list: Group[]) => void>();

function readLocal(): Group[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as Group[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(list: Group[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable */
  }
  listeners.forEach((l) => l(list));
}

/** Normalised WhatsApp invite code, preserving exact character case. */
export function inviteCode(link: string): string {
  const code = inviteCodeOf(link);
  if (code) return code;
  const value = (link ?? "").trim();
  const match = value.match(/chat\.whatsapp\.com\/(?:invite\/)?([A-Za-z0-9_-]+)/i);
  if (match && match[1]) return match[1];
  return value.replace(/[?#].*$/, "").replace(/\/+$/, "");
}

function mapApiGroup(raw: Record<string, unknown>): Group {
  const rawLink = String(raw["link"] ?? raw["url"] ?? "").trim();
  const inviteCode = String(raw["invite_code"] ?? raw["code"] ?? "").trim();
  const link = rawLink || (inviteCode ? `https://chat.whatsapp.com/${inviteCode}` : "");
  return {
    id: String(raw["id"] ?? ""),
    name: String(raw["name"] ?? ""),
    description: String(raw["description"] ?? ""),
    platform: "whatsapp",
    category: String(raw["category"] ?? "all"),
    members: Number(raw["members"] ?? 0),
    country: String(raw["country"] ?? ""),
    language: String(raw["language"] ?? "") || undefined,
    tags: Array.isArray(raw["tags"]) ? (raw["tags"] as string[]) : undefined,
    link,
    image: typeof raw["image"] === "string" ? raw["image"] : undefined,
    status: (raw["status"] as Group["status"]) || "active",
    source: "user_submission",
    createdAt: typeof raw["created_at"] === "string" ? raw["created_at"] : undefined,
  };
}

export function normalizeApiGroup(raw: unknown): Group | null {
  if (!raw || typeof raw !== "object") return null;
  return mapApiGroup(raw as Record<string, unknown>);
}

async function fetchServerGroups(): Promise<Group[]> {
  try {
    const endpoint = hasRemoteApi() ? apiUrl("/api/groups?page_size=50") : "/data/addgroup";
    const res = await fetch(endpoint, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { groups?: Record<string, unknown>[] };
    if (!Array.isArray(json.groups)) return [];
    return hasRemoteApi()
      ? json.groups.map((g) => mapApiGroup(g))
      : (json.groups as unknown as Group[]);
  } catch {
    return [];
  }
}

/** Existing group with the same invite link, from demo data, server, or this browser. */
export function findGroupByLink(link: string): Group | undefined {
  const code = inviteCode(link).toLowerCase();
  if (!code) return undefined;
  return [...readLocal(), ...staticGroups].find((g) => inviteCode(g.link).toLowerCase() === code);
}

/** Remove a submitted group from this browser after it was reported. */
export function purgeSubmittedByCode(code: string) {
  const normalized = (code ?? "").trim().toLowerCase();
  if (!normalized) return;
  writeLocal(readLocal().filter((g) => inviteCode(g.link).toLowerCase() !== normalized));
}

/**
 * Keep a local cache mirror after a successful /data/addgroup submit.
 * Source of truth is the server store.
 */
export function cacheSubmittedGroup(group: Group) {
  const code = inviteCode(group.link).toLowerCase();
  const next = [group, ...readLocal().filter((g) => inviteCode(g.link).toLowerCase() !== code)];
  writeLocal(next);
  return group;
}

/** @deprecated Prefer posting to /data/addgroup. Kept for compatibility. */
export function addSubmittedGroup(group: Omit<Group, "id" | "platform"> & { id?: string }) {
  const now = Date.now();
  const entry: Group = {
    ...group,
    platform: "whatsapp",
    id: group.id ?? `u${now}`,
    createdAt: group.createdAt ?? new Date(now).toISOString(),
    source: group.source ?? "user_submission",
  };
  return cacheSubmittedGroup(entry);
}

export function mergeSubmittedGroups(server: Group[], local: Group[]): Group[] {
  const serverCodes = new Set(server.map((g) => inviteCode(g.link).toLowerCase()));
  const localOnly = local.filter((g) => !serverCodes.has(inviteCode(g.link).toLowerCase()));
  return [...server, ...localOnly];
}

export async function fetchSubmittedForSsr(): Promise<Group[]> {
  if (typeof window !== "undefined") return [];
  try {
    const { listSubmittedGroups } = await import("@/lib/submitted-groups.store");
    const local = await listSubmittedGroups();
    if (local.length > 0) return local;
  } catch {}

  if (hasRemoteApi()) {
    try {
      const res = await fetch(apiUrl("/api/groups?page_size=50"), {
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        const json = (await res.json()) as { groups?: unknown[] };
        if (Array.isArray(json?.groups)) {
          return json.groups.map(normalizeApiGroup).filter((g): g is Group => Boolean(g));
        }
      }
    } catch {}
  }
  return [];
}

/** Groups from the server store (+ brief local cache). Empty during SSR/first paint unless seeded. */
export function useSubmittedGroups(initialServerGroups?: Group[]) {
  const [list, setList] = useState<Group[]>(() => {
    const local = readLocal();
    if (initialServerGroups && initialServerGroups.length > 0) {
      return mergeSubmittedGroups(initialServerGroups, local);
    }
    return local;
  });

  useEffect(() => {
    let alive = true;
    const apply = (next: Group[]) => {
      if (alive) setList(next);
    };

    const listener = (next: Group[]) => apply(next);
    listeners.add(listener);

    const currentLocal = readLocal();
    const base = initialServerGroups && initialServerGroups.length > 0
      ? mergeSubmittedGroups(initialServerGroups, currentLocal)
      : currentLocal;
    apply(base);

    void fetchServerGroups().then((server) => {
      if (!alive) return;
      const merged = mergeSubmittedGroups(server, readLocal());
      writeLocal(merged);
      apply(merged);
    });

    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) apply(readLocal());
    };
    window.addEventListener("storage", onStorage);
    return () => {
      alive = false;
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  }, [initialServerGroups]);

  return list;
}
