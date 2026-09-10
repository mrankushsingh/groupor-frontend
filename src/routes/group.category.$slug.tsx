import { createFileRoute, notFound } from "@tanstack/react-router";
import { useMemo } from "react";
import { GroupLandingPage } from "@/components/GroupLandingPage";
import { categories, groups, slugify } from "@/data/groups";
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
    const title = loaderData.category.name + " WhatsApp Groups | Groupor";
    const description = "Browse active " + loaderData.category.name.toLowerCase() + " WhatsApp groups on Groupor. Find communities by country and language.";
    const url = absoluteUrl(categoryPath(loaderData.category.slug));
    return {
      meta: [{ title }, { name: "description", content: description }, { name: "robots", content: "index, follow" }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:url", content: url }, { property: "og:type", content: "website" }],
      links: [{ rel: "canonical", href: url }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "CollectionPage", name: title, url }) }],
    };
  },
  component: GroupCategoryComponent,
});

function GroupCategoryComponent() {
  const { category } = Route.useLoaderData();
  const submitted = useSubmittedGroups();
  const { isRemoved } = useRemovedGroups();

  const categoryGroups = useMemo(() => {
    const all = [...submitted, ...groups];
    return all.filter(
      (g) =>
        g.status !== "inactive" &&
        g.category === category.slug &&
        !isRemoved(g.id, g.link),
    );
  }, [category.slug, submitted, isRemoved]);

  return (
    <GroupLandingPage
      parent="Categories"
      heading={category.name + " WhatsApp Groups"}
      intro={"Discover active " + category.name.toLowerCase() + " WhatsApp communities. Listings are moderated and public invite links are reviewed when possible."}
      groups={categoryGroups}
    />
  );
}
