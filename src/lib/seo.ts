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
 * Decodes all numeric hex/decimal and named HTML entities, strips truncated Mathematical entity fragments,
 * and normalizes fancy mathematical Unicode characters (e.g. 𝙰𝚕𝚕 𝙲𝚊𝚝𝚎𝚐𝚘𝚛𝚒𝚎𝚜) into clean standard text.
 */
export function cleanText(value?: string | null): string {
  if (!value) return "";
  let text = String(value);

  // 1. Decode full 5-digit Mathematical Alphanumeric Symbols (0x1D400 - 0x1D7FF)
  text = text.replace(/&#x(1[dD][4-7][0-9a-fA-F]{2});?/gi, (_, hex) => {
    try {
      const codePoint = parseInt(hex, 16);
      return String.fromCodePoint(codePoint);
    } catch {
      return "";
    }
  });

  // 2. Strip any incomplete/truncated Mathematical Alphanumeric entity fragments (e.g. &#x1d5f, &#x1d5)
  text = text.replace(/&#x1[dD][4-7][0-9a-fA-F]{0,2};?/gi, "");

  // 3. Decode remaining valid 2-6 digit hex entities
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

  // 4. Decode decimal entities
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

  // 5. Strip any generic unclosed entity fragments
  text = text.replace(/&#x?[0-9a-fA-F]*/gi, "");

  // 6. Decode named HTML entities
  text = text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ");

  // 7. Normalize fancy mathematical unicode fonts (A-Z, a-z, 0-9) to clean ASCII
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

/** Map common languages to ISO 639-1 language codes & Open Graph locales */
export const LANGUAGE_METADATA: Record<string, { code: string; ogLocale: string }> = {
  English: { code: "en", ogLocale: "en_US" },
  Spanish: { code: "es", ogLocale: "es_ES" },
  Hindi: { code: "hi", ogLocale: "hi_IN" },
  Portuguese: { code: "pt", ogLocale: "pt_BR" },
  French: { code: "fr", ogLocale: "fr_FR" },
  German: { code: "de", ogLocale: "de_DE" },
  Arabic: { code: "ar", ogLocale: "ar_SA" },
  Urdu: { code: "ur", ogLocale: "ur_PK" },
  Turkish: { code: "tr", ogLocale: "tr_TR" },
  Indonesian: { code: "id", ogLocale: "id_ID" },
  Russian: { code: "ru", ogLocale: "ru_RU" },
  Italian: { code: "it", ogLocale: "it_IT" },
  Chinese: { code: "zh", ogLocale: "zh_CN" },
  Japanese: { code: "ja", ogLocale: "ja_JP" },
  Korean: { code: "ko", ogLocale: "ko_KR" },
  Bangla: { code: "bn", ogLocale: "bn_BD" },
  Bengali: { code: "bn", ogLocale: "bn_BD" },
  Dutch: { code: "nl", ogLocale: "nl_NL" },
  Polish: { code: "pl", ogLocale: "pl_PL" },
  Tamil: { code: "ta", ogLocale: "ta_IN" },
  Telugu: { code: "te", ogLocale: "te_IN" },
  Marathi: { code: "mr", ogLocale: "mr_IN" },
  Gujarati: { code: "gu", ogLocale: "gu_IN" },
  Kannada: { code: "kn", ogLocale: "kn_IN" },
  Malayalam: { code: "ml", ogLocale: "ml_IN" },
  Punjabi: { code: "pa", ogLocale: "pa_IN" },
  Vietnamese: { code: "vi", ogLocale: "vi_VN" },
  Thai: { code: "th", ogLocale: "th_TH" },
  Filipino: { code: "fil", ogLocale: "fil_PH" },
  Swahili: { code: "sw", ogLocale: "sw_KE" },
  Persian: { code: "fa", ogLocale: "fa_IR" },
  Ukrainian: { code: "uk", ogLocale: "uk_UA" },
  Greek: { code: "el", ogLocale: "el_GR" },
  Hebrew: { code: "he", ogLocale: "he_IL" },
  Swedish: { code: "sv", ogLocale: "sv_SE" },
  Danish: { code: "da", ogLocale: "da_DK" },
  Finnish: { code: "fi", ogLocale: "fi_FI" },
  Norwegian: { code: "no", ogLocale: "no_NO" },
  Romanian: { code: "ro", ogLocale: "ro_RO" },
  Czech: { code: "cs", ogLocale: "cs_CZ" },
  Hungarian: { code: "hu", ogLocale: "hu_HU" },
};

/** Get ISO 639-1 code for language string */
export function getLanguageCode(languageName?: string): string {
  if (!languageName) return "en";
  const meta = LANGUAGE_METADATA[languageName];
  return meta ? meta.code : "en";
}

/** Get Open Graph locale string (e.g. es_ES, hi_IN, pt_BR) */
export function getOgLocale(languageOrCountry?: string): string {
  if (!languageOrCountry) return "en_US";
  if (LANGUAGE_METADATA[languageOrCountry]) {
    return LANGUAGE_METADATA[languageOrCountry].ogLocale;
  }
  const lower = languageOrCountry.toLowerCase();
  if (lower.includes("spain") || lower.includes("mexico") || lower.includes("argentina") || lower.includes("colombia")) return "es_ES";
  if (lower.includes("brazil") || lower.includes("portugal")) return "pt_BR";
  if (lower.includes("france")) return "fr_FR";
  if (lower.includes("germany") || lower.includes("austria")) return "de_DE";
  if (lower.includes("india")) return "hi_IN";
  if (lower.includes("saudi") || lower.includes("egypt") || lower.includes("uae")) return "ar_SA";
  if (lower.includes("pakistan")) return "ur_PK";
  if (lower.includes("indonesia")) return "id_ID";
  if (lower.includes("turkey")) return "tr_TR";
  if (lower.includes("russia")) return "ru_RU";
  return "en_US";
}

/** Generate hreflang alternate link objects for Country pages */
export function getCountryHreflangs() {
  const links: Array<{ rel: "alternate"; hreflang: string; href: string }> = [
    { rel: "alternate", hreflang: "x-default", href: absoluteUrl("/group/find") },
  ];
  // Include major regional country hubs
  const featuredCountries = [
    { name: "United States", code: "en-US" },
    { name: "United Kingdom", code: "en-GB" },
    { name: "India", code: "hi-IN" },
    { name: "Brazil", code: "pt-BR" },
    { name: "Spain", code: "es-ES" },
    { name: "Mexico", code: "es-MX" },
    { name: "Germany", code: "de-DE" },
    { name: "France", code: "fr-FR" },
    { name: "Indonesia", code: "id-ID" },
    { name: "Pakistan", code: "ur-PK" },
    { name: "Nigeria", code: "en-NG" },
    { name: "Saudi Arabia", code: "ar-SA" },
    { name: "United Arab Emirates", code: "ar-AE" },
    { name: "Canada", code: "en-CA" },
    { name: "Australia", code: "en-AU" },
    { name: "Turkey", code: "tr-TR" },
    { name: "Bangladesh", code: "bn-BD" },
    { name: "Egypt", code: "ar-EG" },
  ];

  for (const item of featuredCountries) {
    links.push({
      rel: "alternate",
      hreflang: item.code,
      href: absoluteUrl(countryPath(item.name)),
    });
  }
  return links;
}

/** Generate hreflang alternate link objects for Language pages */
export function getLanguageHreflangs() {
  const links: Array<{ rel: "alternate"; hreflang: string; href: string }> = [
    { rel: "alternate", hreflang: "x-default", href: absoluteUrl("/group/find") },
  ];
  const featuredLangs = ["English", "Spanish", "Hindi", "Portuguese", "French", "German", "Arabic", "Urdu", "Indonesian", "Turkish", "Russian", "Bangla", "Italian"];
  for (const lang of featuredLangs) {
    const meta = LANGUAGE_METADATA[lang];
    if (meta) {
      links.push({
        rel: "alternate",
        hreflang: meta.code,
        href: absoluteUrl(languagePath(lang)),
      });
    }
  }
  return links;
}

