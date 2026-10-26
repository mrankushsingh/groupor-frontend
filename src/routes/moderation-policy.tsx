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
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Prohibited Content Categories</h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              Groupor maintains strict community standards to ensure users discover legitimate, safe, and active groups. The following categories of content are strictly prohibited across all directory submissions:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground leading-relaxed">
              <li><strong>Financial Fraud & Quick-Earning Schemes:</strong> Groups promoting multi-level marketing (MLM), Ponzi schemes, task-based salary fraud, crypto pump-and-dump groups, or unverified betting/gambling services.</li>
              <li><strong>Unauthorized Data & Privacy Violations:</strong> Groups dedicated to leaking private databases, personal phone numbers, credential stuffing, hacked accounts, or doxxing individuals.</li>
              <li><strong>Adult & Explicit Material:</strong> Non-consensual media, explicit pornography, prostitution/escort advertisements, and any child-exploitative material (reported immediately to law enforcement).</li>
              <li><strong>Malicious Software & Cyber Threats:</strong> Distribution of malware, keyloggers, phishing kits, cracked software, carding methodologies, or OTP bypass tools.</li>
              <li><strong>Harassment & Hate Speech:</strong> Content inciting violence, discrimination, or coordinated harassment based on race, religion, gender, ethnicity, or sexual orientation.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Admin Responsibilities & Best Practices</h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              Community managers and WhatsApp group administrators listing their groups on Groupor agree to maintain active oversight. Recommended practices include:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground leading-relaxed">
              <li>Configuring group permissions to prevent unauthorized members from spamming links or renaming the group.</li>
              <li>Publishing clear group rules in the WhatsApp group description and pinning them for new arrivals.</li>
              <li>Promptly removing spammers and resetting the invite link when the group reaches capacity or is targeted by spam bots.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Takedown Request & Appeals Process</h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              If you are a group admin requesting removal of your group from Groupor, or a rights holder filing an intellectual property or privacy notice, our Trust & Safety team processes requests within 24 hours. Once verified, the listing and all associated cached metadata are permanently purged from public indexation.
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              <Link
                to="/how-reporting-works"
                className="inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Submit Report or Takedown Request
              </Link>
              <Link
                to="/safety"
                className="inline-flex rounded-xl border border-input bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-accent"
              >
                Review Safety Guidelines
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
