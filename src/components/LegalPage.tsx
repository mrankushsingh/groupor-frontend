import type { ReactNode } from "react";
import { ShieldCheck, Calendar } from "lucide-react";

type Section = { heading: string; body: ReactNode };

function normalizeBrandCopy(value: string) {
  return value
    .replaceAll("GroupSor.com", "Groupor.link")
    .replaceAll("GroupSor", "Groupor")
    .replaceAll("Groupsor", "Groupor")
    .replaceAll("groupsor.link", "groupor.link");
}

export function LegalPage({
  title,
  intro,
  notice,
  sections,
}: {
  title: string;
  intro?: string;
  notice?: ReactNode;
  sections: Section[];
}) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-primary mb-3">
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-primary">
          <ShieldCheck className="size-3.5" /> Official Governance Document
        </span>
        <span className="inline-flex items-center gap-1 text-muted-foreground">
          <Calendar className="size-3.5" /> Last Reviewed: September 2026
        </span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{title}</h1>
      
      {notice ? (
        <p className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
          {notice}
        </p>
      ) : null}
      
      {intro ? <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{normalizeBrandCopy(intro)}</p> : null}
      
      <div className="mt-8 space-y-8">
        {sections.map((s) => (
          <section key={s.heading} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-bold text-foreground">{s.heading}</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {typeof s.body === "string" ? <p>{normalizeBrandCopy(s.body)}</p> : s.body}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
