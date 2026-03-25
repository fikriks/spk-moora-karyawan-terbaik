import React from "react";

function OptimizationTable({ data }) {
    if (!data || Object.keys(data).length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Data Tidak Tersedia</p>
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden rounded-2xl border border-gray-100 shadow-sm max-w-lg mx-auto">
            <table className="w-full text-sm text-left">
                <thead>
                    <tr className="bg-gray-50/80 border-b border-gray-100">
                        <th className="px-8 py-4 font-bold text-gray-900 uppercase tracking-wider text-[11px] text-center border-r border-gray-100">
                            Alternatif
                        </th>
                        <th className="px-8 py-4 font-bold text-gray-900 uppercase tracking-wider text-[11px] text-center bg-emerald-50/30">
                            Nilai Optimasi (Yi)
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {Object.entries(data).map(([altId, value]) => (
                        <tr key={altId} className="hover:bg-emerald-50/30 transition-colors group">
                            <td className="px-8 py-4 text-center font-bold text-gray-500 border-r border-gray-100">
                                <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-lg text-[10px] group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                                    A{altId}
                                </span>
                            </td>
                            <td className="px-8 py-4 text-center font-bold text-emerald-600 font-mono">
                                {Number(value).toFixed(6)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OptimizationTable;
