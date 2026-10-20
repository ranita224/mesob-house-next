"use client";

import { useCart } from "../providers";

export default function AddToCartButton({ dish }) {
  const context = useCart() || {};
  const addFn = context.addItem || context.addToCart || (() => {});

  return (
    <button
      type="button"
      onClick={() => addFn(dish)}
      className="rounded-xl bg-paprika px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-maroon transition-colors"
    >
      + Quick Add
    </button>
  );
}