export default function Loading() {
  return (
    <main className="mx-auto max-w-5xl p-6" aria-busy="true" aria-label="Loading tracking">
      <div className="h-9 w-64 animate-pulse rounded bg-slate-200" />
      <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div className="h-80 animate-pulse rounded-2xl bg-slate-200" />
        <div className="h-80 animate-pulse rounded-2xl bg-slate-200" />
      </div>
    </main>
  );
}
