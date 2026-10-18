import { redirect } from "next/navigation";
import { getSession } from "../../lib/session";
import CartLines from "../cart/CartLines";
import CheckoutForm from "./CheckoutForm";

export default async function CheckoutPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=/checkout");

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <CartLines heading="Your order" />
      <CheckoutForm />
    </main>
  );
}