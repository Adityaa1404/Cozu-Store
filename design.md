# design.md

```markdown
# Design System — App Premium Price List
> Style guide & color palette diekstrak dari desain price list "App Premium by cozu"

---

## 1. Design Overview

Desain bergaya **modern e-commerce / price list card-based** dengan nuansa:
- Card-based layout dengan rounded corners besar
- Kontras tinggi antara header gelap dan body terang
- Aksen warna merah & biru untuk hierarki informasi harga
- Background netral terang (light gray)

---

## 2. Color Palette

### Primary Colors

| Token | Hex | Kegunaan |
|-------|-----|----------|
| `--color-black` | `#1A1A1A` | Header card (pill), logo background |
| `--color-white` | `#FFFFFF` | Body card, teks header |
| `--color-background` | `#EFEFEF` | Background halaman utama |

### Accent Colors

| Token | Hex | Kegunaan |
|-------|-----|----------|
| `--color-price` | `#1E5AE8` | Teks harga (bold blue) |
| `--color-label` | `#E5352B` | Label paket (SHARING, PRIVATE, MEMBER) |
| `--color-alert` | `#D62828` | Judul Terms & Conditions |
| `--color-whatsapp` | `#25D366` | Ikon & aksen WhatsApp |

### Text Colors

| Token | Hex | Kegunaan |
|-------|-----|----------|
| `--text-heading` | `#0D0D0D` | Judul utama (App Premium) |
| `--text-body` | `#1A1A1A` | Teks terms & condition |
| `--text-on-dark` | `#FFFFFF` | Teks di dalam pill hitam |

### Brand Colors (Ikon Aplikasi)

| Brand | Hex |
|-------|-----|
| Netflix | `#E50914` |
| Bstation | `#00A1D6` |
| Canva | `#00C4CC` |
| YouTube | `#FF0000` |
| WeTV | `#FF6B00` |
| CapCut | `#000000` |
| Loklok | `#7B2FF7` |

---

## 3. Typography

| Elemen | Font Style | Weight | Size | Color |
|--------|-----------|--------|------|-------|
| Logo "App Premium" | Rounded Sans-serif | Bold (800) | 28–32px | `#0D0D0D` |
| Subtitle "by cozu" | Rounded Sans-serif | Bold | 16px | `#1E5AE8` |
| Card title (pill) | Sans-serif | Bold | 16–18px | `#FFFFFF` |
| Label paket | Sans-serif | Bold + letterspacing 1–2px | 14–16px | `#E5352B` |
| Harga | Sans-serif | Bold | 13–14px | `#1E5AE8` |
| Terms title | Sans-serif | Bold + letterspacing | 16px | `#D62828` |
| Terms body | Sans-serif | SemiBold | 12–13px | `#0D0D0D` |

**Font Family rekomendasi:** `Poppins`, `Nunito`, atau `Baloo 2` (rounded & bold-friendly)

---

## 4. Components

### 4.1 Card (Product Card)
```
- Background     : #FFFFFF
- Border radius  : 16–20px
- Border         : 1px solid rgba(0,0,0,0.08)
- Shadow         : 0 2px 8px rgba(0,0,0,0.08)
- Padding        : 12–16px
```

### 4.2 Card Header (Pill Hitam)
```
- Background     : #1A1A1A
- Border radius  : 9999px (full pill) — atas card membulat penuh
- Height         : 40–44px
- Konten         : Ikon brand (24px) + Nama app (white, bold)
- Position       : Menempel di atas card, full width
```

### 4.3 Label Paket
```
- Text           : UPPERCASE, bold, letter-spacing 1.5px
- Color          : #E5352B
- Contoh         : "SHARING", "PRIVATE", "MEMBER", "1P1U PREM"
```

### 4.4 Price List Item
```
- Format         : "{durasi} : {harga}"
- Contoh         : "1 bulan : 20k"
- Color          : #1E5AE8, bold
- Line height    : 1.6
- Alignment      : Center
```

### 4.5 Header Page
```
- Layout         : Logo kiri + Title tengah + Kontak kanan
- Separator      : Vertical line 2px hitam antara title & kontak
- Contact badge  : Ikon WhatsApp #25D366 + nomor (bold italic)
```

### 4.6 Terms & Condition Box
```
- Background     : #FFFFFF
- Border radius  : 20px
- Border         : 1.5px solid rgba(0,0,0,0.1)
- Title          : "TERMS&CONDITION" — #D62828, bold, uppercase
- List           : Bullet •, bold, uppercase, #0D0D0D
```

### 4.7 Payment Badge
```
- Container      : Card putih rounded 16px, shadow halus
- Isi            : Logo payment (QRIS, ShopeePay, SeaBank)
- Size           : ~100x140px, vertikal stack
```

---

## 5. Layout & Spacing

```
- Grid           : 3 kolom (desktop), card width ~200–220px
- Gap antar card : 12–16px
- Section gap    : 32–48px
- Page padding   : 24–32px
- Container max  : 900–1000px (centered)
```

**Layout Map:**
```
┌─────────────────────────────────┐
│  Header (logo | title | WA)     │
├─────────────────────────────────┤
│  Card Grid (3 kolom)            │
│  [Netflix] [Bstation] [Canva]   │
│  [Youku]   [WeTV]     [CapCut]  │
│            [Youtube]  [Loklok]  │
├─────────────────────────────────┤
│  [T&C Box]      [Payment Badge] │
└─────────────────────────────────┘
```

---

## 6. Effects & Styling

| Property | Value |
|----------|-------|
| Border radius (card) | `16px` |
| Border radius (pill header) | `9999px` |
| Box shadow | `0 2px 8px rgba(0, 0, 0, 0.08)` |
| Border card | `1px solid rgba(0, 0, 0, 0.08)` |
| Icon container | Rounded square 32px, white bg, subtle shadow |

---

## 7. CSS Variables (Siap Pakai)

```css
:root {
  /* Background */
  --bg-page: #EFEFEF;
  --bg-card: #FFFFFF;
  --bg-pill: #1A1A1A;

  /* Text */
  --text-primary: #0D0D0D;
  --text-inverse: #FFFFFF;

  /* Accents */
  --accent-price: #1E5AE8;
  --accent-label: #E5352B;
  --accent-alert: #D62828;
  --accent-wa: #25D366;

  /* Effects */
  --radius-card: 16px;
  --radius-pill: 9999px;
  --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.08);
  --border-card: 1px solid rgba(0, 0, 0, 0.08);
}
```

---

## 8. Design Principles

1. **High Contrast** — Pill hitam vs body putih membuat nama app mudah discan
2. **Color Coding** — Merah = nama paket, Biru = harga (konsisten di semua card)
3. **Rounded & Friendly** — Semua elemen membulat, cocok untuk audiens muda
4. **Scannable** — Format harga seragam `durasi : harga` di semua card
5. **Trust Signals** — T&C dan badge payment ditampilkan jelas di bawah
```

Silakan copy file di atas sebagai `design.md`. Apakah kamu ingin saya buatkan juga implementasi HTML/CSS dari design system ini?