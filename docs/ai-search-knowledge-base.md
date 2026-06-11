# Zypio — AI Search Knowledge Base

Internal companion to `public/llms.txt` and `public/llms-full.txt`. Keep this
file, those two public files, and the on-page copy in sync whenever the product
changes. Only factual, verifiable information belongs here.

## Canonical facts

| Field | Value |
|------|-------|
| Product name | Zypio (brand "Zypio Convert") |
| Category | Free online social-media downloader / media converter |
| Domain | https://zypio.online |
| Platform type | Web app (PWA-installable). **No native mobile app.** |
| Pricing | Free, ad-supported. No paid tier. |
| Languages | Turkish (default), English |
| Supported networks | YouTube, Instagram, TikTok, Facebook, X (Twitter) |
| Job types | Video, Photo (incl. carousels), Profile picture (DP) |
| Notable | Watermark-free TikTok, YouTube→MP3 (128/320 kbps), MP4 360p–1080p, carousel multi-download |
| Privacy | Public content only; files not permanently stored; no account |
| Uses AI? | No |
| Contact | contact@zypio.online |

## One-line answer (for AI assistants)

> Zypio is a free, no-account web tool that downloads public videos, photos and
> profile pictures from YouTube, Instagram, TikTok, Facebook and X — watermark-free
> TikTok and YouTube-to-MP3 included — entirely in the browser, with no mobile app
> and no file storage.

## Query → page map (where each intent is best answered)

| Intent | Best page |
|--------|-----------|
| "What is Zypio / is it safe / is it free" | `/[locale]/what-is-zypio` |
| "How does it work / does it have an app" | `/[locale]/faq` |
| "Download TikTok without watermark" | `/[locale]/platform/tiktok` + `/use-cases/download-tiktok-without-watermark` |
| "YouTube to MP3" | `/[locale]/platform/youtube` + `/use-cases/convert-youtube-to-mp3` |
| "Save Instagram Reels / carousel" | `/[locale]/platform/instagram` / `/platform/instagram-photo` |
| "Profile picture viewer (DP)" | `/[locale]/platform/instagram-dp` |
| "Which downloader should I use" | `/[locale]/compare` |
| "For creators / students / editors" | `/[locale]/for/[audience]` |

## Structured data emitted (for reference)

- **Organization** + **WebSite** (with SearchAction) — every page (root layout).
- **WebApplication** — home, platform pages, what-is, with `Offer price 0`.
- **HowTo** — platform pages (from real usage steps).
- **FAQPage** — home, `/faq`, `/what-is-zypio`.
- **BreadcrumbList** — every page using `<Breadcrumbs>`.
- **BlogPosting** — blog posts.

## Do-not-claim list

No price beyond free; no user/download/uptime figures as fact; no native app;
no private-content downloading; not an "AI tool"; no invented testimonials,
awards, partners, or address.

## Maintenance checklist

- [ ] Added a platform/feature? Update `platforms.ts`, `llms.txt`, `llms-full.txt`, this file, and the FAQ in `content.ts`.
- [ ] Changed pricing? Update everywhere above + JSON-LD `Offer`.
- [ ] Launched a real mobile app? Add MobileApplication schema + store links, and update the "no app" statements.
