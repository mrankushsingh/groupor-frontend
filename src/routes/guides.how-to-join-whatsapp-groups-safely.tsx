import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Calendar, Lock, UserCheck, Eye, AlertCircle, ArrowLeft } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/guides/how-to-join-whatsapp-groups-safely")({
  head: () => ({
    meta: [
      { title: "How to Join WhatsApp Groups Safely: Complete Security Guide | Groupor" },
      {
        name: "description",
        content:
          "Learn how to join public WhatsApp groups safely. Protect your phone number, configure privacy settings, avoid suspicious links, and prevent spam.",
      },
      { property: "og:title", content: "How to Join WhatsApp Groups Safely | Groupor" },
      {
        property: "og:description",
        content: "Essential privacy and security steps when joining public WhatsApp invite links.",
      },
      { property: "og:url", content: absoluteUrl("/guides/how-to-join-whatsapp-groups-safely") },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/guides/how-to-join-whatsapp-groups-safely") }],
  }),
  component: SafetyGuidePage,
});

export function SafetyGuidePage() {
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
              Security & Privacy Guide
            </span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              How to Join WhatsApp Groups Safely: Complete Security Guide
            </h1>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span>By Groupor Trust & Safety Team</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="size-3.5" /> Last Reviewed: September 2026</span>
            </div>
          </header>

          <div className="mt-8 space-y-6 text-foreground leading-relaxed">
            <p className="text-base text-muted-foreground">
              WhatsApp groups offer incredible opportunities for professional networking, study groups, gaming squad formation, and international social discussion. However, because public invite links allow anyone to enter, taking smart security precautions is essential to safeguard your personal identity and device.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8">1. Configure Your WhatsApp Privacy Settings</h2>
            <p className="text-sm text-muted-foreground">
              Before clicking any public invite link, adjust your native WhatsApp settings to restrict who can see your personal information:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              <li><strong>Profile Photo & About:</strong> Set your profile photo and 'About' status visibility to <em>My Contacts</em> rather than <em>Everyone</em>.</li>
              <li><strong>Group Invitations:</strong> Change your Group privacy settings (Settings &rarr; Privacy &rarr; Groups) to <em>My Contacts</em> to prevent automated bots from force-adding you to unauthorized groups.</li>
              <li><strong>Phone Number Visibility:</strong> Be aware that members in traditional WhatsApp groups can see your phone number. Use secondary business numbers if you require extra anonymity.</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8">2. Verify the Invite Link Structure</h2>
            <p className="text-sm text-muted-foreground">
              Legitimate WhatsApp invite links always follow the official domain format: <code>https://chat.whatsapp.com/&lt;unique-code&gt;</code>.
            </p>
            <div className="rounded-xl border border-border bg-card p-4 text-sm">
              <strong className="text-foreground block mb-1">Red Flag Warning:</strong>
              Never enter your credentials on websites that ask you to log in with your phone number or OTP before redirecting to WhatsApp. Groupor redirects directly to official WhatsApp invite screens without asking for personal logins.
            </div>

            <h2 className="text-2xl font-bold text-foreground mt-8">3. Conduct Immediate In-Group Triage</h2>
            <p className="text-sm text-muted-foreground">
              When you first join a group:
            </p>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
              <li>Inspect the group description and admin list.</li>
              <li>Mute group notifications (Mute &rarr; Always) if the message volume is high.</li>
              <li>Disable automatic media downloads (Settings &rarr; Storage &amp; Data &rarr; Media Auto-Download) to prevent unwanted images or files from saving to your phone storage automatically.</li>
            </ol>

            <h2 className="text-2xl font-bold text-foreground mt-8">4. What to Do If You Encounter Spam or Scams</h2>
            <p className="text-sm text-muted-foreground">
              If members in a group start spamming investment schemes, fake job hiring forms, or inappropriate media, exit the group immediately and report it:
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <Link to="/how-reporting-works" className="rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground">
                Report a Group on Groupor
              </Link>
              <Link to="/safety" className="rounded-xl bg-muted px-4 py-2.5 text-xs font-semibold text-foreground">
                View Safety Center
              </Link>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
