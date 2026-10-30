import { redirect } from "next/navigation";
import { getSession } from "../../lib/session";
import CartLines from "../cart/CartLines";
import CheckoutForm from "./CheckoutForm";

export const metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export default async function CheckoutPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=/checkout");

  const orderKey = crypto.randomUUID();

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold">Checkout</h1>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <CartLines heading="Your order" />
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <CheckoutForm defaultName={user.name} orderKey={orderKey} />
        </section>
      </div>
    </main>
  );
}