# Product Requirements Document (PRD): Interactive Category Filters, Sorting Engine, & UI Modernization

## 1. Executive Summary & Objective
- **Problem**: Saat katalog produk bertambah, pelanggan membutuhkan cara cepat untuk memfilter aplikasi berdasarkan kategori (Streaming, Desain, Musik, AI), mengurutkan berdasarkan harga (termurah/termahal/terpopuler), dan menikmati tampilan katalog yang modern serta terstruktur rapi.
- **Proposed Solution**: 
  1. **Interactive Category Pills**: Tab kategori interaktif dengan badge counter jumlah produk (`Semua`, `Streaming Video`, `Desain & Kreatif`, `Musik & Audio`, `AI & Produktivitas`).
  2. **Smart Sorting Control**: Dropdown pengurutan (`Terpopuler`, `Harga Termurah`, `Harga Tertinggi`, `Nama A-Z`).
  3. **UI Modernization**: Mempercantik hero section dan toolbar pencarian sesuai referensi desain Cozu Store, dilengkapi transisi halus saat berganti kategori/sortir.
- **Target Audience**: Seluruh pengunjung dan pembeli Cozu Store di perangkat mobile & desktop.

---

## 2. User Stories & Acceptance Criteria

### User Story 1: Filter Kategori Cepat
- **As a** Pengunjung Cozu Store
- **I want to** Memilih tab kategori aplikasi (misal: hanya Streaming atau hanya Desain)
- **So that** Saya dapat langsung menemukan aplikasi yang relevan tanpa harus menelusuri seluruh katalog.
  - **Given**: Pelanggan berada di halaman utama.
  - **When**: Pelanggan menekan tab kategori "Streaming Video".
  - **Then**: Katalog hanya menampilkan aplikasi kategori streaming (Netflix, Bstation, dll) dan tab aktif menyala (*active pill state*).

### User Story 2: Sortir Harga & Popularitas
- **As a** Pelanggan pemburu harga hemat
- **I want to** Mengurutkan aplikasi dari harga terendah ke tertinggi
- **So that** Saya bisa melihat promo paling terjangkau terlebih dahulu.
  - **Given**: Dropdown sortir tersedia di sebelah kolom pencarian.
  - **When**: Pelanggan memilih "Harga Terendah".
  - **Then**: Kartu aplikasi disusun urut dari harga termurah.

### User Story 3: UI Modern Sesuai Mockup
- **As a** Pengguna
- **I want to** Melihat tata letak hero yang bersih, badge garansi yang eye-catching, dan 3 langkah pesan yang rapi
- **So that** Pengalaman belanja terasa premium, terpercaya, dan profesional.

---

## 3. Scope & Constraints
- **In-Scope**:
  - Penambahan field `category` pada tiap item di `appsData`.
  - Komponen UI Category Filter Pills dengan count badge.
  - Dropdown Sort Control (`popular`, `price-low`, `price-high`, `name-asc`).
  - Search + Filter + Sort terintegrasi secara real-time.
  - State kosong jika tidak ada hasil pencarian ("Aplikasi Tidak Ditemukan") + tombol reset.
- **Out-of-Scope**:
  - Backend server / database query (semua komputasi berjalan di client-side yang super instan).
