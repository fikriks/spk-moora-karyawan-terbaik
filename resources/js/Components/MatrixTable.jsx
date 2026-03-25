import React from "react";

function MatrixTable({ data = {}, type = "default" }) {
    if (!data || Object.keys(data).length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Data Tidak Tersedia</p>
            </div>
        );
    }

    const firstRow = Object.values(data)[0];
    const criteriaIds = Object.keys(firstRow);

    // formatter angka
    const formatNumber = (value) => {
        const num = Number(value);
        if (type === "decision") {
            return Number.isInteger(num) ? num : parseFloat(num);
        }
        if (type === "normalization") {
            return parseFloat(num.toFixed(4));
        }
        return parseFloat(num);
    };

    return (
        <div className="relative overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm text-left">
                <thead>
                    <tr className="bg-gray-50/80 border-b border-gray-100">
                        <th className="px-6 py-4 font-bold text-gray-900 uppercase tracking-wider text-[11px] bg-gray-50/50 sticky left-0 z-10 border-r border-gray-100">
                            Alternatif
                        </th>
                        {criteriaIds.map((cid) => (
                            <th key={cid} className="px-6 py-4 font-bold text-gray-900 uppercase tracking-wider text-[11px] text-center border-r border-gray-100 last:border-r-0">
                                C{cid}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {Object.entries(data).map(([altId, values]) => (
                        <tr key={altId} className="hover:bg-emerald-50/30 transition-colors group">
                            <td className="px-6 py-4 font-bold text-gray-600 bg-white group-hover:bg-emerald-50/30 transition-colors sticky left-0 z-10 border-r border-gray-100 text-center">
                                <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-lg text-[10px] group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                                    A{altId}
                                </span>
                            </td>
                            {criteriaIds.map((cid) => (
                                <td key={cid} className="px-6 py-4 text-center font-medium text-gray-600 border-r border-gray-100 last:border-r-0">
                                    {formatNumber(values[cid])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MatrixTable;
