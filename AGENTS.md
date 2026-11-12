# Cozu Store — Agent Instructions (v4 Minimal Dark)

## Stack
Vite 6 + Tailwind v4 + Vanilla ES Modules (`src/modules/*`) + JSON data (`src/data/*`) + `motion` v14. Deploy: Vercel static. Tests: `test_cart.js` (7 ESM tests).

## Mission: v4 Minimal Dark Redesign (Gojo Palette)
Replace the warm-cream/pastel v3 with a **minimal, high-contrast dark** system. De-slop. Single accent. San Francisco typography. GPU-composited scroll motion.

## Design Tokens (design.md — READ IT)
| Token | Hex | Role |
|---|---|---|
| bg | `#1E2134` | canvas |
| surface | `#22254E` | cards |
| text | `#CEDDF4` | primary text |
| accent | `#5793AA` | CTAs / links / focus / active |
| muted | `#BCBAC5` | secondary text, borders |

Derived: `bg-subtle #23263B`, `surface-hover #2A2E5A`, `accent-hover #6BA5BA`,
`accent-subtle rgba(87,147,170,0.14)`, `border rgba(206,221,244,0.10)`,
`text-faint rgba(188,186,197,0.68)`, `success #7FB79C`, `error #97B4C9`.

## Font
Single family — San Francisco system stack (NO Google Fonts, NO serif, NO mono):
`-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif`.
Hierarchy = size/weight/tracking only.

## Grid & Spacing (8pt)
- 4px base. Container `max-w-6xl` (1152px). Gutter 24px. 12-col.
- Section padding-block: 48px mobile → 96px desktop.
- Radius: only `rounded-xl` (12px) cards + `rounded-full` pills/buttons.
- Shadow: only `shadow-card` + `shadow-glow`. No shadow soup.

## De-slop (MUST remove)
per-app pastel tints · Instrument Serif italic · JetBrains Mono counters ·
coral #E05D44 · emerald status dots · gradient mesh bg · emoji ·
decorative micro-labels · redundant CTAs/badges · mixed radius/shadow drift.

## Motion (src/modules/motion.js — motion v14, transform+opacity ONLY)
1. Top scroll progress bar: `scaleX` ← `scroll()` progress (accent).
2. Hero staggered line/word mask reveal (keyframes, once).
3. Scroll-triggered reveal: fade-up `y:16→0` once on `inView` + rAF sweep (no stranded opacity-0).
4. **Scroll-path**: "3 Langkah" steps joined by vertical SVG spine, `stroke-dashoffset` follows scroll (accent).
5. Counter animation: `500+` transaksi, `5–15` menit count up on `inView` (once).
6. Micro: hover lift `y:-2`+border→accent, press scale 0.97, badge pop.
7. `prefers-reduced-motion` → instant; CPU≤2 → skip non-essential.

## PROTECTED CONTRACTS (do not break)
- WA `6287862481038`; `formatStructuredWhatsAppMessage` format exact.
- `npm run test` 7/7 pass. `npm run build` clean.
- All DOM IDs + `data-*`: `#home #cara-pesan #layanan #testimoni #faq #main-content`, `#catalog-container #empty-state #category-filter-pills #app-search #clear-search #sort-select #reset-filters-btn`, `[data-catalog-action] [data-app-id] [data-plan-name] [data-duration-key] [data-duration-label] [data-price]`, `#cart-drawer-root #cart-drawer-backdrop #cart-drawer-panel #cart-items-list #cart-empty-state #cart-buyer-form #buyer-name-input #buyer-notes-input #dynamic-app-fields #cart-checkout-btn #cart-total-price #clear-cart-btn #close-cart-drawer-btn #copy-wa-number-btn`, `#header-cart-badge #cart-count-badge #cart-total-badge #mobile-cart-badge #cart-floating-btn #mobile-bottom-nav`, `#testimonial-carousel #testimonial-prev-btn #testimonial-next-btn #faq-list #scroll-to-top #toast-container`.
- Zero horizontal overflow 360–1920px. Touch targets ≥44px. WCAG AA text contrast.

## Commands
`npm.cmd run test` · `npm.cmd run build` · `npx.cmd vite preview --port 4173 --strictPort`
