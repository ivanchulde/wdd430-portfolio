import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto mt-16 max-w-xl rounded-2xl border border-border bg-surface p-6 text-center shadow-sm sm:p-8">
      <h1 className="text-2xl font-bold text-foreground">
        Project Not Found
      </h1>

      <p className="mt-3 text-muted">
        The project you are looking for does not exist.
      </p>

      <div className="mt-6 flex justify-center">
        <Link
          href="/projects"
          className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-primary-light hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
        >
          Back to Projects
        </Link>
      </div>
    </main>
  );
}
