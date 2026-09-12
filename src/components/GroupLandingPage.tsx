import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { GroupCard } from "@/components/GroupCard";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { categories, countries, type Group } from "@/data/groups";
import type { CategoryIntro } from "@/data/category-intros";
import { categoryPath, countryPath } from "@/lib/seo";
import { ShieldCheck, CheckCircle2, BookOpen, HelpCircle, MessageSquare } from "lucide-react";

const PAGE_SIZE = 50;

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
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [heading]);

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
          {groups.slice(0, visible).map((group, index) => (
            <GroupCard key={group.id} group={group} priority={index === 0} />
          ))}
        </section>

        {groups.length > 0 && (
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            disabled={visible >= groups.length}
            className="mt-6 rounded-md bg-cta px-5 py-3 text-lg font-normal text-cta-foreground transition-opacity hover:opacity-90 disabled:cursor-default disabled:opacity-70"
          >
            {visible >= groups.length ? "No more groups" : "Show more"}
          </button>
        )}

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
        <section className="mt-16 border-t border-border pt-10 space-y-10 text-foreground">
          <article className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Comprehensive Directory Guide: {heading}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              WhatsApp messaging groups have established themselves as the world's primary instant communication standard for real-time peer discussion, localized community coordination, professional networking, and direct information exchange. Accessing high-quality, verified public invite links for <strong>{heading}</strong> allows users to connect with active interest groups, share expert insights, receive instant community updates, and participate in peer-to-peer discussions without algorithmic content filtering or paywalls.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              Unlike open social media platforms where discovery algorithms prioritize sponsored content or clickbait, joining a dedicated WhatsApp group listed under <strong>{heading}</strong> puts you directly in contact with active, real-time community members. Whether you are looking for localized group chats, global topic discussions, skill-building networks, or active social hubs, Groupor verifies invite links to ensure a safe, accessible, and seamless joining experience.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              For specialized topics—including mature, adult, or 18+ social hubs—Groupor maintains strict moderation guidelines requiring age verification awareness, explicit mutual consent, and zero-tolerance policies against illegal content, non-consensual media sharing, or harassment. All listed communities must adhere to international digital safety guidelines and respect user privacy at all times.
            </p>
          </article>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-3">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <MessageSquare className="size-5 text-primary shrink-0" />
                Why Discover Communities on Groupor?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Navigating open web searches for active messaging groups often leads to broken invite links, deceptive redirect loops, or unmoderated spam feeds. Groupor solves these friction points through automated link format validation, continuous uptime monitoring, and active community moderation. Inactive or full groups (exceeding WhatsApp's 1,024 member capacity) are flagged and updated promptly to maintain directory reliability.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-3">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <ShieldCheck className="size-5 text-primary shrink-0" />
                Member Privacy & Security Protocols
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                When participating in public or semi-private messaging groups, protecting your digital privacy is essential. We strongly recommend adjusting your personal WhatsApp privacy settings (`Settings &rarr; Privacy`) to restrict your profile photo, about info, and online status to contacts only before joining public group invite links. Never disclose financial credentials, bank details, passwords, or one-time passcodes (OTPs) in group discussions.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-foreground">
              Community Etiquette & Group Participation Standards
            </h2>
            <div className="grid gap-4 sm:grid-cols-3 text-sm">
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">1. Respect Member Boundaries</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Treat all group participants with courtesy. Do not send unsolicited private direct messages (DMs) to co-members without explicit prior consent.
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">2. Zero Tolerance for Spam</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Avoid repetitive promotional posting, deceptive affiliate links, unverified financial schemes, or bulk messaging in public group chats.
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">3. Follow Admin Rules</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Every group operates under specific topic guidelines set by its administrators. Adhere strictly to pin posts and group descriptions.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <HelpCircle className="size-6 text-primary shrink-0" />
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Frequently Asked Questions regarding {heading}
              </h2>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 text-sm">
              <div className="rounded-xl border border-border bg-card p-5 space-y-1">
                <h3 className="font-bold text-foreground">How do I join a group listed under {heading}?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Browse the verified group cards listed above, review the group description and member guidelines, and click the "Join Group" button. You will be redirected safely to WhatsApp to preview the group and confirm your entry.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 space-y-1">
                <h3 className="font-bold text-foreground">Is it free to join or list a group on Groupor?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Yes, 100%! All group discovery, link validation, and group submissions on Groupor are completely free. We do not require registration, credit card details, or paid subscriptions.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 space-y-1">
                <h3 className="font-bold text-foreground">What should I do if a group invite link is full or invalid?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  WhatsApp groups have an upper limit of 1,024 participants. If a link has expired or the group is full, click the "Report Group" button on the group page. Our moderation team will test and update or replace the link within 24 hours.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 space-y-1">
                <h3 className="font-bold text-foreground">Can group administrators submit custom WhatsApp links?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Yes! Community managers and group admins can click "+ Add WhatsApp Group" in our main navigation menu to submit active invite links for instant indexing and global discovery.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 space-y-1">
                <h3 className="font-bold text-foreground">How does Groupor moderate adult or 18+ category listings?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Adult and 18+ category listings are restricted to consenting adult users. Groupor enforces strict zero-tolerance screening against non-consensual content, hate speech, or exploitation. Violating groups are permanently removed.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 space-y-1">
                <h3 className="font-bold text-foreground">How often is the Groupor directory updated?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our directory system processes link health checks daily, automatically re-verifying invite codes and incorporating new community submissions continuously.
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
