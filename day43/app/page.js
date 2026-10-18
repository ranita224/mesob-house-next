import Link from "next/link";
import Image from "next/image";
import { dishes } from "./menu/dishes";

export default function HomePage() {
  const specials = dishes.filter((dish) => dish.isSpecial);

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">Mesob House</h1>
      <p className="mt-2 text-gray-600">Ethiopian food, delivered.</p>

      <h2 className="mt-8 text-xl font-bold">Today's specials</h2>
      <ul className="mt-4 space-y-4">
        {specials.map((dish) => (
          <li key={dish.id} className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-blush">
              <Image
                src={`/images/dishes/${dish.id}.png`}
                alt={dish.name}
                width={96}
                height={96}
                className="object-cover h-full w-full"
              />
            </div>
            <div className="flex flex-col justify-center">
              <Link href={`/menu/${dish.id}`} className="font-semibold underline text-lg">
                {dish.name}
              </Link>
              <span className="text-paprika font-bold mt-1">{dish.price} birr</span>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{dish.description}</p>
            </div>
          </li>
        ))}
      </ul>

      <Link href="/menu" className="mt-8 inline-block underline font-medium">
        See the full menu →
      </Link>
    </main>
  );
}