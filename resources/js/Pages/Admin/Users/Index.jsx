import React, { useEffect, useMemo, useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { notifySuccess } from "@/Utils/useToast";
import { confirmAction } from "@/Utils/useConfirm";
import { 
    HiOutlinePlus, 
    HiOutlineMagnifyingGlass, 
    HiOutlineXMark, 
    HiOutlinePencilSquare, 
    HiOutlineTrash,
    HiOutlineEnvelope,
    HiOutlineShieldCheck,
    HiOutlineUser
} from "react-icons/hi2";

function Index() {
    const { users, flash } = usePage().props;

    /* ===============================
     * SEARCH + DEBOUNCE
     * =============================== */
    const [query, setQuery] = useState(() => {
        try {
            const url = new URL(window.location.href);
            return url.searchParams.get("q") || "";
        } catch {
            return "";
        }
    });

    const [searching, setSearching] = useState(false);
    const DEBOUNCE_MS = 500;

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                window.location.pathname,
                {
                    q: query || undefined,
                    page: 1,
                },
                {
                    preserveState: true,
                    replace: true,
                    onStart: () => setSearching(true),
                    onFinish: () => setSearching(false),
                },
            );
        }, DEBOUNCE_MS);

        return () => clearTimeout(timeout);
    }, [query]);

    /* ===============================
     * DATA NORMALIZATION
     * =============================== */
    const items = useMemo(() => users?.data ?? [], [users]);
    const total = users?.total ?? items.length;

    /* ===============================
     * DELETE USER
     * =============================== */
    function handleDelete(id, name) {
        confirmAction(
            `Apakah Anda yakin ingin menghapus user "${name}"? Tindakan ini tidak dapat dibatalkan.`,
            () => {
                router.delete(`/admin/users/${id}`, {
                    preserveScroll: true,
                    onSuccess: () => notifySuccess("User berhasil dihapus"),
                });
            },
            {
                title: "Hapus Pengguna",
                confirmText: "Ya, Hapus",
                type: "danger"
            }
        );
    }

    return (
        <div className="space-y-6">
            {/* Header section with Actions */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                        User Management
                    </h2>
                    <p className="text-sm text-gray-500 max-w-md font-medium">
                        Kelola data pengguna sistem, perbarui profil, dan atur hak akses peran secara efisien.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                    {/* Search Input */}
                    <div className="relative w-full sm:w-72 group">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                            <HiOutlineMagnifyingGlass className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Cari nama atau email..."
                            className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-2xl text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none shadow-sm"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center">
                            {searching ? (
                                <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                            ) : query && (
                                <button 
                                    onClick={() => setQuery("")}
                                    className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <HiOutlineXMark className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    <Link
                        href="/admin/users/create"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all text-sm"
                    >
                        <HiOutlinePlus className="w-5 h-5" />
                        <span>Tambah User</span>
                    </Link>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-50 bg-gray-50/50">
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Informasi User</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Akses & Role</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Tindakan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {items.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400 space-y-2">
                                            <HiOutlineUser className="w-12 h-12 stroke-1" />
                                            <p className="text-sm font-medium">Tidak ada pengguna ditemukan</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                items.map((user) => (
                                    <tr key={user.id} className="group hover:bg-emerald-50/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{user.name}</span>
                                                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                                                        <HiOutlineEnvelope className="w-3.5 h-3.5" />
                                                        <span>{user.email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-semibold capitalize">
                                                    <HiOutlineShieldCheck className="w-3.5 h-3.5 text-gray-400" />
                                                    {user.roles}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="inline-flex items-center gap-2">
                                                <Link
                                                    href={`/admin/users/${user.id}/edit`}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 font-bold rounded-xl transition-all text-xs"
                                                >
                                                    <HiOutlinePencilSquare className="w-4 h-4" />
                                                    <span>Edit</span>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(user.id, user.name)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 font-bold rounded-xl transition-all text-xs"
                                                >
                                                    <HiOutlineTrash className="w-4 h-4" />
                                                    <span>Hapus</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer / Pagination */}
                <div className="px-6 py-4 border-t border-gray-50 bg-gray-50/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500 font-medium">
                        Menampilkan <span className="text-gray-900">{items.length}</span> dari <span className="text-gray-900">{total}</span> pengguna
                    </p>
                    
                    {users?.links && users.links.length > 3 && (
                        <div className="flex items-center gap-1.5">
                            {users.links.map((link, i) => {
                                if (link.url === null) {
                                    return (
                                        <span 
                                            key={i} 
                                            className="px-3 py-1.5 text-xs font-semibold text-gray-300 pointer-events-none"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                }
                                return (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                                            link.active 
                                                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20" 
                                                : "bg-white border border-gray-100 text-gray-500 hover:border-emerald-200 hover:text-emerald-500"
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => {
    const breadcrumbs = [
        { label: "Dashboard", href: route("admin.index") },
        { label: "User Management", active: true },
    ];

    return (
        <AuthenticatedLayout
            header="User Management"
            breadcrumbs={breadcrumbs}
        >
            {page}
        </AuthenticatedLayout>
    );
};

export default Index;
