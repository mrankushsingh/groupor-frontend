import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { LegalPage } from "@/components/LegalPage";
import { absoluteUrl, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer & Legal Notice | Groupor" },
      {
        name: "description",
        content:
          "Groupor lists public WhatsApp group links and is an independent directory not affiliated with WhatsApp Inc. or Meta Platforms Inc.",
      },
      { property: "og:title", content: "Disclaimer & Legal Notice | Groupor" },
      {
        property: "og:description",
        content: "Groupor is an independent link directory not associated with WhatsApp Messenger.",
      },
      { property: "og:url", content: absoluteUrl("/disclaimer") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/disclaimer") }],
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
            "@type": "WebPage",
            name: "Disclaimer — Groupor",
            description:
              "Groupor is an independent link directory and is not associated with WhatsApp Messenger.",
            url: absoluteUrl("/disclaimer"),
            publisher: { "@id": `${SITE_URL}/#organization` },
          },
          {
            "@context": "https://schema.org",
            "@type": "LegalService",
            name: "Disclaimer",
            provider: { "@id": `${SITE_URL}/#organization` },
            url: absoluteUrl("/disclaimer"),
            serviceType: "Disclaimer",
          },
        ]),
      },
    ],
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <LegalPage
        title="Disclaimer"
        notice="We are not associated with the WhatsApp Messenger in any means. WhatsApp is a registered trademark of WhatsApp Inc. & www.whastapp.com"
        sections={[
          {
            heading: "Important information",
            body: (
              <>
                <p>Your Shared Group Link Will be Public And Will Be On World Wide Web.</p>
                <p>
                  This website is a free platform to share group links only. We are not affiliated with WhatsApp or any of its brands.
                </p>
                <p>All logos, product names, and brands are property of their respective owners.</p>
                <p>WhatsApp™ is a trademark of WhatsApp Inc.</p>
                <p>Facebook™ is a trademark of Facebook Inc.</p>
                <p>Groupor is not affiliated with, or sponsored or endorsed by, WhatsApp Inc.</p>
                <p>Groupor is not affiliated with, or sponsored or endorsed by, Facebook Inc.</p>
                <p>We do not have any direct collaboration with WhatsApp or any other social network.</p>
                <p>This website is developed for connecting people all over the world via public WhatsApp groups.</p>
                <p>The information contained within this website is strictly for educational purposes.</p>
                <p>If you wish to apply ideas contained in this website, you are taking full responsibility for your actions.</p>
                <p>
                  Please report any violations of these Terms & Conditions by using our contact form:{" "}
                  <a href="/contact" className="font-bold text-primary underline">
                    Contact
                  </a>
                </p>
              </>
            ),
          },
        ]}
      />
      <SiteFooter />
    </div>
  );
}
