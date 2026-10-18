import Link from "next/link";
import SignInForm from "./SignInForm";

export default async function SignInPage({ searchParams }) {
  const { next } = await searchParams;
  const nextValue = typeof next === "string" ? next : "/";

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Sign in</h1>
      <SignInForm next={nextValue} />
      <p className="mt-4">
        New here?{" "}
        <Link href={`/register?next=${encodeURIComponent(nextValue)}`} className="underline">
          Create an account
        </Link>
      </p>
    </main>
  );
}