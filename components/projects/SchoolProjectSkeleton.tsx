export default function SchoolProjectSkeleton() {
  return (
    <section className="animate-pulse" aria-hidden="true">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
          >
            <div className="mb-4 h-5 w-2/3 rounded bg-background" />
            <div className="mb-2 h-3 w-full rounded bg-background" />
            <div className="mb-6 h-3 w-4/5 rounded bg-background" />
            <div className="flex gap-2">
              <div className="h-6 w-16 rounded-full bg-background" />
              <div className="h-6 w-20 rounded-full bg-background" />
              <div className="h-6 w-14 rounded-full bg-background" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
