import React, { useEffect, useMemo, useState } from "react";
import { Link, usePage, router, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { notifySuccess } from "@/Utils/useToast";
import { confirmAction } from "@/Utils/useConfirm";
import { 
    HiOutlinePlus, 
    HiOutlineMagnifyingGlass, 
    HiOutlineXMark, 
    HiOutlinePencilSquare, 
    HiOutlineTrash,
    HiOutlineClipboardDocumentCheck,
    HiOutlineLockClosed
} from "react-icons/hi2";

function Index() {
    const { 
        nilaiAlternatives: rawNilaiAlternatives, 
        filters: initialFilters = {}, 
        auth 
    } = usePage().props;

    const userRole = auth?.user?.role;

    /* ===============================
     * SEARCH + DEBOUNCE
     * =============================== */
    const [query, setQuery] = useState(() => {
        try {
            const url = new URL(window.location.href);
            return url.searchParams.get("q") || initialFilters.q || "";
        } catch {
            return initialFilters.q || "";
        }
    });
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

    /* ===============================
     * DATA
     * =============================== */
    const items = useMemo(() => {
        if (!rawNilaiAlternatives) return [];
        if (Array.isArray(rawNilaiAlternatives.data)) return rawNilaiAlternatives.data;
        return [];
    }, [rawNilaiAlternatives]);

    const total = rawNilaiAlternatives?.total ?? items.length;

    /* ===============================
     * ROLE-BASED EDIT RULE
     * =============================== */
    const restrictedCriteriaNames = ["Tanggung Jawab", "Kerja Sama Tim"];

    function canEdit(role, criteriaName) {
        if (!criteriaName) return false;
        const isRestricted = restrictedCriteriaNames.includes(criteriaName);
        // Kasubag (non-operator) manages restricted criteria
        if (role === "operator") return !isRestricted;
        return isRestricted;
    }

    /* ===============================
     * DELETE
     * =============================== */
    function handleDelete(id, label) {
        confirmAction(`Hapus nilai ${label}?`, () => {
            router.delete(route("kasubag.nilai.destroy", id), {
                preserveScroll: true,
                onSuccess: () => notifySuccess("Data penilaian berhasil dihapus"),
            });
        });
    }

    return (
        <div className="space-y-8">
            <Head title="Data Penilaian" />
            
            {/* HEADER & ACTIONS */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h2 className="text-3xl font-black text-gray-800 tracking-tight">Data <span className="text-emerald-500">Penilaian</span></h2>
                    <p className="text-sm text-gray-500 font-medium max-w-md leading-relaxed">Kelola matriks keputusan nilai alternatif terhadap setiap kriteria penilaian MOORA.</p>
                </div>
                <Link href={route("kasubag.nilai.create")} className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 text-[13px] font-bold text-white hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
                    <HiOutlinePlus className="h-4 w-4" /> Tambah Penilaian
                </Link>
            </div>

            {/* TABLE CARD */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] overflow-hidden">
                {/* SEARCH AREA */}
                <div className="p-6 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md group w-full">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                            <HiOutlineMagnifyingGlass className={`w-5 h-5 ${searching ? 'animate-pulse text-emerald-500' : ''}`} />
                        </div>
                        <input 
                            type="text" 
                            value={query} 
                            onChange={(e) => setQuery(e.target.value)} 
                            placeholder="Cari pegawai atau kriteria..." 
                            className="w-full pl-12 pr-10 py-3 bg-white border border-gray-100 rounded-2xl text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none shadow-sm placeholder:text-gray-400" 
                        />
                        {query && !searching && (
                            <button onClick={() => setQuery("")} className="absolute inset-y-0 right-4 flex items-center p-1 text-gray-300 hover:text-gray-500 transition-colors">
                                <HiOutlineXMark className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                    <div className="hidden sm:block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                        Total: <span className="text-gray-700">{total}</span> Baris
                    </div>
                </div>

                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 w-20 text-center">No</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Pegawai</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Kriteria</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 text-center">Nilai</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {items.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-300 space-y-4">
                                            <HiOutlineClipboardDocumentCheck className="w-16 h-16 opacity-10" />
                                            <p className="text-[11px] font-bold uppercase tracking-[0.2em]">Data tidak ditemukan</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                items.map((item, i) => {
                                    const allowedEdit = canEdit(userRole, item.criteria?.name);

                                    return (
                                        <tr key={item.id} className="group hover:bg-emerald-50/30 transition-colors">
                                            <td className="px-8 py-6 text-sm font-bold text-gray-300 text-center">
                                                {(rawNilaiAlternatives.from ?? 0) + i}
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 font-bold group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-all">
                                                        {item.alternative?.name?.charAt(0).toUpperCase() ?? "-"}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-gray-700 tracking-tight group-hover:text-emerald-600 transition-colors uppercase leading-tight">
                                                            {item.alternative?.name ?? "-"}
                                                        </span>
                                                        <span className="text-[11px] text-gray-400 font-medium mt-0.5">{item.alternative?.jabatan ?? "-"}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 text-gray-500 text-[11px] font-bold uppercase tracking-wider border border-gray-100/50">
                                                    {item.criteria?.name ?? "-"}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <span className="text-sm font-black text-gray-700 bg-gray-100 px-4 py-2 rounded-2xl border border-gray-200/50">
                                                    {item.value}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {allowedEdit ? (
                                                        <Link
                                                            href={route("kasubag.nilai.edit", item.id)}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all text-[11px] font-bold uppercase tracking-wider shadow-sm"
                                                        >
                                                            <HiOutlinePencilSquare className="w-3.5 h-3.5" />
                                                            <span>Edit</span>
                                                        </Link>
                                                    ) : (
                                                        <div 
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 text-gray-300 border border-gray-100/50 text-[11px] font-bold uppercase tracking-wider cursor-not-allowed"
                                                            title="Akses Dibatasi"
                                                        >
                                                            <HiOutlineLockClosed className="w-3.5 h-3.5" />
                                                            <span>Locked</span>
                                                        </div>
                                                    )}
                                                    <button
                                                        onClick={() => handleDelete(item.id, `${item.alternative?.name} - ${item.criteria?.name}`)}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-100 transition-all text-[11px] font-bold uppercase tracking-wider shadow-sm"
                                                    >
                                                        <HiOutlineTrash className="w-3.5 h-3.5" />
                                                        <span>Hapus</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer / Pagination */}
                <div className="px-8 py-6 border-t border-gray-50 bg-gray-50/30 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                        Menampilkan <span className="text-emerald-500">{rawNilaiAlternatives.from ?? 0}</span> - <span className="text-emerald-500">{rawNilaiAlternatives.to ?? 0}</span> dari <span className="text-gray-700">{total}</span> data
                    </p>
                    
                    {rawNilaiAlternatives?.links && rawNilaiAlternatives.links.length > 3 && (
                        <div className="flex items-center gap-2">
                            {rawNilaiAlternatives.links.map((link, i) => {
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
    );
}

Index.layout = (page) => {
    const breadcrumbs = [
        { label: "Data Penilaian", active: true },
    ];

    return (
        <AuthenticatedLayout
            header="Data Penilaian"
            breadcrumbs={breadcrumbs}
        >
            {page}
        </AuthenticatedLayout>
    );
};

export default Index;
