import Link from "next/link";
import SignInForm from "./SignInForm";

export const metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function SignInPage({ searchParams }) {
  const { next } = await searchParams;
  const nextValue = typeof next === "string" ? next : "/";
  const demo = process.env.DEMO_LOGIN === "true";

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <SignInForm next={nextValue} demo={demo} />
      <p className="mt-6">
        New here?{" "}
        <Link href={`/register?next=${encodeURIComponent(nextValue)}`} className="font-semibold text-paprika underline">
          Create an account
        </Link>
      </p>
    </main>
  );
}