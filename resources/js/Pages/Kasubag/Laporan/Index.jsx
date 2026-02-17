import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MatrixTable from "@/Components/MatrixTable";
import OptimizationTable from "@/Components/OptimationTable";
import RankingTable from "@/Components/RankingTable";
import DenominatorTable from "@/Components/DenominatorTable";

export default function LaporanKepegawaian({ steps }) {
    const getStep = (name) =>
        steps.find((step) => step.step === name)?.data || [];

    return (
        <AuthenticatedLayout>
            <div className="max-w-6xl mx-auto p-8 bg-white shadow border">
                {/* Header */}
                <div className="text-center border-b pb-4 mb-6">
                    <h1 className="text-xl font-bold uppercase">
                        Laporan Hasil Penilaian Pegawai
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Metode Multi-Objective Optimization on the Basis of
                        Ratio Analysis (MOORA)
                    </p>
                </div>

                {/* Aksi */}
                <div className="flex justify-end mb-6">
                    <a
                        href={route("laporan.kepegawaian.pdf")}
                        className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded"
                    >
                        Export PDF
                    </a>
                </div>

                {/* Pendahuluan */}
                <Section title="Pendahuluan">
                    <p className="text-sm leading-relaxed">
                        Laporan ini disusun sebagai bahan pertimbangan Kepala
                        Sub Bagian Kepegawaian dalam pengambilan keputusan
                        penilaian pegawai secara objektif dan terukur.
                    </p>
                </Section>

                {/* Matriks */}
                <Section title="Matriks Keputusan">
                    <MatrixTable data={getStep("decision_matrix")} />
                </Section>

                {/* Denominator */}
                <Section title="Matriks Denominator">
                    <DenominatorTable data={getStep("denominator")} />
                </Section>

                {/* Normalisasi */}
                <Section title="Normalisasi">
                    <MatrixTable data={getStep("normalization")} />
                </Section>

                {/* Optimasi */}
                <Section title="Nilai Optimasi">
                    <OptimizationTable data={getStep("optimization")} />
                </Section>

                {/* Ranking */}
                <Section title="Hasil Akhir dan Peringkat">
                    <RankingTable data={getStep("ranking")} />
                </Section>

                {/* Penutup */}
                <Section title="Penutup">
                    <p className="text-sm leading-relaxed">
                        Hasil perhitungan ini dapat dijadikan dasar pendukung
                        pengambilan keputusan oleh Kepala Sub Bagian
                        Kepegawaian.
                    </p>
                </Section>
            </div>
        </AuthenticatedLayout>
    );
}

/* ===== Simple Section ===== */
function Section({ title, children }) {
    return (
        <div className="mb-8">
            <h2 className="font-semibold mb-3 border-b pb-1">{title}</h2>
            {children}
        </div>
    );
}
