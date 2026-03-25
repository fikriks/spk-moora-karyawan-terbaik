import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CriteriaForm from "@/Pages/Criteria/CriteriaForm";
import { notifySuccess, notifyError } from "@/Utils/useToast";

export default function Create() {
    const { flash } = usePage().props;

    // route untuk submit (sesuaikan nama route di Laravel)
    const submitRoute = route("criteria.store"); // atau '/criteria'

    // optional: callback setelah submit via Inertia success handler
    function handleSuccess() {
        notifySuccess("Kriteria berhasil ditambahkan!");
        // redirect ke index (opsional), Inertia biasanya sudah redirect sesuai server
        router.get(route("criteria.index"));
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Tambah Kriteria
                    </h1>
                    <p className="text-sm text-gray-500">
                        Buat kriteria baru untuk sistem SPK.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href={route("criteria.index")}
                        className="inline-flex items-center rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                        ← Kembali ke Daftar
                    </Link>
                </div>
            </div>

            {/* Flash */}
            {flash?.success && (
                <div className="mb-4 rounded-md bg-emerald-50 p-4 text-sm text-emerald-800">
                    {flash.success}
                </div>
            )}

            <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-sm">
                <CriteriaForm
                    initial={{}}
                    onSubmitRoute={submitRoute}
                    method="post"
                    submitLabel="Simpan Kriteria"
                />
            </div>
        </div>
    );
}

// layout wrapper
Create.layout = (page) => (
    <AuthenticatedLayout
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Tambah Kriteria
            </h2>
        }
    >
        {page}
    </AuthenticatedLayout>
);
