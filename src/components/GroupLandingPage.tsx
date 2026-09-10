import { Link } from "@tanstack/react-router";
import { GroupCard } from "@/components/GroupCard";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { type Group } from "@/data/groups";

export function GroupLandingPage({
  heading,
  intro,
  groups,
  parent,
}: {
  heading: string;
  intro: string;
  groups: Group[];
  parent: string;
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
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">{heading}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{intro}</p>
        <p className="mt-4 text-sm text-muted-foreground">{groups.length} active group{groups.length === 1 ? "" : "s"} available</p>
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
      </main>
      <SiteFooter />
    </div>
  );
}
