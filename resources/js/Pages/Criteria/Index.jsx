import React, { useEffect, useMemo, useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { notifySuccess } from "@/Utils/useToast";
import { confirmAction } from "@/Utils/useConfirm";

function Index() {
    const { criteria, filters = {}, flash } = usePage().props;

    /* ===============================
     * SEARCH + DEBOUNCE
     * =============================== */
    const [query, setQuery] = useState(filters.q || "");
    const [searching, setSearching] = useState(false);
    const DEBOUNCE_MS = 500;

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                window.location.pathname,
                {
                    q: query || undefined,
                    page: 1,
                    per_page: filters.per_page || undefined,
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
     * DATA
     * =============================== */
    const items = useMemo(() => criteria?.data ?? [], [criteria]);
    const total = criteria?.total ?? items.length;

    const searchLabel = query
        ? `Hasil pencarian untuk "${query}"`
        : "Semua kriteria";

    /* ===============================
     * DELETE
     * =============================== */
    function handleDelete(id, name) {
        confirmAction(`Hapus kriteria "${name}"?`, () => {
            router.delete(route("criteria.destroy", id), {
                preserveScroll: true,
                onSuccess: () =>
                    notifySuccess("Kriteria berhasil dihapus!"),
            });
        });
    }

    return (
        <div className="p-6">
            {/* HEADER */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Kriteria
                    </h1>
                    <p className="text-sm text-gray-500">
                        Kelola kriteria SPK.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <Link
                        href={route("criteria.create")}
                        className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                        + Tambah Kriteria
                    </Link>

                    <div className="relative w-full sm:w-64">
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Cari nama atau kode..."
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

            {/* STATUS */}
            <div className="mb-4 text-sm text-gray-500">
                {searching ? "Mencari..." : searchLabel}
                {flash?.success && (
                    <div className="text-green-600 mt-1">{flash.success}</div>
                )}
            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
                <div className="overflow-x-auto hidden md:block">
                    <table className="w-full min-w-[720px]">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                            <tr>
                                <th className="px-4 py-3">Order</th>
                                <th className="px-4 py-3">Kode</th>
                                <th className="px-4 py-3">Nama</th>
                                <th className="px-4 py-3">Tipe</th>
                                <th className="px-4 py-3">Bobot</th>
                                <th className="px-4 py-3 text-right">Aksi</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y text-sm">
                            {items.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-4 py-6 text-center text-gray-500"
                                    >
                                        Tidak ada kriteria.
                                    </td>
                                </tr>
                            )}

                            {items.map((c) => (
                                <tr key={c.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">{c.order}</td>
                                    <td className="px-4 py-3">{c.code}</td>
                                    <td className="px-4 py-3">{c.name}</td>
                                    <td className="px-4 py-3">{c.type}</td>
                                    <td className="px-4 py-3">
                                        {Number(c.weight).toFixed(4)}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="inline-flex gap-2">
                                            <Link
                                                href={route(
                                                    "criteria.edit",
                                                    c.id,
                                                )}
                                                className="px-3 py-1.5 rounded-md border text-sm hover:bg-gray-50"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(c.id, c.name)
                                                }
                                                className="px-3 py-1.5 rounded-md bg-red-600 text-white text-sm hover:bg-red-700"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between border-t px-4 py-3">
                    <div className="text-sm text-gray-600">
                        Total: {total} kriteria
                    </div>

                    {criteria?.links && criteria.links.length > 1 && (
                        <Pagination links={criteria.links} />
                    )}
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => (
    <AuthenticatedLayout
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Kriteria
            </h2>
        }
    >
        {page}
    </AuthenticatedLayout>
);

export default Index;
