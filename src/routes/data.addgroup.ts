import { createFileRoute } from "@tanstack/react-router";
import { getRequestIP } from "@tanstack/react-start/server";
import { addGroupToStore, listSubmittedGroups } from "@/lib/submitted-groups.store";
import { consumeSubmitGuard } from "@/lib/csrf.server";
import {
  clientIpFromHeaders,
  peekIpQuota,
  recordIpQuota,
} from "@/lib/ip-rate-limit.store";

async function readBody(request: Request): Promise<Record<string, unknown>> {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const json = (await request.json()) as Record<string, unknown>;
    return json && typeof json === "object" ? json : {};
  }
  const form = await request.formData();
  const data: Record<string, unknown> = {};
  form.forEach((value, key) => {
    if (typeof value === "string") data[key] = value;
  });
  return data;
}

function field(data: Record<string, unknown>, ...keys: string[]) {
  for (const key of keys) {
    const value = data[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

function resolveIp(request: Request) {
  try {
    const ip = getRequestIP({ xForwardedFor: true });
    if (ip) return ip;
  } catch {
    /* fall through to headers */
  }
  return clientIpFromHeaders(request.headers);
}

function wantsHtmlRedirect(request: Request) {
  return (
    (request.headers.get("accept") ?? "").includes("text/html") &&
    !(request.headers.get("content-type") ?? "").includes("application/json")
  );
}

export const Route = createFileRoute("/data/addgroup")({
  server: {
    handlers: {
      GET: async () => {
        const groups = await listSubmittedGroups();
        return Response.json({
          ok: true,
          count: groups.length,
          groups,
        });
      },
      POST: async ({ request }) => {
        try {
          const data = await readBody(request);
          const guard = await consumeSubmitGuard(request, data);
          if (!guard.ok) {
            if (wantsHtmlRedirect(request)) {
              return new Response(null, {
                status: 303,
                headers: {
                  Location: `/group/addgroup?error=${encodeURIComponent(guard.message)}`,
                },
              });
            }
            return Response.json(
              { ok: false, message: guard.message },
              { status: guard.status },
            );
          }

          const ip = resolveIp(request);
          const quota = await peekIpQuota(ip, "upload");
          if (!quota.ok) {
            if (wantsHtmlRedirect(request)) {
              return new Response(null, {
                status: 303,
                headers: {
                  Location: `/group/addgroup?error=${encodeURIComponent(quota.message)}`,
                },
              });
            }
            return Response.json(
              {
                ok: false,
                code: quota.code,
                message: quota.message,
                retryAfterMs: quota.retryAfterMs,
              },
              { status: 429 },
            );
          }

          const result = await addGroupToStore({
            link: field(data, "link", "glink", "invite", "url"),
            name: field(data, "name", "gname", "title"),
            image: field(data, "image", "gimage", "icon"),
            description: field(data, "description", "gdesc", "info"),
            category: field(data, "category", "gcategory"),
            country: field(data, "country", "gcountry"),
            language: field(data, "language", "glanguage"),
            tags: field(data, "tags", "gtags", "keywords"),
          });

          if (!result.ok) {
            if (wantsHtmlRedirect(request)) {
              return new Response(null, {
                status: 303,
                headers: {
                  Location: `/group/addgroup?error=${encodeURIComponent(result.message)}`,
                },
              });
            }
            return Response.json(result, { status: result.status });
          }

          await recordIpQuota(ip, "upload");

          if (wantsHtmlRedirect(request)) {
            return new Response(null, {
              status: 303,
              headers: { Location: result.path },
            });
          }

          return Response.json(result, { status: 201 });
        } catch (error) {
          console.error("[data/addgroup]", error);
          return Response.json(
            { ok: false, message: "Could not save the group right now." },
            { status: 500 },
          );
        }
      },
    },
  },
});
