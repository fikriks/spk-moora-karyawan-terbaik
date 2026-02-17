function RankingTable({ data = [] }) {
    if (!Array.isArray(data) || data.length === 0) {
        return <div className="text-sm text-red-500">Data ranking kosong</div>;
    }

    return (
        <table className="w-full border text-sm">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border p-2 text-center">Rank</th>
                    <th className="border p-2 text-center">Alternatif</th>
                    <th className="border p-2 text-center">Nilai Yi</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => {
                    const score = row.score ?? row.nilai_yi ?? 0;

                    return (
                        <tr
                            key={index}
                            className={
                                row.rank === 1
                                    ? "bg-green-50 font-semibold"
                                    : ""
                            }
                        >
                            {/* Ranking */}
                            <td className="border p-2 text-center">
                                {row.rank}
                            </td>

                            {/* Alternatif */}
                            <td className="border p-2 text-left">
                                <div className="font-medium text-gray-800">
                                    {row.alternative_name ?? "-"}
                                </div>

                                <div className="text-xs text-gray-500">
                                    Alternatif ke-{row.alternative_id} (A
                                    {row.alternative_id})
                                </div>
                            </td>

                            {/* Nilai Yi */}
                            <td className="border p-2 text-center">
                                {Number(score).toFixed(4)}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default RankingTable;
