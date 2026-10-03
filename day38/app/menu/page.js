import { Suspense } from "react";
import Link from "next/link";
import DishList from "./DishList";
import FilterShell from "./FilterShell";
import MenuSkeleton from "./MenuSkeleton";

export default async function MenuPage({ searchParams }) {
  const { category } = await searchParams;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Our menu</h1>

      <FilterShell>
        <Suspense key={category ?? "all"} fallback={<MenuSkeleton />}>
          <DishList category={category} />
        </Suspense>
      </FilterShell>

      <div className="flex flex-col gap-2 mt-6">
        <Link href="/" className="underline">Home</Link>
        <Link href="/cart" className="underline">Cart</Link>
      </div>
    </main>
  );
}