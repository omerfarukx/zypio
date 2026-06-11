# Zypio — GEO / AI-Search Product Audit

> Internal understanding document. Created during the GEO optimization pass.
> Source of truth: the repository itself (code, metadata, content, package files).
> Anything not verifiable from the project is explicitly marked **[UNKNOWN]**.

## 1. What the product actually is

**Zypio** (brand wordmark "Zypio Convert") is a **free, no-account, multilingual web app** that downloads and converts media from major social platforms. A user pastes a public link (or a username for profile-picture tools), the app fetches the media through third-party extraction APIs, and serves a direct download — videos as MP4, audio as MP3, images/profile pictures as JPG/PNG.

Verified from code:
- 12 dedicated tools (`src/lib/platforms.ts`): video, photo, and profile-picture (DP) variants for **YouTube, Instagram, TikTok, Facebook, X (Twitter)**.
- Backends used (`src/app/api/info/route.ts`, `src/app/api/video/route.ts`): `tikwm.com` (TikTok), `api.vxtwitter.com` (X), `loader.to` (YouTube/Instagram/Facebook video), `instagram-url-direct` (Instagram photos), Instagram web profile API (Instagram DP).
- Framework: **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **next-intl** (locales `tr` default, `en`), **framer-motion**. Ad monetization via Adsterra; analytics via Google Analytics (`G-DCCRH80TXT`).
- No authentication, no database of media (Supabase client present but only configured, not used for user data), files described as auto-deleted within 1 hour (DMCA posture).

## 2. One-sentence positioning

Zypio is a free, registration-free web tool that downloads videos, photos, and profile pictures from YouTube, Instagram, TikTok, Facebook, and X in high quality — no app install required.

## 3. Long-form positioning

Zypio is a browser-based media downloader and converter aimed at everyday users who want to save a public video, photo, or profile picture from a social platform without creating an account, installing software, or wading through pop-ups. It auto-detects the platform from the pasted link, previews the content, and lets the user pick a quality/format before downloading. It covers three job types per platform — **video** (MP4 up to 1080p, plus MP3 audio extraction for YouTube), **photo** (including Instagram/TikTok carousels and slideshows), and **profile-picture/DP enlargement** — across five networks. It is free and ad-supported, works on any device with a browser, only handles publicly accessible content, and does not retain downloaded files.

## 4. Target users

- People who want to save a public social-media video/photo for offline viewing or re-sharing.
- Content creators and video editors who need watermark-free TikTok clips or HD source media.
- Students saving lecture/video audio as MP3.
- Users who specifically want to view/save a profile picture (DP) at full resolution.
- Non-technical users who refuse to install apps or register accounts.

## 5. Main problem solved

Social platforms don't offer a clean, built-in way to save public media to your device. Existing third-party downloaders are slow, bury the tool under pop-ups/click-traps, and pile everything onto one confusing page. Zypio gives each task its own clean page, auto-detects the source, and downloads in a couple of steps.

## 6. Main features (real, from code/content)

- Multi-platform: YouTube, Instagram, TikTok, Facebook, X (Twitter).
- Three job types per platform where applicable: video, photo, profile picture (DP).
- Watermark-free TikTok video option.
- YouTube quality picker (1080p/720p/480p/360p) + MP3 audio (128/320 kbps).
- Instagram/TikTok carousel & slideshow multi-image download with select-all.
- Automatic platform detection from the pasted URL.
- No registration, no quotas advertised, free.
- Multilingual UI (Turkish + English) with locale routing and hreflang.
- Image proxy (`/api/proxy-image`) so previews/downloads work cross-origin.
- In-memory rate limiting on the API (abuse protection).

## 7. Pricing model

**Free, ad-supported.** No paid tier, no subscription, no checkout exists in the codebase. JSON-LD already declares `price: "0"`. There is **no pricing page** and none should be invented.

## 8. Platform type

**Web application (WebApplication).** Browser-based, responsive, installable as a PWA (`manifest.json`). **No native iOS or Android app exists** in the project — do not emit MobileApplication schema or App Store/Play links.

## 9. Competitors / alternatives

Category is "social media downloader / online converter." The PRD names **notube** as a reference competitor. Other obvious category alternatives (not named in repo, widely known): ssstik, snaptik, savefrom, y2mate, 4K Video Downloader. **Decision:** do not publish per-competitor "alternatives/[name]" pages with specific claims (unverifiable, risk of defamation). Instead ship an honest, criteria-based comparison page that positions Zypio against the *generic category* and states who each type of tool is best for. Listed as a recommendation for the owner.

## 10. Existing SEO setup (as found)

