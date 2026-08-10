export type Group = {
  id: string;
  name: string;
  description: string;
  platform: "whatsapp" | "telegram" | "discord";
  category: string;
  members: number;
  country: string;
  countryCode?: string;
  language?: string;
  link: string;
  tags?: string[];
  status?: "active" | "needs_verification" | "inactive";
  lastVerifiedAt?: string;
  source?: "editorial" | "user_submission";
  createdAt?: string;
  /** Group icon fetched from the WhatsApp invite page. */
  image?: string;
};

/**
 * Normalises any stored invite value into WhatsApp's canonical invite URL,
 * e.g. "chat.whatsapp.com/ABC" -> "https://chat.whatsapp.com/ABC".
 * Returns "" when no invite code is present, so callers can hide the button.
 */
export function joinUrl(link: string): string {
  const value = (link ?? "").trim().replace(/\s+/g, "");
  if (!value) return "";
  const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  let url: URL;
  try {
    url = new URL(withScheme);
  } catch {
    return "";
  }
  const host = url.hostname.replace(/^www\./, "").toLowerCase();
  if (host !== "chat.whatsapp.com") return "";
  const match = url.pathname.match(/(?:\/invite)?\/([A-Za-z0-9_-]+)\/?$/);
  const code = match?.[1];
  if (!code || code.toLowerCase() === "invite") return "";
  return `https://chat.whatsapp.com/${code}`;
}

/**
 * Returns the join URL and target for a group link.
 * Uses WhatsApp's `/invite/CODE` form and opens it in a new tab.
 */
export function joinHref(link: string): { url: string; target: "_blank" | "_self" } {
  const canonical = joinUrl(link);
  if (!canonical) return { url: "", target: "_blank" };
  const code = canonical.split("/").pop();
  if (!code) return { url: "", target: "_blank" };
  return { url: `https://chat.whatsapp.com/invite/${code}`, target: "_blank" };
}






export const categories = [
  { slug: "all", name: "All Groups" },
  { slug: "adult", name: "Adult/18+/Hot" },
  { slug: "art-design-photography", name: "Art/Design/Photography" },
  { slug: "auto-vehicle", name: "Auto/Vehicle" },
  { slug: "business-advertising-marketing", name: "Business/Advertising/Marketing" },
  { slug: "comedy-funny", name: "Comedy/Funny" },
  { slug: "dating-flirting-chatting", name: "Dating/Flirting/Chatting" },
  { slug: "education-school", name: "Education/School" },
  { slug: "entertainment-masti", name: "Entertainment/Masti" },
  { slug: "family-relationships", name: "Family/Relationships" },
  { slug: "fan-club-celebrities", name: "Fan Club/Celebrities" },
  { slug: "fashion-style-clothing", name: "Fashion/Style/Clothing" },
  { slug: "film-animation", name: "Film/Animation" },
  { slug: "food-drinks", name: "Food/Drinks" },
  { slug: "gaming-apps", name: "Gaming/Apps" },
  { slug: "health-beauty-fitness", name: "Health/Beauty/Fitness" },
  { slug: "jobs-career", name: "Jobs/Career" },
  { slug: "money-earning", name: "Money/Earning" },
  { slug: "music-audio-songs", name: "Music/Audio/Songs" },
  { slug: "news-magazines-politics", name: "News/Magazines/Politics" },
  { slug: "pets-animals-nature", name: "Pets/Animals/Nature" },
  { slug: "roleplay-comics", name: "Roleplay/Comics" },
  { slug: "science-technology", name: "Science/Technology" },
  { slug: "shopping-buy-sell", name: "Shopping/Buy/Sell" },
  { slug: "social-friendship-community", name: "Social/Friendship/Community" },
  { slug: "spiritual-devotional", name: "Spiritual/Devotional" },
  { slug: "sports-games", name: "Sports/Games" },
  { slug: "thoughts-quotes-jokes", name: "Thoughts/Quotes/Jokes" },
  { slug: "travel-local-place", name: "Travel/Local/Place" },
] as const;

