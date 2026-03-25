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
 * - role: string (contoh: 'operator', 'admin')
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
    const form = useForm({
        alternative_id: initial.alternative_id ? String(initial.alternative_id) : "",
        criteria_id: initial.criteria_id ? String(initial.criteria_id) : "",
        nilai: initial.nilai ?? "",
    });

    const restrictedCriteriaNames = ["Tanggung Jawab", "Kerja Sama Tim"];

    const filteredKriterias = useMemo(() => {
        if (role === "operator") {
            return kriterias.filter((k) => restrictedCriteriaNames.includes(k.name));
        }
        return kriterias.filter((k) => !restrictedCriteriaNames.includes(k.name));
    }, [role, kriterias]);

    useEffect(() => {
        if (!form.data.criteria_id) return;
        const isValid = filteredKriterias.some(
            (k) => String(k.id) === String(form.data.criteria_id),
        );
        if (!isValid) {
            form.setData("criteria_id", "");
        }
    }, [filteredKriterias]);

    const submit = (e) => {
        e.preventDefault();
        if (method.toLowerCase() === "post") {
            form.post(onSubmitRoute);
        } else {
            form.put(onSubmitRoute, { preserveScroll: true });
        }
    };

    return (
        <form onSubmit={submit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* ALTERNATIF */}
                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">
                        Pilih Alternatif / Pegawai <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                            <HiOutlineUserGroup className="w-5 h-5" />
                        </div>
                        <select
                            value={form.data.alternative_id}
                            onChange={(e) => form.setData("alternative_id", e.target.value)}
                            className={`block w-full pl-12 pr-4 py-4 bg-gray-50/50 border rounded-2xl text-sm transition-all outline-none appearance-none ${
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

                {/* KRITERIA */}
                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">
                        Pilih Kriteria Penilaian <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                            <HiOutlineAdjustmentsHorizontal className="w-5 h-5" />
                        </div>
                        <select
                            value={form.data.criteria_id}
                            onChange={(e) => form.setData("criteria_id", e.target.value)}
                            className={`block w-full pl-12 pr-4 py-4 bg-gray-50/50 border rounded-2xl text-sm transition-all outline-none appearance-none ${
                                form.errors.criteria_id
                                    ? "border-rose-200 focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500"
                                    : "border-gray-100 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                            }`}
                            required
                        >
                            <option value="">-- Pilih Kriteria --</option>
                            {filteredKriterias.map((k) => (
                                <option key={k.id} value={k.id}>{k.name}</option>
                            ))}
                        </select>
                    </div>
                    {filteredKriterias.length === 0 && (
                        <p className="text-[11px] font-bold text-amber-500 uppercase tracking-wider ml-1">
                            Tidak ada kriteria yang tersedia untuk akses Anda.
                        </p>
                    )}
                    {form.errors.criteria_id && (
                        <p className="text-[11px] font-bold text-rose-500 uppercase tracking-wider ml-1">
                            {form.errors.criteria_id}
                        </p>
                    )}
                </div>

                {/* NILAI */}
                <div className="space-y-2 md:col-span-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">
                        Input Nilai Numerik <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                            <HiOutlineClipboardDocumentCheck className="w-5 h-5" />
                        </div>
                        <input
                            type="number"
                            step="any"
                            value={form.data.nilai}
                            onChange={(e) => form.setData("nilai", e.target.value)}
                            className={`block w-full pl-12 pr-4 py-4 bg-gray-50/50 border rounded-2xl text-sm transition-all outline-none ${
                                form.errors.nilai
                                    ? "border-rose-200 focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500"
                                    : "border-gray-100 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                            }`}
                            placeholder="Masukkan nilai (contoh: 85 atau 3.5)"
                            required
                        />
                    </div>
                    {form.errors.nilai && (
                        <p className="text-[11px] font-bold text-rose-500 uppercase tracking-wider ml-1">
                            {form.errors.nilai}
                        </p>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end pt-6 border-t border-gray-50">
                <button
                    type="submit"
                    className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500 text-sm font-bold text-white hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-500/20"
                    disabled={form.processing}
                >
                    {form.processing ? (
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <HiOutlineCheckCircle className="h-5 w-5" />
                    )}
                    <span>{form.processing ? "Menyimpan..." : submitLabel}</span>
                </button>
            </div>
        </form>
    );
}
