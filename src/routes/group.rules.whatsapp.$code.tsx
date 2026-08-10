import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { GroupNotFound } from "@/components/GroupDetail";
import { useSubmittedGroups } from "@/lib/submitted-groups";
import { useRemovedGroups } from "@/lib/removed-groups";
import { findGroupByCode, inviteCodeOf, joinHref } from "@/data/groups";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/group/rules/whatsapp/$code")({
  loader: ({ params }) => ({ code: params.code }),
  head: ({ params }) => ({
    meta: [
      { title: "Join Group Now — Groupor.link" },
      {
        name: "description",
        content: "Learn about Groupor, then join the WhatsApp group.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [
      {
        rel: "canonical",
        href: `https://groupor.link/group/rules/whatsapp/${params.code}`,
      },
    ],
  }),
  component: RulesJoinPage,
});

function RulesJoinPage() {
  const { code } = Route.useLoaderData();
  const submitted = useSubmittedGroups();
  const { isCodeRemoved } = useRemovedGroups();
  const group =
    findGroupByCode(code) ?? submitted.find((g) => inviteCodeOf(g.link) === code) ?? null;

  if (!group || isCodeRemoved(code)) return <GroupNotFound />;

  const { url, target } = joinHref(group.link);
  if (!url) return <GroupNotFound />;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-center text-base font-bold text-foreground">
          You can find join button bellow
        </p>

        <article className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">What is Groupor?</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Groupor is best whatsapp group link providing plateform where user can promote their
                groups world widely and join many other groups.
              </li>
              <li>
                We have several group category like business, study groups, friendship &amp; dating,
                entertainment &amp; memes, health, social, business &amp; job alerts, sports etc.
              </li>
              <li>
                We have large audience from country like india, pakistan, indonesian, sri lanka etc.
              </li>
              <li>
                It caters to diverse interests from entertainment and study to regional and
                adult-themed groups allowing users to browse, click, and instantly join communities
                relevant to their preferences.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">Why Groupor?</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Groupor is provide 99.99% Active whatsapp group link. Our system will identify
                rekoved group link and remove them immediatly.
              </li>
              <li>No limit on adding (5 Groups Daily) and joining groups.</li>
            </ul>
            <p>
              Groupor keeps its links fresh and active, minimizing the frustration of expired or
              full group invites.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">How to promote group link?</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Copy group invite link from whatsapp and paste your invite link (e.g.,
                https://chat.whatsapp.com/...) on{" "}
                <Link to="/group/addgroup" className="font-semibold text-link hover:underline">
                  Add Your WhatsApp Group
                </Link>{" "}
                page and fill other detail like category (choose the most relevant theme education,
                business, chatting, etc.),
              </li>
              <li>choose country &amp; language — match where your target audience is based,</li>
              <li>
                keywords(tags) — include search terms (up to 100 words) that potential members might
                look for,
              </li>
              <li>
                write a clear description — up to 1,000 words to highlight group purpose and rules.{" "}
                <Link to="/group/addgroup" className="font-semibold text-link hover:underline">
                  click here to publish new whatsapp group
                </Link>
                .
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">
              How to remove/report group from Groupor?
            </h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Go to the group&apos;s invite page. this looks like:
                groupor.link/group/invite/.... and Click the &quot;Report&quot; button.
              </li>
              <li>
                Under the group&apos;s title or image, you&apos;ll see a &quot;Report&quot; option.
              </li>
              <li>
                Provide a reason - If prompted, share why you&apos;re reporting it—this helps the
                site flag spam, inappropriate, or misleading listings. and Submit it.
              </li>
            </ul>
          </section>

          <div className="space-y-3 py-2 text-center">
            <h1 className="text-2xl font-bold text-foreground">
              Click on bellow button to join whatsapp group
            </h1>
            <p className="font-bold text-red-600">
              You will be redirected to group in whatsapp...
            </p>
            <a
              href={url}
              target={target}
              rel="noopener noreferrer nofollow"
              onClick={() =>
                trackEvent("join_group_click", {
                  group_id: group.id,
                  platform: group.platform,
                  category: group.category,
                })
              }
              className="mt-2 inline-block rounded-md bg-cta px-6 py-3 text-base font-bold text-cta-foreground transition-opacity hover:opacity-90"
            >
              Join Group Now
            </a>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">
              What is Whatsapp? WhatsApp group links
            </h2>
            <p>
              WhatsApp is a free, cross-platform messaging app that allows users to send text
              messages, make voice and video calls, share media, and more. Here are some key
              features:
            </p>

            <h3 className="font-bold text-foreground">Key Features</h3>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-foreground">End-to-End Encryption:</strong> WhatsApp
                messages are encrypted, ensuring only the sender and recipient can read them.
              </li>
              <li>
                <strong className="text-foreground">Cross-Platform Compatibility:</strong> WhatsApp
                is available on Android, iOS, Windows, and macOS.
              </li>
              <li>
                <strong className="text-foreground">Group Chats:</strong> Create groups with up to
                256 people to share messages, photos, and videos.
              </li>
              <li>
                <strong className="text-foreground">File Sharing:</strong> Share files up to 100 MB
                in size, including documents, images, and videos.
              </li>
              <li>
                <strong className="text-foreground">Voice and Video Calls:</strong> Make free voice
                and video calls to individuals or groups.
              </li>
              <li>
                <strong className="text-foreground">Status Updates:</strong> Share status updates,
                similar to Instagram Stories.
              </li>
              <li>
                <strong className="text-foreground">Web Version:</strong> Access WhatsApp on your
                computer using the web version.
              </li>
              <li>
                <strong className="text-foreground">Two-Step Verification:</strong> Add an extra
                layer of security to your account.
              </li>
            </ul>

            <h3 className="font-bold text-foreground">Additional Features</h3>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-foreground">Location Sharing:</strong> Share your location
                with friends and family.
              </li>
              <li>
                <strong className="text-foreground">Polls:</strong> Create polls in group chats.
              </li>
              <li>
                <strong className="text-foreground">Reactions:</strong> React to messages with
                emojis.
              </li>
              <li>
                <strong className="text-foreground">Message Forwarding Limits:</strong> Limit the
                number of times a message can be forwarded.
              </li>
              <li>
                <strong className="text-foreground">Disappearing Messages:</strong> Send messages
                that disappear after a set time.
              </li>
            </ul>

            <h3 className="font-bold text-foreground">Business Features</h3>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-foreground">WhatsApp Business:</strong> A separate app for
                businesses to communicate with customers.
              </li>
              <li>
                <strong className="text-foreground">Business Profiles:</strong> Create a profile
                with business information, such as address and hours.
              </li>
              <li>
                <strong className="text-foreground">Catalogs:</strong> Share product catalogs with
                customers.
              </li>
            </ul>

            <h3 className="font-bold text-foreground">History</h3>
            <p>
              WhatsApp was founded in 2009 by Brian Acton and Jan Koum. It was acquired by Facebook
              (now Meta) in 2014 for approximately $19 billion.
            </p>

            <h3 className="font-bold text-foreground">Impact</h3>
            <p>
              WhatsApp has become an essential communication tool for billions of people worldwide,
              with a significant impact on personal and business communication.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">What is Admin role in group?</h2>
            <p>
              Admins can remove troublesome groups or group members entirely from a Community.
              Community and group admins can delete inappropriate chats or media for all members of
              a group. create in-chat polls, 32 person video calling, and groups with up to 1024
              users. Just like emoji reactions, larger file sharing, and admin delete, these
              features can be used in any group but will be particularly helpful for Communities.
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
