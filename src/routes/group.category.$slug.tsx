import { createFileRoute, notFound } from "@tanstack/react-router";
import { GroupLandingPage } from "@/components/GroupLandingPage";
import { categories } from "@/data/groups";
import { absoluteUrl, categoryPath, groupsForCategory } from "@/lib/seo";

export const Route = createFileRoute("/group/category/$slug")({
  loader: ({ params }) => {
    const category = categories.find((item) => item.slug === params.slug && item.slug !== "all");
    const groups = groupsForCategory(params.slug);
    if (!category || groups.length === 0) throw notFound();
    return { category, groups };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ name: "robots", content: "noindex" }] };
    const title = loaderData.category.name + " WhatsApp Groups | Groupor";
    const description = "Browse active " + loaderData.category.name.toLowerCase() + " WhatsApp groups on Groupor. Find communities by country and language.";
    const url = absoluteUrl(categoryPath(loaderData.category.slug));
    return {
      meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:url", content: url }, { property: "og:type", content: "website" }],
      links: [{ rel: "canonical", href: url }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "CollectionPage", name: title, url, mainEntity: { "@type": "ItemList", numberOfItems: loaderData.groups.length, itemListElement: loaderData.groups.map((group, position) => ({ "@type": "ListItem", position: position + 1, name: group.name, url: absoluteUrl("/group/invite/whatsapp/" + group.link.split("/").pop()) })) } }) }],
    };
  },
  component: () => {
    const { category, groups } = Route.useLoaderData();
    return <GroupLandingPage parent="Categories" heading={category.name + " WhatsApp Groups"} intro={"Discover active " + category.name.toLowerCase() + " WhatsApp communities. Listings are moderated and public invite links are reviewed when possible."} groups={groups} />;
  },
});
