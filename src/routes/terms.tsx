import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Groupor.link WhatsApp Group Directory" },
      {
        name: "description",
        content:
          "Terms of Service for Groupor.link, the free WhatsApp group links directory: acceptance, user conduct, submitted content, warranties and liability.",
      },
      { property: "og:title", content: "Terms of Service — Groupor.link" },
      {
        property: "og:description",
        content: "Rules for submitting and browsing WhatsApp group links on Groupor.link.",
      },
      { property: "og:url", content: "https://groupor.link/terms" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://groupor.link/terms" }],
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
            name: "Terms of Service — Groupor.link",
            description:
              "Terms of Service for Groupor.link, the free WhatsApp group links directory.",
            url: "https://groupor.link/terms",
            publisher: { "@id": "https://groupor.link/#organization" },
          },
          {
            "@context": "https://schema.org",
            "@type": "LegalService",
            name: "Terms of Service",
            provider: { "@id": "https://groupor.link/#organization" },
            url: "https://groupor.link/terms",
            termsOfService: "https://groupor.link/terms",
            serviceType: "Terms and Conditions",
          },
        ]),
      },
    ],
  }),
  component: TermsPage,
});

const B = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-semibold text-foreground">
    {children === "GroupSor" ? "Groupor" : children}
  </strong>
);

