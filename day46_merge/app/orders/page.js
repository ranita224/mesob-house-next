import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "../../lib/session";
import { getOrdersPage } from "../../lib/orderData";
import OrderTable from "./OrderTable";
import Pager from "./Pager";

export const metadata = {
  title: "Your orders",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function OrdersPage({ searchParams }) {
  const user = await getSession();
  if (!user) redirect("/signin?next=/orders");

  const sp = await searchParams;
  const dir = sp.dir === "asc" ? "asc" : "desc";
  const page = Math.max(1, Number(sp.page) || 1);

  const { rows, total, pages, page: current, sort } = await getOrdersPage(user, {
    sort: sp.sort ?? "date",
    dir,
    page,
    demo: sp.demo,
  }); // throws -> error.js

  // EMPTY state: say why, and what to do next
  if (total === 0) {
    return (
      <main className="mx-auto max-w-4xl p-6">
        <h1 className="text-3xl font-bold">Your orders</h1>
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 text-center">
          <p className="mb-4 text-gray-600">You have no orders yet. Browse the menu to place your first.</p>
          <Link href="/menu" className="inline-block rounded-full bg-paprika px-5 py-2 text-sm font-semibold text-white">
            Browse the menu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-3xl font-bold">Your orders</h1>
        <Link href="/dashboard" className="text-sm font-semibold text-paprika underline">Dashboard</Link>
      </div>
      <div className="mt-6">
        <OrderTable orders={rows} sort={sort} dir={dir} />
        <Pager page={current} pages={pages} sort={sort} dir={dir} />
      </div>
    </main>
  );
}
