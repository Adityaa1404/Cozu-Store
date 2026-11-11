# Cozu Store Redesign — Agent Instructions

## Project Overview
Cozu Store is an Indonesian digital premium account reseller (Netflix, Canva, Bstation, CapCut).
This is a TOTAL UI/UX REDESIGN of the existing static website.

## Key Documents (READ THESE FIRST)
- `PRD.md` — Product Requirements Document with user personas, flows, MoSCoW features
- `design.md` — Complete Design System (colors, typography, components, Tailwind config)
- `ARCHITECTURE.md` — Technical architecture (Vite + vanilla JS + built Tailwind)

## Current State
- Single `index.html` + `styles.css` + `script.js` (1500+ lines)
- Tailwind via CDN (not built)
- Products hardcoded in JS array
- WhatsApp checkout via redirect
- Deployed on Vercel (static)

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
