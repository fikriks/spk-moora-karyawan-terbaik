import ApplicationLogo from "@/Components/ApplicationLogo";
import { notifySuccess, notifyError } from "@/Utils/useSweetAlert";
import { Link, usePage, router } from "@inertiajs/react";
import { useEffect, useState } from "react";

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
    HiOutlineChevronLeft,
    HiOutlineChevronRight,
} from "react-icons/hi2";

export default function AuthenticatedLayout({ header, children }) {
    const { auth, flash } = usePage().props;
    const user = auth?.user;

    /* ================= ROLE ================= */
    const isAdmin = user?.roles?.includes("admin");
    const isOperator = user?.roles?.includes("operator");
    const isPenilai = user?.roles?.includes("penilai");
    const isKasubag = user?.roles?.includes("kasubag_kepegawaian");
    const isKetua = user?.roles?.includes("ketua_pengadilan");

    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        if (flash?.success) notifySuccess(flash.success);
        if (flash?.error) notifyError(flash.error);
    }, [flash]);

    /* ================= MENU ================= */
    const menu = [
        {
            name: "Dashboard",
            href: route("operator.index"),
            routeName: "operator.index",
            visible: isOperator,
        },
        {
            name: "Alternative",
            href: route("operator.alternative.index"),
            routeName: "operator.alternative.*",
            visible: isOperator,
        },
        {
            name: "Nilai Alternative",
            href: route("operator.nilai.index"),
            routeName: "operator.nilai.*",
            visible: isOperator,
        },

        {
            name: "Dashboard",
            href: route("penilai.index"),
            routeName: "penilai.index",
            visible: isPenilai,
        },
        {
            name: "Nilai Alternative",
            href: route("penilai.nilai.index"),
            routeName: "penilai.nilai.*",
            visible: isPenilai,
        },

        {
            name: "Dashboard",
            href: route("kasubag.index"),
            routeName: "kasubag.index",
            visible: isKasubag,
        },
        {
            name: "Nilai Alternative",
            href: route("kasubag.nilai.index"),
            routeName: "kasubag.nilai.*",
            visible: isKasubag,
        },
        {
            name: "Reports",
            href: route("kasubag.laporan.index"),
            routeName: "kasubag.laporan.*",
            visible: isKasubag,
        },

        {
            name: "Dashboard",
            href: route("ketua.index"),
            routeName: "ketua.index",
            visible: isKetua,
        },
        {
            name: "Nilai Alternative",
            href: route("ketua.nilai.index"),
            routeName: "ketua.nilai.*",
            visible: isKetua,
        },
        {
            name: "Reports",
            href: route("ketua.laporan.index"),
            routeName: "ketua.laporan.*",
            visible: isKetua,
        },

        {
            name: "Dashboard",
            href: route("admin.index"),
            routeName: "admin.index",
            visible: isAdmin,
        },
        {
            name: "User Management",
            href: route("users.index"),
            routeName: "users.*",
            visible: isAdmin,
        },
        {
            name: "Alternative",
            href: route("admin.alternative.index"),
            routeName: "admin.alternative.*",
            visible: isAdmin,
        },
        {
            name: "Criteria",
            href: route("criteria.index"),
            routeName: "criteria.*",
            visible: isAdmin,
        },
        {
            name: "Moora",
            href: route("moora.index"),
            routeName: "moora.*",
            visible: isAdmin,
        },
        {
            name: "Proses",
            href: route("moora.result"),
            routeName: "moora.result",
            visible: isAdmin,
        },
    ];

    const isActive = (routeName) => {
        try {
            return route().current(routeName);
        } catch {
            return false;
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* ================= SIDEBAR ================= */}
            <aside
                className={`hidden lg:flex flex-col bg-white border-r transition-[width] duration-300 ${
                    sidebarOpen ? "w-64" : "w-20"
                }`}
            >
                {/* LOGO (FIXED & STABLE) */}
                <div className="h-16 flex items-center px-4 border-b shrink-0">
                    <Link href="/" className="flex items-center gap-2">
                        <ApplicationLogo className="w-8 h-8 shrink-0" />
                        {sidebarOpen && (
                            <span className="font-semibold text-lg whitespace-nowrap">
                                SPK
                            </span>
                        )}
                    </Link>
                </div>

                {/* MENU */}
                <nav className="flex-1 px-2 py-4 space-y-1">
                    {menu.map(
                        (item) =>
                            item.visible && (
                                <Link
                                    key={item.routeName}
                                    href={item.href}
                                    className={`
                                        relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium
                                        ${
                                            isActive(item.routeName)
                                                ? "bg-indigo-50 text-indigo-700"
                                                : "text-gray-600 hover:bg-gray-100"
                                        }
                                    `}
                                >
                                    {isActive(item.routeName) && (
                                        <span className="absolute left-0 top-0 h-full w-1 bg-indigo-600 rounded-r" />
                                    )}

                                    <MenuIcon
                                        name={item.name}
                                        active={isActive(item.routeName)}
                                    />

                                    {sidebarOpen && (
                                        <span className="whitespace-nowrap">
                                            {item.name}
                                        </span>
                                    )}
                                </Link>
                            ),
                    )}

                    <button
                        onClick={() => router.post(route("logout"))}
                        className="mt-4 flex w-full items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                    >
                        <HiOutlineArrowLeftOnRectangle className="h-5 w-5" />
                        {sidebarOpen && <span>Log Out</span>}
                    </button>
                </nav>
            </aside>

            {/* TOGGLE */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:flex h-10 w-6 items-center justify-center bg-white border border-l-0 rounded-r-md shadow-sm hover:bg-gray-50"
            >
                {sidebarOpen ? (
                    <HiOutlineChevronLeft className="h-4 w-4" />
                ) : (
                    <HiOutlineChevronRight className="h-4 w-4" />
                )}
            </button>

            {/* CONTENT */}
            <div className="flex-1 flex flex-col">
                <header className="lg:hidden bg-white border-b h-14 flex items-center px-4">
                    <HiOutlineBars3 className="h-6 w-6" />
                    <span className="ml-3 font-semibold">SPK</span>
                </header>

                {header && (
                    <div className="bg-white border-b px-6 py-4">{header}</div>
                )}

                <main className="flex-1 px-6 py-6">{children}</main>
            </div>
        </div>
    );
}

/* ================= ICON ================= */
function MenuIcon({ name, active }) {
    const cls = `h-5 w-5 ${active ? "text-indigo-600" : "text-gray-500"}`;

    switch (name) {
        case "Dashboard":
            return <HiOutlineSquares2X2 className={cls} />;
        case "Alternative":
            return <HiOutlineDocumentDuplicate className={cls} />;
        case "Nilai Alternative":
            return <HiOutlineClipboardDocumentCheck className={cls} />;
        case "Criteria":
            return <HiOutlineAdjustmentsHorizontal className={cls} />;
        case "User Management":
            return <HiOutlineUserGroup className={cls} />;
        case "Moora":
            return <HiOutlineCalculator className={cls} />;
        case "Proses":
            return <HiOutlineArrowPathRoundedSquare className={cls} />;
        case "Reports":
            return <HiOutlineChartBarSquare className={cls} />;
        default:
            return <HiOutlineSquares2X2 className={cls} />;
    }
}
