import React, { useEffect, useMemo, useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { notifySuccess } from "@/Utils/useToast";
import { confirmAction } from "@/Utils/useConfirm";

function Index() {
    const { alternatives, filters = {}, flash } = usePage().props;

    /* ===============================
     * SEARCH + DEBOUNCE
     * =============================== */
    const [query, setQuery] = useState(filters.q || "");
    const [searching, setSearching] = useState(false);
    const DEBOUNCE_MS = 500;
    const [showImportModal, setShowImportModal] = useState(false);
    const [importFile, setImportFile] = useState(null);
    const [importing, setImporting] = useState(false);

    function submitImport(e) {
        e.preventDefault();

        if (!importFile) return;

        const formData = new FormData();
        formData.append("file", importFile);

        setImporting(true);

        router.post(route("operator.alternative.import"), formData, {
            forceFormData: true,
            onSuccess: () => {
                notifySuccess("Import alternative berhasil");
                setShowImportModal(false);
                setImportFile(null);
            },
            onFinish: () => setImporting(false),
        });
    }

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
    const items = useMemo(() => alternatives?.data ?? [], [alternatives]);

    const total = alternatives?.total ?? items.length;

    /* ===============================
     * DELETE
     * =============================== */
    function handleDelete(id, name) {
        confirmAction(`Hapus alternative "${name}"?`, () => {
            router.delete(route("operator.alternative.destroy", id), {
                preserveScroll: true,
                onSuccess: () =>
                    notifySuccess("Alternative berhasil dihapus!"),
            });
        });
    }

    const searchLabel = query
        ? `Hasil pencarian untuk "${query}"`
        : "Semua alternative";

    return (
        <div className="p-6">
            {/* HEADER */}
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                {/* TITLE */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Alternative
                    </h1>
                    <p className="text-sm text-gray-500">
                        Kelola alternative SPK: lihat, tambah, edit, hapus.
                    </p>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-wrap items-center gap-2">
                    {/* DOWNLOAD TEMPLATE */}
                    <a
                        href={route("operator.alternative.template")}
                        className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        📄 Template
                    </a>

                    {/* IMPORT */}
                    <button
                        type="button"
                        onClick={() => setShowImportModal(true)}
                        className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                    >
                        ⬆ Import
                    </button>

                    {/* TAMBAH */}
                    <Link
                        href={route("operator.alternative.create")}
                        className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                        + Tambah
                    </Link>

                    {/* SEARCH */}
                    <div className="relative">
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Cari nama atau NIP..."
                            className="w-64 rounded-md border border-gray-300 px-3 py-2 pl-9 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                        <span className="pointer-events-none absolute left-3 top-2.5 text-gray-400">
                            🔍
                        </span>
                    </div>
                </div>
            </div>

            {/* INFO */}
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
                                <th className="px-4 py-3">No</th>
                                <th className="px-4 py-3">NIP</th>
                                <th className="px-4 py-3">Nama</th>
                                <th className="px-4 py-3">Jabatan</th>
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
                                        Tidak ada alternative.
                                    </td>
                                </tr>
                            )}

                            {items.map((c, i) => (
                                <tr key={c.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                        {(alternatives.from ?? 0) + i}
                                    </td>
                                    <td className="px-4 py-3">{c.nip}</td>
                                    <td className="px-4 py-3">{c.name}</td>
                                    <td className="px-4 py-3">{c.jabatan}</td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="inline-flex gap-2">
                                            <Link
                                                href={route(
                                                    "operator.alternative.edit",
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
                        Total: {total} alternative
                    </div>

                    {alternatives?.links && alternatives.links.length > 1 && (
                        <Pagination links={alternatives.links} />
                    )}
                </div>
            </div>
            {/* IMPORT MODAL */}
            {showImportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
                        {/* HEADER */}
                        <div className="flex items-center justify-between border-b px-4 py-3">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Import Alternative
                            </h3>
                            <button
                                onClick={() => setShowImportModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>

                        {/* BODY */}
                        <form
                            onSubmit={submitImport}
                            className="px-4 py-5 space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    File Excel (.xlsx)
                                </label>
                                <input
                                    type="file"
                                    accept=".xlsx,.xls"
                                    onChange={(e) =>
                                        setImportFile(e.target.files[0])
                                    }
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                    required
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    Gunakan template yang sudah disediakan
                                </p>
                            </div>

                            {/* ACTION */}
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowImportModal(false)}
                                    className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
                                    disabled={importing}
                                >
                                    Batal
                                </button>

                                <button
                                    type="submit"
                                    disabled={importing}
                                    className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
                                >
                                    {importing ? "Mengimpor..." : "Import"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

Index.layout = (page) => (
    <AuthenticatedLayout
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Alternative
            </h2>
        }
    >
        {page}
    </AuthenticatedLayout>
);

export default Index;
