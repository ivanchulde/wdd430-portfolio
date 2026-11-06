"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  function createPageURL(pageNumber: number) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) {
    return null;
  }

  const previousPage = Math.max(currentPage - 1, 1);
  const nextPage = Math.min(currentPage + 1, totalPages);

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-3"
      aria-label="Pagination"
    >
      {currentPage > 1 ? (
        <Link
          href={createPageURL(previousPage)}
          className="rounded-full border border-border bg-surface px-5 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:border-primary/30 hover:bg-primary-light hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
        >
          Previous
        </Link>
      ) : (
        <span className="rounded-full border border-border px-5 py-2 text-sm font-medium text-muted/50">
          Previous
        </span>
      )}

      <span className="rounded-full bg-primary-light px-4 py-2 text-sm font-medium text-primary-dark">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={createPageURL(nextPage)}
          className="rounded-full border border-border bg-surface px-5 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:border-primary/30 hover:bg-primary-light hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
        >
          Next
        </Link>
      ) : (
        <span className="rounded-full border border-border px-5 py-2 text-sm font-medium text-muted/50">
          Next
        </span>
      )}
    </nav>
  );
}
