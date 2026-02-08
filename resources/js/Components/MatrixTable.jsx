function MatrixTable({ data }) {
    if (!Object.keys(data).length) return <p>Data kosong</p>;

    const criteriaIds = Object.keys(Object.values(data)[0]);

    return (
        <div className="overflow-x-auto">
            <table className="w-full border text-sm">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Alternatif</th>
                        {criteriaIds.map((cid) => (
                            <th key={cid} className="border p-2">
                                C{cid}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(data).map(([altId, values]) => (
                        <tr key={altId}>
                            <td className="border p-2 text-center">A{altId}</td>
                            {criteriaIds.map((cid) => (
                                <td
                                    key={cid}
                                    className="border p-2 text-center"
                                >
                                    {Number(values[cid]).toFixed(6)}
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
