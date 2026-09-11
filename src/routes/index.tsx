import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { SearchX, ShieldCheck, Users, Globe, BookOpen, HelpCircle } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { GroupCard } from "@/components/GroupCard";
import { categories, countries, groups, languages, sortGroups } from "@/data/groups";
import { useRemovedGroups } from "@/lib/removed-groups";
import { fetchSubmittedForSsr, useSubmittedGroups } from "@/lib/submitted-groups";
import { absoluteUrl, categoryPath, countryPath, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/")({
  loader: async () => {
    const submitted = await fetchSubmittedForSsr();
    return { submitted };
  },
  validateSearch: (search: Record<string, unknown>) => {
    const q = typeof search.q === "string" ? search.q.trim() : "";
    return q ? { q } : {};
  },
  head: () => ({
    meta: [
      { title: "Join Active WhatsApp Groups by Category & Country | Groupor" },
      {
        name: "description",
        content:
          "Discover active WhatsApp group links for Gaming, Jobs, Education, Sports and 180+ countries. Join safely with verified community listings.",
      },
      { property: "og:title", content: "Join Active WhatsApp Groups by Category & Country | Groupor" },
      {
        property: "og:description",
        content: "Discover active WhatsApp group links for Gaming, Jobs, Education, Sports and 180+ countries.",
      },
      { property: "og:url", content: absoluteUrl("/") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Groupor",
          url: absoluteUrl("/"),
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_URL}/group/find?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Groupor",
          url: absoluteUrl("/"),
          logo: absoluteUrl("/og-image.png"),
          description: "Global directory of verified public WhatsApp group invite links.",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const loaderData = Route.useLoaderData();
  const navigate = useNavigate();
  const { q: searchQ } = Route.useSearch();
  const [country, setCountry] = React.useState("");
  const [language, setLanguage] = React.useState("");
  const [category, setCategory] = React.useState("");
  const { isRemoved } = useRemovedGroups();
  const submitted = useSubmittedGroups(loaderData?.submitted);
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

  const filteredResults = React.useMemo(() => {
    const all = sortGroups([...submitted, ...groups]).filter((g) => !isRemoved(g.id, g.link));
    return all.filter((g) => {
      if (category && g.category !== category) return false;
      if (country && g.country !== country) return false;
      if (language && g.language !== language) return false;
      return true;
    });
  }, [category, country, language, isRemoved, submitted]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-4 pt-8 pb-16">
        {/* Hero Section */}
        <div className="text-center">
          <Link
            to="/group/addgroup"
            className="inline-block rounded-md bg-cta px-6 py-3 text-lg font-bold text-cta-foreground transition-opacity hover:opacity-90"
          >
            + Add WhatsApp Group
          </Link>
          <h1 className="mx-auto mt-6 max-w-3xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Join Active WhatsApp Groups by Category & Country
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Groupor is your premier global directory for discovering active WhatsApp group invite links. Browse thousands of moderated communities across 28 categories, 180+ countries, and multiple languages.
          </p>
        </div>

        {/* Filter Bar */}
        <form className="mt-8 flex flex-col gap-3 sm:flex-row" onSubmit={goFind}>
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

        {/* Group Listings */}
        <section className="mt-8">
          <div className="flex flex-col gap-3">
            {filteredResults.slice(0, visible).map((g, index) => (
              <GroupCard key={g.id} group={g} priority={index === 0} />
            ))}
          </div>

          {filteredResults.length > 0 && (
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              disabled={visible >= filteredResults.length}
              className="mt-6 rounded-md bg-cta px-5 py-3 text-lg font-normal text-cta-foreground transition-opacity hover:opacity-90 disabled:cursor-default disabled:opacity-70"
            >
              {visible >= filteredResults.length ? "No more groups" : "Show more"}
            </button>
          )}

          {filteredResults.length === 0 && (
            <div className="mt-14 flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card p-10 text-center shadow-card">
              <div className="flex size-16 items-center justify-center rounded-full bg-muted">
                <SearchX className="size-8 text-muted-foreground" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">No matching groups found</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                No groups found matching your selected filters. Try clearing your filters or submit a group!
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setCategory("");
                    setCountry("");
                    setLanguage("");
                  }}
                  className="rounded-md border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:border-primary"
                >
                  Reset Filters
                </button>
                <Link
                  to="/group/addgroup"
                  className="rounded-md bg-cta px-4 py-2 text-sm font-bold text-cta-foreground hover:opacity-90"
                >
                  + Add WhatsApp Group
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* Extended SEO Content Section (900-1500 Words) */}
        <section className="mt-16 border-t border-border pt-12 space-y-12 text-foreground">
          {/* Section 1: What is Groupor */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              What is Groupor and How Does Joining WhatsApp Groups Work?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Groupor is a specialized search engine and verified index for public WhatsApp group invite links. In today’s interconnected digital landscape, messaging groups have evolved into vibrant digital spaces where millions of people exchange ideas, learn new skills, network professionally, and form friendships. Finding genuine, active group links on generic search engines often leads to dead links, spam redirects, or unsafe websites.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              At Groupor, we solve this problem by organizing public WhatsApp group links into clean, curated categories and regional hubs. Whether you are looking for job vacancy updates in India, cryptocurrency trading signals in the United States, BGMI gaming clans, or language learning exchange groups, Groupor makes finding and joining active communities simple, fast, and secure.
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="rounded-lg bg-primary/10 p-2.5 w-fit text-primary">
                  <ShieldCheck className="size-5" />
                </div>
                <h3 className="mt-3 font-bold text-foreground">Hand-Reviewed Listings</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Every submitted group link passes automated validation and human review to filter out spam and dead links.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="rounded-lg bg-primary/10 p-2.5 w-fit text-primary">
                  <Users className="size-5" />
                </div>
                <h3 className="mt-3 font-bold text-foreground">28 Diverse Categories</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Explore niches ranging from Education and Jobs to Gaming, Business, Entertainment, and Lifestyle.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="rounded-lg bg-primary/10 p-2.5 w-fit text-primary">
                  <Globe className="size-5" />
                </div>
                <h3 className="mt-3 font-bold text-foreground">Global Regional Hubs</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Find local group links across 180+ countries including India, USA, UK, Nigeria, Brazil, and Pakistan.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Explore Top Categories */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Explore Popular WhatsApp Group Categories
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Our directory organizes groups into specific interest hubs so you can easily connect with people who share your exact passions and goals. Here are some of our most popular categories:
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.slice(1, 13).map((cat) => (
                <Link
                  key={cat.slug}
                  to={categoryPath(cat.slug)}
                  className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-md"
                >
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {cat.name} WhatsApp Groups
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    Join active {cat.name.toLowerCase()} groups for networking, discussion, and regular updates.
                  </p>
                </Link>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link to="/group/find" className="text-sm font-semibold text-link underline hover:opacity-80">
                View All 28 WhatsApp Group Categories →
              </Link>
            </div>
          </div>

          {/* Section 3: Country & Language Communities */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Connect by Country and Language
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Localization is central to community building. Finding a group operating in your native language or regional location ensures higher engagement and relevant local discussions. Groupor supports country hubs for over 180 nations alongside multi-language filtering.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {countries.slice(1, 9).map((cnt) => (
                <Link
                  key={cnt.code}
                  to={countryPath(cnt.name)}
                  className="rounded-lg border border-border bg-card p-3 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-all text-center"
                >
                  WhatsApp Groups in {cnt.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Section 4: Safety & Moderation */}
          <div className="rounded-3xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              User Safety, Moderation & Reporting Standards
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Your safety and privacy are our highest priorities. Because public WhatsApp invite links allow anyone to join, we enforce rigorous safety guidelines and community moderation policies. We continuously purge expired invite links and ban spam submissions.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                to="/safety"
                className="rounded-xl bg-muted px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Safety Guidelines
              </Link>
              <Link
                to="/moderation-policy"
                className="rounded-xl bg-muted px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Moderation Policy
              </Link>
              <Link
                to="/how-reporting-works"
                className="rounded-xl bg-muted px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                How Takedowns Work
              </Link>
            </div>
          </div>

          {/* Section 5: Frequently Asked Questions (FAQ) */}
          <div>
            <div className="flex items-center gap-2">
              <HelpCircle className="size-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Frequently Asked Questions (FAQ)
              </h2>
            </div>

            <div className="mt-6 space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-bold text-foreground">How do I join a WhatsApp group on Groupor?</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Simply select a category or search for your topic of interest, click on the group card, and hit the "Join Group" button. You will be redirected safely to WhatsApp where you can preview the group title and confirm your entry.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-bold text-foreground">Is it free to submit and list my WhatsApp group?</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Yes, listing your WhatsApp group on Groupor is completely free. Click "+ Add WhatsApp Group" in the header, enter your group link and details, and submit. Once verified by our team, your group will be indexed publicly.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-bold text-foreground">What should I do if a group link is full or invalid?</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  WhatsApp groups have a capacity limit of 1,024 members. If an invite link has expired or reached capacity, please click the "Report Group" button on the group page so our automated system can update or remove the listing.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-bold text-foreground">How does Groupor protect member privacy?</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Groupor never requests phone numbers or personal account access. We strictly index public invite links. We advise all users to adjust their WhatsApp privacy settings before joining public groups.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
