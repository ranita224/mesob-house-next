import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { dishes, getDish } from "../dishes";
import AddToCartButton from "../AddToCartButton";
import { SITE_URL } from "../../../lib/site";

function shorten(text, max = 155) {
  return text.length > max ? text.slice(0, max - 1).trimEnd() + "…" : text;
}

export async function generateStaticParams() {
  return dishes.map((dish) => ({ id: dish.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) {
    return { title: "Dish not found", robots: { index: false } };
  }

  const description = shorten(
    `${dish.name} - ETB ${dish.price}. ${dish.description}`
  );

  return {
    title: dish.name,
    description,
    alternates: { canonical: `/menu/${dish.id}` },
    openGraph: {
      title: `${dish.name} | Mesob Eats`,
      description,
      url: `/menu/${dish.id}`,
      siteName: "Mesob Eats",
      type: "website",
      locale: "en_ET",
    },
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);
  if (!dish) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.description,
    url: `${SITE_URL}/menu/${dish.id}`,
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: "ETB",
    },
  };

  return (
    <main className="p-8 max-w-xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-blush shadow-sm mb-6">
        <Image
          src={`/images/dishes/${dish.id}.png`}
          alt={dish.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-cover"
        />
      </div>

      <h1 className="text-2xl font-bold">{dish.name}</h1>
      <p className="text-gray-600">{dish.nameAm}</p>
      <p className="mt-4 text-gray-700">{dish.description}</p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xl font-bold text-paprika">{dish.price} birr</span>
        <span className="text-sm bg-blush px-3 py-1 rounded-full text-ink-soft">
          Spice: {dish.spiceLevel}
        </span>
      </div>

      <p className="mt-2 text-sm text-gray-500">Servings: {dish.servings}</p>
      <p className="mt-1 text-sm font-medium">
        {dish.isFasting ? "🌱 Fasting (Tsom) friendly" : "🍖 Contains meat or dairy"}
      </p>

      <div className="mt-6 border-t pt-4">
        <h2 className="font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc ml-6 space-y-1 text-gray-600">
          {dish.ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <AddToCartButton
          dish={{ id: dish.id, name: dish.name, price: dish.price }}
        />
        <Link href="/menu" className="underline text-sm text-gray-600">
          Back to the menu
        </Link>
      </div>
    </main>
  );
}