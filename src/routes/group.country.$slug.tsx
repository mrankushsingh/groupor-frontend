import { createFileRoute, notFound } from "@tanstack/react-router";
import { GroupLandingPage } from "@/components/GroupLandingPage";
import { absoluteUrl, countryPath, groupsForCountry } from "@/lib/seo";

export const Route = createFileRoute("/group/country/$slug")({
  loader: ({ params }) => {
    const groups = groupsForCountry(params.slug);
    if (groups.length === 0) throw notFound();
    return { country: groups[0].country, groups };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ name: "robots", content: "noindex" }] };
    const title = loaderData.country + " WhatsApp Groups | Groupor";
    const description = "Browse active WhatsApp groups for " + loaderData.country + " on Groupor.";
    const url = absoluteUrl(countryPath(loaderData.country));
    return {
      meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:url", content: url }, { property: "og:type", content: "website" }],
      links: [{ rel: "canonical", href: url }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "CollectionPage", name: title, url, mainEntity: { "@type": "ItemList", numberOfItems: loaderData.groups.length } }) }],
    };
  },
  component: () => {
    const { country, groups } = Route.useLoaderData();
    return <GroupLandingPage parent="Countries" heading={country + " WhatsApp Groups"} intro={"Find public WhatsApp communities relevant to people in " + country + "."} groups={groups} />;
  },
});
