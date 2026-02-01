// resources/js/Layouts/AuthenticatedLayout.jsx
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { notifySuccess, notifyError } from "@/Utils/useSweetAlert";
import { Link, usePage, router } from "@inertiajs/react";
import { useEffect, useState } from "react";

// Heroicons via react-icons (modern, gratis, tersedia di Figma)
import {
    HiOutlineHome,
    HiOutlineShieldCheck,
    HiOutlineUsers,
    HiOutlineLogout,
    HiOutlineDocumentText,
    HiOutlineAdjustments,
    HiOutlineClipboardList,
    HiOutlineBookmark,
    HiOutlineNewspaper,
} from "react-icons/hi";
import {
    HiOutlineAdjustmentsHorizontal,
    HiOutlineDocumentCheck,
} from "react-icons/hi2";

/**
 * Layout utama yang menampilkan sidebar (desktop + mobile) dan topbar untuk mobile.
 * Perbaikan utama: semua aksi logout dikirim menggunakan Inertia (router.post)
 * sehingga CSRF token ditangani oleh Inertia dan menghindari HTTP 419 Page Expired.
 */
export default function AuthenticatedLayout({ header, children }) {
    // Ambil user & flash dari Inertia page props
    const user = usePage().props.auth?.user;
    const { flash } = usePage().props;

    const isAdmin = user?.roles?.includes("admin");
    const isOperator = user?.roles?.includes("operator");
    const isPenilai = user?.roles?.includes("penilai");
    const isKasubag = user?.roles?.includes("kasubag_kepegawaian");
    const isKetua = user?.roles?.includes("ketua_pengadilan");
    // console.log("isAdmin:", isAdmin);
    // console.log("isOperator: ", isOperator);
    // console.log(user);
    // console.log(hasRole);

    // const isPenilai = user?.roles[0].name === "penilai";
    // const isKasubag = user?.roles[0].name === "kasubag_kepegawaian";

    // const isKetua = user?.roles[0].name === "ketua_pengadilan";

    // Kontrol sidebar
    const [sidebarOpen, setSidebarOpen] = useState(true); // desktop default: open
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        if (flash?.success) notifySuccess(flash.success);
        if (flash?.error) notifyError(flash.error);
    }, [flash]);

    // Struktur menu yang simpel — mudah dikembangkan
    const menu = [
        //OPERATOR MENU SIDEBAR
        {
            name: "Dashboard",
            href: route("operator.index"),
            visible: isOperator,
        },
        {
            name: "Alternative",
            href: route("operator.alternative.index"),
            visible: isOperator,
        },
        {
            name: "Nilai Alternative",
            href: route("operator.nilai.index"),
            visible: isOperator,
        },
        //PENILAI MENU SIDEBAR
        {
            name: "Dashboard",
            href: route("penilai.index"),
            visible: isPenilai,
        },
        //KASUBAG MENU SIDEBAR
        {
            name: "Dashboard",
            href: route("kasubag.index"),
            visible: isKasubag,
        },
        {
            name: "Alternative",
            href: "",
            visible: isKasubag,
        },
        {
            name: "Reports",
            href: "",
            visible: isKasubag,
        },
        //KETUA MENU SIDEBAR
        { name: "Dashboard", href: route("ketua.index"), visible: isKetua },
        {
            name: "Reports",
            href: "",
            visible: isKetua,
        },
        //ADMIN MENU SIDEBAR
        { name: "Dashboard", href: route("admin.index"), visible: isAdmin },
        {
            name: "User Management",
            href: route("users.index"),
            visible: isAdmin,
        },
        {
            name: "Alternative",
            href: route("admin.alternative.index"),
            visible: isAdmin,
        },
        { name: "Criteria", href: route("criteria.index"), visible: isAdmin },
        {
            name: "Assessments",
            href: "",
            visible: isAdmin,
        },
        {
            name: "Results",
            href: "",
            visible: isAdmin,
        },
    ];

    // helper untuk cek active route (aman karena route().current expect route name string)
    const isActive = (href) => {
        try {
            if (!href) return false;
            return route().current(href?.replace(/\..*$/, "") + "*");
        } catch {
            return false;
        }
    };

    const toggleSidebar = () => setSidebarOpen((s) => !s);

    // Fungsi helper logout (programmatic) jika mau pakai tombol biasa
    const doLogout = (e) => {
        e?.preventDefault?.();
        // router.post akan memicu request POST melalui Inertia, CSRF di-handle otomatis
        router.post(route("logout"));
    };

    return (
        <div className="min-h-screen flex bg-gray-50 text-gray-800">
            {/* Mobile Sidebar (overlay) */}
            <div
                className={`fixed inset-0 z-40 lg:hidden transition-opacity ${
                    mobileOpen ? "pointer-events-auto" : "pointer-events-none"
                }`}
                aria-hidden={!mobileOpen}
            >
                <div
                    className={`absolute inset-0 bg-black/40 transition-opacity ${
                        mobileOpen ? "opacity-100" : "opacity-0"
                    }`}
                    onClick={() => setMobileOpen(false)}
                />
                <aside
                    className={`fixed left-0 top-0 bottom-0 w-72 bg-white shadow-md transform transition-transform ${
                        mobileOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    <div className="flex items-center justify-between px-4 h-16 border-b">
                        <Link href="/">
                            <ApplicationLogo className="h-8 w-auto text-gray-800" />
                        </Link>
                        <button
                            aria-label="Close menu"
                            onClick={() => setMobileOpen(false)}
                            className="p-2 rounded hover:bg-gray-100"
                        >
                            {/* X icon (tetap SVG untuk tombol close) */}
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>

                    <nav className="p-4 space-y-1">
                        {menu.map(
                            (item) =>
                                item.visible && (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium hover:bg-gray-100 transition-colors ${
                                            isActive(item.href)
                                                ? "bg-gray-100"
                                                : ""
                                        }`}
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        <MenuIcon name={item.name} />
                                        <span>{item.name}</span>
                                    </Link>
                                ),
                        )}

                        <div className="border-t mt-2 pt-2">
                            {/* Profile link */}
                            <Link
                                href={route("profile.edit")}
                                className="block px-3 py-2 rounded text-sm hover:bg-gray-100"
                                onClick={() => setMobileOpen(false)}
                            >
                                Profile
                            </Link>

                            {/* Logout: gunakan Inertia Link method="post" supaya CSRF tidak bikin 419 */}
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-100"
                                onClick={() => setMobileOpen(false)}
                            >
                                <span className="inline-flex items-center gap-3">
                                    <HiOutlineLogout className="h-5 w-5 text-red-600" />
                                    <span>Log Out</span>
                                </span>
                            </Link>
                        </div>
                    </nav>
                </aside>
            </div>

            {/* Desktop Sidebar */}
            <aside
                className={`hidden lg:flex lg:flex-col lg:shrink-0 transition-all duration-200 ${
                    sidebarOpen ? "w-64" : "w-20"
                } bg-white border-r`}
                aria-label="Sidebar"
            >
                {/* TOP */}
                <div
                    className={`flex h-16 items-center justify-center px-4 border-b ${
                        sidebarOpen ? "justify-between" : "justify-center"
                    }`}
                >
                    <Link href="/" className="flex items-center gap-2">
                        <ApplicationLogo className="h-8 w-auto transition-all" />
                        {sidebarOpen && (
                            <span className="font-semibold text-lg transition-opacity duration-200">
                                My App
                            </span>
                        )}
                    </Link>
                </div>

                {/* NAV: render menu hanya saat sidebarOpen */}
                {sidebarOpen ? (
                    <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
                        {/* MENU UTAMA */}
                        {menu.map(
                            (item) =>
                                item.visible && (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium hover:bg-gray-100 transition-colors ${
                                            isActive(item.href)
                                                ? "bg-gray-100"
                                                : ""
                                        }`}
                                    >
                                        <span className="shrink-0">
                                            <MenuIcon name={item.name} />
                                        </span>
                                        <span className="transition-opacity duration-200">
                                            {item.name}
                                        </span>
                                    </Link>
                                ),
                        )}

                        {/* TOMBOL LOGOUT DI SIDEBAR (desktop expanded) */}
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="mt-4 flex w-full items-center gap-3 rounded px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <HiOutlineLogout className="h-5 w-5 text-red-600" />
                            <span>Log Out</span>
                        </Link>
                    </nav>
                ) : (
                    /* Saat sidebar collapse: tetap sediakan area kosong supaya layout balance.
                       Logout icon disediakan di area profile bawah supaya user tetap bisa logout. */
                    <div className="flex-1" />
                )}

                {/* BOTTOM: profile area */}
                <div className="px-3 py-4 border-t">
                    <div className="flex items-center gap-3 justify-between">
                        {/* profile avatar - selalu terlihat */}
                        <div className="flex-shrink-0">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        className={`relative overflow-hidden rounded-full ${
                                            sidebarOpen
                                                ? "h-9 w-9"
                                                : "h-10 w-10 mx-auto"
                                        } bg-gray-200 flex items-center justify-center`}
                                    >
                                        {user?.profile_photo_url ? (
                                            <img
                                                src={user.profile_photo_url}
                                                alt={user?.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-sm font-medium text-gray-700">
                                                {user?.name?.slice(0, 1) ?? "U"}
                                            </span>
                                        )}
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route("profile.edit")}>
                                        Profile
                                    </Dropdown.Link>

                                    {isAdmin && (
                                        <>
                                            <Dropdown.Link
                                                href={route("admin.index")}
                                            >
                                                Admin Dashboard
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("users.index")}
                                            >
                                                Manage Users
                                            </Dropdown.Link>
                                        </>
                                    )}

                                    {/* Ini sudah menggunakan method="post" di Dropdown.Link (Inertia-aware) */}
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {sidebarOpen && (
                            <div className="flex-1 ms-3">
                                <div className="font-medium">{user?.name}</div>
                                <div className="text-xs text-gray-500">
                                    {user?.email}
                                </div>
                            </div>
                        )}

                        {sidebarOpen && (
                            <div className="ms-auto">
                                <svg
                                    className="h-4 w-4 text-gray-500"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* Jika sidebar dalam keadaan collapse, tampilkan logout icon kecil di bawah avatar */}
                    {!sidebarOpen && (
                        <div className="mt-3 flex justify-center">
                            <button
                                onClick={doLogout}
                                aria-label="Log Out"
                                className="inline-flex items-center justify-center rounded p-2 hover:bg-gray-100"
                            >
                                <HiOutlineLogout className="h-5 w-5 text-red-600" />
                            </button>
                        </div>
                    )}
                </div>
            </aside>

            {/* Toggle button placed BETWEEN sidebar and main content (left edge) */}
            <div className="hidden lg:flex items-start">
                <button
                    onClick={toggleSidebar}
                    aria-label={
                        sidebarOpen ? "Collapse sidebar" : "Expand sidebar"
                    }
                    className={`-ml-1 rounded-r-md bg-white border border-l-0 border-gray-200 shadow-sm hover:bg-gray-50 flex items-center justify-center transition-transform ${
                        sidebarOpen ? "h-10 w-6" : "h-10 w-6"
                    }`}
                >
                    {sidebarOpen ? (
                        <svg
                            className="h-4 w-4 text-gray-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="h-4 w-4 text-gray-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    )}
                </button>
            </div>

            {/* Main content area */}
            <div className="flex-1 flex flex-col">
                {/* Top bar for mobile (dan small screens) */}
                <header className="lg:hidden bg-white border-b">
                    <div className="flex items-center justify-between px-4 h-14">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setMobileOpen(true)}
                                className="p-2 rounded hover:bg-gray-100"
                                aria-label="Open menu"
                            >
                                {/* mobile hamburger */}
                                <svg
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        d="M4 6h16M4 12h16M4 18h16"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            <Link href="/" className="flex items-center gap-2">
                                <ApplicationLogo className="h-8 w-auto" />
                                <span className="text-sm font-semibold">
                                    My App
                                </span>
                            </Link>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex sm:items-center">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 hover:text-gray-700">
                                            {user?.name}
                                            <svg
                                                className="-me-0.5 ms-2 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        {isAdmin && (
                                            <>
                                                <Dropdown.Link
                                                    href={route("admin.index")}
                                                >
                                                    Admin Dashboard
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route("users.index")}
                                                >
                                                    Manage Users
                                                </Dropdown.Link>
                                            </>
                                        )}
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Optional header */}
                {header && (
                    <div className="bg-white border-b">
                        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </div>
                )}

                <main className="flex-1">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

/**
 * MenuIcon: helper kecil untuk render icon berdasarkan nama menu.
 * Menggunakan Heroicons (react-icons/hi) — modern & tersedia di Figma.
 */
function MenuIcon({ name }) {
    if (name === "Dashboard") {
        return <HiOutlineHome className="h-5 w-5 text-gray-600" />;
    }

    if (name === "Alternative") {
        return <HiOutlineDocumentText className="h-5 w-5 text-gray-600" />;
    }

    if (name === "Assessments") {
        return <HiOutlineClipboardList className="h-5 w-5 text-gray-600" />;
    }

    if (name === "Criteria") {
        return <HiOutlineAdjustments className="h-5 w-5 text-gray-600" />;
    }

    if (name === "User Management") {
        return <HiOutlineUsers className="h-5 w-5 text-gray-600" />;
    }

    if (name === "Admin") {
        return <HiOutlineShieldCheck className="h-5 w-5 text-gray-600" />;
    }
    if (name === "Results") {
        return <HiOutlineDocumentCheck className="h-5 w-5 text-gray-600" />;
    }
    if (name === "Reports") {
        return <HiOutlineNewspaper className="h-5 w-5 text-gray-600" />;
    }

    // fallback icon sederhana (kotak)
    return (
        <svg
            className="h-5 w-5 text-gray-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        </svg>
    );
}
