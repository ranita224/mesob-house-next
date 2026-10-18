"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
import DishRows from "./DishRows";

export default function PagedDishes({ initial }) {
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const { data, error } = useSWR(`/api/dishes?page=${page}`, fetcher, {
    fallbackData: page === 1 ? initial : undefined,
    keepPreviousData: true,
  });

  if (error) {
    return <p role="alert" className="mt-4 text-red-600">Could not load the dishes.</p>;
  }

  if (!data) {
    return <p className="mt-4 text-gray-600">Loading…</p>;
  }

  const stale = data.page !== page;

  return (
    <div>
      <div className={stale ? "opacity-50" : ""}>
        <DishRows items={data.items} />
      </div>

      <nav className="mt-6 flex items-center gap-4">
        {page > 1 ? (
          <Link href={`/dishes?page=${page - 1}`} className="underline">Previous</Link>
        ) : (
          <span className="text-gray-400">Previous</span>
        )}

        <span>Page {data.page} of {data.pageCount}</span>

        {data.page < data.pageCount ? (
          <Link href={`/dishes?page=${page + 1}`} className="underline">Next</Link>
        ) : (
          <span className="text-gray-400">Next</span>
        )}
      </nav>
    </div>
  );
}