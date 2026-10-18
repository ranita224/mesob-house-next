"use client";

import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
import { useDebounce } from "../../lib/useDebounce";

export default function SearchBox() {
  const [term, setTerm] = useState("");
  const debounced = useDebounce(term.trim(), 300);

  const { data, error, isLoading } = useSWR(
    debounced ? `/api/dishes?q=${encodeURIComponent(debounced)}` : null,
    fetcher,
    { keepPreviousData: true }
  );

  return (
    <div className="mt-4 max-w-md">
      <label className="block font-semibold">Search the menu</label>
      <input
        type="search"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Try tibs, lentils, fish…"
        className="border rounded px-2 py-1 w-full"
      />

      {debounced && isLoading && <p className="mt-2 text-sm text-gray-600">Searching…</p>}
      {error && <p role="alert" className="mt-2 text-red-600">Search failed.</p>}

      {debounced && data && (
        <div className="mt-2">
          <p className="text-sm text-gray-600">
            {data.total} result{data.total === 1 ? "" : "s"} for "{debounced}"
          </p>
          <ul className="mt-1 space-y-1">
            {data.items.map((dish) => (
              <li key={dish.id}>
                <Link href={`/menu/${dish.id}`} className="underline">
                  {dish.name}
                </Link>
                <span className="ml-2 text-gray-600">{dish.price} birr</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}