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
    initial = {},
    alternatifs = [],
    kriterias = [],
    role,
    onSubmitRoute,
    method = "post",
    submitLabel = "Simpan Nilai",
    cancelRoute,
}) {
    const { data, setData, post, put, processing, errors } = useForm({
        alternative_id: initial.alternative_id || "",
        criteria_id: initial.criteria_id || "",
        nilai: initial.nilai || "",
    });

    const restrictedCriteriaNames = ["Tanggung Jawab", "Kerja Sama Tim"];

    const filteredKriterias =
        role === "operator_simpeg"
            ? kriterias.filter((k) => !restrictedCriteriaNames.includes(k.name))
            : kriterias.filter((k) => restrictedCriteriaNames.includes(k.name));

    useEffect(() => {
        const isValid = filteredKriterias.some(
            (k) => String(k.id) === String(data.criteria_id),
        );

        if (!isValid && data.criteria_id !== "") {
            setData("criteria_id", "");
        }
    }, [role, filteredKriterias]);

    const submit = (e) => {
        e.preventDefault();
        if (method.toLowerCase() === "post") {
            post(onSubmitRoute);
        } else {
            put(onSubmitRoute);
        }
    };

    return (
        <form onSubmit={submit} className="p-8 md:p-12 space-y-10">
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
                            value={data.alternative_id}
                            onChange={(e) => setData("alternative_id", e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none appearance-none"
                            required
                        >
                            <option value="">Pilih Pegawai</option>
                            {alternatifs.map((a) => (
                                <option key={a.id} value={a.id}>
                                    {a.name}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                        </div>
                    </div>
                    <InputError message={errors.alternative_id} />
                </div>

                {/* Kriteria */}
                <div className="space-y-2">
                    <InputLabel htmlFor="criteria_id" value="Kriteria Penilaian" className="text-[10px] tracking-[0.2em] mb-3" />
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                            <HiOutlineClipboardDocumentList className="w-5 h-5" />
                        </div>
                        <select
                            id="criteria_id"
                            value={data.criteria_id}
                            onChange={(e) => setData("criteria_id", e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none appearance-none"
                            required
                        >
                            <option value="">Pilih Kriteria</option>
                            {filteredKriterias.map((k) => (
                                <option key={k.id} value={k.id}>
                                    {k.name}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                        </div>
                    </div>
                    {filteredKriterias.length === 0 && (
                        <p className="mt-1 text-[10px] text-amber-600 font-bold uppercase tracking-wider">
                            * Tidak ada kriteria yang tersedia untuk akses Anda.
                        </p>
                    )}
                    <InputError message={errors.criteria_id} />
                </div>

                {/* Nilai */}
                <div className="space-y-2 md:col-span-2">
                    <InputLabel htmlFor="nilai" value="Skor / Nilai" className="text-[10px] tracking-[0.2em] mb-3" />
                    <div className="relative group max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                            <HiOutlinePresentationChartLine className="w-5 h-5" />
                        </div>
                        <input
                            id="nilai"
                            type="number"
                            step="any"
                            value={data.nilai}
                            onChange={(e) => setData("nilai", e.target.value)}
                            placeholder="Contoh: 85"
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
                            required
                        />
                    </div>
                    <p className="text-[10px] text-gray-400 font-medium tracking-wide">Masukkan angka sesuai dengan indikator penilaian kriteria tersebut.</p>
                    <InputError message={errors.nilai} />
                </div>
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
                    className="px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-2"
                    disabled={processing}
                >
                    {processing ? (
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
