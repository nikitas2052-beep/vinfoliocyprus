# Vinfolio — Project Context

Single-source orientation doc. If you're a developer (or AI assistant)
opening this repo for the first time, read this end-to-end before you
edit anything.

---

## 1 · Business context

**Vinfolio Ltd** is a Cypriot fine-wine importer & distributor based in
Kato Polemidia, Limassol. They serve restaurants, hotels, retailers and
private collectors across Cyprus.

| | |
|---|---|
| Founder | Yiannakis Aristidou (25+ years in wine & beverage sector) |
| Tagline | "Strong partnerships, poured by hand." |
| Phone | +357 99 571267 |
| Email | vinfoliowines@gmail.com |
| Instagram | @vinfolio_wines |
| Live WordPress site | https://www.vinfolio.com.cy |
| New Next.js site (us) | https://vinfoliocypruss.vercel.app |
| GitHub repo | https://github.com/nikitas2052-beep/vinfoliocyprus |

The PDF catalogue lists **70 wines** across **19 partner wineries**
(11 of which have proper logos sourced from their own websites or
direct from the user).

---

## 2 · Tech stack

- **Next.js 14.2.15** (App Router) + **React 18**
- **TypeScript 5**
- **Tailwind CSS 3.4** (custom brand tokens, see below)
- **Framer Motion 11** (most animations)
- **GSAP 3.12.5 + ScrollTrigger** loaded via CDN at runtime (hero scroll-scrub)
- **Zustand 4.5** (cart + age-gate, with localStorage persistence)
- **Sonner** (toast notifications)
- **Lucide React** (icons)
- Fonts via `next/font/google`: **Cormorant Infant** (serif headings) + **Alata** (sans body)

No CMS — wine data is hardcoded in `lib/wines.ts` (70 entries).
Cart is client-only; no real checkout yet (placeholder button).

---

## 3 · Repository layout

```
C:\dev\vinfolio\
├── app/                            ← Next.js App Router
│   ├── layout.tsx                  ← root layout, fonts, Toaster, AgeGate
│   ├── page.tsx                    ← HOMEPAGE (HeroVideo → BestSellers → HowItWorks → Testimonials → Gifts)
│   ├── globals.css                 ← Tailwind layers + brand component classes
│   ├── not-found.tsx
│   ├── loading.tsx
│   ├── products/page.tsx           ← /products grid + filters
│   ├── products/[id]/page.tsx      ← single wine detail
│   ├── wineries/page.tsx           ← /wineries grid (logos + flags)
│   ├── cart/page.tsx
│   ├── about/page.tsx              ← founder bio, Our Story, mission
│   ├── contact/page.tsx
│   └── wholesale/page.tsx
│
├── components/
│   ├── HeroVideo.tsx               ← THE big hero (see §5 below)
│   ├── PartnersPanel.tsx           ← logo wall, slides in from hero scroll
│   ├── Header.tsx                  ← sticky nav + cart badge
│   ├── Footer.tsx
│   ├── WineriesMegaDropdown.tsx    ← Wineries nav item with hover panel
│   ├── WineCard.tsx                ← used in /products grid
│   ├── BestSellers.tsx             ← homepage 3×2 grid (CompactWineCard inside)
│   ├── GiftsSection.tsx            ← homepage 3-col gifts row
│   ├── HowItWorks.tsx              ← Discover→Curate→Delivered (mobile = swipe carousel)
│   ├── Testimonials.tsx            ← dark ink section (mobile = swipe carousel)
│   ├── ProductsView.tsx            ← /products body (client)
│   ├── ProductFilters.tsx          ← left sidebar / mobile filter sheet
│   ├── ProductDetail.tsx           ← /products/[id] body
│   ├── ContactView.tsx
│   ├── CartDrawer.tsx              ← slide-in cart (right side)
│   ├── CartView.tsx                ← /cart page body
│   ├── AgeVerificationModal.tsx    ← 18+ gate with Vinfolio logo
│   ├── BottleSilhouette.tsx        ← fallback for wines without real photos
│   ├── Reveal.tsx                  ← scroll-fade wrapper (framer-motion)
│   ├── WineCardSkeleton.tsx
│   ├── AwardPartners.tsx           ← currently unused (kept for future)
│   ├── LogosMarquee.tsx            ← currently unused (kept for future)
│   └── ui/                         ← shadcn-style primitives (empty for now)
│
├── lib/
│   ├── wines.ts                    ← 70 wines, image URLs, prices, descriptions, GIFT_IDS
│   ├── wineries.ts                 ← 19 partners + logoFor() helper
│   ├── store.ts                    ← Zustand cart + age-gate stores (persisted)
│   ├── types.ts                    ← Wine, Winery, CartItem
│   └── utils.ts                    ← cn(), formatPrice(), VAT_RATE, COUNTRY_FLAGS
│
├── public/
│   ├── assets/
│   │   ├── hero-video.mp4          ← original iPhone HEVC (kept for backup)
│   │   └── hero-video-web.mp4      ← H.264 all-intra, 1280×720, 3.5MB — what plays in the hero
│   └── logos/                      ← clean dark-on-white partner logos sourced locally
│       ├── aix.png, isaltari.png, michaut.png, soligo.png,
│       ├── stoneburn.png, boubas.png, gigognan.svg
│
├── tailwind.config.ts              ← brand palette (ink/wine/bronze/paper/chalk + line/muted)
├── postcss.config.mjs
├── next.config.mjs                 ← image domains whitelist (vinfolio.com.cy, unsplash, google favicons)
├── tsconfig.json
├── package.json
├── .eslintrc.json
├── README.md                       ← installation + npm scripts
└── CONTEXT.md                      ← (this file)
```

