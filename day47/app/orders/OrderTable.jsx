import Link from "next/link";
import { etb, when } from "../../lib/format";
import { canCancel } from "../../lib/tracking";
import CancelButton from "./CancelButton";

const COLUMNS = [
  { key: "id", label: "Order" },
  { key: "date", label: "Placed (Addis time)" },
  { key: "area", label: "Neighbourhood" },
  { key: "status", label: "Status" },
  { key: "total", label: "Total", numeric: true },
];

export default function OrderTable({ orders, sort, dir }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white" role="region" aria-label="Your orders (scrolls sideways on small screens)" tabIndex={0}>
      <table className="w-full min-w-[720px] text-sm">
        <caption className="p-4 text-left font-semibold">
          Your orders, sorted by {sort} ({dir === "asc" ? "lowest first" : "highest first"})
        </caption>
        <thead>
          <tr className="border-y bg-blush/50">
            {COLUMNS.map((c) => {
              const active = sort === c.key;
              const nextDir = active && dir === "desc" ? "asc" : "desc";
              return (
                <th
                  key={c.key}
                  scope="col"
                  aria-sort={active ? (dir === "asc" ? "ascending" : "descending") : "none"}
                  className={`px-4 py-3 ${c.numeric ? "text-right" : "text-left"}`}
                >
                  <Link href={`/orders?sort=${c.key}&dir=${nextDir}`} className="inline-flex min-h-11 items-center underline">
                    {c.label}{active ? (dir === "asc" ? " ▲" : " ▼") : ""}
                  </Link>
                </th>
              );
            })}
            <th scope="col" className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-b border-gray-100">
              <td className="px-4 py-3">
                <Link href={`/orders/${o.id}`} className="inline-flex min-h-11 items-center font-semibold underline">
                  {o.id}
                </Link>
              </td>
              <td className="px-4 py-3">
                <time dateTime={o.createdAt}>{when.format(new Date(o.createdAt))}</time>
              </td>
              <td className="px-4 py-3">{o.area}</td>
              <td className="px-4 py-3">{o.statusLabel}</td>
              <td className="px-4 py-3 text-right tabular-nums">
                {typeof o.total === "number" ? etb.format(o.total) : "—"}
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap items-center gap-3">
                  <Link href={`/track/${o.id}`} className="inline-flex min-h-11 min-w-11 items-center font-semibold text-paprika underline">
                    Track
                  </Link>
                  {canCancel(o) && <CancelButton orderId={o.id} />}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
