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
 * Decodes all numeric hex/decimal and named HTML entities (including unclosed or truncated fragments like &#x1d5f),
 * and normalizes fancy mathematical Unicode characters (e.g. 𝙰𝚕𝚕 𝙲𝚊𝚝𝚎𝚐𝚘𝚛𝚒𝚎𝚜) into clean standard text.
 */
export function cleanText(value?: string | null): string {
  if (!value) return "";
  let text = String(value);

  // Decode valid hex entities with or without trailing semicolon
  text = text.replace(/&#x([0-9a-fA-F]{2,6});?/gi, (_, hex) => {
    try {
      const codePoint = parseInt(hex, 16);
      if (codePoint > 0 && codePoint <= 0x10ffff) {
        return String.fromCodePoint(codePoint);
      }
    } catch {
      /* pass */
    }
    return "";
  });

  // Decode valid decimal entities with or without trailing semicolon
  text = text.replace(/&#([0-9]{2,7});?/g, (_, dec) => {
    try {
      const codePoint = parseInt(dec, 10);
      if (codePoint > 0 && codePoint <= 0x10ffff) {
        return String.fromCodePoint(codePoint);
      }
    } catch {
      /* pass */
    }
    return "";
  });

  // Strip any remaining truncated/broken entity fragments (e.g. &#x1d5f)
  text = text.replace(/&#x?[0-9a-fA-F]*/gi, "");

  // Decode named HTML entities
  text = text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ");

  // Normalize fancy mathematical unicode fonts (A-Z, a-z, 0-9) to clean ASCII
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
