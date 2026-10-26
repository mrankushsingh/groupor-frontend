/**
 * Groupor Content Moderation & SafeSearch Protection
 * Filters spam, explicit adult terms, leak files, and harmful UGC
 * to safeguard domain SEO health and comply with Google Search Essentials.
 */

const BANNED_PATTERNS: RegExp[] = [
  // Explicit adult / porn / erotic keywords
  /\b(porn|xxx|nude|nudes|sexy|sex|nsfw|erotic|hentai|boobs|penis|vagina|escort|call\s*girl|onlyfans|leak\s*data|mega\s*files?|mega\s*links?|bhabhi|aunty\s*💦)\b/i,
  // Arabic adult keywords
  /(سكس|نودز|شرموطة|قحبة|نيك|افلام\s*سكس|طيز|مولع\s*نار)/i,
  // Phone numbers in group titles (common spam marker)
  /\b03\d{9}\b/,
  /\b\+?[1-9]\d{1,2}[-\s]?\d{10}\b/,
  // Phishing / Illegal
  /\b(carding|dumps|bin\s*bypass|otp\s*bot|hacking\s*tool)\b/i,
];

export function isSafeContent(text?: string | null): boolean {
  if (!text) return true;
  for (const pattern of BANNED_PATTERNS) {
    if (pattern.test(text)) {
      return false;
    }
  }
  return true;
}

export function isSafeGroupForPublicFeed(
  group: { name?: string; description?: string; category?: string; tags?: string[] },
  allowAdult = false
): boolean {
  if (!group) return false;

  // Never show adult category on general feeds unless explicitly requested
  if (!allowAdult && group.category?.toLowerCase() === "adult") {
    return false;
  }

  // Check group name and description
  if (!isSafeContent(group.name)) return false;
  if (!isSafeContent(group.description)) return false;

  // Check tags
  if (Array.isArray(group.tags)) {
    for (const tag of group.tags) {
      if (!isSafeContent(tag)) return false;
    }
  }

  return true;
}
