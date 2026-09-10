import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { LegalPage } from "@/components/LegalPage";
import { absoluteUrl, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Groupor" },
      {
        name: "description",
        content:
          "Clear Terms of Service for Groupor: user rules, community standards, group submission guidelines, platform disclaimers, and account policies.",
      },
      { property: "og:title", content: "Terms of Service | Groupor" },
      {
        property: "og:description",
        content: "Rules and terms for submitting and discovering WhatsApp group links on Groupor.",
      },
      { property: "og:url", content: absoluteUrl("/terms") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/terms") }],
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
            name: "Terms of Service | Groupor",
            description:
              "Clear Terms of Service for Groupor, the free WhatsApp group links directory.",
            url: absoluteUrl("/terms"),
            publisher: { "@id": `${SITE_URL}/#organization` },
          },
        ]),
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <LegalPage
        title="Terms of Service"
        notice="Groupor is an independent directory. We are not affiliated with, sponsored by, or endorsed by WhatsApp Inc. or Meta Platforms, Inc. WhatsApp is a registered trademark of WhatsApp Inc."
        sections={[
          {
            heading: "1. Acceptance of Terms",
            body: (
              <>
                <p>
                  Welcome to <strong>Groupor</strong>. By accessing our directory, linking to our website, or submitting group links, you agree to comply with these Terms of Service.
                </p>
                <p>
                  These terms apply to all visitors, users, and community managers. If you do not agree with any part of these terms, please do not access or use Groupor services.
                </p>
                <p className="rounded-xl bg-muted p-4 text-xs leading-relaxed text-muted-foreground mt-2">
                  <strong>Important Note on Group Conversations:</strong> Joining a WhatsApp group is at your sole discretion. Groupor is not responsible for private group conversations, external messages, or outcomes occurring inside joined groups.
                </p>
              </>
            ),
          },
          {
            heading: "2. Description of Service",
            body: (
              <>
                <p>
                  Groupor provides a free public directory for indexing, categorizing, and searching WhatsApp group invite links.
                </p>
                <p>
                  All services are provided on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis without warranties of any kind. We do not guarantee continuous uptime or that external invite links remain active.
                </p>
              </>
            ),
          },
          {
            heading: "3. Service Modifications",
            body: (
              <p>
                Groupor reserves the right to modify, suspend, or discontinue any feature of the directory at any time without prior notice. We shall not be liable to any user or third party for service modifications.
              </p>
            ),
          },
          {
            heading: "4. User Eligibility & Registration",
            body: (
              <>
                <p>
                  You are not required to create an account to browse or search for WhatsApp groups on Groupor.
                </p>
                <p>
                  <strong>Age Requirement:</strong> You must be at least 13 years of age to access or use Groupor. Access by anyone under 13 is strictly prohibited.
                </p>
              </>
            ),
          },
          {
            heading: "5. User Conduct & Prohibited Content",
            body: (
              <>
                <p>
                  You are solely responsible for all content, links, titles, and descriptions you submit to Groupor.
                </p>
                <p className="font-semibold text-foreground mt-3">Prohibited Actions and Content Rules:</p>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  <li><strong>Adult & Harmful Material:</strong> Do not submit links containing explicit adult content, hate speech, violence, or harassment.</li>
                  <li><strong>Scams & Financial Fraud:</strong> Do not submit pyramid schemes, task-earning frauds, or crypto doubling scams.</li>
                  <li><strong>Impersonation:</strong> Do not impersonate official organizations, brands, or Groupor staff.</li>
                  <li><strong>Malware & Viruses:</strong> Do not share links or media containing viruses, spyware, or malicious code.</li>
                  <li><strong>Spam & Automated Traffic:</strong> Do not use automated bots, scrapers, or proxies to generate fake submissions or traffic.</li>
                  <li><strong>Infringing Links:</strong> Do not post content that violates copyright, trademark, or intellectual property rights.</li>
                </ul>
              </>
            ),
          },
          {
            heading: "6. Moderation & Content Removal",
            body: (
              <>
                <p>
                  Groupor reserves the right to pre-screen, refuse, or permanently remove any group listing or submission that violates our policies.
                </p>
                <p>
                  Dead, expired, or repeatedly reported invite links are automatically delisted to maintain directory quality.
                </p>
              </>
            ),
          },
          {
            heading: "7. Submitted Content License",
            body: (
              <p>
                When you submit a WhatsApp group link to Groupor, you grant us a worldwide, royalty-free, non-exclusive license to display, index, and categorize the link on our directory solely for discovery and promotion purposes.
              </p>
            ),
          },
          {
            heading: "8. Third-Party Links & External Sites",
            body: (
              <>
                <p>
                  Groupor contains external links leading to WhatsApp and third-party websites.
                </p>
                <p>
                  We have no control over external platforms and are not responsible for their availability, content, privacy practices, or security.
                </p>
              </>
            ),
          },
          {
            heading: "9. Disclaimer of Warranties",
            body: (
              <>
                <p>
                  Your use of Groupor is at your sole risk. The directory and all listed links are provided on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis.
                </p>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                  <li>We do not guarantee that listed groups will meet your expectations.</li>
                  <li>We do not guarantee uninterrupted, secure, or error-free site operation.</li>
                  <li>Any material accessed through third-party links is done at your own risk.</li>
                </ul>
              </>
            ),
          },
          {
            heading: "10. Limitation of Liability",
            body: (
              <p>
                Groupor and its team members shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your use of the directory, joined groups, or reliance on external links.
              </p>
            ),
          },
          {
            heading: "11. Reporting Violations & Contact",
            body: (
              <p>
                If you encounter a group listing that violates these terms, please report it via our{" "}
                <Link to="/how-reporting-works" className="font-semibold text-primary underline">
                  Reporting Tool
                </Link>{" "}
                or contact our team directly at{" "}
                <Link to="/contact" className="font-semibold text-primary underline">
                  Contact Us
                </Link>.
              </p>
            ),
          },
        ]}
      />
      <SiteFooter />
    </div>
  );
}
