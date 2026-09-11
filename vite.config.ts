// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Pin Nitro to Vercel for production frontend deploys.
  // Lovable sandbox builds still force Cloudflare internally.
  nitro: {
    preset: "vercel",
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
    routeRules: {
      "/assets/**": { headers: { "cache-control": "public, max-age=31536000, immutable" } },
      "/*.png": { headers: { "cache-control": "public, max-age=31536000, immutable" } },
      "/*.jpg": { headers: { "cache-control": "public, max-age=31536000, immutable" } },
      "/*.webp": { headers: { "cache-control": "public, max-age=31536000, immutable" } },
      "/*.svg": { headers: { "cache-control": "public, max-age=31536000, immutable" } },
      "/*.ico": { headers: { "cache-control": "public, max-age=31536000, immutable" } },
      "/api/**": { headers: { "cache-control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600" } },
      "/": { headers: { "cache-control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400" } },
      "/group/**": { headers: { "cache-control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400" } },
      "/category/**": { headers: { "cache-control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400" } },
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
