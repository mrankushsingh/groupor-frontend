import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Groupor.link WhatsApp Group Directory" },
      {
        name: "description",
        content:
          "Read the Groupor.link Privacy Policy to learn how we collect, use, and protect visitor information.",
      },
      { property: "og:title", content: "Privacy Policy — Groupor.link" },
      {
        property: "og:description",
        content: "How Groupor.link collects and uses visitor information.",
      },
      { property: "og:url", content: "https://groupor.link/privacy" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://groupor.link/privacy" }],
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
            "@type": "WebPage",
            name: "Privacy Policy — Groupor.link",
            description: "How Groupor.link collects and uses visitor information.",
            url: "https://groupor.link/privacy",
            publisher: { "@id": "https://groupor.link/#organization" },
          },
          {
            "@context": "https://schema.org",
            "@type": "PrivacyPolicy",
            name: "Privacy Policy",
            publisher: { "@id": "https://groupor.link/#organization" },
            url: "https://groupor.link/privacy",
          },
        ]),
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <LegalPage
        title="Privacy Policy"
        intro="At Groupor, accessible from https://groupor.link, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains the types of information that are collected and recorded by Groupor and how we use it."
        sections={[
          {
            heading: "Consent",
            body: "By using our website, you hereby consent to our Privacy Policy and agree to its terms.",
          },
          {
            heading: "Information we collect",
            body: (
              <>
                <p>
                  The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
                </p>
                <p>
                  If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
                </p>
                <p>
                  When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
                </p>
              </>
            ),
          },
          {
            heading: "How we use your information",
            body: (
              <>
                <p>We use the information we collect in various ways, including to:</p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Provide, operate, and maintain our website</li>
                  <li>Improve, personalize, and expand our website</li>
                  <li>Understand and analyze how you use our website</li>
                  <li>Develop new products, services, features, and functionality</li>
                  <li>
                    Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes
                  </li>
                  <li>Send you emails</li>
                  <li>Find and prevent fraud</li>
                </ul>
              </>
            ),
          },
          {
            heading: "Log Files",
            body: "Groupsor follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.",
          },
          {
            heading: "Cookies and Web Beacons",
            body: "Like any other website, Groupsor uses cookies. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.",
          },
          {
            heading: "Google DoubleClick DART Cookie",
            body: (
              <p>
                Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visits to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL —{" "}
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline"
                >
                  https://policies.google.com/technologies/ads
                </a>
              </p>
            ),
          },
          {
            heading: "Our Advertising Partners",
            body: (
              <>
                <p>
                  Some of the advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below.
                </p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>
                    <p>Google</p>
                    <p>
                      <a
                        href="https://policies.google.com/technologies/ads"
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary underline"
                      >
                        https://policies.google.com/technologies/ads
                      </a>
                    </p>
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: "Advertising Partners Privacy Policies",
            body: "You may consult this list to find the Privacy Policy for each of the advertising partners of Groupsor. Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Groupsor, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit. Note that Groupsor has no access to or control over these cookies that are used by third-party advertisers.",
          },
          {
            heading: "Third Party Privacy Policies",
            body: (
              <>
                <p>
                  Groupsor's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
                </p>
                <p>
                  You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
                </p>
              </>
            ),
          },
          {
            heading: "CCPA Privacy Rights (Do Not Sell My Personal Information)",
            body: (
              <>
                <p>Under the CCPA, among other rights, California consumers have the right to:</p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
                  <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
                  <li>Request that a business that sells a consumer's personal data not sell the consumer's personal data.</li>
                </ul>
                <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
              </>
            ),
          },
          {
            heading: "GDPR Data Protection Rights",
            body: (
              <>
                <p>
                  We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
                </p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>
                    <strong>The right to access</strong> — You have the right to request copies of your personal data. We may charge you a small fee for this service.
                  </li>
                  <li>
                    <strong>The right to rectification</strong> — You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.
                  </li>
                  <li>
                    <strong>The right to erasure</strong> — You have the right to request that we erase your personal data, under certain conditions.
                  </li>
                  <li>
                    <strong>The right to restrict processing</strong> — You have the right to request that we restrict the processing of your personal data, under certain conditions.
                  </li>
                  <li>
                    <strong>The right to object to processing</strong> — You have the right to object to our processing of your personal data, under certain conditions.
                  </li>
                  <li>
                    <strong>The right to data portability</strong> — You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.
                  </li>
                </ul>
                <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
              </>
            ),
          },
          {
            heading: "Children's Information",
            body: (
              <>
                <p>
                  Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
                </p>
                <p>
                  Groupsor does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
                </p>
              </>
            ),
          },
          {
            heading: "Changes to This Privacy Policy",
            body: "We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.",
          },
          {
            heading: "Contact Us",
            body: (
              <p>
                If you have any questions or suggestions about our Privacy Policy, do not hesitate to{" "}
                <a href="/contact" className="font-bold text-primary underline">
                  contact
                </a>{" "}
                us.
              </p>
            ),
          },
        ]}
      />
      <SiteFooter />
    </div>
  );
}
