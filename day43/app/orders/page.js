"use client";

import Link from "next/link";
import { useCart } from "../providers";

export default function OrdersPage() {
  const { orders = [], cancelOrder } = useCart() || {};

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center">
          <p className="text-gray-600 mb-4">You have no active orders.</p>
          <Link
            href="/menu"
            className="inline-block rounded-full bg-paprika px-5 py-2 text-sm font-semibold text-white"
          >
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between gap-4 md:flex-row md:items-center"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-bold text-gray-900">{order.id}</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-amber-100 text-amber-700">
                    {order.status}
                  </span>
                </div>

                <ul className="text-sm text-gray-600 space-y-1 mb-2">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.quantity || 1}x {item.name} (ETB {item.price})
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-gray-400">Placed: {order.date}</p>
              </div>

              <div className="flex items-center justify-between gap-6 md:flex-col md:items-end">
                <span className="font-bold text-lg text-paprika">
                  ETB {order.total}
                </span>

                <button
                  onClick={() => cancelOrder(order.id)}
                  className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                >
                  Cancel Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}