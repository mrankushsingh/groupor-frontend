/**
 * Groupor Content Moderation & SafeSearch Protection
 * Filters spam, leaks, and harmful UGC while allowing moderated 18+ adult
 * communities on dedicated adult routes with proper age/rating SEO tags.
 */

export const ILLEGAL_PATTERNS: RegExp[] = [
  // Phone numbers in group titles (common spam marker)
  /\b03\d{9}\b/,
  /\b\+?[1-9]\d{1,2}[-\s]?\d{10}\b/,
  // Phishing / Illegal / Dumps / Hacking / Non-consensual Leaks
  /\b(carding|dumps|bin\s*bypass|otp\s*bot|hacking\s*tool|leak\s*data|mega\s*files?|mega\s*links?)\b/i,
  // Child exploitation / CSAM zero-tolerance
  /\b(csam|cp\b|child\s*porn|pedophil|underage|teen\s*porn)/i,
];

export const ADULT_PATTERNS: RegExp[] = [
  // Explicit adult / porn / erotic keywords
  /\b(porn|xxx|nude|nudes|sexy|sex|nsfw|erotic|hentai|boobs|penis|vagina|escort|call\s*girl|onlyfans|bhabhi|aunty\s*💦)\b/i,
  // Arabic adult keywords
  /(سكس|نودز|شرموطة|قحبة|نيك|افلام\s*سكس|طيز|مولع\s*نار)/i,
];

export function isIllegalContent(text?: string | null): boolean {
  if (!text) return false;
  for (const pattern of ILLEGAL_PATTERNS) {
    if (pattern.test(text)) {
      return true;
    }
  }
  return false;
}

export function isAdultContent(text?: string | null): boolean {
  if (!text) return false;
  for (const pattern of ADULT_PATTERNS) {
    if (pattern.test(text)) {
      return true;
    }
  }
  return false;
}

export function isSafeContent(text?: string | null): boolean {
  if (!text) return true;
  if (isIllegalContent(text)) return false;
  if (isAdultContent(text)) return false;
  return true;
}

export function isSafeGroupForPublicFeed(
  group: { name?: string; description?: string; category?: string; tags?: string[] },
  allowAdult = false
): boolean {
  if (!group) return false;

  // Never allow illegal, hacking, phishing, or non-consensual leak content anywhere
  if (isIllegalContent(group.name)) return false;
  if (isIllegalContent(group.description)) return false;
  if (Array.isArray(group.tags)) {
    for (const tag of group.tags) {
      if (isIllegalContent(tag)) return false;
    }
  }

  const isAdultCategory = group.category?.toLowerCase() === "adult";
  const hasAdultWords =
    isAdultContent(group.name) ||
    isAdultContent(group.description) ||
    (Array.isArray(group.tags) && group.tags.some((tag) => isAdultContent(tag)));

  // If adult content is NOT allowed (e.g. general feeds/homepage without adult filter):
  if (!allowAdult) {
    if (isAdultCategory || hasAdultWords) {
      return false;
    }
  }

  return true;
}

