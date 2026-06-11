# Zypio — GEO / AI-Search Measurement Plan

How to measure traffic and conversions coming from AI answer engines. The site
already loads **Google Analytics 4** (`G-DCCRH80TXT`) in `app/[locale]/layout.tsx`.

## 1. AI referrers to watch

Track sessions whose referrer/source contains any of these hosts:

- `chatgpt.com`, `chat.openai.com` (ChatGPT / ChatGPT Search)
- `perplexity.ai`
- `claude.ai`
- `gemini.google.com`, `bard.google.com`
- `copilot.microsoft.com`, `bing.com/chat`
- `poe.com`
- `you.com`
- `phind.com`

Note: Google **AI Overviews** traffic generally still arrives under `google /
organic` (no distinct referrer), so treat organic search lift on the GEO pages
as a proxy for AI Overview citations.

## 2. GA4 setup

### A. Mark AI engines as a channel
Admin → Data settings → Channel groups → create a custom group "AI Search" that
matches `Session source` against the hosts above (regex):

```
chatgpt|openai|perplexity|claude\.ai|gemini|bard|copilot|bing\.com/chat|poe\.com|you\.com|phind
```

### B. Recommended GA4 Exploration (Free-form)
- **Dimensions:** Session source / medium, Page referrer, Landing page, Country, Language.
- **Metrics:** Sessions, Engaged sessions, Engagement rate, Conversions.
- **Filter:** Page referrer matches the regex above, OR Session source = the custom "AI Search" channel.
- **Breakdown:** Landing page — to see which GEO pages (`/what-is-zypio`, `/faq`, `/use-cases/*`, `/platform/*`) get cited.

### C. Conversion / key events
There is no signup or checkout (the product is free, no-auth). Define product-fit
key events instead, e.g.:
- `analyze_click` — user submits a URL ("Analyze Et").
- `download_start` — a download is triggered.
- `tool_view` — a `/platform/*` page view.

Add these via `gtag('event', ...)` in `ConverterForm` (analyze + download handlers)
so AI-sourced sessions can be tied to real intent. Until then, use Engaged
sessions on GEO landing pages as the proxy KPI.

### D. UTM hygiene
When sharing GEO pages manually (Reddit, X, LinkedIn), tag links:
`?utm_source=reddit&utm_medium=social&utm_campaign=geo`. Do **not** rely on UTMs
for AI engines (they strip them); use referrer-based detection there.

## 3. Server / bot-visit inspection

If you have access to server or CDN (Vercel) logs, filter request user-agents for
AI crawlers to confirm they are fetching pages and `llms.txt`:

```
GPTBot|OAI-SearchBot|ChatGPT-User|ClaudeBot|Claude-User|Claude-SearchBot|PerplexityBot|Perplexity-User|Google-Extended|Bingbot|CCBot|Applebot-Extended
```

Confirm 200s on: `/`, `/en/what-is-zypio`, `/en/faq`, `/sitemap.xml`,
`/robots.txt`, `/llms.txt`, `/llms-full.txt`.

## 4. KPIs

- AI-referred sessions / month (trend up).
- Engaged sessions on `/what-is-zypio`, `/faq`, `/compare`, `/use-cases/*`.
- Organic impressions/clicks on branded ("zypio") and category queries (Search Console).
- Crawl hits from AI bots on `llms.txt` and key pages.

## 5. Search Console / Bing checks

- Verify the property, submit `https://zypio.online/sitemap.xml`.
- Watch "Pages" coverage for the new GEO routes getting indexed.
- Use URL Inspection to request indexing for `/en/what-is-zypio`, `/tr/what-is-zypio`, `/en/faq`, `/tr/faq`.
