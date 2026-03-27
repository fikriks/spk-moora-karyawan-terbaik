import React from "react";
import { useForm, usePage, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { 
    HiOutlineUser, 
    HiOutlineEnvelope, 
    HiOutlineLockClosed, 
    HiOutlineShieldCheck,
    HiOutlineChevronLeft,
    HiOutlineCheckCircle,
    HiOutlineXMark
} from "react-icons/hi2";

export default function Edit({ user }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        role: user.roles?.[0] || "pengelola_jkn",
        password: "",
    });
    const { roles } = usePage().props;

    function submit(e) {
        e.preventDefault();
        put(`/admin/users/${user.id}`);
    }

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                        Perbarui Informasi User
                    </h2>
                    <p className="text-sm text-gray-500 font-medium">
                        Ubah detail akun, alamat email, atau perbarui hak akses pengguna.
                    </p>
                </div>

                <Link
                    href="/admin/users"
                    className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-emerald-600 transition-colors group"
                >
                    <HiOutlineChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Kembali ke Daftar
                </Link>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <form onSubmit={submit} className="p-6 md:p-10 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">
                                Nama Lengkap
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                                    <HiOutlineUser className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    placeholder="Masukkan nama lengkap"
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

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">
                                Alamat Email
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                                    <HiOutlineEnvelope className="w-5 h-5" />
                                </div>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                    placeholder="nama@contoh.com"
                                    className={`w-full pl-12 pr-4 py-3 bg-gray-50/50 border rounded-2xl text-sm transition-all outline-none ${
                                        errors.email 
                                            ? "border-red-200 focus:ring-4 focus:ring-red-500/10 focus:border-red-500" 
                                            : "border-gray-100 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                                    }`}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs font-bold text-red-500 ml-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Role Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">
                                Hak Akses (Role)
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                                    <HiOutlineShieldCheck className="w-5 h-5" />
                                </div>
                                <select
                                    value={data.role}
                                    onChange={(e) => setData("role", e.target.value)}
                                    className={`w-full pl-12 pr-4 py-3 bg-gray-50/50 border rounded-2xl text-sm appearance-none transition-all outline-none ${
                                        errors.role 
                                            ? "border-red-200 focus:ring-4 focus:ring-red-500/10 focus:border-red-500" 
                                            : "border-gray-100 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                                    }`}
                                >
                                    <option value="operator_simpeg">Operator SIMPEG</option>
                                    <option value="pengelola_jkn">Pengelola JKN</option>
                                    <option value="kasubag_tu">Kasubag TU</option>
                                    <option value="bendahara_pengeluaran">Bendahara Pengeluaran</option>
                                    <option value="kepala_puskesmas">Kepala Puskesmas</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            {errors.role && (
                                <p className="text-xs font-bold text-red-500 ml-1">{errors.role}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">
                                Kata Sandi (Opsional)
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                                    <HiOutlineLockClosed className="w-5 h-5" />
                                </div>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData("password", e.target.value)}
                                    placeholder="Kosongkan jika tidak ingin diubah"
                                    className={`w-full pl-12 pr-4 py-3 bg-gray-50/50 border rounded-2xl text-sm transition-all outline-none ${
                                        errors.password 
                                            ? "border-red-200 focus:ring-4 focus:ring-red-500/10 focus:border-red-500" 
                                            : "border-gray-100 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                                    }`}
                                />
                            </div>
                            {errors.password && (
                                <p className="text-xs font-bold text-red-500 ml-1">{errors.password}</p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button Area */}
                    <div className="pt-6 border-t border-gray-50 flex items-center justify-end gap-4">
                        <Link
                            href="/admin/users"
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
                            <span>{processing ? "Menyimpan..." : "Perbarui Pengguna"}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

Edit.layout = (page) => {
    const breadcrumbs = [
        { label: "Dashboard", href: route("admin.index") },
        { label: "User Management", href: route("users.index") },
        { label: "Edit User", active: true },
    ];

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            {page}
        </AuthenticatedLayout>
    );
};
