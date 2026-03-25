import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import { 
    HiOutlineUserGroup, 
    HiOutlineAdjustmentsHorizontal, 
    HiOutlineClipboardDocumentCheck,
    HiOutlineTrophy,
    HiOutlineChartBarSquare,
    HiOutlineChevronRight,
    HiOutlineArrowRight,
    HiOutlineSparkles
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

function WinnerCard({ data }) {
    if (!data) return null;

    const initials = data.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <div className="relative overflow-hidden bg-emerald-600 rounded-[32px] p-8 md:p-10 text-white shadow-xl shadow-emerald-200/50 group">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <HiOutlineTrophy className="w-48 h-48" />
            </div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/5 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-[28px] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl font-black text-white shadow-inner">
                        {initials}
                    </div>
                </div>
                
                <div className="flex-1 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-400/20 border border-emerald-400/30 text-[11px] font-bold uppercase tracking-widest text-emerald-50">
                        <HiOutlineSparkles className="w-3.5 h-3.5" /> Rekomendasi Utama
                    </div>
                    
                    <div>
                        <h3 className="text-3xl font-black tracking-tight">{data.name}</h3>
                        <p className="text-emerald-100/80 font-medium">{data.jabatan}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 pt-2">
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-200/60">Skor Optimasi</p>
                            <p className="text-xl font-bold">{data.nilai_akhir}</p>
                        </div>
                        <div className="h-8 w-px bg-white/10" />
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-200/60">Peringkat</p>
                            <p className="text-xl font-bold">#1</p>
                        </div>
                    </div>
                </div>

                <div className="flex-shrink-0">
                    <Link
                        href={route("ketua.laporan.index")}
                        className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white text-emerald-600 text-sm font-bold hover:shadow-lg hover:scale-[1.02] transition-all active:scale-95"
                    >
                        Lihat Detail Laporan <HiOutlineArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

/* ================= PAGE ================= */

export default function Index() {
    const { summary, finalRanking = [] } = usePage().props;
    const winner = finalRanking.find((item) => item.rank === 1) || null;
    const topRankings = finalRanking.slice(0, 5);

    return (
        <div className="space-y-10 pb-20">
            <Head title="Dashboard Ketua" />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h2 className="text-3xl font-black text-gray-800 tracking-tight">
                        Selamat Datang, <span className="text-emerald-500">Ketua</span>
                    </h2>
                    <p className="text-sm text-gray-500 max-w-md font-medium leading-relaxed">
                        Tinjau hasil penilaian kinerja pegawai secara objektif melalui metode MOORA.
                    </p>
                </div>
            </div>

            {/* ===== SUMMARY STATS ===== */}
            <section>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Pegawai Dinilai"
                        value={summary.totalAlternatif}
                        icon={HiOutlineUserGroup}
                    />
                    <StatCard
                        title="Total Kriteria"
                        value={summary.totalKriteria}
                        icon={HiOutlineAdjustmentsHorizontal}
                    />
                    <StatCard
                        title="Data Nilai"
                        value={`${summary.nilaiMasuk} / ${summary.nilaiIdeal}`}
                        icon={HiOutlineClipboardDocumentCheck}
                    />
                    <StatCard
                        title="Status Penilaian"
                        value={summary.statusProses}
                        icon={HiOutlineChartBarSquare}
                    />
                </div>
            </section>

            {/* ===== WINNER SECTION ===== */}
            {winner && (
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-1 w-4 bg-emerald-400 rounded-full" />
                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Hasil Terbaik</h3>
                    </div>
                    <WinnerCard data={winner} />
                </section>
            )}

            {/* ===== RANKING TABLE ===== */}
            <section className="bg-white rounded-[32px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-black text-gray-800 tracking-tight">Top 5 Perangkingan</h3>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Urutan berdasarkan nilai optimasi tertinggi</p>
                    </div>
                    <Link 
                        href={route("ketua.laporan.index")} 
                        className="inline-flex items-center gap-2 text-[13px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors group"
                    >
                        Lihat Semua Laporan <HiOutlineChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Rank</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Pegawai</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Jabatan</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 text-right">Skor MOORA</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {topRankings.map((row) => {
                                const initials = row.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .slice(0, 2)
                                    .join("")
                                    .toUpperCase();

                                return (
                                    <tr key={row.id} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black border ${
                                                row.rank === 1 
                                                ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20' 
                                                : 'bg-white text-gray-400 border-gray-100'
                                            }`}>
                                                {row.rank}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-[11px] font-bold text-emerald-600 border border-emerald-100 group-hover:scale-110 transition-transform">
                                                    {initials}
                                                </div>
                                                <div className="font-bold text-gray-700 group-hover:text-emerald-600 transition-colors">{row.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-sm font-medium text-gray-500">{row.jabatan}</span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <span className="inline-flex items-center px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100/50">
                                                {row.nilai_akhir}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}

                            {finalRanking.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-8 py-12 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300">
                                                <HiOutlineClipboardDocumentCheck className="w-6 h-6" />
                                            </div>
                                            <p className="text-sm font-bold text-gray-400">Hasil perhitungan MOORA belum tersedia</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

Index.layout = (page) => (
    <AuthenticatedLayout 
        header="Dashboard Ketua" 
        breadcrumbs={[
            { label: "Dashboard", active: true }
        ]}
    >
        {page}
    </AuthenticatedLayout>
);
