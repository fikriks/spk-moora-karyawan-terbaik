import React from "react";
import { useForm } from "@inertiajs/react";

/**
 * CriteriaForm
 *
 * props:
 * - initial: object awal (untuk edit)
 * - onSubmitRoute: route string (mis. route('criteria.store') atau '/criteria')
 * - method: 'post' | 'put' | 'patch' (default 'post')
 * - submitLabel: teks tombol submit (default: 'Simpan')
 */
export default function CriteriaForm({
    initial = {},
    onSubmitRoute,
    method = "post",
    submitLabel = "Simpan",
}) {
    const form = useForm({
        code: initial.code || "",
        name: initial.name || "",
        type: initial.type || "benefit",
        weight: initial.weight ?? 0,
        description: initial.description || "",
        order: initial.order ?? 0,
    });

    const submit = (e) => {
        e.preventDefault();

        const options = {
            method,
            onSuccess: () => {
                // optional: reset form if creating
            },
            onError: () => {
                // errors handled via form.errors automatically
            },
        };

        // use appropriate call depending on method
        if (method && method.toLowerCase() === "post") {
            form.post(onSubmitRoute, options);
        } else {
            // put/patch — send method override
            form.post(onSubmitRoute, {
                ...options,
                data: form.data,
                _method: method,
            });
        }
    };

    return (
        <form onSubmit={submit} className="mx-auto max-w-2xl space-y-6">
            {/* Kode */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Kode
                </label>
                <input
                    type="text"
                    value={form.data.code}
                    onChange={(e) => form.setData("code", e.target.value)}
                    className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-1 focus:outline-none ${
                        form.errors.code
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-200 focus:ring-indigo-500"
                    }`}
                    placeholder="Kode (opsional)"
                />
                {form.errors.code && (
                    <p className="mt-1 text-sm text-red-600">
                        {form.errors.code}
                    </p>
                )}
            </div>

            {/* Nama */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Nama <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={form.data.name}
                    onChange={(e) => form.setData("name", e.target.value)}
                    className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-1 focus:outline-none ${
                        form.errors.name
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-200 focus:ring-indigo-500"
                    }`}
                    placeholder="Masukkan nama kriteria"
                    required
                    autoFocus
                />
                {form.errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                        {form.errors.name}
                    </p>
                )}
            </div>

            {/* Tipe */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Tipe <span className="text-red-500">*</span>
                </label>
                <select
                    value={form.data.type}
                    onChange={(e) => form.setData("type", e.target.value)}
                    className={`mt-1 block w-48 rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-1 focus:outline-none ${
                        form.errors.type
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-200 focus:ring-indigo-500"
                    }`}
                >
                    <option value="benefit">
                        Benefit (semakin besar semakin baik)
                    </option>
                    <option value="cost">
                        Cost (semakin kecil semakin baik)
                    </option>
                </select>
                {form.errors.type && (
                    <p className="mt-1 text-sm text-red-600">
                        {form.errors.type}
                    </p>
                )}
            </div>

            {/* Bobot */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Bobot <span className="text-red-500">*</span>
                </label>
                <input
                    type="number"
                    step="0.0001"
                    value={form.data.weight}
                    onChange={(e) => form.setData("weight", e.target.value)}
                    className={`mt-1 block w-48 rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-1 focus:outline-none ${
                        form.errors.weight
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-200 focus:ring-indigo-500"
                    }`}
                    required
                />
                {form.errors.weight && (
                    <p className="mt-1 text-sm text-red-600">
                        {form.errors.weight}
                    </p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                    Masukkan bobot relatif (mis. <code>0.25</code>). Jika
                    menggunakan AHP, field ini bisa diisi otomatis.
                </p>
            </div>

            {/* Urutan */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Urutan tampil
                </label>
                <input
                    type="number"
                    value={form.data.order}
                    onChange={(e) => form.setData("order", e.target.value)}
                    className="mt-1 block w-32 rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-1 focus:outline-none border-gray-200 focus:ring-indigo-500"
                    placeholder="0"
                />
                {form.errors.order && (
                    <p className="mt-1 text-sm text-red-600">
                        {form.errors.order}
                    </p>
                )}
            </div>

            {/* Deskripsi */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Deskripsi
                </label>
                <textarea
                    value={form.data.description}
                    onChange={(e) =>
                        form.setData("description", e.target.value)
                    }
                    rows="4"
                    className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-1 focus:outline-none ${
                        form.errors.description
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-200 focus:ring-indigo-500"
                    }`}
                    placeholder="Deskripsi singkat (opsional)"
                />
                {form.errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                        {form.errors.description}
                    </p>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3">
                <button
                    type="submit"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60"
                    disabled={form.processing}
                >
                    {form.processing ? "Menyimpan..." : submitLabel}
                </button>
            </div>
        </form>
    );
}
