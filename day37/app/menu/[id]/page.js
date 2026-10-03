import Link from "next/link";
import { notFound } from "next/navigation";
import { dishes, getDish } from "../dishes";

export async function generateStaticParams() {
  return dishes.map((dish) => ({ id: dish.id }));
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);    
  if (!dish) notFound();

  return (
    <div>
      <h2 className="text-xl font-bold">{dish.name}</h2>
      <p className="mt-2">{dish.description}</p>
      <p className="mt-2 font-semibold">{dish.price} birr</p>
      <Link href="/menu" className="underline mt-6 inline-block">
        Back to the menu
      </Link>
    </div>
  );
}