import React, { useEffect, useMemo, useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { confirmDialog, notifySuccess } from "@/Utils/useSweetAlert";

function Index() {
    const {
        criteria: rawCriteria,
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
                }
            );
        }, DEBOUNCE_MS);

        return () => clearTimeout(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    /* ---------------------------
     * NORMALISASI DATA (paginate atau array)
     * --------------------------- */
    const items = useMemo(() => {
        if (!rawCriteria) return [];
        if (Array.isArray(rawCriteria)) return rawCriteria;
        if (Array.isArray(rawCriteria.data)) return rawCriteria.data;
        return [];
    }, [rawCriteria]);

    const total = useMemo(() => {
        if (!rawCriteria) return 0;
        if (Array.isArray(rawCriteria)) return rawCriteria.length;
        if (rawCriteria.total !== undefined) return rawCriteria.total;
        return items.length;
    }, [rawCriteria, items]);

    const meta = rawCriteria?.meta ?? rawCriteria?.paginator ?? null;
    const canPaginate = !!meta;

    /* ---------------------------
     * CHANGE PAGE (when using meta)
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
            }
        );
    }

    /* ---------------------------
     * DELETE CRITERION
     * --------------------------- */
    function handleDelete(id, name) {
        confirmDialog(`Hapus kriteria "${name}"?`).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("criteria.destroy", id), {
                    onSuccess: () => {
                        notifySuccess("Kriteria berhasil dihapus!");
                    },
                    onError: (errors) => {
                        // optional: log or show toast
                        console.error(errors);
                    },
                });
            }
        });
    }

    /* ---------------------------
     * SEARCH LABEL
     * --------------------------- */
    const searchLabel = useMemo(() => {
        return query ? `Hasil pencarian untuk "${query}"` : "Semua kriteria";
    }, [query]);

    return (
        <div className="p-6">
            {/* HEADER */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Kriteria
                    </h1>
                    <p className="text-sm text-gray-500">
                        Kelola kriteria SPK: lihat, tambah, edit, hapus.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 w-full sm:w-auto">
                    <Link
                        href={route("criteria.create")}
                        className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 w-full sm:w-auto justify-center"
                    >
                        + Tambah Kriteria
                    </Link>

                    <div className="relative w-full sm:w-64">
                        <input
                            id="search"
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Cari nama atau kode..."
                            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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

            {/* SEARCH STATUS */}
            <div className="mb-4">
                <div className="text-sm text-gray-500">
                    {searching ? "Mencari..." : searchLabel}
                </div>
                {flash?.message && (
                    <div className="text-sm text-green-600 mt-1">
                        {flash.message}
                    </div>
                )}
            </div>

            {/* TABLE / LIST */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                {/* Desktop Table */}
                <div className="overflow-x-auto hidden md:block">
                    <table className="w-full min-w-[720px] table-auto">
                        <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
                            <tr>
                                <th className="px-4 py-3">Order</th>
                                <th className="px-4 py-3">Kode</th>
                                <th className="px-4 py-3">Nama</th>
                                <th className="px-4 py-3">Tipe</th>
                                <th className="px-4 py-3">Bobot</th>
                                <th className="px-4 py-3 text-right">Aksi</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
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
                                <tr
                                    key={c.id}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-4">
                                        {c.order ?? "-"}
                                    </td>
                                    <td className="px-4 py-4">
                                        {c.code ?? "-"}
                                    </td>
                                    <td className="px-4 py-4">{c.name}</td>
                                    <td className="px-4 py-4">{c.type}</td>
                                    <td className="px-4 py-4">
                                        {Number(c.weight ?? 0).toFixed(4)}
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <div className="inline-flex gap-2">
                                            <Link
                                                href={route(
                                                    "criteria.edit",
                                                    c.id
                                                )}
                                                className="px-3 py-1.5 rounded-md border shadow-sm text-sm hover:bg-gray-50"
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

                {/* Mobile Card List */}
                <div className="md:hidden divide-y">
                    {items.length === 0 && (
                        <div className="p-4 text-center text-gray-500">
                            Tidak ada kriteria.
                        </div>
                    )}

                    {items.map((c) => (
                        <div key={c.id} className="p-4">
                            <div className="flex justify-between gap-4">
                                <div className="flex gap-3">
                                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-medium">
                                        {String(c.name || "-")
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <div>
                                        <div className="font-medium">
                                            {c.name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Kode: {c.code ?? "-"}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Bobot:{" "}
                                            {Number(c.weight ?? 0).toFixed(4)}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Link
                                        href={route("criteria.edit", c.id)}
                                        className="px-3 py-1.5 rounded-md border text-sm shadow-sm hover:bg-gray-50"
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
                            </div>
                        </div>
                    ))}
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between border-t px-4 py-3">
                    <div className="text-sm text-gray-600">
                        Total: {total} kriteria
                    </div>

                    {canPaginate ? (
                        // gunakan Pagination component (mengirim links bila tersedia)
                        rawCriteria?.links ? (
                            <Pagination links={rawCriteria.links} />
                        ) : (
                            // fallback simple pager jika hanya meta tersedia
                            <nav className="flex items-center gap-1">
                                <button
                                    onClick={() =>
                                        changePage(meta.current_page - 1)
                                    }
                                    disabled={meta.current_page <= 1}
                                    className="px-2 py-1 border rounded disabled:opacity-40"
                                >
                                    Prev
                                </button>

                                {/* truncated page numbers */}
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
                                        <React.Fragment key={page}>
                                            {idx > 0 &&
                                                arr[idx - 1] !== page - 1 && (
                                                    <span className="px-2">
                                                        …
                                                    </span>
                                                )}
                                            <button
                                                onClick={() => changePage(page)}
                                                className={`px-2 py-1 border rounded ${
                                                    page === meta.current_page
                                                        ? "bg-indigo-600 text-white"
                                                        : "bg-white"
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        </React.Fragment>
                                    ))}

                                <button
                                    onClick={() =>
                                        changePage(meta.current_page + 1)
                                    }
                                    disabled={
                                        meta.current_page >= meta.last_page
                                    }
                                    className="px-2 py-1 border rounded disabled:opacity-40"
                                >
                                    Next
                                </button>
                            </nav>
                        )
                    ) : (
                        <span className="text-gray-500 text-sm">—</span>
                    )}
                </div>
            </div>
        </div>
    );
}

/* Wrap with AuthenticatedLayout */
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
