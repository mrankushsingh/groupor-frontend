import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { GroupLandingPage } from "@/components/GroupLandingPage";
import { groups, languages, slugify } from "@/data/groups";
import { absoluteUrl, getLanguageCode, getLanguageHreflangs, getOgLocale, languagePath } from "@/lib/seo";
import { fetchSubmittedForSsr, useSubmittedGroups } from "@/lib/submitted-groups";
import { useRemovedGroups } from "@/lib/removed-groups";

export const Route = createFileRoute("/group/language/$slug")({
  loader: async ({ params }) => {
    const match = languages.find((l) => slugify(l) === params.slug);
    const languageName = match ?? params.slug.replace(/-/g, " ");
    const submitted = await fetchSubmittedForSsr();
    const all = [...submitted, ...groups];
    const groupCount = all.filter(
      (g) =>
        g.status !== "inactive" &&
        (g.language === languageName || slugify(g.language ?? "") === params.slug),
    ).length;
    return { language: languageName, slug: params.slug, groupCount, submitted };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ name: "robots", content: "noindex" }] };
    const title = `${loaderData.language} WhatsApp Groups (2026) | Groupor`;
    const description = `Browse active ${loaderData.language} WhatsApp groups on Groupor. Connect with verified communities worldwide in ${loaderData.language}.`;
    const url = absoluteUrl(languagePath(loaderData.language));
    const langCode = getLanguageCode(loaderData.language);
    const ogLocale = getOgLocale(loaderData.language);
    const hreflangs = getLanguageHreflangs();
    const robotsContent = (loaderData.groupCount ?? 0) > 0 ? "index, follow" : "noindex, follow";

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
                  { "@type": "ListItem", position: 2, name: "Languages", item: absoluteUrl("/group/find") },
                  { "@type": "ListItem", position: 3, name: loaderData.language, item: url },
                ],
              },
              {
                "@type": "CollectionPage",
                name: title,
                description: description,
                url: url,
                inLanguage: langCode,
              },
            ],
          }),
        },
      ],
    };
  },
  component: GroupLanguageComponent,
});

function GroupLanguageComponent() {
  const loaderData = Route.useLoaderData();
  const { language, slug } = loaderData;
  const submitted = useSubmittedGroups(loaderData?.submitted);
  const { isRemoved } = useRemovedGroups();

  const languageGroups = useMemo(() => {
    const all = [...submitted, ...groups];
    return all.filter(
      (g) =>
        g.status !== "inactive" &&
        !isRemoved(g.id, g.link) &&
        (g.language === language || slugify(g.language ?? "") === slug),
    );
  }, [language, slug, submitted, isRemoved]);

  return (
    <GroupLandingPage
      parent="Languages"
      heading={language + " WhatsApp Groups"}
      intro={"Find active public WhatsApp communities where " + language + " is used."}
      groups={languageGroups}
    />
  );
}
