import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

const FAQS = [
  {
    q: "What is Groupor?",
    a: "Groupor is a free WhatsApp group links directory. Visitors can browse groups by category, country, and language, then join the ones they like with one click.",
  },
  {
    q: "How do I submit a WhatsApp group?",
    a: "Click the Add Group button in the header, paste your WhatsApp group invite link, choose a category, country, and language, then submit. After you submit, we fetch the group name and photo when possible.",
  },
  {
    q: "Why is my group not showing immediately?",
    a: "Most groups appear right away after submission. If a link is invalid, private, or repeatedly reported, it may be hidden or removed to keep the directory safe for everyone.",
  },
  {
    q: "Can I submit the same group more than once?",
    a: "No. Duplicate invite links are detected automatically and only one listing per group is kept, so the directory stays clean.",
  },
  {
    q: "How do I find groups by category, country, or language?",
    a: "Use the filters on the homepage. Pick any category, country, or language from the dropdowns and click Find Group to see matching results.",
  },
  {
    q: "Can I report a group?",
    a: "Yes. Open any group detail page and use the Report option. Reports are reviewed and repeated violations can lead to removal.",
  },
  {
    q: "Are groups moderated?",
    a: "We review reported groups and remove links that are broken, spam, or violate our Terms & Conditions. We do not pre-approve every submission, so please report anything inappropriate.",
  },
  {
    q: "What information does Groupor collect?",
    a: "We do not require registration to browse or submit groups. When you contact us, we only collect the information you provide in the contact form. Read our Privacy Policy for full details.",
  },
  {
    q: "Is Groupor affiliated with WhatsApp?",
    a: "No. Groupor is an independent directory and is not affiliated with, endorsed by, or sponsored by WhatsApp Inc. or Meta Platforms, Inc.",
  },
  {
    q: "How do I remove a group I submitted?",
    a: "If you are the group admin and want your listing removed, report it using the Report option on the group page or contact us with the invite link.",
  },
  {
    q: "How can I contact support?",
    a: "Email us at support@groupor.link or use the contact form on the Contact page.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Groupor.link WhatsApp Group Directory" },
      {
        name: "description",
        content:
          "Find answers about submitting WhatsApp groups, viewing group listings, moderation, privacy, and reporting on Groupor.link.",
      },
      { property: "og:title", content: "FAQ — Groupor.link" },
      {
        property: "og:description",
        content:
          "Common questions about Groupor.link: submitting groups, finding groups, moderation, and privacy.",
      },
      { property: "og:url", content: "https://groupor.link/faq" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://groupor.link/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              Common questions about submitting, viewing, and reporting WhatsApp groups.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
              >
                <h2 className="text-lg font-semibold text-foreground">{item.q}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-muted-foreground">
            Still have questions?{" "}
            <Link to="/contact" className="font-semibold text-primary underline">
              Contact us
            </Link>{" "}
            or read our{" "}
            <Link to="/privacy" className="font-semibold text-primary underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to="/terms" className="font-semibold text-primary underline">
              Terms & Conditions
            </Link>
            .
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
