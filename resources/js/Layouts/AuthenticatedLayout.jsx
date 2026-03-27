import ApplicationLogo from "@/Components/ApplicationLogo";
import Breadcrumb from "@/Components/Breadcrumb";
import { notifySuccess, notifyError } from "@/Utils/useToast";
import { Link, usePage, router } from "@inertiajs/react";
import { useEffect, useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Toaster } from "react-hot-toast";

// Heroicons v2
import {
    HiOutlineSquares2X2,
    HiOutlineDocumentDuplicate,
    HiOutlineClipboardDocumentCheck,
    HiOutlineAdjustmentsHorizontal,
    HiOutlineUserGroup,
    HiOutlineCalculator,
    HiOutlineArrowPathRoundedSquare,
    HiOutlineChartBarSquare,
    HiOutlineArrowLeftOnRectangle,
    HiOutlineBars3,
    HiOutlineChevronDown,
    HiOutlineUser,
    HiOutlineXMark,
} from "react-icons/hi2";

export default function AuthenticatedLayout({ header, breadcrumbs, children }) {
    const { auth, flash } = usePage().props;
    const user = auth?.user;

    const isAdmin = user?.roles?.includes("admin");
    const isOperator = user?.roles?.includes("operator_simpeg");
    const isPenilai = user?.roles?.includes("pengelola_jkn");
    const isKasubag = user?.roles?.includes("kasubag_tu");
    const isKetua = user?.roles?.includes("bendahara_pengeluaran");
    const isKepala = user?.roles?.includes("kepala_puskesmas");

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (flash?.success) notifySuccess(flash.success);
        if (flash?.error) notifyError(flash.error);
    }, [flash]);

    const menu = [
        {
            name: "Dashboard",
            href: route("operator.index"),
            routeName: "operator.index",
            visible: isOperator,
            icon: HiOutlineSquares2X2,
        },
        {
            name: "Alternative",
            href: route("operator.alternative.index"),
            routeName: "operator.alternative.*",
            visible: isOperator,
            icon: HiOutlineDocumentDuplicate,
        },
        {
            name: "Nilai Alternative",
            href: route("operator.nilai.index"),
            routeName: "operator.nilai.*",
            visible: isOperator,
            icon: HiOutlineClipboardDocumentCheck,
        },
        {
            name: "Dashboard",
            href: route("penilai.index"),
            routeName: "penilai.index",
            visible: isPenilai,
            icon: HiOutlineSquares2X2,
        },
        {
            name: "Nilai Alternative",
            href: route("penilai.nilai.index"),
            routeName: "penilai.nilai.*",
            visible: isPenilai,
            icon: HiOutlineClipboardDocumentCheck,
        },
        {
            name: "Dashboard",
            href: route("kasubag.index"),
            routeName: "kasubag.index",
            visible: isKasubag,
            icon: HiOutlineSquares2X2,
        },
        {
            name: "Nilai Alternative",
            href: route("kasubag.nilai.index"),
            routeName: "kasubag.nilai.*",
            visible: isKasubag,
            icon: HiOutlineClipboardDocumentCheck,
        },
        {
            name: "Reports",
            href: route("kasubag.laporan.index"),
            routeName: "kasubag.laporan.*",
            visible: isKasubag,
            icon: HiOutlineChartBarSquare,
        },
        {
            name: "Dashboard",
            href: route("ketua.index"),
            routeName: "ketua.index",
            visible: isKetua,
            icon: HiOutlineSquares2X2,
        },
        {
            name: "Nilai Alternative",
            href: route("ketua.nilai.index"),
            routeName: "ketua.nilai.*",
            visible: isKetua,
            icon: HiOutlineClipboardDocumentCheck,
        },
        {
            name: "Reports",
            href: route("ketua.laporan.index"),
            routeName: "ketua.laporan.*",
            visible: isKetua,
            icon: HiOutlineChartBarSquare,
        },
        {
            name: "Dashboard",
            href: route("kepala-puskesmas.index"),
            routeName: "kepala-puskesmas.index",
            visible: isKepala,
            icon: HiOutlineSquares2X2,
        },
        {
            name: "Reports",
            href: route("kepala-puskesmas.laporan.index"),
            routeName: "kepala-puskesmas.laporan.*",
            visible: isKepala,
            icon: HiOutlineChartBarSquare,
        },
        {
            name: "Dashboard",
            href: route("admin.index"),
            routeName: "admin.index",
            visible: isAdmin,
            icon: HiOutlineSquares2X2,
        },
        {
            name: "User Management",
            href: route("users.index"),
            routeName: "users.*",
            visible: isAdmin,
            icon: HiOutlineUserGroup,
        },
        {
            name: "Alternative",
            href: route("admin.alternative.index"),
            routeName: "admin.alternative.*",
            visible: isAdmin,
            icon: HiOutlineDocumentDuplicate,
        },
        {
            name: "Criteria",
            href: route("criteria.index"),
            routeName: "criteria.*",
            visible: isAdmin,
            icon: HiOutlineAdjustmentsHorizontal,
        },
        {
            name: "Moora",
            href: route("moora.index"),
            routeName: "moora.*",
            visible: isAdmin,
            icon: HiOutlineCalculator,
        },
        {
            name: "Proses",
            href: route("moora.result"),
            routeName: "moora.result",
            visible: isAdmin,
            icon: HiOutlineArrowPathRoundedSquare,
        },
    ];

    const isActive = (routeName) => {
        try {
            return route().current(routeName);
        } catch {
            return false;
        }
    };

    const toggleSidebar = () => {
        if (window.innerWidth < 1024) {
            setMobileMenuOpen(!mobileMenuOpen);
        } else {
            setSidebarOpen(!sidebarOpen);
        }
    };

    return (
        <div className="min-h-screen flex bg-[#F9FAFB] selection:bg-emerald-50 selection:text-emerald-700 overflow-hidden">
            {/* Mobile Overlay */}
            <Transition show={mobileMenuOpen} as={Fragment}>
                <div className="fixed inset-0 z-[60] lg:hidden flex">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div 
                            className="fixed inset-0 bg-gray-900/40 backdrop-blur-[2px]" 
                            onClick={() => setMobileMenuOpen(false)}
                        />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="ease-in duration-200"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="relative flex w-full max-w-[280px] h-full shadow-2xl shadow-gray-900/20">
                            <SidebarContent 
                                sidebarOpen={true} 
                                menu={menu} 
                                isActive={isActive} 
                                setMobileMenuOpen={setMobileMenuOpen}
                            />
                        </div>
                    </Transition.Child>
                </div>
            </Transition>

            {/* Desktop Sidebar */}
            <div className="hidden lg:flex shrink-0">
                <SidebarContent 
                    sidebarOpen={sidebarOpen} 
                    menu={menu} 
                    isActive={isActive} 
                />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Navbar */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100/80 px-6 flex items-center justify-between sticky top-0 z-40 shrink-0">
                    <button
                        onClick={toggleSidebar}
                        className="p-2.5 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-emerald-500 transition-all duration-300 group"
                    >
                        <HiOutlineBars3 className="h-6 w-6" />
                    </button>

                    <div className="flex items-center gap-4">
                        {/* Profile Dropdown */}
                        <Menu as="div" className="relative">
                            <Menu.Button className="flex items-center gap-3 p-1.5 rounded-2xl hover:bg-gray-50 transition-all duration-300 group border border-transparent hover:border-gray-100">
                                <div className="h-9 w-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-sm border border-emerald-100/50">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="hidden sm:flex flex-col items-start text-left">
                                    <span className="text-[13px] font-bold text-gray-700 leading-none mb-1 group-hover:text-emerald-600 transition-colors">
                                        {user?.name}
                                    </span>
                                    <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                                        {user?.roles?.[0]?.replace('_', ' ')}
                                    </span>
                                </div>
                                <HiOutlineChevronDown className="h-3.5 w-3.5 text-gray-400 ml-1 group-hover:text-emerald-400 transition-colors" />
                            </Menu.Button>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 mt-3 w-56 origin-top-right bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 p-2 focus:outline-none">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                href={route('profile.edit')}
                                                className={`${
                                                    active ? 'bg-emerald-50 text-emerald-600' : 'text-gray-600'
                                                } flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all`}
                                            >
                                                <HiOutlineUser className="h-4 w-4" />
                                                Profil Saya
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <div className="my-1 border-t border-gray-50" />
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => router.post(route('logout'))}
                                                className={`${
                                                    active ? 'bg-rose-50 text-rose-500' : 'text-gray-600'
                                                } flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all w-full text-left`}
                                            >
                                                <HiOutlineArrowLeftOnRectangle className="h-4 w-4" />
                                                Keluar
                                            </button>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </header>

                {/* Content Container */}
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#F9FAFB]/50">
                    <main className="p-6 lg:p-10 max-w-[1600px] mx-auto min-h-full flex flex-col">
                        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <Breadcrumb items={breadcrumbs} />
                        </div>
                        
                        <div className="animate-in fade-in zoom-in-95 duration-500 flex-1">
                            {children}
                        </div>

                        {/* Footer */}
                        <footer className="mt-20 pt-8 border-t border-gray-100/60 text-center">
                            <p className="text-[10px] font-semibold text-gray-300 uppercase tracking-[0.25em]">
                                &copy; {new Date().getFullYear()} Sistem Pendukung Keputusan Kinerja
                            </p>
                        </footer>
                    </main>
                </div>
            </div>
            <Toaster position="top-right" />
        </div>
    );
}

