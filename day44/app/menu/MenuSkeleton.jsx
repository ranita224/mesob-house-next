export default function MenuSkeleton() {
  return (
    <main className="p-8">
      <div className="h-8 w-40 bg-gray-300 rounded animate-pulse" />
      <div className="mt-4 space-y-3">
        <div className="h-5 w-64 bg-gray-300 rounded animate-pulse" />
        <div className="h-5 w-56 bg-gray-300 rounded animate-pulse" />
        <div className="h-5 w-60 bg-gray-300 rounded animate-pulse" />
      </div>
    </main>
  );
}