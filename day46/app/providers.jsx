"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const KEY = "mesob_cart";

function isValid(item) {
  return (
    item &&
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.price === "number" &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0
  );
}

export function Providers({ children }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]");
      if (Array.isArray(saved)) setItems(saved.filter(isValid));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, loaded]);

  const addItem = useCallback((dish) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === dish.id);
      if (existing) {
        return current.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...current,
        { id: dish.id, name: dish.name, price: dish.price, quantity: 1 },
      ];
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems((current) => (current.length ? [] : current));
  }, []);

  const value = useMemo(() => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { items, cart: items, total, addItem, addToCart: addItem, clearCart };
  }, [items, addItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}