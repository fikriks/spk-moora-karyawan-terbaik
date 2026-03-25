import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { 
    HiOutlineUser, 
    HiOutlineAdjustmentsHorizontal, 
    HiOutlineHashtag,
    HiOutlineCheckCircle
} from "react-icons/hi2";

/**
 * NilaiAlternativeForm
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
    const { data, setData, post, put, processing, errors } = useForm({
        alternative_id: initial.alternative_id || "",
        criteria_id: initial.criteria_id || "",
        nilai: initial.nilai || "",
    });

    /**
     * Kriteria yang dibatasi (Restricted)
     * Hanya boleh diisi oleh Ketua/Kasubag
     */
    const restrictedCriteriaNames = ["Tanggung Jawab", "Kerja Sama Tim"];

    /**
     * Filter kriteria berdasarkan role
     */
    const filteredKriterias =
        role === "operator"
            ? kriterias.filter((k) => !restrictedCriteriaNames.includes(k.name))
            : kriterias.filter((k) => restrictedCriteriaNames.includes(k.name));

    /**
     * Reset criteria_id jika tidak valid setelah filtering
     */
    useEffect(() => {
        const isValid = filteredKriterias.some(
            (k) => String(k.id) === String(data.criteria_id),
        );

        if (!isValid && data.criteria_id !== "") {
            setData("criteria_id", "");
        }
    }, [role, filteredKriterias]);

    /**
     * Submit handler
     */
    const submit = (e) => {
        e.preventDefault();

        if (method.toLowerCase() === "post") {
            post(onSubmitRoute);
        } else {
            put(onSubmitRoute);
        }
    };

    return (
        <form onSubmit={submit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {/* Alternatif */}
                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">
                        Pilih Pegawai <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                            <HiOutlineUser className="w-5 h-5" />
                        </div>
                        <select
                            value={data.alternative_id}
                            onChange={(e) => setData("alternative_id", e.target.value)}
                            className={`w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border rounded-2xl text-sm focus:ring-4 transition-all outline-none appearance-none ${
                                errors.alternative_id
                                    ? "border-rose-200 focus:ring-rose-500/10 focus:border-rose-500"
                                    : "border-gray-100 focus:ring-emerald-500/10 focus:border-emerald-500 group-hover:border-gray-200"
                            }`}
                            required
                        >
                            <option value="">-- Pilih Alternatif --</option>
                            {alternatifs.map((a) => (
                                <option key={a.id} value={a.id}>
                                    {a.name}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                    {errors.alternative_id && (
                        <p className="text-[11px] text-rose-500 font-bold ml-1 uppercase tracking-wider italic">
                            {errors.alternative_id}
                        </p>
                    )}
                </div>

                {/* Kriteria */}
                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">
                        Kriteria Penilaian <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                            <HiOutlineAdjustmentsHorizontal className="w-5 h-5" />
                        </div>
                        <select
                            value={data.criteria_id}
                            onChange={(e) => setData("criteria_id", e.target.value)}
                            className={`w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border rounded-2xl text-sm focus:ring-4 transition-all outline-none appearance-none ${
                                errors.criteria_id
                                    ? "border-rose-200 focus:ring-rose-500/10 focus:border-rose-500"
                                    : "border-gray-100 focus:ring-emerald-500/10 focus:border-emerald-500 group-hover:border-gray-200"
                            }`}
                            required
                        >
                            <option value="">-- Pilih Kriteria --</option>
                            {filteredKriterias.map((k) => (
                                <option key={k.id} value={k.id}>
                                    {k.name}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                    {filteredKriterias.length === 0 ? (
                        <p className="text-[11px] text-amber-500 font-bold ml-1 uppercase tracking-wider italic">
                            Tidak ada kriteria yang tersedia untuk role Anda.
                        </p>
                    ) : errors.criteria_id && (
                        <p className="text-[11px] text-rose-500 font-bold ml-1 uppercase tracking-wider italic">
                            {errors.criteria_id}
                        </p>
                    )}
                </div>

                {/* Nilai */}
                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">
                        Skor Penilaian <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                            <HiOutlineHashtag className="w-5 h-5" />
                        </div>
                        <input
                            type="number"
                            step="any"
                            value={data.nilai}
                            onChange={(e) => setData("nilai", e.target.value)}
                            placeholder="Contoh: 85"
                            className={`w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border rounded-2xl text-sm focus:ring-4 transition-all outline-none ${
                                errors.nilai
                                    ? "border-rose-200 focus:ring-rose-500/10 focus:border-rose-500"
                                    : "border-gray-100 focus:ring-emerald-500/10 focus:border-emerald-500 group-hover:border-gray-200"
                            }`}
                            required
                        />
                    </div>
                    <p className="text-[10px] text-gray-400 ml-1 font-medium">Masukkan nilai numerik sesuai dengan performa pegawai pada kriteria tersebut.</p>
                    {errors.nilai && (
                        <p className="text-[11px] text-rose-500 font-bold ml-1 uppercase tracking-wider italic">
                            {errors.nilai}
                        </p>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-gray-50 flex items-center justify-end">
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500 text-[13px] font-bold text-white hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-60 disabled:scale-100"
                >
                    <HiOutlineCheckCircle className="w-5 h-5" />
                    {processing ? "Memproses..." : submitLabel}
                </button>
            </div>
        </form>
    );
}
