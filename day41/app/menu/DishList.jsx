import Link from "next/link";
import { getDishes, categories, categorySlug } from "./dishes";
import AddToCartButton from "./AddToCartButton";

export default async function DishList() {
  const dishes = await getDishes();

  return (
    <div>
      {categories.map((category) => (
        <section
          key={category}
          id={categorySlug(category)}
          data-category={category}
          className="dish-section mt-6"
        >
          <h2 className="font-bold text-lg">{category}</h2>
          <ul className="mt-2 space-y-2">
            {dishes
              .filter((dish) => dish.category === category)
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