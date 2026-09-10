import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe, Calendar, ArrowLeft, CheckCircle2 } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/guides/whatsapp-groups-country-joining-guide")({
  head: () => ({
    meta: [
      { title: "International & Country-Specific WhatsApp Joining Guide | Groupor" },
      {
        name: "description",
        content:
          "Discover how to find and join local WhatsApp groups across 180+ countries. Region-specific networking, language filtering, and local safety rules.",
      },
      { property: "og:title", content: "International & Country-Specific WhatsApp Joining Guide | Groupor" },
      {
        property: "og:description",
        content: "Guide to finding localized WhatsApp groups in India, USA, UK, Nigeria, Brazil, and worldwide.",
      },
      { property: "og:url", content: absoluteUrl("/guides/whatsapp-groups-country-joining-guide") },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/guides/whatsapp-groups-country-joining-guide") }],
  }),
  component: CountryJoiningGuidePage,
});

export function CountryJoiningGuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <nav className="mb-6">
          <Link to="/guides" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
            <ArrowLeft className="size-3.5" /> Back to Guides Hub
          </Link>
        </nav>

        <article>
          <header className="border-b border-border pb-6">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              Global Communities Guide
            </span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              International & Country-Specific WhatsApp Joining Guide
            </h1>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span>By Groupor Global Operations Team</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="size-3.5" /> Last Reviewed: September 2026</span>
            </div>
          </header>

          <div className="mt-8 space-y-6 text-foreground leading-relaxed">
            <p className="text-base text-muted-foreground">
              Finding country-specific messaging groups allows you to engage in conversations tailored to local job markets, educational entrance exams, regional housing, language exchanges, and local culture. Groupor indexes public groups across 180+ countries.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8">1. How to Filter Groups by Country & Language</h2>
            <p className="text-sm text-muted-foreground">
              On Groupor's homepage and category pages, use the country and language dropdown filters:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              <li><strong>India:</strong> Popular for UPSC, NEET exam prep, IT jobs, and cricket fan communities.</li>
              <li><strong>United States & UK:</strong> Popular for tech startups, remote work, university housing, and gaming clans.</li>
              <li><strong>Nigeria & Kenya:</strong> Active hubs for digital marketing, affiliate business, crypto trading, and entertainment.</li>
              <li><strong>Brazil & Latin America:</strong> Dedicated language exchanges, football discussions, and local marketplace groups.</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8">2. Cross-Border Time Zone & Etiquette Guidelines</h2>
            <p className="text-sm text-muted-foreground">
              When participating in international groups:
            </p>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
              <li>Respect time zone differences when posting questions or sending media.</li>
              <li>Use common regional languages specified in the group description.</li>
              <li>Adhere to local data protection standards and community norms.</li>
            </ol>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/group/find" className="rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground">
                Find Groups by Country & Region
              </Link>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
