"use client";

import { useCart } from "../app/CartContext";

export default function CartCount() {
  const { items } = useCart();
  return <span>({items.length})</span>;
}