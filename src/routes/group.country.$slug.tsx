import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { GroupLandingPage } from "@/components/GroupLandingPage";
import { countries, groups, slugify, sortGroups } from "@/data/groups";
import { getCountryProfile } from "@/data/country-profiles";
import { viralHubs } from "@/data/viral-hubs";
import { absoluteUrl, countryPath, getCountryHreflangs, getOgLocale } from "@/lib/seo";
import { fetchSubmittedForSsr, useSubmittedGroups } from "@/lib/submitted-groups";
import { useRemovedGroups } from "@/lib/removed-groups";

export const Route = createFileRoute("/group/country/$slug")({
  loader: async ({ params }) => {
    const profile = getCountryProfile(params.slug);
    const relatedViralHubs = viralHubs.filter(
      (h) =>
        h.country.toLowerCase() === profile.name.toLowerCase() ||
        profile.viralHubSlugs.includes(h.slug),
    );

    const submitted = await fetchSubmittedForSsr();
    const all = [...submitted, ...groups];
    const groupCount = all.filter(
      (g) =>
        g.status !== "inactive" &&
        (g.country.toLowerCase() === profile.name.toLowerCase() ||
          slugify(g.country) === params.slug ||
          (g.countryCode && profile.code && g.countryCode.toUpperCase() === profile.code.toUpperCase())),
    ).length;

    return {
      profile,
      relatedViralHubs,
      country: profile.name,
      code: profile.code,
      slug: params.slug,
      groupCount,
      submitted,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ name: "robots", content: "noindex" }] };
    const { profile } = loaderData;
    const title = profile.title;
    const description = profile.metaDescription;
    const url = absoluteUrl(countryPath(loaderData.country));
    const ogLocale = getOgLocale(loaderData.country);
    const hreflangs = getCountryHreflangs();
    const robotsContent =
      (loaderData.groupCount ?? 0) > 0
        ? "index, follow, max-image-preview:large, max-snippet:-1"
        : "noindex, follow";

    const faqSchemaItems = profile.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    }));

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: robotsContent },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: ogLocale },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
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
                name: profile.h1,
                description: description,
                url: url,
                areaServed: {
                  "@type": "Country",
                  name: loaderData.country,
                  ...(loaderData.code ? { identifier: loaderData.code } : {}),
                },
              },
              {
                "@type": "FAQPage",
                mainEntity: faqSchemaItems,
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
  const loaderData = Route.useLoaderData();
  const { profile, relatedViralHubs, country, slug } = loaderData;
  const submitted = useSubmittedGroups(loaderData?.submitted);
  const { isRemoved } = useRemovedGroups();

  const countryGroups = useMemo(() => {
    const all = sortGroups([...submitted, ...groups]);
    return all.filter(
      (g) =>
        g.status !== "inactive" &&
        !isRemoved(g.id, g.link) &&
        (g.country.toLowerCase() === country.toLowerCase() ||
          slugify(g.country) === slug ||
          (g.countryCode && profile.code && g.countryCode.toUpperCase() === profile.code.toUpperCase())),
    );
  }, [country, slug, profile.code, submitted, isRemoved]);

  return (
    <GroupLandingPage
      parent="Countries"
      heading={profile.h1}
      intro={profile.heroIntro}
      groups={countryGroups}
      countryProfile={profile}
      relatedViralHubs={relatedViralHubs}
    />
  );
}
