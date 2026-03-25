import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { notifySuccess } from '@/Utils/useToast';
import { HiOutlineLockClosed, HiOutlineCheck } from 'react-icons/hi2';

export default function UpdatePasswordForm({ className = '' }) {
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
        <section className="p-6 md:p-10 space-y-8">
            <header className="border-b border-gray-50 pb-6">
                <h2 className="text-xl font-bold text-gray-900">
                    Perbarui Kata Sandi
                </h2>

                <p className="mt-2 text-gray-500">
                    Pastikan akun Anda menggunakan kata sandi yang panjang dan acak agar tetap aman.
                </p>
            </header>

            <form onSubmit={updatePassword} className="space-y-8 max-w-2xl">
                <div>
                    <InputLabel
                        htmlFor="current_password"
                        value="Kata Sandi Saat Ini"
                    />

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <HiOutlineLockClosed className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                        </div>
                        <TextInput
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) =>
                                setData('current_password', e.target.value)
                            }
                            type="password"
                            className="pl-11 block w-full"
                            autoComplete="current-password"
                            placeholder="••••••••"
                        />
                    </div>

                    <InputError
                        message={errors.current_password}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Kata Sandi Baru" />

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <HiOutlineLockClosed className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                        </div>
                        <TextInput
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type="password"
                            className="pl-11 block w-full"
                            autoComplete="new-password"
                            placeholder="••••••••"
                        />
                    </div>

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Konfirmasi Kata Sandi"
                    />

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <HiOutlineLockClosed className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                        </div>
                        <TextInput
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            type="password"
                            className="pl-11 block w-full"
                            autoComplete="new-password"
                            placeholder="••••••••"
                        />
                    </div>

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="pt-6 border-t border-gray-50 flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        <HiOutlineCheck className="h-5 w-5 mr-2" />
                        Simpan Perubahan
                    </PrimaryButton>
                </div>
            </form>
        </section>
    );
}
