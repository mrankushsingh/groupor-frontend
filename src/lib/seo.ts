import { categories, groups, inviteCodeOf, slugify, type Group } from "@/data/groups";

export const SITE_URL = "https://www.groupor.link";
export const SITE_NAME = "Groupor";
export const DEFAULT_OG_IMAGE = SITE_URL + "/og-image.png";
export const MIN_LANDING_PAGE_GROUPS = 1;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString().replace(/\/$/, path === "/" ? "/" : "");
}

export function categoryPath(slug: string) {
  return "/group/category/" + slug;
}

export function countryPath(country: string) {
  return "/group/country/" + slugify(country);
}

export function languagePath(language: string) {
  return "/group/language/" + slugify(language);
}

export function groupSeo(group: Group) {
  const code = inviteCodeOf(group.link);
  const path = "/group/invite/whatsapp/" + code;
  const categoryName = categories.find((category) => category.slug === group.category)?.name ?? "Community";
  const title = group.name + " WhatsApp Group – Join " + categoryName + " | " + SITE_NAME;
  const description = ("Join the " + group.name + " WhatsApp group on " + SITE_NAME + ". " + group.description).slice(0, 155);
  return { url: absoluteUrl(path), title, description };
}

export function groupsForCategory(slug: string) {
  return groups.filter((group) => group.status !== "inactive" && group.category === slug);
}

export function groupsForCountry(slug: string) {
  return groups.filter((group) => group.status !== "inactive" && slugify(group.country) === slug);
}

export function groupsForLanguage(slug: string) {
  return groups.filter((group) => group.status !== "inactive" && slugify(group.language ?? "") === slug);
}

export function indexableCategories() {
  return categories.filter((category) => category.slug !== "all" && groupsForCategory(category.slug).length >= MIN_LANDING_PAGE_GROUPS);
}

export function indexableCountries() {
  return [...new Set(groups.filter((group) => group.status !== "inactive").map((group) => group.country))]
    .filter((country) => groupsForCountry(slugify(country)).length >= MIN_LANDING_PAGE_GROUPS);
}

export function indexableLanguages() {
  return [...new Set(groups.filter((group) => group.status !== "inactive").map((group) => group.language).filter(Boolean) as string[])]
    .filter((language) => groupsForLanguage(slugify(language)).length >= MIN_LANDING_PAGE_GROUPS);
}
