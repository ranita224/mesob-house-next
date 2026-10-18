import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "../../lib/session";
import CartLines from "../cart/CartLines";
import CheckoutForm from "./CheckoutForm";

export default async function CheckoutPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=/checkout");

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
    
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 border border-gray-100">
        <CartLines heading="Your order" />
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <CheckoutForm />
      </div>
    </main>
  );
}