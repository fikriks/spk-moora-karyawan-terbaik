import React from "react";
import { HiOutlineTrophy, HiOutlineCheckBadge, HiOutlineStar } from "react-icons/hi2";

function RankingTable({ data = [] }) {
    if (!Array.isArray(data) || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Data Ranking Tidak Tersedia</p>
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm text-left">
                <thead>
                    <tr className="bg-gray-50/80 border-b border-gray-100">
                        <th className="px-6 py-4 font-bold text-gray-900 uppercase tracking-wider text-[11px] text-center w-24">
                            Rank
                        </th>
                        <th className="px-6 py-4 font-bold text-gray-900 uppercase tracking-wider text-[11px]">
                            Informasi Personil
                        </th>
                        <th className="px-6 py-4 font-bold text-gray-900 uppercase tracking-wider text-[11px] text-center w-40 bg-emerald-50/30">
                            Nilai Optimasi (Yi)
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {data.map((row, index) => {
                        const score = row.score ?? row.nilai_yi ?? 0;
                        const isTopThree = row.rank <= 3;
                        const rankColor = 
                            row.rank === 1 ? "bg-amber-100 text-amber-700 ring-amber-200" :
                            row.rank === 2 ? "bg-slate-100 text-slate-700 ring-slate-200" :
                            row.rank === 3 ? "bg-orange-100 text-orange-700 ring-orange-200" :
                            "bg-gray-100 text-gray-500 ring-gray-100";

                        return (
                            <tr 
                                key={index} 
                                className={`group hover:bg-emerald-50/30 transition-colors ${row.rank === 1 ? "bg-emerald-50/20" : ""}`}
                            >
                                {/* Ranking */}
                                <td className="px-6 py-5 text-center">
                                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl font-black text-sm ring-2 ${rankColor}`}>
                                        {row.rank === 1 ? <HiOutlineTrophy className="w-5 h-5" /> : row.rank}
                                    </div>
                                </td>

                                {/* Alternatif */}
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${isTopThree ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-400"}`}>
                                            {(row.alternative_name ?? "A").charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <span className={`font-bold uppercase tracking-tight transition-colors ${row.rank === 1 ? "text-emerald-700 text-base" : "text-gray-900 text-sm group-hover:text-emerald-600"}`}>
                                                    {row.alternative_name ?? "-"}
                                                </span>
                                                {row.rank === 1 && <HiOutlineCheckBadge className="w-5 h-5 text-emerald-500" />}
                                                {isTopThree && row.rank > 1 && <HiOutlineStar className="w-4 h-4 text-emerald-400" />}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                                                <span>A{row.alternative_id}</span>
                                                <span className="text-gray-200">•</span>
                                                <span>Alternatif Ke-{row.alternative_id}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                {/* Nilai Yi */}
                                <td className={`px-6 py-5 text-center font-black font-mono tracking-tighter ${row.rank === 1 ? "text-emerald-600 text-lg bg-emerald-50/20" : "text-gray-600 text-sm bg-gray-50/30"}`}>
                                    {Number(score).toFixed(6)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default RankingTable;
