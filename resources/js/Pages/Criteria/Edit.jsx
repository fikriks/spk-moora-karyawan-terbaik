import React from "react";
import { Link, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CriteriaForm from "./CriteriaForm";
import { HiOutlineChevronLeft } from "react-icons/hi2";

export default function Edit({ criterion }) {
    return (
        <>
            <Head title={`Ubah Kriteria - ${criterion.name}`} />

            <div className="space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                            Perbarui Informasi Kriteria
                        </h2>
                        <p className="text-sm text-gray-500 font-medium text-pretty">
                            Ubah detail parameter <span className="text-emerald-600 font-bold">{criterion.name}</span> untuk menyesuaikan model perhitungan.
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
                        initial={criterion}
                        onSubmitRoute={route("criteria.update", criterion.id)}
                        method="put"
                        submitLabel="Perbarui Kriteria"
                    />
                </div>
            </div>
        </>
    );
}

Edit.layout = (page) => {
    const breadcrumbs = [
        { label: "Dashboard", href: route("dashboard") },
        { label: "Kriteria", href: route("criteria.index") },
        { label: "Ubah", active: true },
    ];

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            {page}
        </AuthenticatedLayout>
    );
};
