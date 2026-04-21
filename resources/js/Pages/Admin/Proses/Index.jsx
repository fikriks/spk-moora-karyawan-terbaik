import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { 
    HiOutlinePlay, 
    HiOutlineCheckCircle, 
    HiOutlineInformationCircle,
    HiOutlineArrowRight
} from "react-icons/hi2";

export default function Index() {
    const [processing, setProcessing] = useState(false);

    const handleProcess = () => {
        setProcessing(true);
        router.post(route("moora.process"), {}, {
            onFinish: () => setProcessing(false)
        });
    };

    return (
        <>
            <Head title="Proses Perhitungan Moora" />

            <div className="space-y-8 max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="text-center space-y-4 py-6">
                    <div className="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-3xl text-emerald-600 mb-2">
                        <HiOutlinePlay className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                            Proses Perhitungan Moora
                        </h2>
                        <p className="text-base text-gray-500 font-medium max-w-2xl mx-auto">
                            Sistem akan melakukan kalkulasi otomatis berdasarkan data alternatif, kriteria, dan bobot yang telah Anda tentukan sebelumnya.
                        </p>
                    </div>
                </div>

                {/* Workflow Steps */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <StepCard 
                        number="01" 
                        title="Matriks" 
                        desc="Konversi data ke nilai angka" 
                    />
                    <StepCard 
                        number="02" 
                        title="Normalisasi" 
                        desc="Penyetaraan skala nilai" 
                    />
                    <StepCard 
                        number="03" 
                        title="Optimasi" 
                        desc="Pembobotan tiap kriteria" 
                    />
                    <StepCard 
                        number="04" 
                        title="Ranking" 
                        desc="Penentuan urutan terbaik" 
                    />
                </div>

                {/* Main Action Card */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-8 md:p-12 text-center space-y-8">
                    <div className="bg-emerald-50 border border-emerald-100/50 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4 text-left max-w-3xl mx-auto">
                        <div className="shrink-0 text-emerald-500">
                            <HiOutlineInformationCircle className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-bold text-emerald-900">Pemberitahuan Sistem</h4>
                            <p className="text-xs font-medium text-emerald-700 leading-relaxed">
                                Pastikan seluruh data personil (alternatif) telah memiliki nilai pada setiap kriteria. Perubahan data setelah proses ini tidak akan mempengaruhi hasil kecuali proses dijalankan ulang.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={handleProcess}
                            disabled={processing}
                            className="inline-flex items-center gap-3 px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-xl shadow-emerald-500/20 active:scale-95 disabled:opacity-50 disabled:active:scale-100 transition-all text-lg group"
                        >
                            {processing ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Memproses...</span>
                                </>
                            ) : (
                                <>
                                    <HiOutlineCheckCircle className="w-6 h-6" />
                                    <span>Jalankan Perhitungan</span>
                                    <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Metode Multi-Objective Optimization by Ratio Analysis (MOORA)
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

function StepCard({ number, title, desc }) {
    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3 relative overflow-hidden group hover:border-emerald-200 transition-colors">
            <span className="text-4xl font-black text-emerald-500/10 absolute -top-1 -right-1 group-hover:text-emerald-500/20 transition-colors">
                {number}
            </span>
            <h4 className="text-sm font-bold text-gray-900 relative z-10">{title}</h4>
            <p className="text-xs text-gray-500 font-medium leading-relaxed relative z-10">{desc}</p>
        </div>
    );
}

Index.layout = (page) => {
    const breadcrumbs = [
        { label: "Dashboard", href: route("dashboard") },
        { label: "Proses Perhitungan Moora", active: true },
    ];

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            {page}
        </AuthenticatedLayout>
    );
};
