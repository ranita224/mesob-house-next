"use client";

import Link from "next/link";
import { useCart } from "../providers";

export default function CartLines({ heading }) {
  const { items = [], total = 0 } = useCart() || {};

  if (items.length === 0) {
    return (
      <div>
        {heading && <h2 className="font-heading text-xl">{heading}</h2>}
        <p className="mt-2 text-gray-600">Your cart is empty.</p>
        <Link href="/menu" className="mt-3 inline-block font-semibold text-paprika underline">
          Browse the menu
        </Link>
      </div>
    );
  }

  return (
    <div>
      {heading && <h2 className="font-heading text-xl">{heading}</h2>}

      <ul className="mt-3 divide-y divide-gray-100">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between py-3">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">
                {item.quantity} x ETB {item.price}
              </p>
            </div>
            <span className="font-bold text-paprika">
              ETB {(item.price * item.quantity).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-lg font-bold">
        <span>Total</span>
        <span className="text-paprika">ETB {total.toLocaleString()}</span>
      </p>
    </div>
  );
}