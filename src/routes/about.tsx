import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Users, Zap } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Groupor.link — How Our WhatsApp Group Directory Works" },
      {
        name: "description",
        content:
          "Groupor.link is a free directory of active WhatsApp groups, reviewed by hand and organised by category, country and language.",
      },
      { property: "og:title", content: "About Groupor.link" },
      {
        property: "og:description",
        content: "A hand-reviewed, free directory of active WhatsApp group links.",
      },
      { property: "og:url", content: "https://groupor.link/about" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://groupor.link/about" }],
  }),
  component: AboutPage,
});

const points = [
  {
    icon: ShieldCheck,
    title: "Reviewed by hand",
    body: "Every submitted link is checked before it goes live. Dead or spammy groups get removed.",
  },
  {
    icon: Users,
    title: "Organised by category",
    body: "Jobs, crypto, education, movies, tech and more — find the community you actually want.",
  },
  {
    icon: Zap,
    title: "Free forever",
    body: "No account, no fees. Browse links or list your own group in under a minute.",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-14">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">About Groupor.link</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Groupor.link collects public WhatsApp invite links in one searchable place,
          so you can find an active community instead of scrolling through dead groups.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {points.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <p.icon className="size-5 text-primary" />
              <h2 className="mt-3 text-sm font-semibold text-foreground">{p.title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-xl font-bold text-foreground">Rules for listed groups</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>No adult, illegal, hateful or scam content.</li>
          <li>The invite link must be public and working.</li>
          <li>One listing per group — duplicates are removed.</li>
          <li>Report a bad group and we will take it down.</li>
        </ul>

        <Link
          to="/group/addgroup"
          className="mt-10 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Submit your group
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
