import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { GroupNotFound } from "@/components/GroupDetail";
import { useSubmittedGroups } from "@/lib/submitted-groups";
import { useRemovedGroups } from "@/lib/removed-groups";
import { findGroupByCode, inviteCodeOf, joinHref } from "@/data/groups";

export const Route = createFileRoute("/group/invite/whatsapp/$code/join")({
  loader: ({ params }) => ({ code: params.code }),
  head: ({ params }) => ({
    meta: [
      { title: "I Agree & Join Group — Groupor.link" },
      {
        name: "description",
        content: "Read the WhatsApp group rules, then agree and join the group.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [
      {
        rel: "canonical",
        href: `https://groupor.link/group/invite/whatsapp/${params.code}/join`,
      },
    ],
  }),
  component: JoinAgreePage,
});

function JoinAgreePage() {
  const { code } = Route.useLoaderData();
  const submitted = useSubmittedGroups();
  const { isCodeRemoved } = useRemovedGroups();
  const group =
    findGroupByCode(code) ?? submitted.find((g) => inviteCodeOf(g.link) === code) ?? null;

  if (!group || isCodeRemoved(code)) return <GroupNotFound />;

  const { url } = joinHref(group.link);
  if (!url) return <GroupNotFound />;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-center text-base font-bold text-foreground">
          Click on bellow &quot;I agree &amp; join group&quot; button to join whatsapp group
        </p>

        <article className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <p className="font-bold text-foreground">
            Here are some clear and respectful rules for WhatsApp group members, suitable for most
            types of groups (friends, family, work, school, etc.). You can adjust them based on your
            group&apos;s purpose:
          </p>

          <section>
            <h2 className="text-lg font-bold text-foreground">WhatsApp Group Rules</h2>
            <ol className="mt-4 list-decimal space-y-4 pl-5">
              <li>
                <p className="font-semibold text-foreground">Respect Everyone</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>No abusive, racist, or hurtful language.</li>
                  <li>Differences of opinion are okay—disrespect is not.</li>
                </ul>
              </li>
              <li>
                <p className="font-semibold text-foreground">Stay On Topic</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>Keep messages relevant to the group&apos;s purpose.</li>
                  <li>Use private messages for off-topic chats.</li>
                </ul>
              </li>
              <li>
                <p className="font-semibold text-foreground">No Spam</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>Avoid excessive forwards, ads, or promotional content unless approved.</li>
                  <li>Don&apos;t flood the chat with unnecessary messages or emojis.</li>
                </ul>
              </li>
              <li>
                <p className="font-semibold text-foreground">Privacy Matters</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>Don&apos;t share screenshots or group content outside the group.</li>
                  <li>Don&apos;t add people without asking the admin first.</li>
                </ul>
              </li>
              <li>
                <p className="font-semibold text-foreground">Avoid Fake News</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>Verify information before sharing.</li>
                  <li>
                    No political, religious, or controversial content unless it&apos;s a group
                    theme.
                  </li>
                </ul>
              </li>
              <li>
                <p className="font-semibold text-foreground">Be Considerate with Media</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>Use media (images/videos/voice notes) thoughtfully.</li>
                  <li>Compress large files or send during appropriate hours.</li>
                </ul>
              </li>
              <li>
                <p className="font-semibold text-foreground">Mute Instead of Leaving Arguments</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>If annoyed, mute the group instead of starting conflict.</li>
                  <li>If you must leave, notify the group politely.</li>
                </ul>
              </li>
              <li>
                <p className="font-semibold text-foreground">Admins&apos; Role</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>Admins may remove members or messages that break rules.</li>
                  <li>Respect admin decisions—discuss calmly if needed.</li>
                </ul>
              </li>
            </ol>
          </section>

          <div className="flex justify-center py-4">
            <Link
              to="/group/invite/whatsapp/$code/join-now"
              params={{ code }}
              className="rounded-md bg-cta px-6 py-3 text-base font-bold text-cta-foreground transition-opacity hover:opacity-90"
            >
              I Agree &amp; Join Group
            </Link>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">
              To join a WhatsApp group using an invite link:
            </h2>
            <ol className="list-decimal space-y-1 pl-5">
              <li>Tap the invite link.</li>
              <li>Review the group information.</li>
              <li>Tap Join Group.</li>
            </ol>
            <p>
              You can also scan a QR code to join a group. Keep in mind that group admins can reset
              the invite link to prevent further joins.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">To leave a WhatsApp group:</h2>
            <ol className="list-decimal space-y-1 pl-5">
              <li>Open the group chat.</li>
              <li>Tap the group name.</li>
              <li>Tap Exit group &gt; Exit group.</li>
            </ol>
            <p className="font-semibold text-foreground">Once you leave a group:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>You won&apos;t receive messages from that group anymore.</li>
              <li>
                Only admins can remove you from a group; you can&apos;t be added back automatically.
              </li>
              <li>You can report a group if you find its content problematic.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">Best Practices</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Be cautious when joining groups, especially from unknown numbers.</li>
              <li>
                Use group settings to control notifications and manage your group experience.
              </li>
              <li>Report groups that violate WhatsApp&apos;s guidelines.</li>
            </ul>
          </section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
