import { Link } from "@tanstack/react-router";
import { GroupCard } from "@/components/GroupCard";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { categories, countries, type Group } from "@/data/groups";
import type { CategoryIntro } from "@/data/category-intros";
import { categoryPath, countryPath } from "@/lib/seo";
import { ShieldCheck, CheckCircle2, BookOpen, HelpCircle, MessageSquare } from "lucide-react";

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
        {/* Breadcrumb Navigation */}
        <nav className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="px-2">/</span>
          <span className="text-foreground">{parent}</span>
        </nav>

        {/* Primary Page Header */}
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{heading}</h1>
        <p className="mt-3 max-w-4xl text-base leading-relaxed text-muted-foreground">{intro}</p>

        {/* Category Intro & Structured Data Block */}
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

        {/* Group Listings Count */}
        <p className="mt-6 text-sm text-muted-foreground font-medium">
          {groups.length} active public group{groups.length === 1 ? "" : "s"} listed in this directory
        </p>

        {/* Group Grid */}
        <section className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label={heading}>
          {groups.map((group) => <GroupCard key={group.id} group={group} />)}
        </section>

        {groups.length === 0 && (
          <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-10 text-center shadow-card">
            <h3 className="text-lg font-semibold text-foreground">No groups listed here yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">Be the first community manager to submit a WhatsApp group for this hub!</p>
            <Link
              to="/group/addgroup"
              className="mt-5 inline-block rounded-md bg-cta px-6 py-2.5 text-sm font-bold text-cta-foreground transition-opacity hover:opacity-90"
            >
              + Add WhatsApp Group
            </Link>
          </div>
        )}

        {/* Comprehensive Text Expansion Block (High Text-to-HTML Ratio Upgrade) */}
        <section className="mt-16 border-t border-border pt-10 space-y-8 text-foreground">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Understanding {heading} Communities
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              WhatsApp messaging groups have become the world's most accessible medium for real-time peer discussion, professional networking, and instant information sharing. Finding reliable public invite links for <strong>{heading}</strong> allows you to engage with like-minded individuals, exchange valuable study resources, discover career openings, or simply share passion projects without algorithm interference.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Unlike social media feeds controlled by recommendation algorithms, joining a dedicated WhatsApp group puts you directly in touch with active community members. Whether you are seeking daily updates, regional meetups, expert advice, or interactive chat groups, Groupor ensures that every invite link listed in our <strong>{heading}</strong> directory is verified and active.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <MessageSquare className="size-5 text-primary" />
                Why Join Communities on Groupor?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Many online directories suffer from broken links, spam redirects, or unmoderated malicious content. Groupor eliminates these risks through multi-layer link health monitoring and strict community safety guidelines. We automatically purge inactive invite links and triage user reports within 24 hours.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <ShieldCheck className="size-5 text-primary" />
                Member Privacy & Security Best Practices
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                When participating in public messaging groups, always protect your personal privacy. Adjust your WhatsApp privacy settings (`Settings &rarr; Privacy`) to hide your profile photo and status from unknown contacts. Never share bank details, OTP codes, passwords, or personal financial documents in public group chats.
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <HelpCircle className="size-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Frequently Asked Questions about {heading}
              </h2>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 text-sm">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground">How do I join a group listed under {heading}?</h3>
                <p className="mt-1 text-muted-foreground leading-relaxed">
                  Click on any group card above, review the group description and rules, then tap "Join Group". You will be redirected safely to WhatsApp to confirm your entry.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground">Is it free to join or list a group on Groupor?</h3>
                <p className="mt-1 text-muted-foreground leading-relaxed">
                  Yes! All listings and group joins on Groupor are 100% free. We never charge subscription fees or require personal account creation.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground">What should I do if a group invite link is full or broken?</h3>
                <p className="mt-1 text-muted-foreground leading-relaxed">
                  WhatsApp groups have a capacity limit of 1,024 members. If an invite link has expired or reached capacity, click "Report Group" so our moderators can update or remove the link.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground">Can I submit my own WhatsApp group for free?</h3>
                <p className="mt-1 text-muted-foreground leading-relaxed">
                  Absolutly! If you are a group admin, click "+ Add WhatsApp Group" in the header to submit your public invite link to our global search directory.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Contextual Internal Linking (18 Links) */}
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
