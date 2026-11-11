# 📋 PRD: Redesign Total Cozu Store

> **Versi:** 1.0  
> **Tanggal:** 11 November 2026  
> **Author:** Tim Produk Cozu Store  
> **Status:** Draft — Menunggu Review  
> **Repo:** https://github.com/Adityaa1404/Cozu-Store.git  
> **Live:** https://cozu-store.vercel.app/

---

## Daftar Isi

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement & Analisis Kondisi Saat Ini](#2-problem-statement--analisis-kondisi-saat-ini)
3. [Goals & Success Metrics (KPIs)](#3-goals--success-metrics-kpis)
4. [Target Audience & User Personas](#4-target-audience--user-personas)
5. [User Flows](#5-user-flows)
6. [Feature Requirements (MoSCoW)](#6-feature-requirements-moscow)
7. [Non-Functional Requirements](#7-non-functional-requirements)
8. [Content Strategy](#8-content-strategy)
9. [Competitive Analysis Summary](#9-competitive-analysis-summary)
10. [Phased Rollout Plan](#10-phased-rollout-plan)
11. [Risks & Mitigations](#11-risks--mitigations)
12. [Open Questions](#12-open-questions)

---

## 1. Executive Summary

Cozu Store adalah reseller akun premium digital (Netflix, Canva, Bstation, CapCut) yang melayani pasar Indonesia. Saat ini Cozu Store berupa situs statis HTML/CSS/JS yang di-deploy di Vercel, dengan transaksi via redirect WhatsApp.

**Masalah utama:** Situs saat ini memiliki information architecture yang membingungkan, tidak ada brand identity yang konsisten, mobile UX yang buruk, dan conversion funnel yang lemah. Tiga mekanisme filter yang saling tumpang tindih (category pills + app tabs + search), warna brand yang berubah-ubah per aplikasi, dan tidak ada trust signal yang memadai sebelum checkout.

**Solusi:** Redesign total yang mencakup:
- **Brand identity** baru yang konsisten dan profesional untuk Cozu Store
- **Information architecture** yang disederhanakan: satu flow linear browse → compare → buy
- **Mobile-first design** dengan touch target ≥44px dan layout yang efisien
- **Conversion optimization** dengan trust signals, comparison table, dan streamlined checkout
- **Content strategy** yang lebih kaya: How it works, payment badges, garansi visual, lebih banyak testimonial
- **Technical modernization** tanpa over-engineering (tetap static site, tapi dengan build tooling yang proper)

**Target outcome:** Peningkatan WhatsApp conversion rate 2-3x dari baseline saat ini dalam 3 bulan pasca-launch.

---

## 2. Problem Statement & Analisis Kondisi Saat Ini

### 2.1 Kondisi Teknis Saat Ini

| Aspek | Status Saat Ini | Masalah |
|-------|----------------|---------|
| **Stack** | Single `index.html` + `styles.css` + `script.js` | Monolitik, sulit maintain |
| **CSS** | Tailwind CDN (no build) | Tidak ada tree-shaking, ~300KB+ CSS dimuat penuh |
| **Data** | Hardcoded di `appsData` array dalam `script.js` | Menambah produk = edit code |
| **Checkout** | WhatsApp redirect via `wa.me` | Tidak ada order tracking, konfirmasi, atau analytics |
| **Hosting** | Vercel (static) | ✅ Sudah baik |
| **SEO** | Meta tags dasar saja | Tidak ada structured data, Open Graph incomplete |
| **Analytics** | Tidak ada | Blind — tidak tahu user behavior |
| **Performance** | Tidak ada lazy loading, code splitting, atau image optimization | Unoptimized |
| **PWA** | Tidak ada | Tidak bisa di-install, tidak ada offline support |
| **Accessibility** | Belum diaudit | Tidak diketahui compliance level |

### 2.2 Masalah UX/UI Kritis

#### A. Information Architecture yang Membingungkan
Saat ini ada **3 mekanisme filter** yang bersaing:
1. **Category pills** di atas (Streaming, Design, Music, AI)
2. **App tabs** di bawahnya (Netflix, Canva, Bstation, CapCut)
3. **Search bar**

User bingung: apakah harus pilih kategori dulu, lalu app, lalu scroll? Atau search langsung? Ini menciptakan **decision paralysis** dan menghambat flow browse → buy.

**Produk hanya 4 aplikasi dengan total ~10 plan.** Kompleksitas navigasi ini tidak proporsional dengan jumlah produk.

#### B. Identitas Visual Tidak Konsisten
- CSS variable `--brand-color` di-set ke warna masing-masing app: merah Netflix (#E50914), cyan Canva (#00C4CC), biru Bstation (#00A1D6), slate CapCut (#1e293b)
- Akibatnya: **seluruh warna situs berubah** saat user pindah tab — button, accent, background semua berubah
- Cozu Store tidak punya identitas warna sendiri
- Tidak ada logo, tidak ada brand mark

#### C. Mobile UX Buruk
- Bottom nav 4 item + floating cart widget = cluttered
- Category pills overflow tanpa scroll indicator
- Card terlalu tinggi, mendorong content di bawah fold
- Cart drawer tidak punya drag handle
- Touch target di beberapa elemen < 44px

#### D. Conversion Funnel Lemah
- Tidak ada **trust signals** above the fold (garansi, jumlah transaksi, payment methods)
- Tidak ada **comparison table** — user harus klik tab per tab
- Tidak ada **How it works** section — user baru tidak tahu prosesnya
- Tombol "Beli Langsung" menggunakan ikon WhatsApp — mengimplikasikan chat, bukan checkout
- Tidak ada **urgency signals** dekat tombol beli
- Tidak ada **payment method badges** visual dekat area checkout
- Feature list menggunakan istilah ambigu ("Less Limit", "Anti On-Hold") tanpa penjelasan

#### E. Content Terlalu Minim
- Hanya 4 testimonial hardcoded
- FAQ hanya 4 item
- Tidak ada section "Cara Pesan" yang visual/step-by-step
- Tidak ada badge pembayaran (QRIS, DANA, GoPay, OVO, dll.)
- Footer minimal
- Tidak ada product imagery atau ilustrasi

### 2.3 Ringkasan Data Produk Saat Ini

| Aplikasi | Plans | Harga Range | Best Seller |
|----------|-------|-------------|-------------|
| Netflix | 3 plans (Sharing Daily, Sharing Monthly, Semi Private) | Rp 6.000 – Rp 45.000 | Sharing 1 Profile (Monthly) Rp 40.000 |
| Canva | 2 plans (Pro Tim, Pro Design Tim) | Rp 4.000 – Rp 5.000 | Pro Design (Monthly) Rp 5.000 |
| Bstation | 1 plan (Sharing 6 Members) | Rp 8.000 | Sharing 6 Members (Monthly) Rp 8.000 |
| CapCut | 4 plans (Sharing Weekly/Monthly, Private Weekly/Monthly) | Rp 12.000 – Rp 42.000 | Private (Weekly) Rp 18.000 |

**Total: 4 aplikasi, 10 plan variations, harga Rp 4.000 – Rp 45.000/periode.**

---

## 3. Goals & Success Metrics (KPIs)

### 3.1 Goals Utama

| # | Goal | Deskripsi |
|---|------|-----------|
| G1 | **Meningkatkan conversion rate** | Lebih banyak visitor yang klik tombol beli dan menyelesaikan flow ke WhatsApp |
| G2 | **Membangun brand identity** | Cozu Store punya identitas visual yang konsisten dan profesional |
| G3 | **Memperbaiki mobile experience** | Mobile-first design yang smooth, efisien, dan accessible |
| G4 | **Meningkatkan trust & credibility** | User merasa aman dan percaya untuk bertransaksi |
| G5 | **Mempermudah pengelolaan produk** | Owner bisa update harga/produk tanpa edit code |

### 3.2 Success Metrics (KPIs)

| KPI | Baseline (Estimasi) | Target (3 Bulan) | Target (6 Bulan) |
|-----|---------------------|-------------------|-------------------|
| **WhatsApp Click-Through Rate** | ~2-5% visitor | 8-12% | 15%+ |
| **Bounce Rate** | ~60-70% (estimasi) | < 45% | < 35% |
| **Time to First CTA Visible** | > 3 scroll | 0 scroll (above fold) | 0 scroll |
| **Mobile Usability Score** (Lighthouse) | Unknown | > 90 | > 95 |
| **Performance Score** (Lighthouse) | Unknown | > 85 | > 95 |
| **Accessibility Score** (Lighthouse) | Unknown | > 80 | > 90 |
| **SEO Score** (Lighthouse) | Unknown | > 90 | > 95 |
| **Page Load Time** (3G) | Unknown | < 3s FCP | < 2s FCP |
| **Average Session Duration** | Unknown | +30% dari baseline | +50% |
| **Cart Completion Rate** | Unknown | +40% dari baseline | +60% |

> **Catatan:** Baseline saat ini tidak diketahui karena tidak ada analytics. Implementasi analytics harus menjadi **langkah pertama** sebelum redesign di-launch agar bisa mengukur improvement.

---

## 4. Target Audience & User Personas

### 4.1 Persona Primer: "Anak Kos/Mahasiswa"

| Atribut | Detail |
|---------|--------|
| **Nama** | Dinda, 20 tahun |
| **Pekerjaan** | Mahasiswi semester 4, desain komunikasi |
| **Device** | Android mid-range (Rp 2-3 juta), data 4G |
| **Perilaku** | Scroll Instagram & TikTok, nonton Netflix tiap malam, pakai Canva untuk tugas kuliah |
| **Budget** | Ketat — uang bulanan dari orang tua, cari yang paling murah |
| **Pain Point** | Langganan resmi terlalu mahal, bingung bedanya sharing vs private |
| **Trust Signal** | Butuh lihat testimonial dari orang yang mirip dirinya, payment via QRIS/e-wallet |
| **Buying Behavior** | Bandingkan harga, cari yang ada garansi, prefer chat WA sebelum beli |

### 4.2 Persona Sekunder: "Pekerja Muda/Freelancer"

| Atribut | Detail |
|---------|--------|
| **Nama** | Raka, 26 tahun |
| **Pekerjaan** | Freelance graphic designer & content creator |
| **Device** | iPhone / Android flagship, WiFi stabil |
| **Perilaku** | Butuh Canva Pro + CapCut Pro untuk kerja, Netflix untuk hiburan weekend |
| **Budget** | Moderat — bisa bayar, tapi cari value terbaik |
| **Pain Point** | Butuh fitur premium (Brand Kit, Magic Studio, No Watermark) tapi langganan resmi per-tool mahal kalau diakumulasi |
| **Trust Signal** | Butuh lihat detail fitur per plan, garansi jelas, payment method lengkap |
| **Buying Behavior** | Langsung beli kalau info lengkap, tidak suka harus chat dulu untuk tanya harga |

### 4.3 Persona Tersier: "Reseller/Grup"

| Atribut | Detail |
|---------|--------|
| **Nama** | Aldi, 22 tahun |
| **Pekerjaan** | Mahasiswa, side hustle jual akun premium ke teman-teman |
| **Device** | Android |
| **Perilaku** | Beli dalam jumlah banyak, cari harga termurah, butuh fast response admin |
| **Pain Point** | Perlu format order yang jelas, perlu tahu stok availability |
| **Trust Signal** | Konsistensi layanan, garansi replacement, kecepatan admin |
| **Buying Behavior** | Repeat buyer, order via WA langsung, butuh harga grosir |

---

## 5. User Flows

### 5.1 Flow Utama: Browse → Compare → Buy

```
Landing Page
    │
    ├── [Above the Fold]
    │   ├── Hero: Value prop + trust signals (jumlah transaksi, garansi badge)
    │   ├── Quick CTA: "Lihat Katalog" → scroll ke katalog
    │   └── Trust bar: payment method icons + garansi badge
    │
    ├── [How It Works] — 3 step visual
    │   ├── 1. Pilih Aplikasi & Paket
    │   ├── 2. Checkout via WhatsApp
    │   └── 3. Terima Akun dalam 5-15 Menit
    │
    ├── [Katalog Produk] — Single unified view
    │   ├── App cards (Netflix, Canva, Bstation, CapCut) sebagai grid
    │   ├── Klik app card → expand inline ATAU navigate ke section
    │   ├── Comparison table per app (plan vs plan)
    │   │   ├── Kolom: Plan Name | Harga | Durasi | Device | Garansi | Fitur
    │   │   └── Highlight: Best Seller badge
    │   └── CTA per plan: "Pesan Sekarang" → Add to cart / direct WA
    │
    ├── [Cart] — Slide-in drawer (kanan di desktop, bottom sheet di mobile)
    │   ├── Item list dengan qty control
    │   ├── Form: Nama pembeli (required), Catatan (optional)
    │   ├── Total harga
    │   ├── CTA: "Kirim Pesanan via WhatsApp"
    │   └── Trust footer: garansi + payment methods
    │
    ├── [Social Proof Section]
    │   ├── Counter: "500+ Transaksi Sukses" (atau angka real)
    │   ├── Testimonial carousel (lebih dari 4, dengan avatar)
    │   └── Rating summary
    │
    ├── [FAQ Section] — Accordion, lebih lengkap
    │
    ├── [CTA Banner] — "Butuh Aplikasi Lain?"
    │
    └── [Footer] — Links, contact, social media, payment badges
```

### 5.2 Flow Alternatif: Direct Buy (Tanpa Cart)

```
User melihat plan → Klik "Beli Langsung"
    → Modal konfirmasi: "Pesan [Netflix Sharing 1 Profile - Bulanan] Rp 40.000?"
    → Input nama (jika belum di cart)
    → Redirect WhatsApp dengan format order otomatis
```

### 5.3 Flow Mobile-Specific

```
Landing (full-screen hero)
    → Scroll down: How it works (horizontal scroll cards)
    → App grid (2 kolom)
    → Tap app → Expand plans inline (accordion-style)
    → Tap "Pesan" → Bottom sheet cart
    → Checkout → WhatsApp redirect
```

### 5.4 Flow Error/Edge Cases

| Scenario | Handling |
|----------|----------|
| WhatsApp tidak terinstall | Fallback ke `wa.me` web link (sudah berfungsi) + tampilkan nomor WA untuk copy manual |
| JavaScript disabled | Server-rendered price list + nomor WA visible di HTML |
| Cart kosong → checkout | Disable tombol, tampilkan hint "Tambahkan item ke keranjang" |
| Stok habis (future) | Badge "Stok Habis" di plan card, disable tombol beli |
| Nama pembeli kosong | Inline validation, focus ke input field |

---

## 6. Feature Requirements (MoSCoW)

### 6.1 Must Have (P0) — Launch Blockers

| # | Feature | Deskripsi | Justifikasi |
|---|---------|-----------|-------------|
| M1 | **Brand identity baru** | Logo, color palette konsisten (tidak berubah per app), typography system | Identitas = kepercayaan |
| M2 | **Simplified navigation** | Hapus category pills + sort, ganti dengan app grid cards langsung | 4 produk tidak butuh 3 level filter |
| M3 | **Comparison table per app** | Tabel side-by-side plans per aplikasi (harga, durasi, fitur, device limit) | Mempermudah keputusan beli |
| M4 | **How it works section** | 3-step visual: Pilih → Bayar → Terima Akun | Mengurangi friction user baru |
| M5 | **Trust signals above the fold** | Jumlah transaksi, garansi badge, payment method icons di hero area | Conversion critical |
| M6 | **Mobile-first responsive design** | Touch targets ≥44px, proper spacing, bottom sheet cart, no overflow | 80%+ traffic likely mobile |
| M7 | **Payment method badges** | Visual badges: QRIS, DANA, GoPay, OVO, ShopeePay, Transfer Bank | Trust signal |
| M8 | **Analytics integration** | Google Analytics 4 / Plausible — track page views, CTA clicks, WA redirects | Tidak bisa improve tanpa data |
| M9 | **Improved CTA copy** | Ganti "Beli Langsung" → "Pesan Sekarang", hapus ikon WA dari tombol utama | Mengurangi friction psikologis |
| M10 | **SEO essentials** | Proper title, meta description, Open Graph tags, structured data (Product schema) | Organic discovery |
| M11 | **Accessible design** | Semantic HTML, ARIA labels, keyboard navigation, color contrast ≥4.5:1 | Inklusivitas + SEO benefit |
| M12 | **Improved FAQ** | Minimal 8 FAQ items: mencakup garansi, cara pesan, perbedaan plan, refund, payment, device support, durasi, request app | Mengurangi beban chat WA |

### 6.2 Should Have (P1) — Post-Launch Sprint 1

| # | Feature | Deskripsi | Justifikasi |
|---|---------|-----------|-------------|
| S1 | **JSON-based product data** | Pindahkan `appsData` ke file `products.json` yang di-fetch, atau ke CMS sederhana | Manajemen produk tanpa edit code |
| S2 | **Lebih banyak testimonial** | 8-12 testimonial, dengan screenshot bukti chat jika memungkinkan | Social proof lebih kuat |
| S3 | **Garansi explanation section** | Visual section yang menjelaskan kebijakan garansi dengan ikon dan step | Mengurangi keraguan |
| S4 | **Tailwind build tooling** | Tailwind CSS via build (PostCSS/Vite) + purge unused styles | Performance: CSS < 20KB |
| S5 | **Lazy loading images/icons** | Lazy load non-critical assets, defer Font Awesome | Performance |
| S6 | **Micro-interactions** | Subtle animations: card hover, button press, cart add feedback, accordion transition | Polish & delight |
| S7 | **WhatsApp order format improvement** | Order message yang lebih terstruktur dengan order ID, timestamp | Traceability |
| S8 | **Dark mode support** | System-preferred + manual toggle | Modern expectation |
| S9 | **Feature tooltip/explainer** | Tooltip atau popover untuk istilah ambigu ("Less Limit", "Anti On-Hold", "Semi Private") | Edukasi user |

### 6.3 Could Have (P2) — Future Iterations

| # | Feature | Deskripsi |
|---|---------|-----------|
| C1 | **PWA (Progressive Web App)** | Install prompt, offline katalog, push notification untuk promo |
| C2 | **Price calculator/bundler** | "Hitung total jika beli Netflix + Canva + CapCut" — bundle discount simulator |
| C3 | **Order status page** | Simple page dengan order ID lookup → status (diproses/selesai/garansi) |
| C4 | **Live chat widget** | Tawk.to / Crisp sebagai alternatif selain WhatsApp |
| C5 | **Blog/artikel** | Tips & tricks, tutorial, perbandingan plan — SEO content |
| C6 | **Referral system** | "Ajak teman, dapat diskon" — tracked via unique link |
| C7 | **Multi-language** | English version untuk reach lebih luas |
| C8 | **A/B testing framework** | Untuk test CTA copy, layout, pricing display |

### 6.4 Won't Have (Saat Ini)

| # | Feature | Alasan |
|---|---------|--------|
| W1 | **Payment gateway integration** | Over-engineering untuk skala saat ini; WhatsApp flow masih efektif |
| W2 | **User accounts / login** | Tidak ada recurring billing; WA-based flow lebih simpel |
| W3 | **Backend / database** | Static site dengan JSON data sudah cukup untuk 4 produk |
| W4 | **Automated delivery** | Memerlukan infrastruktur akun management yang kompleks |
| W5 | **Mobile app** | PWA sudah cukup; native app prematur untuk skala ini |

---

## 7. Non-Functional Requirements

### 7.1 Performance

| Metric | Target | Catatan |
|--------|--------|---------|
| **First Contentful Paint (FCP)** | < 1.5s (WiFi), < 3s (3G) | Prioritaskan critical CSS inline |
| **Largest Contentful Paint (LCP)** | < 2.5s | Hero section harus load cepat |
| **Cumulative Layout Shift (CLS)** | < 0.1 | Dimensi gambar/font harus di-set |
| **Total Blocking Time (TBT)** | < 200ms | Minimize JS execution |
| **Total page weight** | < 500KB (initial load) | Termasuk CSS, JS, fonts, images |
| **Lighthouse Performance Score** | > 90 | Diukur di mobile emulation |

### 7.2 Accessibility (WCAG 2.1 Level AA)

- Semua teks memenuhi contrast ratio ≥ 4.5:1 (normal text) dan ≥ 3:1 (large text)
- Touch target minimum 44×44px di mobile
- Full keyboard navigation support
- Screen reader compatible (semantic HTML, ARIA labels)
- Focus indicators visible
- Reduced motion support (`prefers-reduced-motion`)
- Form inputs dengan label, error message, dan validation yang accessible

### 7.3 SEO

- Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Structured data: `Product` dan `FAQPage` schema (JSON-LD)
- Open Graph + Twitter Card meta tags lengkap
- Canonical URL
- Sitemap.xml
- robots.txt
- Alt text untuk semua gambar
- Heading hierarchy yang benar (h1 → h2 → h3, tidak skip)

### 7.4 Browser Support

| Browser | Versi Minimum |
|---------|---------------|
| Chrome (Android) | 2 versi terakhir |
| Safari (iOS) | 2 versi terakhir |
| Samsung Internet | 2 versi terakhir |
| Chrome (Desktop) | 2 versi terakhir |
| Firefox (Desktop) | 2 versi terakhir |
| Edge (Desktop) | 2 versi terakhir |

> Prioritas: **Android Chrome** (mayoritas user Indonesia)

### 7.5 Hosting & Deployment

- Tetap di **Vercel** (static deployment)
- Build via **Vite** (jika adopsi build tooling)
- CI/CD: Push ke `main` → auto deploy
- Preview deployment untuk PR (built-in Vercel)

---

## 8. Content Strategy

### 8.1 Messaging & Tone of Voice

| Aspek | Guideline |
|-------|-----------|
| **Bahasa** | Bahasa Indonesia casual-profesional, boleh campur bahasa gaul tapi tidak berlebihan |
| **Tone** | Ramah, jujur, transparan — "teman yang bantu", bukan "perusahaan yang jualan" |
| **Terminologi** | Hindari jargon teknis tanpa penjelasan; "Less Limit" harus dijelaskan apa artinya |
| **CTA** | Action-oriented, jelas: "Pesan Sekarang", "Lihat Paket", "Chat Admin" |
| **Trust** | Selalu sertakan garansi dan durasi di dekat harga |

### 8.2 Content Sections yang Dibutuhkan

#### Hero Section
```
Headline: "Akun Premium Terpercaya, Harga Terjangkau"
Subheadline: "Netflix, Canva, CapCut & Bstation — mulai dari Rp 4.000/bulan. Full garansi."
CTA Primary: "Lihat Katalog"
CTA Secondary: "Chat Admin"
Trust bar: [QRIS] [DANA] [GoPay] [OVO] [ShopeePay] — "500+ Transaksi Sukses"
```

#### How It Works
```
Step 1: 🛒 Pilih Aplikasi & Paket
  "Bandingkan fitur dan harga, pilih yang sesuai kebutuhan"

Step 2: 💬 Konfirmasi via WhatsApp
  "Pesanan otomatis terformat, tinggal kirim & bayar"

Step 3: ✅ Terima Akun (5-15 Menit)
  "Login & nikmati. Full garansi selama durasi paket"
```

#### Penjelasan Tipe Plan (Baru)
```
📦 Sharing Profile
  → 1 profile di 1 device (tidak boleh pindah)
  → Harga paling murah
  → Cocok untuk: pemakaian rutin di 1 HP/laptop

🔒 Semi Private
  → 1 profile, bisa login di 2 device
  → Anti limit, lebih fleksibel
  → Cocok untuk: yang punya HP + laptop

👑 Private
  → Akun sendiri, full control
  → Device bebas, tanpa batasan
  → Cocok untuk: yang butuh fleksibilitas maksimal
```

#### Garansi Section
```
🛡️ Garansi Penuh Selama Durasi Paket
  → Login bermasalah? Kami bantu perbaiki
  → Akun terputus? Diganti akun baru
  → Cukup screenshot → kirim ke WA Admin
  → Response time: 5-15 menit (jam operasional)
```

#### FAQ Expansion (Minimal 8 Items)
1. Bagaimana cara memesan & proses transaksinya?
2. Bagaimana kebijakan garansi jika akun bermasalah?
3. Apa perbedaan Sharing, Semi Private, dan Private?
4. Metode pembayaran apa saja yang diterima?
5. **Berapa lama proses setelah pembayaran?** (BARU)
6. **Apakah bisa request aplikasi yang belum tersedia?** (BARU)
7. **Apakah aman? Bagaimana jaminan keamanan data?** (BARU)
8. **Bisa perpanjang otomatis atau harus order ulang?** (BARU)
9. **Apakah ada harga khusus untuk pembelian banyak?** (BARU)
10. **Jam operasional admin berapa?** (BARU)

### 8.3 Visual Content yang Dibutuhkan

| Asset | Deskripsi | Prioritas |
|-------|-----------|-----------|
| **Logo Cozu Store** | Wordmark atau logo mark, format SVG | P0 |
| **Favicon** | 16x16, 32x32, 180x180 (Apple Touch), manifest icons | P0 |
| **App icons/illustrations** | Custom icons untuk Netflix, Canva, Bstation, CapCut — bukan Font Awesome generic | P1 |
| **Payment method badges** | QRIS, DANA, GoPay, OVO, ShopeePay, BCA, Mandiri, BRI, BNI — SVG badges | P0 |
| **Hero illustration** | Abstract/gradient illustration yang merepresentasikan "digital premium" | P1 |
| **Step icons** | 3 ikon untuk "How it Works" section | P0 |
| **Garansi badge/shield** | Visual badge garansi | P0 |
| **Open Graph image** | 1200×630px untuk sharing di social media | P0 |

---

## 9. Competitive Analysis Summary

### 9.1 Landscape Kompetitor

Reseller akun premium di Indonesia beroperasi melalui berbagai channel:

| Channel | Contoh | Kelebihan | Kekurangan |
|---------|--------|-----------|------------|
| **Marketplace** (Lazada, Tokopedia) | Banyak seller | Trust (escrow), traffic tinggi, rating system | Fee marketplace 5-15%, price war ketat, Netflix Rp 16.000/bulan di Lazada |
| **Social Media** (Twitter/X, Instagram) | @AlphaStore13, dll | Zero cost, direct relationship | Tidak ada trust mechanism, mudah scam |
| **Website Dedicated** | Cozu Store, JoinBareng | Brand building, full control | Butuh effort SEO/marketing sendiri |
| **Platform Sharing** | JoinBareng.com | Legal positioning, escrow system | Lebih mahal, model berbeda |

### 9.2 Keunggulan Kompetitif Cozu Store

| Aspek | Cozu Store | Marketplace Sellers | Social Media Sellers |
|-------|------------|--------------------|--------------------|
| **Brand identity** | ❌ Lemah (setelah redesign: ✅) | ❌ Generik | ❌ Personal brand |
| **Harga** | Kompetitif (Rp 4K-45K) | Sedikit lebih murah (Rp 15K-48K Netflix) | Bervariasi |
| **Garansi** | ✅ Full garansi durasi | ✅ Marketplace guarantee | ❌ Tidak jelas |
| **UX/Katalog** | ❌ Perlu redesign | ✅ Standard marketplace | ❌ Thread/story |
| **Kecepatan layanan** | ✅ 5-15 menit (per testimonial) | ⚠️ Bervariasi | ⚠️ Bervariasi |
| **Payment** | ✅ QRIS + semua e-wallet | ✅ Marketplace payment | ⚠️ Transfer manual |

### 9.3 Competitive Gap Analysis

**Hal yang perlu ditiru dari kompetitor terbaik:**
1. ✅ **Comparison table** — Lazada sellers punya tabel perbandingan plan
2. ✅ **Visual trust signals** — Rating, jumlah sold, verified seller badge
3. ✅ **Product images** — Screenshot aplikasi, mockup device
4. ⚠️ **Order tracking** — Bisa via simple WA status update (tidak perlu sistem)
5. ⚠️ **Review system** — Bisa screenshot testimonial WA, display lebih banyak

**Hal yang TIDAK perlu ditiru (over-engineering):**
- Payment gateway integration (WhatsApp flow sudah cukup)
- User account system (tidak ada recurring billing)
- Live chat widget (WhatsApp sudah serve tujuan ini)
- Full e-commerce platform (produk hanya 4 app)

---

## 10. Phased Rollout Plan

### Phase 0: Foundation (Minggu 1-2)

**Objective:** Pasang analytics & baseline measurement sebelum redesign.

| Task | Detail | Owner | Deliverable |
|------|--------|-------|-------------|
| Pasang Google Analytics 4 | Tag page views, CTA clicks, WA redirect events | Dev | GA4 dashboard |
| Audit Lighthouse scores | Performance, Accessibility, SEO, Best Practices | Dev | Baseline report |
| Buat brand guideline dasar | Warna, font, logo placeholder | Design | Brand doc |
| Setup build tooling | Vite + Tailwind CSS build | Dev | `package.json`, build pipeline |

**Exit Criteria:** Analytics berjalan ≥7 hari, baseline data tercatat, build tooling siap.

---

### Phase 1: Core Redesign (Minggu 3-5) ⭐ MVP

**Objective:** Launch redesign dengan semua Must Have features.

| Task | Detail | Estimasi |
|------|--------|----------|
| **Brand identity** | Warna konsisten, typography system, logo | 2 hari |
| **Layout restructure** | Hapus triple-filter, buat app grid + inline plans | 3 hari |
| **Hero section baru** | Value prop + trust signals + CTA above fold | 1 hari |
| **How it works** | 3-step visual section | 0.5 hari |
| **Comparison table** | Per-app plan comparison dengan highlight best seller | 2 hari |
| **Trust signals** | Payment badges, garansi badge, transaction counter | 1 hari |
| **Mobile-first responsive** | Bottom sheet cart, proper touch targets, no overflow | 2 hari |
| **Improved CTA** | Copy, styling, placement optimization | 0.5 hari |
| **Expanded FAQ** | 8-10 items | 0.5 hari |
| **Plan type explainer** | Visual section: Sharing vs Semi Private vs Private | 0.5 hari |
| **SEO basics** | Meta tags, structured data, OG tags | 1 hari |
| **Accessibility pass** | Semantic HTML, ARIA, contrast, keyboard nav | 1 hari |
| **QA & testing** | Cross-browser, mobile devices, WA flow | 2 hari |

**Total estimasi: ~17 hari kerja (3.5 minggu)**

**Exit Criteria:**
- Lighthouse scores: Performance > 85, Accessibility > 80, SEO > 90
- Semua CTA → WhatsApp flow berfungsi
- Mobile responsive di viewport 320px - 1440px
- 0 critical accessibility issues

---

### Phase 2: Polish & Optimize (Minggu 6-8)

| Task | Detail |
|------|--------|
| **JSON product data** | Migrasi `appsData` ke `products.json`, fetch at build time |
| **More testimonials** | Kumpulkan & display 8-12 testimonial |
| **Micro-interactions** | CSS transitions, hover effects, toast animations |
| **Dark mode** | `prefers-color-scheme` support + manual toggle |
| **Feature tooltips** | Explainer untuk "Less Limit", "Anti On-Hold", dll |
| **Performance tuning** | Font subsetting, critical CSS inline, image optimization |
| **A/B test setup** | Minimal CTA copy A/B test (jika traffic cukup) |

---

### Phase 3: Growth (Minggu 9-12+)

| Task | Detail |
|------|--------|
| **PWA** | Service worker, install prompt, offline katalog |
| **Blog/SEO content** | Artikel "Cara Berlangganan Netflix Murah", dll |
| **Price calculator** | Bundle discount simulator |
| **Order tracking** | Simple order ID lookup page |
| **Referral system** | Unique referral links |

---

## 11. Risks & Mitigations

| # | Risk | Impact | Probability | Mitigation |
|---|------|--------|-------------|------------|
| R1 | **Redesign menurunkan conversion sementara** | High | Medium | A/B test jika traffic cukup; jika tidak, pastikan WA flow identik; siapkan rollback ke versi lama |
| R2 | **Brand color baru tidak diterima user** | Medium | Low | Pilih warna yang netral-profesional (biru/ungu); test dengan 5-10 existing customer via WA poll |
| R3 | **Analytics menunjukkan baseline sangat rendah** | Medium | Medium | Fokus pada absolute metrics (WA clicks/day) bukan persentase; set realistic targets |
| R4 | **Mobile performance turun karena fitur baru** | High | Medium | Performance budget ketat: < 500KB initial load; test di device low-end (Android Go) |
| R5 | **Kompetitor di marketplace lebih murah** | Medium | High | Diferensiasi via UX, kecepatan layanan, garansi — bukan price war |
| R6 | **Penambahan produk baru memerlukan redesign** | Low | Medium | Arsitektur data-driven (JSON) dari Phase 2; layout yang scalable untuk 4-10 produk |
| R7 | **WhatsApp API changes / rate limiting** | Medium | Low | Monitor WhatsApp Business API updates; siapkan fallback (nomor WA visible untuk copy manual) |
| R8 | **Legal risk — reselling premium accounts** | High | Low-Medium | Di luar scope teknis; owner harus konsultasi legal; situs tidak boleh claim "resmi/legal" |

---

## 12. Open Questions

| # | Pertanyaan | Stakeholder | Status |
|---|-----------|-------------|--------|
| Q1 | **Apakah ada data traffic saat ini?** Berapa visitor/hari, dari mana sumbernya? | Owner | ❓ Belum dijawab |
| Q2 | **Berapa jumlah transaksi aktual per bulan?** Untuk validasi "500+ transaksi" claim | Owner | ❓ |
| Q3 | **Apakah ada rencana menambah produk baru?** (Spotify, YouTube Premium, Disney+) Mempengaruhi arsitektur | Owner | ❓ |
| Q4 | **Apakah ada budget untuk custom logo/branding?** Atau pakai AI-generated / self-made? | Owner | ❓ |
| Q5 | **Apakah WhatsApp Business API digunakan?** Atau nomor personal biasa? | Owner | ❓ |
| Q6 | **Jam operasional admin?** Untuk ditampilkan di situs & auto-reply setting | Owner | ❓ |
| Q7 | **Apakah ada screenshot testimonial tambahan dari chat WA?** Untuk konten social proof | Owner | ❓ |
| Q8 | **Apakah ada kebijakan harga grosir/reseller?** Untuk persona tersier | Owner | ❓ |
| Q9 | **Domain custom?** Atau tetap di `cozu-store.vercel.app`? Custom domain = trust ↑ | Owner | ❓ |
| Q10 | **Target timeline launch?** Apakah ada event/momen tertentu (Ramadan, tahun ajaran baru)? | Owner | ❓ |

---

## Appendix A: Wireframe Sketsa Layout Baru

```
┌──────────────────────────────────────────┐
│  🏪 COZU STORE          [Cart 🛒]       │
├──────────────────────────────────────────┤
│                                          │
│   Akun Premium Terpercaya               │
│   Harga Terjangkau                      │
│                                          │
│   Netflix • Canva • CapCut • Bstation   │
│   Mulai Rp 4.000/bulan • Full Garansi   │
│                                          │
│   [Lihat Katalog]    [Chat Admin]       │
│                                          │
│   ─── 500+ Transaksi ─── QRIS ─── DANA │
│                                          │
├──────────────────────────────────────────┤
│  ─── CARA PESAN ───                     │
│                                          │
│  ① Pilih    ② Bayar    ③ Terima        │
│  Paket      via WA     5-15 min         │
│                                          │
├──────────────────────────────────────────┤
│  ─── KATALOG ───                        │
│                                          │
│  ┌─────────┐ ┌─────────┐               │
│  │ Netflix │ │ Canva   │               │
│  │ 🎬      │ │ 🎨      │               │
│  │ Rp 6K+  │ │ Rp 4K+  │               │
│  └─────────┘ └─────────┘               │
│  ┌─────────┐ ┌─────────┐               │
│  │ CapCut  │ │Bstation │               │
│  │ ✂️      │ │ 📺      │               │
│  │ Rp 12K+ │ │ Rp 8K   │               │
│  └─────────┘ └─────────┘               │
│                                          │
│  ▼ Netflix Plans (expanded)             │
│  ┌──────────────────────────────────┐   │
│  │ Plan      │ Harga  │ Durasi │ 🛒│   │
│  │───────────│────────│────────│───│   │
│  │ Sharing   │ Rp 6K  │ Harian │ + │   │
│  │ Sharing   │ Rp 16K │ Minggu │ + │   │
│  │ Sharing ⭐│ Rp 40K │ Bulan  │ + │   │
│  │ Semi Priv │ Rp 45K │ Bulan  │ + │   │
│  └──────────────────────────────────┘   │
│                                          │
├──────────────────────────────────────────┤
│  ─── TIPE PAKET ───                     │
│                                          │
│  📦 Sharing    🔒 Semi Private  👑 Private │
│  1 device     2 device        Bebas    │
│  Termurah     Fleksibel       Full     │
│                                          │
├──────────────────────────────────────────┤
│  ─── TESTIMONI ───                      │
│                                          │
│  ← "pelayannya cepett bgt..." - Yuppy → │
│                                          │
├──────────────────────────────────────────┤
│  ─── GARANSI ───                        │
│  🛡️ Full garansi selama durasi paket    │
│  Login error → Kami perbaiki            │
│  Akun putus → Ganti baru               │
│                                          │
├──────────────────────────────────────────┤
│  ─── FAQ (10 items) ───                 │
│  ▶ Cara memesan?                        │
│  ▶ Kebijakan garansi?                   │
│  ▶ Beda Sharing vs Private?             │
│  ▶ Metode pembayaran?                   │
│  ▶ ... (6 more)                         │
│                                          │
├──────────────────────────────────────────┤
│  ─── BUTUH APP LAIN? ───               │
│  Spotify, YT Premium, Disney+          │
│  [Chat Admin via WhatsApp]              │
│                                          │
├──────────────────────────────────────────┤
│  Footer: Links • Contact • Social      │
│  Payment: QRIS DANA GoPay OVO BCA      │
│  © 2026 Cozu Store                      │
└──────────────────────────────────────────┘
```

---

## Appendix B: Design Token Recommendations

```css
/* === BRAND COLORS === */
--cozu-primary: #6366F1;       /* Indigo — profesional, netral, tidak tied ke app manapun */
--cozu-primary-hover: #4F46E5;
--cozu-primary-light: #EEF2FF;
--cozu-secondary: #10B981;     /* Emerald — untuk success/garansi */
--cozu-accent: #F59E0B;        /* Amber — untuk best seller badge */

/* === NEUTRAL PALETTE === */
--cozu-bg: #FAFBFC;
--cozu-surface: #FFFFFF;
--cozu-border: #E2E8F0;
--cozu-text-primary: #0F172A;
--cozu-text-secondary: #64748B;
--cozu-text-muted: #94A3B8;

/* === APP-SPECIFIC (subtle, hanya untuk ikon/badge, bukan seluruh UI) === */
--app-netflix: #E50914;
--app-canva: #00C4CC;
--app-bstation: #00A1D6;
--app-capcut: #1E293B;

/* === TYPOGRAPHY === */
--font-heading: 'Plus Jakarta Sans', system-ui, sans-serif;
--font-body: 'Inter', system-ui, sans-serif;

/* === SPACING SCALE (4px base) === */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;

/* === RADIUS === */
--radius-sm: 6px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-full: 9999px;

/* === SHADOWS === */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05);
--shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04);
```

---

## Appendix C: Structured Data Template

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Cozu Store",
  "url": "https://cozu-store.vercel.app/",
  "description": "Jual akun premium Netflix, Canva, CapCut, Bstation murah dan bergaransi",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://cozu-store.vercel.app/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Bagaimana cara memesan akun premium di Cozu Store?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pilih aplikasi dan paket yang diinginkan, klik Pesan Sekarang, lalu konfirmasi dan bayar via WhatsApp. Akun akan diproses dalam 5-15 menit."
      }
    }
  ]
}
```

---

*Dokumen ini adalah living document dan akan di-update seiring perkembangan proyek. Versi terbaru selalu ada di repository.*
