import React from "react";
import { Head, usePage, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import NilaiAlternativeForm from "./NilaiAlternativeForm";
import { HiOutlineArrowLeft } from "react-icons/hi2";

export default function Edit() {
    const { nilai, alternatifs, kriterias, auth } = usePage().props;
    const user = auth?.user;

    const submitRoute = route("penilai.nilai.update", nilai.id);

    return (
        <>
            <Head title={`Edit Nilai: ${nilai?.alternative?.name ?? ""}`} />
            
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black text-gray-800 tracking-tight">
                            Edit <span className="text-emerald-500">Nilai</span>
                        </h2>
                        <p className="text-sm text-gray-500 max-w-md font-medium leading-relaxed">
                            Perbarui nilai alternatif terhadap kriteria untuk proses perhitungan MOORA.
                        </p>
                    </div>

                    <Link
                        href={route("penilai.nilai.index")}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-gray-100 text-[13px] font-bold text-gray-500 hover:bg-gray-50 hover:text-emerald-600 transition-all shadow-sm"
                    >
                        <HiOutlineArrowLeft className="h-4 w-4" />
                        Kembali
                    </Link>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] overflow-hidden">
                    <div className="p-8 md:p-12">
                        <NilaiAlternativeForm
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
                            role={user?.role}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

Edit.layout = (page) => {
    const breadcrumbs = [
        { label: "Dashboard", href: route("penilai.index") },
        { label: "Nilai Alternative", href: route("penilai.nilai.index") },
        { label: "Edit", active: true },
    ];

    return (
        <AuthenticatedLayout
            header="Edit Nilai"
            breadcrumbs={breadcrumbs}
        >
            {page}
        </AuthenticatedLayout>
    );
};
