import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldAlert, CheckSquare, RefreshCw, XCircle, FileText } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/moderation-policy")({
  head: () => ({
    meta: [
      { title: "Community Moderation Policy & Listing Guidelines | Groupor" },
      {
        name: "description",
        content:
          "Groupor moderation policy details how we review, approve, verify, and remove WhatsApp group listings to maintain quality and security.",
      },
      { property: "og:title", content: "Community Moderation Policy | Groupor" },
      {
        property: "og:description",
        content: "Detailed moderation rules, human verification processes, and link removal protocols on Groupor.",
      },
      { property: "og:url", content: absoluteUrl("/moderation-policy") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/moderation-policy") }],
  }),
  component: ModerationPolicyPage,
});

export function ModerationPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <header className="border-b border-border pb-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <ShieldAlert className="size-4" />
            <span>Groupor Trust & Safety</span>
          </div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Community Moderation Policy
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Our multi-layer moderation framework ensures Groupor remains a safe, high-quality directory for finding verified active WhatsApp communities.
          </p>
        </header>

        <section className="mt-10 space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Overview of Moderation Standards</h2>
            <p className="mt-2 text-muted-foreground">
              Groupor operates as an open community index. To prevent spam, broken invite links, and malicious activity, every submitted group passes through strict automated pre-screening, manual human moderation, and post-publication link health checks.
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <CheckSquare className="size-5 text-primary" />
                <h3 className="text-xl font-bold text-foreground">1. Submission & Pre-Screening</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                When a user or community manager submits a group link, our system validates the URL structure (`chat.whatsapp.com`), verifies that required metadata (title, category, country, language) is complete, and checks against automated blacklist filters for known spam domains and prohibited keywords.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <FileText className="size-5 text-primary" />
                <h3 className="text-xl font-bold text-foreground">2. Human Review & Classification</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Moderators evaluate submitted groups to ensure titles and descriptions accurately accurately represent the group's true content. Groups misrepresenting their category, location, or audience are corrected or rejected prior to publication.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <RefreshCw className="size-5 text-primary" />
                <h3 className="text-xl font-bold text-foreground">3. Automated Link Health Monitoring</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                WhatsApp group invite links frequently reset or expire when group capacity is reached. Groupor continuously runs automated link verification scripts. Dead, revoked, or non-functional links are automatically delisted from public index pages.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <XCircle className="size-5 text-red-500" />
                <h3 className="text-xl font-bold text-foreground">4. Zero Tolerance Removal Criteria</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                We immediately take down listed groups without advance notice if they are reported for promoting fraud, adult/illegal content, hate speech, malware, or non-consensual personal media.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Takedown Request Process</h2>
            <p className="mt-2 text-muted-foreground">
              If you are a group admin wanting your group removed, or a copyright holder submitting a notice, you can submit a removal request anytime via our quick report flow or by contacting our team.
            </p>
            <div className="mt-4 flex gap-4">
              <Link
                to="/how-reporting-works"
                className="inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Submit Report or Takedown Request
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
