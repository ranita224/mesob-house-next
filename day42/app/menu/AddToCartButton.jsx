"use client";

import { useCart } from "../providers";

export default function AddToCartButton({ dish }) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() => addItem(dish)}
      className="rounded-xl bg-paprika px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-maroon"
    >
      + Quick Add
    </button>
  );
}