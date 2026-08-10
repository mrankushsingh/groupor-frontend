import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { SearchX } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { GroupCard } from "@/components/GroupCard";
import { categories, countries, groups, languages } from "@/data/groups";
import { useRemovedGroups } from "@/lib/removed-groups";
import { useSubmittedGroups } from "@/lib/submitted-groups";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => {
    const q = typeof search.q === "string" ? search.q.trim() : "";
    return q ? { q } : {};
  },
  head: () => ({
    meta: [
      { title: "WhatsApp Group Links — Join Active Groups | Groupor.link" },
      {
        name: "description",
        content:
          "Find and join active WhatsApp groups by category, country and language: jobs, crypto, education, movies, tech and more. Submit your own group free.",
      },
      { property: "og:title", content: "WhatsApp Group Links — Join Active Groups" },
      {
        property: "og:description",
        content: "Browse thousands of active WhatsApp group invite links by category.",
      },
      { property: "og:url", content: "https://groupor.link/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://groupor.link/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Groupor.link",
          url: "https://groupor.link/",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://groupor.link/group/find?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const { q: searchQ } = Route.useSearch();
  const [country, setCountry] = React.useState("");
  const [language, setLanguage] = React.useState("");
  const [category, setCategory] = React.useState("");
  const { isRemoved } = useRemovedGroups();
  const submitted = useSubmittedGroups();
  const PAGE_SIZE = 10;
  const [visible, setVisible] = React.useState(PAGE_SIZE);

  // Legacy ?q= on home → find page
  React.useEffect(() => {
    const q = (searchQ ?? "").trim();
    if (!q) return;
    void navigate({ to: "/group/find", search: { q }, replace: true });
  }, [searchQ, navigate]);

  const goFind = (event?: React.FormEvent) => {
    event?.preventDefault();
    void navigate({
      to: "/group/find",
      search: {
        ...(category ? { category } : {}),
        ...(country ? { country } : {}),
        ...(language ? { language } : {}),
      },
    });
  };

  const results = React.useMemo(() => {
    return [...submitted, ...[...groups].sort((a, b) => Number(b.id) - Number(a.id))].filter(
      (g) => !isRemoved(g.id, g.link),
    );
  }, [isRemoved, submitted]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-4 pt-8">
        <div className="text-center">
          <Link
            to="/group/addgroup"
            className="inline-block rounded-md bg-cta px-6 py-3 text-lg font-bold text-cta-foreground transition-opacity hover:opacity-90"
          >
            + Add Whatsapp Group
          </Link>
          <h1 className="mx-auto mt-6 max-w-3xl text-3xl font-bold tracking-tight text-foreground">
            Find WhatsApp Groups by Category, Country and Language
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Groupor helps you discover public WhatsApp communities for work, education, gaming,
            technology and more. Browse by topic, location or language, then join the groups that
            match your interests.
          </p>
        </div>

        <form className="mt-6 flex flex-col gap-3 sm:flex-row" onSubmit={goFind}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Category"
            className="h-12 flex-1 rounded-md border border-border bg-card px-3 text-base text-foreground outline-none focus:border-primary"
          >
            <option value="">Any Category</option>
            {categories.slice(1).map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            aria-label="Country"
            className="h-12 flex-1 rounded-md border border-border bg-card px-3 text-base text-foreground outline-none focus:border-primary"
          >
            <option value="">Any Country</option>
            {countries.slice(1).map((c) => (
              <option key={c.code} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            aria-label="Language"
            className="h-12 flex-1 rounded-md border border-border bg-card px-3 text-base text-foreground outline-none focus:border-primary"
          >
            <option value="">Any Language</option>
            {languages.slice(1).map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="h-12 flex-1 rounded-md bg-cta px-6 text-base font-bold text-cta-foreground transition-opacity hover:opacity-90"
          >
            Find group
          </button>
        </form>

        <section className="mt-4">
          <div className="flex flex-col gap-3">
            {results.slice(0, visible).map((g) => (
              <GroupCard key={g.id} group={g} />
            ))}
          </div>

          {results.length > 0 && (
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              disabled={visible >= results.length}
              className="mt-6 rounded-md bg-cta px-5 py-3 text-lg font-normal text-cta-foreground transition-opacity hover:opacity-90 disabled:cursor-default disabled:opacity-70"
            >
              {visible >= results.length ? "No more groups" : "Show more"}
            </button>
          )}

          {results.length === 0 && (
            <div className="mt-14 flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card p-10 text-center shadow-card">
              <div className="flex size-16 items-center justify-center rounded-full bg-muted">
                <SearchX className="size-8 text-muted-foreground" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">No groups found</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Try finding groups by category, country, or language.
              </p>
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
