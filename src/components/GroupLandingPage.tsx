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
      </main>
      <SiteFooter />
    </div>
  );
}
