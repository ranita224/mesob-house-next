"use client";

import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";

const DONE = ["CANCELLED", "DELIVERED"];

export default function OrderStatus({ id, initial }) {
  const { data, error } = useSWR(`/api/orders/${id}`, fetcher, {
    fallbackData: initial,
    refreshInterval: (latest) => (DONE.includes(latest?.status) ? 0 : 5000),
  });

  if (error) {
    return <p role="alert" className="mt-4 text-red-600">Could not load the order.</p>;
  }

  return (
    <div className="mt-4">
      <p className="font-semibold">Status: {data.status}</p>
      {!DONE.includes(data.status) && (
        <p className="text-sm text-gray-600">Checking for updates every 5 seconds.</p>
      )}
    </div>
  );
}
