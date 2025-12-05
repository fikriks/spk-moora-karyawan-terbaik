// resources/js/Components/Pagination.jsx
import React from "react";
import { Link, router, usePage } from "@inertiajs/react";

/**
 * Pagination component (JSX) untuk Inertia + React + Tailwind
 * Props:
 * - links: Laravel paginator links array (preferred)
 * - meta: optional meta { current_page, last_page }
 * - perPageOptions: array of numbers for per-page selector (default [5,10,25,50])
 */
export default function Pagination({
    links,
    meta,
    perPageOptions = [5, 10, 25, 50],
}) {
    const { props } = usePage();
    const currentFilters = props.filters || {};
    const currentPerPage = Number(
        currentFilters.per_page ||
            new URLSearchParams(window.location.search).get("per_page") ||
            perPageOptions[1]
    );

    // If Laravel provided `links` (contains url, label, active) — prefer this
    if (links && Array.isArray(links)) {
        return (
            <div className="flex items-center justify-between mt-4">
                <nav
                    className="flex items-center space-x-4"
                    aria-label="Pagination"
                >
                    <ul className="inline-flex -space-x-px">
                        {links.map((link, idx) => {
                            const isActive = !!link.active;
                            const isDisabled = !link.url;
                            const label = stripHtml(link.label);

                            const base =
                                "relative inline-flex items-center px-3 py-1.5 border text-sm font-medium focus:z-20 focus:outline-none";
                            const activeCls =
                                "z-10 bg-indigo-600 text-white border-indigo-600";
                            const normalCls =
                                "bg-white text-gray-700 border-gray-200 hover:bg-gray-50";
                            const disabledCls =
                                "opacity-50 cursor-not-allowed pointer-events-none text-gray-400";

                            if (isDisabled) {
                                return (
                                    <li key={idx}>
                                        <span
                                            className={`${base} ${
                                                isActive ? activeCls : normalCls
                                            } ${isDisabled ? disabledCls : ""}`}
                                            aria-current={
                                                isActive ? "page" : undefined
                                            }
                                        >
                                            {label}
                                        </span>
                                    </li>
                                );
                            }

                            // Use Inertia Link with preserveState so SPA stays snappy and filters kept
                            return (
                                <li key={idx}>
                                    <Link
                                        href={link.url}
                                        preserveState
                                        className={`${base} ${
                                            isActive ? activeCls : normalCls
                                        }`}
                                        aria-current={
                                            isActive ? "page" : undefined
                                        }
                                    >
                                        {label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Per-page selector */}
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Tampilkan</span>
                    <select
                        value={String(currentPerPage)}
                        onChange={(e) =>
                            handlePerPageChange(Number(e.target.value))
                        }
                        className="input text-sm"
                        aria-label="Pilih jumlah per halaman"
                    >
                        {perPageOptions.map((p) => (
                            <option key={p} value={p}>
                                {p}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        );
    }

    // Fallback: if meta provided (current_page, last_page), render simple pager
    if (meta && meta.current_page) {
        const current = Number(meta.current_page);
        const last = Number(meta.last_page || current);
        const prevDisabled = current <= 1;
        const nextDisabled = current >= last;

        return (
            <div className="flex items-center justify-between mt-4">
                <nav
                    className="flex items-center space-x-2"
                    aria-label="Pagination"
                >
                    <Link
                        href={buildPageUrl(current - 1)}
                        preserveState
                        className={`btn btn-sm ${
                            prevDisabled ? "opacity-50 pointer-events-none" : ""
                        }`}
                    >
                        Prev
                    </Link>
                    <span className="text-sm text-gray-700">
                        Halaman <strong>{current}</strong> dari{" "}
                        <strong>{last}</strong>
                    </span>
                    <Link
                        href={buildPageUrl(current + 1)}
                        preserveState
                        className={`btn btn-sm ${
                            nextDisabled ? "opacity-50 pointer-events-none" : ""
                        }`}
                    >
                        Next
                    </Link>
                </nav>

                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Tampilkan</span>
                    <select
                        value={String(currentPerPage)}
                        onChange={(e) =>
                            handlePerPageChange(Number(e.target.value))
                        }
                        className="input text-sm"
                    >
                        {perPageOptions.map((p) => (
                            <option key={p} value={p}>
                                {p}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        );
    }

    return null;

    // ----- helper fns -----
    function stripHtml(html) {
        const tmp = document.createElement("div");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

    function buildPageUrl(page) {
        const url = new URL(window.location.href);
        if (!page || page <= 1) {
            url.searchParams.delete("page");
        } else {
            url.searchParams.set("page", String(page));
        }
        return url.pathname + url.search;
    }

    function handlePerPageChange(perPageValue) {
        // read current query params, merge with per_page and reset page=1
        const url = new URL(window.location.href);
        // preserve existing query filters (q, other), but set per_page and page=1
        const params = Object.fromEntries(url.searchParams.entries());
        params.per_page = String(perPageValue);
        params.page = "1";

        // Use Inertia router to update querystring (GET) keeping SPA behaviour
        // { replace: true } so browser history is tidy when switching per_page
        router.get(url.pathname, params, {
            preserveState: true,
            replace: true,
        });
    }
}
