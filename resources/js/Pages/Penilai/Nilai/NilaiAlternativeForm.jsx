import React, { useEffect } from "react";
import { useForm, Link } from "@inertiajs/react";
import { 
    HiOutlineUser, 
    HiOutlineClipboardDocumentList, 
    HiOutlinePresentationChartLine,
    HiOutlineCheckCircle,
    HiOutlineArrowLeft
} from "react-icons/hi2";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";

export default function NilaiForm({
    initial = {}, // Ini adalah objek Alternative dengan relasi nilais
    alternatifs = [],
    kriterias = [],
    role,
    onSubmitRoute,
    method = "post",
    submitLabel = "Simpan Nilai",
    cancelRoute,
}) {
    // Initial scores mapping dari relasi nilais
    const initialScores = {};
    if (initial.nilais) {
        initial.nilais.forEach((n) => {
            initialScores[n.criteria_id] = n.value;
        });
    }

    const form = useForm({
        alternative_id: initial.id || "",
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
        if (method.toLowerCase() === "post") {
            form.post(onSubmitRoute);
        } else {
            form.put(onSubmitRoute);
        }
    };

    return (
        <form onSubmit={submit} className="p-8 md:p-12 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Alternatif */}
                <div className="space-y-2">
                    <InputLabel htmlFor="alternative_id" value="Pegawai / Alternatif" className="text-[10px] tracking-[0.2em] mb-3" />
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                            <HiOutlineUser className="w-5 h-5" />
                        </div>
                        <select
                            id="alternative_id"
                            value={form.data.alternative_id}
                            onChange={(e) => form.setData("alternative_id", e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none appearance-none disabled:bg-gray-100 disabled:text-gray-400"
                            required
                            disabled={!!initial.id} // Disable jika sedang edit
                        >
                            <option value="">Pilih Pegawai</option>
                            {alternatifs.map((a) => (
                                <option key={a.id} value={a.id}>
                                    {a.name}
                                </option>
                            ))}
                        </select>
                        {!initial.id && (
                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                            </div>
                        )}
                    </div>
                    <InputError message={form.errors.alternative_id} />
                </div>
            </div>

            {/* Grid Kriteria */}
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="h-[1px] flex-1 bg-gray-100"></div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                        Input Nilai Penilaian
                    </span>
                    <div className="h-[1px] flex-1 bg-gray-100"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {kriterias.map((k) => (
                        <div key={k.id} className="p-6 bg-white border border-gray-100 rounded-3xl hover:border-emerald-200 transition-all group">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">{k.code || `C${k.id}`}</p>
                                    <h4 className="text-xs font-bold text-gray-700 leading-tight line-clamp-1">{k.name}</h4>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-emerald-500 transition-colors">
                                        <HiOutlinePresentationChartLine className="w-4 h-4" />
                                    </div>
                                    <input
                                        type="number"
                                        step="any"
                                        value={form.data.scores[k.id] || ""}
                                        onChange={(e) => handleScoreChange(k.id, e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-100 rounded-2xl text-xs focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <InputError message={form.errors.scores} />
            </div>

            {/* Actions */}
            <div className="pt-8 border-t border-gray-50 flex items-center justify-end gap-4">
                {cancelRoute && (
                    <Link
                        href={cancelRoute}
                        className="px-6 py-3 rounded-2xl text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        Batal
                    </Link>
                )}
                <PrimaryButton 
                    type="submit"
                    className="px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-2"
                    disabled={form.processing}
                >
                    {form.processing ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <HiOutlineCheckCircle className="w-5 h-5" />
                    )}
                    <span>{submitLabel}</span>
                </PrimaryButton>
            </div>
        </form>
    );
}
