# Cozu Store Redesign — Agent Instructions

## Project Overview
Cozu Store is an Indonesian digital premium account reseller (Netflix, Canva, Bstation, CapCut).
This is a TOTAL UI/UX REDESIGN of the existing static website.

## Key Documents (READ THESE FIRST)
- `PRD.md` — Product Requirements Document with user personas, flows, MoSCoW features
- `design.md` — Complete Design System (colors, typography, components, Tailwind config)
- `ARCHITECTURE.md` — Technical architecture (Vite + vanilla JS + built Tailwind)

## Current Mission: v3 Visual & Motion Overhaul (ATM Reference Upgrade)
Upgrade the UI/UX and motion layer based on user's 3 design references while preserving ALL existing functional & test contracts.

### Aesthetic Direction ("Warm Neo-Editorial x Soft-UI Pastel Commerce")
1. **Canvas & Surface**:
   - Warm cream canvas (`#F6F3EC`) with subtle soft ambient pastel radial mesh + fine 3% opacity grid pattern (NEVER loud neon, NEVER flat white void).
   - Pure crisp `#FFFFFF` elevated cards (`rounded-[22px]`) with multi-stop soft diffuse shadow (`0 20px 50px -12px rgba(40, 30, 20, 0.09)`).
   - **App Pastel Card Surfaces** (adapted from user's Soft-UI e-commerce reference):
     - Netflix: Soft Rose `#FBE3E4` (badge/accent `#E11D48`)
     - Canva: Soft Cyan `#D5F5F6` (badge/accent `#0891B2`)
     - CapCut: Soft Lime `#EFF7D3` (badge/accent `#4D7C0F`)
     - Bstation: Soft Lavender `#F3E5F5` (badge/accent `#7C3AED`)
   - Cozu Brand Primary stays **Teal `#0D9488`** / `#0F766E` with warm coral highlight `#E05D44` reserved strictly for "Paling Laris" / hot promo dots.

2. **Typography**:
   - Load `Plus Jakarta Sans` (display), `Instrument Serif` italic (editorial highlight word in Hero & CTA), `Inter` (body), and `JetBrains Mono` (status counters `01 / 04`, order IDs, CLI preview).

3. **Navbar (`navbar.gallery` inspiration)**:
   - Floating glass capsule sticky header (`max-w-7xl mx-auto`, rounded-2xl `bg-white/80 backdrop-blur-xl border-stone-200/70 shadow-sm`), live status dot, clean nav links, Cart pill with spring-pop counter, Teal `Chat Admin` CTA with micro icon shift on hover.

4. **Hero Section (Threads `F9Ynfyfni` + Soft-UI Gradient Promo Card)**:
   - Left column: Monospaced status pill (`01 / 04 APLIKASI READY`), bold editorial display H1 with *italic Instrument Serif* teal highlight word, crisp 2-line value prop, tactile primary + secondary CTAs, clean 4-pill trust strip, and inline payment methods row (`QRIS`, `DANA`, `GoPay`, `OVO`, `ShopeePay`, `BCA`).
   - Right column — **Interactive 3D Staggered App Showcase Deck**:
     - Dominant center Mac-style showcase card (`rounded-[22px]`, window bar with 3 dots + `cozu.store/<app>` pill + `01 / 04` counter).
     - Vibrant pastel-to-rich app gradient preview stage inside the showcase card, floating 3D-shadowed app emblem orb, "MULAI RP ..." price badge, savings indicator, and direct `Pilih Paket` / `+ Keranjang` quick trigger.
     - **Flanking off-axis tilted cards** (`rotate(-4deg)` & `rotate(4.5deg)`, scaled down `0.90`, clickable to focus) behind/beside center card.
     - **Overlapping dark-matte floating widget** (`#141416`, `rounded-xl`, bottom-right overlap) displaying live monospace order command (`$ order --app netflix --garansi full` + `✓ Format WhatsApp otomatis siap`).
     - **Segmented gradient progress bar** (`01`..`04`) + Prev/Next spring buttons to cycle through Netflix -> Canva -> CapCut -> Bstation.

5. **Catalog Cards (Adapted from User's Attached Soft-UI Mockup)**:
   - Single-row scrollable category pills (`Semua`, `Streaming`, `Desain & Editing`) with elevated active pill shadow + Search + Sort.
   - Each app section sits in a crisp rounded container with pastel-tinted app icon orb + `filter: drop-shadow(...)` floating depth.
   - Each plan card (`rounded-[20px]`): top-left pastel pill badge (`Harian`/`Bulanan`/`Paling Laris`), bold price display, crisp feature list, bottom action row featuring **`Beli Langsung` pill + circular `+` Quick-Add Cart FAB** (preserving `data-catalog-action="add"` and `data-catalog-action="buy"` contracts).

6. **Motion System (`src/modules/motion.js`) using `motion` v14 package**:
   - Already installed: `motion` (`animate`, `inView`, `scroll`, `stagger`, `spring`, `hover`, `press`, `prefersReducedMotion`).
   - Define `motionTokens`, `springs`, and `shouldAnimate()` hardware/reduced-motion guard.
   - **Signature animations**:
     - Fixed 2px top scroll progress bar driven by `scroll()`.
     - Staggered hero entrance choreography (`stagger(0.06)`).
     - Interactive Hero 3D Staggered Card Deck with spring transitions (`stiffness: 300, damping: 28`), auto-rotate pause on hover/focus, and segmented progress bar fill (`scaleX`).
     - Viewport scroll reveals via `inView(..., { amount: 0.15 })` (once only — unobserve after trigger!) for How-It-Works steps, Catalog cards, Testimonials, FAQ items, CTA banner.
     - Tactile press (`press()`), subtle card hover elevation (`hover()`), cart badge spring pop, smooth animated FAQ & Cart Drawer transitions.
   - **Performance & A11y Rules**:
     - ONLY animate GPU-composited properties (`transform`, `opacity`). NEVER animate `width`, `height`, `top`, `left`, `margin`, `padding`.
     - Zero horizontal overflow at all viewports (360px to 1920px).
     - Respect `prefers-reduced-motion: reduce`.

7. **Mobile Bottom Nav (Adapted from User's Attached Mockup)**:
   - Floating glass pill bar (`mx-3 mb-2.5 rounded-2xl`) with elevated Teal circular active icon state.

8. **CTA Banner (`cta.gallery`) & Editorial Footer (`footer.design`)**:
   - Dark charcoal `#141416` CTA banner with subtle radial teal glow, italic serif highlight word, live WhatsApp status badge, high-contrast button.
   - Clean 4-column footer with subtle oversized `CozuStore` watermark.

## PROTECTED CONTRACTS — DO NOT BREAK!
- Admin WhatsApp number MUST remain `6287862481038`.
- `npm run test` (`test_cart.js` 7 ESM tests) MUST pass 100%.
- Keep all required DOM IDs and `data-*` attributes intact (`#home`, `#cara-pesan`, `#layanan`, `#testimoni`, `#faq`, `#catalog-container`, `#empty-state`, `#category-filter-pills`, `#app-search`, `#clear-search`, `#sort-select`, `#reset-filters-btn`, `[data-catalog-action]`, `#cart-drawer-root`, `#cart-items-list`, `#cart-buyer-form`, `#buyer-name-input`, `#buyer-notes-input`, `#dynamic-app-fields`, `#cart-checkout-btn`, `#header-cart-badge`, `#cart-count-badge`, `#cart-total-badge`, `#mobile-cart-badge`, `#testimonial-carousel`, `#faq-list`, `#scroll-to-top`, `#toast-container`).
- `formatStructuredWhatsAppMessage` output format must stay exact.

## Current State
- Vite 6 + Tailwind v4 + Vanilla ES Modules (`src/modules/*`) + `motion` v14 (`package.json`)

## Target Architecture
- **Vite** as build tool
- **Tailwind CSS v3** with PostCSS (built, not CDN)
- **Vanilla JS** with ES modules (no framework)
- **Lucide Icons** (replacing Font Awesome)
- **Product data** in `src/data/products.json`
- **Components** as JS modules in `src/modules/`
- **HTML partials** via Vite plugin or template literals

## Brand Identity
- **Primary Color:** Teal #0D9488 (NOT Netflix red)
- **Font:** Plus Jakarta Sans (headings) + Inter (body)
- **Style:** Clean, modern, trust-building, rounded/friendly
- **Neutrals:** Stone scale (warm gray)

## Project Structure Target
```
src/
├── index.html          # Main entry
├── styles/
│   └── main.css        # Tailwind directives + custom
├── modules/
│   ├── app.js          # Main entry, init
│   ├── products.js     # Product rendering
│   ├── cart.js         # Cart state + drawer
│   ├── navigation.js   # Nav, scroll spy, hash routing
│   ├── search.js       # Search + filter + sort
│   ├── testimonials.js # Testimonial carousel
│   ├── faq.js          # FAQ accordion
│   └── toast.js        # Toast notifications
├── data/
│   ├── products.json   # Product catalog
│   ├── categories.json # Category definitions
│   └── testimonials.json # Testimonials data
└── assets/
    └── (images if needed)
```

## Implementation Priority
1. Set up Vite + Tailwind build pipeline
2. Extract product data to JSON
3. Build new HTML structure with redesigned UI
4. Split JS into modules
5. Style with new design system
6. Verify responsive + mobile

## Key UX Improvements
- Single-level navigation (no competing filters)
- All products visible on one page (grid, no tabs)
- Comparison-friendly card layout
- Trust badges + payment method icons
- How it works section
- Better mobile bottom nav
- Glassmorphism card effects
- Consistent teal brand color

## WhatsApp Integration
Admin number: 6287862481038
Keep WhatsApp checkout flow but improve UX.

## Commands
```bash
npm install         # Install deps
npm run dev         # Dev server
npm run build       # Production build
npm run preview     # Preview production build
```
