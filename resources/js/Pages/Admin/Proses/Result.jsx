import React from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MatrixTable from "@/Components/MatrixTable";
import OptimizationTable from "@/Components/OptimationTable";
import RankingTable from "@/Components/RankingTable";
import DenominatorTable from "@/Components/DenominatorTable";
import { 
    HiOutlineDocumentArrowDown, 
    HiOutlineArrowPath,
    HiOutlineCalculator
} from "react-icons/hi2";

export default function Result({ steps }) {
    const getStep = (name) =>
        steps.find((step) => step.step === name)?.data || [];

    const decisionMatrix = getStep("decision_matrix");
    const denominator = getStep("denominator");
    const normalization = getStep("normalization");
    const optimization = getStep("optimization");
    const ranking = getStep("ranking");

    return (
        <>
            <Head title="Laporan Hasil Perhitungan Moora" />

            <div className="space-y-8 pb-20">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-start gap-5">
                        <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                            <HiOutlineCalculator className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                                Laporan Hasil Perhitungan Moora
                            </h2>
                            <p className="text-sm text-gray-500 font-medium max-w-xl">
                                Berikut adalah detail tahapan kalkulasi yang dilakukan sistem untuk menghasilkan peringkat personil terbaik.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href={route("moora.index")}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold rounded-2xl transition-all text-sm border border-gray-100"
                        >
                            <HiOutlineArrowPath className="w-5 h-5" />
                            <span>Hitung Ulang</span>
                        </Link>
                        <a
                            href={route("moora.report.pdf")}
                            target="_blank"
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl shadow-lg shadow-rose-500/20 active:scale-95 transition-all text-sm"
                        >
                            <HiOutlineDocumentArrowDown className="w-5 h-5" />
                            <span>Export PDF</span>
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {/* STEP 1 */}
                    <SectionCard step="01" title="Matriks Keputusan (X)" description="Data mentah yang dikonversi menjadi nilai angka berdasarkan kriteria.">
                        <MatrixTable data={decisionMatrix} type="decision" />
                    </SectionCard>

                    {/* STEP 2 */}
                    <SectionCard step="02" title="Nilai Penyebut (√ΣX²)" description="Akar kuadrat dari jumlah kuadrat setiap nilai kriteria untuk normalisasi.">
                        <DenominatorTable data={denominator} />
                    </SectionCard>

                    {/* STEP 3 */}
                    <SectionCard step="03" title="Matriks Normalisasi (X*)" description="Hasil pembagian nilai matriks keputusan dengan nilai penyebut.">
                        <MatrixTable data={normalization} type="normalization" />
                    </SectionCard>

                    {/* STEP 4 */}
                    <SectionCard step="04" title="Nilai Optimasi (Yi)" description="Hasil pembobotan kriteria dan perhitungan selisih antara benefit dan cost.">
                        <OptimizationTable data={optimization} />
                    </SectionCard>

                    {/* STEP 5 */}
                    <SectionCard step="05" title="Hasil Ranking Akhir" description="Urutan personil berdasarkan nilai optimasi tertinggi ke terendah.">
                        <RankingTable data={ranking} />
                    </SectionCard>
                </div>
            </div>
        </>
    );
}

function SectionCard({ step, title, description, children }) {
    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="px-8 py-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center gap-4 bg-gray-50/30">
                <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-2xl bg-emerald-500 text-white font-black text-lg shadow-lg shadow-emerald-500/20">
                    {step}
                </div>
                <div className="space-y-0.5">
                    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{description}</p>
                </div>
            </div>
            <div className="p-8 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200">
                {children}
            </div>
        </div>
    );
}

Result.layout = (page) => {
    const breadcrumbs = [
        { label: "Dashboard", href: route("dashboard") },
        { label: "Proses Perhitungan Moora", href: route("moora.index") },
        { label: "Laporan Hasil Perhitungan Moora", active: true },
    ];

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            {page}
        </AuthenticatedLayout>
    );
};
