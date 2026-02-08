function OptimizationTable({ data }) {
    return (
        <table className="w-full border text-sm">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border p-2">Alternatif</th>
                    <th className="border p-2">Nilai Yi</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(data).map(([altId, value]) => (
                    <tr key={altId}>
                        <td className="border p-2 text-center">A{altId}</td>
                        <td className="border p-2 text-center">
                            {Number(value).toFixed(6)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
export default OptimizationTable;
