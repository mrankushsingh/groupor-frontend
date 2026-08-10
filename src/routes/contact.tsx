import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Groupor.link" },
      {
        name: "description",
        content: "Contact Groupor.link for support at support@groupor.link.",
      },
      { property: "og:title", content: "Contact Us — Groupor.link" },
      {
        property: "og:description",
        content: "Contact Groupor.link for support at support@groupor.link.",
      },
      { property: "og:url", content: "https://groupor.link/contact" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://groupor.link/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Groupor.link",
            url: "https://groupor.link",
            email: "mailto:support@groupor.link",
            description: "Free WhatsApp group links directory.",
          },
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Us — Groupor.link",
            description: "Contact Groupor.link for support at support@groupor.link.",
            url: "https://groupor.link/contact",
            mainEntity: { "@id": "https://groupor.link/#organization" },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "Customer Support",
              email: "support@groupor.link",
            },
          },
        ]),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Contact Us
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              Email: <a href="mailto:support@groupor.link" className="font-semibold text-primary hover:underline">support@groupor.link</a>
            </p>
          </div>

          <form
            action="mailto:support@groupor.link"
            method="post"
            encType="text/plain"
            className="space-y-5"
            onSubmit={(e) => {
              const form = e.currentTarget;
              const a = Number((form.elements.namedItem("captcha_a") as HTMLInputElement).value);
              const b = Number((form.elements.namedItem("captcha_b") as HTMLInputElement).value);
              const ans = Number((form.elements.namedItem("captcha_ans") as HTMLInputElement).value);
              if (a + b !== ans) {
                e.preventDefault();
                alert("Please solve the sum correctly.");
              }
            }}
          >
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-foreground">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                maxLength={100}
                placeholder="Enter your name"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-foreground">
                Your Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={255}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label htmlFor="subject" className="mb-1 block text-sm font-medium text-foreground">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                maxLength={200}
                placeholder="Enter subject"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                maxLength={2000}
                placeholder="Enter your message"
                className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <input name="captcha_a" type="hidden" value="5" />
              <input name="captcha_b" type="hidden" value="3" />
              <span className="text-sm font-semibold text-foreground">5 + 3 =</span>
              <input
                name="captcha_ans"
                type="number"
                required
                inputMode="numeric"
                aria-label="Answer"
                placeholder="?"
                className="h-11 w-24 rounded-md border-2 border-border bg-card px-3 text-center text-base font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 active:scale-[0.98]"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
