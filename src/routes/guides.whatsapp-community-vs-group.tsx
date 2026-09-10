import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Calendar, ArrowLeft, CheckCircle2, Layers } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/guides/whatsapp-community-vs-group")({
  head: () => ({
    meta: [
      { title: "WhatsApp Community vs WhatsApp Group: Key Differences | Groupor" },
      {
        name: "description",
        content:
          "Detailed breakdown comparing WhatsApp Communities, Sub-groups, and Announcement Channels. Learn member limits, privacy features, and admin controls.",
      },
      { property: "og:title", content: "WhatsApp Community vs WhatsApp Group: Key Differences | Groupor" },
      {
        property: "og:description",
        content: "Technical comparison of WhatsApp Communities vs traditional WhatsApp Groups.",
      },
      { property: "og:url", content: absoluteUrl("/guides/whatsapp-community-vs-group") },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/guides/whatsapp-community-vs-group") }],
  }),
  component: CommunityVsGroupGuidePage,
});

export function CommunityVsGroupGuidePage() {
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
              Platform Architecture Guide
            </span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              WhatsApp Community vs WhatsApp Group: Key Differences Explained
            </h1>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span>By Groupor Technical Editorial Team</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="size-3.5" /> Last Reviewed: September 2026</span>
            </div>
          </header>

          <div className="mt-8 space-y-6 text-foreground leading-relaxed">
            <p className="text-base text-muted-foreground">
              As messaging networks expand, WhatsApp introduced **Communities** to organize multiple related sub-groups under one umbrella brand. Understanding the architectural differences between a standard WhatsApp Group and a WhatsApp Community helps users choose the best space for their communication needs.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8">1. Structural Overview</h2>
            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-bold text-primary text-lg">WhatsApp Group</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  A standalone chat room with up to 1,024 members. All members can see each other's phone numbers (unless restricted by privacy settings) and send messages depending on admin permission.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-bold text-primary text-lg">WhatsApp Community</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  An umbrella container that links up to 100 separate sub-groups together. Includes an Announcement Channel where only admins can broadcast messages to up to 5,000+ total members.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-foreground mt-8">2. Comparison Table</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border text-xs text-left">
                <thead>
                  <tr className="bg-muted text-foreground font-bold">
                    <th className="border border-border p-3">Feature</th>
                    <th className="border border-border p-3">WhatsApp Group</th>
                    <th className="border border-border p-3">WhatsApp Community</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="border border-border p-3 font-semibold text-foreground">Capacity</td>
                    <td className="border border-border p-3">Up to 1,024 members</td>
                    <td className="border border-border p-3">Up to 100 sub-groups (5,000+ members)</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-semibold text-foreground">Broadcast Channel</td>
                    <td className="border border-border p-3">Admin-only mode option</td>
                    <td className="border border-border p-3">Dedicated Announcement Channel built-in</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-semibold text-foreground">Phone Number Privacy</td>
                    <td className="border border-border p-3">Visible to group members</td>
                    <td className="border border-border p-3">Hidden in Announcement Channel list</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-semibold text-foreground">Sub-group Navigation</td>
                    <td className="border border-border p-3">N/A (single chat)</td>
                    <td className="border border-border p-3">Seamless tab switching between topic groups</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-foreground mt-8">3. Which One Should You Join?</h2>
            <p className="text-sm text-muted-foreground">
              If you want active group discussions, Q&A, and peer networking, join targeted **WhatsApp Groups**. If you want official announcements from schools, companies, or news portals without message clutter, join a **WhatsApp Community Announcement Channel**.
            </p>

            <div className="mt-6 flex gap-4">
              <Link to="/group/find" className="rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground">
                Browse All Groups by Category
              </Link>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
