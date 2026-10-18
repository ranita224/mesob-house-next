"use client";

import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";

export default function OrderStatus({ id, initial }) {
  const { data, error } = useSWR(`/api/orders/${id}`, fetcher, {
    fallbackData: initial,
    refreshInterval: (latest) => (latest?.status === "CANCELLED" ? 0 : 5000),
  });

  if (error) {
    return <p role="alert" className="mt-4 text-red-600">Could not load the order.</p>;
  }

  return (
    <div className="mt-4">
      <p className="font-semibold">Status: {data.status}</p>
      {data.status !== "CANCELLED" && (
        <p className="text-sm text-gray-600">Checking for updates every 5 seconds.</p>
      )}
    </div>
  );
}