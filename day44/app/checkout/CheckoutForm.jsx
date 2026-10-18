"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { placeOrder } from "../actions";
import { useCart } from "../providers";

export default function CheckoutForm({ defaultName = "" }) {
  const [state, formAction, pending] = useActionState(placeOrder, null);
  const { items = [], clearCart } = useCart() || {};

  useEffect(() => {
    if (state?.order && clearCart) clearCart();
  }, [state?.order, clearCart]);

  if (state?.order) {
    return (
      <div>
        <h2 className="font-heading text-xl">Order placed</h2>
        <p className="mt-2 font-semibold">{state.order.id}</p>
        <p>Total: ETB {state.order.total.toLocaleString()}</p>
        <p className="text-gray-600">Status: {state.order.status}</p>
        <div className="mt-4 flex gap-4">
          <Link href={`/orders/${state.order.id}`} className="font-semibold text-paprika underline">
            Track this order
          </Link>
          <Link href="/orders" className="underline">All orders</Link>
        </div>
      </div>
    );
  }

  const errors = state?.fieldErrors ?? {};
  const values = state?.values ?? {};
  const lines = items.map(({ id, quantity }) => ({ id, quantity }));
  const input =
    "w-full rounded-lg border border-gray-300 p-3 focus:border-paprika focus:outline-none";

  return (
    <form action={formAction} className="space-y-4">
      <h2 className="font-heading text-xl">Delivery information</h2>
      <input type="hidden" name="items" value={JSON.stringify(lines)} />

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">Full name</label>
        <input id="name" name="name" defaultValue={values.name ?? defaultName} className={input} />
        {errors.name && <p role="alert" className="mt-1 text-sm text-red-600">{errors.name[0]}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium">Phone number</label>
        <input id="phone" name="phone" defaultValue={values.phone} placeholder="0911…" className={input} />
        {errors.phone && <p role="alert" className="mt-1 text-sm text-red-600">{errors.phone[0]}</p>}
      </div>

      <div>
        <label htmlFor="address" className="mb-1 block text-sm font-medium">
          Street address / neighborhood
        </label>
        <input id="address" name="address" defaultValue={values.address} placeholder="e.g. Bole, Kazanchis" className={input} />
        {errors.address && <p role="alert" className="mt-1 text-sm text-red-600">{errors.address[0]}</p>}
      </div>

      <div>
        <label htmlFor="notes" className="mb-1 block text-sm font-medium">Notes (optional)</label>
        <textarea id="notes" name="notes" defaultValue={values.notes} className={input} />
        {errors.notes && <p role="alert" className="mt-1 text-sm text-red-600">{errors.notes[0]}</p>}
      </div>

      <div className="flex items-center justify-between rounded-lg border bg-amber-50/50 p-4">
        <span className="font-medium">TeleBirr / Mobile Money</span>
        <span className="text-sm font-semibold text-green-700">Active</span>
      </div>

      {state?.error && !state.fieldErrors && (
        <p role="alert" className="text-red-600">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending || items.length === 0}
        className="w-full rounded-xl bg-paprika py-3 font-semibold text-white shadow-sm hover:bg-maroon disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Placing order…" : "Place order"}
      </button>
    </form>
  );
}