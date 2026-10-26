# Groupor Frontend — High-Performance WhatsApp Group Directory

[![Live Website](https://img.shields.io/badge/Live%20Site-groupor.link-17D292?style=flat-square)](https://www.groupor.link/)
[![Framework](https://img.shields.io/badge/Framework-TanStack%20Start-blue?style=flat-square)](https://tanstack.com/start)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=flat-square)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

Groupor Frontend is a high-performance, server-side rendered (SSR) web directory built for discovering, submitting, and categorizing verified public WhatsApp communities across 180+ countries and 28 topics.

Designed for speed, crawlability, and modern search engine optimization (SEO), the frontend is built using **TanStack Start**, **TanStack Router**, **React 19**, **Tailwind CSS v4**, and **Nitro Server Engine**, deployed seamlessly to Vercel.

---

## Key Features

- **Blazing-Fast SSR**: Pre-rendered HTML delivery powered by Nitro and TanStack Start for lightning-fast First Contentful Paint (FCP).
- **Comprehensive SEO Architecture**:
  - Semantic HTML5 heading hierarchies and structured metadata.
  - Automated XML sitemaps (`/sitemap.xml`) styled with XSLT for human and crawler readability.
  - Open Graph and Twitter Card dynamic preview tags.
  - Schema.org JSON-LD structured data (`WebSite`, `Organization`, `BreadcrumbList`, `CollectionPage`).
  - Native AI Engine Optimization (`llms.txt` and `llms-full.txt` support).
- **Trust & SafeSearch Filtering**: Automated content screening that isolates adult categories and filters spam/NSFW submissions.
- **Granular Taxonomy**: Filter and discover communities across 28 categories, 180+ country hubs, and 20+ spoken languages.
- **Interactive Community Submission**: Simple client-side submission pipeline with live metadata previews and duplicate link prevention.

---

## Architecture Overview

```
groupor-frontend/
├── public/                 # Static assets, robots.txt, sitemap.xsl, llms.txt
├── src/
│   ├── components/         # Reusable UI components (GroupCard, Navigation, etc.)
│   ├── data/               # Country, language, and category taxonomy definitions
│   ├── hooks/              # Custom React hooks (search, media queries, etc.)
│   ├── lib/                # SEO utilities, moderation filters, API helpers
│   ├── routes/             # TanStack file-based SSR routes
│   │   ├── __root.tsx      # Root HTML shell, global JSON-LD Organization schema
│   │   ├── index.tsx       # Homepage directory feed and search interface
│   │   ├── sitemap[.]xml.ts# Dynamic programmatic XML sitemap endpoint
│   │   └── group.*.tsx     # Dynamic category and country landing pages
│   └── styles.css          # Tailwind CSS design system tokens
├── vercel.json             # Security headers, rewrites, and caching directives
└── vite.config.ts          # Vite bundling and TanStack start configuration
```

---

## Quickstart & Local Development

### Prerequisites

- **Node.js**: `v20.x` or higher
- **Package Manager**: `npm` (or `bun` / `pnpm`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mrankushsingh/groupor-frontend.git
   cd groupor-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the project root:
   ```env
   VITE_SITE_URL=https://www.groupor.link
   VITE_API_URL=https://groupor-backend.railway.internal
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production:**
   ```bash
   npm run build
   ```

6. **Preview the production bundle:**
   ```bash
   npm run preview
   ```

---

## Contributing

We welcome contributions from the open-source community! Please review our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before opening pull requests.

---

## License

This project is licensed under the [MIT License](LICENSE).
