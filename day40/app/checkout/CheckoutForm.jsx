"use client";

import { useActionState } from "react";
import { placeOrder } from "../actions";

export default function CheckoutForm() {
  const [state, formAction, pending] = useActionState(placeOrder, null);

  if (state?.order) {
    return (
      <div className="mt-4">
        <p className="font-semibold">Order placed: {state.order.id}</p>
        <p>Status: {state.order.status}</p>
      </div>
    );
  }

  const errors = state?.fieldErrors ?? {};
  const values = state?.values ?? {};

  return (
    <form action={formAction} className="mt-4 space-y-3 max-w-md">
      <div>
        <label className="block">Name</label>
        <input
          name="name"
          defaultValue={values.name}
          className="border rounded px-2 py-1 w-full"
        />
        {errors.name && (
          <p role="alert" className="text-red-600">{errors.name[0]}</p>
        )}
      </div>

      <div>
        <label className="block">Phone</label>
        <input
          name="phone"
          defaultValue={values.phone}
          className="border rounded px-2 py-1 w-full"
        />
        {errors.phone && (
          <p role="alert" className="text-red-600">{errors.phone[0]}</p>
        )}
      </div>

      <div>
        <label className="block">Notes</label>
        <textarea
          name="notes"
          defaultValue={values.notes}
          className="border rounded px-2 py-1 w-full"
        />
        {errors.notes && (
          <p role="alert" className="text-red-600">{errors.notes[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="border rounded px-4 py-2"
      >
        {pending ? "Sending…" : "Place order"}
      </button>
    </form>
  );
}