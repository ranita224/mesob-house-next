import Link from "next/link";
import Image from "next/image";
import { getDishes, categories, categorySlug } from "./dishes";
import AddToCartButton from "./AddToCartButton";

export default async function DishList() {
  const dishes = await getDishes();

  return (
    <div className="max-w-6xl mx-auto px-4">
      {categories.map((category) => (
        <section
          key={category}
          id={categorySlug(category)}
          data-category={category}
          className="dish-section mt-10"
        >
          <h2 className="text-2xl font-bold mb-4">{category}</h2>

          {/* 3 cards per row grid layout */}
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dishes
              .filter((dish) => dish.category === category)
              .map((dish, index) => (
                <li
                  key={dish.id}
                  className="flex flex-col justify-between rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    {/* Image at top of card */}
                    <div className="relative h-48 w-full overflow-hidden rounded-xl bg-blush mb-3">
                      <Image
                        src={`/images/dishes/${dish.id}.png`}
                        alt={dish.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index === 0 && category === categories[0]}
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2 mb-2">
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

                    <h3 className="text-lg font-semibold">
                      <Link href={`/menu/${dish.id}`} className="hover:underline">
                        {dish.name}
                      </Link>
                    </h3>

                    <p className="mt-1 line-clamp-2 text-sm text-ink-soft">
                      {dish.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t flex items-center justify-between">
                    <span className="font-bold text-paprika">
                      ETB {dish.price}
                    </span>
                    <AddToCartButton
                      dish={{ id: dish.id, name: dish.name, price: dish.price }}
                    />
                  </div>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}