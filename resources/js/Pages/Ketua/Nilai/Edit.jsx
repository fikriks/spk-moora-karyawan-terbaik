import React from "react";
import { Head, usePage, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import NilaiForm from "./NilaiAlternativeForm";
import { notifySuccess } from "@/Utils/useSweetAlert";

export default function Edit() {
    const { nilai, alternatifs, kriterias, flash } = usePage().props;
    // console.log(nilai);
    // route update NILAI
    const submitRoute = route("ketua.nilai.update", nilai.id);

    function handleSuccess() {
        notifySuccess("Nilai berhasil diperbarui!");
        router.get(route("ketua.nilai.index"));
    }

    return (
        <div className="p-6">
            <Head
                title={`Edit Nilai: ${nilai?.alternative?.name ?? ""} - ${
                    nilai?.criteria?.name ?? ""
                }`}
            />

            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Edit Nilai
                    </h1>
                    <p className="text-sm text-gray-500">
                        Perbarui nilai alternatif terhadap kriteria.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href={route("ketua.nilai.index")}
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

            {/* Card */}
            <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-sm">
                <NilaiForm
                    initial={{
                        alternative_id: nilai.alternative_id,
                        criteria_id: nilai.criteria_id,
                        nilai: nilai.value,
                    }}
                    alternatifs={alternatifs}
                    kriterias={kriterias}
                    onSubmitRoute={submitRoute}
                    method="put"
                    submitLabel="Perbarui Nilai"
                />
            </div>
        </div>
    );
}

/* Layout */
Edit.layout = (page) => (
    <AuthenticatedLayout
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Edit Nilai
            </h2>
        }
    >
        {page}
    </AuthenticatedLayout>
);
