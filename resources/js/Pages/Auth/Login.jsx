import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
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
            <Head title="Login Sistem Pendukung Keputusan" />

            <div className="w-full max-w-md mx-auto">
                <div className="bg-white shadow-lg rounded-xl px-8 py-6 border border-gray-100">
                    {/* Header */}
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Sistem Pendukung Keputusan
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Silakan login untuk mengakses sistem
                        </p>
                    </div>

                    {status && (
                        <div className="mb-4 rounded-md bg-green-50 px-4 py-2 text-sm text-green-700">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.email}
                                className="mt-1"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.password}
                                className="mt-1"
                            />
                        </div>

                        {/* Remember */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                    Ingat saya
                                </span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-sm text-indigo-600 hover:underline"
                                >
                                    Lupa password?
                                </Link>
                            )}
                        </div>

                        {/* Button */}
                        <div className="pt-2">
                            <PrimaryButton
                                className="w-full justify-center"
                                disabled={processing}
                            >
                                {processing ? "Memproses..." : "Login"}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-xs text-gray-400">
                    © {new Date().getFullYear()} Sistem Pendukung Keputusan
                </p>
            </div>
        </GuestLayout>
    );
}
