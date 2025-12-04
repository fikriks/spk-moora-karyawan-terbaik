import { Link, usePage, router } from "@inertiajs/react";
import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { confirmDialog, notifySuccess } from "@/Utils/useSweetAlert";

function Index() {
    const { users, flash } = usePage().props;

    function handleDelete(id, name) {
        confirmDialog(`Hapus user "${name}"?`).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/admin/users/${id}`, {
                    onSuccess: () => notifySuccess("User deleted!"),
                });
            }
        });
    }

    return (
        <div className="p-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        User Management
                    </h1>
                    <p className="text-sm text-gray-500">
                        Kelola akun pengguna: lihat, tambah, edit, hapus
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/users/create"
                        className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none"
                    >
                        + Add User
                    </Link>
                </div>
            </div>

            {flash?.success && (
                <div className="mb-4 rounded-md bg-emerald-50 p-4 text-sm text-emerald-800">
                    {flash.success}
                </div>
            )}

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px] table-auto">
                        <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
                            <tr>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Role</th>
                                <th className="w-36 px-4 py-3 text-right">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                            {users.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="px-4 py-6 text-center text-gray-500"
                                    >
                                        Belum ada user.
                                    </td>
                                </tr>
                            )}

                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-700">
                                                {user.name
                                                    ?.charAt(0)
                                                    .toUpperCase() || "U"}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-800">
                                                    {user.name}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    ID: {user.id}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-4 py-4">
                                        <div className="text-sm text-gray-700">
                                            {user.email}
                                        </div>
                                    </td>

                                    <td className="px-4 py-4">
                                        <span
                                            className={
                                                user.role === "admin"
                                                    ? "inline-flex rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800"
                                                    : "inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700"
                                            }
                                        >
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="px-4 py-4 text-right">
                                        <div className="inline-flex items-center gap-2">
                                            <Link
                                                href={`/admin/users/${user.id}/edit`}
                                                className="inline-flex items-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        user.id,
                                                        user.name
                                                    )
                                                }
                                                className="inline-flex items-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none"
                                                type="button"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
                    <div className="text-sm text-gray-500">
                        Total: {users.length} user
                    </div>
                    <div className="text-sm text-gray-500">—</div>
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => (
    <AuthenticatedLayout
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                User Management
            </h2>
        }
    >
        {page}
    </AuthenticatedLayout>
);

export default Index;
