import { createFileRoute } from "@tanstack/react-router";
import { GroupDetail, GroupNotFound } from "@/components/GroupDetail";
import { useSubmittedGroups } from "@/lib/submitted-groups";
import { categories, findGroupByCode, inviteCodeOf } from "@/data/groups";
import { DEFAULT_OG_IMAGE, groupSeo, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/group/invite/whatsapp/$code/")({
  loader: ({ params }) => {
    const group = findGroupByCode(params.code) ?? null;
    const categorySlug = group?.category ?? "";
    const category = categories.find((c) => c.slug === categorySlug);
    return { group, categoryName: category?.name ?? categorySlug, code: params.code };
  },
  head: ({ loaderData }) => {
    const url = `${SITE_URL}/group/invite/whatsapp/${loaderData?.code ?? ""}`;
    if (!loaderData?.group || loaderData.group.status === "inactive") {
      return {
        meta: [
          { title: "Group not found — Groupor" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { group, categoryName } = loaderData;
    const seo = groupSeo(group);
    const title = seo.title;
    const description = seo.description;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { property: "og:image", content: group.image ?? DEFAULT_OG_IMAGE },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: group.image ?? DEFAULT_OG_IMAGE },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: categoryName,
                    item: `${SITE_URL}/group/category/${group.category}`,
                  },
                  { "@type": "ListItem", position: 3, name: group.name, item: url },
                ],
              },
              {
                "@type": "WebPage",
                name: title,
                description,
                url,
                ...(group.image ? { image: group.image } : {}),
              },
            ],
          }),
        },
      ],
    };
  },
  component: GroupInvitePage,
});

function GroupInvitePage() {
  const { group: staticGroup, categoryName, code } = Route.useLoaderData();
  const submitted = useSubmittedGroups();
  const group = staticGroup ?? submitted.find((g) => inviteCodeOf(g.link) === code) ?? null;

  if (!group) return <GroupNotFound />;

  const name =
    categoryName || categories.find((c) => c.slug === group.category)?.name || group.category;

  return <GroupDetail group={group} categoryName={name} />;
}
