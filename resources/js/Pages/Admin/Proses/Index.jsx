import React from "react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function ProcessIndex() {
    const handleProcess = () => {
        router.post(route("moora.process"));
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-4xl mx-auto px-6 py-16">
                {/* TITLE */}
                <div className="mb-12">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Proses Perhitungan MOORA
                    </h1>
                    <p className="text-sm text-gray-500 mt-2 max-w-xl">
                        Sistem akan menghitung nilai alternatif berdasarkan
                        kriteria dan bobot yang telah ditentukan untuk
                        menghasilkan peringkat terbaik.
                    </p>
                </div>

                {/* STEPS (INLINE) */}
                <div className="flex flex-col md:flex-row md:items-center md:gap-6 text-sm text-gray-600 mb-14">
                    <StepInline number="1" label="Matriks Keputusan" />
                    <Divider />
                    <StepInline number="2" label="Normalisasi" />
                    <Divider />
                    <StepInline number="3" label="Optimasi" />
                    <Divider />
                    <StepInline number="4" label="Ranking" />
                </div>

                {/* ACTION */}
                <div className="text-center">
                    <button
                        onClick={handleProcess}
                        className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg text-sm font-medium transition"
                    >
                        Proses Perhitungan
                    </button>

                    <p className="text-xs text-gray-400 mt-4">
                        Pastikan data sudah lengkap sebelum menjalankan proses.
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

/* ===== COMPONENTS ===== */

function StepInline({ number, label }) {
    return (
        <div className="flex items-center gap-2">
            <span className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 text-xs font-medium text-gray-700">
                {number}
            </span>
            <span>{label}</span>
        </div>
    );
}

function Divider() {
    return <span className="hidden md:block text-gray-300">→</span>;
}
