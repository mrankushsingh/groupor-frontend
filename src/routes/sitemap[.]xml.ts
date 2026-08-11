import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { buildSitemapUrls, renderSitemapXml } from "@/lib/sitemap";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const urls = await buildSitemapUrls();
          const xml = renderSitemapXml(urls);
          return new Response(xml, {
            headers: {
              "Content-Type": "application/xml; charset=utf-8",
              "Cache-Control": "public, max-age=1800, s-maxage=3600",
              "X-Robots-Tag": "noindex",
            },
          });
        } catch (error) {
          console.error("[sitemap]", error);
          return new Response(
            `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>\n`,
            {
              status: 500,
              headers: {
                "Content-Type": "application/xml; charset=utf-8",
                "Cache-Control": "no-store",
              },
            },
          );
        }
      },
    },
  },
});
