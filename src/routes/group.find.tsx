import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { SearchX } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { GroupCard } from "@/components/GroupCard";
import {
  categories,
  countries,
  groups,
  languages,
  slugify,
  type Group,
} from "@/data/groups";
import { useRemovedGroups } from "@/lib/removed-groups";
import { useSubmittedGroups } from "@/lib/submitted-groups";

type FindSearch = {
  category?: string;
  country?: string;
  language?: string;
  q?: string;
};

export const Route = createFileRoute("/group/find")({
  validateSearch: (search: Record<string, unknown>): FindSearch => {
    const out: FindSearch = {};
    if (typeof search.category === "string" && search.category.trim()) {
      out.category = search.category.trim();
    }
    if (typeof search.country === "string" && search.country.trim()) {
      out.country = search.country.trim();
    }
    if (typeof search.language === "string" && search.language.trim()) {
      out.language = search.language.trim();
    }
    if (typeof search.q === "string" && search.q.trim()) {
      out.q = search.q.trim();
    }
    return out;
  },
  head: ({ match }) => {
    const s = match.search;
    const bits = [s.category, s.country, s.language, s.q].filter(Boolean);
    const label = bits.length ? bits.join(" · ") : "All filters";
    const title = `Find WhatsApp Groups — ${label} | Groupor.link`;
    return {
      meta: [
        { title },
        {
          name: "description",
          content:
            "Find WhatsApp groups by category, country and language on Groupor.link.",
        },
        { name: "robots", content: "noindex, follow" },
        { property: "og:title", content: title },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: "https://groupor.link/group/find" }],
    };
  },
  component: FindPage,
});

function matchesQuery(group: Group, q: string) {
  if (!q) return true;
  const haystack = [
    group.name,
    group.description,
    group.category,
    group.country,
    group.language ?? "",
    ...(group.tags ?? []),
  ]
    .join(" ")
    .toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

function FindPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [category, setCategory] = React.useState(search.category ?? "");
  const [country, setCountry] = React.useState(search.country ?? "");
  const [language, setLanguage] = React.useState(search.language ?? "");
  const { isRemoved } = useRemovedGroups();
  const submitted = useSubmittedGroups();
  const PAGE_SIZE = 10;
  const [visible, setVisible] = React.useState(PAGE_SIZE);

  React.useEffect(() => {
    setCategory(search.category ?? "");
    setCountry(search.country ?? "");
    setLanguage(search.language ?? "");
    setVisible(PAGE_SIZE);
  }, [search.category, search.country, search.language, search.q]);

  const keyword = (search.q ?? "").trim();
  const appliedCategory = search.category ?? "";
  const appliedCountry = search.country ?? "";
  const appliedLanguage = search.language ?? "";

  const results = React.useMemo(() => {
    return [...submitted, ...[...groups].sort((a, b) => Number(b.id) - Number(a.id))].filter(
      (g) =>
        !isRemoved(g.id, g.link) &&
        matchesQuery(g, keyword) &&
        (appliedCategory === "" || g.category === appliedCategory) &&
        (appliedCountry === "" ||
          g.country === appliedCountry ||
          slugify(g.country) === slugify(appliedCountry)) &&
        (appliedLanguage === "" ||
          g.language === appliedLanguage ||
          slugify(g.language ?? "") === slugify(appliedLanguage)),
    );
  }, [
    submitted,
    isRemoved,
    keyword,
    appliedCategory,
    appliedCountry,
    appliedLanguage,
  ]);

  const hasFilters =
    appliedCategory !== "" ||
    appliedCountry !== "" ||
    appliedLanguage !== "" ||
    keyword !== "";

  const categoryName =
    categories.find((c) => c.slug === appliedCategory)?.name ?? appliedCategory;

  const applyFilters = (event?: React.FormEvent) => {
    event?.preventDefault();
    void navigate({
      to: "/group/find",
      search: {
        ...(category ? { category } : {}),
        ...(country ? { country } : {}),
        ...(language ? { language } : {}),
        ...(keyword ? { q: keyword } : {}),
      },
    });
  };

  const clearFilters = () => {
    setCategory("");
    setCountry("");
    setLanguage("");
    void navigate({ to: "/group/find", search: {} });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 pt-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Find WhatsApp Groups
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {hasFilters
            ? [
                categoryName || null,
                appliedCountry || null,
                appliedLanguage || null,
                keyword ? `“${keyword}”` : null,
              ]
                .filter(Boolean)
                .join(" · ")
            : "Choose a category, country, or language, then find groups."}
        </p>

        <form
          className="mt-6 flex flex-col gap-3 sm:flex-row"
          onSubmit={applyFilters}
        >
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

        <section className="mt-6">
          <p className="mb-3 text-sm text-muted-foreground">
            {results.length} group{results.length === 1 ? "" : "s"} found
          </p>

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
                Try a different category, country, or language.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Clear filters
                  </button>
                )}
                <Link
                  to="/"
                  className="rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary"
                >
                  Back to home
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
