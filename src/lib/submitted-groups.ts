import { useEffect, useState } from "react";
import { groups as staticGroups, type Group } from "@/data/groups";
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

/** Normalised WhatsApp invite code, used to detect duplicate submissions. */
export function inviteCode(link: string) {
  const value = (link ?? "").trim().toLowerCase();
  const match = value.match(/chat\.whatsapp\.com\/(?:invite\/)?([a-z0-9_-]+)/i);
  if (match && match[1]) return match[1].toLowerCase();
  return value.replace(/[?#].*$/, "").replace(/\/+$/, "");
}

function mapApiGroup(raw: Record<string, unknown>): Group {
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
    link: String(raw["link"] ?? ""),
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
  const code = inviteCode(link);
  if (!code) return undefined;
  return [...readLocal(), ...staticGroups].find((g) => inviteCode(g.link) === code);
}

/** Remove a submitted group from this browser after it was reported. */
export function purgeSubmittedByCode(code: string) {
  const normalized = (code ?? "").trim().toLowerCase();
  if (!normalized) return;
  writeLocal(readLocal().filter((g) => inviteCode(g.link) !== normalized));
}

/**
 * Keep a local cache mirror after a successful /data/addgroup submit.
 * Source of truth is the server store.
 */
export function cacheSubmittedGroup(group: Group) {
  const code = inviteCode(group.link);
  const next = [group, ...readLocal().filter((g) => inviteCode(g.link) !== code)];
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

/** Groups from the server store (+ brief local cache). Empty during SSR/first paint. */
export function useSubmittedGroups() {
  const [list, setList] = useState<Group[]>([]);

  useEffect(() => {
    let alive = true;
    const apply = (next: Group[]) => {
      if (alive) setList(next);
    };

    const listener = (next: Group[]) => apply(next);
    listeners.add(listener);
    apply(readLocal());

    void fetchServerGroups().then((server) => {
      if (!alive) return;
      // Server wins; keep any ultra-fresh local-only items not yet reflected.
      const serverCodes = new Set(server.map((g) => inviteCode(g.link)));
      const localOnly = readLocal().filter((g) => !serverCodes.has(inviteCode(g.link)));
      const merged = [...server, ...localOnly];
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
  }, []);

  return list;
}
