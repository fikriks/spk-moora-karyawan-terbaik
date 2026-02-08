import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

/* ================= COMPONENT ================= */

function StatCard({ title, value, description }) {
    return (
        <div className="rounded-lg border bg-white p-5 shadow-sm">
            <div className="text-sm text-gray-500">{title}</div>
            <div className="mt-1 text-2xl font-semibold text-gray-800">
                {value}
            </div>
            {description && (
                <div className="mt-2 text-xs text-gray-500">{description}</div>
            )}
        </div>
    );
}

function WinnerCard({ data }) {
    if (!data) return null;

    return (
        <div className="rounded-lg border bg-indigo-50 p-6 shadow-sm">
            <div className="text-sm font-medium text-indigo-700">
                Rekomendasi Utama (Peringkat 1)
            </div>

            <div className="mt-2 text-xl font-semibold text-gray-900">
                {data.name}
            </div>

            <div className="text-sm text-gray-600">{data.jabatan}</div>

            <div className="mt-3 text-sm">
                Nilai Akhir MOORA:{" "}
                <span className="font-semibold text-indigo-700">
                    {data.nilai_akhir}
                </span>
            </div>
        </div>
    );
}

/* ================= PAGE ================= */

export default function Index() {
    const { summary, finalRanking = [] } = usePage().props;

    const winner = finalRanking.find((item) => item.rank === 1) || null;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard Ketua Pengadilan
                </h2>
            }
        >
            <Head title="Dashboard Ketua" />

            <div className="space-y-8">
                {/* ===== SUMMARY ===== */}
                <section>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <StatCard
                            title="Total Pegawai Dinilai"
                            value={summary.totalAlternatif}
                        />
                        <StatCard
                            title="Total Kriteria"
                            value={summary.totalKriteria}
                        />
                        <StatCard
                            title="Nilai Masuk"
                            value={`${summary.nilaiMasuk} / ${summary.nilaiIdeal}`}
                        />
                        <StatCard
                            title="Status Proses"
                            value={summary.statusProses}
                            description={
                                summary.statusProses === "Selesai"
                                    ? "Data siap ditetapkan"
                                    : "Menunggu proses perhitungan"
                            }
                        />
                    </div>
                </section>

                {/* ===== WINNER ===== */}
                <section>
                    <WinnerCard data={winner} />
                </section>

                {/* ===== FINAL RANKING ===== */}
                <section className="rounded-lg border bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">
                        Hasil Akhir Perangkingan (MOORA)
                    </h3>

                    <div className="overflow-x-auto">
                        <table className="min-w-full border text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-3 py-2 text-left">
                                        Rank
                                    </th>
                                    <th className="border px-3 py-2 text-left">
                                        Nama
                                    </th>
                                    <th className="border px-3 py-2 text-left">
                                        Jabatan
                                    </th>
                                    <th className="border px-3 py-2 text-right">
                                        Nilai Akhir
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {finalRanking.map((row) => (
                                    <tr
                                        key={row.id}
                                        className={
                                            row.rank === 1
                                                ? "bg-indigo-50 font-semibold"
                                                : "hover:bg-gray-50"
                                        }
                                    >
                                        <td className="border px-3 py-2">
                                            {row.rank}
                                        </td>
                                        <td className="border px-3 py-2">
                                            {row.name}
                                        </td>
                                        <td className="border px-3 py-2 text-gray-600">
                                            {row.jabatan}
                                        </td>
                                        <td className="border px-3 py-2 text-right">
                                            {row.nilai_akhir}
                                        </td>
                                    </tr>
                                ))}

                                {finalRanking.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="px-3 py-4 text-center text-gray-500"
                                        >
                                            Hasil perhitungan MOORA belum
                                            tersedia
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
