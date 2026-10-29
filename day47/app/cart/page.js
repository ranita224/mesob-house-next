import CartLines from "./CartLines";

export const metadata = {
  title: "Your cart",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Your cart</h1>
      <CartLines />
    </main>
  );
}