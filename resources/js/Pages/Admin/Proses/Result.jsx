import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MatrixTable from "@/Components/MatrixTable";
import OptimizationTable from "@/Components/OptimationTable";
import RankingTable from "@/Components/RankingTable";
import DenominatorTable from "@/Components/DenominatorTable";

export default function Process({ steps }) {
    const getStep = (name) =>
        steps.find((step) => step.step === name)?.data || [];

    const decisionMatrix = getStep("decision_matrix");
    const denominator = getStep("denominator"); // TAMBAHAN
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
                            Tahapan perhitungan sesuai metode MOORA
                        </p>
                    </div>

                    <a
                        href={route("moora.report.pdf")}
                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow text-sm"
                    >
                        📄 Export PDF
                    </a>
                </div>

                {/* STEP 1 */}
                <SectionCard step="1" title="Matriks Keputusan (X)">
                    <MatrixTable data={decisionMatrix} type="decision" />
                </SectionCard>

                {/* STEP 2 */}
                <SectionCard step="2" title="Nilai Penyebut (√ΣX²)">
                    <DenominatorTable data={denominator} />
                </SectionCard>

                {/* STEP 3 */}
                <SectionCard step="3" title="Matriks Normalisasi (X*)">
                    <MatrixTable data={normalization} type="normalization" />
                </SectionCard>

                {/* STEP 4 */}
                <SectionCard step="4" title="Nilai Optimasi (Yi)">
                    <OptimizationTable data={optimization} />
                </SectionCard>

                {/* STEP 5 */}
                <SectionCard step="5" title="Hasil Ranking Akhir">
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
