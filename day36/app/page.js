import Link from "next/link";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Mesob House</h1>
      <p>Ethiopian food, delivered.</p>
      <div className="flex flex-col gap-2 mt-4">
        <Link href="/menu" className="underline">See the menu</Link>
        <Link href="/cart" className="underline">Cart</Link>
        <Link href="/checkout" className="underline">Checkout</Link>
      </div>
    </main>
  );
}