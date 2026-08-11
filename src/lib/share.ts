import { categories, type Group } from "@/data/groups";

const SITE = "https://www.groupor.link";

/** Share copy like Groupsor: filter find-page link, not WhatsApp invite. */
export function groupFindShare(group: Group) {
  const categoryName =
    categories.find((c) => c.slug === group.category)?.name ?? group.category;
  const label = [categoryName, group.country, group.language]
    .filter(Boolean)
    .join(" ");

  const params = new URLSearchParams();
  if (group.category) params.set("category", group.category);
  if (group.country) params.set("country", group.country);
  if (group.language) params.set("language", group.language);

  const url = `${SITE}/group/find${params.toString() ? `?${params}` : ""}`;
  const text = `Join ${label} Whatsapp Group Link. Follow this link : ${url}`;

  return { text, url, encoded: encodeURIComponent(text) };
}

export function findPageShare(filters: {
  category?: string;
  country?: string;
  language?: string;
  q?: string;
}) {
  const categoryName = filters.category
    ? (categories.find((c) => c.slug === filters.category)?.name ?? filters.category)
    : "";
  const label = [categoryName, filters.country, filters.language, filters.q]
    .filter(Boolean)
    .join(" ");

  const params = new URLSearchParams();
  if (filters.category) params.set("category", filters.category);
  if (filters.country) params.set("country", filters.country);
  if (filters.language) params.set("language", filters.language);
  if (filters.q) params.set("q", filters.q);

  const url = `${SITE}/group/find${params.toString() ? `?${params}` : ""}`;
  const text = label
    ? `Join ${label} Whatsapp Group Link. Follow this link : ${url}`
    : `Join Whatsapp Group Link. Follow this link : ${url}`;

  return { text, url, encoded: encodeURIComponent(text) };
}
