import { createFileRoute, Link } from "@tanstack/react-router";
import { HelpCircle, AlertCircle, Clock, ShieldCheck, Mail } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/how-reporting-works")({
  head: () => ({
    meta: [
      { title: "How Reporting & Takedown Works | Groupor" },
      {
        name: "description",
        content:
          "Understand how to report expired, spammy, or harmful WhatsApp group invite links on Groupor. Step-by-step reporting and response timelines.",
      },
      { property: "og:title", content: "How Reporting & Takedown Works | Groupor" },
      {
        property: "og:description",
        content: "Learn how user reports and takedown requests are investigated and processed by Groupor.",
      },
      { property: "og:url", content: absoluteUrl("/how-reporting-works") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/how-reporting-works") }],
  }),
  component: HowReportingWorksPage,
});

export function HowReportingWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <header className="border-b border-border pb-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <HelpCircle className="size-4" />
            <span>Groupor Community Help</span>
          </div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            How Group Reporting & Takedowns Work
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            We rely on community feedback to maintain an accurate and safe directory. Here is how our reporting and takedown process operates step by step.
          </p>
        </header>

        <section className="mt-10 space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Why Report a Group?</h2>
            <p className="mt-2 text-muted-foreground">
              You should report a group listing on Groupor if you observe any of the following issues:
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 text-sm text-muted-foreground">
            <div className="rounded-xl border border-border bg-card p-4">
              <span className="font-semibold text-foreground block">Broken or Expired Link</span>
              The invite link has been reset, revoked by the group admin, or reached maximum WhatsApp capacity.
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <span className="font-semibold text-foreground block">Spam or Misleading Content</span>
              The group description promised job alerts or educational material but contains spam or commercial ads.
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <span className="font-semibold text-foreground block">Harmful or Prohibited Material</span>
              The group contains adult content, financial scams, hate speech, or dangerous material violating safety rules.
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <span className="font-semibold text-foreground block">Admin Removal Request</span>
              You are the group administrator and wish to remove your public listing from Groupor search indexes.
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Step-by-Step Reporting Procedure</h2>
            <ol className="mt-4 space-y-4">
              <li className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Click "Report Group" on any Group Profile</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Navigate to the group detail page or rules page and click the "Report Group" button.
                  </p>
                </div>
              </li>

              <li className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Select Reason & Provide Details</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Choose the applicable category (Expired Link, Fraud/Scam, Illegal Content, Admin Request) and add brief context if needed.
                  </p>
                </div>
              </li>

              <li className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Automated Screening & Moderator Triage</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Urgent reports (scams, illegal content) trigger immediate temporary suspension pending review. Broken links are queued for automated verification.
                  </p>
                </div>
              </li>

              <li className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Permanent Removal or Resolution</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Confirmed violations or expired links are permanently removed from Groupor directory indexes within 24 hours.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col sm:flex-row items-center gap-4">
            <div className="rounded-xl bg-primary/10 p-3 text-primary shrink-0">
              <Mail className="size-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Need Urgent Legal or Copyright Assistance?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                For DMCA takedown notices, trademark inquiries, or emergency safety concerns, contact our moderation team directly at{" "}
                <a href="mailto:support@groupor.link" className="text-primary underline">
                  support@groupor.link
                </a>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
