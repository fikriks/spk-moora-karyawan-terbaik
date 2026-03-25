import React from "react";
import { Link, usePage, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import NilaiAlternativeForm from "./NilaiAlternativeForm";
import { HiOutlineArrowLeft } from "react-icons/hi2";

export default function Create() {
    const { alternatifs, kriterias, auth } = usePage().props;
    const user = auth?.user;

    const submitRoute = route("kasubag.nilai.store");

    return (
        <>
            <Head title="Tambah Data Penilaian" />
            
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black text-gray-800 tracking-tight">
                            Tambah <span className="text-emerald-500">Penilaian</span>
                        </h2>
                        <p className="text-sm text-gray-500 max-w-md font-medium leading-relaxed">
                            Input nilai alternatif untuk kriteria yang telah ditentukan dalam sistem MOORA.
                        </p>
                    </div>

                    <Link
                        href={route("kasubag.nilai.index")}
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
                            initial={{}}
                            alternatifs={alternatifs}
                            kriterias={kriterias}
                            onSubmitRoute={submitRoute}
                            method="post"
                            submitLabel="Simpan Data Penilaian"
                            role={user?.role === "operator" ? "operator" : user?.role}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

Create.layout = (page) => {
    const breadcrumbs = [
        { label: "Data Penilaian", href: route("kasubag.nilai.index") },
        { label: "Tambah", active: true },
    ];

    return (
        <AuthenticatedLayout
            header="Tambah Penilaian"
            breadcrumbs={breadcrumbs}
        >
            {page}
        </AuthenticatedLayout>
    );
};
