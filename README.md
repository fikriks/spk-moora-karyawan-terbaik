# Sistem Pendukung Keputusan (SPK) Penilaian Kinerja Pegawai

Aplikasi Sistem Pendukung Keputusan (SPK) untuk penilaian kinerja pegawai menggunakan metode **Multi-Objective Optimization on the Basis of Ratio Analysis (MOORA)**. Dibangun dengan Laravel 12, Inertia.js v2, dan React 18.

## Fitur Utama

- **Metode MOORA:** Implementasi lengkap tahapan MOORA (Matriks Keputusan, Normalisasi, Optimasi, hingga Perangkingan).
- **Multi-Role System:** Hak akses yang terbagi secara spesifik sesuai fungsi organisasi.
- **Reporting:** Export laporan penilaian ke format PDF dengan desain profesional.
- **Modern UI:** Antarmuka berbasis *Flat Soft Minimalism* dengan tema Emerald Green.
- **Responsive:** Optimal digunakan di perangkat desktop maupun mobile.

## Struktur Peran & Akses

| Peran | Label Antarmuka | Deskripsi Fungsi |
|-------|-----------------|------------------|
| **Admin** | Administrator | Manajemen user, kriteria, dan pemicu proses MOORA. |
| **Operator SIMPEG** | Operator SIMPEG | Manajemen data alternatif (pegawai) dan input nilai kriteria umum. |
| **Pengelola JKN** | Pengelola JKN | Input nilai penilaian kinerja pegawai. |
| **Kasubag TU** | Kasubag TU | Verifikasi penilaian, manajemen kriteria khusus, dan akses laporan. |
| **Bendahara Pengeluaran** | Bendahara Pengeluaran | Monitoring hasil penilaian dan akses laporan manajerial. |
| **Kepala Puskesmas** | Kepala Puskesmas | Review hasil akhir penilaian dan laporan perangkingan. |

## Teknologi

- **Backend:** Laravel 12.x (PHP 8.4)
- **Frontend:** React 18, Inertia.js v2, Tailwind CSS v3
- **Icons:** React Icons / Heroicons v2 (Outline)
- **Database:** MySQL / PostgreSQL / SQLite
- **PDF Export:** Barryvdh Laravel DOMPDF

## Instalasi

1. Clone repositori:
   ```bash
   git clone <repository-url>
   cd spk-app
   ```

2. Instal dependensi PHP:
   ```bash
   composer install
   ```

3. Instal dependensi JavaScript:
   ```bash
   npm install
   ```

4. Konfigurasi Environment:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. Migrasi dan Seeding Database:
   ```bash
   php artisan migrate:refresh --seed
   ```

6. Jalankan Server:
   ```bash
   # Terminal 1
   php artisan serve
   
   # Terminal 2
   npm run dev
   ```

## Akun Demo Default

- **Admin:** admin@example.com / Admin123
- **Operator:** operator@example.com / Operator123
- **Pengelola JKN:** pengelola@example.com / Pengelola123
- **Kasubag TU:** kasubag@example.com / Kasubag123
- **Kepala Puskesmas:** kepala@example.com / Kepala123

## Standar Pengembangan

Proyek ini mengikuti standar desain **Flat Soft Minimalism**:
- **Warna Utama:** Emerald Green (`emerald-500`)
- **Radius:** `rounded-3xl` untuk container utama, `rounded-2xl` untuk elemen interaktif.
- **Layout:** Menggunakan `AuthenticatedLayout` dengan pola breadcrumbs yang konsisten.
- **Pesan:** Menggunakan toast notifikasi (`notifySuccess`, `notifyError`) dan modal konfirmasi kustom.

---
© 2026 - Sistem Pendukung Keputusan Penilaian Kinerja
