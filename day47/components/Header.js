import Link from "next/link";
import CartCount from "./CartCount";
import AuthNav from "./AuthNav";

const link = "inline-flex min-h-11 items-center hover:text-maroon";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-1 px-6 py-2">
        <Link href="/" className="inline-flex min-h-11 items-center font-heading text-2xl font-bold text-maroon">
          Mesob Eats
        </Link>

        <nav aria-label="Main" className="flex flex-wrap items-center gap-x-6 gap-y-1 font-medium text-gray-700">
          <Link href="/" className={link}>Home</Link>
          <Link href="/menu" className={link}>Menu</Link>
          <Link href="/cart" className={link}>
            Cart
            <CartCount />
          </Link>
          <Link href="/checkout" className={link}>Checkout</Link>
          <AuthNav />
        </nav>
      </div>
    </header>
  );
}