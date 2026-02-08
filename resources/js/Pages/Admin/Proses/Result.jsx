import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SectionProses from "@/Components/SectionProses";
import MatrixTable from "@/Components/MatrixTable";
import OptimizationTable from "@/Components/OptimationTable";
import RankingTable from "@/Components/RankingTable";

export default function Process({ steps }) {
    const getStep = (name) =>
        steps.find((step) => step.step === name)?.data || [];

    const decisionMatrix = getStep("decision_matrix");
    const normalization = getStep("normalization");
    const optimization = getStep("optimization");
    const ranking = getStep("ranking");

    return (
        <AuthenticatedLayout>
            <div className="max-w-7xl mx-auto p-6 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Proses Perhitungan MOORA
                        </h1>
                        <p className="text-sm text-gray-500">
                            Tahapan perhitungan hingga penentuan ranking
                            alternatif
                        </p>
                    </div>

                    <a
                        href={route("moora.report.pdf")}
                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow text-sm"
                    >
                        📄 Export PDF
                    </a>
                </div>

                {/* Step 1 */}
                <SectionCard step="1" title="Matriks Keputusan (X)">
                    <MatrixTable data={decisionMatrix} />
                </SectionCard>

                {/* Step 2 */}
                <SectionCard step="2" title="Normalisasi Matriks (X*)">
                    <MatrixTable data={normalization} />
                </SectionCard>

                {/* Step 3 */}
                <SectionCard step="3" title="Nilai Optimasi (Yi)">
                    <OptimizationTable data={optimization} />
                </SectionCard>

                {/* Step 4 */}
                <SectionCard step="4" title="Hasil Ranking Akhir">
                    <RankingTable data={ranking} />
                </SectionCard>
            </div>
        </AuthenticatedLayout>
    );
}

/* ===== Card Wrapper ===== */
function SectionCard({ step, title, children }) {
    return (
        <div className="bg-white border rounded-lg shadow-sm">
            <div className="flex items-center gap-3 border-b px-5 py-3 bg-gray-50">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm">
                    {step}
                </div>
                <h2 className="font-semibold text-gray-800">{title}</h2>
            </div>
            <div className="p-5 overflow-x-auto">{children}</div>
        </div>
    );
}
