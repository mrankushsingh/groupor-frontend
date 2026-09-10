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

/**
 * Decodes numeric HTML entities (e.g. &#x1d5d4;) and normalizes fancy mathematical
 * unicode characters (e.g. 𝙰𝚕𝚕 𝙲𝚊𝚝𝚎𝚐𝚘𝚛𝚒𝚎𝚜) into clean standard text.
 */
export function cleanText(value?: string | null): string {
  if (!value) return "";
  let text = String(value);
  text = text.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
    try {
      return String.fromCodePoint(parseInt(hex, 16));
    } catch {
      return _;
    }
  });
  text = text.replace(/&#([0-9]+);/g, (_, dec) => {
    try {
      return String.fromCodePoint(parseInt(dec, 10));
    } catch {
      return _;
    }
  });
  return text.normalize("NFKD").trim();
}

export function groupSeo(group: Group) {
  const code = inviteCodeOf(group.link);
  const path = code ? "/group/invite/whatsapp/" + code : "/";
  const categoryName = categories.find((category) => category.slug === group.category)?.name ?? "Community";
  const cleanName = cleanText(group.name);
  const title = `${cleanName} WhatsApp Invite Link | ${SITE_NAME}`;
  const descBase = group.description ? cleanText(group.description) : `Join active ${cleanName} WhatsApp group link for ${categoryName}${group.country ? ` in ${group.country}` : ""}. Discover active verified communities on Groupor.`;
  const description = (`Join ${cleanName} WhatsApp group link. ${descBase}`).slice(0, 155);
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
