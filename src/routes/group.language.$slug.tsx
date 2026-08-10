import { createFileRoute, notFound } from "@tanstack/react-router";
import { GroupLandingPage } from "@/components/GroupLandingPage";
import { absoluteUrl, groupsForLanguage, languagePath } from "@/lib/seo";

export const Route = createFileRoute("/group/language/$slug")({
  loader: ({ params }) => {
    const groups = groupsForLanguage(params.slug);
    if (groups.length === 0) throw notFound();
    return { language: groups[0].language ?? "", groups };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ name: "robots", content: "noindex" }] };
    const title = loaderData.language + " WhatsApp Groups | Groupor";
    const description = "Browse active " + loaderData.language + " WhatsApp groups on Groupor.";
    const url = absoluteUrl(languagePath(loaderData.language));
    return {
      meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:url", content: url }, { property: "og:type", content: "website" }],
      links: [{ rel: "canonical", href: url }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "CollectionPage", name: title, url, mainEntity: { "@type": "ItemList", numberOfItems: loaderData.groups.length } }) }],
    };
  },
  component: () => {
    const { language, groups } = Route.useLoaderData();
    return <GroupLandingPage parent="Languages" heading={language + " WhatsApp Groups"} intro={"Find active public WhatsApp communities where " + language + " is used."} groups={groups} />;
  },
});
