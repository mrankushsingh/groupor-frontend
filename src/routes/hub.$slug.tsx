import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import * as React from "react";
import { getViralHubBySlug, viralHubs, type ViralHub } from "@/data/viral-hubs";
import { groups, sortGroups, type Group } from "@/data/groups";
import { GroupCard } from "@/components/GroupCard";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { absoluteUrl, SITE_URL } from "@/lib/seo";
import { fetchSubmittedForSsr, useSubmittedGroups } from "@/lib/submitted-groups";
import { useRemovedGroups } from "@/lib/removed-groups";
import { isSafeGroupForPublicFeed } from "@/lib/moderation";
import {
  CheckCircle2,
  ShieldCheck,
  HelpCircle,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

export const Route = createFileRoute("/hub/$slug")({
  loader: async ({ params }) => {
    const hub = getViralHubBySlug(params.slug);
    if (!hub) throw notFound();
    const submitted = await fetchSubmittedForSsr();
    return { hub, submitted };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.hub) return { meta: [{ name: "robots", content: "noindex" }] };
    const { hub } = loaderData;
    const url = absoluteUrl(`/hub/${hub.slug}`);

    const faqSchemaItems = hub.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    }));

    return {
      meta: [
        { title: hub.title },
        { name: "description", content: hub.metaDescription },
        { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
        { property: "og:title", content: hub.title },
        { property: "og:description", content: hub.metaDescription },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: hub.title },
        { name: "twitter:description", content: hub.metaDescription },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
                  { "@type": "ListItem", position: 2, name: "Trending Hubs", item: absoluteUrl("/") },
                  { "@type": "ListItem", position: 3, name: hub.h1, item: url },
                ],
              },
              {
                "@type": "CollectionPage",
                name: hub.h1,
                description: hub.metaDescription,
                url: url,
                inLanguage: "en-US",
                isPartOf: {
                  "@type": "WebSite",
                  name: "Groupor",
                  url: SITE_URL,
                },
              },
              {
                "@type": "FAQPage",
                mainEntity: faqSchemaItems,
              },
            ],
          }),
        },
      ],
    };
  },
  component: ViralHubComponent,
});

function ViralHubComponent() {
  const loaderData = Route.useLoaderData();
  const { hub } = loaderData;
  const submitted = useSubmittedGroups(loaderData?.submitted);
  const { isRemoved } = useRemovedGroups();

  const matchingGroups = React.useMemo(() => {
    const all = sortGroups([...submitted, ...groups]);
    return all.filter((g) => {
      if (g.status === "inactive" || isRemoved(g.id, g.link)) return false;
      if (!isSafeGroupForPublicFeed(g, false)) return false;

      // Match country
      const matchesCountry = g.country.toLowerCase() === hub.country.toLowerCase();
      // Match category
      const matchesCategory = g.category === hub.category;
      // Match tags
      const groupText = `${g.name} ${g.description} ${(g.tags || []).join(" ")}`.toLowerCase();
      const matchesTag = hub.tags.some((tag) => groupText.includes(tag.toLowerCase()));

      return matchesCountry || (matchesCategory && matchesTag) || matchesTag;
    });
  }, [hub, submitted, isRemoved]);

  const relatedHubs = viralHubs.filter((h) => h.slug !== hub.slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-4 pt-8 pb-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <ol className="flex items-center gap-2">
            <li>
              <Link to="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/group/find" className="hover:text-foreground">
                Communities
              </Link>
            </li>
            <li>/</li>
            <li className="font-medium text-foreground">{hub.country}</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="mt-6">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <TrendingUp className="size-3.5" />
            <span>{hub.badge}</span>
          </div>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {hub.h1}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {hub.overview}
          </p>
        </div>

        {/* Key Insights Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {hub.keyInsights.map((insight, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-border bg-card p-5 shadow-xs"
            >
              <div className="flex items-center gap-2 font-semibold text-foreground">
                <CheckCircle2 className="size-4.5 text-primary" />
                <span>{insight.title}</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {insight.description}
              </p>
            </div>
          ))}
        </div>

        {/* Group Listings Section */}
        <section className="mt-10">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Verified WhatsApp Communities
              </h2>
              <p className="text-xs text-muted-foreground">
                {matchingGroups.length} active group{matchingGroups.length === 1 ? "" : "s"} found for this topic
              </p>
            </div>
            <Link
              to="/group/addgroup"
              className="inline-flex items-center gap-1.5 rounded-md bg-cta px-3.5 py-1.5 text-xs font-bold text-cta-foreground transition-opacity hover:opacity-90"
            >
              <Sparkles className="size-3.5" />
              <span>Submit Group</span>
            </Link>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            {matchingGroups.map((group, idx) => (
              <GroupCard key={group.id || idx} group={group} priority={idx === 0} />
            ))}
          </div>
        </section>

        {/* Safety Guidelines */}
        <section className="mt-12 rounded-2xl border border-border bg-card p-6 shadow-xs">
          <div className="flex items-center gap-2 font-bold text-foreground">
            <ShieldCheck className="size-5 text-primary" />
            <h3 className="text-lg">Trust & Member Security Guidelines</h3>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {hub.guidelines.map((guideline, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>{guideline}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Interactive FAQ Accordion */}
        <section className="mt-12">
          <div className="flex items-center gap-2">
            <HelpCircle className="size-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
            {hub.faqs.map((faq, i) => (
              <details key={i} className="group p-5 [&_summary::-webkit-details-marker]:hidden" open={i === 0}>
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-foreground">
                  <span>{faq.question}</span>
                  <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Related Viral Hubs Section */}
        <section className="mt-14 border-t border-border pt-10">
          <h3 className="text-lg font-bold text-foreground">
            Explore More Trending Communities
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {relatedHubs.map((h) => (
              <Link
                key={h.slug}
                to={`/hub/${h.slug}`}
                className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
              >
                <div>
                  <span className="text-xs font-semibold text-primary">{h.badge}</span>
                  <p className="mt-0.5 text-sm font-bold text-foreground group-hover:text-primary">
                    {h.h1}
                  </p>
                </div>
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
