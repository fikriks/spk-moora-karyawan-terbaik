import React from "react";
import { Head, usePage, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AlternativeForm from "./AlternativeForm";
import { notifySuccess, notifyError } from "@/Utils/useToast";

export default function Edit() {
    const { alternative, flash } = usePage().props;

    // route update (sesuaikan nama route di Laravel)
    const submitRoute = route("operator.alternative.update", alternative.id);

    // optional: callback setelah sukses — AlternativeForm harus memanggil onSuccess jika tersedia
    function handleSuccess() {
        notifySuccess("Alternative berhasil diperbarui!");
        // redirect kembali ke index (opsional)
        router.get(route("operator.alternative.index"));
    }

    return (
        <div className="p-6">
            <Head title={`Edit Alternative: ${alternative?.name ?? ""}`} />

            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Edit Alternative
                    </h1>
                    <p className="text-sm text-gray-500">
                        Perbarui data alternative yang sudah ada.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href={route("operator.alternative.index")}
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
            Note: if you want handleSuccess to run after submit, update AlternativeForm to accept an `onSuccess` prop
            and call it inside its onSuccess handler. */}
                <AlternativeForm
                    initial={alternative}
                    onSubmitRoute={submitRoute}
                    method="put"
                    submitLabel="Perbarui Alternative"
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
