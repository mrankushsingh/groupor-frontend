import { createFileRoute, notFound } from "@tanstack/react-router";
import { useMemo } from "react";
import { GroupLandingPage } from "@/components/GroupLandingPage";
import { categories, groups, sortGroups } from "@/data/groups";
import { getCategoryIntro } from "@/data/category-intros";
import { absoluteUrl, categoryPath } from "@/lib/seo";
import { useSubmittedGroups } from "@/lib/submitted-groups";
import { useRemovedGroups } from "@/lib/removed-groups";

export const Route = createFileRoute("/group/category/$slug")({
  loader: ({ params }) => {
    const category = categories.find((item) => item.slug === params.slug && item.slug !== "all");
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ name: "robots", content: "noindex" }] };
    const title = `${loaderData.category.name} WhatsApp Group Links (2026) | Groupor`;
    const intro = getCategoryIntro(loaderData.category.slug);
    const description = intro.description.slice(0, 155);
    const url = absoluteUrl(categoryPath(loaderData.category.slug));
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: title,
            description: description,
            url: url,
          }),
        },
      ],
    };
  },
  component: GroupCategoryComponent,
});

function GroupCategoryComponent() {
  const { category } = Route.useLoaderData();
  const submitted = useSubmittedGroups();
  const { isRemoved } = useRemovedGroups();

  const categoryGroups = useMemo(() => {
    const all = sortGroups([...submitted, ...groups]);
    return all.filter(
      (g) =>
        g.status !== "inactive" &&
        g.category === category.slug &&
        !isRemoved(g.id, g.link),
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
