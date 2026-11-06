"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function ProjectSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    params.set("page", "1");

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="mb-10">
      <label
        htmlFor="project-search"
        className="mb-2 block text-sm font-semibold text-foreground"
      >
        Search projects
      </label>

      <div className="relative">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </span>

        <input
          id="project-search"
          type="search"
          placeholder="Search by title, description, or technology..."
          defaultValue={searchParams.get("query") ?? ""}
          onChange={(event) => handleSearch(event.target.value)}
          className="w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-4 text-foreground shadow-sm outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-4 focus:ring-primary/15"
        />
      </div>
    </div>
  );
}
