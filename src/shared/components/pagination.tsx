"use client";

import { useRouter, useSearchParams } from "next/navigation";

const Pagination = ({
    currentPage,
    totalPages,
}: {
    currentPage: number;
    totalPages: number;
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const goToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set("page", page.toString());

        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            <button
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
            >
                Previous
            </button>

            {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;

                return (
                    <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={
                            page === currentPage
                                ? "bg-blue-500 text-white px-3 py-1 rounded"
                                : "px-3 py-1 border rounded"
                        }
                    >
                        {page}
                    </button>
                );
            })}

            <button
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;