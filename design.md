---
version: alpha
name: Cozu Store — Streaming Dark (Prime-inspired)
description: Near-black streaming UI, single cyan accent, SF typography, seamless hero carousel, sidebar nav, GPU-composited motion.
colors:
  canvas: "#05070A"
  rail: "#070A0E"
  surface: "#0F171E"
  surface-2: "#141824"
  line: "rgba(255,255,255,0.08)"
  text: "#FFFFFF"
  text-secondary: "#9AA9B4"
  text-tertiary: "#94A3B8"
  text-muted: "#94A3B8"
  accent: "#00A8E1"
  accent-hover: "#33BBEB"
  action: "rgba(51,65,75,0.6)"
  action-active: "#414E58"
  badge-bg: "#1E2830"
  badge-text: "#E2E8F0"
  progress-track: "#4A5863"
  progress-fill: "#FFFFFF"
typography:
  family: >-
    -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text",
    "Segoe UI", Roboto, Helvetica, Arial, sans-serif
  display: { fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.08 }
  h2: { fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.15 }
  h3: { fontWeight: 600, letterSpacing: "-0.005em", lineHeight: 1.25 }
  body: { fontWeight: 400, lineHeight: 1.6 }
  overline: { fontWeight: 600, letterSpacing: "0.08em", textTransform: uppercase, fontSize: "0.72rem" }
radius:
  card: 12px
  pill: 9999px
  thumb: 8px
shadow:
  card: "0 8px 24px -12px rgba(0,0,0,0.6)"
  glow: "0 0 0 1px rgba(255,255,255,0.18), 0 0 24px -6px rgba(255,255,255,0.12)"
spacing: { unit: 4, scale: [4, 8, 12, 16, 24, 32, 48, 64, 96] }
grid: { container: 1280, rail: 68, gutter: 24, columns: 12 }
motion:
  duration: { instant: 0.08, fast: 0.18, normal: 0.35, slow: 0.6, carousel: 0.5 }
  easing: { smooth: [0.22, 1, 0.36, 1], sharp: [0.4, 0, 0.2, 1] }
  carouselInterval: 3000
  springs:
    snappy: { type: spring, stiffness: 300, damping: 28 }
    gentle: { type: spring, stiffness: 120, damping: 14 }
    bouncy: { type: spring, stiffness: 400, damping: 12 }
---

# Design Tokens — Cozu Store Streaming Dark (v5)

## 1. Palette (Prime Video-inspired, exact extraction)

| Token | Hex | Role |
|---|---|---|
| `canvas` | `#05070A` | page background |
| `surface` | `#0F171E` | card / panel |
| `rail` | `#070A0E` | sidebar rail |
| `text` | `#FFFFFF` | judul / harga |
| `text-secondary` | `#9AA9B4` | body |
| `text-tertiary` | `#94A3B8` | eyebrow / meta |
| `accent` | `#00A8E1` | CTA utama / ranking / dash / counter |
| `action` | `rgba(51,65,75,0.6)` | tombol aksi netral |
| `action-active` | `#414E58` | pill aktif |
| `badge-bg` | `#1E2830` | badge durasi / verifikasi |
| `badge-text` | `#E2E8F0` | teks badge |
| `progress-track` | `#4A5863` | track progress |

**Single-accent rule**: cyan hanya untuk CTA utama, dot `#1 Paling Laris`, dash
carousel aktif, dan counter keranjang. Logo `CZ` transparan dengan teks cyan.
Selain itu netral: putih untuk judul, abu `#9AA9B4` untuk body, `#94A3B8` untuk
meta. Tanpa hue kedua dan tanpa cyan glow pada ikon/ilustrasi.

## 2. Typography
San Francisco tunggal. Hirarki = size/weight/tracking.
- H1 display: 800 / -0.02em / `clamp(2rem,5vw,3.5rem)`
- H2: 700 / -0.01em · H3: 600 · body 400 (`#9AA9B4`)
- Overline: 600 / 0.08em / uppercase 0.72rem (`#94A3B8`)

## 3. Layout
- Sidebar rail kiri `68px` (ikon), expand `240px` (ikon+label), toggle hide.
- Konten: `max-w-[1280px]`, offset kiri setelah rail.
- Radius: `rounded-xl`(12) kartu, `rounded-lg`(8) thumbnail, `rounded-full` pill.
- Shadow: `card` + `glow` saja.

## 4. Komponen

### Hero Carousel
Full-bleed `~75vh`. Slide: key-art kanan (60% lebar, masked), konten kiri (42%):
trend label → eyebrow → judul → harga/synopsis → `Garansi penuh` → CTA row
(tombol `Beli` bulat-putih + `Lihat paket` ghost). Tanpa duration pills dan tanpa
tombol `+`. Auto-advance 3 dtk, crossfade+slide seamless, pause on hover/focus,
dot progress + arrow, keyboard ←/→, `aria-roledescription="carousel"`.

### Sidebar (desktop)
Rail kiri `68px` collapse → `240px` expand. Item: Beranda, Katalog, Testimoni,
FAQ, + Keranjang & Chat Admin. Toggle tombol di atas/bawah. Hide panel = rail
menyusut jadi strip tipis.

### Mobile
Top bar logo + bottom nav 4 item (Beranda, Katalog, Testimoni, Keranjang).
Tanpa hamburger drawer; bottom nav menghormati `env(safe-area-inset-bottom)`.

### Testimoni (Prime-style row)
Horizontal scroll row kartu `16:9` rata tinggi, gap 12px. Header bintang +
pill `Terverifikasi`, quote, avatar/nama di bottom via `mt-auto`. Right-edge
gradient mask memberi partial peek kartu berikutnya.

### Katalog
Grid app-card: thumbnail gradient + icon + badge kategori/durasi, nama app &
paket di body, harga, CTA `Beli Langsung` + `+` keranjang yang di-pin bawah via
`mt-auto`. Pertahankan `data-catalog-action`.

## 5. Motion (motion v14, transform+opacity only)
- **Carousel**: interval 3000ms, durasi transisi 0.5s, crossfade `opacity` +
  `x` slide, seamless loop; pause on hover/focus.
- **Scroll progress** bar atas (`scaleX` ← `scroll()`).
- **Scroll-reveal** fade-up `y:16→0` sekali (`inView` + rAF sweep).
- **Parallax** hero key-art (`translateY` via scroll, kecil).
- **Hover/press**: lift `y:-2` + border netral, press scale 0.97.
- **Reduced motion**: carousel jadi crossfade-only ≤0.2s, semua transform off.

## 6. Responsive
| Breakpoint | Sidebar | Hero | Katalog |
|---|---|---|---|
| <768 | bottom nav | stacked, key-art di belakang | 1-col |
| 768-1024 | rail 68px | split | 2-col |
| ≥1024 | rail expandable | split 42/60 | 3-col grid / rows |

## 7. Minimalism
Buang: pastel, serif, mono, emoji, coral, gradient mesh, badge berlebihan.
Satu canvas gelap, satu aksen, border 1px `line`, kontras AA.
