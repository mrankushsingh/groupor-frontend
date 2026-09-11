import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Globe, Languages, Search, ShieldCheck, CheckCircle2 } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { GroupCard } from "@/components/GroupCard";
import { categories, countries, groups, languages } from "@/data/groups";
import { getCategoryIntro } from "@/data/category-intros";
import { useRemovedGroups } from "@/lib/removed-groups";
import { useSubmittedGroups } from "@/lib/submitted-groups";
import { absoluteUrl, categoryPath, countryPath, SITE_URL } from "@/lib/seo";

function findCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = findCategory(params.slug);
    if (!category) throw notFound();
    return { name: category.name, slug: category.slug };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Category not found — Groupor" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name} WhatsApp Group Links (2026) | Groupor`;
    const intro = getCategoryIntro(loaderData.slug);
    const description = intro.description.slice(0, 155);
    const url = absoluteUrl(categoryPath(loaderData.slug));
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: SITE_URL,
              },
              { "@type": "ListItem", position: 2, name: loaderData.name, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { name, slug } = Route.useLoaderData();
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [query, setQuery] = useState("");
  const { isRemoved } = useRemovedGroups();
  const submitted = useSubmittedGroups();

  const categoryIntro = getCategoryIntro(slug);

  const list = useMemo(() => {
    const all = [...submitted, ...groups];
    const base = slug === "all" ? all : all.filter((g) => g.category === slug);
    const q = query.trim().toLowerCase();
    return base.filter(
      (g) =>
        !isRemoved(g.id, g.link) &&
        (country === "" || g.country === country) &&
        (language === "" || g.language === language) &&
        (q === "" ||
          g.name.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.category.includes(q)),
    );
  }, [slug, country, language, query, isRemoved, submitted]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <nav className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="px-2">/</span>
          <span className="text-foreground">{name}</span>
        </nav>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {name} WhatsApp Group Links (2026)
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground max-w-4xl">
          {categoryIntro.description}
        </p>

        {/* Detailed 250-400 Word Category Overview Block */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <CheckCircle2 className="size-5 text-primary" />
                Who Should Join {name} Groups?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {categoryIntro.whoItIsFor}
              </p>

              <h2 className="mt-5 text-lg font-bold text-foreground">Popular Group Sub-Types</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {categoryIntro.popularTypes.map((type) => (
                  <li key={type}>{type}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <ShieldCheck className="size-5 text-primary" />
                Safety & Moderation Tips
              </h2>
              <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                {categoryIntro.safetyTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="size-1.5 rounded-full bg-primary shrink-0 mt-2" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          {list.length} active group{list.length === 1 ? "" : "s"} available
        </p>

        {/* Category Pills & Filters */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 10).map((c) => (
              <Link
                key={c.slug}
                to={categoryPath(c.slug)}
                className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                  c.slug === slug
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>

          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search in this category…"
              aria-label="Search groups"
              className="h-10 w-full rounded-xl border border-border bg-card pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
            />
          </div>

          <div className="relative min-w-[180px]">
            <Globe className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="h-10 w-full appearance-none rounded-xl border border-border bg-card pl-9 pr-8 text-sm text-foreground outline-none focus:border-primary"
            >
              <option value="">Any Country</option>
              {countries.slice(1).map((c) => (
                <option key={c.code} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative min-w-[180px]">
            <Languages className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="h-10 w-full appearance-none rounded-xl border border-border bg-card pl-9 pr-8 text-sm text-foreground outline-none focus:border-primary"
            >
              <option value="">Any Language</option>
              {languages.slice(1).map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((g, index) => (
            <GroupCard key={g.id} group={g} priority={index === 0} />
          ))}
        </div>
        {list.length === 0 && (
          <p className="mt-12 text-center text-sm text-muted-foreground">
            No groups here yet. Be the first to submit one.
          </p>
        )}

        {/* Contextual Internal Links (8-20 internal links) */}
        <section className="mt-16 border-t border-border pt-8">
          <h2 className="text-xl font-bold text-foreground">Explore Related Categories & Country Hubs</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
            {categories
              .filter((c) => c.slug !== slug && c.slug !== "all")
              .slice(0, 8)
              .map((c) => (
                <Link
                  key={c.slug}
                  to={categoryPath(c.slug)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {c.name} WhatsApp Groups
                </Link>
              ))}
            {countries.slice(1, 9).map((cnt) => (
              <Link
                key={cnt.code}
                to={countryPath(cnt.name)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                WhatsApp Groups in {cnt.name}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
