import { Link } from "@tanstack/react-router";
import { GroupCard } from "@/components/GroupCard";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { categories, countries, type Group } from "@/data/groups";
import type { CategoryIntro } from "@/data/category-intros";
import { categoryPath, countryPath } from "@/lib/seo";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

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

        {/* Contextual Internal Links */}
        <section className="mt-16 border-t border-border pt-8">
          <h2 className="text-xl font-bold text-foreground">Explore More WhatsApp Communities</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
            {categories
              .filter((c) => c.slug !== categorySlug && c.slug !== "all")
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
