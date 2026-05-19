# Google Launch Playbook (Ads + SEO + GEO)

This is a practical plan for launching `crypticcinema.com` with monetization and search visibility as first-class goals.

## 1) Monetization readiness (AdSense)

### Must-haves before applying

- Original, useful, and navigable content across the site.
- Public pages for `About`, `Contact`, and `Privacy Policy`.
- Stable information architecture (clear categories, title pages, and internal links).
- No policy-violating ad behavior (no incentivized clicks, no misleading placement).

### Technical tasks

- Add AdSense script in the frontend shell (head/layout).
- Publish `ads.txt` at `https://crypticcinema.com/ads.txt` with your publisher ID.
- Ensure the production domain is reachable without auth blocks during site review.
- Add consent handling for privacy regulations (US states/EEA where required).

### Revenue protection

- Keep ad density moderate, especially above the fold on mobile.
- Separate ad blocks visually from core content.
- Avoid clickbait UI around ads.

## 2) Google Cloud target architecture

## Backend (this repo)

- Deploy API container to **Cloud Run**.
- Use **Cloud SQL (PostgreSQL)** instead of SQLite for production.
- Store secrets/env vars in Cloud Run service configuration.
- Restrict CORS to the production frontend origin(s).

## Frontend (your build)

- Host on Firebase Hosting or Cloud Run behind an external load balancer.
- Attach custom domain `crypticcinema.com`.
- Enable HTTPS and CDN caching.

## Minimum production env vars

- `CRYPTIC_DATABASE_URL`
- `CRYPTIC_JWT_SECRET_KEY`
- `CRYPTIC_CORS_ORIGINS`
- `CRYPTIC_ENV=prod`

## 3) SEO priorities

- Use canonical, slug-based URLs for titles/collections.
- Generate XML sitemap(s) and keep them fresh.
- Keep `robots.txt` conservative: block only non-public/duplicate paths.
- Implement schema.org structured data (at least `Movie` where applicable).
- Optimize Core Web Vitals and mobile UX.
- Keep ad experience from interfering with primary content.

## 4) GEO priorities (AI search visibility)

- Treat GEO as **SEO + content quality + snippet eligibility**.
- Keep pages indexable and snippet-eligible (unless intentionally restricted).
- Publish trustworthy editorial context (why a title matters, references, provenance).
- Use clear headings, concise summaries, and entity-rich metadata for pages.
- Track discovery and engagement in Search Console + Analytics.

## 5) Backend implications for this roadmap

- Auth is now in place for user-specific state (`/v1/auth/*`, `/v1/me/title-states/*`).
- Slug lookup endpoints are in place for SEO-friendly frontend routing:
  - `GET /v1/titles/by-slug/{slug}`
  - `GET /v1/collections/by-slug/{slug}`
- Next backend additions recommended:
  - Public sitemap feed endpoint for frontend/static generation workflows.
  - Optional editorial metadata fields (source links, publish/update timestamps, author).
  - Rate limiting + bot abuse controls before scaling traffic.
