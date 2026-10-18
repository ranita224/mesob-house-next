import { notFound, redirect } from "next/navigation";
import { getAllOrders } from "../../lib/db";
import { getSession } from "../../lib/session";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Kitchen",
  robots: { index: false, follow: false },
};

export default async function KitchenPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=/kitchen");
  if (user.role !== "staff") notFound();

  const orders = await getAllOrders();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Kitchen</h1>

      {orders.length === 0 ? (
        <p className="mt-4">No orders.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {orders.map((order) => (
            <li key={order.id}>
              <span className="font-semibold">{order.id}</span> {order.name}{" "}
              {order.phone} <span className="text-gray-600">{order.status}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}