import { Link } from "@tanstack/react-router";
import { MessageCircle, LayoutGrid, Globe, Languages } from "lucide-react";
import { groupSlug, categories, inviteCodeOf, type Group } from "@/data/groups";
import { groupFindShare } from "@/lib/share";

function ShareButton({
  href,
  label,
  children,
  className,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      aria-label={label}
      className={`flex size-7 items-center justify-center rounded-md text-primary-foreground transition-opacity hover:opacity-90 ${className}`}
    >
      {children}
    </a>
  );
}

export function GroupCard({ group }: { group: Group }) {
  const categoryName = categories.find((c) => c.slug === group.category)?.name ?? group.category;
  const code = inviteCodeOf(group.link);
  const share = groupFindShare(group);

  return (
    <article className="rounded-sm border border-border/70 bg-card px-4 py-4">
      <div className="flex items-start gap-4">
        {group.image ? (
          <img
            src={group.image}
            alt={`${group.name} group icon`}
            loading="lazy"
            className="size-14 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MessageCircle className="size-7" />
          </div>
        )}

        <div className="min-w-0 flex-1">
          {code ? (
            <Link
              to="/group/invite/whatsapp/$code"
              params={{ code }}
              className="text-lg font-bold leading-snug text-foreground transition-colors hover:text-primary"
            >
              <h3>{group.name}</h3>
            </Link>
          ) : (
            <Link
              to="/category/$slug/$group"
              params={{ slug: group.category, group: groupSlug(group) }}
              className="text-lg font-bold leading-snug text-foreground transition-colors hover:text-primary"
            >
              <h3>{group.name}</h3>
            </Link>
          )}

          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <LayoutGrid className="size-3.5" />
              {categoryName}
            </span>
            <span className="flex items-center gap-1">
              <Globe className="size-3.5" />
              {group.country}
            </span>
            <span className="flex items-center gap-1">
              <Languages className="size-3.5" />
              {group.language}
            </span>
          </div>
        </div>
      </div>

      {group.description.trim() ? (
        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{group.description}</p>
      ) : null}

      {group.tags && group.tags.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {group.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-[#5bc0de] px-2.5 py-0.5 text-[12px] font-normal text-white"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/60 pt-3">
        {code ? (
          <Link
            to="/group/invite/whatsapp/$code/join"
            params={{ code }}
            className="text-sm font-bold text-link hover:underline"
          >
            Join group
          </Link>
        ) : (
          <Link
            to="/category/$slug/$group"
            params={{ slug: group.category, group: groupSlug(group) }}
            className="text-sm font-bold text-link hover:underline"
          >
            Join group
          </Link>
        )}

        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-link">Share on</span>
          <ShareButton
            href={`https://wa.me/?text=${share.encoded}`}
            label="Share on WhatsApp"
            className="bg-primary"
          >
            <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.893c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </ShareButton>
          <ShareButton
            href={`https://twitter.com/intent/tweet?text=${share.encoded}`}
            label="Share on Twitter"
            className="bg-accent"
          >
            <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </ShareButton>
        </div>
      </div>
    </article>
  );
}
