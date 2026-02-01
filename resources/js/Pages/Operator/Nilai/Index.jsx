import React, { useEffect, useMemo, useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { confirmDialog, notifySuccess } from "@/Utils/useSweetAlert";

function Index() {
    const {
        nilaiAlternatives: rawNilaiAlternatives,
        filters: initialFilters = {},
        flash,
    } = usePage().props;

    /* ---------------------------
     * SEARCH + DEBOUNCE
     * --------------------------- */
    const [query, setQuery] = useState(() => {
        try {
            const url = new URL(window.location.href);
            return url.searchParams.get("q") || initialFilters.q || "";
        } catch {
            return initialFilters.q || "";
        }
    });

    const [searching, setSearching] = useState(false);
    const DEBOUNCE_MS = 500;

    useEffect(() => {
        setSearching(true);
        const id = setTimeout(() => {
            router.get(
                window.location.pathname,
                {
                    q: query || undefined,
                    page: 1,
                    per_page: initialFilters.per_page || undefined,
                },
                {
                    preserveState: true,
                    replace: true,
                    onFinish: () => setSearching(false),
                },
            );
        }, DEBOUNCE_MS);

        return () => clearTimeout(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    /* ---------------------------
     * NORMALISASI DATA
     * --------------------------- */
    const items = useMemo(() => {
        if (!rawNilaiAlternatives) return [];
        if (Array.isArray(rawNilaiAlternatives)) return rawNilaiAlternatives;
        if (Array.isArray(rawNilaiAlternatives.data))
            return rawNilaiAlternatives.data;
        return [];
    }, [rawNilaiAlternatives]);

    const total = useMemo(() => {
        if (!rawNilaiAlternatives) return 0;
        if (Array.isArray(rawNilaiAlternatives))
            return rawNilaiAlternatives.length;
        if (rawNilaiAlternatives.total !== undefined)
            return rawNilaiAlternatives.total;
        return items.length;
    }, [rawNilaiAlternatives, items]);

    const meta =
        rawNilaiAlternatives?.meta ?? rawNilaiAlternatives?.paginator ?? null;

    const canPaginate = !!meta;

    /* ---------------------------
     * CHANGE PAGE
     * --------------------------- */
    function changePage(page) {
        if (!page || (meta && page === meta.current_page)) return;

        router.get(
            window.location.pathname,
            {
                q: query || undefined,
                page,
                per_page: initialFilters.per_page || undefined,
            },
            {
                preserveState: true,
                replace: true,
                onStart: () => setSearching(true),
                onFinish: () => setSearching(false),
            },
        );
    }
    // console.log(items);
    /* ---------------------------
     * DELETE
     * --------------------------- */
    function handleDelete(id, label) {
        confirmDialog(`Hapus nilai ${label}?`).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("operator.nilai.destroy", id), {
                    onSuccess: () =>
                        notifySuccess("Nilai alternative berhasil dihapus"),
                });
            }
        });
    }

    /* ---------------------------
     * SEARCH LABEL
     * --------------------------- */
    const searchLabel = useMemo(() => {
        return query
            ? `Hasil pencarian untuk "${query}"`
            : "Semua nilai alternative";
    }, [query]);

    return (
        <div className="p-6">
            {/* HEADER */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Nilai Alternative
                    </h1>
                    <p className="text-sm text-gray-500">
                        Matriks keputusan nilai alternatif terhadap kriteria
                        (MOORA).
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <Link
                        href={route("operator.nilai.create")}
                        className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                        + Tambah Nilai
                    </Link>

                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Cari alternatif / kriteria..."
                        className="w-full sm:w-64 rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                </div>
            </div>

            {/* SEARCH INFO */}
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
                                <th className="px-4 py-3">Alternative</th>
                                <th className="px-4 py-3">Kriteria</th>
                                <th className="px-4 py-3">Nilai</th>
                                <th className="px-4 py-3 text-right">Aksi</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y text-sm">
                            {items.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-4 py-6 text-center text-gray-500"
                                    >
                                        Tidak ada nilai alternative.
                                    </td>
                                </tr>
                            )}

                            {items.map((item, i) => (
                                <tr key={item.id}>
                                    <td className="px-4 py-4">{i + 1}</td>
                                    <td className="px-4 py-4">
                                        {item.alternative?.name ?? "-"}
                                    </td>
                                    <td className="px-4 py-4">
                                        {item.criteria?.name ?? "-"}
                                    </td>
                                    <td className="px-4 py-4 font-semibold">
                                        {item.value}
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <div className="inline-flex gap-2">
                                            <Link
                                                href={route(
                                                    "operator.nilai.edit",
                                                    item.id,
                                                )}
                                                className="px-3 py-1.5 rounded-md border text-sm hover:bg-gray-50"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        item.id,
                                                        `${item.alternative?.name} - ${item.criteria?.name}`,
                                                    )
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
                        Total: {total} nilai alternative
                    </div>

                    {canPaginate ? (
                        rawNilaiAlternatives?.links ? (
                            <Pagination links={rawNilaiAlternatives.links} />
                        ) : (
                            <button
                                onClick={() =>
                                    changePage(meta.current_page + 1)
                                }
                                className="text-sm px-3 py-1 border rounded"
                            >
                                Next
                            </button>
                        )
                    ) : (
                        <span className="text-sm text-gray-400">—</span>
                    )}
                </div>
            </div>
        </div>
    );
}

/* Layout */
Index.layout = (page) => (
    <AuthenticatedLayout
        header={
            <h2 className="font-semibold text-xl text-gray-800">
                Nilai Alternative
            </h2>
        }
    >
        {page}
    </AuthenticatedLayout>
);

export default Index;
