import Link from "next/link";

export default function DishRows({ items }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((dish) => (
        <li key={dish.id}>
          <Link href={`/menu/${dish.id}`} className="underline">
            {dish.name}
          </Link>
          <span className="ml-2 text-gray-600">{dish.price} birr</span>
          <span className="ml-2 text-sm text-gray-500">{dish.category}</span>
        </li>
      ))}
    </ul>
  );
}