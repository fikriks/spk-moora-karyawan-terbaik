<laravel-boost-guidelines>
=== project status & updates ===

# Project Status & Architectural Guidelines

## Recent Updates (March 2026)
- **Core Upgrade:** Migrated to **Laravel 12.x** and updated all ecosystem packages (Inertia v2, Sanctum v4, Breeze v2).
- **Authentication:**
    - **Removed:** Email Verification and Forgot Password flows.
    - **Custom Logic:** Implemented role-based redirection in `AuthenticatedSessionController`.
    - **Routes:** The `/dashboard` route is active but primarily serves as a fallback.
- **UI Design:**
    - **Style:** Flat Soft Minimalism.
    - **Primary Color:** Emerald Green (`emerald-500`).
    - **Background:** Soft Gray (`#F9FAFB`).
    - **Page Header Pattern:**
        - `AuthenticatedLayout` focuses on navigation; it renders `Breadcrumbs` but NO automatic page title text.
        - Each page is responsible for its own title (`h2`) and description (`p`) below the breadcrumbs to maintain flexibility.
    - **Component Standards:**
        - **Radius:** `rounded-3xl` untuk card/container utama, `rounded-2xl` untuk tombol, input, dan elemen interaktif lainnya.
        - **Shadows:** Gunakan shadow halus (e.g., `shadow-sm`, `shadow-lg shadow-emerald-500/20`).
        - **Icons:** Standarisasi pada `react-icons/hi2` (Heroicons v2), lebih disukai versi **Outline** (`HiOutline...`).
        - **Standard Page Patterns:**
            - **Dashboard Page Pattern:**
                ```jsx
                // resources/js/Pages/Role/Index.jsx (Dashboard)
                import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
                import { Head, usePage, Link } from "@inertiajs/react";
                import { HiOutlineUserGroup, HiOutlineAdjustmentsHorizontal, HiOutlineClipboardDocumentCheck, HiOutlineCheckCircle } from "react-icons/hi2";

                function StatCard({ title, value, icon: Icon }) {
                    return (
                        <div className="bg-white rounded-[24px] border border-gray-100/80 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] group hover:border-emerald-100 transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2.5 rounded-xl bg-gray-50 group-hover:bg-emerald-50 transition-colors duration-300">
                                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors duration-300" />
                                </div>
                                <div className="h-1.5 w-1.5 rounded-full bg-gray-200 group-hover:bg-emerald-400 transition-colors" />
                            </div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">{title}</div>
                            <div className="text-2xl font-bold text-gray-800 tracking-tight">{value}</div>
                        </div>
                    );
                }

                export default function Dashboard() {
                    const { summary } = usePage().props;
                    return (
                        <div className="space-y-10">
                            <Head title="Dashboard" />
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                <StatCard title="Total Data" value={summary.total} icon={HiOutlineUserGroup} />
                                {/* ... more cards ... */}
                            </div>
                            {/* ... Content: ProgressBar, RankingTable with trophy icons, etc. ... */}
                        </div>
                    );
                }

                Dashboard.layout = (page) => (
                    <AuthenticatedLayout header="Dashboard" breadcrumbs={[{ label: "Dashboard", active: true }]}>
                        {page}
                    </AuthenticatedLayout>
                );
                ```

            - **Index Page Pattern:**
                ```jsx
                // resources/js/Pages/Module/Index.jsx
                import React, { useEffect, useMemo, useState } from "react";
                import { Link, usePage, router, Head } from "@inertiajs/react";
                import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
                import { HiOutlinePlus, HiOutlineMagnifyingGlass, HiOutlineXMark, HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";

                export default function Index() {
                    const { data: rawData, filters: initialFilters = {} } = usePage().props;
                    const [query, setQuery] = useState(initialFilters.q || "");
                    const [searching, setSearching] = useState(false);

                    useEffect(() => {
                        const id = setTimeout(() => {
                            if (query !== (initialFilters.q || "")) {
                                router.get(window.location.pathname, { q: query || undefined, page: 1 }, {
                                    preserveState: true, replace: true,
                                    onStart: () => setSearching(true),
                                    onFinish: () => setSearching(false),
                                });
                            }
                        }, 500);
                        return () => clearTimeout(id);
                    }, [query]);

                    return (
                        <div className="space-y-8">
                            <Head title="Kelola Data" />
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-black text-gray-800 tracking-tight">Kelola <span className="text-emerald-500">Data</span></h2>
                                    <p className="text-sm text-gray-500 font-medium max-w-md leading-relaxed">Deskripsi operasional modul di sini.</p>
                                </div>
                                <Link href={route("module.create")} className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 text-[13px] font-bold text-white hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
                                    <HiOutlinePlus className="h-4 w-4" /> Tambah Data
                                </Link>
                            </div>

                            <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] overflow-hidden">
                                <div className="p-6 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between gap-4">
                                    <div className="relative flex-1 max-w-md group">
                                        <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                                            <HiOutlineMagnifyingGlass className={`w-5 h-5 ${searching ? 'animate-pulse text-emerald-500' : ''}`} />
                                        </div>
                                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari data..." className="w-full pl-12 pr-10 py-3 bg-white border border-gray-100 rounded-2xl text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none" />
                                        {query && <button onClick={() => setQuery("")} className="absolute inset-y-0 right-4 flex items-center p-1 text-gray-300 hover:text-gray-500 transition-colors"><HiOutlineXMark className="w-4 h-4" /></button>}
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50/50">
                                                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Data</th>
                                                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 text-right">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            <tr className="group hover:bg-emerald-50/30 transition-colors">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 font-bold group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-all">J</div>
                                                        <span className="font-bold text-gray-700 uppercase tracking-tight group-hover:text-emerald-600 transition-colors leading-tight">John Doe</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link href={route("module.edit", 1)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all text-[11px] font-bold uppercase tracking-wider shadow-sm">
                                                            <HiOutlinePencilSquare className="w-3.5 h-3.5" /> <span>Edit</span>
                                                        </Link>
                                                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-100 transition-all text-[11px] font-bold uppercase tracking-wider shadow-sm">
                                                            <HiOutlineTrash className="w-3.5 h-3.5" /> <span>Hapus</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                {/* Footer with custom pagination style (like Operator module) */}
                            </div>
                        </div>
                    );
                }

                Index.layout = (page) => (
                    <AuthenticatedLayout header="Judul Modul" breadcrumbs={[{ label: "Modul", active: true }]}>
                        {page}
                    </AuthenticatedLayout>
                );
                ```

            - **Create/Edit Page Pattern:**
                ```jsx
                // resources/js/Pages/Module/Create.jsx atau Edit.jsx
                import React from "react";
                import { Head, usePage, Link } from "@inertiajs/react";
                import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
                import { HiOutlineArrowLeft } from "react-icons/hi2";

                export default function CreateOrEdit() {
                    const { data, auth } = usePage().props;
                    const isEdit = !!data;

                    return (
                        <>
                            <Head title={`${isEdit ? 'Edit' : 'Tambah'} Data`} />
                            <div className="space-y-8">
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-black text-gray-800 tracking-tight">
                                            {isEdit ? 'Edit' : 'Tambah'} <span className="text-emerald-500">Data</span>
                                        </h2>
                                        <p className="text-sm text-gray-500 max-w-md font-medium leading-relaxed">Penjelasan form di sini.</p>
                                    </div>
                                    <Link href={route("module.index")} className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-gray-100 text-[13px] font-bold text-gray-500 hover:bg-gray-50 hover:text-emerald-600 transition-all shadow-sm">
                                        <HiOutlineArrowLeft className="h-4 w-4" /> Kembali
                                    </Link>
                                </div>

                                <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] overflow-hidden">
                                    <div className="p-8 md:p-12">
                                        {/* Form dengan grid-cols-2 dan rounded-2xl inputs */}
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                }

CreateOrEdit.layout = (page) => (
                    <AuthenticatedLayout header="Modul" breadcrumbs={[{ label: "Modul", href: route("module.index") }, { label: "Aksi", active: true }]}>
                        {page}
                    </AuthenticatedLayout>
                );
                ```

            - **Nilai/Penilaian Index Pattern with Role-Based Locking:**
                ```jsx
                // resources/js/Pages/Kasubag/Nilai/Index.jsx or Ketua/Nilai/Index.jsx
                const restrictedCriteriaNames = ["Tanggung Jawab", "Kerja Sama Tim"];

                function canEdit(role, criteriaName) {
                    if (!criteriaName) return false;
                    const isRestricted = restrictedCriteriaNames.includes(criteriaName);
                    // Kasubag/Admin manages restricted criteria; Operator manages non-restricted
                    if (role === "operator") return !isRestricted;
                    return isRestricted;
                }

                // In table row:
                {allowedEdit ? (
                    <Link href={route("module.edit", item.id)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all text-[11px] font-bold uppercase tracking-wider shadow-sm">
                        <HiOutlinePencilSquare className="w-3.5 h-3.5" /> <span>Edit</span>
                    </Link>
                ) : (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 text-gray-300 border border-gray-100/50 text-[11px] font-bold uppercase tracking-wider cursor-not-allowed" title="Akses Dibatasi">
                        <HiOutlineLockClosed className="w-3.5 h-3.5" /> <span>Locked</span>
                    </div>
                )}
                ```

            - **Laporan/Report Page Pattern:**
                ```jsx
                // resources/js/Pages/Kasubag/Laporan/Index.jsx or Ketua/Laporan/Index.jsx
                import { HiOutlineDocumentText, HiOutlinePresentationChartLine, HiOutlineCalculator, HiOutlineArrowDownTray, HiOutlineStar, HiOutlineCheckCircle } from "react-icons/hi2";

                function Section({ title, description, icon: Icon, children }) {
                    return (
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-emerald-500 border border-gray-100 shadow-sm">
                                    {Icon && <Icon className="w-6 h-6" />}
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-gray-800 tracking-tight">{title}</h3>
                                    {description && <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{description}</p>}
                                </div>
                            </div>
                            <div className="overflow-x-auto custom-scrollbar">
                                {children}
                            </div>
                        </div>
                    );
                }

                export default function Laporan({ steps }) {
                    return (
                        <div className="space-y-8 pb-20">
                            <Head title="Laporan Hasil Penilaian" />
                            {/* Header with Export PDF */}
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-black text-gray-800 tracking-tight">
                                        Laporan <span className="text-emerald-500">Hasil Penilaian</span>
                                    </h2>
                                    <p className="text-sm text-gray-500 max-w-md font-medium leading-relaxed">...</p>
                                </div>
                                <a href={route("laporan.pdf")} target="_blank" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 text-[13px] font-bold text-white hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
                                    <HiOutlineArrowDownTray className="h-4 w-4" /> Export PDF
                                </a>
                            </div>
                            {/* Content Card */}
                            <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] overflow-hidden">
                                <div className="p-8 md:p-12 space-y-12">
                                    <Section title="Pendahuluan" icon={HiOutlineInformationCircle} description="...">
                                        <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100/50">...</div>
                                    </Section>
                                    {/* More sections... */}
                                </div>
                            </div>
                        </div>
                    );
                }
                ```

            - **WinnerCard Dashboard Component:**
                ```jsx
                // Used in Ketua/Index.jsx for top performer display
                function WinnerCard({ data }) {
                    if (!data) return null;
                    const initials = data.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

                    return (
                        <div className="relative overflow-hidden bg-emerald-600 rounded-[32px] p-8 md:p-10 text-white shadow-xl shadow-emerald-200/50 group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                <HiOutlineTrophy className="w-48 h-48" />
                            </div>
                            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
                            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                                <div className="flex-shrink-0">
                                    <div className="w-24 h-24 rounded-[28px] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl font-black text-white shadow-inner">
                                        {initials}
                                    </div>
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-400/20 border border-emerald-400/30 text-[11px] font-bold uppercase tracking-widest text-emerald-50">
                                        <HiOutlineSparkles className="w-3.5 h-3.5" /> Rekomendasi Utama
                                    </div>
                                    <h3 className="text-3xl font-black tracking-tight">{data.name}</h3>
                                    <p className="text-emerald-100/80 font-medium">{data.jabatan}</p>
                                </div>
                            </div>
                        </div>
                    );
                }
                ```

            - **Form Component Pattern (AlternativeForm/NilaiAlternativeForm):**
                ```jsx
                // Standard form input with icon prefix
                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">
                        Label Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                            <HiOutlineUser className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            value={form.data.field}
                            onChange={(e) => form.setData("field", e.target.value)}
                            className={`block w-full pl-12 pr-4 py-4 bg-gray-50/50 border rounded-2xl text-sm transition-all outline-none ${
                                form.errors.field
                                    ? "border-rose-200 focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500"
                                    : "border-gray-100 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                            }`}
                            placeholder="Placeholder text"
                            required
                        />
                    </div>
                    {form.errors.field && (
                        <p className="text-[11px] font-bold text-rose-500 uppercase tracking-wider ml-1">
                            {form.errors.field}
                        </p>
                    )}
                </div>

                // Standard submit button
                <div className="flex items-center justify-end pt-6 border-t border-gray-50">
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500 text-sm font-bold text-white hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-500/20"
                        disabled={form.processing}
                    >
                        {form.processing ? (
                            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <HiOutlineCheckCircle className="h-5 w-5" />
                        )}
                        <span>{form.processing ? "Menyimpan..." : "Simpan Data"}</span>
                    </button>
                </div>
                ```

        - **Operator Alternative Module:**
            - **Index:** Redesigned with Admin Dashboard reference: `rounded-[32px]` cards, `HiOutline` icons, and emerald-themed hover effects.
            - **Forms:** Unified `AlternativeForm` with internal icons (`HiOutlineIdentification`, `HiOutlineUser`, `HiOutlineBriefcase`), spacious padding, and high-affordance emerald action buttons.
            - **Layout:** Fully integrated with `AuthenticatedLayout` breadcrumbs, ensuring consistent page titles and navigational flow.
        - **Notifications & Alerts:**
            - **Jangan gunakan SweetAlert.**
            - Gunakan `notifySuccess(message)` atau `notifyError(message)` dari `@/Utils/useToast` untuk toast (kanan atas).
            - Gunakan `confirmAction(message, onConfirm, options)` dari `@/Utils/useConfirm` untuk modal konfirmasi (pola callback).
    - **Responsiveness:** Overhauled `AuthenticatedLayout` with a focus on mobile-first navigation, featuring a smooth mobile drawer, overlay, and optimized spacing for small screens. (Critical)
- **Development Fixes:**
    - PHPUnit is configured with CSRF exceptions in `bootstrap/app.php` specifically for the testing environment to ensure session stability.
    - **Alternative Seeder:** Refactored `AlternativeSeeder` to generate realistic Indonesian NIPs (18 digits following official format: Birth Date + CPNS TMT + Gender + Sequence) using `id_ID` Faker.
- **Administrative Modules:**
    - **Profile Management:** Redesigned with Emerald theme, `rounded-3xl` cards, input icons (`HiOutlineUser`, `HiOutlineEnvelope`, `HiOutlineLockClosed`), and standardized `AuthenticatedLayout` breadcrumbs integration. **Removed "Delete Account" section and standardized all input fields to match project-wide form patterns.**
    - **Criteria Management:** Standardized Full CRUD with Emerald theme, `CriteriaForm` component, and `CriterionRequest` validation.
    - **MOORA Process:** Standardized calculation workflow and results visualization with modern table components (`MatrixTable`, `DenominatorTable`, `OptimizationTable`, `RankingTable`) and PDF export.
    - **Alternative Management:** Standardized `Admin/Alternative` to match the visual and structural pattern of `Admin/Users`. This includes the use of `HiOutline` icons, unified table layouts, and integrated breadcrumbs.
    - **Penilai Dashboard:** Redesigned `Penilai/Index` with Admin Dashboard reference: `StatCard` components, modern `ProgressBar`, and a limited table view (top 5 items) with "View All" functionality for better vertical spacing.
    - **Kasubag Dashboard & Modules:** Redesigned with `StatCard`, `WinnerCard`, and `ProgressBar` components. Nilai module uses role-based edit locking where Kasubag manages restricted criteria ("Tanggung Jawab", "Kerja Sama Tim") while Operator manages other criteria.
    - **Ketua Dashboard & Modules:** Redesigned with full emerald theming, `StatCard` components, `WinnerCard` for top performer, and comprehensive report page with Section components. Laporan module supports PDF export with professional styling.
    - **Search UI:** Enforced `type="text"` for all search inputs to prevent browser-native conflicts and ensure a consistent custom clear-button experience.

- **Standard Components:**
    - **Buttons:** Standardized `PrimaryButton` (Emerald-500), `SecondaryButton` (White/Emerald focus), and `DangerButton` (Red-500) with `rounded-2xl`, bold fonts, and soft shadow utilities.
    - **Icons:** Integrated `react-icons/hi2` consistently across all buttons and input fields for better visual affordance.
    - **Pagination:** Custom pagination styling with emerald active state:
        ```jsx
        {links.map((link, i) => (
            link.url === null ? (
                <span key={i} className="px-4 py-2 text-[11px] font-bold text-gray-300 uppercase tracking-widest pointer-events-none" dangerouslySetInnerHTML={{ __html: link.label }} />
            ) : (
                <Link key={i} href={link.url} className={`px-4 py-2 text-[11px] font-bold rounded-xl transition-all uppercase tracking-widest ${
                    link.active
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                        : "bg-white border border-gray-100 text-gray-400 hover:border-emerald-200 hover:text-emerald-500"
                }`} dangerouslySetInnerHTML={{ __html: link.label }} />
            )
        ))}
        ```
    - **Empty State:** Consistent empty state messaging:
        ```jsx
        {items.length === 0 ? (
            <tr>
                <td colSpan={numColumns} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-300 space-y-4">
                        <HiOutlineClipboardDocumentCheck className="w-16 h-16 opacity-10" />
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em]">Data tidak ditemukan</p>
                    </div>
                </td>
            </tr>
        ) : ( /* render items */ )}
        ```
    - **Table Row Hover:** Standard row hover pattern: `className="group hover:bg-emerald-50/30 transition-colors"`

=== foundation rules ===

# Laravel Boost Guidelines

The Laravel Boost guidelines are specifically curated by Laravel maintainers for this application. These guidelines should be followed closely to enhance the user's satisfaction building Laravel applications.

## Foundational Context
This application is a Laravel application and its main Laravel ecosystems package & versions are below. You are an expert with them all. Ensure you abide by these specific packages & versions.

- php - 8.4.18
- inertiajs/inertia-laravel (INERTIA) - v2
- laravel/framework (LARAVEL) - v12
- laravel/prompts (PROMPTS) - v0
- laravel/sanctum (SANCTUM) - v4
- tightenco/ziggy (ZIGGY) - v2
- laravel/breeze (BREEZE) - v2
- laravel/mcp (MCP) - v0
- laravel/pint (PINT) - v1
- laravel/sail (SAIL) - v1
- phpunit/phpunit (PHPUNIT) - v11
- @inertiajs/react (INERTIA) - v2
- react (REACT) - v18
- tailwindcss (TAILWINDCSS) - v3

## Conventions
- You must follow all existing code conventions used in this application. When creating or editing a file, check sibling files for the correct structure, approach, naming.
- Use descriptive names for variables and methods. For example, `isRegisteredForDiscounts`, not `discount()`.
- Check for existing components to reuse before writing a new one.

## Verification Scripts
- Do not create verification scripts or tinker when tests cover that functionality and prove it works. Unit and feature tests are more important.

## Application Structure & Architecture
- Stick to existing directory structure - don't create new base folders without approval.
- Do not change the application's dependencies without approval.

## Frontend Bundling
- If the user doesn't see a frontend change reflected in the UI, it could mean they need to run `npm run build`, `npm run dev`, or `composer run dev`. Ask them.

## Replies
- Be concise in your explanations - focus on what's important rather than explaining obvious details.

## Documentation Files
- You must only create documentation files if explicitly requested by the user.


=== boost rules ===

## Laravel Boost
- Laravel Boost is an MCP server that comes with powerful tools designed specifically for this application. Use them.

## Artisan
- Use the `list-artisan-commands` tool when you need to call an Artisan command to double check the available parameters.

## URLs
- Whenever you share a project URL with the user you should use the `get-absolute-url` tool to ensure you're using the correct scheme, domain / IP, and port.

## Tinker / Debugging
- You should use the `tinker` tool when you need to execute PHP to debug code or query Eloquent models directly.
- Use the `database-query` tool when you only need to read from the database.

## Reading Browser Logs With the `browser-logs` Tool
- You can read browser logs, errors, and exceptions using the `browser-logs` tool from Boost.
- Only recent browser logs will be useful - ignore old logs.

## Searching Documentation (Critically Important)
- Boost comes with a powerful `search-docs` tool you should use before any other approaches. This tool automatically passes a list of installed packages and their versions to the remote Boost API, so it returns only version-specific documentation specific for the user's circumstance. You should pass an array of packages to filter on if you know you need docs for particular packages.
- The 'search-docs' tool is perfect for all Laravel related packages, including Laravel, Inertia, Livewire, Filament, Tailwind, Pest, Nova, Nightwatch, etc.
- You must use this tool to search for Laravel-ecosystem documentation before falling back to other approaches.
- Search the documentation before making code changes to ensure we are taking the correct approach.
- Use multiple, broad, simple, topic based queries to start. For example: `['rate limiting', 'routing rate limiting', 'routing']`.
- Do not add package names to queries - package information is already shared. For example, use `test resource table`, not `filament 4 test resource table`.

### Available Search Syntax
- You can and should pass multiple queries at once. The most relevant results will be returned first.

1. Simple Word Searches with auto-stemming - query=authentication - finds 'authenticate' and 'auth'
2. Multiple Words (AND Logic) - query=rate limit - finds knowledge containing both "rate" AND "limit"
3. Quoted Phrases (Exact Position) - query="infinite scroll" - Words must be adjacent and in that order
4. Mixed Queries - query=middleware "rate limit" - "middleware" AND exact phrase "rate limit"
5. Multiple Queries - queries=["authentication", "middleware"] - ANY of these terms


=== php rules ===

## PHP

- Always use curly braces for control structures, even if it has one line.

### Constructors
- Use PHP 8 constructor property promotion in `__construct()`.
    - <code-snippet>public function __construct(public GitHub $github) { }</code-snippet>
- Do not allow empty `__construct()` methods with zero parameters.

### Type Declarations
- Always use explicit return type declarations for methods and functions.
- Use appropriate PHP type hints for method parameters.

<code-snippet name="Explicit Return Types and Method Params" lang="php">
protected function isAccessible(User $user, ?string $path = null): bool
{
    ...
}
</code-snippet>

## Comments
- Prefer PHPDoc blocks over comments. Never use comments within the code itself unless there is something _very_ complex going on.

## PHPDoc Blocks
- Add useful array shape type definitions for arrays when appropriate.

## Enums
- Typically, keys in an Enum should be TitleCase. For example: `FavoritePerson`, `BestLake`, `Monthly`.


=== tests rules ===

## Test Enforcement

- Every change must be programmatically tested. Write a new test or update an existing test, then run the affected tests to make sure they pass.
- Run the minimum number of tests needed to ensure code quality and speed. Use `php artisan test` with a specific filename or filter.


=== inertia-laravel/core rules ===

## Inertia Core

- Inertia.js components should be placed in the `resources/js/Pages` directory unless specified differently in the JS bundler (vite.config.js).
- Use `Inertia::render()` for server-side routing instead of traditional Blade views.
- Use `search-docs` for accurate guidance on all things Inertia.

<code-snippet lang="php" name="Inertia::render Example">
// routes/web.php example
Route::get('/users', function () {
    return Inertia::render('Users/Index', [
        'users' => User::all()
    ]);
});
</code-snippet>


=== inertia-laravel/v2 rules ===

## Inertia v2

- Make use of all Inertia features from v1 & v2. Check the documentation before making any changes to ensure we are taking the correct approach.

### Inertia v2 New Features
- Polling
- Prefetching
- Deferred props
- Infinite scrolling using merging props and `WhenVisible`
- Lazy loading data on scroll

### Deferred Props & Empty States
- When using deferred props on the frontend, you should add a nice empty state with pulsing / animated skeleton.

### Inertia Form General Guidance
- The recommended way to build forms when using Inertia is with the `<Form>` component - a useful example is below. Use `search-docs` with a query of `form component` for guidance.
- Forms can also be built using the `useForm` helper for more programmatic control, or to follow existing conventions. Use `search-docs` with a query of `useForm helper` for guidance.
- `resetOnError`, `resetOnSuccess`, and `setDefaultsOnSuccess` are available on the `<Form>` component. Use `search-docs` with a query of 'form component resetting' for guidance.


=== laravel/core rules ===

## Do Things the Laravel Way

- Use `php artisan make:` commands to create new files (i.e. migrations, controllers, models, etc.). You can list available Artisan commands using the `list-artisan-commands` tool.
- If you're creating a generic PHP class, use `php artisan make:class`.
- Pass `--no-interaction` to all Artisan commands to ensure they work without user input. You should also pass the correct `--options` to ensure correct behavior.

### Database
- Always use proper Eloquent relationship methods with return type hints. Prefer relationship methods over raw queries or manual joins.
- Use Eloquent models and relationships before suggesting raw database queries
- Avoid `DB::`; prefer `Model::query()`. Generate code that leverages Laravel's ORM capabilities rather than bypassing them.
- Generate code that prevents N+1 query problems by using eager loading.
- Use Laravel's query builder for very complex database operations.

### Model Creation
- When creating new models, create useful factories and seeders for them too. Ask the user if they need any other things, using `list-artisan-commands` to check the available options to `php artisan make:model`.

### APIs & Eloquent Resources
- For APIs, default to using Eloquent API Resources and API versioning unless existing API routes do not, then you should follow existing application convention.

### Controllers & Validation
- Always create Form Request classes for validation rather than inline validation in controllers. Include both validation rules and custom error messages.
- Check sibling Form Requests to see if the application uses array or string based validation rules.

### Queues
- Use queued jobs for time-consuming operations with the `ShouldQueue` interface.

### Authentication & Authorization
- Use Laravel's built-in authentication and authorization features (gates, policies, Sanctum, etc.).

### URL Generation
- When generating links to other pages, prefer named routes and the `route()` function.

### Configuration
- Use environment variables only in configuration files - never use the `env()` function directly outside of config files. Always use `config('app.name')`, not `env('APP_NAME')`.

### Testing
- When creating models for tests, use the factories for the models. Check if the factory has custom states that can be used before manually setting up the model.
- Faker: Use methods such as `$this->faker->word()` or `fake()->randomDigit()`. Follow existing conventions whether to use `$this->faker` or `fake()`.
- When creating tests, make use of `php artisan make:test [options] {name}` to create a feature test, and pass `--unit` to create a unit test. Most tests should be feature tests.

### Vite Error
- If you receive an "Illuminate\Foundation\ViteException: Unable to locate file in Vite manifest" error, you can run `npm run build` or ask the user to run `npm run dev` or `composer run dev`.


=== laravel/v12 rules ===

## Laravel 12

- Use the `search-docs` tool to get version specific documentation.
- Since Laravel 11, Laravel has a new streamlined file structure which this project uses.

### Laravel 12 Structure
- No middleware files in `app/Http/Middleware/`.
- `bootstrap/app.php` is the file to register middleware, exceptions, and routing files.
- `bootstrap/providers.php` contains application specific service providers.
- **No app\Console\Kernel.php** - use `bootstrap/app.php` or `routes/console.php` for console configuration.
- **Commands auto-register** - files in `app/Console/Commands/` are automatically available and do not require manual registration.

### Database
- When modifying a column, the migration must include all of the attributes that were previously defined on the column. Otherwise, they will be dropped and lost.
- Laravel 11 allows limiting eagerly loaded records natively, without external packages: `$query->latest()->limit(10);`.

### Models
- Casts can and likely should be set in a `casts()` method on a model rather than the `$casts` property. Follow existing conventions from other models.


=== pint/core rules ===

## Laravel Pint Code Formatter

- You must run `vendor/bin/pint --dirty` before finalizing changes to ensure your code matches the project's expected style.
- Do not run `vendor/bin/pint --test`, simply run `vendor/bin/pint` to fix any formatting issues.


=== phpunit/core rules ===

## PHPUnit Core

- This application uses PHPUnit for testing. All tests must be written as PHPUnit classes. Use `php artisan make:test --phpunit {name}` to create a new test.
- If you see a test using "Pest", convert it to PHPUnit.
- Every time a test has been updated, run that singular test.
- When the tests relating to your feature are passing, ask the user if they would like to also run the entire test suite to make sure everything is still passing.
- Tests should test all of the happy paths, failure paths, and weird paths.
- You must not remove any tests or test files from the tests directory without approval. These are not temporary or helper files, these are core to the application.

### Running Tests
- Run the minimal number of tests, using an appropriate filter, before finalizing.
- To run all tests: `php artisan test`.
- To run all tests in a file: `php artisan test tests/Feature/ExampleTest.php`.
- To filter on a particular test name: `php artisan test --filter=testName` (recommended after making a change to a related file).


=== inertia-react/core rules ===

## Inertia + React

- Use `router.visit()` or `<Link>` for navigation instead of traditional links.

<code-snippet name="Inertia Client Navigation" lang="react">

import { Link } from '@inertiajs/react'
<Link href="/">Home</Link>

</code-snippet>


=== inertia-react/v2/forms rules ===

## Inertia + React Forms

<code-snippet name="`<Form>` Component Example" lang="react">

import { Form } from '@inertiajs/react'

export default () => (
    <Form action="/users" method="post">
        {({
            errors,
            hasErrors,
            processing,
            wasSuccessful,
            recentlySuccessful,
            clearErrors,
            resetAndClearErrors,
            defaults
        }) => (
        <>
        <input type="text" name="name" />

        {errors.name && <div>{errors.name}</div>}

        <button type="submit" disabled={processing}>
            {processing ? 'Creating...' : 'Create User'}
        </button>

        {wasSuccessful && <div>User created successfully!</div>}
        </>
    )}
    </Form>
)

</code-snippet>


=== tailwindcss/core rules ===

## Tailwind Core

- Use Tailwind CSS classes to style HTML, check and use existing tailwind conventions within the project before writing your own.
- Offer to extract repeated patterns into components that match the project's conventions (i.e. Blade, JSX, Vue, etc..)
- Think through class placement, order, priority, and defaults - remove redundant classes, add classes to parent or child carefully to limit repetition, group elements logically
- You can use the `search-docs` tool to get exact examples from the official documentation when needed.

### Spacing
- When listing items, use gap utilities for spacing, don't use margins.

    <code-snippet name="Valid Flex Gap Spacing Example" lang="html">
        <div class="flex gap-8">
            <div>Superior</div>
            <div>Michigan</div>
            <div>Erie</div>
        </div>
    </code-snippet>


### Dark Mode
- If existing pages and components support dark mode, new pages and components must support dark mode in a similar way, typically using `dark:`.


=== tailwindcss/v3 rules ===

## Tailwind 3

- Always use Tailwind CSS v3 - verify you're using only classes supported by this version.
</laravel-boost-guidelines>
