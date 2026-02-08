import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link } from "@inertiajs/react";

/* ================= COMPONENT ================= */

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

function StatusItem({ label, active }) {
    return (
        <div className="flex items-center gap-2 text-sm">
            <span
                className={`h-2 w-2 rounded-full ${
                    active ? "bg-green-500" : "bg-gray-300"
                }`}
            />
            <span className={active ? "text-gray-800" : "text-gray-400"}>
                {label}
            </span>
        </div>
    );
}

/* ================= PAGE ================= */

export default function Index() {
    const { summary, mooraStatus } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard Admin
                </h2>
            }
        >
            <Head title="Dashboard Admin" />

            <div className="space-y-8">
                {/* ===== SUMMARY ===== */}
                <section>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <StatCard
                            title="Total User"
                            value={summary.totalUser}
                        />
                        <StatCard
                            title="Total Pegawai"
                            value={summary.totalAlternatif}
                        />
                        <StatCard
                            title="Total Kriteria"
                            value={summary.totalKriteria}
                        />
                        <StatCard
                            title="Status Nilai"
                            value={summary.statusNilai}
                            color={
                                summary.statusNilai === "Lengkap"
                                    ? "green"
                                    : summary.statusNilai === "Belum Lengkap"
                                      ? "yellow"
                                      : "red"
                            }
                        />
                    </div>
                </section>

                {/* ===== PROGRESS NILAI ===== */}
                <section className="rounded-lg border bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">
                        Progress Kelengkapan Nilai
                    </h3>
                    <div className="text-sm text-gray-600">
                        {summary.nilaiMasuk} / {summary.nilaiIdeal} nilai
                    </div>
                </section>

                {/* ===== STATUS MOORA ===== */}
                <section className="rounded-lg border bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">
                        Status Proses MOORA
                    </h3>

                    <div className="space-y-2">
                        <StatusItem
                            label="Normalisasi"
                            active={mooraStatus.normalisasi}
                        />
                        <StatusItem
                            label="Optimasi (Max-Min)"
                            active={mooraStatus.optimasi}
                        />
                        <StatusItem
                            label="Perangkingan"
                            active={mooraStatus.ranking}
                        />
                    </div>
                </section>

                {/* ===== QUICK ACTION ===== */}
                <section className="rounded-lg border bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">
                        Aksi Cepat Admin
                    </h3>

                    <div className="flex flex-wrap gap-3">
                        <Link
                            href={route("users.index")}
                            className="rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                        >
                            Kelola User
                        </Link>
                        <Link
                            href={route("criteria.index")}
                            className="rounded border px-4 py-2 text-sm font-medium hover:bg-gray-50"
                        >
                            Kelola Kriteria
                        </Link>
                        <Link
                            href={route("admin.alternative.index")}
                            className="rounded border px-4 py-2 text-sm font-medium hover:bg-gray-50"
                        >
                            Data Pegawai
                        </Link>
                        <Link
                            href={route("moora.index")}
                            className={`rounded px-4 py-2 text-sm font-medium text-white ${
                                summary.mooraReady
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                        >
                            Proses MOORA
                        </Link>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
