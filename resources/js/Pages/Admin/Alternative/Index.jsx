import React, { useEffect, useMemo, useState } from "react";
import { usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";

function Index() {
    const { alternatives, filters = {}, flash } = usePage().props;

    /* ===========================
     * SEARCH + DEBOUNCE
     * =========================== */
    const [query, setQuery] = useState(filters.q || "");
    const [searching, setSearching] = useState(false);
    const DEBOUNCE_MS = 500;

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                route("admin.alternatives.index"),
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

    /* ===========================
     * DATA
     * =========================== */
    const items = useMemo(() => alternatives?.data ?? [], [alternatives]);

    const total = alternatives?.total ?? items.length;

    const searchLabel = query
        ? `Hasil pencarian untuk "${query}"`
        : "Semua alternative";

    return (
        <div className="p-6">
            {/* HEADER */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Alternative
                    </h1>
                    <p className="text-sm text-gray-500">
                        Kelola alternative SPK: lihat, tambah, edit, hapus.
                    </p>
                </div>

                <div className="w-full sm:w-64 relative">
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Cari nama atau NIP..."
                        className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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

            {/* STATUS */}
            <div className="mb-4 text-sm text-gray-500">
                {searching ? "Mencari..." : searchLabel}
                {flash?.message && (
                    <div className="text-green-600 mt-1">{flash.message}</div>
                )}
            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
                <div className="overflow-x-auto hidden md:block">
                    <table className="w-full min-w-[720px]">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                            <tr>
                                <th className="px-4 py-3">No</th>
                                <th className="px-4 py-3">NIP</th>
                                <th className="px-4 py-3">Nama</th>
                                <th className="px-4 py-3">Jabatan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y text-sm">
                            {items.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="px-4 py-6 text-center text-gray-500"
                                    >
                                        Tidak ada data.
                                    </td>
                                </tr>
                            )}

                            {items.map((item, i) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                        {(alternatives.from ?? 0) + i}
                                    </td>
                                    <td className="px-4 py-3">
                                        {item.nip ?? "-"}
                                    </td>
                                    <td className="px-4 py-3">{item.name}</td>
                                    <td className="px-4 py-3">
                                        {item.jabatan ?? "-"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* MOBILE */}
                <div className="md:hidden divide-y">
                    {items.map((item) => (
                        <div key={item.id} className="p-4">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-gray-500">
                                NIP: {item.nip ?? "-"}
                            </div>
                            <div className="text-xs text-gray-500">
                                Jabatan: {item.jabatan ?? "-"}
                            </div>
                        </div>
                    ))}
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between border-t px-4 py-3">
                    <div className="text-sm text-gray-600">
                        Total: {total} alternative
                    </div>

                    {alternatives?.links && (
                        <Pagination links={alternatives.links} />
                    )}
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => (
    <AuthenticatedLayout
        header={
            <h2 className="font-semibold text-xl text-gray-800">Alternative</h2>
        }
    >
        {page}
    </AuthenticatedLayout>
);

export default Index;
