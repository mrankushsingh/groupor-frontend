import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, Calendar, ArrowLeft, ShieldAlert, CheckCircle2 } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/guides/how-to-avoid-whatsapp-scams")({
  head: () => ({
    meta: [
      { title: "How to Avoid WhatsApp Scams & Fraudulent Groups | Groupor" },
      {
        name: "description",
        content:
          "Identify and avoid financial scams, crypto doubling frauds, fake job offers, and phishing attempts operating in public WhatsApp messaging groups.",
      },
      { property: "og:title", content: "How to Avoid WhatsApp Scams & Fraudulent Groups | Groupor" },
      {
        property: "og:description",
        content: "Learn the warning signs of online messaging scams and how to protect yourself.",
      },
      { property: "og:url", content: absoluteUrl("/guides/how-to-avoid-whatsapp-scams") },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/guides/how-to-avoid-whatsapp-scams") }],
  }),
  component: ScamPreventionGuidePage,
});

export function ScamPreventionGuidePage() {
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
            <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-500">
              Scam Prevention & Anti-Fraud Guide
            </span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              How to Avoid WhatsApp Scams & Fraudulent Groups
            </h1>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span>By Groupor Fraud Prevention Desk</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="size-3.5" /> Last Reviewed: September 2026</span>
            </div>
          </header>

          <div className="mt-8 space-y-6 text-foreground leading-relaxed">
            <p className="text-base text-muted-foreground">
              Scammers frequently target public messaging groups because of the direct reach to thousands of members. Groupor actively screens submitted links to eliminate fraudulent groups, but understanding the common tactics used by online scammers is your best defense.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8">1. Common Types of WhatsApp Scams</h2>
            
            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground text-base">A. High-Yield Investment & Crypto Doubling Scams</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Fraudsters promise 200% to 500% guaranteed returns within 24 hours by sending crypto or UPI payments to private wallets. <strong>Fact:</strong> Guaranteed high returns on small deposits are always Ponzi scams.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground text-base">B. Fake Job & Task-Earning Schemes</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Scammers send job alerts claiming you can earn $100/day by liking YouTube videos or reviewing hotels, but require an upfront "registration fee" or deposit. Legitimate employers NEVER demand fees from job applicants.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground text-base">C. Impersonation & OTP Theft</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  A member posing as a group admin or technical support staff sends a private message asking for an OTP code or account verification link. <strong>Never share OTPs with anyone.</strong>
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-foreground mt-8">2. Universal Safety Golden Rules</h2>
            <ul className="list-disc space-y-2.5 pl-5 text-sm text-muted-foreground">
              <li><strong>Never send money to unverified individuals met in group chats.</strong></li>
              <li><strong>Never click unverified external links asking for financial PINs or bank log-ins.</strong></li>
              <li><strong>Block and report suspicious DM messages directly inside WhatsApp.</strong></li>
              <li><strong>Use Groupor's 1-Click Report Tool to take down suspicious group listings.</strong></li>
            </ul>

            <div className="mt-8 rounded-2xl bg-muted p-6 text-center">
              <h3 className="font-bold text-foreground text-lg">Spotted a Suspicious Group Listed on Groupor?</h3>
              <p className="mt-2 text-xs text-muted-foreground">
                Help us keep the community safe. Submit an emergency report to our moderation queue.
              </p>
              <Link to="/how-reporting-works" className="mt-4 inline-block rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground">
                Report Group for Moderation
              </Link>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
