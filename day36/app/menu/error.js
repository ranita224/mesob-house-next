"use client";

export default function MenuError({ error, reset }) {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 border rounded px-4 py-2"
      >
        Try again
      </button>
    </main>
  );
}