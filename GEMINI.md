<laravel-boost-guidelines>
=== project status & updates ===

# Project Status & Architectural Guidelines

## Recent Updates (April 2026)
- **UI Label Standardization:**
    - **Renamed:** "Proses Perhitungan" -> "Proses Perhitungan Moora" (Sidebar menu, breadcrumbs, and page titles).
    - **Renamed:** "Hasil Moora" / "Laporan Hasil Perhitungan" -> "Laporan Hasil Perhitungan Moora" (Sidebar menu, breadcrumbs, and PDF header).
    - **Consistency:** Updated various action buttons and descriptions to use consistent "Moora" casing and descriptive labels.

## Recent Updates (March 2026)
- **Core Upgrade:** Migrated to **Laravel 12.x** and updated all ecosystem packages (Inertia v2, Sanctum v4, Breeze v2).
- **Role Refactoring & Addition:**
    - **Renamed Roles:**
        - `operator` -> `operator_simpeg` (Label: **Operator SIMPEG**)
        - `penilai` -> `pengelola_jkn` (Label: **Pengelola JKN**)
        - `kasubag_kepegawaian` -> `kasubag_tu` (Label: **Kasubag TU**)
        - `ketua_pengadilan` -> `bendahara_pengeluaran` (Label: **Bendahara Pengeluaran**)
    - **New Role:** Added `kepala_puskesmas` (Label: **Kepala Puskesmas**) with access to reports and overall summary dashboard.
- **Authentication:**
    - **Role-Based Redirection:** `AuthenticatedSessionController` redirects users to their specific dashboard based on the new role names.
    - **Middleware:** Web routes updated to use `role:operator_simpeg`, `role:pengelola_jkn`, etc.
- **Reporting & PDF:**
    - **Standardized Export:** Updated PDF export routes to `laporan.kasubag_tu.pdf` and `laporan.bendahara_pengeluaran.pdf`.
    - **PDF Templates:** Updated signatures and titles in Blade templates to match new organizational roles.
- **UI Design:**
    - **Style:** Flat Soft Minimalism.
    - **Primary Color:** Emerald Green (`emerald-500`).
    - **Background:** Soft Gray (`#F9FAFB`).
    - **Breadcrumbs & Titles:** Uniform header patterns across all modules using `AuthenticatedLayout` with proper role labels.
    - **Standard Page Patterns:**
        - **Dashboard Page Pattern:** (Using `StatCard`, `WinnerCard`, `ProgressBar`)
        - **Laporan Page Pattern:** (Using `Section` component and `MatrixTable`, `RankingTable`, etc.)
    - **Component Standards:**
        - **Radius:** `rounded-3xl` untuk card/container utama, `rounded-2xl` untuk tombol, input, dan elemen interaktif lainnya.
        - **Branding:** Logo aplikasi menggunakan format PNG (`/logo.png`) untuk mendukung transparansi dan detail visual yang lebih baik.
        - **Sidebar Header:** Menggunakan tata letak vertikal terpusat dengan logo berukuran menengah (`h-10`) dan teks "SPK Kinerja" di bawahnya dengan gaya font hitam (`font-black`) dan spasi lebar (`tracking-[0.2em]`).
        - **Shadows:** Gunakan shadow halus (e.g., `shadow-sm`, `shadow-lg shadow-emerald-500/20`).
        - **Icons:** Standarisasi pada `react-icons/hi2` (Heroicons v2), lebih disukai versi **Outline** (`HiOutline...`).
- **Development Fixes:**
    - **HandleInertiaRequests:** Standardized user roles sharing as `user.roles` (array). Frontend uses `user.roles[0]` for single role checks.
    - **Seeder:** `DatabaseSeeder` and `RolesAndPermissionsSeeder` updated to include all new roles and default test accounts.
    - **Testing:** All authentication tests updated to use `operator_simpeg` and other new role names.
