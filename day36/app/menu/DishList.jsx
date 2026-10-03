import Link from "next/link";

export default function DishList({ dishes }) {
  return (
    <ul className="mt-4 space-y-2">
      {dishes.map((dish) => (
        <li key={dish.id}>
          <Link href={`/menu/${dish.id}`} className="underline">
            {dish.name}
          </Link>
          <span className="ml-2 text-gray-600">{dish.price} birr</span>
        </li>
      ))}
    </ul>
  );
}