function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <LegalPage
        title="Terms of Service"
        notice="We are not associated with the WhatsApp Messenger in any means. WhatsApp is a registered trademark of WhatsApp Inc. & www.whastapp.com"
        sections={[
          {
            heading: "Acceptance of Terms",
            body: (
              <>
                <p>
                  By accessing, linking to or using this website you confirm your acceptance of
                  these Terms and Conditions, which may be updated by us from time to time with or
                  without notice to you. Your access or use of the services in this website
                  signifies that you agree to become bound by these Terms and Conditions. If you do
                  not agree to all the Terms, then you are not permitted to access or use the
                  content or any service in the website.
                </p>
                <p>
                  While joining the group you agree that any conversation in the group or carried
                  out personally is through your sole discretion and <B>GroupSor</B> does not hold
                  any responsibility for the conversation or any outcome of the conversation.
                </p>
              </>
            ),
          },
          {
            heading: "Description of Service",
            body: (
              <p>
                <B>GroupSor</B> currently provides users with certain services and content, as
                described more fully on the site (the "Services"). You also understand and agree
                that <B>GroupSor</B> assumes no responsibility for the suitability, reliability,
                availability, timeliness and accuracy of the information and services contained
                within the <B>GroupSor</B> website for any purpose. Services are provided "AS IS"
                without warranty of any kind.
              </p>
            ),
          },
          {
            heading: "Modification of Service",
            body: (
              <p>
                <B>GroupSor</B> reserves the right at any time and from time to time to modify or
                discontinue, temporarily or permanently, the Service (or any part thereof) with or
                without notice to you. You agree that <B>GroupSor</B> shall not be liable to you or
                to any third party for any modification, suspension or discontinuance of the
                Service.
              </p>
            ),
          },
          {
            heading: "Registration Obligations",
            body: (
              <>
                <p>
                  You are not required to register with <B>GroupSor</B> before using the services,
                  but you understand that certain features of the service may not be accessible to
                  you unless you register. In registering for the service you agree to provide{" "}
                  <B>GroupSor</B> with true, accurate and complete registration information.{" "}
                  <B>GroupSor</B> reserves the right to suspend or terminate your account and refuse
                  any and all current or future use of the Service (or any portion thereof), with or
                  without notice to you.
                </p>
                <p>
                  Services are available only to individuals who are at least 13 years old. Any use
                  of or access to the website by anyone under 13 years of age is unauthorized and in
                  violation of these Terms and Conditions.
                </p>
              </>
            ),
          },
          {
            heading: "Privacy policy",
            body: (
              <p>
                You may review the <B>GroupSor</B> privacy policy here:{" "}
                <Link to="/privacy" className="font-semibold text-foreground underline">
                  Privacy Policy
                </Link>
              </p>
            ),
          },
          {
            heading: "User Conduct",
            body: (
              <>
                <p>
                  You understand that all information, data, text, software, music, sound,
                  photographs, graphics, video, messages or other materials ("Content"), whether
                  publicly posted or privately transmitted, are the sole responsibility of the
                  person from which such Content originated. This means that you, and not{" "}
                  <B>GroupSor</B>, are entirely responsible for all Content that you upload, post,
                  email, transmit or otherwise make available via the Service. <B>GroupSor</B> does
                  not control the Content posted via the Service and, as such, does not guarantee
                  the accuracy, integrity or quality of such Content. You understand that by using
                  the Service, you may be exposed to Content that is offensive, indecent or
                  objectionable. Under no circumstances will <B>GroupSor</B> be liable in any way for
                  any Content, including, but not limited to, for any errors or omissions in any
                  Content, or for any loss or damage of any kind incurred as a result of the use of
                  any Content posted, emailed, transmitted or otherwise made available via the
                  Service.
                </p>
                <p>You agree to not use the Service to:</p>
                <p>
                  (a) link to, upload, post, email, transmit or otherwise make available any Content
                  that is adult in nature, unlawful, harmful, threatening, abusive, harassing,
                  tortious, defamatory, vulgar, obscene, libelous, invasive of another's privacy,
                  hateful, or racially, ethnically or otherwise objectionable;
                </p>
                <p>(b) harm minors in any way;</p>
                <p>
                  (c) impersonate any person or entity, including, but not limited to, a{" "}
                  <B>GroupSor</B> official, guide or host, or falsely state or otherwise misrepresent
                  your affiliation with a person or entity;
                </p>
                <p>
                  (d) forge headers or otherwise manipulate identifiers in order to disguise the
                  origin of any content transmitted through the Service;
                </p>
                <p>
                  (e) link, upload, post, email, transmit or otherwise make available any content
                  that you do not have a right to make available under any law or under contractual
                  or fiduciary relationships (such as inside information, proprietary and
                  confidential information learned or disclosed as part of employment relationships
                  or under nondisclosure agreements);
                </p>
                <p>
                  (f) link, upload, post, email, transmit or otherwise make available any content
                  that infringes any patent, trademark, trade secret, copyright or other proprietary
                  rights ("Rights") of any party;
                </p>
                <p>
                  (g) link, upload, post, email, transmit or otherwise make available any
                  unsolicited or unauthorized advertising, promotional materials, "junk mail,"
                  "spam," "chain letters," "pyramid schemes," or any other form of solicitation,
                  except in those areas that are designated for such purpose;
                </p>
                <p>
                  (h) link, upload, post, email, transmit or otherwise make available any material
                  that contains software viruses or any other computer code, files or programs
                  designed to interrupt, destroy or limit the functionality of any computer software
                  or hardware or telecommunications equipment;
                </p>
                <p>
                  (i) disrupt the normal flow of dialogue, cause a screen to "scroll" faster than
                  other users of the Service are able to type, or otherwise act in a manner that
                  negatively affects other users' ability to engage in real time exchanges;
                </p>
                <p>
                  (j) interfere with or disrupt the Service or servers or networks connected to the
                  Service, or disobey any requirements, procedures, policies or regulations of
                  networks connected to the Service;
                </p>
                <p>
                  (k) intentionally or unintentionally violate any applicable local, state, national
                  or international law, and any regulations having the force of law;
                </p>
                <p>(l) "stalk" or otherwise harass another; or</p>
                <p>(m) collect or store personal data about other users.</p>
                <p>
                  (n) attempt to falsify traffic in order to earn revenue, not limited to using
                  automated 'computer' traffic, disguising traffic through anonymous proxy servers,
                  or 'hiding' the Service through any method.
                </p>
                <p>
                  (o) register more than one account per person, except when one is a Publisher
                  account and one is an Advertiser account. If a publisher is found to have referred
                  themselves, the referral commission will be forfeited.
                </p>
                <p>
                  (p) offer any form of incentive to users who click on a <B>GroupSor</B> link, not
                  limited to points/bonus/money/gifts/traffic or link exchange.
                </p>
                <p>
                  You acknowledge that <B>GroupSor</B> may OR MAY NOT pre-screen Content, but that{" "}
                  <B>GroupSor</B> shall have the right (but not the obligation) in its sole
                  discretion to pre-screen, refuse, or move any Content (or Account) that is
                  available via the Service. Without limiting the foregoing, <B>GroupSor</B> and its
                  designees shall have the right to remove any Content or Accounts that violate
                  these Terms or are otherwise objectionable. You agree that you must evaluate, and
                  bear all risks associated with, the use of any Content or Accounts, including any
                  reliance on the accuracy, completeness, or usefulness of such Content.
                </p>
                <p>
                  You acknowledge, consent and agree that <B>GroupSor</B> may access, preserve, and
                  disclose your account information and Content if required to do so by law or in a
                  good faith belief that such access, preservation or disclosure is reasonably
                  necessary to:
                </p>
                <p>(a) comply with legal process;</p>
                <p>(b) enforce these Terms;</p>
                <p>(c) respond to claims that any Content violates the rights of third parties;</p>
                <p>(d) respond to your requests for customer service; or</p>
                <p>
                  (e) protect the rights, property, or personal safety of <B>GroupSor</B>, its users
                  and the public.
                </p>
                <p>
                  You understand that the technical processing and transmission of the Service,
                  including your Content, may involve (a) transmissions over various networks; and
                  (b) changes to conform and adapt to technical requirements of connecting networks
                  or devices.
                </p>
                <p>
                  You understand that the Service and software embodied within the Service may
                  include security components that permit digital materials to be protected, and use
                  of these materials is subject to usage rules set by <B>GroupSor</B> and/or content
                  providers who provide content to the Service. You may not attempt to override or
                  circumvent any of the usage rules embedded into the Service. Any unauthorized
                  reproduction, publication, further distribution or public exhibition of the
                  materials provided on the Service, in whole or in part, is strictly prohibited.
                </p>
              </>
            ),
          },
          {
            heading: "Submitted Content",
            body: (
              <p>
                <B>GroupSor</B> does not claim ownership of content or links you submit or make
                available for inclusion on the Service. However, with respect to content or links
                you submit or make available for inclusion on the Service, you grant <B>GroupSor</B>{" "}
                a world-wide, royalty free and non-exclusive license to use, distribute, reproduce,
                modify, adapt, publicly perform and publicly display such content or link on the
                Service solely for the purposes of providing and promoting the specific Service for
                which such content or link was submitted or made available. This license exists only
                for as long as you elect to continue to include such content or link on the Service
                and will terminate at the time you remove or <B>GroupSor</B> removes such content or
                link from the Service.
              </p>
            ),
          },
          {
            heading: "User created Groups",
            body: (
              <p>
                <B>GroupSor</B> does not claim ownership of content or links that are submitted in
                the user created groups. <B>GroupSor</B> shall not be liable for the conversation or
                content or any other media communicated in these groups.
              </p>
            ),
          },
          {
            heading: "Links and References",
            body: (
              <>
                <p>
                  The Service may contain links to third-party websites or resources. Because{" "}
                  <B>GroupSor</B> has no control over such websites and resources, you acknowledge
                  and agree that <B>GroupSor</B> is not responsible or liable for: (a) the
                  availability or accuracy of such websites or resources; or (b) the content,
                  advertising, products or services on or available from such websites or resources.
                </p>
                <p>
                  You further acknowledge and agree that <B>GroupSor</B> shall not be responsible or
                  liable, directly or indirectly, for any damage or loss caused or alleged to be
                  caused by or in connection with use of or reliance on any such content, goods or
                  services available on or through any such website or resource.
                </p>
              </>
            ),
          },
          {
            heading: "Termination",
            body: (
              <>
                <p>
                  You agree that <B>GroupSor</B>, in its sole discretion, may terminate, change or
                  limit any of the Services or their availability to you at any time and without
                  prior notice, with or without cause.
                </p>
                <p>
                  Further, you agree that <B>GroupSor</B> shall not be liable to you or any third
                  party for any termination of your account, any associated email address, or access
                  to the Service.
                </p>
              </>
            ),
          },
          {
            heading: "Indemnity",
            body: (
              <p>
                You agree to indemnify and hold harmless <B>GroupSor</B>, its parents, subsidiaries,
                affiliates, officers, agents, partners and employees from any losses, expenses,
                damages and costs, including reasonable attorney's fees, made by any third party due
                to or arising out of Content you submit, post, transmit or make available through
                the Service, your use of the Service, your connection to the Service, your violation
                of the Terms of use or your violation of any rights of another.
              </p>
            ),
          },
          {
            heading: "Disclaimer of Warranties",
            body: (
              <>
                <p>
                  (a) YOU AGREE THAT YOUR USE OF THE SERVICES IS AT YOUR SOLE RISK AND ACKNOWLEDGE
                  THAT THE SERVICES, INCLUDING, BUT NOT LIMITED TO, CONTENT, SERVICES, GOODS, OR
                  ADVERTISEMENTS ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS.{" "}
                  <B>GroupSor</B> DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED,
                  INCLUDING, BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY,
                  NON-INFRINGEMENT, TITLE, OR FITNESS FOR A PARTICULAR PURPOSE OR USE.
                </p>
                <p>
                  (b) <B>GroupSor</B> MAKES NO WARRANTY THAT (i) THE SERVICE WILL MEET YOUR
                  REQUIREMENTS, (ii) THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR
                  ERROR-FREE, (iii) THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE SERVICE
                  WILL BE ACCURATE OR RELIABLE, (iv) THE QUALITY OF ANY PRODUCTS, SERVICES,
                  INFORMATION, OR OTHER MATERIAL PURCHASED OR OBTAINED BY YOU THROUGH THE SERVICE
                  WILL MEET YOUR EXPECTATIONS, AND (v) ANY ERRORS IN THE SOFTWARE WILL BE CORRECTED.
                </p>
                <p>
                  (c) ANY MATERIAL DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF THE SERVICE
                  IS DONE AT YOUR OWN DISCRETION AND RISK AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY
                  DAMAGE TO YOUR COMPUTER SYSTEM OR LOSS OF DATA THAT RESULTS FROM THE DOWNLOAD OF
                  ANY SUCH MATERIAL.
                </p>
                <p>
                  (d) NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM{" "}
                  <B>GroupSor</B> OR THROUGH OR FROM THE SERVICE SHALL CREATE ANY WARRANTY NOT
                  EXPRESSLY STATED IN THESE TERMS.
                </p>
                <p>
                  (e) A SMALL PERCENTAGE OF USERS MAY EXPERIENCE EPILEPTIC SEIZURES WHEN EXPOSED TO
                  CERTAIN LIGHT PATTERNS OR BACKGROUNDS ON A COMPUTER SCREEN OR WHILE USING THE
                  SERVICE. IF YOU, OR ANYONE IN YOUR FAMILY, HAVE AN EPILEPTIC CONDITION, CONSULT
                  YOUR PHYSICIAN PRIOR TO USING THE SERVICE. IMMEDIATELY DISCONTINUE USE OF THE
                  SERVICE AND CONSULT YOUR PHYSICIAN IF YOU EXPERIENCE DIZZINESS, ALTERED VISION, EYE
                  OR MUSCLE TWITCHES, LOSS OF AWARENESS, DISORIENTATION, ANY INVOLUNTARY MOVEMENT, OR
                  CONVULSIONS.
                </p>
              </>
            ),
          },
          {
            heading: "Limitation of Liabilities",
            body: (
              <>
                <p>
                  (a) YOU UNDERSTAND AND AGREE THAT <B>GroupSor</B> AND ITS SUBSIDIARIES,
                  AFFILIATES, OFFICERS, EMPLOYEES, AGENTS, PARTNERS AND LICENSORS SHALL NOT BE LIABLE
                  TO YOU FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR EXEMPLARY
                  DAMAGES, INCLUDING, BUT NOT LIMITED TO, DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE,
                  DATA OR OTHER INTANGIBLE LOSSES (EVEN IF <B>GroupSor</B> HAS BEEN ADVISED OF THE
                  POSSIBILITY OF SUCH DAMAGES), RESULTING FROM: (i) YOUR ACCESS TO OR USE OF OR
                  INABILITY TO ACCESS OR USE THE SERVICES; (ii) THE COST OF PROCUREMENT OF SUBSTITUTE
                  GOODS OR SERVICES; (iii) UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR TRANSMISSIONS
                  OR DATA; (iv) STATEMENTS OR CONDUCT OF ANY THIRD PARTY ON THE SERVICE; OR (v) ANY
                  OTHER MATTER RELATING TO THE SERVICE.
                </p>
                <p>
                  (b) YOU UNDERSTAND AND AGREE THAT BY USING THE SERVICE, YOU MAY BE EXPOSED TO
                  CONTENT THAT IS OFFENSIVE, INDECENT OR OBJECTIONABLE. UNDER NO CIRCUMSTANCES WILL{" "}
                  <B>GroupSor</B> AND ITS SUBSIDIARIES, AFFILIATES, OFFICERS, EMPLOYEES, AGENTS,
                  PARTNERS AND LICENSORS BE LIABLE IN ANY WAY FOR ANY CONTENT, INCLUDING, BUT NOT
                  LIMITED TO, ANY ERRORS OR OMISSIONS IN ANY CONTENT, OR ANY LOSS OR DAMAGE OF ANY
                  KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, E-MAILED, TRANSMITTED
                  OR OTHERWISE MADE AVAILABLE VIA THE SERVICE.
                </p>
                <p>
                  (c) YOU UNDERSTAND AND AGREE THAT THE SERVICE IS PROVIDED "AS-IS" AND THAT{" "}
                  <B>GroupSor</B> AND ITS SUBSIDIARIES, AFFILIATES, OFFICERS, EMPLOYEES, AGENTS,
                  PARTNERS AND LICENSORS ASSUME NO RESPONSIBILITY FOR THE TIMELINESS, DELETION,
                  MIS-DELIVERY OR FAILURE TO STORE ANY USER COMMUNICATIONS OR PERSONALIZATION
                  SETTINGS.
                </p>
              </>
            ),
          },
          {
            heading: "Violations",
            body: (
              <p>
                Please report any violations of these Terms &amp; Conditions by using our contact
                form:{" "}
                <Link to="/contact" className="font-semibold text-foreground underline">
                  Contact
                </Link>
              </p>
            ),
          },
        ]}
      />
      <SiteFooter />
    </div>
  );
}
