"use client";

import { useCart } from "../app/providers";

export default function CartCount() {
  const { items = [] } = useCart() || {};
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  if (count === 0) return null;

  return (
    <span className="ml-1 rounded-full bg-paprika px-2 py-0.5 text-xs font-semibold text-white">
      {count}
    </span>
  );
}