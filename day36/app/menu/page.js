import Link from "next/link";
import { dishes, categories } from "./dishes";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

export default async function MenuPage() {
  
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Our menu</h1>
      <CategoryBar categories={categories} />
      <DishList dishes={dishes} />
      <div className="flex flex-col gap-2 mt-6">
        <Link href="/" className="underline">Home</Link>
        <Link href="/cart" className="underline">Cart</Link>
      </div>
    </main>
  );
}