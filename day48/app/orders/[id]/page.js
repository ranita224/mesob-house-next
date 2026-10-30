import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrder } from "../../../lib/db";
import { getSession } from "../../../lib/session";
import { getStage } from "../../../lib/tracking";
import { etb, when } from "../../../lib/format";
import OrderStatus from "./OrderStatus";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Your order",
  robots: { index: false, follow: false },
};

export default async function OrderPage({ params }) {
  const { id } = await params;

  const user = await getSession();
  const order = await getOrder(id);

  if (!user || !order || order.userId !== user.id) notFound();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Order {order.id}</h1>
      <p className="mt-2">For {order.name}</p>
      <p className="text-sm text-gray-600">
        Placed <time dateTime={order.createdAt}>{when.format(new Date(order.createdAt))}</time> (Addis time)
        {typeof order.total === "number" && ` · ${etb.format(order.total)}`}
      </p>

      <OrderStatus id={order.id} initial={{ ...order, status: getStage(order) }} />

      <Link
        href={`/track/${order.id}`}
        className="mt-4 inline-block rounded-full bg-paprika px-5 py-2 text-sm font-semibold text-white hover:bg-maroon"
      >
        Track delivery live
      </Link>

      <div>
        <Link href="/orders" className="underline mt-6 inline-block">
          Back to orders
        </Link>
      </div>
    </main>
  );
}
