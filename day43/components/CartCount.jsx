"use client";

import { useCart } from "../app/providers";

export default function CartCount() {
  const { items } = useCart();
  return <span>({items.length})</span>;
}