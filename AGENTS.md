# Cozu Store — Agent Instructions (v5 Streaming Dark)

## Stack
Vite 6 + Tailwind v4 + Vanilla ES Modules (`src/modules/*`) + JSON (`src/data/*`) + `motion` v14. Tests: `test_cart.js` (7 ESM). Deploy: Vercel static.

## Mission: v5 Streaming Dark Redesign (Prime Video-inspired)
Ganti total palet Gojo navy → near-black + cyan. Hero carousel auto 3s seamless. Sidebar desktop + drawer mobile. Section order baru. Motion mulus di semua elemen.

## Palette (design.md — READ IT, exact hex)
| Token | Hex | Role |
|---|---|---|
| canvas | `#05070A` | bg |
| surface | `#0F171E` | card |
| rail | `#070A0E` | sidebar |
| text | `#FFFFFF` | judul |
| text-secondary | `#9AA9B4` | body |
| text-tertiary | `#8A98A3` | eyebrow |
| accent | `#00A8E1` | CTA/ranking/check/aktif |
| action | `rgba(51,65,75,0.6)` | tombol aksi |
| action-active | `#414E58` | pill aktif |
| badge-bg | `#1E2830` | badge durasi/rating |
| progress-track | `#4A5863` | track |

Single accent: cyan `#00A8E1` saja. Judul putih, body abu. Tanpa hue kedua.

## Font
SF tunggal: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif`.

## Layout & Navigasi
- **Desktop sidebar**: rail kiri `68px` collapse → `240px` expand (ikon+label), tombol toggle hide panel. Item: Beranda, Katalog, Testimoni, FAQ, Keranjang, Chat Admin. Konten `max-w-[1280px]` offset kiri.
- **Mobile**: hamburger drawer (slide kiri) + bottom nav 4 item (Beranda/Katalog/Testimoni/Keranjang).
- Radius: card `rounded-xl`(12), thumb `rounded-lg`(8), pill `rounded-full`. Shadow: `card`+`glow`.

## Section Order (BARU)
1. Hero carousel (rekomendasi 4 app + intro brand) 2. Testimoni 3. Katalog 4. FAQ + Cara Pesan 5. CTA 6. Footer.

## Hero Carousel (MUST)
- Full-bleed `~75vh`. Slide = 4 app (Netflix/Canva/CapCut/Bstation). Key-art kanan 60% masked, konten kiri 42%: trend label (#1 Paling Laris) → eyebrow → judul app → harga "Mulai RpX" → badge row → CTA row (tombol `Beli` bulat putih + ikon `+` keranjang).
- Auto-advance **3 dtk** seamless (crossfade opacity + slide x, durasi 0.5s). Pause on hover/focus. Dot progress + arrow prev/next. Keyboard ←/→. `aria-roledescription="carousel"`.
- Reduced-motion: crossfade-only ≤0.2s, no slide.

## Motion (motion v14, transform+opacity ONLY)
- Scroll progress bar (`scaleX` ← `scroll()`).
- Scroll-reveal fade-up once (`inView` + rAF sweep, no stranded opacity-0).
- Parallax hero key-art (`translateY` via scroll, kecil).
- Hover lift `y:-2`+border accent; press scale 0.97; badge pop.
- Carousel interval 3000ms.

## PROTECTED CONTRACTS (do not break)
- WA `6287862481038`; `formatStructuredWhatsAppMessage` exact.
- `npm run test` 7/7; `npm run build` clean.
- IDs/data-*: `#home #cara-pesan #layanan #testimoni #faq #main-content`, `#catalog-container #empty-state #category-filter-pills #app-search #clear-search #sort-select #reset-filters-btn`, `[data-catalog-action] [data-app-id] [data-plan-name] [data-duration-key] [data-duration-label] [data-price]`, `#cart-drawer-root #cart-drawer-backdrop #cart-drawer-panel #cart-items-list #cart-empty-state #cart-buyer-form #buyer-name-input #buyer-notes-input #dynamic-app-fields #cart-checkout-btn #cart-total-price #clear-cart-btn #close-cart-drawer-btn #copy-wa-number-btn`, `#header-cart-badge #cart-count-badge #cart-total-badge #mobile-cart-badge #cart-floating-btn #mobile-bottom-nav`, `#testimonial-carousel #testimonial-prev-btn #testimonial-next-btn #faq-list #scroll-to-top #toast-container`.
- Zero horizontal overflow 360-1920. Touch ≥44px. WCAG AA.

## Commands
`npm.cmd run test` · `npm.cmd run build` · `npx.cmd vite preview --port 4173 --strictPort`
