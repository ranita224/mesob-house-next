export default function Loading() {
  return (
    <main className="mx-auto max-w-4xl space-y-6 p-6" aria-busy="true" aria-label="Loading dashboard">
      <div className="h-9 w-48 animate-pulse rounded bg-slate-200" />
      <div className="h-72 animate-pulse rounded bg-slate-200" />
      <div className="h-72 animate-pulse rounded bg-slate-200" />
    </main>
  );
}
