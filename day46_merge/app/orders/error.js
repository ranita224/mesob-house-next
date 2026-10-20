"use client";

export default function OrdersError({ error, reset }) {
  return (
    <main className="mx-auto max-w-4xl p-6" role="alert">
      <h1 className="text-2xl font-bold">Your orders could not load</h1>
      <p className="mt-2 text-gray-600">{error.message} Check your connection and try again.</p>
      <button onClick={() => reset()} className="mt-4 rounded-xl bg-paprika px-4 py-2 font-semibold text-white hover:bg-maroon">
        Try again
      </button>
    </main>
  );
}
