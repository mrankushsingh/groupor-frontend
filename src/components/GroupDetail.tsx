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
import { groups, joinHref, inviteCodeOf, type Group } from "@/data/groups";
import { trackEvent } from "@/lib/analytics";
import { groupFindShare } from "@/lib/share";

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
                src={group.image}
                alt={`${group.name} WhatsApp group photo`}
                className="size-[120px] rounded-full object-cover"
              />
            ) : (
              <div className="flex size-[120px] items-center justify-center rounded-full bg-[#f0f0f0] text-[#5bc0de]">
                <MessageCircle className="size-12" />
              </div>
            )}
          </div>

          <h1 className="mt-5 text-[22px] font-bold leading-snug text-foreground">
            {group.name}
          </h1>

          <p className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[13px] text-[#777]">
            <Link
              to="/group/category/$slug"
              params={{ slug: group.category }}
              className="inline-flex items-center gap-1.5 hover:text-primary"
            >
              <LayoutGrid className="size-3.5" />
              {categoryName}
            </Link>
            <Link
              to="/group/country/$slug"
              params={{ slug: group.country.toLowerCase().replace(/[^a-z0-9]+/g, "-") }}
              className="inline-flex items-center gap-1.5 hover:text-primary"
            >
              <Globe className="size-3.5" />
              {group.country}
            </Link>
            {group.language && (
              <Link
                to="/group/language/$slug"
                params={{ slug: group.language.toLowerCase() }}
                className="inline-flex items-center gap-1.5 hover:text-primary"
              >
                <Languages className="size-3.5" />
                {group.language}
              </Link>
            )}
            {timing ? (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                {timing}
              </span>
            ) : null}
          </p>

          {group.description.trim() ? (
            <div className="mx-auto mt-5 w-full max-w-2xl rounded border border-[#ddd] bg-white px-4 py-3 text-left text-[15px] leading-relaxed text-[#333] whitespace-pre-wrap">
              {group.description}
            </div>
          ) : null}

          {group.tags && group.tags.length > 0 ? (
            <ul className="mx-auto mt-4 flex max-w-2xl flex-wrap justify-center gap-2">
              {group.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-[#5bc0de] px-3 py-1 text-[13px] font-normal leading-none text-white"
                >
                  {tag}
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
                  className="rounded-md bg-cta px-5 py-2.5 text-base text-cta-foreground transition-opacity hover:opacity-90"
                >
                  Join group
                </Link>
                <a
                  href={`https://api.whatsapp.com/send?text=${share.encoded}`}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="rounded-md bg-cta px-5 py-2.5 text-base text-cta-foreground transition-opacity hover:opacity-90"
                >
                  Share group
                </a>
              </div>
              <div className="flex justify-center gap-2">
                <a
                  href={`https://api.whatsapp.com/send?text=${share.encoded}`}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label="Share on WhatsApp"
                  className="flex size-8 items-center justify-center rounded-md bg-[#25D366] text-primary-foreground"
                >
                  <MessageCircle className="size-4" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${share.encoded}`}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label="Share on Twitter"
                  className="flex size-8 items-center justify-center rounded-md bg-[#1DA1F2] text-primary-foreground"
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

          <div className="mt-10 text-left">
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
