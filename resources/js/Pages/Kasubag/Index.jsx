import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import { 
    HiOutlineUserGroup, 
    HiOutlineAdjustmentsHorizontal, 
    HiOutlineClipboardDocumentCheck,
    HiOutlineCheckCircle,
    HiOutlineArrowRight,
    HiOutlineTrophy,
    HiOutlineClock,
    HiOutlineListBullet,
    HiOutlineDocumentChartBar
} from "react-icons/hi2";

/* ================= COMPONENT ================= */

function StatCard({ title, value, icon: Icon }) {
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

/* ================= PAGE ================= */

export default function Index() {
    const { summary, statusPegawai, topRanking } = usePage().props;

    const breadcrumbs = [
        { label: "Dashboard Kasubag", active: true },
    ];

    const progressPercent = summary.nilaiIdeal > 0 
        ? Math.round((summary.nilaiMasuk / summary.nilaiIdeal) * 100) 
        : 0;

    // Batasi tampilan tabel status pegawai hanya 5 data teratas di dashboard
    const displayLimit = 5;
    const limitedStatusPegawai = statusPegawai.slice(0, displayLimit);
    const hasMoreStatusData = statusPegawai.length > displayLimit;

    return (
        <AuthenticatedLayout
            header="Dashboard Kasubag"
            breadcrumbs={breadcrumbs}
        >
            <Head title="Dashboard Kasubag" />

            <div className="space-y-10">
                {/* ===== SUMMARY STATS ===== */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-1 w-4 bg-emerald-400 rounded-full" />
                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Ringkasan Sistem</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                            title="Nilai Masuk"
                            value={summary.nilaiMasuk}
                            icon={HiOutlineClipboardDocumentCheck}
                        />
                        <StatCard
                            title="Status Proses"
                            value={summary.statusProses}
                            icon={HiOutlineCheckCircle}
                        />
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* ===== LEFT CONTENT: PROGRESS & RANKING ===== */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Progress Nilai */}
                        <section className="bg-white rounded-[24px] border border-gray-100/80 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-lg font-bold text-gray-800 tracking-tight">Progres Penilaian Keseluruhan</h3>
                                <span className="text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100/50 uppercase tracking-wider">
                                    Monitoring
                                </span>
                            </div>
                            
                            <div className="relative pt-1">
                                <div className="flex mb-4 items-center justify-between">
                                    <div>
                                        <span className="text-3xl font-bold inline-block text-gray-800">
                                            {progressPercent}%
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[12px] font-bold inline-block text-gray-400 uppercase tracking-wider">
                                            {summary.nilaiMasuk} / {summary.nilaiIdeal} Data Terkumpul
                                        </span>
                                    </div>
                                </div>
                                <div className="overflow-hidden h-2.5 mb-4 text-xs flex rounded-full bg-gray-100">
                                    <div 
                                        style={{ width: `${progressPercent}%` }}
                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500 transition-all duration-1000 ease-out rounded-full shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                                    />
                                </div>
                                <p className="text-[12px] text-gray-400 leading-relaxed mt-4 font-medium">
                                    Total data penilaian yang telah masuk ke sistem dari seluruh kriteria dan pegawai.
                                </p>
                            </div>
                        </section>

                        {/* Top Ranking Table */}
                        <section className="bg-white rounded-[32px] border border-gray-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.015)] overflow-hidden">
                            <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <HiOutlineTrophy className="w-5 h-5 text-amber-400" />
                                        <h3 className="text-lg font-bold text-gray-800 tracking-tight">Hasil Perhitungan MOORA</h3>
                                    </div>
                                    <p className="text-xs text-gray-400 font-medium tracking-wide">Top 5 Peringkat Pegawai</p>
                                </div>
                                <Link
                                    href={route("kasubag.laporan.index")}
                                    className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 transition-colors"
                                >
                                    <HiOutlineDocumentChartBar className="w-4 h-4" />
                                    Lihat Laporan
                                </Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50/50">
                                            <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100/50">Rank</th>
                                            <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100/50">Pegawai</th>
                                            <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100/50 text-right">Nilai Akhir</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {topRanking.map((row) => (
                                            <tr key={row.id} className="group hover:bg-gray-50/50 transition-colors">
                                                <td className="px-8 py-5">
                                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${
                                                        row.rank === 1 ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 
                                                        row.rank === 2 ? 'bg-emerald-400 text-white' : 
                                                        row.rank === 3 ? 'bg-emerald-100 text-emerald-600' : 
                                                        'bg-gray-50 text-gray-400'
                                                    }`}>
                                                        {row.rank}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-gray-700 group-hover:text-emerald-600 transition-colors">{row.name}</span>
                                                        <span className="text-[11px] text-gray-400 font-medium mt-0.5">{row.jabatan}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <span className="text-sm font-black text-gray-800 tracking-tight">{row.nilai_akhir}</span>
                                                </td>
                                            </tr>
                                        ))}
                                        {topRanking.length === 0 && (
                                            <tr>
                                                <td colSpan="3" className="px-8 py-12 text-center text-gray-400 text-sm font-medium italic">
                                                    Hasil perhitungan MOORA belum tersedia
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>

                    {/* ===== RIGHT CONTENT: EMPLOYEE STATUS ===== */}
                    <div className="space-y-8">
                        {/* Status Penilaian Pegawai */}
                        <section className="bg-white rounded-[32px] border border-gray-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.015)] overflow-hidden">
                            <div className="p-6 border-b border-gray-50 bg-gray-50/20">
                                <h3 className="text-md font-bold text-gray-800 tracking-tight">Status Pegawai</h3>
                                <p className="text-[10px] text-gray-400 mt-1 font-bold uppercase tracking-widest">Update Penilaian</p>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {limitedStatusPegawai.map((row) => (
                                    <div key={row.id} className="p-5 hover:bg-gray-50/50 transition-colors">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-gray-700 truncate max-w-[120px]">{row.name}</span>
                                                <span className="text-[10px] text-gray-400 font-medium mt-0.5">{row.jabatan}</span>
                                            </div>
                                            {row.status === "Lengkap" ? (
                                                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                                                    <HiOutlineCheckCircle className="w-3 h-3" />
                                                    <span className="text-[9px] font-black uppercase tracking-wider">Lengkap</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 text-amber-600 border border-amber-100/50">
                                                    <HiOutlineClock className="w-3 h-3" />
                                                    <span className="text-[9px] font-black uppercase tracking-wider">Proses</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full rounded-full transition-all duration-500 ${row.status === 'Lengkap' ? 'bg-emerald-500' : 'bg-amber-400'}`}
                                                    style={{ width: `${(row.nilai_masuk / summary.totalKriteria) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-400">{row.nilai_masuk}/{summary.totalKriteria}</span>
                                        </div>
                                    </div>
                                ))}
                                {statusPegawai.length === 0 && (
                                    <div className="p-8 text-center text-gray-400 text-[11px] font-medium">
                                        Tidak ada data pegawai
                                    </div>
                                )}
                            </div>
                            {hasMoreStatusData && (
                                <div className="p-4 bg-gray-50/30 border-t border-gray-50 flex justify-center">
                                    <Link
                                        href={route("kasubag.nilai.index")}
                                        className="text-[10px] font-black text-gray-400 hover:text-emerald-600 transition-colors uppercase tracking-[0.2em]"
                                    >
                                        + Lihat {statusPegawai.length - displayLimit} Lainnya
                                    </Link>
                                </div>
                            )}
                        </section>

                        {/* Quick Action Card */}
                        <section className="bg-emerald-500 rounded-[32px] p-8 text-white shadow-xl shadow-emerald-100/50 flex flex-col relative overflow-hidden group">
                            <div className="relative z-10">
                                <div className="p-3 rounded-2xl bg-white/10 w-fit mb-6">
                                    <HiOutlineDocumentChartBar className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold tracking-tight mb-2">Laporan Kinerja</h3>
                                <p className="text-emerald-50/80 text-xs leading-relaxed mb-8">
                                    Akses seluruh laporan penilaian dan hasil akhir perhitungan MOORA secara detail.
                                </p>

                                <Link
                                    href={route("kasubag.laporan.index")}
                                    className="flex items-center justify-between p-4 rounded-2xl bg-white text-emerald-600 hover:shadow-lg transition-all duration-300 font-bold text-xs"
                                >
                                    <span>Buka Laporan</span>
                                    <HiOutlineArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* Decoration */}
                            <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all duration-700" />
                            <div className="absolute bottom-[-10%] left-[-10%] w-24 h-24 bg-emerald-400/20 rounded-full blur-xl" />
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
