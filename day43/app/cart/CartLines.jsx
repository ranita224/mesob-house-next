"use client";

import { useCart } from "../providers";

export default function CartLines() {
  const context = useCart() || {};
  const items = context.items || context.cart || [];

  if (items.length === 0) {
    return <p className="text-gray-600">Your cart is empty.</p>;
  }

  return (
    <ul className="divide-y divide-gray-100">
      {items.map((item) => (
        <li key={item.id} className="py-3 flex justify-between items-center">
          <div>
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-gray-500">
              {item.quantity || 1} x ETB {item.price}
            </p>
          </div>
          <span className="font-bold text-paprika">
            ETB {(item.price * (item.quantity || 1)).toLocaleString()}
          </span>
        </li>
      ))}
    </ul>
  );
}