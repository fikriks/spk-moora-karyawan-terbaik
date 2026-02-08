function SectionProses({ title, children }) {
    return (
        <div className="bg-white shadow rounded p-5">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            {children}
        </div>
    );
}
export default SectionProses;
