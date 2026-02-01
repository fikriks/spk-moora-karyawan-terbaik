import React from "react";
import { useForm } from "@inertiajs/react";

/**
 * NilaiForm
 *
 * props:
 * - initial: object awal (untuk edit)
 * - alternatifs: array [{id, name}]
 * - kriterias: array [{id, name}]
 * - onSubmitRoute: route string
 * - method: 'post' | 'put' | 'patch' (default 'post')
 * - submitLabel: teks tombol submit (default: 'Simpan')
 */
export default function NilaiForm({
    initial = {},
    alternatifs = [],
    kriterias = [],
    onSubmitRoute,
    method = "post",
    submitLabel = "Simpan",
}) {
    const form = useForm({
        alternative_id: initial.alternative_id || "",
        criteria_id: initial.criteria_id || "",
        nilai: initial.nilai || "",
    });
    // console.log(nilai);
    const submit = (e) => {
        e.preventDefault();

        const options = {
            method,
        };

        if (method.toLowerCase() === "post") {
            form.post(onSubmitRoute, options);
        } else {
            form.put(onSubmitRoute, {
                ...options,
                data: form.data,
                _method: method,
            });
        }
    };

    return (
        <form onSubmit={submit} className="mx-auto max-w-2xl space-y-6">
            {/* Alternatif */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Alternatif <span className="text-red-500">*</span>
                </label>
                <select
                    value={form.data.alternative_id}
                    onChange={(e) =>
                        form.setData("alternative_id", e.target.value)
                    }
                    className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-1 focus:outline-none ${
                        form.errors.alternative_id
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-200 focus:ring-indigo-500"
                    }`}
                    required
                >
                    <option value="">-- Pilih Alternatif --</option>
                    {alternatifs.map((a) => (
                        <option key={a.id} value={a.id}>
                            {a.name}
                        </option>
                    ))}
                </select>
                {form.errors.alternative_id && (
                    <p className="mt-1 text-sm text-red-600">
                        {form.errors.alternative_id}
                    </p>
                )}
            </div>

            {/* Kriteria */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Kriteria <span className="text-red-500">*</span>
                </label>
                <select
                    value={form.data.criteria_id}
                    onChange={(e) =>
                        form.setData("criteria_id", e.target.value)
                    }
                    className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-1 focus:outline-none ${
                        form.errors.criteria_id
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-200 focus:ring-indigo-500"
                    }`}
                    required
                >
                    <option value="">-- Pilih Kriteria --</option>
                    {kriterias.map((k) => (
                        <option key={k.id} value={k.id}>
                            {k.name}
                        </option>
                    ))}
                </select>
                {form.errors.criteria_id && (
                    <p className="mt-1 text-sm text-red-600">
                        {form.errors.criteria_id}
                    </p>
                )}
            </div>

            {/* Nilai */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Nilai <span className="text-red-500">*</span>
                </label>
                <input
                    type="number"
                    step="any"
                    value={form.data.nilai}
                    onChange={(e) => form.setData("nilai", e.target.value)}
                    className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-1 focus:outline-none ${
                        form.errors.nilai
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-200 focus:ring-indigo-500"
                    }`}
                    placeholder="Masukkan nilai"
                    required
                />
                {form.errors.nilai && (
                    <p className="mt-1 text-sm text-red-600">
                        {form.errors.nilai}
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
