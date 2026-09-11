/**
 * Optimizes external image URLs (e.g. WhatsApp avatars from pps.whatsapp.net or static.whatsapp.net)
 * by proxying through wsrv.nl (Cloudflare Edge Image Service) to resize to target display dimensions,
 * compress, and convert to modern WebP format.
 * Reduces image payloads by 95%+ (from ~90KB down to ~3KB per avatar).
 */
export function optimizeImageUrl(
  url?: string | null,
  options?: { width?: number; height?: number; quality?: number }
): string {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  if (!trimmed) return "";

  // If already a local relative path or data URL, return as is
  if (trimmed.startsWith("/") || trimmed.startsWith("data:")) {
    return trimmed;
  }

  // Target dimensions (defaults to 64x64 for 56px display)
  const w = options?.width ?? 64;
  const h = options?.height ?? 64;
  const q = options?.quality ?? 70;

  // Use wsrv.nl CDN (Cloudflare Edge) for fast WebP conversion & resizing
  return `https://wsrv.nl/?url=${encodeURIComponent(trimmed)}&w=${w}&h=${h}&fit=cover&output=webp&q=${q}`;
}
