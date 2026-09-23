# Blast Radius & Risk Assessment: Category Filters & Smart Sorting Engine

## 1. Impact Matrix

| Component | Nature of Impact | Risk Level | Mitigation |
|---|---|---|---|
| `script.js` (`appsData`) | Menambahkan properti `category` dan `popularityScore` | **Low** | Backward compatible, tidak mengubah struktur `plans` atau cart logic. |
| `script.js` (`getFilteredApps`) | Di-upgrade menjadi `getFilteredAndSortedApps` | **Low** | Didukung test suite unit testing menyeluruh. |
| `index.html` (Hero & Filter Bar) | Penambahan category pills & dropdown sortir | **Low** | Menggunakan markup modular dan semantic. |
| `styles.css` | Penambahan class tab pill aktif & animasi transisi | **Low** | Tidak bertabrakan dengan CSS yang sudah ada. |
| Cart & Checkout System | Tanpa perubahan logika keranjang / WhatsApp | **None** | Fitur keranjang belanja dan format pesan WA tetap 100% utuh. |

---

## 2. Failure Mode & Fallback
- Jika kategori tidak memiliki produk, badge menampilkan `(0)` atau filter otomatis kembali ke `Semua`.
- Jika kombinasi search + filter menghasilkan 0 produk, sistem menampilkan kartu *"Produk Tidak Ditemukan"* lengkap dengan tombol *"Reset Filter"*.
