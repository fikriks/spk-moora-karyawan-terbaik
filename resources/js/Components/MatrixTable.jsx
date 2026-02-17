function MatrixTable({ data = {}, type = "default" }) {
    if (!data || Object.keys(data).length === 0) {
        return <p>Data kosong</p>;
    }

    const criteriaIds = Object.keys(Object.values(data)[0]);

    // formatter angka
    const formatNumber = (value) => {
        const num = Number(value);

        if (type === "decision") {
            // tanpa nol belakang koma
            return Number.isInteger(num) ? num : parseFloat(num);
        }

        if (type === "normalization") {
            // 4 desimal tanpa trailing zero
            return parseFloat(num.toFixed(4));
        }

        return parseFloat(num);
    };

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
