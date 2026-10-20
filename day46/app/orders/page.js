import Link from "next/link";
import { redirect } from "next/navigation";
import { getOrdersFor } from "../../lib/db";
import { getSession } from "../../lib/session";
import CancelButton from "./CancelButton";

export const metadata = {
  title: "Your orders",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=/orders");

  const orders = (await getOrdersFor(user.id))
  .filter((order) => order.status !== "CANCELLED")
  .reverse();

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-bold">Your orders</h1>

      {orders.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 text-center">
          <p className="mb-4 text-gray-600">You have no orders yet.</p>
          <Link
            href="/menu"
            className="inline-block rounded-full bg-paprika px-5 py-2 text-sm font-semibold text-white"
          >
            Browse the menu
          </Link>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="flex flex-col justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:flex-row md:items-center"
            >
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <Link href={`/orders/${order.id}`} className="font-bold underline">
                    {order.id}
                  </Link>
                  <span
                    className={
                      order.status === "CANCELLED"
                        ? "rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600"
                        : "rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700"
                    }
                  >
                    {order.status}
                  </span>
                </div>

                {order.items?.length > 0 && (
                  <ul className="mb-2 space-y-1 text-sm text-gray-600">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.quantity}x {item.name} (ETB {item.price})
                      </li>
                    ))}
                  </ul>
                )}

                {order.address && <p className="text-sm text-gray-600">Deliver to: {order.address}</p>}
              </div>

              <div className="flex items-center justify-between gap-6 md:flex-col md:items-end">
                {typeof order.total === "number" && (
                  <span className="text-lg font-bold text-paprika">
                    ETB {order.total.toLocaleString()}
                  </span>
                )}
                {order.status !== "CANCELLED" && <CancelButton orderId={order.id} />}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}