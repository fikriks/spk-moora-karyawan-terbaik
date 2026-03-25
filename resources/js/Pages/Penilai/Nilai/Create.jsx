import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import NilaiForm from "./NilaiAlternativeForm";
import { notifySuccess } from "@/Utils/useToast";

export default function Create() {
    const { flash, alternatifs, kriterias } = usePage().props;

    // route submit NILAI
    const submitRoute = route("penilai.nilai.store");

    function handleSuccess() {
        notifySuccess("Nilai berhasil ditambahkan!");
        router.get(route("penilai.nilai.index"));
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Tambah Nilai
                    </h1>
                    <p className="text-sm text-gray-500">
                        Tambahkan nilai alternatif terhadap kriteria (MOORA).
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href={route("penilai.nilai.index")}
                        className="inline-flex items-center rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                        ← Kembali ke Daftar Nilai
                    </Link>
                </div>
            </div>

            {/* Flash */}
            {flash?.success && (
                <div className="mb-4 rounded-md bg-emerald-50 p-4 text-sm text-emerald-800">
                    {flash.success}
                </div>
            )}

            {/* Form */}
            <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-sm">
                <NilaiForm
                    initial={{}}
                    alternatifs={alternatifs}
                    kriterias={kriterias}
                    onSubmitRoute={submitRoute}
                    method="post"
                    submitLabel="Simpan Nilai"
                />
            </div>
        </div>
    );
}

/* Layout */
Create.layout = (page) => (
    <AuthenticatedLayout
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Tambah Nilai
            </h2>
        }
    >
        {page}
    </AuthenticatedLayout>
);