export const countries = [
  { code: "", name: "Any Country" },
  { code: "DZ", name: "Algeria" },
  { code: "AR", name: "Argentina" },
  { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BH", name: "Bahrain" },
  { code: "BD", name: "Bangladesh" },
  { code: "BY", name: "Belarus" },
  { code: "BE", name: "Belgium" },
  { code: "BO", name: "Bolivia" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BR", name: "Brazil" },
  { code: "BG", name: "Bulgaria" },
  { code: "CA", name: "Canada" },
  { code: "CL", name: "Chile" },
  { code: "CN", name: "China" },
  { code: "CO", name: "Colombia" },
  { code: "HR", name: "Croatia" },
  { code: "CZ", name: "Czechia" },
  { code: "DK", name: "Denmark" },
  { code: "EG", name: "Egypt" },
  { code: "EE", name: "Estonia" },
  { code: "ET", name: "Ethiopia" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "GE", name: "Georgia" },
  { code: "DE", name: "Germany" },
  { code: "GH", name: "Ghana" },
  { code: "GR", name: "Greece" },
  { code: "HK", name: "Hong Kong" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "IQ", name: "Iraq" },
  { code: "IE", name: "Ireland" },
  { code: "IL", name: "Israel" },
  { code: "IT", name: "Italy" },
  { code: "JM", name: "Jamaica" },
  { code: "JP", name: "Japan" },
  { code: "JO", name: "Jordan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "KE", name: "Kenya" },
  { code: "KW", name: "Kuwait" },
  { code: "LV", name: "Latvia" },
  { code: "LB", name: "Lebanon" },
  { code: "LY", name: "Libya" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MK", name: "Macedonia" },
  { code: "MW", name: "Malawi" },
  { code: "MY", name: "Malaysia" },
  { code: "MX", name: "Mexico" },
  { code: "ME", name: "Montenegro" },
  { code: "MA", name: "Morocco" },
  { code: "MZ", name: "Mozambique" },
  { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands" },
  { code: "NZ", name: "New Zealand" },
  { code: "NG", name: "Nigeria" },
  { code: "NO", name: "Norway" },
  { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" },
  { code: "PA", name: "Panama" },
  { code: "PE", name: "Peru" },
  { code: "PH", name: "Philippines" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "PR", name: "Puerto Rico" },
  { code: "QA", name: "Qatar" },
  { code: "RO", name: "Romania" },
  { code: "RU", name: "Russia" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SN", name: "Senegal" },
  { code: "RS", name: "Serbia" },
  { code: "SG", name: "Singapore" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "ZA", name: "South Africa" },
  { code: "KR", name: "South Korea" },
  { code: "ES", name: "Spain" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "TW", name: "Taiwan" },
  { code: "TZ", name: "Tanzania" },
  { code: "TH", name: "Thailand" },
  { code: "TG", name: "Togo" },
  { code: "TN", name: "Tunisia" },
  { code: "TR", name: "Turkey" },
  { code: "UG", name: "Uganda" },
  { code: "UA", name: "Ukraine" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "VE", name: "Venezuela" },
  { code: "VN", name: "Vietnam" },
  { code: "YE", name: "Yemen" },
  { code: "ZW", name: "Zimbabwe" },
] as const;

export const languages = [
  "Any Language",
  "Afrikaans","Albanian","Amharic","Arabic","Armenian","Azerbaijani","Bangla","Basque",
  "Belarusian","Bosnian","Bulgarian","Catalan","Chinese","Croatian","Czech","Danish",
  "Dutch","English","Estonian","Filipino","Finnish","French","Galician","Georgian",
  "German","Greek","Gujarati","Hebrew","Hindi","Hungarian","Icelandic","Indonesian",
  "Italian","Japanese","Kannada","Kazakh","Khmer","Korean","Kyrgyz","Lao","Latvian",
  "Lithuanian","Macedonian","Malay","Malayalam","Marathi","Mongolian","Myanmar","Nepali",
  "Norwegian","Persian","Polish","Portuguese","Punjabi","Romanian","Russian","Serbian",
  "Sinhala","Slovak","Slovenian","Spanish","Swahili","Swedish","Tamil","Telugu","Thai",
  "Turkish","Ukrainian","Urdu","Uzbek","Vietnamese","Zulu",
] as const;

export const groups: Group[] = [];

export function formatMembers(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K` : `${n}`;
}

export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
}

/** Unique, SEO-friendly slug for a group: name + short id suffix to guarantee uniqueness. */
export function groupSlug(group: Pick<Group, "id" | "name">) {
  const base = slugify(group.name) || "group";
  return `${base}-${group.id}`;
}

/** The WhatsApp invite code for a group link, or "" when the link is invalid. */
export function inviteCodeOf(link: string): string {
  const canonical = joinUrl(link);
  return canonical ? (canonical.split("/").pop() ?? "") : "";
}

/** Canonical public URL of a group page: /group/invite/whatsapp/<code>. */
export function groupPath(group: Pick<Group, "id" | "name" | "category" | "link">) {
  const code = inviteCodeOf(group.link);
  return code
    ? `/group/invite/whatsapp/${code}`
    : `/category/${group.category}/${groupSlug(group)}`;
}

export function findGroupByCode(code: string) {
  return groups.find((g) => inviteCodeOf(g.link) === code);
}

export function findGroupBySlug(category: string, slug: string) {
  return groups.find((g) => g.category === category && groupSlug(g) === slug);
}
