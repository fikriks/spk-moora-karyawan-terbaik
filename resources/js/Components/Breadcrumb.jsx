import { Link } from "@inertiajs/react";
import { HiOutlineChevronRight, HiOutlineHome } from "react-icons/hi2";

export default function Breadcrumb({ items }) {
    if (!items || items.length === 0) return null;

    return (
        <nav className="flex mb-4 overflow-x-auto no-scrollbar" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 whitespace-nowrap">
                <li>
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="text-gray-400 hover:text-emerald-500 transition-colors duration-200"
                        >
                            <HiOutlineHome className="h-4 w-4 shrink-0" />
                            <span className="sr-only">Home</span>
                        </Link>
                    </div>
                </li>
                {items.map((item, index) => (
                    <li key={index}>
                        <div className="flex items-center">
                            <HiOutlineChevronRight className="h-3.5 w-3.5 text-gray-300 shrink-0 mx-1" />
                            {item.active ? (
                                <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="text-[11px] font-medium text-gray-400 hover:text-emerald-500 transition-colors duration-200 uppercase tracking-wider"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
