import { useCallback, useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Timer, X } from "lucide-react";
import { getReportChallenge, submitReport } from "@/lib/report.functions";
import { useRemovedGroups } from "@/lib/removed-groups";

const COOLDOWN_SECONDS = 30;

const REASONS = [
  "Child Pornography",
  "Rape/Gang rape",
  "Fake/Spam/Fraud",
  "Inappropriate",
  "Link Revoked",
  "Group is Full",
  "Group in Wrong Category",
  "Religious Hateful",
  "Remove my Group",
  "Other",
];

export function ReportGroup({
  groupId,
  inviteCode,
  reported = false,
  onReported,
}: {
  groupId: string | number;
  inviteCode: string;
  reported?: boolean;
  onReported?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [desc, setDesc] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [pending, setPending] = useState(false);
  const [dailyBlocked, setDailyBlocked] = useState(false);
  const [dailyMessage, setDailyMessage] = useState("");
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const deadlineRef = useRef(0);

  const send = useServerFn(submitReport);
  const loadChallenge = useServerFn(getReportChallenge);
  const { refresh } = useRemovedGroups();

  const applyRemaining = useCallback((remainingMs: number) => {
    deadlineRef.current = remainingMs > 0 ? Date.now() + remainingMs : 0;
    setCooldown(Math.ceil(Math.max(0, remainingMs) / 1000));
  }, []);

  const refreshChallenge = useCallback(async () => {
    try {
      const r = await loadChallenge();
      setA(r.a);
      setB(r.b);
      applyRemaining(r.remainingMs);
      setDailyBlocked(Boolean(r.dailyBlocked));
      setDailyMessage(r.dailyMessage || "");
    } catch {
      /* keep last known */
    }
  }, [loadChallenge, applyRemaining]);

  useEffect(() => {
    if (!open) return;
    void refreshChallenge();
    const poll = setInterval(() => void refreshChallenge(), 15000);
    return () => clearInterval(poll);
  }, [open, refreshChallenge]);

  useEffect(() => {
    const t = setInterval(() => {
      if (!deadlineRef.current) return;
      const left = Math.max(0, deadlineRef.current - Date.now());
      if (left === 0) deadlineRef.current = 0;
      setCooldown(Math.ceil(left / 1000));
    }, 250);
    return () => clearInterval(t);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");
    if (!inviteCode) {
      setError("Missing invite code for this group.");
      return;
    }
    setPending(true);
    try {
      const res = await send({
        data: {
          groupId: String(groupId),
          inviteCode,
          reason,
          description: desc,
          captchaAnswer: Number(answer),
        },
      });
      applyRemaining(res.remainingMs);
      if (res.ok) {
        setNotice(res.message);
        setReason("");
        setDesc("");
        setAnswer("");
        setOpen(false);
        await refresh();
        onReported?.();
      } else {
        setError(res.message);
        if ("code" in res && res.code === "daily_limit") {
          setDailyBlocked(true);
          setDailyMessage(res.message);
          applyRemaining(0);
        }
        await refreshChallenge();
        setAnswer("");
      }
    } catch {
      setError("Could not submit the report. Please try again.");
      await refreshChallenge();
    } finally {
      setPending(false);
    }
  };

  const label = open ? (
    <span className="inline-flex items-center gap-2 text-base font-bold text-foreground">
      <X className="size-4" />
      Close report form
    </span>
  ) : (
    <span className="text-base font-bold text-foreground">Report this group</span>
  );

  if (reported) {
    return <p className="text-base font-bold text-foreground">Report this group</p>;
  }

  return (
    <div className="mt-6 border-t border-border pt-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center transition-opacity hover:opacity-80"
      >
        {label}
      </button>

      {open && (
        <form
          onSubmit={submit}
          className="mt-4 space-y-3 rounded-xl border border-border bg-muted/30 p-4"
        >
          <select
            required
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          >
            <option value="">Report for</option>
            {REASONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <textarea
            required
            maxLength={500}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Reasons for reporting group (Required)"
            rows={3}
            className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
          />

          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>
              {a} + {b} =
            </span>
            <input
              required
              inputMode="numeric"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
              className="w-16 rounded-lg border border-border bg-background px-2 py-1.5 text-center text-sm text-foreground outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={cooldown > 0 || pending || !a || dailyBlocked}
              className="ml-auto rounded-lg bg-destructive px-4 py-2 text-xs font-semibold text-destructive-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending
                ? "Submitting…"
                : dailyBlocked
                  ? "Daily limit reached"
                  : cooldown > 0
                    ? `Try again in ${cooldown}s`
                    : "Submit report"}
            </button>
          </div>

          {dailyBlocked && dailyMessage && (
            <p className="text-xs text-destructive">{dailyMessage}</p>
          )}
          {error && !dailyBlocked && <p className="text-xs text-destructive">{error}</p>}
          {notice && !error && !dailyBlocked && (
            <p className="text-xs text-primary">{notice}</p>
          )}
          {cooldown > 0 && !dailyBlocked && (
            <div className="space-y-1.5" role="status" aria-live="polite" aria-atomic="true">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Timer className="size-3.5" />
                  Cooldown active
                </span>
                <span className="font-mono font-semibold text-foreground tabular-nums">
                  0:{String(cooldown).padStart(2, "0")}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-destructive transition-[width] duration-1000 ease-linear"
                  style={{ width: `${(cooldown / COOLDOWN_SECONDS) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                You can submit another report in {cooldown} second
                {cooldown === 1 ? "" : "s"}.
              </p>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
