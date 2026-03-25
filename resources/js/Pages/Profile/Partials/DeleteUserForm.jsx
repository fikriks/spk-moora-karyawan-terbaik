import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { HiOutlineTrash, HiOutlineExclamationTriangle, HiOutlineLockClosed, HiOutlineShieldCheck } from 'react-icons/hi2';

export default function DeleteUserForm({ className = '' }) {
    const { auth } = usePage().props;
    const isAdmin = auth.user.roles.includes('admin');
    
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        if (isAdmin) return;
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className="p-6 md:p-10 space-y-8">
            <header className="border-b border-red-50 pb-6">
                <div className="flex items-center gap-3 text-red-600 mb-2">
                    <HiOutlineExclamationTriangle className="h-6 w-6" />
                    <h2 className="text-xl font-bold">
                        Hapus Akun
                    </h2>
                </div>

                <p className="mt-2 text-gray-500">
                    Setelah akun Anda dihapus, semua sumber daya dan datanya akan dihapus secara permanen. Sebelum menghapus akun Anda, harap unduh data atau informasi apa pun yang ingin Anda simpan.
                </p>
            </header>

            <div className="max-w-2xl">
                {isAdmin ? (
                    <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-start gap-3">
                        <HiOutlineShieldCheck className="h-5 w-5 text-amber-500 mt-0.5" />
                        <div>
                            <p className="text-sm font-bold text-amber-800">Akun Administrator</p>
                            <p className="text-xs text-amber-600 mt-1 leading-relaxed">
                                Sebagai administrator, Anda tidak dapat menghapus akun Anda sendiri untuk menjaga keberlangsungan akses sistem. Silakan hubungi pengelola sistem utama jika diperlukan.
                            </p>
                        </div>
                    </div>
                ) : (
                    <DangerButton onClick={confirmUserDeletion}>
                        <HiOutlineTrash className="h-5 w-5 mr-2" />
                        Hapus Akun Permanen
                    </DangerButton>
                )}
            </div>

            {!isAdmin && (
                <Modal show={confirmingUserDeletion} onClose={closeModal}>
                    <form onSubmit={deleteUser} className="p-8">
                        <div className="flex items-center gap-4 text-red-600 mb-6">
                            <div className="bg-red-50 p-3 rounded-2xl">
                                <HiOutlineExclamationTriangle className="h-8 w-8" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">
                                    Apakah Anda yakin?
                                </h2>
                                <p className="text-gray-500 mt-1">
                                    Tindakan ini tidak dapat dibatalkan.
                                </p>
                            </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed">
                            Harap masukkan kata sandi Anda untuk mengonfirmasi bahwa Anda ingin menghapus akun Anda secara permanen.
                        </p>

                        <div className="mt-8">
                            <InputLabel
                                htmlFor="password"
                                value="Kata Sandi Anda"
                                className="sr-only"
                            />

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <HiOutlineLockClosed className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                                </div>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="pl-11 block w-full"
                                    isFocused
                                    placeholder="Masukkan kata sandi untuk konfirmasi"
                                />
                            </div>

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-10 flex justify-end gap-4 border-t border-gray-50 pt-6">
                            <SecondaryButton onClick={closeModal} className="rounded-2xl px-6">
                                Batal
                            </SecondaryButton>

                            <DangerButton className="rounded-2xl px-6" disabled={processing}>
                                <HiOutlineTrash className="h-5 w-5 mr-2" />
                                Hapus Akun
                            </DangerButton>
                        </div>
                    </form>
                </Modal>
            )}
        </section>
    );
}
