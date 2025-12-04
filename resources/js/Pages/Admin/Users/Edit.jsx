import React from "react";
import { useForm, usePage, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Edit({ user }) {
    const { flash } = usePage().props;
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "user",
        password: "",
    });

    function submit(e) {
        e.preventDefault();
        put(`/admin/users/${user.id}`);
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Edit User
                    </h1>
                    <p className="text-sm text-gray-500">
                        Perbarui informasi akun pengguna.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/users"
                        className="inline-flex items-center rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                        ← Back to Users
                    </Link>
                </div>
            </div>

            {/* Flash */}
            {flash?.success && (
                <div className="mb-4 rounded-md bg-emerald-50 p-4 text-sm text-emerald-800">
                    {flash.success}
                </div>
            )}

            <form
                onSubmit={submit}
                className="mx-auto max-w-2xl space-y-6 rounded-lg bg-white p-6 shadow-sm"
            >
                {/* Name */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-1 focus:outline-none ${
                            errors.name
                                ? "border-red-300 focus:ring-red-500"
                                : "border-gray-200 focus:ring-indigo-500"
                        }`}
                        placeholder="Full name"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-1 focus:outline-none ${
                            errors.email
                                ? "border-red-300 focus:ring-red-500"
                                : "border-gray-200 focus:ring-indigo-500"
                        }`}
                        placeholder="user@example.com"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Role */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Role
                    </label>
                    <select
                        value={data.role}
                        onChange={(e) => setData("role", e.target.value)}
                        className={`mt-1 block w-48 rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-1 focus:outline-none ${
                            errors.role
                                ? "border-red-300 focus:ring-red-500"
                                : "border-gray-200 focus:ring-indigo-500"
                        }`}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    {errors.role && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.role}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Password (optional)
                    </label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-1 focus:outline-none ${
                            errors.password
                                ? "border-red-300 focus:ring-red-500"
                                : "border-gray-200 focus:ring-indigo-500"
                        }`}
                        placeholder="Leave blank to keep current password"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        Isi hanya jika ingin mengganti password pengguna.
                    </p>
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4">
                    <Link
                        href="/admin/users"
                        className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60"
                    >
                        {processing ? "Saving..." : "Update User"}
                    </button>
                </div>
            </form>
        </div>
    );
}

// Attach layout + header
Edit.layout = (page) => (
    <AuthenticatedLayout
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Edit User
            </h2>
        }
    >
        {page}
    </AuthenticatedLayout>
);
