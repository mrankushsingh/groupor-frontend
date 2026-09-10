import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, ShieldCheck, Users, AlertTriangle, Settings, Globe, Calendar, ArrowRight } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/guides/")({
  head: () => ({
    meta: [
      { title: "WhatsApp Community & Group Guides Hub | Groupor" },
      {
        name: "description",
        content:
          "Master WhatsApp communities with our expert guides: safety practices, group vs community features, scam prevention, group admin growth tips, and country joining guides.",
      },
      { property: "og:title", content: "WhatsApp Community & Group Guides Hub | Groupor" },
      {
        property: "og:description",
        content: "Expert guides on WhatsApp group safety, administration, community building, and scam prevention.",
      },
      { property: "og:url", content: absoluteUrl("/guides") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/guides") }],
  }),
  component: GuidesHubPage,
});

export const guidesList = [
  {
    slug: "how-to-join-whatsapp-groups-safely",
    title: "How to Join WhatsApp Groups Safely: Complete Security Guide",
    description: "Step-by-step precautions to protect your phone number, personal data, and privacy when joining public WhatsApp group invite links.",
    category: "Security & Privacy",
    icon: ShieldCheck,
    date: "September 2026",
    readTime: "5 min read",
  },
  {
    slug: "whatsapp-community-vs-group",
    title: "WhatsApp Community vs WhatsApp Group: Key Differences Explained",
    description: "In-depth technical breakdown comparing WhatsApp Communities, Announcement Channels, and traditional Group Chats.",
    category: "Platform Architecture",
    icon: Users,
    date: "September 2026",
    readTime: "6 min read",
  },
  {
    slug: "how-to-avoid-whatsapp-scams",
    title: "How to Avoid WhatsApp Scams & Fraudulent Groups",
    description: "Recognize investment schemes, task-earning frauds, fake job offers, and crypto scams prevalent in public group messaging.",
    category: "Scam Prevention",
    icon: AlertTriangle,
    date: "September 2026",
    readTime: "7 min read",
  },
  {
    slug: "whatsapp-group-admin-guidelines",
    title: "WhatsApp Group Admin Guidelines: Management & Best Practices",
    description: "Essential rules for community managers on setting group rules, moderating members, preventing spam, and scaling engagement.",
    category: "Community Management",
    icon: Settings,
    date: "September 2026",
    readTime: "6 min read",
  },
  {
    slug: "whatsapp-groups-country-joining-guide",
    title: "International & Country-Specific WhatsApp Joining Guide",
    description: "How to discover and join localized WhatsApp groups safely across 180+ countries and global language hubs.",
    category: "Global Communities",
    icon: Globe,
    date: "September 2026",
    readTime: "5 min read",
  },
];

export function GuidesHubPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <header className="border-b border-border pb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary">
            <BookOpen className="size-4" />
            <span>Groupor Knowledge Center</span>
          </div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            WhatsApp Group & Community Guides Hub
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-3xl">
            Expert documentation, technical comparisons, and safety best practices to help you navigate, build, and secure messaging communities.
          </p>
        </header>

        <section className="mt-10 grid gap-6 sm:grid-cols-2">
          {guidesList.map((guide) => (
            <Link
              key={guide.slug}
              to={`/guides/${guide.slug}`}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {guide.category}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="size-3" /> {guide.date}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <guide.icon className="size-6 text-primary shrink-0" />
                  <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {guide.title}
                  </h2>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {guide.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4 text-xs font-semibold text-primary">
                <span>Read Full Guide ({guide.readTime})</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
