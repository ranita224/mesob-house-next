"use client";

import Link from "next/link";
import { useCart } from "../app/providers";
import { destroySession } from "../lib/session";

export default function Header({ user }) {
  const { cart = [] } = useCart() || {};

  const itemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold text-ink">
          Mesob House
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-paprika">
            Home
          </Link>
          <Link href="/menu" className="text-sm font-medium hover:text-paprika">
            Menu
          </Link>

          <Link href="/cart" className="relative text-sm font-medium hover:text-paprika flex items-center gap-1">
            <span>Cart</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-paprika text-xs font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>

          <Link href="/checkout" className="text-sm font-medium hover:text-paprika">
            Checkout
          </Link>

          <Link href="/orders" className="text-sm font-medium hover:text-paprika">
            Orders
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-paprika">
                Hi, {user.name || "Raniya"}
              </span>
              <form action={destroySession}>
                <button
                  type="submit"
                  className="text-xs font-medium text-gray-500 hover:text-red-600 underline"
                >
                  Sign Out
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/signin"
              className="rounded-full bg-paprika px-4 py-1.5 text-sm font-medium text-white hover:bg-paprika/90 transition-colors"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}