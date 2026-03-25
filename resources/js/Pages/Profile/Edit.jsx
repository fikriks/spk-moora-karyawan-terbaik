import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                    Profil Saya
                </h2>
                <p className="mt-2 text-gray-500 text-lg font-medium max-w-2xl">
                    Kelola informasi akun, kata sandi, dan keamanan profil Anda secara mandiri.
                </p>
            </div>

            {/* Forms Section */}
            <div className="space-y-8 max-w-4xl pb-12">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <UpdatePasswordForm />
                </div>
            </div>
        </div>
    );
}

Edit.layout = (page) => (
    <AuthenticatedLayout
        header="Profil Saya"
        breadcrumbs={[
            { label: 'Dashboard', href: route('dashboard') },
            { label: 'Profil Saya' },
        ]}
    >
        <Head title="Profil Saya" />
        {page}
    </AuthenticatedLayout>
);
