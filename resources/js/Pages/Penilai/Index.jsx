import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import { 
    HiOutlineUserGroup, 
    HiOutlineAdjustmentsHorizontal, 
    HiOutlineClipboardDocumentCheck,
    HiOutlineCheckCircle,
    HiOutlineArrowRight,
    HiOutlinePencilSquare,
    HiOutlineClock,
    HiOutlineListBullet
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
    const { summary, statusPegawai } = usePage().props;

    const breadcrumbs = [
        { label: "Dashboard Pengelola JKN", active: true },
    ];

    const progressPercent = summary.nilaiIdeal > 0 
        ? Math.round((summary.nilaiMasuk / summary.nilaiIdeal) * 100) 
        : 0;

    // Batasi tampilan tabel hanya 5 data teratas
    const displayLimit = 5;
    const limitedStatusPegawai = statusPegawai.slice(0, displayLimit);
    const hasMoreData = statusPegawai.length > displayLimit;

    return (
        <AuthenticatedLayout
            header="Dashboard Pengelola JKN"
            breadcrumbs={breadcrumbs}
        >
            <Head title="Dashboard Pengelola JKN" />

            <div className="space-y-10">
                {/* ===== SUMMARY STATS ===== */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-1 w-4 bg-emerald-400 rounded-full" />
                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Ringkasan Penilaian</h3>
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
                            title="Nilai Terisi"
                            value={summary.nilaiMasuk}
                            icon={HiOutlineClipboardDocumentCheck}
                        />
                        <StatCard
                            title="Status Akhir"
                            value={summary.statusProses}
                            icon={HiOutlineCheckCircle}
                        />
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* ===== LEFT CONTENT: PROGRESS & TABLE ===== */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Progress Nilai */}
                        <section className="bg-white rounded-[24px] border border-gray-100/80 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-lg font-bold text-gray-800 tracking-tight">Progres Pengisian</h3>
                                <span className="text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100/50 uppercase tracking-wider">
                                    Live Status
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
                                            {summary.nilaiMasuk} / {summary.nilaiIdeal} Kriteria
                                        </span>
                                    </div>
                                </div>
                                <div className="overflow-hidden h-2.5 mb-4 text-xs flex rounded-full bg-gray-100">
                                    <div 
                                        style={{ width: `${progressPercent}%` }}
                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500 transition-all duration-1000 ease-out rounded-full shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                                    />
                                </div>
                                <p className="text-[12px] text-gray-400 leading-relaxed mt-4">
                                    Persentase total kriteria yang telah Anda nilai dari keseluruhan pegawai yang tersedia.
                                </p>
                            </div>
                        </section>

                        {/* Status Pegawai Table */}
                        <section className="bg-white rounded-[32px] border border-gray-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.015)] overflow-hidden">
                            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 tracking-tight">Status Penilaian Pegawai</h3>
                                    <p className="text-xs text-gray-400 mt-1 font-medium tracking-wide">Daftar progres penilaian per individu</p>
                                </div>
                                {hasMoreData && (
                                    <Link
                                        href={route("penilai.nilai.index")}
                                        className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 transition-colors"
                                    >
                                        <HiOutlineListBullet className="w-4 h-4" />
                                        Lihat Semua
                                    </Link>
                                )}
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50/50">
                                            <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100/50">Pegawai</th>
                                            <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100/50 text-center">Status</th>
                                            <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100/50 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {limitedStatusPegawai.map((row) => (
                                            <tr key={row.id} className="group hover:bg-gray-50/50 transition-colors">
                                                <td className="px-8 py-5">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-gray-700 group-hover:text-emerald-600 transition-colors">{row.name}</span>
                                                        <span className="text-[11px] text-gray-400 font-medium mt-0.5">{row.jabatan}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className="flex justify-center">
                                                        {row.status === "Sudah Dinilai" ? (
                                                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                                                                <HiOutlineCheckCircle className="w-3.5 h-3.5" />
                                                                <span className="text-[10px] font-black uppercase tracking-wider">Lengkap</span>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100/50">
                                                                <HiOutlineClock className="w-3.5 h-3.5" />
                                                                <span className="text-[10px] font-black uppercase tracking-wider">Belum Selesai</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <Link
                                                        href={route("penilai.nilai.index")}
                                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-600 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm"
                                                    >
                                                        <HiOutlinePencilSquare className="w-4 h-4" />
                                                        <span>Input Nilai</span>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                        {statusPegawai.length === 0 && (
                                            <tr>
                                                <td colSpan="3" className="px-8 py-12 text-center">
                                                    <div className="flex flex-col items-center">
                                                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-3">
                                                            <HiOutlineUserGroup className="w-6 h-6 text-gray-300" />
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-400">Tidak ada data pegawai yang perlu dinilai</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {hasMoreData && (
                                <div className="p-4 bg-gray-50/30 border-t border-gray-50 flex justify-center">
                                    <Link
                                        href={route("penilai.nilai.index")}
                                        className="text-[11px] font-bold text-gray-400 hover:text-emerald-600 transition-colors uppercase tracking-widest"
                                    >
                                        + Lihat {statusPegawai.length - displayLimit} Pegawai Lainnya
                                    </Link>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* ===== RIGHT CONTENT: QUICK ACTIONS ===== */}
                    <div className="space-y-8">
                        <section className="bg-emerald-500 rounded-[32px] p-8 text-white shadow-xl shadow-emerald-100/50 flex flex-col relative overflow-hidden group h-full min-h-[400px]">
                            <div className="relative z-10">
                                <div className="p-3 rounded-2xl bg-white/10 w-fit mb-8">
                                    <HiOutlinePencilSquare className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight mb-4">Aksi Cepat Pengelola JKN</h3>
                                <p className="text-emerald-50/80 text-sm leading-relaxed mb-10">
                                    Segera selesaikan penilaian untuk seluruh pegawai agar proses perhitungan MOORA dapat dilanjutkan oleh Admin.
                                </p>

                                <div className="grid grid-cols-1 gap-3">
                                    <Link
                                        href={route("penilai.nilai.index")}
                                        className="flex items-center justify-between p-5 rounded-[20px] bg-white text-emerald-600 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 font-bold text-sm"
                                    >
                                        <span>Input Penilaian Sekarang</span>
                                        <HiOutlineArrowRight className="w-5 h-5" />
                                    </Link>
                                    
                                    <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                                <span className="text-xs font-bold text-white">1</span>
                                            </div>
                                            <p className="text-xs text-emerald-50/70 font-medium">Pilih pegawai yang akan dinilai</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                                <span className="text-xs font-bold text-white">2</span>
                                            </div>
                                            <p className="text-xs text-emerald-50/70 font-medium">Input nilai pada setiap kriteria</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                                <span className="text-xs font-bold text-white">3</span>
                                            </div>
                                            <p className="text-xs text-emerald-50/70 font-medium">Simpan dan pastikan status lengkap</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decoration */}
                            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-700" />
                            <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl" />
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
