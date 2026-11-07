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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
                { "@type": "ListItem", position: 2, name: "Guides", item: absoluteUrl("/guides") },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Country-Specific WhatsApp Joining Guide",
                  item: absoluteUrl("/guides/whatsapp-groups-country-joining-guide"),
                },
              ],
            },
            {
              "@type": "Article",
              headline: "International & Country-Specific WhatsApp Joining Guide",
              description:
                "Discover how to find and join local WhatsApp groups across 180+ countries. Region-specific networking, language filtering, and local safety rules.",
              url: absoluteUrl("/guides/whatsapp-groups-country-joining-guide"),
              datePublished: "2026-09-25T08:00:00Z",
              dateModified: "2026-11-01T10:00:00Z",
              mainEntityOfPage: absoluteUrl("/guides/whatsapp-groups-country-joining-guide"),
              author: {
                "@type": "Organization",
                name: "Groupor Global Operations Team",
                url: absoluteUrl("/about"),
              },
              publisher: {
                "@type": "Organization",
                name: "Groupor",
                url: absoluteUrl("/"),
              },
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Can I join WhatsApp groups in another country?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Public WhatsApp invite links allow international participation regardless of geographic location, provided you comply with group rules and local terms of service.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do I filter WhatsApp communities by language on Groupor?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Use the Language selector on Groupor's homepage or search page (/group/find) to discover verified communities in English, Hindi, Spanish, Arabic, Portuguese, and over 40 languages.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What should I be mindful of when joining international groups?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Be mindful of time zone differences to avoid disturbing members with late-night notifications, use the group's designated language, and respect local cultural norms.",
                  },
                },
              ],
            },
          ],
        }),
      },
    ],
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
              <li><strong><Link to="/group/country/australia" className="text-primary hover:underline">Australia:</Link></strong> Trending for verified work from home roles, expat diaspora networks (Indians & Filipinos), ASX stock market investing, and student housing across Sydney, Melbourne, and Brisbane.</li>
              <li><strong><Link to="/group/country/india" className="text-primary hover:underline">India:</Link></strong> Popular for UPSC, NEET exam prep, IT jobs, and cricket fan communities.</li>
              <li><strong><Link to="/group/country/united-states" className="text-primary hover:underline">United States</Link> & <Link to="/group/country/united-kingdom" className="text-primary hover:underline">UK:</Link></strong> Popular for tech startups, remote work, university housing, and gaming clans.</li>
              <li><strong><Link to="/group/country/canada" className="text-primary hover:underline">Canada:</Link></strong> Popular for Express Entry PR discussion, international student housing in Toronto and Vancouver, and newcomer job preparation.</li>
              <li><strong><Link to="/group/country/nigeria" className="text-primary hover:underline">Nigeria</Link> & Kenya:</strong> Active hubs for digital marketing, affiliate business, crypto trading, and entertainment.</li>
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
