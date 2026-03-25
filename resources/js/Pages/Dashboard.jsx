import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { 
    HiOutlineSparkles, 
    HiOutlineArrowRight, 
    HiOutlineShieldCheck, 
    HiOutlineUserCircle,
    HiOutlineBookOpen
} from "react-icons/hi2";

export default function Dashboard() {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <AuthenticatedLayout
            header="Dashboard Utama"
        >
            <Head title="Dashboard" />

            <div className="space-y-8">
                {/* Welcome Hero */}
                <div className="bg-white rounded-[24px] border border-gray-100/80 p-8 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.015)] relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100/50 mb-6">
                                <HiOutlineSparkles className="w-4 h-4 text-emerald-500" />
                                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Akses Terautentikasi</span>
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 tracking-tight leading-[1.15] mb-4">
                                Selamat Datang kembali, <br />
                                <span className="text-emerald-500">{user?.name}</span>
                            </h1>
                            <p className="text-gray-400 text-sm lg:text-base leading-relaxed max-w-lg">
                                Anda telah berhasil masuk ke Sistem Pendukung Keputusan Penilaian Kinerja. Silakan gunakan menu di samping untuk mulai mengelola data.
                            </p>
                        </div>
                        
                        <div className="shrink-0 hidden lg:block">
                            <div className="h-32 w-32 rounded-3xl bg-emerald-50/50 flex items-center justify-center border border-emerald-100/20 rotate-3 group-hover:rotate-6 transition-transform duration-500">
                                <div className="h-24 w-24 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-xl shadow-emerald-200">
                                    <HiOutlineSparkles className="w-10 h-10" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-emerald-50/30 rounded-full blur-3xl -z-0" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-48 h-48 bg-gray-50/50 rounded-full blur-2xl -z-0" />
                </div>

                {/* Quick Stats / Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InfoCard 
                        title="Status Akun" 
                        value="Aktif" 
                        description="Sesi Anda valid dan aman"
                        type="success"
                        icon={HiOutlineShieldCheck}
                    />
                    <InfoCard 
                        title="Peran Pengguna" 
                        value={user?.roles?.[0]?.replace('_', ' ') || 'User'} 
                        description="Tingkat akses sistem saat ini"
                        type="neutral"
                        icon={HiOutlineUserCircle}
                    />
                    <div className="bg-emerald-500 rounded-[24px] p-8 text-white flex flex-col justify-between group cursor-pointer hover:bg-emerald-600 transition-all duration-300 shadow-xl shadow-emerald-100/50 relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="p-2.5 rounded-xl bg-white/10 w-fit mb-6">
                                <HiOutlineBookOpen className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight">Butuh bantuan?</h3>
                            <p className="text-emerald-50 text-[13px] mt-2 leading-relaxed opacity-90">Lihat dokumentasi atau hubungi administrator jika Anda mengalami kendala.</p>
                        </div>
                        <div className="mt-8 flex items-center gap-2 text-[13px] font-bold relative z-10">
                            Hubungi Admin
                            <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                        
                        {/* Decorative background for card */}
                        <div className="absolute bottom-[-20%] right-[-10%] w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function InfoCard({ title, value, description, type, icon: Icon }) {
    return (
        <div className="bg-white rounded-[24px] border border-gray-100/80 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex flex-col justify-between relative overflow-hidden group hover:border-emerald-100 transition-all duration-300">
            <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                    <div className="p-3 rounded-2xl bg-gray-50 group-hover:bg-emerald-50 transition-colors duration-300">
                        {Icon && <Icon className="w-6 h-6 text-gray-400 group-hover:text-emerald-500 transition-colors duration-300" />}
                    </div>
                    {type === 'success' && (
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-[9px] font-bold text-emerald-600 uppercase tracking-widest border border-emerald-100/50">
                            Verified
                        </span>
                    )}
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{title}</span>
                <h3 className="text-2xl font-bold text-gray-800 mt-2 capitalize">{value}</h3>
                <p className="text-[12px] text-gray-400 mt-2 leading-relaxed">{description}</p>
            </div>
        </div>
    );
}