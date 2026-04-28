import React, { useEffect, useMemo, useState, Fragment } from "react";
import { Link, usePage, router, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { notifySuccess } from "@/Utils/useToast";
import { confirmAction } from "@/Utils/useConfirm";
import { 
    HiOutlineMagnifyingGlass, 
    HiOutlineXMark, 
    HiOutlineIdentification,
    HiOutlineUserGroup,
    HiOutlineBriefcase,
    HiOutlinePlus,
    HiOutlineArrowUpTray,
    HiOutlineDocumentText,
    HiOutlinePencilSquare,
    HiOutlineTrash,
    HiOutlineCheckCircle
} from "react-icons/hi2";
import { Dialog, Transition } from "@headlessui/react";

function Index() {
    const { alternatives, filters = {} } = usePage().props;

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
    const [showImportModal, setShowImportModal] = useState(false);
    const [importFile, setImportFile] = useState(null);
    const [importing, setImporting] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (query !== (filters.q || "")) {
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
            }
        }, DEBOUNCE_MS);

        return () => clearTimeout(timeout);
    }, [query]);

    /* ===============================
     * DATA NORMALIZATION
     * =============================== */
    const items = useMemo(() => alternatives?.data ?? [], [alternatives]);
    const total = alternatives?.total ?? items.length;

    /* ===============================
     * ACTIONS
     * =============================== */
    function handleDelete(id, name) {
        confirmAction(`Hapus alternative "${name}"?`, () => {
            router.delete(route("admin.alternative.destroy", id), {
                preserveScroll: true,
                onSuccess: () =>
                    notifySuccess("Alternative berhasil dihapus!"),
            });
        });
    }

    function submitImport(e) {
        e.preventDefault();
        if (!importFile) return;

        const formData = new FormData();
        formData.append("file", importFile);

        setImporting(true);
        router.post(route("admin.alternative.import"), formData, {
            forceFormData: true,
            onSuccess: () => {
                notifySuccess("Import alternative berhasil");
                setShowImportModal(false);
                setImportFile(null);
            },
            onFinish: () => setImporting(false),
        });
    }

    return (
        <>
            <Head title="Manajemen Alternative" />
            
            <div className="space-y-8">
                {/* Header section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black text-gray-800 tracking-tight">
                            Manajemen <span className="text-emerald-500">Alternative</span>
                        </h2>
                        <p className="text-sm text-gray-500 max-w-md font-medium leading-relaxed">
                            Daftar personil/alternative yang terdaftar dalam sistem pendukung keputusan.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <a
                            href="/storage/templates/template-alternative.xlsx"
                            download
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-gray-100 text-[13px] font-bold text-gray-600 hover:bg-gray-50 hover:text-emerald-600 transition-all shadow-sm"
                        >
                            <HiOutlineDocumentText className="h-4 w-4" />
                            Template
                        </a>

                        <button
                            type="button"
                            onClick={() => setShowImportModal(true)}
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-gray-100 text-[13px] font-bold text-gray-600 hover:bg-gray-50 hover:text-emerald-600 transition-all shadow-sm"
                        >
                            <HiOutlineArrowUpTray className="h-4 w-4" />
                            Import
                        </button>

                        <Link
                            href={route("admin.alternative.create")}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 text-[13px] font-bold text-white hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                        >
                            <HiOutlinePlus className="w-4 h-4" />
                            <span>Tambah Pegawai</span>
                        </Link>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] overflow-hidden">
                    {/* Search Area */}
                    <div className="p-6 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-md group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                                <HiOutlineMagnifyingGlass className={`w-5 h-5 ${searching ? 'animate-pulse text-emerald-500' : ''}`} />
                            </div>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Cari nama atau NIP pegawai..."
                                className="w-full pl-12 pr-10 py-3 bg-white border border-gray-100 rounded-2xl text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none shadow-sm placeholder:text-gray-400"
                            />
                            {query && !searching && (
                                <button 
                                    onClick={() => setQuery("")}
                                    className="absolute inset-y-0 right-4 flex items-center p-1 text-gray-300 hover:text-gray-500 transition-colors"
                                >
                                    <HiOutlineXMark className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        <div className="hidden sm:block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                            Total: <span className="text-gray-700">{total}</span> Personil
                        </div>
                    </div>

                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 w-20 text-center">No</th>
                                    <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Informasi Personil</th>
                                    <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Jabatan</th>
                                    <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {items.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center justify-center text-gray-300 space-y-4">
                                                <HiOutlineUserGroup className="w-16 h-16 opacity-10" />
                                                <p className="text-[11px] font-bold uppercase tracking-[0.2em]">Data tidak ditemukan</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    items.map((item, i) => (
                                        <tr key={item.id} className="group hover:bg-emerald-50/30 transition-colors">
                                            <td className="px-8 py-6 text-sm font-bold text-gray-300 text-center">
                                                {(alternatives.from ?? 0) + i}
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 font-bold group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-all">
                                                        {item.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-gray-700 tracking-tight group-hover:text-emerald-600 transition-colors uppercase leading-tight">
                                                            {item.name}
                                                        </span>
                                                        <div className="flex items-center gap-1.5 text-gray-400 text-[11px] font-medium mt-1">
                                                            <HiOutlineIdentification className="w-3.5 h-3.5" />
                                                            <span>{item.nip ?? "-"}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 text-gray-500 text-[11px] font-bold uppercase tracking-wider border border-gray-100/50">
                                                    <HiOutlineBriefcase className="w-3.5 h-3.5 text-gray-400" />
                                                    {item.jabatan ?? "-"}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={route("admin.alternative.edit", item.id)}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all text-[11px] font-bold uppercase tracking-wider shadow-sm"
                                                    >
                                                        <HiOutlinePencilSquare className="w-3.5 h-3.5" />
                                                        <span>Edit</span>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(item.id, item.name)}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-100 transition-all text-[11px] font-bold uppercase tracking-wider shadow-sm"
                                                    >
                                                        <HiOutlineTrash className="w-3.5 h-3.5" />
                                                        <span>Hapus</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer / Pagination */}
                    <div className="px-8 py-6 border-t border-gray-50 bg-gray-50/30 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                            Menampilkan <span className="text-emerald-500">{alternatives.from ?? 0}</span> - <span className="text-emerald-500">{alternatives.to ?? 0}</span> dari <span className="text-gray-700">{total}</span> data
                        </p>
                        
                        {alternatives?.links && alternatives.links.length > 3 && (
                            <div className="flex items-center gap-2">
                                {alternatives.links.map((link, i) => {
                                    if (link.url === null) {
                                        return (
                                            <span 
                                                key={i} 
                                                className="px-4 py-2 text-[11px] font-bold text-gray-300 uppercase tracking-widest pointer-events-none"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        );
                                    }
                                    return (
                                        <Link
                                            key={i}
                                            href={link.url}
                                            className={`px-4 py-2 text-[11px] font-bold rounded-xl transition-all uppercase tracking-widest ${
                                                link.active 
                                                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                                                    : "bg-white border border-gray-100 text-gray-400 hover:border-emerald-200 hover:text-emerald-500"
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* IMPORT MODAL */}
            <Transition show={showImportModal} as={Fragment}>
                <Dialog 
                    as="div" 
                    className="relative z-[100]" 
                    onClose={() => !importing && setShowImportModal(false)}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-[2px]" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-[32px] bg-white p-8 text-left align-middle shadow-2xl transition-all border border-gray-100">
                                    <div className="flex items-center justify-between mb-8">
                                        <Dialog.Title as="h3" className="text-xl font-black text-gray-800 tracking-tight">
                                            Import <span className="text-emerald-500">Alternative</span>
                                        </Dialog.Title>
                                        {!importing && (
                                            <button
                                                onClick={() => setShowImportModal(false)}
                                                className="p-2 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-all"
                                            >
                                                <HiOutlineXMark className="h-5 w-5" />
                                            </button>
                                        )}
                                    </div>

                                    <form onSubmit={submitImport} className="space-y-6">
                                        <div className="space-y-3">
                                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                                                File Excel (.xlsx)
                                            </label>
                                            <div className="relative group">
                                                <input
                                                    type="file"
                                                    accept=".xlsx,.xls"
                                                    onChange={(e) => setImportFile(e.target.files[0])}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                    disabled={importing}
                                                    required
                                                />
                                                <div className="p-8 border-2 border-dashed border-gray-100 rounded-[24px] group-hover:border-emerald-200 group-hover:bg-emerald-50/30 transition-all text-center">
                                                    <HiOutlineArrowUpTray className="h-8 w-8 text-gray-300 mx-auto mb-3 group-hover:text-emerald-400 transition-colors" />
                                                    <p className="text-sm font-bold text-gray-500 group-hover:text-emerald-600 transition-colors">
                                                        {importFile ? importFile.name : "Klik atau seret file ke sini"}
                                                    </p>
                                                    <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-wider">
                                                        Maksimal 2MB • XLSX/XLS
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2 p-4 bg-amber-50 rounded-2xl border border-amber-100/50">
                                                <HiOutlineDocumentText className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                                                <p className="text-[11px] font-medium text-amber-700 leading-relaxed">
                                                    Pastikan format kolom sesuai dengan template yang telah diunduh untuk menghindari kesalahan sistem.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 pt-4">
                                            <button
                                                type="button"
                                                onClick={() => setShowImportModal(false)}
                                                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gray-50 text-[13px] font-bold text-gray-500 hover:bg-gray-100 transition-all"
                                                disabled={importing}
                                            >
                                                <HiOutlineXMark className="h-4 w-4" />
                                                <span>Batal</span>
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={importing || !importFile}
                                                className="flex-1 px-6 py-4 rounded-2xl bg-emerald-500 text-[13px] font-bold text-white hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                                            >
                                                {importing ? (
                                                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                ) : (
                                                    <HiOutlineCheckCircle className="h-4 w-4" />
                                                )}
                                                <span>{importing ? "Memproses..." : "Mulai Import"}</span>
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}


Index.layout = (page) => {
    const breadcrumbs = [
        { label: "Dashboard", href: route("admin.index") },
        { label: "Manajemen Alternative", active: true },
    ];

    return (
        <AuthenticatedLayout
            header="Manajemen Alternative"
            breadcrumbs={breadcrumbs}
        >
            {page}
        </AuthenticatedLayout>
    );
};

export default Index;
