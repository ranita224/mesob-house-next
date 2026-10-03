"use client";

import { useCart } from "../CartContext";

export default function CartList() {
  const { items } = useCart();

  if (items.length === 0) {
    return <p className="mt-4">Your cart is empty.</p>;
  }

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="mt-4">
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index}>
            {item.name} <span className="text-gray-600">{item.price} birr</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-semibold">Total: {total} birr</p>
    </div>
  );
}