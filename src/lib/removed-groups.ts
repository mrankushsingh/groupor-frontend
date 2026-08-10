import { useCallback, useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getReportedGroups } from "@/lib/report.functions";
import { inviteCode } from "@/lib/submitted-groups";

export type ReportedSnapshot = { ids: string[]; codes: string[] };

const STORAGE_KEY = "groupor-reported-groups";

let cache: ReportedSnapshot = { ids: [], codes: [] };
let seeded = false;
const listeners = new Set<(next: ReportedSnapshot) => void>();

function normalizeSnapshot(input: Partial<ReportedSnapshot> | null | undefined): ReportedSnapshot {
  return {
    ids: Array.isArray(input?.ids) ? input.ids.map(String) : [],
    codes: Array.isArray(input?.codes)
      ? input.codes.map((c) => String(c).trim().toLowerCase()).filter(Boolean)
      : [],
  };
}

function readLocalSnapshot(): ReportedSnapshot | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return normalizeSnapshot(JSON.parse(raw) as ReportedSnapshot);
  } catch {
    return null;
  }
}

function writeLocalSnapshot(next: ReportedSnapshot) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable */
  }
}

/** Seed the in-memory cache before list pages render (root beforeLoad / report success). */
export function seedRemovedGroups(snapshot: ReportedSnapshot) {
  const next = normalizeSnapshot(snapshot);
  cache = next;
  seeded = true;
  writeLocalSnapshot(next);
  listeners.forEach((listener) => listener(next));
}

export function publishRemovedGroups(snapshot: ReportedSnapshot) {
  seedRemovedGroups(snapshot);
}

export function getRemovedGroupsCache() {
  return cache;
}

/**
 * Site-wide reported / removed groups (server store).
 * Prefer invite code checks so the same WhatsApp link stays banned even if ids differ.
 */
export function useRemovedGroups() {
  const fetchReported = useServerFn(getReportedGroups);
  const [ids, setIds] = useState<string[]>(() => cache.ids);
  const [codes, setCodes] = useState<string[]>(() => cache.codes);
  const [ready, setReady] = useState(() => seeded || cache.ids.length > 0 || cache.codes.length > 0);

  const refresh = useCallback(async () => {
    try {
      const snapshot = await fetchReported();
      seedRemovedGroups(snapshot);
      setReady(true);
    } catch {
      const local = readLocalSnapshot();
      if (local) {
        seedRemovedGroups(local);
        setReady(true);
      }
    }
  }, [fetchReported]);

  useEffect(() => {
    const listener = (next: ReportedSnapshot) => {
      setIds(next.ids);
      setCodes(next.codes);
      setReady(true);
    };
    listeners.add(listener);

    // Prefer already-seeded SSR/root data; otherwise hydrate from localStorage
    // before the network round-trip so a refresh doesn't flash reported groups.
    if (!seeded) {
      const local = readLocalSnapshot();
      if (local && (local.ids.length > 0 || local.codes.length > 0)) {
        seedRemovedGroups(local);
      }
    } else {
      setIds(cache.ids);
      setCodes(cache.codes);
      setReady(true);
    }

    void refresh();
    return () => {
      listeners.delete(listener);
    };
  }, [refresh]);

  const isRemoved = useCallback(
    (id: string | number, link?: string) => {
      if (ids.includes(String(id))) return true;
      if (link) {
        const code = inviteCode(link);
        if (code && codes.includes(code)) return true;
      }
      return false;
    },
    [ids, codes],
  );

  const isCodeRemoved = useCallback(
    (code: string) => {
      const normalized = (code ?? "").trim().toLowerCase();
      return Boolean(normalized) && codes.includes(normalized);
    },
    [codes],
  );

  return {
    removedIds: ids,
    removedCodes: codes,
    isRemoved,
    isCodeRemoved,
    refresh,
    ready,
  };
}

/** @deprecated Reports now persist server-side; kept as no-op for old imports. */
export function removeGroup(_id: string | number) {
  /* server store is source of truth */
}
