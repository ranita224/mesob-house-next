import Link from "next/link";
import CartCount from "./CartCount";
<Link href="/orders" className="underline">Orders</Link>

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b">
      <Link href="/" className="text-xl font-bold">Mesob House</Link>
      <nav className="flex gap-4">
        <Link href="/menu" className="underline">Menu</Link>
        <Link href="/cart" className="underline">Cart <CartCount /></Link>
        <Link href="/checkout" className="underline">Checkout</Link>
      </nav>
    </header>
  );
}