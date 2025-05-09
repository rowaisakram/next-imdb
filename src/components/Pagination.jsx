"use client";

import { useRouter } from "next/navigation";

export default function Pagination({ currentPage }) {
  const router = useRouter();
  const page = parseInt(currentPage || "1");

  const goToPage = (pageNum) => {
    router.push(`/?page=${pageNum}`);
  };

  return (
    <div className="flex justify-center items-center gap-4 my-10">
      <button
        className={`px-4 py-2 rounded ${
          page === 1
            ? "bg-amber-100 text-gray-600 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400"
            : "bg-amber-300 text-black hover:bg-amber-400 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600"
        }`}
        disabled={page === 1}
        onClick={() => page > 1 && goToPage(page - 1)}
      >
        Previous
      </button>

      <span className="text-lg font-medium text-black dark:text-white">
        {page}
      </span>

      <button
        className="px-4 py-2 rounded bg-amber-300 text-black hover:bg-amber-400 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600"
        onClick={() => goToPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
