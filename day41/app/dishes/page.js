import { Suspense } from "react";
import Link from "next/link";
import { dishes, paginate } from "../menu/dishes";
import DishRows from "./DishRows";
import PagedDishes from "./PagedDishes";

export default function DishesPage() {
  const initial = paginate(dishes, 1);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">All dishes</h1>

      <Suspense fallback={<DishRows items={initial.items} />}>
        <PagedDishes initial={initial} />
      </Suspense>

      <Link href="/menu" className="underline mt-6 inline-block">
        Back to the menu
      </Link>
    </main>
  );
}