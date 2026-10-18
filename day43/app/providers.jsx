"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function Providers({ children }) {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const addToCart = (dish) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === dish.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === dish.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prevCart, { ...dish, quantity: 1 }];
    });
  };

  const clearCart = () => setCart([]);

  const addOrder = (newOrderItems) => {
    const total = newOrderItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: "Just now",
      status: "Preparing",
      total,
      items: newOrderItems,
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const cancelOrder = (orderId) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        items: cart,
        addToCart,
        addItem: addToCart,
        clearCart,
        orders,
        addOrder,
        cancelOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}