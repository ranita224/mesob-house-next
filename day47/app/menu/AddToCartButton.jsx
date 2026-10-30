"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "../providers";

export default function AddToCartButton({ dish }) {
  const context = useCart() || {};
  const addFn = context.addItem || context.addToCart || (() => {});
  const [added, setAdded] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  function handleClick() {
    addFn(dish);
    setAdded(true); // feedback in the same tick, well inside 100ms
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1500);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label={`Add ${dish.name} to cart`}
        className="min-h-11 min-w-11 rounded-xl bg-paprika px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-maroon active:scale-95"
      >
        {added ? "Added ✓" : "+ Quick Add"}
      </button>
      <span role="status" className="sr-only">
        {added ? `${dish.name} added to cart` : ""}
      </span>
    </>
  );
}