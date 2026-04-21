import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import { 
    HiOutlineUsers, 
    HiOutlineUserGroup, 
    HiOutlineAdjustmentsHorizontal, 
    HiOutlineClipboardDocumentCheck,
    HiOutlineChartBarSquare,
    HiOutlineArrowRight,
    HiOutlineCheckCircle,
    HiOutlineClock
} from "react-icons/hi2";

/* ================= COMPONENT ================= */

function StatCard({ title, value, icon: Icon, color = "emerald" }) {
    return (
        <div className="bg-white rounded-[24px] border border-gray-100/80 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] group hover:border-emerald-100 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-gray-50 group-hover:bg-emerald-50 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors duration-300" />
                </div>
                <div className="h-1.5 w-1.5 rounded-full bg-gray-200 group-hover:bg-emerald-400 transition-colors" />
            </div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">{title}</div>
            <div className="text-2xl font-bold text-gray-800 tracking-tight">
                {value}
            </div>
        </div>
    );
}

function StatusBadge({ label, active }) {
    return (
        <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border transition-all duration-300 ${
            active 
            ? "bg-emerald-50/50 border-emerald-100 text-emerald-700" 
            : "bg-gray-50/30 border-gray-100 text-gray-400 opacity-60"
        }`}>
            {active ? (
                <HiOutlineCheckCircle className="w-5 h-5 text-emerald-500" />
            ) : (
                <HiOutlineClock className="w-5 h-5" />
            )}
            <span className="text-[13px] font-medium tracking-wide">
                {label}
            </span>
        </div>
    );
}

/* ================= PAGE ================= */

export default function Index() {
    const { summary, mooraStatus } = usePage().props;

    const breadcrumbs = [
        { label: "Dashboard Admin", active: true },
    ];

    return (
        <AuthenticatedLayout 
            header="Dashboard Admin"
            breadcrumbs={breadcrumbs}
        >
            <Head title="Dashboard Admin" />

            <div className="space-y-10">
                {/* ===== SUMMARY STATS ===== */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-1 w-4 bg-emerald-400 rounded-full" />
                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Ringkasan Data</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <StatCard
                            title="Total User"
                            value={summary.totalUser}
                            icon={HiOutlineUsers}
                        />
                        <StatCard
                            title="Total Pegawai"
                            value={summary.totalAlternatif}
                            icon={HiOutlineUserGroup}
                        />
                        <StatCard
                            title="Total Kriteria"
                            value={summary.totalKriteria}
                            icon={HiOutlineAdjustmentsHorizontal}
                        />
                        <StatCard
                            title="Status Nilai"
                            value={summary.statusNilai}
                            icon={HiOutlineClipboardDocumentCheck}
                        />
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* ===== PROGRESS & STATUS ===== */}
                    <div className="space-y-8">
                        {/* Progress Nilai */}
                        <section className="bg-white rounded-[24px] border border-gray-100/80 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-lg font-bold text-gray-800 tracking-tight">Kelengkapan Nilai</h3>
                                <span className="text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100/50 uppercase tracking-wider">
                                    Live Progress
                                </span>
                            </div>
                            
                            <div className="relative pt-1">
                                <div className="flex mb-4 items-center justify-between">
                                    <div>
                                        <span className="text-3xl font-bold inline-block text-gray-800">
                                            {Math.round((summary.nilaiMasuk / summary.nilaiIdeal) * 100)}%
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[12px] font-bold inline-block text-gray-400 uppercase tracking-wider">
                                            {summary.nilaiMasuk} / {summary.nilaiIdeal} Data
                                        </span>
                                    </div>
                                </div>
                                <div className="overflow-hidden h-2.5 mb-4 text-xs flex rounded-full bg-gray-100">
                                    <div 
                                        style={{ width: `${(summary.nilaiMasuk / summary.nilaiIdeal) * 100}%` }}
                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500 transition-all duration-1000 ease-out rounded-full shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                                    />
                                </div>
                                <p className="text-[12px] text-gray-400 leading-relaxed mt-4">
                                    Total nilai yang telah diinputkan oleh Pengelola JKN dibandingkan dengan target keseluruhan alternatif.
                                </p>
                            </div>
                        </section>

                        {/* Status Moora */}
                        <section className="bg-white rounded-[24px] border border-gray-100/80 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
                            <h3 className="text-lg font-bold text-gray-800 tracking-tight mb-6">Alur Proses MOORA</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <StatusBadge
                                    label="Normalisasi"
                                    active={mooraStatus.normalisasi}
                                />
                                <StatusBadge
                                    label="Optimasi"
                                    active={mooraStatus.optimasi}
                                />
                                <StatusBadge
                                    label="Perangkingan"
                                    active={mooraStatus.ranking}
                                />
                            </div>
                        </section>
                    </div>

                    {/* ===== QUICK ACTIONS ===== */}
                    <section className="bg-emerald-500 rounded-[32px] p-10 text-white shadow-xl shadow-emerald-100/50 flex flex-col relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="p-3 rounded-2xl bg-white/10 w-fit mb-8">
                                <HiOutlineChartBarSquare className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight mb-4">Aksi Cepat Admin</h3>
                            <p className="text-emerald-50/80 text-sm leading-relaxed mb-10 max-w-sm">
                                Kelola data master, konfigurasi kriteria penilaian, atau jalankan proses perhitungan Moora secara langsung.
                            </p>

                            <div className="grid grid-cols-1 gap-3">
                                <ActionLink href={route("users.index")} label="Kelola User" />
                                <ActionLink href={route("criteria.index")} label="Konfigurasi Kriteria" />
                                <ActionLink href={route("admin.alternative.index")} label="Data Pegawai" />
                                <Link
                                    href={route("moora.index")}
                                    className={`mt-4 flex items-center justify-between p-5 rounded-[20px] transition-all duration-300 font-bold text-sm ${
                                        summary.mooraReady
                                            ? "bg-white text-emerald-600 hover:shadow-lg hover:scale-[1.02]"
                                            : "bg-emerald-600/50 text-white/50 cursor-not-allowed border border-white/10"
                                    }`}
                                >
                                    <span>Proses Perhitungan Moora</span>
                                    <HiOutlineArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>

                        {/* Decoration */}
                        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-700" />
                        <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl" />
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function ActionLink({ href, label }) {
    return (
        <Link
            href={href}
            className="flex items-center justify-between p-4 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition-all duration-300 text-sm font-medium"
        >
            {label}
            <HiOutlineArrowRight className="w-4 h-4 opacity-60" />
        </Link>
    );
}