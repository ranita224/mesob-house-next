import Link from "next/link";
import { getDishes, categories } from "./dishes";
import AddToCartButton from "./AddToCartButton";

export default async function DishList({ category }) {
  const dishes = await getDishes();
  const visibleCategories = category
    ? categories.filter((c) => c === category)
    : categories;

  return (
    <div>
      {visibleCategories.map((cat) => (
        <section key={cat} className="mt-6">
          <h2 className="font-bold text-lg">{cat}</h2>
          <ul className="mt-2 space-y-2">
            {dishes
              .filter((dish) => dish.category === cat)
              .map((dish) => (
                <li key={dish.id}>
                  <Link href={`/menu/${dish.id}`} className="underline">
                    {dish.name}
                  </Link>
                  <span className="ml-2 text-gray-600">{dish.price} birr</span>
                  <AddToCartButton
                    dish={{ id: dish.id, name: dish.name, price: dish.price }}
                  />
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}