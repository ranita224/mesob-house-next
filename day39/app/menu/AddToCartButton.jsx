"use client";

import { useCart } from "../CartContext";

export default function AddToCartButton({ dish }) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem(dish)}
      className="ml-3 border rounded px-2 py-0.5 text-sm"
    >
      Add
    </button>
  );
}