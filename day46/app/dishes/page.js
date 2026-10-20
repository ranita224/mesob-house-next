import { Suspense } from "react";
import Link from "next/link";
import { dishes, paginate } from "../menu/dishes";
import DishRows from "./DishRows";
import PagedDishes from "./PagedDishes";

export const metadata = {
  title: "All dishes",
  description: "Every dish on the Mesob Eats menu, six to a page.",
  alternates: { canonical: "/dishes" },
  openGraph: {
    title: "All dishes | Mesob Eats",
    description: "Every dish on the Mesob Eats menu, six to a page.",
    url: "/dishes",
    siteName: "Mesob Eats",
    type: "website",
    locale: "en_ET",
  },
};

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