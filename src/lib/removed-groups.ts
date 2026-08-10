import { useCallback, useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getReportedGroups } from "@/lib/report.functions";
import { inviteCode } from "@/lib/submitted-groups";

type Snapshot = { ids: string[]; codes: string[] };

let cache: Snapshot = { ids: [], codes: [] };
const listeners = new Set<(next: Snapshot) => void>();

function publish(next: Snapshot) {
  cache = next;
  listeners.forEach((listener) => listener(next));
}

/**
 * Site-wide reported / removed groups (server store).
 * Prefer invite code checks so the same WhatsApp link stays banned even if ids differ.
 */
export function useRemovedGroups() {
  const fetchReported = useServerFn(getReportedGroups);
  const [ids, setIds] = useState<string[]>(cache.ids);
  const [codes, setCodes] = useState<string[]>(cache.codes);

  const refresh = useCallback(async () => {
    try {
      const snapshot = await fetchReported();
      publish(snapshot);
    } catch {
      /* keep last known */
    }
  }, [fetchReported]);

  useEffect(() => {
    const listener = (next: Snapshot) => {
      setIds(next.ids);
      setCodes(next.codes);
    };
    listeners.add(listener);
    setIds(cache.ids);
    setCodes(cache.codes);
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

  return { removedIds: ids, removedCodes: codes, isRemoved, isCodeRemoved, refresh };
}

/** @deprecated Reports now persist server-side; kept as no-op for old imports. */
export function removeGroup(_id: string | number) {
  /* server store is source of truth */
}
