export default function Loading() {
  return (
    <main className="mx-auto max-w-4xl p-6" aria-busy="true" aria-label="Loading orders">
      <div className="h-9 w-48 animate-pulse rounded bg-slate-200" />
      <div className="mt-6 space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 animate-pulse rounded bg-slate-200" />
        ))}
      </div>
    </main>
  );
}
