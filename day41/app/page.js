import Link from "next/link";
import { dishes } from "./menu/dishes";

export default function HomePage() {
  const specials = dishes.filter((dish) => dish.isSpecial);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Mesob House</h1>
      <p className="mt-2">Ethiopian food, delivered.</p>

      <h2 className="mt-8 text-xl font-bold">Today's specials</h2>
      <ul className="mt-4 space-y-4">
        {specials.map((dish) => (
          <li key={dish.id}>
            <Link href={`/menu/${dish.id}`} className="font-semibold underline">
              {dish.name}
            </Link>
            <span className="ml-2 text-gray-600">{dish.price} birr</span>
            <p className="text-sm">{dish.description}</p>
          </li>
        ))}
      </ul>

      <Link href="/menu" className="mt-8 inline-block underline">
        See the full menu
      </Link>
    </main>
  );
}