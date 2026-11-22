"use client";

import Link from "next/link";
import { useEffect } from "react";

type ProjectsErrorProps = {
  error: Error & { digest?: string };
  // Next.js 16 uses retry(); reset() is kept as a fallback for older APIs.
  retry: () => void;
  reset?: () => void;
};

export default function Error({
  error,
  retry,
  reset,
}: ProjectsErrorProps) {
  useEffect(() => {
    console.error("An uncaught error occurred:", error);
  }, [error]);

  function tryAgain() {
    if (typeof retry === "function") {
      retry();
    } else {
      reset?.();
    }
  }

  return (
    <main className="mx-auto mt-16 max-w-xl rounded-2xl border border-border bg-surface p-6 text-center shadow-sm sm:p-8">
      <h1 className="text-2xl font-bold text-foreground">
        Something went wrong!
      </h1>

      <p className="mt-3 text-muted">
        An unexpected error occurred. Please try again later.
      </p>

      {error.digest && (
        <p className="mt-2 text-xs text-muted">
          Reference: {error.digest}
        </p>
      )}

      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={tryAgain}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
        >
          Try Again
        </button>

        <Link
          href="/projects"
          className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-primary-light hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
        >
          Go Back to Projects
        </Link>
      </div>
    </main>
  );
}
