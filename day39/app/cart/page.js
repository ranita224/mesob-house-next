import CartList from "./CartList";

export default function CartPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Your cart</h1>
      <CartList />
    </main>
  );
}