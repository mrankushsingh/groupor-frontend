import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { GroupLandingPage } from "@/components/GroupLandingPage";
import { countries, groups, slugify, sortGroups } from "@/data/groups";
import { absoluteUrl, countryPath, getCountryHreflangs, getOgLocale } from "@/lib/seo";
import { useSubmittedGroups } from "@/lib/submitted-groups";
import { useRemovedGroups } from "@/lib/removed-groups";

export const Route = createFileRoute("/group/country/$slug")({
  loader: ({ params }) => {
    const match = countries.find(
      (c) => slugify(c.name) === params.slug || c.code.toLowerCase() === params.slug,
    );
    const countryName = match ? match.name : params.slug.replace(/-/g, " ");
    const countryCode = match ? match.code : "";
    return { country: countryName, code: countryCode, slug: params.slug };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ name: "robots", content: "noindex" }] };
    const title = `WhatsApp Groups in ${loaderData.country} (2026) | Groupor`;
    const description = `Join active WhatsApp groups in ${loaderData.country} (2026). Discover verified local communities for jobs, networking, education, and social discussion.`;
    const url = absoluteUrl(countryPath(loaderData.country));
    const ogLocale = getOgLocale(loaderData.country);
    const hreflangs = getCountryHreflangs();

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: ogLocale },
        { name: "twitter:card", content: "summary" },
      ],
      links: [{ rel: "canonical", href: url }, ...hreflangs],
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
                  { "@type": "ListItem", position: 2, name: "Countries", item: absoluteUrl("/group/find") },
                  { "@type": "ListItem", position: 3, name: loaderData.country, item: url },
                ],
              },
              {
                "@type": "CollectionPage",
                name: title,
                description: description,
                url: url,
                areaServed: {
                  "@type": "Country",
                  name: loaderData.country,
                  ...(loaderData.code ? { identifier: loaderData.code } : {}),
                },
              },
            ],
          }),
        },
      ],
    };
  },
  component: GroupCountryComponent,
});

function GroupCountryComponent() {
  const { country, slug } = Route.useLoaderData();
  const submitted = useSubmittedGroups();
  const { isRemoved } = useRemovedGroups();

  const countryGroups = useMemo(() => {
    const all = sortGroups([...submitted, ...groups]);
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
      heading={`WhatsApp Groups in ${country} (2026)`}
      intro={`Explore public WhatsApp group links and active local communities for people in ${country}. Discover jobs, education, local trading, and social discussion groups.`}
      groups={countryGroups}
    />
  );
}
