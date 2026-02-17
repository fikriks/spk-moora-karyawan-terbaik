import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MatrixTable from "@/Components/MatrixTable";
import OptimizationTable from "@/Components/OptimationTable";
import RankingTable from "@/Components/RankingTable";
import DenominatorTable from "@/Components/DenominatorTable";

export default function LaporanKetuaPengadilan({ steps }) {
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
                        Disampaikan kepada Ketua Pengadilan
                    </p>
                </div>

                {/* Aksi */}
                <div className="flex justify-end mb-6">
                    <a
                        href={route("laporan.ketua-pengadilan.pdf")}
                        className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded"
                    >
                        Export PDF
                    </a>
                </div>

                {/* Pendahuluan */}
                <Section title="Pendahuluan">
                    <p className="text-sm leading-relaxed text-justify">
                        Laporan ini disusun sebagai bahan pertimbangan Ketua
                        Pengadilan dalam pelaksanaan fungsi pembinaan,
                        pengawasan, dan pengambilan keputusan manajerial
                        terhadap kinerja pegawai. Penilaian dilakukan secara
                        objektif dan terukur menggunakan metode
                        <strong>
                            {" "}
                            Multi-Objective Optimization on the Basis of Ratio
                            Analysis (MOORA)
                        </strong>
                        .
                    </p>
                </Section>

                {/* Matriks */}
                <Section title="Data Penilaian Pegawai">
                    <p className="text-sm text-gray-600 mb-2">
                        Data berikut merupakan hasil penilaian pegawai terhadap
                        kriteria yang telah ditetapkan.
                    </p>
                    <MatrixTable data={getStep("decision_matrix")} />
                </Section>

                {/* Denominator */}
                <Section title="Matriks Denominator">
                    <p className="text-sm text-gray-600 mb-2">
                        Matriks denominator digunakan untuk menghitung nilai
                        denominator dari setiap kriteria.
                    </p>
                    <DenominatorTable data={getStep("denominator")} />
                </Section>

                {/* Normalisasi */}
                <Section title="Normalisasi Data Penilaian">
                    <p className="text-sm text-gray-600 mb-2">
                        Normalisasi dilakukan untuk menyetarakan nilai penilaian
                        agar dapat dibandingkan secara proporsional.
                    </p>
                    <MatrixTable data={getStep("normalization")} />
                </Section>

                {/* Optimasi */}
                <Section title="Hasil Perhitungan Nilai Akhir">
                    <p className="text-sm text-gray-600 mb-2">
                        Nilai akhir diperoleh dari proses perhitungan
                        berdasarkan bobot kriteria dan hasil normalisasi.
                    </p>
                    <OptimizationTable data={getStep("optimization")} />
                </Section>

                {/* Ranking */}
                <Section title="Peringkat Pegawai">
                    <p className="text-sm text-gray-600 mb-2">
                        Berikut merupakan hasil peringkat pegawai berdasarkan
                        nilai akhir sebagai dasar pertimbangan pimpinan.
                    </p>
                    <RankingTable data={getStep("ranking")} />
                </Section>

                {/* Penutup */}
                <Section title="Penutup">
                    <p className="text-sm leading-relaxed text-justify">
                        Berdasarkan hasil penilaian yang telah dilakukan,
                        laporan ini diharapkan dapat menjadi bahan pendukung
                        bagi Ketua Pengadilan dalam pengambilan keputusan yang
                        objektif, transparan, dan dapat dipertanggungjawabkan.
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
