# PRD — Cozu Store v5 (Streaming-Style Dark Redesign)

## 1. Ringkasan
Redesign total ke bahasa visual **streaming premium** (referensi Amazon Prime Video):
dark near-black, satu aksen cyan, hero carousel otomatis, sidebar navigasi,
motion mulus di seluruh halaman. Tujuan: terlihat "toko berkelas" bukan template AI.

## 2. Masalah Saat Ini (v4)
1. **Warna buruk** — palet Gojo navy (#1E2134/#22254E) bercampur ungu-biru, aksen
   #5793AA redup → kesan murung & tidak premium.
2. **Animasi tak terlihat** — motion ada tapi redup/cepat, `prefers-reduced-motion`
   aktif di sebagian browser sehingga user melihat halaman statis.
3. **IA kurang jelas** — order section belum memprioritaskan konversi.
4. **Navigasi top-only** — desktop butuh sidebar agar rapi seperti app premium.

## 3. Goals & Metrik
| Goal | Metrik |
|---|---|
| Kesan premium (bukan AI-slop) | >80% user bilang "rapi/berkelas" di uji 5 orang |
| Konversi lebih cepat | Hero → CTA dalam 1 viewport; klik CTA naik |
| Motion mulus | 60fps, LCP <1.5s, CLS <0.05 |
| Navigasi jelas | waktu ke katalog <2 klik |

## 4. Target Audiens
Anak kos/mahasiswa (pembeli Netflix/Canva), pekerja muda, reseller. Mobilitas
tinggi → mobile-first penting.

## 5. Information Architecture (urutan baru)
```
Hero (carousel rekomendasi + intro brand Cozu Store)
  └ slide 1..4: Netflix / Canva / CapCut / Bstation
Testimoni (social proof)
Katalog produk (semua paket)
FAQ + Cara Pesan
CTA banner
Footer
```

## 6. Fitur (MoSCoW)

### Must-Have
- **Hero carousel** full-bleed, auto-advance 3 dtk seamless, pause on hover,
  dot progress + arrow, keyboard navigable.
- **Sidebar navigasi** (desktop): rail collapsible/hideable panel, icon→label
  expand, tombol toggle.
- **Mobile**: hamburger drawer + bottom nav (4-5 item).
- **Section order** baru (Hero → Testimoni → Katalog → FAQ → CTA → footer).
- **Motion** konsisten: scroll progress, scroll-reveal (once), parallax hero,
  hover/press, carousel transition — semua transform/opacity, reduced-motion safe.
- **Palet baru** (lihat Design.md): near-black + cyan.
- **SF font** tunggal.
- Pertahankan: checkout WhatsApp `6287862481038`, format order, semua id/data-*,
  `test_cart.js` 7 test pass.

### Should-Have
- Hover tilt halus pada kartu katalog.
- Badge "#1 Paling Laris" per app.
- Kontras teks WCAG AA di semua permukaan gelap.

### Could-Have
- Slide key-art per app (logo/artwork gradient).
- Progress bar resume-style di hero.

### Won't-Have (sekarang)
- Backend/akun user, payment gateway, Three.js WebGL scene.

## 7. Non-Functional
- **Perf**: bundle JS <160KB gzip, CSS <12KB gzip, no WebGL.
- **A11y**: fokus terlihat, target ≥44px, reduced-motion kolaps, aria carousel.
- **SEO**: JSON-LD, OG, sitemap, meta deskriptif (tetap).
- **Browser**: Chrome/Safari/Firefox modern + iOS Safari.

## 8. Fase
1. **F1** — PRD+Design disetujui, tokens + tailwind + sidebar + hero carousel + motion.
2. **F2** — Testimoni + Katalog (order baru) + de-slop sisa.
3. **F3** — polish kontras/pill + QA breakpoint + deploy Vercel.

## 9. Risiko
- `prefers-reduced-motion` menyembunyikan animasi (bukan bug, tapi harus terlihat
  sebagai fallback rapi).
- Carousel auto-advance vs aksesibilitas → beri pause on hover/focus.
- Sidebar collapsible vs mobile → dua pola berbeda, pastikan konsisten.
