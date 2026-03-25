import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { notifySuccess } from '@/Utils/useToast';
import { HiOutlineUser, HiOutlineEnvelope, HiOutlineCheck } from 'react-icons/hi2';

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
        <section className="p-6 md:p-10 space-y-8">
            <header className="border-b border-gray-50 pb-6">
                <h2 className="text-xl font-bold text-gray-900">
                    Informasi Profil
                </h2>

                <p className="mt-2 text-gray-500">
                    Perbarui informasi akun dan alamat email profil Anda.
                </p>
            </header>

            <form onSubmit={submit} className="space-y-8 max-w-2xl">
                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap" />

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <HiOutlineUser className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                        </div>
                        <TextInput
                            id="name"
                            className="pl-11 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                            placeholder="Masukkan nama lengkap Anda"
                        />
                    </div>

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Alamat Email" />

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <HiOutlineEnvelope className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            className="pl-11 block w-full"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="username"
                            placeholder="Masukkan alamat email aktif"
                        />
                    </div>

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
                        <p className="text-sm text-amber-800">
                            Alamat email Anda belum diverifikasi.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ml-2 font-semibold underline hover:text-amber-900 focus:outline-none"
                            >
                                Klik di sini untuk mengirim ulang email verifikasi.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-emerald-600">
                                Tautan verifikasi baru telah dikirim ke alamat email Anda.
                            </div>
                        )}
                    </div>
                )}

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
