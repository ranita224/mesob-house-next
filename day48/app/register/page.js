import Link from "next/link";
import RegisterForm from "./RegisterForm";

export const metadata = {
    title: "Create an account",
    robots: { index: false, follow: false },
    };

export default async function RegisterPage({ searchParams }) {
  const { next } = await searchParams;
  const nextValue = typeof next === "string" ? next : "/";

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Create an account</h1>
      <RegisterForm next={nextValue} />
      <p className="mt-4">
        Already have an account?{" "}
        <Link href={`/signin?next=${encodeURIComponent(nextValue)}`} className="underline">
          Sign in
        </Link>
      </p>
    </main>
  );
}