External tooling kept under `C:\dev\tools\`:
- `ffmpeg-8.1.1-essentials_build\` — used to re-encode the iPhone .MOV
  hero video to web-friendly H.264 all-intra (every frame a keyframe so
  scroll-scrub seeking is instant)

---

## 4 · Brand identity (Tailwind tokens)

Defined in `tailwind.config.ts` → `theme.extend.colors`. **Treat these
as the only colour vocabulary**; don't reach for raw hex.

| Token | Hex | Use |
|---|---|---|
| `ink` (DEFAULT) | `#242E35` | Primary text, dark surfaces, ink section bg |
| `wine` | `#C31432` | Secondary brand accent, price emphasis, cart badge |
| `bronze` | `#B98D58` | Tertiary accent — eyebrows, italics highlight, dividers |
| `paper` | `#FFFFFF` | Page background, card fills |
| `chalk` | `#F9F8F4` | Soft alt surface (partner tiles, gifts section) |
| `muted` | `#545D5C` | Secondary text |
| `line` | `#E5E2DC` | Borders / dividers |
| `burgundy` | `#C31432` (alias of wine) | Legacy alias — kept so older class names still resolve |
| `gold` | `#B98D58` (alias of bronze) | Legacy alias |

Typography:
- **Cormorant Infant** (italic-ish display serif) → headings, taglines, prices
- **Alata** (geometric humanist sans) → body, UI, labels
- Both loaded once at the root via `next/font/google` in `app/layout.tsx`

Common helper classes defined in `app/globals.css`:
- `.heading-serif` — large serif h2/h3 (Cormorant + tracking)
- `.h-hero` — biggest fluid headings (clamp)
- `.eyebrow` — `text-[11px] uppercase tracking-[0.28em] text-bronze`
- `.rule` — bronze `h-px w-12 mt-5 mb-6`
- `.btn-chalk` / `.btn-link` / `.bottle-bg` (radial gradient behind bottles)
- `.card-paper` — `bg-paper border border-line p-4 hover:shadow-card transition`

Spacing convention: mobile breakpoints use 3–4 unit gaps, desktop 6–8.
Cards on mobile go 2 or 3 columns; desktop 3 or 4 (never 1).

---

## 5 · The big hero (HeroVideo) — read before touching

`components/HeroVideo.tsx` is the most complex piece. It has TWO
totally separate render paths chosen at runtime:

### Desktop (≥1024 px, non-touch UA)
- A `<section>` 100vh tall, the video inside is pinned via
  **GSAP ScrollTrigger** (`pin: true`, `end: "+=150%"`, `scrub: 0.4`).
- As the user scrolls, ScrollTrigger's `onUpdate` is fired and we
  manually drive 5 transforms:
  1. `video.currentTime` — scrubs through the 8.1s pour video
     (uses the all-intra encode so seeking is instant).
  2. `wordmark` — centre → top-left, scale 1 → 0.32, fade 1 → 0.
  3. `cta` — fades + slides down.
  4. `panel` (PartnersPanel) — slides in from the right covering
     the full 42% of the viewport (now 100% per recent edit).
  5. `cue` — "Scroll to pour" hint fades fast.
- **Cleanup is critical**: on unmount AND on every pathname change,
  we call `ScrollTrigger.getAll().forEach(t => t.kill(true))` and
  also remove `body.style.overflow` + `padding-right` that GSAP set.
  Without this, clicking Shop Now jams the next page (regression
  we already shipped a fix for — keep it).
- GSAP is loaded via **CDN at runtime** (not bundled). The loader
  has a module-level `Map<src, Promise>` cache so React Strict Mode's
  double-mount can't race the same script and resolve before window.gsap
  is populated. Don't simplify the loader.

### Mobile / tablet / `prefers-reduced-motion`
- Same video plays as **autoplay muted loop**, no GSAP, no pin.
- iOS Safari can't reliably scrub `video.currentTime` so we never
  even try.
