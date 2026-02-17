function DenominatorTable({ data = {} }) {
    if (!data || Object.keys(data).length === 0) {
        return <p className="text-sm text-red-500">Data kosong</p>;
    }

    const criteriaIds = Object.keys(data);

    return (
        <div className="overflow-x-auto">
            <table className="w-full border text-sm">
                <thead>
                    <tr className="bg-gray-100">
                        {criteriaIds.map((cid) => (
                            <th key={cid} className="border p-2 text-center">
                                C{cid}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {criteriaIds.map((cid) => (
                            <td key={cid} className="border p-2 text-center">
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
