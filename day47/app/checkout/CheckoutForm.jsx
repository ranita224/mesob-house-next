"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { placeOrder } from "../actions";
import { useCart } from "../providers";
import { etb } from "../../lib/format";

const inputClass =
  "min-h-11 w-full rounded-lg border border-gray-300 p-3 focus:border-paprika";

function Field({ id, label, error, as: Tag = "input", ...props }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">{label}</label>
      <Tag
        id={id}
        name={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

export default function CheckoutForm({ defaultName = "", orderKey }) {
  const [state, formAction, pending] = useActionState(placeOrder, null);
  const { items = [], clearCart } = useCart() || {};

  useEffect(() => {
    if (state?.order && clearCart) clearCart();
  }, [state?.order, clearCart]);

  // Move focus to the first field with an error
  useEffect(() => {
    const fields = state?.fieldErrors ?? {};
    const first = ["name", "phone", "address", "notes"].find((f) => fields[f]);
    if (first) document.getElementById(first)?.focus();
  }, [state]);

  if (state?.order) {
    return (
      <div>
        <h2 className="font-heading text-xl">Order placed</h2>
        <p className="mt-2 font-semibold">{state.order.id}</p>
        <p>Total: {etb.format(state.order.total)}</p>
        <p className="text-gray-600">Status: {state.order.status}</p>
        <div className="mt-4 flex flex-wrap gap-x-6">
          <Link href={`/track/${state.order.id}`} className="inline-flex min-h-11 items-center font-semibold text-paprika underline">
            Track this order
          </Link>
          <Link href="/orders" className="inline-flex min-h-11 items-center underline">All orders</Link>
        </div>
      </div>
    );
  }

  const errors = state?.fieldErrors ?? {};
  const values = state?.values ?? {};
  const lines = items.map(({ id, quantity }) => ({ id, quantity }));

  return (
    <form action={formAction} className="space-y-4">
      <h2 className="font-heading text-xl">Delivery information</h2>
      <input type="hidden" name="items" value={JSON.stringify(lines)} />
      <input type="hidden" name="orderKey" value={orderKey} />

      <Field id="name" label="Full name" autoComplete="name"
        defaultValue={values.name ?? defaultName} error={errors.name?.[0]} />

      <Field id="phone" label="Phone number" type="tel" autoComplete="tel"
        placeholder="0911…" defaultValue={values.phone} error={errors.phone?.[0]} />

      <Field id="address" label="Street address / neighborhood" autoComplete="street-address"
        placeholder="e.g. Bole, Kazanchis" defaultValue={values.address} error={errors.address?.[0]} />

      <Field id="notes" as="textarea" label="Notes (optional)"
        defaultValue={values.notes} error={errors.notes?.[0]} />

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
        aria-busy={pending}
        className="min-h-12 w-full rounded-xl bg-paprika py-3 font-semibold text-white shadow-sm hover:bg-maroon disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Placing order…" : "Place order"}
      </button>
    </form>
  );
}