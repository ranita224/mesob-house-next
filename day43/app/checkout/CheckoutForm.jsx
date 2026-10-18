"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../providers";

export default function CheckoutForm() {
  const router = useRouter();
  const context = useCart() || {};
  const cart = context.cart || [];
  const clearCart = context.clearCart || (() => {});
  const addOrder = context.addOrder || (() => {});

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) return;

    addOrder(cart);
    clearCart();
    router.push("/orders");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Delivery Address
        </label>
        <input
          type="text"
          required
          placeholder="Enter delivery address"
          className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-paprika"
        />
      </div>

      <button
        type="submit"
        disabled={cart.length === 0}
        className="w-full mt-4 rounded-xl bg-paprika p-3 font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50 hover:bg-paprika/90"
      >
        Place Order
      </button>
    </form>
  );
}