"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Pagination({ totalPages, currentPage }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleClick(e) {
        const page = e.currentTarget.getAttribute("data-pagination-page");
        const pageNumber = parseInt(page, 10);
        const params = new URLSearchParams(searchParams);
        if (pageNumber) {
            params.set("page", pageNumber);
            if (pageNumber === 1) params.delete("page");
        } else {
            params.delete("page");
        }
        replace(`${pathname}?${params.toString()}`);
    }
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - 2 && i <= currentPage + 2)
        ) {
            pageNumbers.push(i);
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            pageNumbers.push("...");
        }
    }

    return (
        <nav className="flex items-center justify-center border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between md:hidden">
                {currentPage > 1 && (
                    <span
                        data-pagination-page={currentPage - 1}
                        onClick={handleClick}
                        className="relative inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        上一页
                    </span>
                )}
                {currentPage < totalPages && (
                    <span
                        data-pagination-page={currentPage + 1}
                        onClick={handleClick}
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        下一页
                    </span>
                )}
            </div>
            <ul className="isolate hidden md:inline-flex -space-x-px rounded-md shadow-sm">
                {currentPage > 1 && (
                    <li className="page-item">
                        <span
                            data-pagination-page={1}
                            onClick={handleClick}
                            className="relative inline-flex cursor-pointer items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">第一页</span>
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 40 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                    clipRule="evenodd"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M22.79 5.23a.75.75 0 01-.02 1.06L18.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                        <span
                            data-pagination-page={currentPage - 1}
                            onClick={handleClick}
                            className="relative inline-flex cursor-pointer items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Previous</span>
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </li>
                )}

                {pageNumbers.map((page, index) => (
                    <li key={index} className="page-item">
                        {page === "..." ? (
                            <span className="relative inline-flex cursor-pointer items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300  focus:outline-offset-0 hover:">
                                {page}
                            </span>
                        ) : (
                            <span
                                data-pagination-page={page}
                                onClick={handleClick}
                                className={`${currentPage === page ? "relative z-10 cursor-pointer inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" : "relative inline-flex cursor-pointer items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"} ${page === 1 && page == currentPage ? "rounded-l-md" : ""}  ${page === totalPages && page == currentPage ? "rounded-r-md" : ""}`}
                            >
                                {page}
                            </span>
                        )}
                    </li>
                ))}

                {currentPage < totalPages && (
                    <li className="page-item">
                        <span
                            data-pagination-page={currentPage + 1}
                            onClick={handleClick}
                            className="relative inline-flex cursor-pointer items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Next</span>
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                        <span
                            data-pagination-page={totalPages}
                            onClick={handleClick}
                            className="relative inline-flex cursor-pointer items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">最后一页</span>
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 30 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                    clipRule="evenodd"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M12.21 14.77a.75.75 0 01.02-1.06L16.168 10 12.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </li>
                )}
            </ul>
        </nav>
    );
}
