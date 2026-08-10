/**
 * Railway FastAPI base URL for the Vercel frontend.
 * Example: https://groupor-api.up.railway.app
 * Leave empty in local TanStack-only mode.
 */
export function apiBaseUrl() {
  const raw = (import.meta.env["VITE_API_URL"] as string | undefined) ?? "";
  return raw.replace(/\/$/, "");
}

export function apiUrl(path: string) {
  const base = apiBaseUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function hasRemoteApi() {
  return Boolean(apiBaseUrl());
}
