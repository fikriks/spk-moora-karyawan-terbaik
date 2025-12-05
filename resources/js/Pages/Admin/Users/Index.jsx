import { Link, usePage, router } from "@inertiajs/react";
import React, { useEffect, useMemo, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { confirmDialog, notifySuccess } from "@/Utils/useSweetAlert";

function Index() {
    const { users, flash } = usePage().props;

    /* -----------------------------------------------------
     * STATE UNTUK SEARCH + DEBOUNCE
     * ----------------------------------------------------- */

    // Ambil query awal dari URL (biar kalau reload tidak hilang)
    const [query, setQuery] = useState(() => {
        try {
            const url = new URL(window.location.href);
            return url.searchParams.get("q") || "";
        } catch {
            return "";
        }
    });

    // State loading ketika search berlangsung
    const [searching, setSearching] = useState(false);

    const DEBOUNCE_MS = 500; // waktu tunda sebelum request dijalankan

    // Jalankan search otomatis setelah user berhenti mengetik
    useEffect(() => {
        setSearching(true);

        const id = setTimeout(() => {
            router.get(
                window.location.pathname,
                {
                    q: query || undefined,
                    page: 1, // jika search baru, halaman reset ke 1
                },
                {
                    preserveState: true,
                    replace: true,
                    onFinish: () => setSearching(false),
                }
            );
        }, DEBOUNCE_MS);

        return () => clearTimeout(id);
    }, [query]);

    /* -----------------------------------------------------
     * NORMALISASI DATA USER (AGAR MENDUKUNG paginate() DAN all())
     * ----------------------------------------------------- */

    // Ambil list user (dari users.data bila paginate)
    const items = useMemo(() => {
        if (!users) return [];
        if (Array.isArray(users)) return users; // jika bukan paginate
        if (Array.isArray(users.data)) return users.data; // paginate
        return [];
    }, [users]);

    // Hitung total user
    const total = useMemo(() => {
        if (!users) return 0;
        if (Array.isArray(users)) return users.length;
        if (users.total !== undefined) return users.total;
        return items.length;
    }, [users]);

    /* -----------------------------------------------------
     * PAGINATION HANDLER
     * ----------------------------------------------------- */

    const meta = users?.meta ?? null; // data paginate: current_page, last_page, dll.
    const canPaginate = !!meta;

    function changePage(page) {
        if (!page || page === meta.current_page) return;

        router.get(
            window.location.pathname,
            {
                q: query || undefined,
                page: page,
            },
            {
                preserveState: true,
                replace: true,
                onStart: () => setSearching(true),
                onFinish: () => setSearching(false),
            }
        );
    }

    /* -----------------------------------------------------
     * DELETE USER
     * ----------------------------------------------------- */
    function handleDelete(id, name) {
        confirmDialog(`Hapus user "${name}"?`).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/admin/users/${id}`, {
                    onSuccess: () => notifySuccess("User berhasil dihapus!"),
                });
            }
        });
    }

    /* -----------------------------------------------------
     * LABEL STATUS SEARCH
     * ----------------------------------------------------- */
    const searchLabel = useMemo(() => {
        return query ? `Hasil pencarian untuk "${query}"` : "Semua user";
    }, [query]);

    return (
        <div className="p-6">
            {/* -----------------------------------------------------
               HEADER + SEARCH + ADD USER
            ----------------------------------------------------- */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        User Management
                    </h1>
                    <p className="text-sm text-gray-500">
                        Kelola akun pengguna: lihat, tambah, edit, hapus.
                    </p>
                </div>

                {/* Button + Search di kanan saat desktop */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 w-full">
                    {/* Tombol tambah user */}
                    <Link
                        href="/admin/users/create"
                        className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 w-full sm:w-auto justify-center"
                    >
                        + Add User
                    </Link>

                    {/* Input pencarian */}
                    <div className="relative w-full sm:w-auto">
                        <input
                            id="search"
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Cari nama atau email..."
                            className="w-full sm:w-64 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />

                        {/* Spinner loading atau tombol clear */}
                        <div className="absolute inset-y-0 right-2 flex items-center">
                            {searching ? (
                                <svg
                                    className="h-4 w-4 animate-spin text-gray-500"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeOpacity="0.3"
                                        fill="none"
                                    />
                                    <path
                                        d="M22 12a10 10 0 00-10-10"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            ) : (
                                query && (
                                    <button
                                        onClick={() => setQuery("")}
                                        className="text-gray-400 hover:text-gray-600 text-lg pb-1"
                                    >
                                        ✕
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Status search */}
            <div className="mb-4">
                <div className="text-sm text-gray-500">
                    {searching ? "Mencari..." : searchLabel}
                </div>
            </div>

            {/* -----------------------------------------------------
               TABEL DESKTOP
            ----------------------------------------------------- */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto hidden md:block">
                    <table className="w-full min-w-[720px] table-auto">
                        <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
                            <tr>
                                <th className="px-4 py-3">Nama</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Role</th>
                                <th className="px-4 py-3 text-right">Aksi</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                            {items.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="px-4 py-6 text-center text-gray-500"
                                    >
                                        Tidak ada user.
                                    </td>
                                </tr>
                            )}

                            {items.map((user) => (
                                <tr
                                    key={user.id}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                                                {user.name
                                                    ?.charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-medium">
                                                    {user.name}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    ID: {user.id}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-4 py-4">{user.email}</td>

                                    <td className="px-4 py-4">
                                        <span
                                            className={
                                                user.role === "admin"
                                                    ? "inline-flex rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800"
                                                    : "inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700"
                                            }
                                        >
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="px-4 py-4 text-right">
                                        <div className="inline-flex gap-2">
                                            <Link
                                                href={`/admin/users/${user.id}/edit`}
                                                className="px-3 py-1.5 rounded-md border shadow-sm text-sm hover:bg-gray-50"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        user.id,
                                                        user.name
                                                    )
                                                }
                                                className="px-3 py-1.5 rounded-md bg-red-600 text-white text-sm hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* -----------------------------------------------------
                   MOBILE CARD LIST
                ----------------------------------------------------- */}
                <div className="md:hidden divide-y">
                    {items.length === 0 && (
                        <div className="p-4 text-center text-gray-500">
                            Tidak ada user.
                        </div>
                    )}

                    {items.map((user) => (
                        <div key={user.id} className="p-4">
                            <div className="flex justify-between gap-4">
                                <div className="flex gap-3">
                                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-medium">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>

                                    <div>
                                        <div className="font-medium">
                                            {user.name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {user.email}
                                        </div>

                                        <span
                                            className={
                                                user.role === "admin"
                                                    ? "inline-flex mt-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800"
                                                    : "inline-flex mt-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700"
                                            }
                                        >
                                            {user.role}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Link
                                        href={`/admin/users/${user.id}/edit`}
                                        className="px-3 py-1.5 rounded-md border text-sm shadow-sm hover:bg-gray-50"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() =>
                                            handleDelete(user.id, user.name)
                                        }
                                        className="px-3 py-1.5 rounded-md bg-red-600 text-white text-sm hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* -----------------------------------------------------
                   FOOTER + PAGINATION
                ----------------------------------------------------- */}
                <div className="flex items-center justify-between border-t px-4 py-3">
                    <div className="text-sm text-gray-600">
                        Total: {total} user
                    </div>

                    {/* Tampilkan pagination hanya jika paginate digunakan */}
                    {canPaginate ? (
                        <nav className="flex items-center gap-1">
                            {/* Tombol Previous */}
                            <button
                                onClick={() =>
                                    changePage(meta.current_page - 1)
                                }
                                disabled={meta.current_page <= 1}
                                className="px-2 py-1 border rounded disabled:opacity-40"
                            >
                                Prev
                            </button>

                            {/* Nomor halaman (truncated agar rapi) */}
                            {Array.from(
                                { length: meta.last_page },
                                (_, i) => i + 1
                            )
                                .filter((page) => {
                                    const current = meta.current_page;
                                    return (
                                        page === 1 ||
                                        page === meta.last_page ||
                                        (page >= current - 2 &&
                                            page <= current + 2)
                                    );
                                })
                                .map((page, idx, arr) => (
                                    <>
                                        {idx > 0 &&
                                            arr[idx - 1] !== page - 1 && (
                                                <span
                                                    key={`dots-${page}`}
                                                    className="px-2"
                                                >
                                                    …
                                                </span>
                                            )}

                                        <button
                                            key={page}
                                            onClick={() => changePage(page)}
                                            className={`px-2 py-1 border rounded ${
                                                page === meta.current_page
                                                    ? "bg-indigo-600 text-white"
                                                    : "bg-white"
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    </>
                                ))}

                            {/* Tombol Next */}
                            <button
                                onClick={() =>
                                    changePage(meta.current_page + 1)
                                }
                                disabled={meta.current_page >= meta.last_page}
                                className="px-2 py-1 border rounded disabled:opacity-40"
                            >
                                Next
                            </button>
                        </nav>
                    ) : (
                        <span className="text-gray-500 text-sm">—</span>
                    )}
                </div>
            </div>
        </div>
    );
}

/* -----------------------------------------------------
 * WRAP DENGAN LAYOUT AUTHENTICATED
 * ----------------------------------------------------- */
Index.layout = (page) => (
    <AuthenticatedLayout
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                User Management
            </h2>
        }
    >
        {page}
    </AuthenticatedLayout>
);

export default Index;
