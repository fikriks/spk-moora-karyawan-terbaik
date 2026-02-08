import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link } from "@inertiajs/react";

/* ================= COMPONENT ================= */

function StatCard({ title, value, color = "indigo" }) {
    const colors = {
        indigo: "bg-indigo-50 text-indigo-700",
        yellow: "bg-yellow-50 text-yellow-700",
        green: "bg-green-50 text-green-700",
    };

    return (
        <div className="rounded-lg border bg-white p-5 shadow-sm">
            <div className="text-sm text-gray-500">{title}</div>
            <div className="mt-1 text-2xl font-semibold text-gray-800">
                {value}
            </div>
            <div
                className={`mt-2 inline-block rounded px-2 py-1 text-xs ${colors[color]}`}
            >
                {title}
            </div>
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

/* ================= PAGE ================= */

export default function Index() {
    const { summary, statusPegawai } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard Penilai
                </h2>
            }
        >
            <Head title="Dashboard Penilai" />

            <div className="space-y-8">
                {/* ===== SUMMARY ===== */}
                <section>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <StatCard
                            title="Total Pegawai"
                            value={summary.totalAlternatif}
                        />
                        <StatCard
                            title="Total Kriteria"
                            value={summary.totalKriteria}
                        />
                        <StatCard
                            title="Nilai Diinput"
                            value={`${summary.nilaiMasuk} / ${summary.nilaiIdeal}`}
                            color="yellow"
                        />
                        <StatCard
                            title="Status"
                            value={summary.statusProses}
                            color={
                                summary.statusProses === "Selesai"
                                    ? "green"
                                    : "yellow"
                            }
                        />
                    </div>
                </section>

                {/* ===== PROGRESS ===== */}
                <section className="rounded-lg border bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">
                        Progress Pengisian Nilai
                    </h3>
                    <ProgressBar
                        value={summary.nilaiMasuk}
                        max={summary.nilaiIdeal}
                    />
                </section>

                {/* ===== STATUS PEGAWAI ===== */}
                <section className="rounded-lg border bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">
                        Daftar Pegawai yang Dinilai
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
                                    <th className="border px-3 py-2 text-center">
                                        Aksi
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
                                                    row.status ===
                                                    "Sudah Dinilai"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }`}
                                            >
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="border px-3 py-2 text-center">
                                            <Link
                                                href={route(
                                                    "penilai.nilai.index",
                                                )}
                                                className="text-indigo-600 hover:underline text-sm"
                                            >
                                                Input Nilai
                                            </Link>
                                        </td>
                                    </tr>
                                ))}

                                {statusPegawai.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="5"
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
