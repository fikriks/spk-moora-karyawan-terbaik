import React from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MatrixTable from "@/Components/MatrixTable";
import OptimizationTable from "@/Components/OptimationTable";
import RankingTable from "@/Components/RankingTable";
import DenominatorTable from "@/Components/DenominatorTable";
import { 
    HiOutlineDocumentText, 
    HiOutlinePresentationChartLine, 
    HiOutlineArrowDownTray,
    HiOutlineInformationCircle,
    HiOutlineCalculator,
    HiOutlineStar
} from "react-icons/hi2";

export default function LaporanKepegawaian({ steps }) {
    const getStep = (name) =>
        steps.find((step) => step.step === name)?.data || [];

    return (
        <div className="space-y-8 pb-20">
            <Head title="Laporan Kepegawaian" />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h2 className="text-3xl font-black text-gray-800 tracking-tight">
                        Laporan <span className="text-emerald-500">Kepegawaian</span>
                    </h2>
                    <p className="text-sm text-gray-500 max-w-md font-medium leading-relaxed">
                        Analisis hasil penilaian pegawai menggunakan metode MOORA untuk pendukung keputusan objektif.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <a
                        href={route("laporan.kepegawaian.pdf")}
                        target="_blank"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 text-[13px] font-bold text-white hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                    >
                        <HiOutlineArrowDownTray className="h-4 w-4" /> Export PDF
                    </a>
                </div>
            </div>

            <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] overflow-hidden">
                <div className="p-8 md:p-12 space-y-12">
                    {/* Pendahuluan */}
                    <Section 
                        title="Pendahuluan" 
                        icon={HiOutlineInformationCircle}
                        description="Konteks dan tujuan penyusunan laporan penilaian."
                    >
                        <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100/50">
                            <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                Laporan ini disusun sebagai bahan pertimbangan Kepala Sub Bagian Kepegawaian dalam 
                                pengambilan keputusan penilaian pegawai secara objektif dan terukur. Seluruh data 
                                diproses menggunakan parameter kriteria yang telah ditetapkan oleh organisasi.
                            </p>
                        </div>
                    </Section>

                    {/* Tahapan Perhitungan */}
                    <div className="space-y-12">
                        <Section 
                            title="Matriks Keputusan" 
                            icon={HiOutlinePresentationChartLine}
                            description="Data mentah penilaian pegawai untuk setiap kriteria."
                        >
                            <MatrixTable data={getStep("decision_matrix")} />
                        </Section>

                        <Section 
                            title="Matriks Denominator" 
                            icon={HiOutlineCalculator}
                            description="Perhitungan nilai pembagi untuk proses normalisasi."
                        >
                            <DenominatorTable data={getStep("denominator")} />
                        </Section>

                        <Section 
                            title="Normalisasi" 
                            icon={HiOutlineDocumentText}
                            description="Transformasi data ke dalam skala yang seragam."
                        >
                            <MatrixTable data={getStep("normalization")} />
                        </Section>

                        <Section 
                            title="Nilai Optimasi" 
                            icon={HiOutlinePresentationChartLine}
                            description="Hasil perhitungan bobot terhadap nilai normalisasi."
                        >
                            <OptimizationTable data={getStep("optimization")} />
                        </Section>

                        <Section 
                            title="Hasil Akhir & Peringkat" 
                            icon={HiOutlineStar}
                            description="Urutan prioritas pegawai berdasarkan skor optimasi tertinggi."
                        >
                            <RankingTable data={getStep("ranking")} />
                        </Section>
                    </div>

                    {/* Penutup */}
                    <Section 
                        title="Penutup" 
                        icon={HiOutlineCheckCircle}
                        description="Kesimpulan dan tindak lanjut laporan."
                    >
                        <div className="bg-emerald-50/30 rounded-2xl p-6 border border-emerald-100/50">
                            <p className="text-sm text-emerald-700 leading-relaxed font-bold italic">
                                "Hasil perhitungan ini merupakan data pendukung pengambilan keputusan yang bersifat rekomendasi. 
                                Keputusan akhir tetap berada pada wewenang pimpinan dengan mempertimbangkan aspek kualitatif lainnya."
                            </p>
                        </div>
                    </Section>
                </div>
            </div>
        </div>
    );
}

/**
 * Section Component with Standardized Style
 */
function Section({ title, description, icon: Icon, children }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-emerald-500 border border-gray-100 shadow-sm">
                    {Icon && <Icon className="w-6 h-6" />}
                </div>
                <div>
                    <h3 className="text-lg font-black text-gray-800 tracking-tight">{title}</h3>
                    {description && <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{description}</p>}
                </div>
            </div>
            <div className="overflow-x-auto custom-scrollbar">
                {children}
            </div>
        </div>
    );
}

// Global UI Helper: HiOutlineCheckCircle used in Penutup
import { HiOutlineCheckCircle } from "react-icons/hi2";

LaporanKepegawaian.layout = (page) => (
    <AuthenticatedLayout 
        header="Laporan Kepegawaian" 
        breadcrumbs={[
            { label: "Laporan", active: true }
        ]}
    >
        {page}
    </AuthenticatedLayout>
);
