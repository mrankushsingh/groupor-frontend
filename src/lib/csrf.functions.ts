import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { randomBytes, createHash } from "node:crypto";
import { CSRF_FIELD, CSRF_HEADER } from "@/lib/csrf.shared";

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

/** Issue a one-time submit guard token bound to the encrypted session. */
export const issueSubmitGuard = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<CsrfSession>(sessionConfig());
  const token = randomBytes(32).toString("base64url");
  const issuedAt = Date.now();
  await session.update({
    csrfHash: hashToken(token),
    csrfIssuedAt: issuedAt,
  });

  // Split so a single HTML scrape of one field is not enough.
  const mid = Math.floor(token.length / 2);
  return {
    a: token.slice(0, mid),
    b: token.slice(mid),
    field: CSRF_FIELD,
    header: CSRF_HEADER,
    issuedAt,
  };
});
