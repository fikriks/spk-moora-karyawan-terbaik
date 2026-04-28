import React from "react";
import { Link, Head, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AlternativeForm from "./AlternativeForm";
import { HiOutlineArrowLeft } from "react-icons/hi2";

export default function Edit() {
    const { alternative } = usePage().props;
    const submitRoute = route("admin.alternative.update", alternative.id);

    return (
        <>
            <Head title={`Edit ${alternative.name}`} />
            
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black text-gray-800 tracking-tight">
                            Edit <span className="text-emerald-500">Alternative</span>
                        </h2>
                        <p className="text-sm text-gray-500 max-w-md font-medium leading-relaxed">
                            Perbarui informasi personil yang terdaftar dalam sistem (Admin).
                        </p>
                    </div>

                    <Link
                        href={route("admin.alternative.index")}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-gray-100 text-[13px] font-bold text-gray-500 hover:bg-gray-50 hover:text-emerald-600 transition-all shadow-sm"
                    >
                        <HiOutlineArrowLeft className="h-4 w-4" />
                        Kembali
                    </Link>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] overflow-hidden">
                    <div className="p-8 md:p-12">
                        <AlternativeForm
                            initial={alternative}
                            onSubmitRoute={submitRoute}
                            method="put"
                            submitLabel="Perbarui Data"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

Edit.layout = (page) => {
    const { alternative } = page.props;
    const breadcrumbs = [
        { label: "Dashboard", href: route("admin.index") },
        { label: "Manajemen Alternative", href: route("admin.alternative.index") },
        { label: alternative?.name || "Edit", active: true },
    ];

    return (
        <AuthenticatedLayout
            header="Manajemen Alternative"
            breadcrumbs={breadcrumbs}
        >
            {page}
        </AuthenticatedLayout>
    );
};
