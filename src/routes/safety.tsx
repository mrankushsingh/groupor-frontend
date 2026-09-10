import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Lock, AlertTriangle, UserCheck, Eye, CheckCircle, Calendar } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "Safety Center & User Security Guidelines | Groupor" },
      {
        name: "description",
        content:
          "Learn how Groupor protects users when joining WhatsApp groups. Security guidelines, fraud prevention, privacy recommendations, and safety tips for active communities.",
      },
      { property: "og:title", content: "Safety Center & User Security Guidelines | Groupor" },
      {
        property: "og:description",
        content: "Security guidelines, fraud prevention, and privacy recommendations for WhatsApp group members.",
      },
      { property: "og:url", content: absoluteUrl("/safety") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/safety") }],
  }),
  component: SafetyPage,
});

export function SafetyPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <header className="border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-primary">
            <span className="inline-flex items-center gap-1">
              <Shield className="size-4" />
              Groupor Trust & Safety
            </span>
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <Calendar className="size-3.5" /> Last Reviewed: September 2026
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            WhatsApp Group Safety Center
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Essential privacy, security, and scam-prevention guidelines to keep your messaging experience safe while discovering active public communities on Groupor.
          </p>
        </header>

        <section className="mt-10 space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Core Security Rules for Joining Groups</h2>
            <p className="mt-2 text-muted-foreground">
              Groupor indexes publicly available WhatsApp invite links submitted by users and community managers. While our moderation team pre-screens submitted links, public group chats are decentralized. Always follow these essential security precautions:
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Lock className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Protect Your Personal Information</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Never share sensitive personal credentials in group chats—including passwords, bank account numbers, OTPs, government IDs, home addresses, or private financial details. Groupor staff will never message you directly requesting personal credentials.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-red-500/10 p-2 text-red-500">
                  <AlertTriangle className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Beware of Financial Scams</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Be extremely cautious of promises claiming guaranteed investment returns, crypto doubling, task-earning schemes, or upfront fees for job placements. Legitimate companies and group admins never request advance payments or PINs.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <UserCheck className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Manage Privacy Settings in WhatsApp</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Configure your WhatsApp privacy settings to hide your profile photo, status, and last seen from unknown contacts. Adjust your settings so that only your phone contacts can add you directly to new groups.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Eye className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Identify Fake Links and Downloads</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Do not click suspicious external URL shorteners or download unverified APK/EXE files shared inside group chats. Malicious files can contain spyware or phishing scripts.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Prohibited Content Policy</h2>
            <p className="mt-2 text-muted-foreground">
              Groupor strictly prohibits the listing of WhatsApp groups that feature or promote any of the following categories:
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="size-4 text-primary shrink-0 mt-0.5" />
                <span>Non-consensual explicit content or child exploitation.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="size-4 text-primary shrink-0 mt-0.5" />
                <span>Hate speech, racism, violence, or harassment.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="size-4 text-primary shrink-0 mt-0.5" />
                <span>Pyramid schemes, phishing, or financial fraud.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="size-4 text-primary shrink-0 mt-0.5" />
                <span>Illegal drug trade, firearms, or regulated items.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="size-4 text-primary shrink-0 mt-0.5" />
                <span>Spam bots or automated link manipulation.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="size-4 text-primary shrink-0 mt-0.5" />
                <span>Impersonation of official organizations.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-muted p-6 text-center">
            <h2 className="text-xl font-bold text-foreground">Found a Dangerous or Suspicious Group?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Help keep Groupor safe for everyone. If you encounter an inactive, spammy, or violating group, use our 1-click reporting tool to submit it for emergency moderation removal.
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <Link
                to="/how-reporting-works"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Learn How Reporting Works
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
