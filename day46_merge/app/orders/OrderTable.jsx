import Link from "next/link";
import { etb } from "../../lib/format";
import CancelButton from "./CancelButton";

const COLUMNS = [
  { key: "id", label: "Order" },
  { key: "date", label: "Date" },
  { key: "area", label: "Neighbourhood" },
  { key: "status", label: "Status" },
  { key: "total", label: "Total", numeric: true },
];

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Addis_Ababa" });

// Server component: real table markup, sort driven by the URL.
export default function OrderTable({ orders, sort, dir }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white" role="region" aria-label="Your orders (scrolls sideways on small screens)" tabIndex={0}>
      <table className="w-full min-w-[640px] text-sm">
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
                  <Link href={`/orders?sort=${c.key}&dir=${nextDir}`} className="underline">
                    {c.label}{active ? (dir === "asc" ? " ▲" : " ▼") : ""}
                  </Link>
                </th>
              );
            })}
            <th scope="col" className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-b border-gray-100">
              <td className="px-4 py-3">
                <Link href={`/orders/${o.id}`} className="font-semibold underline">{o.id}</Link>
              </td>
              <td className="px-4 py-3">{fmtDate(o.createdAt)}</td>
              <td className="px-4 py-3">{o.area}</td>
              <td className="px-4 py-3">{o.status}</td>
              <td className="px-4 py-3 text-right tabular-nums">
                {typeof o.total === "number" ? etb(o.total) : "—"}
              </td>
              <td className="px-4 py-3">
                <CancelButton orderId={o.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
