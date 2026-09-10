import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { GroupLandingPage } from "@/components/GroupLandingPage";
import { groups, languages, slugify } from "@/data/groups";
import { absoluteUrl, getLanguageCode, getLanguageHreflangs, getOgLocale, languagePath } from "@/lib/seo";
import { useSubmittedGroups } from "@/lib/submitted-groups";
import { useRemovedGroups } from "@/lib/removed-groups";

export const Route = createFileRoute("/group/language/$slug")({
  loader: ({ params }) => {
    const match = languages.find((l) => slugify(l) === params.slug);
    const languageName = match ?? params.slug.replace(/-/g, " ");
    return { language: languageName, slug: params.slug };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ name: "robots", content: "noindex" }] };
    const title = `${loaderData.language} WhatsApp Groups (2026) | Groupor`;
    const description = `Browse active ${loaderData.language} WhatsApp groups on Groupor. Connect with verified communities worldwide in ${loaderData.language}.`;
    const url = absoluteUrl(languagePath(loaderData.language));
    const langCode = getLanguageCode(loaderData.language);
    const ogLocale = getOgLocale(loaderData.language);
    const hreflangs = getLanguageHreflangs();

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
  const { language, slug } = Route.useLoaderData();
  const submitted = useSubmittedGroups();
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
