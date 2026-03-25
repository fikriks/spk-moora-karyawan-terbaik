import React from "react";

function DenominatorTable({ data = {} }) {
    if (!data || Object.keys(data).length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Data Tidak Tersedia</p>
            </div>
        );
    }

    const criteriaIds = Object.keys(data);

    return (
        <div className="relative overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm text-left">
                <thead>
                    <tr className="bg-gray-50/80 border-b border-gray-100">
                        {criteriaIds.map((cid) => (
                            <th key={cid} className="px-6 py-4 font-bold text-gray-900 uppercase tracking-wider text-[11px] text-center border-r border-gray-100 last:border-r-0">
                                C{cid}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    <tr className="bg-white hover:bg-emerald-50/30 transition-colors">
                        {criteriaIds.map((cid) => (
                            <td key={cid} className="px-6 py-4 text-center font-bold text-emerald-600 border-r border-gray-100 last:border-r-0 font-mono">
                                {Number(data[cid]).toFixed(6)}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default DenominatorTable;
