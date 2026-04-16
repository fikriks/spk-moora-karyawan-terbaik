import React, { useEffect, useMemo } from "react";
import { useForm } from "@inertiajs/react";
import { 
    HiOutlineUserGroup, 
    HiOutlineAdjustmentsHorizontal, 
    HiOutlineClipboardDocumentCheck,
    HiOutlineCheckCircle
} from "react-icons/hi2";

/**
 * NilaiForm
 *
 * props:
 * - initial: object awal (untuk edit)
 * - alternatifs: array [{id, name}]
 * - kriterias: array [{id, name}]
 * - role: string (contoh: 'operator_simpeg', 'admin')
 * - onSubmitRoute: route string
 * - method: 'post' | 'put' | 'patch'
 * - submitLabel: teks tombol submit
 */
export default function NilaiAlternativeForm({
    initial = {},
    alternatifs = [],
    kriterias = [],
    role,
    onSubmitRoute,
    method = "post",
    submitLabel = "Simpan Data",
}) {
    // Initial scores mapping
    const initialScores = {};
    if (initial.criteria_id) {
        initialScores[initial.criteria_id] = initial.nilai || "";
    }

    const form = useForm({
        alternative_id: initial.alternative_id ? String(initial.alternative_id) : "",
        scores: initialScores, // Mapping { criteria_id: value }
    });

    const handleScoreChange = (criteriaId, value) => {
        form.setData("scores", {
            ...form.data.scores,
            [criteriaId]: value,
        });
    };

    const submit = (e) => {
        e.preventDefault();
        // Backend now expects { alternative_id, scores: { [id]: value } }
        if (method.toLowerCase() === "post") {
            form.post(onSubmitRoute);
        } else {
            // For update, we might need a different handling if it was a single ID update,
            // but the controller update method also needs logic for multiple if we want to support it.
            // For now, let's stick to the creation use case which was requested.
            form.put(onSubmitRoute, { preserveScroll: true });
        }
    };

    return (
        <form onSubmit={submit} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* ALTERNATIF */}
                <div className="space-y-4">
                    <label className="text-[12px] font-black text-gray-400 uppercase tracking-[0.3em] ml-1">
                        Pilih Alternatif / Pegawai <span className="text-rose-500 font-bold">*</span>
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                            <HiOutlineUserGroup className="w-5 h-5" />
                        </div>
                        <select
                            value={form.data.alternative_id}
                            onChange={(e) => form.setData("alternative_id", e.target.value)}
                            className={`block w-full pl-12 pr-4 py-4 bg-gray-50/50 border rounded-3xl text-sm transition-all shadow-sm outline-none appearance-none ${
                                form.errors.alternative_id
                                    ? "border-rose-200 focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500"
                                    : "border-gray-100 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                            }`}
                            required
                        >
                            <option value="">-- Pilih Alternatif --</option>
                            {alternatifs.map((a) => (
                                <option key={a.id} value={a.id}>{a.name}</option>
                            ))}
                        </select>
                    </div>
                    {form.errors.alternative_id && (
                        <p className="text-[11px] font-bold text-rose-500 uppercase tracking-wider ml-1">
                            {form.errors.alternative_id}
                        </p>
                    )}
                </div>

                <div className="hidden md:block">
                    {/* Spacer/Empty div for grid balance */}
                </div>
            </div>

            {/* KRITERIA LIST */}
            <div className="space-y-8">
                <div className="flex items-center gap-4">
                    <div className="h-[1px] flex-1 bg-gray-100"></div>
                    <label className="text-[12px] font-black text-gray-400 uppercase tracking-[0.3em]">
                        Input Nilai Penilaian
                    </label>
                    <div className="h-[1px] flex-1 bg-gray-100"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {kriterias.map((k) => (
                        <div 
                            key={k.id} 
                            className="p-6 bg-white border border-gray-100 rounded-[2rem] hover:shadow-xl hover:shadow-emerald-500/5 hover:border-emerald-100 transition-all group"
                        >
                            <div className="space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <p className="text-[11px] font-black text-emerald-500 uppercase tracking-widest">
                                            {k.code || `C${k.id}`}
                                        </p>
                                        <h4 className="text-sm font-bold text-gray-700 leading-tight">
                                            {k.name}
                                        </h4>
                                    </div>
                                    <HiOutlineAdjustmentsHorizontal className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-emerald-500 transition-colors">
                                        <HiOutlineClipboardDocumentCheck className="w-4 h-4" />
                                    </div>
                                    <input
                                        type="number"
                                        step="any"
                                        value={form.data.scores[k.id] || ""}
                                        onChange={(e) => handleScoreChange(k.id, e.target.value)}
                                        className="block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {kriterias.length === 0 && (
                    <div className="py-12 text-center bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-100 text-gray-400 italic text-sm">
                        Tidak ada kriteria penilaian yang tersedia.
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end pt-8 border-t border-gray-50">
                <button
                    type="submit"
                    className="flex items-center gap-3 px-10 py-5 rounded-3xl bg-emerald-500 text-sm font-black text-white hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-emerald-500/25 hover:-translate-y-1"
                    disabled={form.processing}
                >
                    {form.processing ? (
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <HiOutlineCheckCircle className="h-5 w-5" />
                    )}
                    <span className="tracking-widest uppercase">{form.processing ? "Menyimpan..." : submitLabel}</span>
                </button>
            </div>
        </form>
    );
}
