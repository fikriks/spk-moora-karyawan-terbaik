import React, { useEffect, useMemo, useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { confirmDialog, notifySuccess } from "@/Utils/useSweetAlert";

function Index() {
    const { users, flash } = usePage().props;

    /* ===============================
     * SEARCH + DEBOUNCE
     * =============================== */
    const [query, setQuery] = useState(() => {
        try {
            const url = new URL(window.location.href);
            return url.searchParams.get("q") || "";
        } catch {
            return "";
        }
    });

    const [searching, setSearching] = useState(false);
    const DEBOUNCE_MS = 500;

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                window.location.pathname,
                {
                    q: query || undefined,
                    page: 1,
                },
                {
                    preserveState: true,
                    replace: true,
                    onStart: () => setSearching(true),
                    onFinish: () => setSearching(false),
                },
            );
        }, DEBOUNCE_MS);

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    /* ===============================
     * DATA NORMALIZATION
     * =============================== */
    const items = useMemo(() => users?.data ?? [], [users]);
    const total = users?.total ?? items.length;

    const searchLabel = query
        ? `Hasil pencarian untuk "${query}"`
        : "Semua user";

    /* ===============================
     * DELETE USER
     * =============================== */
    function handleDelete(id, name) {
        confirmDialog(`Hapus user "${name}"?`).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/admin/users/${id}`, {
                    preserveScroll: true,
                    onSuccess: () => notifySuccess("User berhasil dihapus"),
                });
            }
        });
    }

    return (
        <div className="p-6">
            {/* ===============================
               HEADER
            =============================== */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        User Management
                    </h1>
                    <p className="text-sm text-gray-500">
                        Kelola akun pengguna: lihat, tambah, edit, hapus.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <Link
                        href="/admin/users/create"
                        className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                        + Add User
                    </Link>

                    <div className="relative w-full sm:w-64">
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Cari nama atau email..."
                            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />

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
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        ✕
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ===============================
               SEARCH STATUS
            =============================== */}
            <div className="mb-4 text-sm text-gray-500">
                {searching ? "Mencari..." : searchLabel}
                {flash?.success && (
                    <div className="text-green-600 mt-1">{flash.success}</div>
                )}
            </div>

            {/* ===============================
               TABLE (DESKTOP)
            =============================== */}
            <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
                <div className="overflow-x-auto hidden md:block">
                    <table className="w-full min-w-[720px]">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                            <tr>
                                <th className="px-4 py-3">Nama</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Role</th>
                                <th className="px-4 py-3 text-right">Aksi</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y text-sm">
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
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">{user.name}</td>
                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3">
                                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs">
                                            {user.roles}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="inline-flex gap-2">
                                            <Link
                                                href={`/admin/users/${user.id}/edit`}
                                                className="px-3 py-1.5 rounded-md border text-sm hover:bg-gray-50"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        user.id,
                                                        user.name,
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

                {/* ===============================
                   FOOTER + PAGINATION (FIXED)
                =============================== */}
                <div className="flex items-center justify-between border-t px-4 py-3">
                    <div className="text-sm text-gray-600">
                        Total: {total} user
                    </div>

                    {users?.links && users.links.length > 1 && (
                        <nav className="flex items-center gap-1">
                            {users.links.map((link, index) => {
                                if (!link.url) {
                                    return (
                                        <span
                                            key={index}
                                            className="px-3 py-1 text-sm text-gray-400"
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    );
                                }

                                return (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        preserveScroll
                                        preserveState
                                        className={`px-3 py-1 text-sm rounded border transition ${
                                            link.active
                                                ? "bg-indigo-600 text-white border-indigo-600"
                                                : "bg-white text-gray-700 hover:bg-gray-100"
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                );
                            })}
                        </nav>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ===============================
 * LAYOUT
 * =============================== */
Index.layout = (page) => {
    const breadcrumbs = [
        { label: "Dashboard", href: route("admin.index") },
        { label: "User Management", active: true },
    ];

    return (
        <AuthenticatedLayout
            header="User Management"
            breadcrumbs={breadcrumbs}
        >
            {page}
        </AuthenticatedLayout>
    );
};

export default Index;
