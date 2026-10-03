import Link from "next/link";
import { notFound } from "next/navigation";
import { getDish } from "../dishes";

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = getDish(id);

  if (!dish) notFound();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">{dish.name}</h1>
      <p className="mt-2">{dish.description}</p>
      <p className="mt-2 font-semibold">{dish.price} birr</p>
      <Link href="/menu" className="underline block mt-4">Back to the menu</Link>
    </main>
  );
}