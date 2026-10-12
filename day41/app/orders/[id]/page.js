import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrder, getSession } from "../../../lib/db";
import OrderStatus from "./OrderStatus";

export const dynamic = "force-dynamic";

export default async function OrderPage({ params }) {
  const { id } = await params;

  const user = await getSession();
  const order = await getOrder(id);

  if (!user || !order || order.userId !== user.id) notFound();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Order {order.id}</h1>
      <p className="mt-2">For {order.name}</p>

      <OrderStatus id={order.id} initial={order} />

      <Link href="/orders" className="underline mt-6 inline-block">
        Back to orders
      </Link>
    </main>
  );
}