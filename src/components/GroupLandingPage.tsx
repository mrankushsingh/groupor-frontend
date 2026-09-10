import { Link } from "@tanstack/react-router";
import { GroupCard } from "@/components/GroupCard";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { categories, countries, type Group } from "@/data/groups";
import type { CategoryIntro } from "@/data/category-intros";
import { categoryPath, countryPath } from "@/lib/seo";
import { ShieldCheck, CheckCircle2, BookOpen } from "lucide-react";

export function GroupLandingPage({
  heading,
  intro,
  groups,
  parent,
  categoryIntro,
  categorySlug,
}: {
  heading: string;
  intro: string;
  groups: Group[];
  parent: string;
  categoryIntro?: CategoryIntro;
  categorySlug?: string;
}) {
  const relatedCategories = categories
    .filter((c) => c.slug !== categorySlug && c.slug !== "all")
    .slice(0, 6);
  const topCountries = countries.filter((c) => Boolean(c.code)).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <nav className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="px-2">/</span>
          <span className="text-foreground">{parent}</span>
        </nav>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{heading}</h1>
        <p className="mt-3 max-w-4xl text-base leading-relaxed text-muted-foreground">{intro}</p>

        {categoryIntro && (
          <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-primary" />
                  Target Community & Audience
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {categoryIntro.whoItIsFor}
                </p>

                <h2 className="mt-5 text-lg font-bold text-foreground">Popular Group Topics</h2>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {categoryIntro.popularTypes.map((type) => (
                    <li key={type}>{type}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <ShieldCheck className="size-5 text-primary" />
                  Safety & Moderation Guidelines
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
        )}

        <p className="mt-6 text-sm text-muted-foreground">{groups.length} active group{groups.length === 1 ? "" : "s"} available</p>
        
        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label={heading}>
          {groups.map((group) => <GroupCard key={group.id} group={group} />)}
        </section>

        {groups.length === 0 && (
          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-10 text-center shadow-card">
            <h3 className="text-lg font-semibold text-foreground">No groups listed here yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">Be the first to submit a group for this community!</p>
            <Link
              to="/group/addgroup"
              className="mt-5 inline-block rounded-md bg-cta px-6 py-2.5 text-sm font-bold text-cta-foreground transition-opacity hover:opacity-90"
            >
              + Add WhatsApp Group
            </Link>
          </div>
        )}

        {/* Enhanced Contextual Internal Linking (12-18 Links) */}
        <section className="mt-16 border-t border-border pt-10 space-y-8">
          <h2 className="text-2xl font-bold text-foreground">Explore Related Categories, Country Hubs & Guides</h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Related Category Links (6 links) */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Related Categories</h3>
              <ul className="space-y-2 text-sm">
                {relatedCategories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      to={categoryPath(c.slug)}
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
                    >
                      <span className="size-1.5 rounded-full bg-primary/60" />
                      {c.name} WhatsApp Groups
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Regional Country Hubs (4 links) */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Popular Country Hubs</h3>
              <ul className="space-y-2 text-sm">
                {topCountries.map((cnt) => (
                  <li key={cnt.code}>
                    <Link
                      to={countryPath(cnt.name)}
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
                    >
                      <span className="size-1.5 rounded-full bg-primary/60" />
                      WhatsApp Groups in {cnt.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Authority Guides & Actions (8 links) */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Community Guides & Safety</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/guides/how-to-join-whatsapp-groups-safely" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                    <BookOpen className="size-3.5 text-primary shrink-0" />
                    How to Join Groups Safely
                  </Link>
                </li>
                <li>
                  <Link to="/guides/whatsapp-community-vs-group" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                    <BookOpen className="size-3.5 text-primary shrink-0" />
                    WhatsApp Community vs Group
                  </Link>
                </li>
                <li>
                  <Link to="/guides/how-to-avoid-whatsapp-scams" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                    <BookOpen className="size-3.5 text-primary shrink-0" />
                    Avoid WhatsApp Scams & Fraud
                  </Link>
                </li>
                <li>
                  <Link to="/guides/whatsapp-group-admin-guidelines" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                    <BookOpen className="size-3.5 text-primary shrink-0" />
                    Group Admin Guidelines
                  </Link>
                </li>
                <li>
                  <Link to="/safety" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                    <ShieldCheck className="size-3.5 text-primary shrink-0" />
                    Groupor Trust & Safety Center
                  </Link>
                </li>
                <li>
                  <Link to="/how-reporting-works" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                    <ShieldCheck className="size-3.5 text-primary shrink-0" />
                    How Group Reporting Works
                  </Link>
                </li>
                <li>
                  <Link to="/group/addgroup" className="text-primary font-semibold hover:underline flex items-center gap-1.5">
                    + Submit Your WhatsApp Group
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
