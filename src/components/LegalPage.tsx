import type { ReactNode } from "react";

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
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      {notice ? (
        <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-bold text-destructive">
          {notice}
        </p>
      ) : null}
      {intro ? <p className="mt-3 text-sm text-muted-foreground">{normalizeBrandCopy(intro)}</p> : null}
      <div className="mt-6 space-y-6">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-base font-semibold text-foreground">{s.heading}</h2>
            <div className="mt-2 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {typeof s.body === "string" ? <p>{normalizeBrandCopy(s.body)}</p> : s.body}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