- The PartnersPanel renders as a normal section below the hero
  (not as a slide-in overlay).
- Same wordmark, same CTAs, just static.

Mobile/desktop detection: `window.matchMedia("(max-width: 1023px)")`
combined with a `/Mobi|Android|iPhone|iPad|iPod/i` UA check.

---

## 6 · Data model

### `lib/types.ts`

```ts
interface Wine {
  id: string;             // slug
  name: string;
  winery: string;         // FK to wineries.name (loose — by string match)
  type: WineType;         // Red | White | Rosé | Sparkling | Sparkling Rosé
  country: Country;
  region: string;
  year?: number;
  sizeMl: number;         // 187 | 200 | 750 | 1500
  price: number;          // EUR, excl. VAT
  alcohol: number;
  shortDescription: string;
  description: string;
  pairing: string;
  producerInfo: string;
  image: string;          // URL — either vinfolio.com.cy CDN, Unsplash placeholder, or BottleSilhouette fallback
  stock: number;
  featured: boolean;
  tags?: string[];        // currently used for ["gift"]
}

interface Winery {
  slug: string;
  name: string;
  country: Country;
  description: string;
  website?: string;
  logo?: string;          // /logos/X.png or external URL
  logoBg?: string;        // optional brand bg colour (used in partner tile)
}
```

### Image strategy

Wine bottle photos come from 3 sources, in priority order:

1. **vinfolio.com.cy WP media** — `https://vinfolio.com.cy/wp-content/uploads/2025/10/VINFOLIO_ALL_WINES_09-25-XX-1152x1536.png`
   - Used by `lib/wines.ts → B("XX")` helper for the 32 wines that have
     real photos uploaded on the live WordPress site.
   - Resolved via WP REST API (`/wp-json/wp/v2/media`) — mapping
     wineId → WC product → featured_media → 09-25-XX filename.

2. **Unsplash placeholders** — 7 named constants (`RED_IMG`,
   `WHITE_IMG`, `ROSE_IMG`, etc.) at the top of `lib/wines.ts`.
   Used by ~38 wines that don't have real photos yet (Barolo,
   Barbaresco, Riesling, Sancerre, AIX, 11× Les Jamelles, Grey
   Carmenere/Syrah, Chablis Premier Cru).

3. **BottleSilhouette SVG fallback** — `components/BottleSilhouette.tsx`
   detects any Unsplash URL via `isPlaceholderImage()` and renders
   a hand-drawn inline-SVG bottle in the wine's type colour with
   the winery initial on the label. **Use this for any future
   placeholder needs** — never add new Unsplash URLs.

### Partner logos

Stored locally in `public/logos/`. To add a new winery logo:

1. Save the clean dark-on-white PNG/SVG to `public/logos/{slug}.png`.
2. Add `logo: "/logos/{slug}.png"` to the matching entry in
   `lib/wineries.ts`.
3. Drop any `logoBg` field — they're not needed when the source
   is already clean dark-on-white (the monochrome filter handles
   the rest).

`logoFor(winery)` in `lib/wineries.ts` returns `winery.logo` if set,
otherwise falls back to Google's favicon endpoint for the winery's
website.

---

## 7 · Build / dev / deploy

### Local dev

```powershell
cd C:\dev\vinfolio
npm install            # only the first time
npm run dev            # localhost:3000
```

The dev server occasionally won't survive shell exit. If you see
`ERR_CONNECTION_REFUSED`, restart it. Detached spawn pattern that
*does* survive:

```powershell
Start-Process -FilePath "cmd.exe" `
  -ArgumentList @("/c","cd /d C:\dev\vinfolio && ""C:\Program Files\nodejs\npm.cmd"" run dev > ""$env:TEMP\vinfolio-dev.log"" 2>&1") `
  -WindowStyle Hidden
```

### Production build

```powershell
npm run build          # 80 static pages prerendered
npm start              # serves the build locally
```

`next lint` should be clean — keep it that way.

### Deploy

The repo lives at **https://github.com/nikitas2052-beep/vinfoliocyprus**
on the `main` branch. Vercel project name is **`vinfoliocypruss`**
(two `s`s) under the `nikitas2052-beeps-projects` team.

Normal flow:

```powershell
git add -A
git commit -m "what changed"
git push
```

Vercel auto-deploys main on push, **usually within 1–2 min**.

