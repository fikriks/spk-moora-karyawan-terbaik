import React from "react";
import { Head, usePage, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CriteriaForm from "@/Pages/Criteria/CriteriaForm";
import { notifySuccess, notifyError } from "@/Utils/useSweetAlert";

export default function Edit() {
    const { criterion, flash } = usePage().props;

    // route update (sesuaikan nama route di Laravel)
    const submitRoute = route("criteria.update", criterion.id);

    // optional: callback setelah sukses — CriteriaForm harus memanggil onSuccess jika tersedia
    function handleSuccess() {
        notifySuccess("Kriteria berhasil diperbarui!");
        // redirect kembali ke index (opsional)
        router.get(route("criteria.index"));
    }

    return (
        <div className="p-6">
            <Head title={`Edit Kriteria: ${criterion?.name ?? ""}`} />

            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Edit Kriteria
                    </h1>
                    <p className="text-sm text-gray-500">
                        Perbarui data kriteria yang sudah ada.
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

            {/* Card */}
            <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-sm">
                {/* Pass initial values and method put.
            Note: if you want handleSuccess to run after submit, update CriteriaForm to accept an `onSuccess` prop
            and call it inside its onSuccess handler. */}
                <CriteriaForm
                    initial={criterion}
                    onSubmitRoute={submitRoute}
                    method="put"
                    submitLabel="Perbarui Kriteria"
                />
            </div>
        </div>
    );
}

/* Wrap with AuthenticatedLayout */
Edit.layout = (page) => (
    <AuthenticatedLayout
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Edit Kriteria
            </h2>
        }
    >
        {page}
    </AuthenticatedLayout>
);
