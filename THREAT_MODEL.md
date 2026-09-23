# Threat Model & STRIDE Analysis: Category Filters & Smart Sorting Engine

## 1. System Overview & Trust Boundaries
Komponen pemfilteran dan penyortiran memproses input string kata kunci dan enum dropdown di memory JavaScript peramban pengguna.

---

## 2. STRIDE Assessment Matrix

| STRIDE Category | Threat Description | Severity | Mitigation Strategy | Status |
|---|---|---|---|---|
| **Spoofing** | Manipulasi input kategori atau sortir | **Low** | Nilai input divalidasi dan di-match terhadap array data lokal yang aman. | **Mitigated** |
| **Tampering** | Injeksi script ke dalam search bar | **Low** | Pencarian hanya melakukan substring match terhadap data objek dan string hasil di-escape. | **Mitigated** |
| **Denial of Service** | Regex denial of service (ReDoS) | **Low** | Pencarian menggunakan `String.prototype.includes()` murni tanpa regular expression berbahaya. | **Mitigated** |

---

## 3. Residual Risks
- Tidak ditemukan kerentanan keamanan level sedang atau tinggi.
