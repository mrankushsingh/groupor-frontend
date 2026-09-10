import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { GroupLandingPage } from "@/components/GroupLandingPage";
import { countries, groups, slugify } from "@/data/groups";
import { absoluteUrl, countryPath } from "@/lib/seo";
import { useSubmittedGroups } from "@/lib/submitted-groups";
import { useRemovedGroups } from "@/lib/removed-groups";

export const Route = createFileRoute("/group/country/$slug")({
  loader: ({ params }) => {
    const match = countries.find(
      (c) => slugify(c.name) === params.slug || c.code.toLowerCase() === params.slug,
    );
    const countryName = match ? match.name : params.slug.replace(/-/g, " ");
    return { country: countryName, slug: params.slug };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ name: "robots", content: "noindex" }] };
    const title = loaderData.country + " WhatsApp Groups | Groupor";
    const description = "Browse active WhatsApp groups for " + loaderData.country + " on Groupor.";
    const url = absoluteUrl(countryPath(loaderData.country));
    return {
      meta: [{ title }, { name: "description", content: description }, { name: "robots", content: "index, follow" }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:url", content: url }, { property: "og:type", content: "website" }],
      links: [{ rel: "canonical", href: url }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "CollectionPage", name: title, url }) }],
    };
  },
  component: GroupCountryComponent,
});

function GroupCountryComponent() {
  const { country, slug } = Route.useLoaderData();
  const submitted = useSubmittedGroups();
  const { isRemoved } = useRemovedGroups();

  const countryGroups = useMemo(() => {
    const all = [...submitted, ...groups];
    return all.filter(
      (g) =>
        g.status !== "inactive" &&
        !isRemoved(g.id, g.link) &&
        (g.country === country || slugify(g.country) === slug),
    );
  }, [country, slug, submitted, isRemoved]);

  return (
    <GroupLandingPage
      parent="Countries"
      heading={country + " WhatsApp Groups"}
      intro={"Find public WhatsApp communities relevant to people in " + country + "."}
      groups={countryGroups}
    />
  );
}
