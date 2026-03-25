import { Link, useForm, usePage } from '@inertiajs/react';
import { notifySuccess } from '@/Utils/useToast';
import { HiOutlineUser, HiOutlineEnvelope, HiOutlineCheckCircle } from 'react-icons/hi2';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            onSuccess: () => notifySuccess('Profil berhasil diperbarui.'),
            preserveScroll: true
        });
    };

    return (
        <section className="p-8 md:p-12 space-y-10">
            <header>
                <h2 className="text-2xl font-black text-gray-800 tracking-tight">
                    Informasi <span className="text-emerald-500">Profil</span>
                </h2>

                <p className="mt-2 text-sm text-gray-500 font-medium">
                    Perbarui informasi dasar akun dan alamat email Anda.
                </p>
            </header>

            <form onSubmit={submit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Nama Lengkap */}
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
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className={`block w-full pl-12 pr-4 py-4 bg-gray-50/50 border rounded-2xl text-sm transition-all outline-none ${
                                    errors.name
                                        ? "border-rose-200 focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500"
                                        : "border-gray-100 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                                }`}
                                placeholder="Masukkan nama lengkap"
                                required
                            />
                        </div>
                        {errors.name && (
                            <p className="text-[11px] font-bold text-rose-500 uppercase tracking-wider ml-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Alamat Email */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">
                            Alamat Email <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                                <HiOutlineEnvelope className="w-5 h-5" />
                            </div>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                className={`block w-full pl-12 pr-4 py-4 bg-gray-50/50 border rounded-2xl text-sm transition-all outline-none ${
                                    errors.email
                                        ? "border-rose-200 focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500"
                                        : "border-gray-100 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                                }`}
                                placeholder="nama@email.com"
                                required
                            />
                        </div>
                        {errors.email && (
                            <p className="text-[11px] font-bold text-rose-500 uppercase tracking-wider ml-1">
                                {errors.email}
                            </p>
                        )}
                    </div>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100/50">
                        <p className="text-sm text-amber-800 font-medium">
                            Alamat email Anda belum diverifikasi.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ml-2 font-bold underline hover:text-amber-900 transition-colors"
                            >
                                Kirim ulang email verifikasi.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-3 text-sm font-bold text-emerald-600 flex items-center gap-2">
                                <HiOutlineCheckCircle className="w-4 h-4" />
                                Tautan verifikasi baru telah dikirim.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center justify-end pt-8 border-t border-gray-50">
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500 text-sm font-bold text-white hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-500/20"
                        disabled={processing}
                    >
                        {processing ? (
                            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <HiOutlineCheckCircle className="h-5 w-5" />
                        )}
                        <span>{processing ? "Menyimpan..." : "Simpan Perubahan"}</span>
                    </button>
                </div>
            </form>
        </section>
    );
}
