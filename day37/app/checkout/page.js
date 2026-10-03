import { cookies } from "next/headers";

export default async function CheckoutPage() {
  const session = (await cookies()).get("session");

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p className="mt-2">{session ? "Signed in" : "No session yet"}</p>
    </main>
  );
}