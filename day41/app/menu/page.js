import { Suspense } from "react";
import Link from "next/link";
import { categories } from "./dishes";
import DishList from "./DishList";
import FilterShell from "./FilterShell";
import MenuSkeleton from "./MenuSkeleton";
import SearchBox from "./SearchBox";

export const revalidate = 3600;

export default function MenuPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Our menu</h1>

      <SearchBox />

      <FilterShell categories={categories}>
        <Suspense fallback={<MenuSkeleton />}>
          <DishList />
        </Suspense>
      </FilterShell>

      <div className="flex flex-col gap-2 mt-6">
        <Link href="/" className="underline">Home</Link>
        <Link href="/cart" className="underline">Cart</Link>
        <Link href="/dishes" className="underline">Browse all dishes by page</Link>
      </div>
    </main>
  );
}