# ASO / App Store Copy — Not Applicable (Web-Only)

**Status: SKIPPED — no native app exists in this project.**

Zypio is a **web application** (Next.js, browser-based). There is no iOS or
Android app, no App Store / Google Play listing, and no app-store metadata files
in the repository. Per the GEO brief, ASO copy is therefore not produced (writing
App Store descriptions for a non-existent app would be fabrication).

## What exists instead: PWA

The app ships a web manifest (`public/manifest.json`) so users can "Add to Home
Screen" and run Zypio like an app. Relevant fields already set:

- `name`: "Zypio Convert"
- `short_name`: "Zypio"
- `description`: "Free Video and File Converter"
- `display`: standalone, theme/background colors set.

### Optional improvement (PWA, not ASO)
- `manifest.json` references `/icon.png` at 192/512. The project currently serves
  icons via the dynamic `app/icon.tsx` route (32×32). To make the PWA install icon
  crisp, add real `192×192` and `512×512` PNGs to `public/` (e.g. `icon-192.png`,
  `icon-512.png`) and point the manifest at them. This is a manual asset task for
  the owner.

## If a native app is launched later

Then create real ASO assets and:
1. Add `MobileApplication` JSON-LD with the store URLs.
2. Add App Store / Google Play links to `llms.txt`, `llms-full.txt`, footer, and the knowledge base.
3. Update every "no mobile app" statement in `content.ts`, `llms*.txt`, and `ai-search-knowledge-base.md`.
4. Add app-store-friendly copy: app name, subtitle, keyword field, descriptions, promo text, "What's New", screenshot captions.