function SidebarContent({ sidebarOpen, menu, isActive, setMobileMenuOpen }) {
    return (
        <aside
            className={`flex flex-col bg-white border-r border-gray-100 h-full transition-all duration-300 ease-in-out ${
                sidebarOpen ? "w-72" : "w-[88px]"
            }`}
        >
            {/* Sidebar Header */}
            <div className="h-20 flex items-center px-6 shrink-0 justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="bg-emerald-50 p-2 rounded-xl group-hover:bg-emerald-100 transition-colors duration-300">
                        <ApplicationLogo className="w-7 h-7" />
                    </div>
                    {sidebarOpen && (
                        <div className="flex flex-col">
                            <span className="font-bold text-[15px] tracking-tight text-gray-800 leading-none">
                                SPK KINERJA
                            </span>
                            <span className="text-[10px] font-semibold text-emerald-500 tracking-[0.15em] mt-1 uppercase">
                                Dashboard
                            </span>
                        </div>
                    )}
                </Link>
                {setMobileMenuOpen && (
                    <button 
                        onClick={() => setMobileMenuOpen(false)}
                        className="lg:hidden p-2 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors"
                    >
                        <HiOutlineXMark className="h-5 w-5" />
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
                {menu.map((item) => (
                    item.visible && (
                        <Link
                            key={item.routeName}
                            href={item.href}
                            onClick={() => setMobileMenuOpen?.(false)}
                            className={`
                                group flex items-center gap-3.5 rounded-xl px-4 py-3 text-[13.5px] font-medium transition-all duration-200
                                ${
                                    isActive(item.routeName)
                                        ? "bg-emerald-50 text-emerald-600 shadow-sm shadow-emerald-100/10"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                }
                            `}
                        >
                            <item.icon 
                                className={`h-[20px] w-[20px] shrink-0 transition-colors duration-200 ${
                                    isActive(item.routeName) ? "text-emerald-500" : "text-gray-400 group-hover:text-gray-500"
                                }`} 
                            />
                            {sidebarOpen && (
                                <span className="whitespace-nowrap tracking-wide capitalize">
                                    {item.name.toLowerCase()}
                                </span>
                            )}
                            {isActive(item.routeName) && sidebarOpen && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                            )}
                        </Link>
                    )
                ))}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-gray-50">
                <button
                    onClick={() => router.post(route("logout"))}
                    className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-[13.5px] font-medium text-rose-400 hover:bg-rose-50 hover:text-rose-500 transition-all duration-300 w-full ${!sidebarOpen && "justify-center"}`}
                >
                    <HiOutlineArrowLeftOnRectangle className="h-5 w-5 shrink-0" />
                    {sidebarOpen && <span className="tracking-wide">Keluar Sistem</span>}
                </button>
            </div>
        </aside>
    );
}