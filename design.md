---
version: alpha
name: Cozu Store — Minimal Dark (Gojo Palette)
description: Minimal, high-contrast dark storefront. Single accent, San Francisco typography, GPU-composited scroll motion.
colors:
  bg: "#1E2134"
  bg-subtle: "#23263B"
  surface: "#22254E"
  surface-hover: "#2A2E5A"
  border: "rgba(206,221,244,0.10)"
  text: "#CEDDF4"
  text-secondary: "#BCBAC5"
  text-faint: "rgba(188,186,197,0.68)"
  accent: "#5793AA"
  accent-hover: "#6BA5BA"
  accent-subtle: "rgba(87,147,170,0.14)"
  accent-glow: "rgba(87,147,170,0.35)"
  success: "#7FB79C"
  error: "#C97B84"
typography:
  family: >-
    -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text",
    "Segoe UI", Roboto, Helvetica, Arial, sans-serif
  display:
    fontWeight: 800
    letterSpacing: "-0.02em"
    lineHeight: 1.08
  h2:
    fontWeight: 700
    letterSpacing: "-0.01em"
    lineHeight: 1.15
  h3:
    fontWeight: 600
    letterSpacing: "-0.005em"
    lineHeight: 1.25
  body:
    fontWeight: 400
    lineHeight: 1.6
  overline:
    fontWeight: 600
    letterSpacing: "0.08em"
    textTransform: uppercase
    fontSize: 0.75rem
radius:
  card: 12px
  pill: 9999px
shadow:
  card: "0 1px 0 rgba(206,221,244,0.05), 0 16px 40px -20px rgba(0,0,0,0.55)"
  glow: "0 0 0 1px rgba(87,147,170,0.35), 0 0 24px -6px rgba(87,147,170,0.4)"
spacing:
  unit: 4px
  scale: [4, 8, 12, 16, 24, 32, 48, 64, 96]
grid:
  container: 1152px
  columns: 12
  gutter: 24px
  breakpoints: { sm: 640, md: 768, lg: 1024, xl: 1280 }
motion:
  duration: { instant: 0.08, fast: 0.18, normal: 0.35, slow: 0.6, crawl: 1.0 }
  easing: { smooth: [0.22, 1, 0.36, 1], sharp: [0.4, 0, 0.2, 1] }
  springs:
    snappy: { type: spring, stiffness: 300, damping: 28 }
    gentle: { type: spring, stiffness: 120, damping: 14 }
    bouncy: { type: spring, stiffness: 400, damping: 12 }
---

# Design Tokens — Cozu Store Minimal Dark (v4)

## 1. Palette (extracted from Gojo reference PNG)

| Token | Hex | Role |
|---|---|---|
| `bg` | `#1E2134` | Canvas / page background |
| `surface` | `#22254E` | Elevated card / panel |
| `text` | `#CEDDF4` | Primary text (high contrast on dark) |
| `accent` | `#5793AA` | Single accent — CTAs, links, focus ring, active states |
| `muted` | `#BCBAC5` | Secondary text, borders, dividers |

Derived: `bg-subtle #23263B`, `surface-hover #2A2E5A`, `accent-hover #6BA5BA`,
`accent-subtle rgba(87,147,170,0.14)`, `border rgba(206,221,244,0.10)`,
`text-faint rgba(188,186,197,0.68)`, `success #7FB79C`, `error #C97B84`.

**Single-accent rule**: only `accent` carries color emphasis. No coral, no emerald
dots, no per-app pastel themes. Trust and status conveyed by type + icon, not hue.

## 2. Typography (San Francisco only)

One family, hierarchy by size / weight / tracking — never by mixing families.

```
font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Display",
           "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif
```

- Display (h1): 800 / -0.02em / 1.08 — `clamp(2rem, 5vw, 3.25rem)`
- H2: 700 / -0.01em / 1.15 — `clamp(1.5rem, 3.5vw, 2.25rem)`
- H3: 600 / -0.005em / 1.25
- Body: 400 / 1.6 — `#BCBAC5` supporting copy, `#CEDDF4` lead
- Overline: 600 / 0.08em / uppercase / 0.75rem — `accent`

## 3. Grid & Spacing (8pt baseline)

- 4px base unit. Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96.
- Container `max-w-6xl` (1152px), gutters 24px, 12-col desktop grid.
- Section vertical rhythm: 48px (mobile) → 96px (desktop) padding-block.
- One radius grammar: `rounded-xl` (12px) cards, `rounded-full` pills/buttons.
  No `[20px]` / `[22px]` / `[28px]` drift.
- One shadow grammar: `card` for elevated, `glow` for focus/active. No shadow soup.

## 4. Motion (GPU-composited only: transform + opacity)

- Top scroll progress bar: `scaleX` tied to `scroll()` progress (accent).
- Hero: staggered line/word mask reveal (keyframes, once).
- Scroll-triggered reveals: sections fade-up `y:16→0` once on `inView` (amount some)
  + rAF sweep so fast jumps never strand elements above the fold.
- Scroll-path: "3 Langkah" steps joined by a vertical SVG spine whose stroke
  `stroke-dashoffset` follows scroll progress (accent) — the signature fun moment.
- Counter animation: `500+`, `5-15` menit etc. count up on `inView` (once).
- Micro: hover lift (`y:-2` + border→accent), press scale 0.97, badge pop.
- `prefers-reduced-motion` collapses all to instant; low-end CPU (`<=2`) skips non-essential.

## 5. Minimalism Rules (de-slop)

- REMOVE: per-app pastel card tints, Instrument Serif italic, JetBrains Mono counters,
  coral `#E05D44`, emerald status dots, gradient mesh background, emoji, decorative
  micro-labels, redundant CTAs/badges.
- One dark canvas `#1E2134`, cards `#22254E`, 1px `border` dividers instead of heavy shadows.
- Every element earns its place: proof, price, action, or hierarchy — else delete.
