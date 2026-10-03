"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CategoryLinks({ categories }) {
  const searchParams = useSearchParams();
  const active = searchParams.get("category");

  return (
    <ul className="mt-2 space-y-1">
      <li>
        <Link href="/menu" className={!active ? "font-bold underline" : "underline"}>
          All
        </Link>
      </li>
      {categories.map((category) => (
        <li key={category}>
          <Link
            href={`/menu?category=${encodeURIComponent(category)}`}
            className={active === category ? "font-bold underline" : "underline"}
          >
            {category}
          </Link>
        </li>
      ))}
    </ul>
  );
}