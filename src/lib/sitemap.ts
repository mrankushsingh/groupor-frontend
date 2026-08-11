import { categories, groups as staticGroups, groupPath, inviteCodeOf, type Group } from "@/data/groups";
import { apiUrl, hasRemoteApi } from "@/lib/api";
import {
  categoryPath,
  countryPath,
  languagePath,
  SITE_URL,
} from "@/lib/seo";

export type SitemapUrl = {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  image?: { loc: string; title?: string };
};

type ApiGroup = {
  id?: string | number;
  name?: string;
  description?: string;
  category?: string;
  country?: string;
  language?: string;
  link?: string;
  image?: string | null;
  status?: string;
  created_at?: string | null;
  updated_at?: string | null;
};

function toIsoDay(value?: string | null) {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString().slice(0, 10);
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function normalizeGroup(raw: ApiGroup | Group): Group | null {
  const link = "link" in raw ? String(raw.link ?? "") : "";
  const code = inviteCodeOf(link);
  if (!code) return null;
  const status = String(raw.status || "active").toLowerCase();
  if (status === "inactive" || status === "reported") return null;
  return {
    id: String(raw.id ?? code),
    name: String(raw.name ?? `WhatsApp Group ${code.slice(0, 8)}`),
    description: String(raw.description ?? ""),
    platform: "whatsapp",
    category: String(raw.category ?? "all"),
    members: Number(("members" in raw && (raw as { members?: number }).members) || 0),
    country: String(raw.country ?? ""),
    language: "language" in raw && raw.language ? String(raw.language) : undefined,
    link,
    image: raw.image ? String(raw.image) : undefined,
    status: status === "needs_verification" ? "needs_verification" : "active",
    createdAt:
      ("createdAt" in raw && raw.createdAt ? String(raw.createdAt) : undefined) ||
      ("created_at" in raw && raw.created_at ? String(raw.created_at) : undefined),
  };
}

async function fetchReportedCodes(): Promise<Set<string>> {
  if (!hasRemoteApi()) return new Set();
  try {
    const res = await fetch(apiUrl("/api/reports"), {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return new Set();
    const json = (await res.json()) as { codes?: string[] };
    return new Set((json.codes ?? []).map((c) => c.toLowerCase()));
  } catch {
    return new Set();
  }
}

async function fetchRemoteGroups(): Promise<Group[]> {
  if (!hasRemoteApi()) return [];
  const out: Group[] = [];
  let page = 1;
  let pages = 1;
  while (page <= pages && page <= 200) {
    const res = await fetch(apiUrl(`/api/groups?page=${page}&page_size=50`), {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) break;
    const json = (await res.json()) as {
      groups?: ApiGroup[];
      pagination?: { pages?: number };
    };
    for (const row of json.groups ?? []) {
      const group = normalizeGroup(row);
      if (group) out.push(group);
    }
    pages = Math.max(1, Number(json.pagination?.pages ?? 1));
    page += 1;
  }
  return out;
}

function dedupeGroups(list: Group[]) {
  const byCode = new Map<string, Group>();
  for (const group of list) {
    const code = inviteCodeOf(group.link);
    if (!code) continue;
    // Prefer remote/API rows when both exist.
    if (!byCode.has(code) || group.source === "user_submission") {
      byCode.set(code, group);
    }
  }
  return [...byCode.values()];
}

export async function buildSitemapUrls(): Promise<SitemapUrl[]> {
  const [remoteGroups, reported] = await Promise.all([
    fetchRemoteGroups(),
    fetchReportedCodes(),
  ]);

  const allGroups = dedupeGroups([
    ...remoteGroups,
    ...staticGroups.map((g) => normalizeGroup(g)).filter(Boolean) as Group[],
  ]).filter((g) => {
    const code = inviteCodeOf(g.link);
    return Boolean(code) && !reported.has(code) && g.status !== "inactive";
  });

  const today = new Date().toISOString().slice(0, 10);
  const urls: SitemapUrl[] = [
    { loc: `${SITE_URL}/`, lastmod: today, changefreq: "daily", priority: "1.0" },
    { loc: `${SITE_URL}/group/find`, lastmod: today, changefreq: "daily", priority: "0.9" },
    { loc: `${SITE_URL}/group/addgroup`, lastmod: today, changefreq: "weekly", priority: "0.8" },
    { loc: `${SITE_URL}/about`, changefreq: "monthly", priority: "0.5" },
    { loc: `${SITE_URL}/faq`, changefreq: "monthly", priority: "0.5" },
    { loc: `${SITE_URL}/contact`, changefreq: "monthly", priority: "0.4" },
    { loc: `${SITE_URL}/terms`, changefreq: "yearly", priority: "0.3" },
    { loc: `${SITE_URL}/privacy`, changefreq: "yearly", priority: "0.3" },
    { loc: `${SITE_URL}/disclaimer`, changefreq: "yearly", priority: "0.3" },
  ];

  const categorySlugs = new Set(
    allGroups.map((g) => g.category).filter((slug) => slug && slug !== "all"),
  );
  for (const slug of [...categorySlugs].sort()) {
    if (!categories.some((c) => c.slug === slug)) continue;
    urls.push({
      loc: `${SITE_URL}${categoryPath(slug)}`,
      lastmod: today,
      changefreq: "daily",
      priority: "0.8",
    });
  }

  const countries = [
    ...new Set(allGroups.map((g) => g.country).filter(Boolean)),
  ].sort();
  for (const country of countries) {
    urls.push({
      loc: `${SITE_URL}${countryPath(country)}`,
      lastmod: today,
      changefreq: "daily",
      priority: "0.7",
    });
  }

  const languages = [
    ...new Set(allGroups.map((g) => g.language).filter(Boolean) as string[]),
  ].sort();
  for (const language of languages) {
    urls.push({
      loc: `${SITE_URL}${languagePath(language)}`,
      lastmod: today,
      changefreq: "weekly",
      priority: "0.6",
    });
  }

  for (const group of allGroups) {
    const path = groupPath(group);
    const entry: SitemapUrl = {
      loc: `${SITE_URL}${path}`,
      lastmod: toIsoDay(group.createdAt) ?? today,
      changefreq: "weekly",
      priority: "0.7",
    };
    if (group.image?.startsWith("https://")) {
      entry.image = { loc: group.image, title: group.name };
    }
    urls.push(entry);
  }

  // Stable order helps crawlers and diffs.
  return urls.sort((a, b) => a.loc.localeCompare(b.loc));
}

export function renderSitemapXml(urls: SitemapUrl[]) {
  const body = urls
    .map((entry) => {
      const lines = [
        "  <url>",
        `    <loc>${escapeXml(entry.loc)}</loc>`,
        entry.lastmod ? `    <lastmod>${escapeXml(entry.lastmod)}</lastmod>` : null,
        entry.changefreq ? `    <changefreq>${entry.changefreq}</changefreq>` : null,
        entry.priority ? `    <priority>${entry.priority}</priority>` : null,
      ];
      if (entry.image?.loc) {
        lines.push("    <image:image>");
        lines.push(`      <image:loc>${escapeXml(entry.image.loc)}</image:loc>`);
        if (entry.image.title) {
          lines.push(`      <image:title>${escapeXml(entry.image.title)}</image:title>`);
        }
        lines.push("    </image:image>");
      }
      lines.push("  </url>");
      return lines.filter(Boolean).join("\n");
    })
    .join("\n");

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
    body,
    `</urlset>`,
    "",
  ].join("\n");
}
