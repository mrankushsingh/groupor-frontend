import { createFileRoute, Link } from "@tanstack/react-router";
import { Settings, Calendar, ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/guides/whatsapp-group-admin-guidelines")({
  head: () => ({
    meta: [
      { title: "WhatsApp Group Admin Guidelines: Management & Best Practices | Groupor" },
      {
        name: "description",
        content:
          "Essential guide for community managers: group creation, setting rules, admin permissions, spam prevention, and scaling member engagement.",
      },
      { property: "og:title", content: "WhatsApp Group Admin Guidelines | Groupor" },
      {
        property: "og:description",
        content: "Best practices for managing and growing active WhatsApp group communities.",
      },
      { property: "og:url", content: absoluteUrl("/guides/whatsapp-group-admin-guidelines") },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/guides/whatsapp-group-admin-guidelines") }],
  }),
  component: AdminGuidelinesPage,
});

export function AdminGuidelinesPage() {
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
              Community Management Guide
            </span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              WhatsApp Group Admin Guidelines: Management & Growth
            </h1>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span>By Groupor Editorial Board</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="size-3.5" /> Last Reviewed: September 2026</span>
            </div>
          </header>

          <div className="mt-8 space-y-6 text-foreground leading-relaxed">
            <p className="text-base text-muted-foreground">
              Building and moderating a successful WhatsApp community requires clear group guidelines, proactive admin supervision, and smart settings configuration. Whether managing an educational cohort or a regional business network, follow these administrative standards.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8">1. Set Clear Group Rules in Description</h2>
            <p className="text-sm text-muted-foreground">
              Every group description should clearly state group purpose and member conduct rules:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              <li>No self-promotional spam or affiliate links without admin approval.</li>
              <li>No explicit, offensive, or hateful language.</li>
              <li>Respect member privacy and avoid unauthorized private DMs.</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8">2. Utilize Native Admin Controls</h2>
            <div className="rounded-2xl border border-border bg-card p-5 text-sm space-y-3">
              <div>
                <strong className="text-foreground">Approve New Members:</strong> Turn on "Approve New Members" in Group Settings so admins must verify join requests before users enter the main chat.
              </div>
              <div>
                <strong className="text-foreground">Edit Group Info Permission:</strong> Restrict "Edit Group Settings" to Admins Only to prevent malicious users from renaming your group.
              </div>
              <div>
                <strong className="text-foreground">Send Messages Permission:</strong> Switch message sending to "Admins Only" during quiet hours or during announcement broadcasts.
              </div>
            </div>

            <h2 className="text-2xl font-bold text-foreground mt-8">3. How to Submit Your Group to Groupor</h2>
            <p className="text-sm text-muted-foreground">
              Community managers can grow their member base by submitting active invite links to Groupor's free directory index:
            </p>
            <div className="mt-4 flex gap-4">
              <Link to="/group/addgroup" className="rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground">
                + Submit Your Group to Groupor Directory
              </Link>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
