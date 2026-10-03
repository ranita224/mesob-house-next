import Link from "next/link";

export default function NotFound() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="mt-2">We couldn't find what you were looking for.</p>
      <Link href="/" className="underline block mt-4">Back to home</Link>
    </main>
  );
}