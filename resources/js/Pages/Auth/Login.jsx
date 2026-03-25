import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Login SPK" />

            <div className="flex flex-col items-center mb-8">
                <Link href="/">
                    <ApplicationLogo className="h-16 w-auto drop-shadow-sm opacity-90 transition-opacity hover:opacity-100" />
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100/80 p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                {/* Header Section */}
                <div className="mb-10 text-center">
                    <h1 className="text-xl font-medium text-gray-800 tracking-tight">
                        Selamat Datang
                    </h1>
                    <p className="mt-2 text-[13px] text-gray-400 leading-relaxed max-w-[220px] mx-auto">
                        Sistem Pendukung Keputusan Penilaian Kinerja
                    </p>
                </div>

                {status && (
                    <div className="mb-6 rounded-lg bg-emerald-50/40 px-4 py-3 text-[13px] font-medium text-emerald-600 border border-emerald-100/30">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <InputLabel 
                            htmlFor="email" 
                            value="Email" 
                            className="text-[11px] font-semibold text-gray-400 mb-2 uppercase tracking-[0.1em]" 
                        />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="w-full bg-gray-50/30 border-gray-100 focus:border-emerald-200 focus:ring-4 focus:ring-emerald-500/5 rounded-xl transition-all duration-300 text-sm py-3 px-4"
                            autoComplete="username"
                            isFocused
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="nama@email.com"
                        />
                        <InputError message={errors.email} className="mt-2 text-xs text-rose-400" />
                    </div>

                    {/* Password Input */}
                    <div>
                        <InputLabel 
                            htmlFor="password" 
                            value="Password" 
                            className="text-[11px] font-semibold text-gray-400 mb-2 uppercase tracking-[0.1em]" 
                        />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="w-full bg-gray-50/30 border-gray-100 focus:border-emerald-200 focus:ring-4 focus:ring-emerald-500/5 rounded-xl transition-all duration-300 text-sm py-3 px-4"
                            autoComplete="current-password"
                            onChange={(e) => setData("password", e.target.value)}
                            placeholder="••••••••"
                        />
                        <InputError message={errors.password} className="mt-2 text-xs text-rose-400" />
                    </div>

                    {/* Options Row */}
                    <div className="flex items-center">
                        <label className="flex items-center cursor-pointer group select-none">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData("remember", e.target.checked)}
                                className="rounded-[5px] border-gray-200 text-emerald-500 focus:ring-emerald-500/20 h-4 w-4 transition-all"
                            />
                            <span className="ml-2.5 text-[13px] text-gray-400 group-hover:text-gray-500 transition-colors">
                                Ingat perangkat ini
                            </span>
                        </label>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                        <PrimaryButton
                            className="w-full h-[54px] bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-xl flex items-center justify-center text-sm font-semibold transition-all duration-300 shadow-sm shadow-emerald-100/50 border-none ring-offset-2 focus:ring-2 focus:ring-emerald-500/20"
                            disabled={processing}
                        >
                            {processing ? (
                                <span className="flex items-center gap-2.5">
                                    <svg className="animate-spin h-4 w-4 text-white/80" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Menghubungkan...
                                </span>
                            ) : (
                                "Masuk ke Sistem"
                            )}
                        </PrimaryButton>
                    </div>
                </form>
            </div>

            {/* Footer */}
            <div className="mt-10 text-center flex flex-col items-center">
                <p className="text-[10px] text-gray-300 uppercase tracking-[0.2em] font-bold">
                    &copy; {new Date().getFullYear()} SPK Kinerja
                </p>
                <div className="flex gap-2.5 mt-4">
                    <div className="h-1 w-1 bg-gray-100 rounded-full"></div>
                    <div className="h-4 w-[1px] bg-gray-100"></div>
                    <div className="h-1 w-1 bg-gray-100 rounded-full"></div>
                </div>
            </div>
        </GuestLayout>
    );
}