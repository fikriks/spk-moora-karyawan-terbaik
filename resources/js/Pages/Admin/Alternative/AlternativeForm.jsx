import React from "react";
import { useForm } from "@inertiajs/react";
import { 
    HiOutlineIdentification, 
    HiOutlineUser, 
    HiOutlineBriefcase,
    HiOutlineCheckCircle
} from "react-icons/hi2";

/**
 * AlternativeForm
 *
 * props:
 * - initial: object awal (untuk edit)
 * - onSubmitRoute: route string (mis. route('alternative.store') atau '/alternative')
 * - method: 'post' | 'put' | 'patch' (default 'post')
 * - submitLabel: teks tombol submit (default: 'Simpan')
 */
export default function AlternativeForm({
    initial = {},
    onSubmitRoute,
    method = "post",
    submitLabel = "Simpan Data",
}) {
    const form = useForm({
        nip: initial.nip || "",
        name: initial.name || "",
        jabatan: initial.jabatan || "",
        golongan: initial.golongan || "",
        jenis_ketenagakerjaan: initial.jenis_ketenagakerjaan || "",
    });

    const submit = (e) => {
        e.preventDefault();

        const options = {
            onSuccess: () => {
                // optional: reset form if creating
            },
        };

        if (method.toLowerCase() === "post") {
            form.post(onSubmitRoute, options);
        } else {
            form.put(onSubmitRoute, options);
        }
    };

    return (
        <form onSubmit={submit} className="space-y-8">
            <div className="grid grid-cols-1 gap-8">
                {/* NIP */}
                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">
                        Nomor Induk Pegawai (NIP)
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                            <HiOutlineIdentification className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            value={form.data.nip}
                            onChange={(e) => form.setData("nip", e.target.value)}
                            className={`block w-full pl-12 pr-4 py-4 bg-gray-50/50 border rounded-2xl text-sm transition-all outline-none ${
                                form.errors.nip
                                    ? "border-rose-200 focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500"
                                    : "border-gray-100 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                            }`}
                            placeholder="Contoh: 199001012020011001"
                        />
                    </div>
                    {form.errors.nip && (
                        <p className="text-[11px] font-bold text-rose-500 uppercase tracking-wider ml-1">
                            {form.errors.nip}
                        </p>
                    )}
                </div>

                {/* Nama */}
                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">
                        Nama Lengkap <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                            <HiOutlineUser className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            value={form.data.name}
                            onChange={(e) => form.setData("name", e.target.value)}
                            className={`block w-full pl-12 pr-4 py-4 bg-gray-50/50 border rounded-2xl text-sm transition-all outline-none ${
                                form.errors.name
                                    ? "border-rose-200 focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500"
                                    : "border-gray-100 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                            }`}
                            placeholder="Masukkan nama lengkap"
                            required
                        />
                    </div>
                    {form.errors.name && (
                        <p className="text-[11px] font-bold text-rose-500 uppercase tracking-wider ml-1">
                            {form.errors.name}
                        </p>
                    )}
                </div>

                {/* Jabatan */}
                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">
                        Jabatan Saat Ini <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                            <HiOutlineBriefcase className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            value={form.data.jabatan}
                            onChange={(e) => form.setData("jabatan", e.target.value)}
                            className={`block w-full pl-12 pr-4 py-4 bg-gray-50/50 border rounded-2xl text-sm transition-all outline-none ${
                                form.errors.jabatan
                                    ? "border-rose-200 focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500"
                                    : "border-gray-100 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                            }`}
                            placeholder="Contoh: Staff TU"
                            required
                        />
                    </div>
                    {form.errors.jabatan && (
                        <p className="text-[11px] font-bold text-rose-500 uppercase tracking-wider ml-1">
                            {form.errors.jabatan}
                        </p>
                    )}
                </div>

                {/* Golongan */}
                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">
                        Golongan
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                            <HiOutlineIdentification className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            value={form.data.golongan}
                            onChange={(e) => form.setData("golongan", e.target.value)}
                            className={`block w-full pl-12 pr-4 py-4 bg-gray-50/50 border rounded-2xl text-sm transition-all outline-none ${
                                form.errors.golongan
                                    ? "border-rose-200 focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500"
                                    : "border-gray-100 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                            }`}
                            placeholder="Contoh: III/a, IV/b"
                        />
                    </div>
                    {form.errors.golongan && (
                        <p className="text-[11px] font-bold text-rose-500 uppercase tracking-wider ml-1">
                            {form.errors.golongan}
                        </p>
                    )}
                </div>

                {/* Jenis Ketenagakerjaan */}
                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">
                        Jenis Ketenagakerjaan
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                            <HiOutlineBriefcase className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            value={form.data.jenis_ketenagakerjaan}
                            onChange={(e) => form.setData("jenis_ketenagakerjaan", e.target.value)}
                            className={`block w-full pl-12 pr-4 py-4 bg-gray-50/50 border rounded-2xl text-sm transition-all outline-none ${
                                form.errors.jenis_ketenagakerjaan
                                    ? "border-rose-200 focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500"
                                    : "border-gray-100 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                            }`}
                            placeholder="Contoh: Tenaga Kesehatan D3"
                        />
                    </div>
                    {form.errors.jenis_ketenagakerjaan && (
                        <p className="text-[11px] font-bold text-rose-500 uppercase tracking-wider ml-1">
                            {form.errors.jenis_ketenagakerjaan}
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
