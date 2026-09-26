export default function Loading() {
  return (
    <main className="container mx-auto animate-pulse px-6 py-12">
      <div className="mb-4 h-10 w-72 rounded bg-slate-200" />

      <div className="mb-8 space-y-2">
        <div className="h-4 w-full max-w-2xl rounded bg-slate-200" />
        <div className="h-4 w-5/6 max-w-xl rounded bg-slate-200" />
      </div>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="h-48 rounded-xl bg-slate-200" />
        <div className="h-48 rounded-xl bg-slate-200" />
        <div className="h-48 rounded-xl bg-slate-200" />
        <div className="h-48 rounded-xl bg-slate-200" />
        <div className="h-48 rounded-xl bg-slate-200" />
        <div className="h-48 rounded-xl bg-slate-200" />
      </section>
    </main>
  );
}