"use client";

import { useCart } from "../CartContext";

export default function CheckoutSummary() {
  const { items } = useCart();

  if (items.length === 0) {
    return <p className="mt-4 text-gray-600">Your cart is empty.</p>;
  }

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="mt-4 max-w-md">
      <h2 className="font-bold">Your order</h2>
      <ul className="mt-2 space-y-1">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between">
            <span>{item.name}</span>
            <span className="text-gray-600">{item.price} birr</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 font-semibold">Total: {total} birr</p>
    </div>
  );
}
