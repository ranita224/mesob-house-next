import { db, getSession } from "../../lib/db";
import CancelButton from "./CancelButton";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const user = await getSession();
  const orders = await db.order.findMany();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Orders</h1>

      {orders.length === 0 ? (
        <p className="mt-4">No orders yet.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {orders.map((order) => (
            <li key={order.id}>
              <span className="font-semibold">{order.id}</span>{" "}
              <span>{order.name}</span>{" "}
              <span className="text-gray-600">
                {order.status} ({order.userId === user.id ? "yours" : "someone else's"})
              </span>{" "}
              {order.status !== "CANCELLED" && <CancelButton orderId={order.id} />}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}