import { createFileRoute, notFound } from "@tanstack/react-router";
import { useMemo } from "react";
import { GroupLandingPage } from "@/components/GroupLandingPage";
import { categories, groups, sortGroups } from "@/data/groups";
import { getCategoryIntro } from "@/data/category-intros";
import { absoluteUrl, categoryPath } from "@/lib/seo";
import { fetchSubmittedForSsr, useSubmittedGroups } from "@/lib/submitted-groups";
import { useRemovedGroups } from "@/lib/removed-groups";
import { isSafeGroupForPublicFeed } from "@/lib/moderation";

export const Route = createFileRoute("/group/category/$slug")({
  loader: async ({ params }) => {
    const category = categories.find((item) => item.slug === params.slug && item.slug !== "all");
    if (!category) throw notFound();
    const submitted = await fetchSubmittedForSsr();
    return { category, submitted };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ name: "robots", content: "noindex" }] };
    const isAdult = loaderData.category.slug === "adult";
    const title = `${loaderData.category.name} WhatsApp Group Links (2026) | Groupor`;
    const intro = getCategoryIntro(loaderData.category.slug);
    const description = intro.description.slice(0, 155);
    const url = absoluteUrl(categoryPath(loaderData.category.slug));
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index, follow" },
        ...(isAdult
          ? [
              { name: "rating", content: "adult" },
              { name: "rating", content: "RTA-5042-1996-1400-1577-RTA" },
            ]
          : []),
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "en_US" },
        { name: "twitter:card", content: "summary" },
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
                  { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
                  { "@type": "ListItem", position: 2, name: "Categories", item: absoluteUrl("/group/find") },
                  { "@type": "ListItem", position: 3, name: loaderData.category.name, item: url },
                ],
              },
              {
                "@type": "CollectionPage",
                name: title,
                description: description,
                url: url,
                isFamilyFriendly: !isAdult,
                ...(isAdult ? { contentRating: "18+" } : {}),
              },
            ],
          }),
        },
      ],
    };
  },
  component: GroupCategoryComponent,
});

function GroupCategoryComponent() {
  const loaderData = Route.useLoaderData();
  const { category } = loaderData;
  const submitted = useSubmittedGroups(loaderData?.submitted);
  const { isRemoved } = useRemovedGroups();

  const categoryGroups = useMemo(() => {
    const all = sortGroups([...submitted, ...groups]);
    const isAdult = category.slug === "adult";
    return all.filter(
      (g) =>
        g.status !== "inactive" &&
        g.category === category.slug &&
        !isRemoved(g.id, g.link) &&
        isSafeGroupForPublicFeed(g, isAdult),
    );
  }, [category.slug, submitted, isRemoved]);

  const categoryIntro = getCategoryIntro(category.slug);

  return (
    <GroupLandingPage
      parent="Categories"
      heading={`${category.name} WhatsApp Group Links (2026)`}
      intro={categoryIntro.description}
      categoryIntro={categoryIntro}
      categorySlug={category.slug}
      groups={categoryGroups}
    />
  );
}
