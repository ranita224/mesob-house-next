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
    <div className="p-8">
      <h2 className="text-xl font-bold">{dish.name}</h2>
      <p className="text-gray-600">{dish.nameAm}</p>
      <p className="mt-2">{dish.description}</p>
      <p className="mt-2 font-semibold">{dish.price} birr</p>
      <p className="mt-2">Spice: {dish.spiceLevel}</p>
      <p className="mt-1">{dish.servings}</p>
      <p className="mt-1">
        {dish.isFasting ? "Fasting (Tsom) friendly" : "Contains meat or dairy"}
      </p>
      <p className="mt-2 font-semibold">Ingredients</p>
      <ul className="list-disc ml-6">
        {dish.ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <Link href="/menu" className="underline mt-6 inline-block">
        Back to the menu
      </Link>
    </div>
  );
}