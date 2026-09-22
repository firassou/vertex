import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
};

function getPageList(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "ellipsis")[] = [1];
  if (current > 3) pages.push("ellipsis");
  for (
    let p = Math.max(2, current - 1);
    p <= Math.min(total - 1, current + 1);
    p++
  ) {
    pages.push(p);
  }
  if (current < total - 2) pages.push("ellipsis");
  pages.push(total);
  return pages;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = getPageList(currentPage, totalPages);

  return (
    <nav className="flex items-center gap-2">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange?.(currentPage - 1)}
        className="flex h-9 w-9 items-center justify-center rounded-sm border border-neutral-200 text-neutral-500 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} strokeWidth={2} />
      </button>
      {pages.map((page, index) =>
        page === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="px-1 text-body text-neutral-500"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange?.(page)}
            className={`flex h-9 w-9 items-center justify-center rounded-sm text-body ${
              page === currentPage
                ? "bg-primary-500 text-white"
                : "text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            {page}
          </button>
        ),
      )}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
        className="flex h-9 w-9 items-center justify-center rounded-sm border border-neutral-200 text-neutral-500 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Next page"
      >
        <ChevronRight size={16} strokeWidth={2} />
      </button>
    </nav>
  );
}
