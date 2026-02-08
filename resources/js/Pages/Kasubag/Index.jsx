import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

/* ================= REUSABLE COMPONENTS ================= */

function StatCard({ title, value, subtitle, color = "indigo" }) {
    const colors = {
        indigo: "bg-indigo-50 text-indigo-700",
        green: "bg-green-50 text-green-700",
        yellow: "bg-yellow-50 text-yellow-700",
        red: "bg-red-50 text-red-700",
    };

    return (
        <div className="rounded-lg border bg-white p-5 shadow-sm">
            <div className="text-sm text-gray-500">{title}</div>
            <div className="mt-1 text-2xl font-semibold text-gray-800">
                {value}
            </div>
            {subtitle && (
                <div
                    className={`mt-2 inline-block rounded px-2 py-1 text-xs ${colors[color]}`}
                >
                    {subtitle}
                </div>
            )}
        </div>
    );
}

function ProgressBar({ value, max }) {
    const percent = max > 0 ? Math.round((value / max) * 100) : 0;

    return (
        <div>
            <div className="mb-1 flex justify-between text-xs text-gray-500">
                <span>
                    {value} / {max}
                </span>
                <span>{percent}%</span>
            </div>
            <div className="h-2 w-full rounded bg-gray-200">
                <div
                    className="h-2 rounded bg-indigo-600 transition-all"
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
}

/* ================= MAIN PAGE ================= */

export default function Index() {
    const { summary, statusPegawai, topRanking } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard Kasubag Kepegawaian
                </h2>
            }
        >
            <Head title="Dashboard Kasubag" />

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
                            value={summary.nilaiMasuk}
                            subtitle={`Target ${summary.nilaiIdeal}`}
                            color="yellow"
                        />
                        <StatCard
                            title="Status Proses"
                            value={summary.statusProses}
                            color={
                                summary.statusProses === "Selesai"
                                    ? "green"
                                    : summary.statusProses === "Belum Dimulai"
                                      ? "red"
                                      : "yellow"
                            }
                        />
                    </div>
                </section>

                {/* ===== PROGRESS ===== */}
                <section className="rounded-lg border bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">
                        Progress Penilaian
                    </h3>
                    <ProgressBar
                        value={summary.nilaiMasuk}
                        max={summary.nilaiIdeal}
                    />
                </section>

                {/* ===== TOP RANKING (MOORA) ===== */}
                <section className="rounded-lg border bg-white p-6 shadow-sm">
                    <h3 className="mb-1 text-lg font-semibold text-gray-800">
                        Top 5 Ranking (Hasil Perhitungan MOORA)
                    </h3>
                    <p className="mb-4 text-xs text-gray-500">
                        Digunakan untuk monitoring, bukan penetapan keputusan
                    </p>

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
                                {topRanking.map((row) => (
                                    <tr
                                        key={row.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="border px-3 py-2 font-medium">
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

                                {topRanking.length === 0 && (
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

                {/* ===== STATUS PEGAWAI ===== */}
                <section className="rounded-lg border bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">
                        Status Penilaian Pegawai
                    </h3>

                    <div className="overflow-x-auto">
                        <table className="min-w-full border text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-3 py-2 text-left">
                                        Nama
                                    </th>
                                    <th className="border px-3 py-2 text-left">
                                        Jabatan
                                    </th>
                                    <th className="border px-3 py-2 text-center">
                                        Nilai Masuk
                                    </th>
                                    <th className="border px-3 py-2 text-center">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {statusPegawai.map((row) => (
                                    <tr
                                        key={row.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="border px-3 py-2">
                                            {row.name}
                                        </td>
                                        <td className="border px-3 py-2 text-gray-600">
                                            {row.jabatan}
                                        </td>
                                        <td className="border px-3 py-2 text-center">
                                            {row.nilai_masuk}
                                        </td>
                                        <td className="border px-3 py-2 text-center">
                                            <span
                                                className={`rounded px-2 py-1 text-xs font-medium ${
                                                    row.status === "Lengkap"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }`}
                                            >
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {statusPegawai.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="px-3 py-4 text-center text-gray-500"
                                        >
                                            Tidak ada data pegawai
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
