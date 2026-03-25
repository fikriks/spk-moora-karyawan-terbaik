import React from "react";
import { useForm, Link } from "@inertiajs/react";
import { 
    HiOutlineCheckCircle, 
    HiOutlineXMark,
    HiOutlineHashtag,
    HiOutlineTag,
    HiOutlineScale,
    HiOutlineListBullet,
    HiOutlineBars3BottomLeft,
    HiOutlineChevronDown
} from "react-icons/hi2";

export default function CriteriaForm({
    initial = {},
    onSubmitRoute,
    method = "post",
    submitLabel = "Simpan Kriteria",
}) {
    const { data, setData, post, put, processing, errors } = useForm({
        code: initial.code || "",
        name: initial.name || "",
        type: initial.type || "benefit",
        weight: initial.weight ?? 0,
        description: initial.description || "",
        order: initial.order ?? 0,
    });

    const submit = (e) => {
        e.preventDefault();
        if (method === "post") {
            post(onSubmitRoute);
        } else {
            put(onSubmitRoute);
        }
    };

    return (
        <form onSubmit={submit} className="p-6 md:p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Kode */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">
                        Kode Kriteria
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                            <HiOutlineHashtag className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            value={data.code}
                            onChange={(e) => setData("code", e.target.value)}
                            placeholder="Contoh: C1"
                            className={`w-full pl-12 pr-4 py-3 bg-gray-50/50 border rounded-2xl text-sm transition-all outline-none ${
                                errors.code 
                                    ? "border-red-200 focus:ring-4 focus:ring-red-500/10 focus:border-red-500" 
                                    : "border-gray-100 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                            }`}
                        />
                    </div>
                    {errors.code && (
                        <p className="text-xs font-bold text-red-500 ml-1">{errors.code}</p>
                    )}
                </div>

                {/* Urutan */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">
                        Urutan Tampil
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                            <HiOutlineListBullet className="w-5 h-5" />
                        </div>
                        <input
                            type="number"
                            value={data.order}
                            onChange={(e) => setData("order", e.target.value)}
                            placeholder="0"
                            className={`w-full pl-12 pr-4 py-3 bg-gray-50/50 border rounded-2xl text-sm transition-all outline-none ${
                                errors.order 
                                    ? "border-red-200 focus:ring-4 focus:ring-red-500/10 focus:border-red-500" 
                                    : "border-gray-100 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                            }`}
                        />
                    </div>
                    {errors.order && (
                        <p className="text-xs font-bold text-red-500 ml-1">{errors.order}</p>
                    )}
                </div>

                {/* Nama */}
                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">
                        Nama Kriteria <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                            <HiOutlineTag className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Masukkan nama kriteria"
                            required
                            className={`w-full pl-12 pr-4 py-3 bg-gray-50/50 border rounded-2xl text-sm transition-all outline-none ${
                                errors.name 
                                    ? "border-red-200 focus:ring-4 focus:ring-red-500/10 focus:border-red-500" 
                                    : "border-gray-100 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                            }`}
                        />
                    </div>
                    {errors.name && (
                        <p className="text-xs font-bold text-red-500 ml-1">{errors.name}</p>
                    )}
                </div>

                {/* Tipe */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">
                        Tipe Kriteria <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                            <HiOutlineBars3BottomLeft className="w-5 h-5" />
                        </div>
                        <select
                            value={data.type}
                            onChange={(e) => setData("type", e.target.value)}
                            className={`w-full pl-12 pr-10 py-3 bg-gray-50/50 border rounded-2xl text-sm appearance-none transition-all outline-none ${
                                errors.type 
                                    ? "border-red-200 focus:ring-4 focus:ring-red-500/10 focus:border-red-500" 
                                    : "border-gray-100 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                            }`}
                        >
                            <option value="benefit">Benefit (Maksimal)</option>
                            <option value="cost">Cost (Minimal)</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                            <HiOutlineChevronDown className="w-4 h-4" />
                        </div>
                    </div>
                    {errors.type && (
                        <p className="text-xs font-bold text-red-500 ml-1">{errors.type}</p>
                    )}
                </div>

                {/* Bobot */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">
                        Bobot Kepentingan <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                            <HiOutlineScale className="w-5 h-5" />
                        </div>
                        <input
                            type="number"
                            step="0.0001"
                            value={data.weight}
                            onChange={(e) => setData("weight", e.target.value)}
                            placeholder="Contoh: 0.25"
                            required
                            className={`w-full pl-12 pr-4 py-3 bg-gray-50/50 border rounded-2xl text-sm transition-all outline-none ${
                                errors.weight 
                                    ? "border-red-200 focus:ring-4 focus:ring-red-500/10 focus:border-red-500" 
                                    : "border-gray-100 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                            }`}
                        />
                    </div>
                    {errors.weight && (
                        <p className="text-xs font-bold text-red-500 ml-1">{errors.weight}</p>
                    )}
                </div>

                {/* Deskripsi */}
                <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">
                        Deskripsi
                    </label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        placeholder="Deskripsi singkat mengenai kriteria ini (opsional)"
                        rows="4"
                        className={`w-full px-5 py-3 bg-gray-50/50 border rounded-2xl text-sm transition-all outline-none min-h-[120px] ${
                            errors.description 
                                ? "border-red-200 focus:ring-4 focus:ring-red-500/10 focus:border-red-500" 
                                : "border-gray-100 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                        }`}
                    />
                    {errors.description && (
                        <p className="text-xs font-bold text-red-500 ml-1">{errors.description}</p>
                    )}
                </div>
            </div>

            {/* Submit Button Area */}
            <div className="pt-6 border-t border-gray-50 flex items-center justify-end gap-4">
                <Link
                    href={route("criteria.index")}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-2xl transition-all"
                >
                    <HiOutlineXMark className="w-5 h-5" />
                    <span>Batalkan</span>
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50 disabled:active:scale-100 transition-all text-sm"
                >
                    <HiOutlineCheckCircle className="w-5 h-5" />
                    <span>{processing ? "Menyimpan..." : submitLabel}</span>
                </button>
            </div>
        </form>
    );
}
