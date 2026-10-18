import Link from "next/link";
import { redirect } from "next/navigation";
import { getOrdersFor } from "../../lib/db";
import { getSession } from "../../lib/session";
import CancelButton from "./CancelButton";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=/orders");

  const orders = await getOrdersFor(user.id);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Orders</h1>

      {orders.length === 0 ? (
        <p className="mt-4">No orders yet.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {orders.map((order) => (
            <li key={order.id}>
              <Link href={`/orders/${order.id}`} className="font-semibold underline">
                {order.id}
              </Link>{" "}
              <span>{order.name}</span>{" "}
              <span className="text-gray-600">{order.status}</span>{" "}
              {order.status !== "CANCELLED" && <CancelButton orderId={order.id} />}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}