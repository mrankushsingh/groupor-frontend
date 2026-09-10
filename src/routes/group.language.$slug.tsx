import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { GroupLandingPage } from "@/components/GroupLandingPage";
import { groups, languages, slugify } from "@/data/groups";
import { absoluteUrl, languagePath } from "@/lib/seo";
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
    const title = loaderData.language + " WhatsApp Groups | Groupor";
    const description = "Browse active " + loaderData.language + " WhatsApp groups on Groupor.";
    const url = absoluteUrl(languagePath(loaderData.language));
    return {
      meta: [{ title }, { name: "description", content: description }, { name: "robots", content: "index, follow" }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:url", content: url }, { property: "og:type", content: "website" }],
      links: [{ rel: "canonical", href: url }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "CollectionPage", name: title, url }) }],
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
