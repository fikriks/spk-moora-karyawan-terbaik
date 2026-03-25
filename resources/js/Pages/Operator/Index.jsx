import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import { 
    HiOutlineUserGroup, 
    HiOutlineAdjustmentsHorizontal, 
    HiOutlineClipboardDocumentCheck, 
    HiOutlineChartBarSquare,
    HiOutlineArrowRight,
    HiOutlineCheckCircle,
    HiOutlineExclamationTriangle,
    HiOutlineInformationCircle,
    HiOutlineSquares2X2
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
            <div className="text-2xl font-bold text-gray-800 tracking-tight group-hover:text-emerald-600 transition-colors">
                {value}
            </div>
        </div>
    );
}

/* ================= PAGE ================= */

export default function Index() {
    const { summary, statusPegawai } = usePage().props;

    const getStatusConfig = (status) => {
        switch (status) {
            case "Siap Diproses":
                return { color: "emerald", icon: HiOutlineCheckCircle };
            case "Belum Lengkap":
                return { color: "amber", icon: HiOutlineExclamationTriangle };
            default:
                return { color: "rose", icon: HiOutlineInformationCircle };
        }
    };

    const statusConfig = getStatusConfig(summary.statusData);

    return (
        <div className="space-y-10">
            <Head title="Dashboard Operator" />

            {/* ===== SUMMARY STATS ===== */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-1 w-4 bg-emerald-400 rounded-full" />
                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Ringkasan Operator</h3>
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
                        title="Status Data"
                        value={summary.statusData}
                        icon={statusConfig.icon}
                    />
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* ===== PROGRESS ===== */}
                <section className="bg-white rounded-[24px] border border-gray-100/80 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-bold text-gray-800 tracking-tight">Kelengkapan Nilai</h3>
                        <span className="text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100/50 uppercase tracking-wider">
                            Target: {summary.nilaiIdeal}
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
                                    {summary.nilaiMasuk} Terisi
                                </span>
                            </div>
                        </div>
                        <div className="overflow-hidden h-2.5 mb-4 text-xs flex rounded-full bg-gray-100">
                            <div 
                                style={{ width: `${(summary.nilaiMasuk / summary.nilaiIdeal) * 100}%` }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500 transition-all duration-1000 ease-out rounded-full shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                            />
                        </div>
                        <p className="text-[12px] text-gray-400 leading-relaxed mt-4 font-medium">
                            Status pengisian nilai untuk seluruh pegawai terhadap kriteria yang tersedia.
                        </p>
                    </div>
                </section>

                {/* ===== QUICK ACTIONS ===== */}
                <section className="bg-emerald-500 rounded-[32px] p-10 text-white shadow-xl shadow-emerald-100/50 flex flex-col relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="p-3 rounded-2xl bg-white/10 w-fit mb-8">
                            <HiOutlineSquares2X2 className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight mb-4">Aksi Cepat Operator</h3>
                        <p className="text-emerald-50/80 text-sm leading-relaxed mb-10 max-w-sm font-medium">
                            Lakukan pengelolaan data pegawai atau input nilai alternatif untuk kriteria yang menjadi tanggung jawab Anda.
                        </p>

                        <div className="grid grid-cols-1 gap-3">
                            <ActionLink href={route("operator.alternative.index")} label="Kelola Pegawai" />
                            <ActionLink href={route("operator.nilai.index")} label="Input Nilai Alternatif" />
                        </div>
                    </div>

                    {/* Decoration */}
                    <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-700" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl" />
                </section>
            </div>

            {/* ===== STATUS PEGAWAI TABLE ===== */}
            <section className="bg-white rounded-[24px] border border-gray-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.015)] overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h4 className="text-lg font-bold text-gray-800 tracking-tight">Status Kelengkapan Pegawai</h4>
                        <p className="text-[12px] text-gray-400 mt-1 font-medium">Daftar pegawai dan status pengisian nilainya</p>
                    </div>
                </div>

                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">
                                    Pegawai
                                </th>
                                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">
                                    Jabatan
                                </th>
                                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 text-center">
                                    Nilai
                                </th>
                                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 text-right">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {statusPegawai.map((row) => (
                                <tr key={row.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="h-9 w-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 font-bold text-xs group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-all">
                                                {row.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-bold text-gray-700 tracking-tight group-hover:text-emerald-600 transition-colors">{row.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-[13px] font-medium text-gray-400">
                                        {row.jabatan}
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className="text-[13px] font-bold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100/50">
                                            {row.nilai_masuk}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider ${
                                                row.status === "Lengkap"
                                                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100/50"
                                                    : "bg-amber-50 text-amber-600 border border-amber-100/50"
                                            }`}
                                        >
                                            {row.status === "Lengkap" ? (
                                                <HiOutlineCheckCircle className="h-3.5 w-3.5" />
                                            ) : (
                                                <HiOutlineInformationCircle className="h-3.5 w-3.5" />
                                            )}
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}

                            {statusPegawai.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-8 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-300">
                                            <HiOutlineUserGroup className="h-12 w-12 mb-4 opacity-20" />
                                            <p className="text-[11px] font-bold uppercase tracking-[0.2em]">Belum ada data pegawai</p>
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

Index.layout = (page) => (
    <AuthenticatedLayout
        children={page}
        breadcrumbs={[{ label: "Dashboard Operator", active: true }]}
    />
);


