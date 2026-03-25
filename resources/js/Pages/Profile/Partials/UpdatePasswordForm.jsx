import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { notifySuccess } from '@/Utils/useToast';
import { HiOutlineLockClosed, HiOutlineCheckCircle } from 'react-icons/hi2';

export default function UpdatePasswordForm() {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                notifySuccess('Kata sandi berhasil diperbarui.');
            },
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className="p-8 md:p-12 space-y-10">
            <header>
                <h2 className="text-2xl font-black text-gray-800 tracking-tight">
                    Perbarui <span className="text-emerald-500">Kata Sandi</span>
                </h2>

                <p className="mt-2 text-sm text-gray-500 font-medium">
                    Gunakan kata sandi yang kuat untuk menjaga keamanan akun Anda.
                </p>
            </header>

            <form onSubmit={updatePassword} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Kata Sandi Saat Ini */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">
                            Sandi Saat Ini <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                                <HiOutlineLockClosed className="w-5 h-5" />
                            </div>
                            <input
                                type="password"
                                ref={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) => setData("current_password", e.target.value)}
                                className={`block w-full pl-12 pr-4 py-4 bg-gray-50/50 border rounded-2xl text-sm transition-all outline-none ${
                                    errors.current_password
                                        ? "border-rose-200 focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500"
                                        : "border-gray-100 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                                }`}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                required
                            />
                        </div>
                        {errors.current_password && (
                            <p className="text-[11px] font-bold text-rose-500 uppercase tracking-wider ml-1">
                                {errors.current_password}
                            </p>
                        )}
                    </div>

                    {/* Kata Sandi Baru */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">
                            Kata Sandi Baru <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                                <HiOutlineLockClosed className="w-5 h-5" />
                            </div>
                            <input
                                type="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                className={`block w-full pl-12 pr-4 py-4 bg-gray-50/50 border rounded-2xl text-sm transition-all outline-none ${
                                    errors.password
                                        ? "border-rose-200 focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500"
                                        : "border-gray-100 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                                }`}
                                placeholder="••••••••"
                                autoComplete="new-password"
                                required
                            />
                        </div>
                        {errors.password && (
                            <p className="text-[11px] font-bold text-rose-500 uppercase tracking-wider ml-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Konfirmasi Kata Sandi */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">
                            Konfirmasi Sandi <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                                <HiOutlineLockClosed className="w-5 h-5" />
                            </div>
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData("password_confirmation", e.target.value)}
                                className={`block w-full pl-12 pr-4 py-4 bg-gray-50/50 border rounded-2xl text-sm transition-all outline-none ${
                                    errors.password_confirmation
                                        ? "border-rose-200 focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500"
                                        : "border-gray-100 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                                }`}
                                placeholder="••••••••"
                                autoComplete="new-password"
                                required
                            />
                        </div>
                        {errors.password_confirmation && (
                            <p className="text-[11px] font-bold text-rose-500 uppercase tracking-wider ml-1">
                                {errors.password_confirmation}
                            </p>
                        )}
                    </div>
                </div>

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
                        <span>{processing ? "Memproses..." : "Perbarui Kata Sandi"}</span>
                    </button>
                </div>
            </form>
        </section>
    );
}
