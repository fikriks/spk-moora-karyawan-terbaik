function RankingTable({ data = [] }) {
    if (!Array.isArray(data)) {
        return <div className="text-sm text-red-500">Data ranking Kosong</div>;
    }

    return (
        <table className="w-full border text-sm">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border p-2">Rank</th>
                    <th className="border p-2">Alternatif</th>
                    <th className="border p-2">Skor</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr
                        key={index}
                        className={
                            row.rank === 1 ? "bg-green-50 font-semibold" : ""
                        }
                    >
                        <td className="border p-2 text-center">{row.rank}</td>
                        <td className="border p-2 text-center">
                            <td className="border p-2">
                                <div className="font-medium text-gray-800">
                                    {row.alternative_name}
                                </div>
                                <div className="text-xs text-gray-500">
                                    A{row.alternative_id}
                                </div>
                            </td>
                        </td>
                        <td className="border p-2 text-center">
                            {Number(row.score).toFixed(4)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default RankingTable;
