import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  MessageCircle,
  LayoutGrid,
  Globe,
  Languages,
  Twitter,
  Calendar,
} from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ReportGroup } from "@/components/ReportGroup";
import { GroupCard } from "@/components/GroupCard";
import { useRemovedGroups } from "@/lib/removed-groups";
import { trackEvent } from "@/lib/analytics";
import { groupFindShare } from "@/lib/share";
import { optimizeImageUrl } from "@/lib/image";

const PAGE_SIZE = 10;

/** Display time like the reference group pages: 2026-08-10 09:54:06 */
function formatGroupTiming(group: Group) {
  const fromId =
    group.id.startsWith("u") && /^\d+$/.test(group.id.slice(1))
      ? Number(group.id.slice(1))
      : null;
  const raw = group.createdAt || fromId;
  const date =
    typeof raw === "number"
      ? new Date(raw)
      : typeof raw === "string"
        ? new Date(raw)
        : null;
  if (!date || Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export function GroupNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-foreground">Group not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This group may have been removed or the link is incorrect.
        </p>
        <Link to="/" className="mt-6 inline-block text-sm text-link hover:underline">
          Back to home
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}

export function GroupDetail({ group, categoryName }: { group: Group; categoryName: string }) {
  const { isRemoved } = useRemovedGroups();
  const reported = isRemoved(group.id, group.link);
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    trackEvent("group_view", { group_id: group.id, platform: group.platform, category: group.category });
  }, [group.id, group.platform, group.category]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [group.id]);

  const related = groups
    .filter(
      (g) =>
        g.id !== group.id &&
        g.status !== "inactive" &&
        !isRemoved(g.id, g.link),
    )
    .map((candidate) => ({
      candidate,
      score:
        (candidate.category === group.category ? 5 : 0) +
        (candidate.country === group.country ? 2 : 0) +
        (candidate.language === group.language ? 2 : 0) +
        (candidate.tags?.filter((tag) =>
          group.tags?.some((t) => t.toLowerCase() === tag.toLowerCase()),
        ).length ?? 0),
    }))
    .sort((a, b) => b.score - a.score)
    .map(({ candidate }) => candidate);

  const { url } = joinHref(group.link);
  const timing = formatGroupTiming(group);
  const code = inviteCodeOf(group.link);
  const share = groupFindShare(group);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <article className="bg-card px-2 py-8 text-center sm:px-4">
          <div className="flex justify-center">
            {group.image ? (
              <img
                src={optimizeImageUrl(group.image, { width: 160, height: 160, quality: 70 })}
                alt={`${group.name} WhatsApp Group`}
                loading="lazy"
                decoding="async"
                width="120"
                height="120"
                onError={(e) => {
                  if (group.image && e.currentTarget.src !== group.image) {
                    e.currentTarget.src = group.image;
                  }
                }}
                className="size-[120px] rounded-full object-cover"
              />
            ) : (
              <div className="flex size-[120px] items-center justify-center rounded-full bg-[#f0f0f0] text-[#5bc0de]">
                <MessageCircle className="size-12" />
              </div>
            )}
          </div>

          <h1 className="mt-5 text-2xl font-bold leading-snug text-foreground">
            {group.name} WhatsApp Group Invite Link
          </h1>

          <p className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[13px] text-[#777]">
            <Link
              to="/group/category/$slug"
              params={{ slug: group.category }}
              className="inline-flex items-center gap-1.5 hover:text-primary font-medium"
            >
              <LayoutGrid className="size-3.5" />
              {categoryName}
            </Link>
            {group.country ? (
              <Link
                to="/group/country/$slug"
                params={{ slug: group.country.toLowerCase().replace(/[^a-z0-9]+/g, "-") }}
                className="inline-flex items-center gap-1.5 hover:text-primary font-medium"
              >
                <Globe className="size-3.5" />
                {group.country}
              </Link>
            ) : null}
            {group.language ? (
              <Link
                to="/group/language/$slug"
                params={{ slug: group.language.toLowerCase().replace(/[^a-z0-9]+/g, "-") }}
                className="inline-flex items-center gap-1.5 hover:text-primary font-medium"
              >
                <Languages className="size-3.5" />
                {group.language}
              </Link>
            ) : null}
            {timing ? (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                {timing}
              </span>
            ) : null}
          </p>

          {group.description.trim() ? (
            <div className="mx-auto mt-5 w-full max-w-2xl rounded border border-border bg-card px-4 py-3 text-left text-sm leading-relaxed text-foreground whitespace-pre-wrap">
              <h2 className="text-base font-semibold text-foreground mb-1">About {group.name}</h2>
              {group.description}
            </div>
          ) : (
            <div className="mx-auto mt-5 w-full max-w-2xl rounded border border-border bg-card px-4 py-3 text-left text-sm leading-relaxed text-muted-foreground">
              <h2 className="text-base font-semibold text-foreground mb-1">About {group.name}</h2>
              Join the official public invite link for <strong>{group.name}</strong> on Groupor. Connect with like-minded members in {categoryName}{group.country ? ` based in ${group.country}` : ""}{group.language ? ` speaking ${group.language}` : ""}.
            </div>
          )}

          {group.tags && group.tags.length > 0 ? (
            <ul className="mx-auto mt-4 flex max-w-2xl flex-wrap justify-center gap-2">
              {group.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-[13px] font-normal leading-none text-primary"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          ) : null}

          {reported ? (
            <p className="mt-8 text-[15px] font-normal text-foreground">
              This group is Reported for review...
            </p>
          ) : url && code ? (
            <div className="mt-8 flex flex-col items-center gap-3">
              <div className="flex flex-wrap justify-center gap-2">
                <Link
                  to="/group/join/whatsapp/$code"
                  params={{ code }}
                  className="rounded-md bg-cta px-6 py-3 text-base font-bold text-cta-foreground transition-opacity hover:opacity-90 shadow-md"
                >
                  Join {group.name} Group Now
                </Link>
                <a
                  href={`https://api.whatsapp.com/send?text=${share.encoded}`}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="rounded-md bg-card border border-border px-5 py-3 text-base font-semibold text-foreground transition-colors hover:bg-accent"
                >
                  Share Group
                </a>
              </div>
              <div className="flex justify-center gap-2 mt-2">
                <a
                  href={`https://api.whatsapp.com/send?text=${share.encoded}`}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label="Share on WhatsApp"
                  className="flex size-9 items-center justify-center rounded-md bg-[#25D366] text-white hover:opacity-90"
                >
                  <MessageCircle className="size-4" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${share.encoded}`}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label="Share on Twitter"
                  className="flex size-9 items-center justify-center rounded-md bg-[#1DA1F2] text-white hover:opacity-90"
                >
                  <Twitter className="size-4" />
                </a>
              </div>
            </div>
          ) : (
            <p className="mt-8 text-sm text-muted-foreground">
              This invite link is no longer valid.
            </p>
          )}

          {/* Educational & SEO Content Block */}
          <div className="mx-auto mt-10 w-full max-w-2xl text-left border-t border-border pt-6 space-y-6">
            <section>
              <h2 className="text-lg font-bold text-foreground">How to Join {group.name} WhatsApp Group</h2>
              <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
                <li>Click on the <strong>Join {group.name} Group Now</strong> button above.</li>
                <li>Review the group rules and guidelines on the confirmation page.</li>
                <li>Tap <strong>I Agree & Join Group</strong> to open WhatsApp and join the community.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground">WhatsApp Group Safety & Etiquette</h2>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                <li>Be respectful to all group members and admins.</li>
                <li>Keep conversations relevant to <strong>{categoryName}</strong>.</li>
                <li>Do not share personal financial details or unverified promotional links.</li>
                <li>Use WhatsApp privacy settings to protect your profile information.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground">Frequently Asked Questions</h2>
              <div className="mt-3 space-y-3 text-sm text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground">Is joining {group.name} free?</h3>
                  <p>Yes, all WhatsApp group invite links listed on Groupor are 100% free to join.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">What if the WhatsApp group is full?</h3>
                  <p>If the group has reached its maximum member limit (1,024 members), explore other groups in the <Link to="/group/category/$slug" params={{ slug: group.category }} className="text-primary underline">{categoryName}</Link> category.</p>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-8 text-left">
            {code ? <ReportGroup groupId={group.id} inviteCode={code} reported={reported} /> : null}
          </div>
        </article>

        {!reported && (
          <section className="mt-12">
            <h2 className="text-2xl font-normal text-foreground">Related Groups</h2>
            <div className="mt-5 flex flex-col gap-4">
              {related.slice(0, visible).map((g) => (
                <GroupCard key={g.id} group={g} />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              disabled={visible >= related.length}
              className="mt-6 rounded-md bg-cta px-5 py-3 text-lg font-normal text-cta-foreground transition-opacity hover:opacity-90 disabled:cursor-default disabled:opacity-70"
            >
              {visible >= related.length ? "No more groups" : "Show more"}
            </button>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
