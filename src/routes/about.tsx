import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Users, Zap, Mail, MapPin, Calendar, Award } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Groupor — Company, Editorial Team & Mission" },
      {
        name: "description",
        content:
          "Learn about Groupor, our hand-reviewed WhatsApp group directory, trust & safety editorial standards, company mission, and verification process.",
      },
      { property: "og:title", content: "About Groupor — Company & Editorial Standards" },
      {
        property: "og:description",
        content: "Discover how Groupor verifies public messaging group links safely.",
      },
      { property: "og:url", content: absoluteUrl("/about") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/about") }],
  }),
  component: AboutPage,
});

const points = [
  {
    icon: ShieldCheck,
    title: "Multi-Layer Review",
    body: "Every submitted link passes automated domain verification and manual human moderation before going live.",
  },
  {
    icon: Users,
    title: "Taxonomy & Categories",
    body: "Organized across 28 distinct interest hubs and 180+ country communities for precision discovery.",
  },
  {
    icon: Zap,
    title: "100% Free Access",
    body: "No registration required, no subscription fees. Browse verified invite links instantly.",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <header className="border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-primary">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-primary">
              <Award className="size-3.5" /> E-E-A-T Verified Directory
            </span>
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <Calendar className="size-3.5" /> Last Reviewed: September 2026
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            About Groupor
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            Groupor is a dedicated global index and discovery platform for public WhatsApp group invite links. Founded to solve the widespread issue of broken links, spam, and unmoderated social messaging feeds, Groupor connects individuals with active, high-quality online communities.
          </p>
        </header>

        {/* Company & Mission */}
        <section className="mt-10 space-y-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Our Mission & Platform Standards</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Messaging platforms like WhatsApp have transformed into vital hubs for professional networking, educational collaboration, language learning, and hobby sharing. However, finding genuine groups on open web search engines is often frustrating due to dead links or fraudulent sites.
            </p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Groupor maintains strict editorial oversight. We index public invite links while enforcing rigorous moderation guidelines to protect users from spam, financial scams, and unsafe media.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {points.map((p) => (
              <div key={p.title} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <p.icon className="size-5 text-primary" />
                <h3 className="mt-3 text-base font-bold text-foreground">{p.title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>

          {/* Editorial Leadership & Ownership */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-foreground">Editorial Ownership & Review Board</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Groupor is operated by a dedicated team of digital safety specialists, web editors, and community moderators. All listing criteria, safety documentation, and category intro guides are created under the supervision of the <strong>Groupor Trust & Safety Editorial Team</strong>.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 pt-2 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="size-5 text-primary shrink-0" />
                <div>
                  <span className="font-bold text-foreground block">Editorial Contact</span>
                  <a href="mailto:support@groupor.link" className="text-primary hover:underline text-xs">
                    support@groupor.link
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="size-5 text-primary shrink-0" />
                <div>
                  <span className="font-bold text-foreground block">Global Operations</span>
                  <span className="text-muted-foreground text-xs">Serving users in 180+ countries worldwide</span>
                </div>
              </div>
            </div>
          </div>

          {/* Listing Quality Rules */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Strict Listing Guidelines</h2>
            <ul className="mt-4 list-disc space-y-2.5 pl-5 text-sm text-muted-foreground">
              <li><strong>Zero Adult or Illegal Content:</strong> Groups containing explicit, hateful, or illegal material are permanently banned.</li>
              <li><strong>Working Invite Links:</strong> Automated scripts regularly verify that invite links remain active and valid.</li>
              <li><strong>Single Master Listing:</strong> Duplicate submissions are merged to ensure clean search navigation.</li>
              <li><strong>Rapid Community Takedowns:</strong> User reports are triaged within 24 hours to remove dead or violating groups.</li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
            <Link
              to="/group/addgroup"
              className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Submit Your WhatsApp Group
            </Link>
            <Link
              to="/safety"
              className="rounded-xl bg-muted px-5 py-3 text-sm font-semibold text-foreground hover:bg-card transition-colors"
            >
              Visit Safety Center
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
