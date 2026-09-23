# NITECHSPARK Portfolio — Executive Sales Site

Server-rendered Next.js portfolio for **Nithyananthan Nagarajan**, Founder & CEO of NITECHSPARK.
Built as a shareable business sales asset: honest proof, clear offers, one primary CTA path.

## Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 3, Framer Motion
- **Fonts**: Orbitron (display), Rajdhani (body), JetBrains Mono (labels)
- **DB**: PostgreSQL via Prisma (auth users, messages, visit logs)
- **Auth**: JWT (`jose`), role-based admin portal at `/admin`

## Run locally

```powershell
npm install
$env:DATABASE_URL="postgresql://..."   # required for `npm run build`
npx prisma generate
npm run dev
```

Build without touching the database:

```powershell
npx next build
```

Optional env:

```text
DATABASE_URL=postgresql://...
JWT_SECRET=change-me
ADMIN_SECRET=change-me-admin-code
```

## Site map (public)

| Path | Purpose |
|------|---------|
| `/` and `/portfolio` | Full sales portfolio (SSR) |
| `/services` | All offers + pricing anchors |
| `/work` | Product fleet + case templates |
| `/work/testimonials` | Honest empty-state / future quotes |
| `/about` | Bio, why-us, checklist, timeline |
| `/faq` | 10 FAQs (EN/TA) + FAQPage schema |
| `/press` | Boilerplate, brand facts, press contact |
| `/blog`, `/blog/[slug]` | Essays |
| `/publications`, `/updates` | Internal reports & build notes |
| `/msme-cyber-risk-self-check.pdf` | Free lead magnet |

## Founder maintenance guide

### Update bio / links / products (single source of truth)

Edit **`lib/siteData.ts`** only. Every page imports from it:

- `SITE`, `LINKS` (LinkedIn, Calendly, WhatsApp, email)
- `ventures[]`, `products[]` → counts auto-update via `productCount`
- `offers[]` (pricing), `whyUs[]`, `credentials`
- `NITEORBIT_STATUS` — **flip this string when NiteOrbit ships**
- `BOILERPLATE_50` / `BOILERPLATE_100` for press

Never hardcode the same fact in a component.

### Add a real testimonial (when you have permission)

1. Add to `data/testimonials.json` with `"approved": true`:

```json
[
  {
    "quote": "…",
    "name": "Client Name",
    "role": "Role",
    "company": "Company",
    "approved": true
  }
]
```

2. The `/work/testimonials` page renders automatically. Leave `approved: false` until written permission exists.

### Fill real metrics (never invent)

Edit `data/metrics.json`. Use `null` until the number is true:

```json
{
  "clients": null,
  "assessmentsSold": null,
  "productsShipped": 12,
  "betaUsers": null
}
```

UI hides `null` values entirely.

### Regenerate assets

```powershell
node scripts/generate-assets.mjs
```

Outputs `public/og-image.png` (1200×630) and `public/msme-cyber-risk-self-check.pdf`.

### Blog / papers / updates storage

- Defaults live in `lib/blogData.ts`, `lib/papersData.ts`, `lib/updatesData.ts`
- Runtime overrides: `data/published_content.json` (recreated from defaults if missing)
- To reset published content to code defaults: delete `data/published_content.json`

### Locale (Tamil)

- Dict: `lib/i18n.ts`
- Toggle: navbar EN/தமிழ் sets `lang` cookie + `?lang=ta`
- Scope: hero, contact, services blurb, FAQs

### Analytics

- Client: `lib/analytics.ts` → beacon to `/api/track` (log only)
- Bridge: `components/AnalyticsBridge.tsx` in root layout
- Events: `page_view`, `calendly_open`, `whatsapp_click`, `checklist_download`, `contact_form_submit`, `qualify_select`, `locale_toggle`
- Any element with `data-track="<event>"` also fires

## Honesty rules (do not break)

- No fabricated clients, testimonials, revenue, users, awards, or certifications
- Product counts come from `products.length` — never hardcode “12+”
- NiteOrbit stays “In Development” until it actually ships
- Research download/citation counts stay `0` until real tracking exists

## Verify

```powershell
npx tsc --noEmit
npx next build
```