If auto-deploy stalls (we've seen it happen), trigger a manual
redeploy from the Vercel dashboard (Project → Deployments → ⋯ →
Redeploy). Or, if a token is available:

```bash
export VERCEL_TOKEN="..."   # never commit this
vercel --prod --token "$VERCEL_TOKEN" --yes
```

The `.vercel/` directory is git-ignored — keep it that way.

### Verifying a deploy

The fastest way to confirm a new build is live: check the CSS hash.

```bash
curl -s "https://vinfoliocypruss.vercel.app/?cb=$RANDOM" \
  | grep -oE '/_next/static/css/[a-zA-Z0-9_-]+\.css' | head -1
```

If the hash changed vs the last known one, the build is live.

---

## 8 · Recent technical decisions (don't undo without reason)

| Decision | Why |
|---|---|
| GSAP via CDN (not npm) | User constraint from initial brief — keep bundle small |
| All-intra H.264 video encoding | Smooth scroll-scrub seek (without `-g 1` Safari stutters badly) |
| Module-level Promise cache in `loadScript()` | Strict Mode race — see §5 |
| Pathname-keyed cleanup effect in HeroVideo | Cures "navigation jams after Shop Now" — see §5 |
| Mobile autoplay path instead of GSAP pin | iOS Safari can't scrub video, pin is also expensive |
| `grid-cols-3` from smallest viewport on Best Sellers + Gifts | User wanted 3×2 always, not 1×6 tower on phones |
| 4 partner logos sourced locally (Soligo, Gigognan, Stoneburn, Boubas) | The vinfolio.com.cy CDN versions had dark backgrounds baked in, making them look like black blobs through the monochrome filter |
| Monochrome filter at rest, full colour on hover | User's explicit preference (twice) |
| PartnersPanel hidden filters for logo-less wineries | Avoids "Les Jamelles logo" alt-text bricks where no image renders |
| BottleSilhouette instead of Unsplash for placeholders | Looks intentional, branded, and uniform |
| HowItWorks + Testimonials swipe-carousel below `md` | More readable on phones than 3 stacked tall cards |
| /wineries page = 2-col mobile compact tiles | User specifically asked for them smaller twice |
| Ditched "A glass for every table" section | User said it was redundant with the gifts row above |
| `next/font/google` for Cormorant + Alata | Self-hosted via Next.js to avoid layout shift |

---

## 9 · What's NOT done (known follow-ups)

- **Real checkout** — `Proceed to Checkout` is a toast placeholder.
  Wire Stripe / Revolut / bank transfer.
- **38 wines still on placeholders** — anything from Angelo Negro
  (Barolo, Barbaresco), Dopff au Moulin (Riesling), Domaine Du Pré
  Semelé (Sancerre), all 11 Les Jamelles, Ventisquero Grey
  Carménère/Syrah (the website only stocks Grey Merlot), and
  Chablis Premier Cru. Either upload them to vinfolio.com.cy, host
  them under `public/wines/`, or accept the BottleSilhouette
  fallback indefinitely.
- **Tenuta Alzatura logo** — using the dark-bg vinfolio.com.cy
  version. Couldn't find a clean source.
- **Custom domain** — Vercel project is on `vinfoliocypruss.vercel.app`.
  When ready to connect `vinfolio.com.cy`, add it under Project →
  Settings → Domains and configure DNS at the registrar.
- **Greek / multi-language** — currently English only. The PDF
  catalogue and live site mix Greek + English; we should add
  `next-intl` and translate at minimum: nav, hero copy, age modal,
  cart, footer.
- **CMS** — wine data is hardcoded. For Yiannakis to edit prices
  himself, wire Sanity / Payload and migrate `lib/wines.ts`.
- **Real wine images for the 38 wines without photos** — see above.
- **SEO** — basic OG meta is in place but no sitemap.xml,
  robots.txt, structured data, or per-wine OG images.

---

## 10 · Working with the user

The user is a Greek-speaking beginner. They're not a developer — they
describe what they want visually ("να φαίνονται σε 2 γραμμές", "βαλε
λευκό φόντο") and expect us to implement.

- **Reply in Greek unless they switch to English.**
- They iterate fast — expect 3-5 rounds of polish per feature.
- They have a sharp eye for visual consistency (the partner-logo
  saga proves it). When in doubt about colour / typography, default
  to **less colour, more white space, more serif italic accents in
  bronze**.
- They've shared Vercel access tokens in chat twice already — both
  times I used them then strongly recommended they delete the
  token via vercel.com/account/tokens. **Always do the same** if
  it happens again.

---

## Quick links

- Live: https://vinfoliocypruss.vercel.app
- WordPress original: https://www.vinfolio.com.cy
- GitHub: https://github.com/nikitas2052-beep/vinfoliocyprus
- PDF catalogue: `C:\Users\nikit\Downloads\VINFOLIO_CATALOGUE_2026_P.pdf` (and 3 identical duplicates)
- Hero source video (iPhone MOV): `C:\Users\nikit\Downloads\copy_119D1575-F539-4594-AE0C-A13D29EBC9A3.MOV`
- ffmpeg portable: `C:\dev\tools\ffmpeg-8.1.1-essentials_build\bin\ffmpeg.exe`
- User's saved partner logos: `C:\Users\nikit\OneDrive\Υπολογιστής\wineries\`
