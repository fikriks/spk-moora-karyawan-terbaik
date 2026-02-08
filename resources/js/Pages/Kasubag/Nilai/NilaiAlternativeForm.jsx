import React, { useEffect, useMemo } from "react";
import { useForm } from "@inertiajs/react";

/**
 * NilaiForm
 *
 * props:
 * - initial: object awal (untuk edit)
 * - alternatifs: array [{id, name}]
 * - kriterias: array [{id, name}]
 * - role: string (contoh: 'operator', 'admin')
 * - onSubmitRoute: route string
 * - method: 'post' | 'put' | 'patch'
 * - submitLabel: teks tombol submit
 */
export default function NilaiForm({
    initial = {},
    alternatifs = [],
    kriterias = [],
    role,
    onSubmitRoute,
    method = "post",
    submitLabel = "Simpan",
}) {
    /**
     * =========================
     * FORM STATE
     * =========================
     * NOTE:
     * - Pakai String untuk ID → aman untuk <select>
     */
    const form = useForm({
        alternative_id: initial.alternative_id
            ? String(initial.alternative_id)
            : "",
        criteria_id: initial.criteria_id ? String(initial.criteria_id) : "",
        nilai: initial.nilai ?? "",
    });

    /**
     * =========================
     * RULE KETERBATASAN KRITERIA
     * =========================
     */
    const restrictedCriteriaNames = ["Tanggung Jawab", "Kerja Sama Tim"];

    /**
     * =========================
     * FILTER KRITERIA BERDASARKAN ROLE
     * =========================
     * useMemo → stabil, tidak re-render berlebihan
     */
    const filteredKriterias = useMemo(() => {
        if (role === "operator") {
            return kriterias.filter(
                (k) => !restrictedCriteriaNames.includes(k.name),
            );
        }

        // role selain operator (admin, dll)
        return kriterias.filter((k) =>
            restrictedCriteriaNames.includes(k.name),
        );
    }, [role, kriterias]);

    /**
     * =========================
     * VALIDASI criteria_id SAAT EDIT / ROLE BERUBAH
     * =========================
     * - Jangan reset sembarangan
     * - Hanya reset jika benar-benar tidak valid
     */
    useEffect(() => {
        if (!form.data.criteria_id) return;

        const isValid = filteredKriterias.some(
            (k) => String(k.id) === String(form.data.criteria_id),
        );

        if (!isValid) {
            form.setData("criteria_id", "");
        }
    }, [filteredKriterias]);

    /**
     * =========================
     * SUBMIT HANDLER
     * =========================
     */
    const submit = (e) => {
        e.preventDefault();

        if (method.toLowerCase() === "post") {
            form.post(onSubmitRoute);
        } else {
            form.put(onSubmitRoute, {
                preserveScroll: true,
            });
        }
    };

    return (
        <form onSubmit={submit} className="mx-auto max-w-2xl space-y-6">
            {/* =========================
                ALTERNATIF
            ========================= */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Alternatif <span className="text-red-500">*</span>
                </label>

                <select
                    value={form.data.alternative_id}
                    onChange={(e) =>
                        form.setData("alternative_id", e.target.value)
                    }
                    className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 ${
                        form.errors.alternative_id
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-300 focus:ring-indigo-500"
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

            {/* =========================
                KRITERIA
            ========================= */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Kriteria <span className="text-red-500">*</span>
                </label>

                <select
                    value={form.data.criteria_id}
                    onChange={(e) =>
                        form.setData("criteria_id", e.target.value)
                    }
                    className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 ${
                        form.errors.criteria_id
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-300 focus:ring-indigo-500"
                    }`}
                    required
                >
                    <option value="">-- Pilih Kriteria --</option>
                    {filteredKriterias.map((k) => (
                        <option key={k.id} value={k.id}>
                            {k.name}
                        </option>
                    ))}
                </select>

                {filteredKriterias.length === 0 && (
                    <p className="mt-1 text-sm text-yellow-600">
                        Tidak ada kriteria yang dapat dipilih untuk role ini.
                    </p>
                )}

                {form.errors.criteria_id && (
                    <p className="mt-1 text-sm text-red-600">
                        {form.errors.criteria_id}
                    </p>
                )}
            </div>

            {/* =========================
                NILAI
            ========================= */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Nilai <span className="text-red-500">*</span>
                </label>

                <input
                    type="number"
                    step="any"
                    value={form.data.nilai}
                    onChange={(e) => form.setData("nilai", e.target.value)}
                    className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 ${
                        form.errors.nilai
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-300 focus:ring-indigo-500"
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

            {/* =========================
                ACTIONS
            ========================= */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={form.processing}
                    className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 disabled:opacity-60"
                >
                    {form.processing ? "Menyimpan..." : submitLabel}
                </button>
            </div>
        </form>
    );
}
