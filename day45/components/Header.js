import Link from "next/link";
import CartCount from "./CartCount";
import AuthNav from "./AuthNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-6 py-4">
        <Link href="/" className="font-heading text-2xl font-bold text-maroon">
          Mesob Eats
        </Link>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 font-medium text-gray-700">
          <Link href="/" className="hover:text-maroon">Home</Link>
          <Link href="/menu" className="hover:text-maroon">Menu</Link>
          <Link href="/cart" className="hover:text-maroon">
            Cart
            <CartCount />
          </Link>
          <Link href="/checkout" className="hover:text-maroon">Checkout</Link>
          <AuthNav />
        </nav>
      </div>
    </header>
  );
}