import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { groups, groupPath } from "@/data/groups";
import { categoryPath, countryPath, indexableCategories, indexableCountries, indexableLanguages, languagePath } from "@/lib/seo";

const BASE_URL = "https://groupor.link";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticEntries: SitemapEntry[] = [
          { path: "/", changefreq: "daily", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.6" },
          { path: "/group/addgroup", changefreq: "monthly", priority: "0.7" },
          { path: "/faq", changefreq: "monthly", priority: "0.6" },
          { path: "/contact", changefreq: "monthly", priority: "0.5" },
          { path: "/terms", changefreq: "monthly", priority: "0.5" },
          { path: "/privacy", changefreq: "monthly", priority: "0.5" },
          { path: "/disclaimer", changefreq: "monthly", priority: "0.5" },
        ];

        const categoryEntries: SitemapEntry[] = indexableCategories().map((c) => ({
          path: categoryPath(c.slug),
          changefreq: "daily",
          priority: "0.7",
        }));

        const countryEntries: SitemapEntry[] = indexableCountries().map((country) => ({
          path: countryPath(country),
          changefreq: "daily",
          priority: "0.6",
        }));

        const languageEntries: SitemapEntry[] = indexableLanguages().map((language) => ({
          path: languagePath(language),
          changefreq: "daily",
          priority: "0.6",
        }));

        const groupEntries: SitemapEntry[] = groups.filter((g) => g.status !== "inactive").map((g) => ({
          path: groupPath(g),
          changefreq: "weekly",
          priority: "0.6",
        }));

        const entries = [...staticEntries, ...categoryEntries, ...countryEntries, ...languageEntries, ...groupEntries];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
