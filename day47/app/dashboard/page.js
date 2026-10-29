import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "../../lib/session";
import { getDashboard } from "../../lib/orderData";
import { etb } from "../../lib/format";
import RevenueChart from "./RevenueChart";
import OrdersChart from "./OrdersChart";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dashboard", robots: { index: false, follow: false } };

export default async function DashboardPage({ searchParams }) {
  const user = await getSession();
  if (!user) redirect("/signin?next=/dashboard");

  const { demo } = await searchParams;
  const { count, byArea, byDay, range } = await getDashboard(user, { demo }); // throws -> error.js

  // EMPTY state
  if (count === 0) {
    return (
      <main className="mx-auto max-w-4xl p-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-8 text-center">
          <p className="font-semibold">No orders in the last 14 days</p>
          <p className="mt-1 text-gray-600">Charts appear once an order is placed.</p>
          <Link href="/menu" className="mt-4 inline-block rounded-full bg-paprika px-5 py-2 text-sm font-semibold text-white">
            Browse the menu to place your first order
          </Link>
        </div>
      </main>
    );
  }

  const th = "py-2 font-semibold";
  return (
    <main className="mx-auto max-w-4xl space-y-12 p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <section aria-labelledby="rev">
        <h2 id="rev" className="mb-3 text-xl">Revenue by neighbourhood, {range} (ETB)</h2>
        <RevenueChart data={byArea} />
        <table className="mt-4 w-full text-sm">
          <caption className="sr-only">Revenue by neighbourhood in ETB, {range}</caption>
          <thead>
            <tr className="border-b">
              <th scope="col" className={`${th} text-left`}>Neighbourhood</th>
              <th scope="col" className={`${th} text-right`}>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {byArea.map((r) => (
              <tr key={r.area} className="border-b border-gray-100">
                <td className="py-2">{r.area}</td>
                <td className="py-2 text-right tabular-nums">{etb.format(r.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section aria-labelledby="ord">
        <h2 id="ord" className="mb-3 text-xl">Orders per day, {range} (number of orders)</h2>
        <OrdersChart data={byDay} />
        <table className="mt-4 w-full text-sm">
          <caption className="sr-only">Orders per day, {range}</caption>
          <thead>
            <tr className="border-b">
              <th scope="col" className={`${th} text-left`}>Day</th>
              <th scope="col" className={`${th} text-right`}>Orders</th>
            </tr>
          </thead>
          <tbody>
            {byDay.map((r) => (
              <tr key={r.day} className="border-b border-gray-100">
                <td className="py-2">{r.day}</td>
                <td className="py-2 text-right tabular-nums">{r.orders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <Link href="/orders" className="font-semibold text-paprika underline">View all orders</Link>
    </main>
  );
}