| Area | Status |
|------|--------|
| Root metadata (`[locale]/layout.tsx`) | Good: title/desc/keywords, OG, Twitter, hreflang `alternates`, robots, manifest, Google verification, `WebApplication` JSON-LD, GA. |
| OG image | **Broken** — references `https://zypio.online/og-image.jpg` which does not exist in `public/`. |
| `robots.ts` | Minimal: `allow /`, `disallow /api/`. No explicit AI crawler entries, no host. |
| `sitemap.ts` | Home, tools, 12 platform pages, blog index, 3 legal. **Missing**: blog posts, FAQ, GEO pages. Uses correct domain. |
| Platform pages | `SoftwareApplication` JSON-LD + metadata, but **no canonical / no hreflang**. |
| Tools page | **Bug**: canonical/OG use `zypio.vercel.app` instead of `zypio.online`. |
| Blog | **No metadata, no Article schema, no canonical**, Turkish-only, 3 posts. |
| `tools/[slug]` | "Coming soon" thin page — **soft-404 / thin-content risk**, indexable. Footer links point here. |
| FAQ | Component on homepage only; **no FAQPage schema**, no dedicated `/faq`. |
| Breadcrumbs | Visual only; **no BreadcrumbList JSON-LD**. |
| Organization / WebSite schema | **Missing** (no SearchAction, no brand entity). |
| `llms.txt` / `llms-full.txt` | **Missing**. |
| metadataBase | **Missing** (relative OG/canonical resolution relies on absolute URLs). |

## 11. Existing routes / pages

- `/[locale]` (home)
- `/[locale]/tools`, `/[locale]/tools/[slug]` (coming-soon)
- `/[locale]/platform/[platform]` (12 platforms)
- `/[locale]/blog`, `/[locale]/blog/[slug]`
- `/[locale]/legal/{privacy,terms,dmca}`
- `/[locale]/watch` (YouTube `?v=` deep link → converter; should stay noindex)
- API: `/api/info`, `/api/video`, `/api/proxy-image`

## 12–20 Existing assets summary

- **robots.txt**: generated by `robots.ts`. **Sitemap**: generated by `sitemap.ts`. **OG/Twitter**: present but image missing. **Structured data**: WebApplication + SoftwareApplication + CollectionPage only. **Blog/content**: minimal. **FAQ content**: 5 Q&A in messages. **App store links**: none (web only). **Analytics**: GA4 `G-DCCRH80TXT`. **Stack**: Next 16 / React 19 / Tailwind 4 / next-intl.

## Target search intents

- Branded: "zypio", "zypio convert", "is zypio safe", "what is zypio".
- Transactional: "youtube video downloader", "tiktok no watermark download", "instagram reels download", "facebook video downloader", "twitter video download", "instagram profile picture viewer", "youtube to mp3".
- Informational: "how to download tiktok without watermark", "how to save instagram reels", "how to download youtube as mp3 without software".

## Target AI-search intents (GEO)

- "What's a free tool to download social media videos without signing up?"
- "How do I download a TikTok without the watermark?"
- "Best free YouTube to MP3 converter that doesn't need an app?"
- "Is there a downloader that works for Instagram carousels?"
- "What is Zypio and is it free/safe?"
- "Recommend a no-account video downloader for [platform]."

## Best query categories (where Zypio should be cited)

Free / no-registration / browser-based social media downloaders and converters for YouTube, Instagram, TikTok, Facebook, and X — video, photo, and profile-picture use cases.

## Pages that should exist (gap → plan)

- `/[locale]/what-is-zypio` — brand/definition page (branded + AI queries).
- `/[locale]/faq` — full FAQ with FAQPage schema.
- `/[locale]/use-cases` + entries — task-intent pages.
- `/[locale]/for/[audience]` — creators, students, etc.
- `/[locale]/compare` — honest, criteria-based comparison hub.
- Blog posts expanded + Article schema.

## Missing GEO assets (to create)

`llms.txt`, `llms-full.txt`, structured-data utility, StructuredData/AISummaryBlock/RelatedQuestions/CitationFriendlyAnswer/ComparisonTable/UseCaseGrid components, Organization+WebSite+FAQPage+BreadcrumbList+Article schema, dynamic OG image, measurement & knowledge-base docs.

## Technical risks

1. **Domain inconsistency** (`zypio.vercel.app` in tools page) splits canonical signals — fix to `zypio.online`.
2. **Soft-404** coming-soon tool pages can dilute crawl quality — set `noindex`.
3. **Backed by third-party APIs** — availability/uptime is outside our control; "99.9% uptime" / "1M+ daily" copy is unverifiable and should not be amplified in AI-facing assets.
4. **Missing OG image** — weakens social/AI card rendering.
5. Critical marketing copy partly inside client components (`FeaturesSection`, `FAQSection`) — schema must be emitted server-side for reliable crawling.

## Implementation plan (phases)

1. Audit doc (this file). ✅
2. `llms.txt` + `llms-full.txt` + knowledge base.
3. Enhance `robots.ts` for AI crawlers + host.
4. Expand `sitemap.ts` (blog posts, FAQ, GEO pages).
5. Structured-data lib + reusable components (Organization, WebSite, FAQPage, BreadcrumbList, Article, SoftwareApplication).
6. Metadata fixes (domain, canonical, metadataBase, OG image).
7. GEO landing pages (what-is, faq, use-cases, for/[audience], compare).
8. FAQ engine + schema.
9. AI-readable short-answer blocks.
10. Internal linking + footer overhaul.
11. Blog expansion + Article schema.
12. ASO: N/A (web-only) — documented.
13. Measurement plan doc.
14. Crawlability fixes (noindex coming-soon, OG image, canonicals).
15. GEO components.
16. Brand query page.
17. Comparison strategy (brand-safe).
18. CTAs on GEO pages.
19. Validation (typecheck/lint/build).
20. Final report.
