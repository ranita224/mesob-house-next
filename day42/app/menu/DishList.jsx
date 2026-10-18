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
          className="dish-section mt-8"
        >
          <h2 className="text-xl">{category}</h2>

          <ul className="mt-3 space-y-4">
            {dishes
              .filter((dish) => dish.category === category)
              .map((dish) => (
                <li
                  key={dish.id}
                  className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm"
                >
                  <div
                    aria-hidden="true"
                    className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-blush font-heading text-3xl text-maroon"
                  >
                    {dish.name.charAt(0)}
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex flex-wrap gap-2">
                      {dish.isSpecial && (
                        <span className="rounded-full bg-gold px-2 py-0.5 text-xs font-semibold text-ink">
                          Chef&apos;s Special
                        </span>
                      )}
                      {dish.isFasting && (
                        <span className="rounded-full bg-forest px-2 py-0.5 text-xs font-semibold text-white">
                          Tsom
                        </span>
                      )}
                    </div>

                    <h3 className="mt-1 text-lg leading-snug">
                      <Link href={`/menu/${dish.id}`}>{dish.name}</Link>
                    </h3>

                    <p className="mt-1 line-clamp-2 text-sm text-ink-soft">
                      {dish.description}
                    </p>

                    <p className="mt-1 text-xs text-ink-soft">{dish.spiceLevel}</p>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-bold text-paprika">
                        ETB {dish.price}
                      </span>
                      <AddToCartButton
                        dish={{ id: dish.id, name: dish.name, price: dish.price }}
                      />
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}