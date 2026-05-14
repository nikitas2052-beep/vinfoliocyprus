# Vinfolio — Wine Enthusiasts

Production-ready e-commerce front-end for **Vinfolio Ltd**, a Cypriot wine importer & distributor based in Kato Polemidia, Limassol.

> 🍷 70 curated bottles from Cyprus, Greece, Italy, France, Chile, Argentina, Australia, New Zealand and South Africa.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Zustand** and **Sonner**.

---

## ⚠️ Πρώτα βήματα — Εγκατάσταση Node.js

Το project χρειάζεται **Node.js 18.17+ ή 20+**. Δεν βρέθηκε εγκατεστημένο στον υπολογιστή σου.

1. Πήγαινε στο https://nodejs.org και κατέβασε την **LTS** έκδοση για Windows.
2. Τρέξε τον installer (Next → Next → Install).
3. Άνοιξε **νέο** PowerShell παράθυρο και επιβεβαίωσε:
   ```powershell
   node --version
   npm --version
   ```

---

## 🚀 Quick start

```powershell
cd C:\Users\nikit\Documents\vinfolio
npm install
npm run dev
```

Άνοιξε http://localhost:3000 στον browser.

### Production build

```powershell
npm run build
npm run start
```

---

## 📁 Structure

```
vinfolio/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout — fonts, header, footer, toaster
│   ├── page.tsx              # Homepage (hero, featured, wineries, regions, about preview)
│   ├── not-found.tsx         # Custom 404
│   ├── loading.tsx           # Global loading skeleton
│   ├── globals.css           # Tailwind + design tokens
│   ├── products/
│   │   ├── page.tsx          # Catalog with filters, search, sort
│   │   └── [id]/page.tsx     # Single wine page (static-generated)
│   ├── wineries/page.tsx
│   ├── cart/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   └── wholesale/page.tsx
├── components/
│   ├── Header.tsx            # Sticky, scroll-aware, mobile nav, cart badge
│   ├── Footer.tsx            # 4-column footer + newsletter
│   ├── HeroSection.tsx       # Fullscreen hero with parallax
│   ├── WineCard.tsx          # Hover lift, add-to-cart
│   ├── WineCardSkeleton.tsx
│   ├── ProductFilters.tsx    # URL-synced filters (type, country, region, winery, size, price)
│   ├── ProductsView.tsx      # Catalog client view
│   ├── ProductDetail.tsx     # Wine details, tabs, qty selector
│   ├── CartDrawer.tsx        # Slide-in cart (Framer Motion)
│   ├── CartView.tsx          # Full cart page
│   ├── ContactView.tsx       # Form + map
│   ├── AgeVerificationModal.tsx
│   └── Reveal.tsx            # Scroll-triggered fade
├── lib/
│   ├── wines.ts              # 70 wines with full details
│   ├── wineries.ts           # 17 partner wineries
│   ├── store.ts              # Zustand (cart + age gate) with localStorage
│   ├── types.ts
│   └── utils.ts              # cn(), formatPrice(), VAT, country flags
├── tailwind.config.ts        # Brand palette (burgundy, gold, cream, ink)
├── tsconfig.json
├── next.config.mjs
└── package.json
```

---

## 🎨 Design system

| Token | Value | Usage |
|-------|-------|-------|
| `burgundy` | `#722F37` | Primary surfaces, buttons |
| `gold` | `#D4AF37` | Accents, links, dividers |
| `seal` | `#8B1A1A` | Wine seal red, destructive |
| `cream` | `#F5F0E8` | Body text |
| `ink` | `#0F0A0B` | Background |
| `surface` | `#1A1416` | Cards |

**Typography** — Playfair Display (serif headings), Inter (sans body), italic Playfair for accents.

Use Tailwind utility classes — `btn-primary`, `btn-gold`, `btn-ghost`, `card-surface`, `input-field`, `link-gold`, `badge-red`, `badge-white`, `badge-rose`, `badge-sparkling`, `gold-divider`, `wine-seal`, `shimmer`.

---

## ⚙️ Features

- ✅ 70 real wines from the Vinfolio 2026 catalogue
- ✅ Cart with Zustand + `localStorage` persistence
- ✅ Age-gate modal (18+) with localStorage persistence
- ✅ URL-synced filters (`/products?type=Red&country=Italy&maxPrice=20`)
- ✅ Search by name / winery / region / country
- ✅ Sort by name, price (↑/↓), country
- ✅ VAT (19%) + shipping calculation
- ✅ Static generation for every product page (`generateStaticParams`)
- ✅ SEO metadata + OpenGraph on every route
- ✅ Toast notifications (Sonner)
- ✅ Smooth animations & parallax hero (Framer Motion)
- ✅ Mobile-first responsive
- ✅ Custom 404 + loading skeletons
- ✅ Embedded Google Map for Kato Polemidia

---

## 🛣️ Roadmap (επόμενα βήματα)

1. **Checkout** — integrate Stripe / Revolut / bank transfer
2. **Real images** — replace Unsplash placeholders with bottle shots από τον κατάλογο
3. **Admin / CMS** — Sanity ή Payload για διαχείριση κρασιών
4. **Multi-language** — EL/EN με `next-intl`
5. **Account & order history**
6. **Stock sync** με ERP
7. **Wishlist**
8. **Wine club / subscriptions**

---

## 📞 Vinfolio Ltd

- **Founder** — Yiannakis Aristidou
- 📍 Kato Polemidia, Limassol, Cyprus
- 📞 +357 99 571267
- 📧 vinfoliowines@gmail.com
- 📷 [@vinfolio_wines](https://www.instagram.com/vinfolio_wines)
- 🌐 [www.vinfolio.com.cy](https://www.vinfolio.com.cy)

---

**Drink responsibly. 18+ only.**
