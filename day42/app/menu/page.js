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
    <main className="px-4 py-6">
      <h1 className="text-3xl">Our menu</h1>

      <SearchBox />

      <FilterShell categories={categories}>
        <Suspense fallback={<MenuSkeleton />}>
          <DishList />
        </Suspense>
      </FilterShell>

      <div className="mt-8 flex gap-4 text-sm text-ink-soft">
        <Link href="/dishes" className="underline">Browse all dishes by page</Link>
        <Link href="/cart" className="underline">Cart</Link>
      </div>
    </main>
  );
}