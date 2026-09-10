import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, CheckCircle, Search, ShieldCheck } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/editorial-policy")({
  head: () => ({
    meta: [
      { title: "Editorial Standards & Quality Guidelines | Groupor" },
      {
        name: "description",
        content:
          "Groupor editorial policy defines how we organize, evaluate, describe, and update community listings to uphold clarity and user trust.",
      },
      { property: "og:title", content: "Editorial Standards & Quality Guidelines | Groupor" },
      {
        property: "og:description",
        content: "Guidelines for title accuracy, taxonomy classification, content quality, and directory ethics.",
      },
      { property: "og:url", content: absoluteUrl("/editorial-policy") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/editorial-policy") }],
  }),
  component: EditorialPolicyPage,
});

export function EditorialPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <header className="border-b border-border pb-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <BookOpen className="size-4" />
            <span>Groupor Editorial Principles</span>
          </div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Editorial Policy & Content Quality Standards
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Our editorial guidelines ensure that every category, country hub, and group profile listed on Groupor meets high standards of accuracy and clarity.
          </p>
        </header>

        <section className="mt-10 space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Our Core Editorial Pillars</h2>
            <p className="mt-2 text-muted-foreground">
              Groupor is built around providing users with accurate, relevant, and well-organized information. We maintain strict independence from third-party advertising promoters and enforce editorial standards across all directory pages.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Search className="size-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">Accuracy & Truth in Metadata</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Group titles and descriptions must accurately reflect the true focus of the group. Clickbait titles, fake member counts, and deceptive promotional tags are stripped or rejected during editorial review.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">Structured Taxonomy & Categories</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                We categorize groups across 28 distinct industry and interest hubs. Groups are assigned to their primary relevant category, preventing spam across unrelated category feeds.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Directory Content Integrity</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="size-4 text-primary shrink-0 mt-0.5" />
                <span><strong>No Paid Ranking Manipulation:</strong> Group listing order is strictly based on activity, relevance, and publication freshness. Paid placement cannot bypass moderation rules.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="size-4 text-primary shrink-0 mt-0.5" />
                <span><strong>Regular Content Reviews:</strong> Category summaries and safety intros are updated regularly to reflect emerging online security trends and community guidelines.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="size-4 text-primary shrink-0 mt-0.5" />
                <span><strong>Duplicate Prevention:</strong> Duplicate submissions of the same WhatsApp invite link across multiple names or categories are consolidated into a single master profile.</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
