import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import NilaiAlternativeForm from "./NilaiAlternativeForm";

export default function Edit() {
    const { nilai, alternatifs, kriterias, auth } = usePage().props;

    return (
        <div className="space-y-8">
            <Head title={`Edit Penilaian: ${nilai?.alternative?.name ?? ""}`} />
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h2 className="text-3xl font-black text-gray-800 tracking-tight">
                        Edit <span className="text-emerald-500">Penilaian</span>
                    </h2>
                    <p className="text-sm text-gray-500 max-w-md font-medium leading-relaxed">
                        Perbarui nilai performa <strong>{nilai?.alternative?.name}</strong> pada kriteria <strong>{nilai?.criteria?.name}</strong>.
                    </p>
                </div>
                <Link 
                    href={route("ketua.nilai.index")} 
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-gray-100 text-[13px] font-bold text-gray-500 hover:bg-gray-50 hover:text-emerald-600 transition-all shadow-sm group"
                >
                    <HiOutlineArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Kembali
                </Link>
            </div>

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
                        role={auth?.user?.role}
                        onSubmitRoute={route("ketua.nilai.update", nilai.id)}
                        method="put"
                        submitLabel="Perbarui Penilaian"
                    />
                </div>
            </div>
        </div>
    );
}

Edit.layout = (page) => {
    const breadcrumbs = [
        { label: "Data Penilaian", href: route("ketua.nilai.index") },
        { label: "Edit", active: true },
    ];

    return (
        <AuthenticatedLayout
            header="Edit Penilaian"
            breadcrumbs={breadcrumbs}
        >
            {page}
        </AuthenticatedLayout>
    );
};
