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
  const value = (link ?? "").trim().replace(/\s+/g, "");
  if (!value) return { url: "", target: "_blank" };
  const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  const canonical = joinUrl(withScheme);
  if (!canonical) return { url: "", target: "_blank" };
  const finalUrl = /^https:\/\/chat\.whatsapp\.com\//i.test(withScheme) ? withScheme : canonical;
  return { url: finalUrl, target: "_blank" };
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

export const groups: Group[] = [
  {
    id: "g1",
    name: "Global Tech & Software Developers",
    description: "Connect with software engineers, frontend/backend developers, and AI enthusiasts. Discuss web development, open-source projects, code reviews, and tech career growth.",
    platform: "whatsapp",
    category: "science-technology",
    members: 940,
    country: "United States",
    countryCode: "US",
    language: "English",
    link: "https://chat.whatsapp.com/B1xTechDevsHub2026Global",
    tags: ["tech", "coding", "software", "python", "javascript"],
    status: "active",
    source: "editorial",
    createdAt: "2026-09-01T10:00:00Z",
  },
  {
    id: "g2",
    name: "Global Jobs & Career Alerts 2026",
    description: "Daily verified job openings, remote work opportunities, resume writing tips, and interview guidance for job seekers globally.",
    platform: "whatsapp",
    category: "jobs-career",
    members: 1020,
    country: "India",
    countryCode: "IN",
    language: "English",
    link: "https://chat.whatsapp.com/C2yJobsCareerAlerts2026",
    tags: ["jobs", "career", "hiring", "remote", "internships"],
    status: "active",
    source: "editorial",
    createdAt: "2026-09-02T11:00:00Z",
  },
  {
    id: "g3",
    name: "Digital Marketing & SEO Growth Hub",
    description: "Learn cutting-edge SEO tactics, PPC advertising, social media strategy, content marketing, and affiliate growth strategies from industry experts.",
    platform: "whatsapp",
    category: "business-advertising-marketing",
    members: 850,
    country: "United Kingdom",
    countryCode: "GB",
    language: "English",
    link: "https://chat.whatsapp.com/D3zMarketingSeoGrowth2026",
    tags: ["marketing", "seo", "business", "growth", "advertising"],
    status: "active",
    source: "editorial",
    createdAt: "2026-09-03T12:00:00Z",
  },
  {
    id: "g4",
    name: "Python & AI Data Science Academy",
    description: "Collaborative study group for machine learning algorithms, deep learning frameworks, Python automation scripts, and Dataform/BigQuery analytics.",
    platform: "whatsapp",
    category: "education-school",
    members: 780,
    country: "Canada",
    countryCode: "CA",
    language: "English",
    link: "https://chat.whatsapp.com/E4xPythonAiDataAcademy2026",
    tags: ["python", "ai", "datascience", "education", "study"],
    status: "active",
    source: "editorial",
    createdAt: "2026-09-04T13:00:00Z",
  },
  {
    id: "g5",
    name: "Global Gaming & Esports Clan",
    description: "Find teammates for PC, console, and mobile games. Discuss gaming setups, stream schedules, tournament brackets, and live esports events.",
    platform: "whatsapp",
    category: "gaming-apps",
    members: 910,
    country: "Australia",
    countryCode: "AU",
    language: "English",
    link: "https://chat.whatsapp.com/F5yGamingEsportsClan2026",
    tags: ["gaming", "esports", "streamers", "mobilegames", "clans"],
    status: "active",
    source: "editorial",
    createdAt: "2026-09-05T14:00:00Z",
  },
  {
    id: "g6",
    name: "Crypto, Trading & Finance Insights",
    description: "Market analysis, macroeconomic trends, crypto technical analysis, and personal finance discussions. Educational community for financial literacy.",
    platform: "whatsapp",
    category: "money-earning",
    members: 880,
    country: "United Arab Emirates",
    countryCode: "AE",
    language: "English",
    link: "https://chat.whatsapp.com/G6zCryptoFinanceInsights2026",
    tags: ["finance", "crypto", "trading", "stocks", "investing"],
    status: "active",
    source: "editorial",
    createdAt: "2026-09-06T15:00:00Z",
  },
  {
    id: "g7",
    name: "World Backpackers & Travel Adventurers",
    description: "Share budget travel itineraries, hotel reviews, flight deals, visa advice, and destination recommendations with global travelers.",
    platform: "whatsapp",
    category: "travel-local-place",
    members: 690,
    country: "Germany",
    countryCode: "DE",
    language: "English",
    link: "https://chat.whatsapp.com/H7xTravelBackpackers2026",
    tags: ["travel", "backpacking", "tourism", "adventure", "hotels"],
    status: "active",
    source: "editorial",
    createdAt: "2026-09-07T16:00:00Z",
  },
  {
    id: "g8",
    name: "Daily Fitness, Calisthenics & Gym Motivation",
    description: "Daily workout routines, nutrition advice, bodybuilding progress tracking, and fitness motivation for athletes and beginners.",
    platform: "whatsapp",
    category: "health-beauty-fitness",
    members: 740,
    country: "Brazil",
    countryCode: "BR",
    language: "English",
    link: "https://chat.whatsapp.com/I8yFitnessGymMotivation2026",
    tags: ["fitness", "workout", "gym", "health", "nutrition"],
    status: "active",
    source: "editorial",
    createdAt: "2026-09-08T17:00:00Z",
  },
  {
    id: "g9",
    name: "Cinema Buffs & Web Series Club",
    description: "In-depth reviews of latest blockbuster movies, indie cinema, streaming series, recommendations, and film production discussions.",
    platform: "whatsapp",
    category: "film-animation",
    members: 620,
    country: "France",
    countryCode: "FR",
    language: "English",
    link: "https://chat.whatsapp.com/J9zCinemaFilmBuffs2026",
    tags: ["movies", "cinema", "series", "reviews", "hollywood"],
    status: "active",
    source: "editorial",
    createdAt: "2026-09-09T18:00:00Z",
  },
  {
    id: "g10",
    name: "English Conversation & Language Exchange",
    description: "Practice spoken English, improve grammar, expand vocabulary, and exchange native languages with international language learners.",
    platform: "whatsapp",
    category: "education-school",
    members: 990,
    country: "Spain",
    countryCode: "ES",
    language: "English",
    link: "https://chat.whatsapp.com/K10xEnglishLanguageEx2026",
    tags: ["english", "language", "learning", "speaking", "esl"],
    status: "active",
    source: "editorial",
    createdAt: "2026-09-10T09:00:00Z",
  },
  {
    id: "g11",
    name: "Supercars, Tuning & Motorsport Enthusiasts",
    description: "Discuss automotive engineering, high-performance car tuning, Formula 1 racing, track days, and classic car restorations.",
    platform: "whatsapp",
    category: "auto-vehicle",
    members: 580,
    country: "Japan",
    countryCode: "JP",
    language: "English",
    link: "https://chat.whatsapp.com/L11ySupercarsMotorsport2026",
    tags: ["cars", "tuning", "f1", "motorsport", "auto"],
    status: "active",
    source: "editorial",
    createdAt: "2026-09-10T10:00:00Z",
  },
  {
    id: "g12",
    name: "Singles Social Chat & Friendship Lounge",
    description: "Relaxed social community for making new friends, dating talk, lighthearted banter, and meeting singles in a respectful atmosphere.",
    platform: "whatsapp",
    category: "dating-flirting-chatting",
    members: 830,
    country: "Nigeria",
    countryCode: "NG",
    language: "English",
    link: "https://chat.whatsapp.com/M12zSinglesDatingSocial2026",
    tags: ["dating", "singles", "chat", "friends", "social"],
    status: "active",
    source: "editorial",
    createdAt: "2026-09-10T11:00:00Z",
  },
];

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
  const norm = (code ?? "").trim().toLowerCase();
  if (!norm) return undefined;
  return groups.find((g) => inviteCodeOf(g.link).toLowerCase() === norm);
}

export function findGroupBySlug(category: string, slug: string) {
  return groups.find((g) => g.category === category && groupSlug(g) === slug);
}

export function getGroupOrderKey(g: Group): number {
  if (g.createdAt) {
    const time = new Date(g.createdAt).getTime();
    if (!Number.isNaN(time)) return time;
  }
  const digits = g.id.replace(/\D/g, "");
  if (digits) {
    const val = Number(digits);
    if (!Number.isNaN(val)) return val;
  }
  return 0;
}

/**
 * Guarantees a 100% deterministic, stable group order across SSR and client renders.
 * Newest creation date / largest numeric ID comes first.
 */
export function sortGroups(list: Group[]): Group[] {
  return [...list].sort((a, b) => {
    const keyDiff = getGroupOrderKey(b) - getGroupOrderKey(a);
    if (keyDiff !== 0) return keyDiff;
    return a.id.localeCompare(b.id);
  });
}
