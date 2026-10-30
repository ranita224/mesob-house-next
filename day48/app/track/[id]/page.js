import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getOrder } from "../../../lib/db";
import { getSession } from "../../../lib/session";
import { getTracking } from "../../../lib/tracking";
import TrackingView from "./TrackingView";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Track your delivery",
  robots: { index: false, follow: false },
};

export default async function TrackPage({ params }) {
  const { id } = await params;

  const user = await getSession();
  if (!user) redirect(`/signin?next=${encodeURIComponent(`/track/${id}`)}`);

  const order = await getOrder(id);
  if (!order || order.userId !== user.id) notFound();

  const initial = getTracking(order);

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold">Track order {order.id}</h1>
      <TrackingView
        id={order.id}
        initial={initial}
        address={order.address ?? "Address not provided"}
        total={typeof order.total === "number" ? order.total : null}
      />
      <Link href="/orders" className="mt-8 inline-block underline">Back to orders</Link>
    </main>
  );
}
