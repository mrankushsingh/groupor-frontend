import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { absoluteUrl, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Groupor" },
      {
        name: "description",
        content: "Contact Groupor support team at support@groupor.link for assistance, community reports, or media inquiries.",
      },
      { property: "og:title", content: "Contact Us | Groupor" },
      {
        property: "og:description",
        content: "Contact Groupor support team at support@groupor.link for assistance.",
      },
      { property: "og:url", content: absoluteUrl("/contact") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/contact") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Groupor",
            url: SITE_URL,
            email: "mailto:support@groupor.link",
            description: "Free WhatsApp group links directory.",
          },
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Us | Groupor",
            description: "Contact Groupor support team at support@groupor.link.",
            url: absoluteUrl("/contact"),
            mainEntity: { "@id": `${SITE_URL}/#organization` },
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

        {/* Detailed Information & FAQ Section for SEO Text Ratio */}
        <div className="mt-12 space-y-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              Groupor Support Center & Communication SLAs
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Welcome to the Groupor official support center. Our dedicated community management team operates around the clock to review group submissions, investigate safety reports, process link removals, and answer user inquiries. We aim to maintain a high-trust directory environment for all global messaging participants.
            </p>
          </section>

          <section className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-white/5 bg-white/5 p-4">
              <h3 className="font-semibold text-foreground">General Support & Inquiries</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                For questions regarding listed WhatsApp groups, navigation, or account issues, please reach out to <strong className="text-primary">support@groupor.link</strong>. Standard response time is 24 to 48 business hours.
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/5 p-4">
              <h3 className="font-semibold text-foreground">Link Verification & Admin Appeals</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Group administrators requesting badge verification or updating group invite links should submit their requests with active group admin credentials for verification.
              </p>
            </div>
          </section>

          <section className="space-y-4 border-t border-white/10 pt-6">
            <h2 className="text-xl font-bold text-foreground">
              Frequently Asked Support Questions
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-semibold text-foreground">How do I report a toxic or fraudulent WhatsApp group?</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  If you encounter a group engaging in scams, illegal activities, harassment, or spam, use the "Report Group" button on the group's individual listing page or contact us directly with the group URL. Our moderation team reviews reports within 12 hours and removes offending links immediately.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground">How long does it take for submitted WhatsApp groups to appear?</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  Submitted groups undergo automated link format validation and manual safety checks. Most verified submissions appear on Groupor within 1 to 4 hours after submission.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground">What is Groupor's policy on intellectual property and DMCA notices?</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  Groupor respects intellectual property rights. Copyright owners can send takedown notices containing the specific URL and proof of ownership to support@groupor.link for prompt investigation and content removal.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
