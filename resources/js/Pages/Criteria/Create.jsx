import React from "react";
import { Link, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CriteriaForm from "./CriteriaForm";
import { HiOutlineChevronLeft } from "react-icons/hi2";

export default function Create() {
    return (
        <>
            <Head title="Tambah Kriteria" />

            <div className="space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                            Tambah Kriteria Baru
                        </h2>
                        <p className="text-sm text-gray-500 font-medium">
                            Definisikan parameter penilaian baru untuk sistem pendukung keputusan.
                        </p>
                    </div>

                    <Link
                        href={route("criteria.index")}
                        className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-emerald-600 transition-colors group"
                    >
                        <HiOutlineChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Kembali ke Daftar
                    </Link>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <CriteriaForm
                        onSubmitRoute={route("criteria.store")}
                        method="post"
                        submitLabel="Simpan Kriteria"
                    />
                </div>
            </div>
        </>
    );
}

Create.layout = (page) => {
    const breadcrumbs = [
        { label: "Dashboard", href: route("dashboard") },
        { label: "Kriteria", href: route("criteria.index") },
        { label: "Tambah", active: true },
    ];

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            {page}
        </AuthenticatedLayout>
    );
};
