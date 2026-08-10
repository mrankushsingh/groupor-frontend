# Groupor production launch checklist

## Required before indexing

- Replace the sample records in `src/data/groups.ts` with genuine, public group listings only.
- Store groups in a production database before operating at scale. Required fields are: id, platform, name, invite URL, description, category, country, language, tags, status, verification status, last verified date, source, created date, and updated date.
- Keep only active, useful groups in the sitemap. Mark inactive links `inactive` and remove them from listings and sitemap output.
- Configure the `groupor.link` domain with HTTPS and force one host/canonical URL at the hosting layer.
- Create a real branded `/og-image.png` and 180×180 Apple touch icon before release.

## Google Search Console

1. Verify the domain property for `groupor.link`.
2. Submit `https://groupor.link/sitemap.xml`.
3. Test the home page, category pages, and several group pages with URL Inspection.
4. Monitor Coverage, Page Indexing, and Rich Results; do not bulk-request indexing.

## Google Ads and analytics

The app emits these events through `dataLayer` and `gtag` when Google Tag Manager or Google Ads is configured:

- `join_group_click` — primary conversion
- `search`
- `group_view`
- `group_submission`

Create the Google Ads conversion from `join_group_click`; do not use page views as conversions. Add your Google Tag/Tag Manager snippet through the deployment environment or your consent-managed analytics integration, never by committing credentials.

## Verification and moderation

Use a scheduled, terms-compliant review process for public invite links. Do not bypass WhatsApp security controls. Record a verification timestamp and status. Rate-limit submissions and reports, add duplicate detection by invite code, and protect future admin endpoints with authentication.
