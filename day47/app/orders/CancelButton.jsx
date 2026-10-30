"use client";

import { useActionState } from "react";
import { cancelOrder } from "../actions";

export default function CancelButton({ orderId }) {
  const [state, formAction, pending] = useActionState(cancelOrder, null);

  return (
    <form action={formAction} className="inline-flex items-center gap-2">
      <input type="hidden" name="orderId" value={orderId} />
      <button
        type="submit"
        disabled={pending}
        aria-label={`Cancel order ${orderId}`}
        className="min-h-11 min-w-11 rounded border px-3 text-sm font-semibold disabled:opacity-50"
      >
        {pending ? "Cancelling…" : "Cancel"}
      </button>
      {state?.error && (
        <span role="alert" className="text-sm text-red-600">
          {state.error}
        </span>
      )}
    </form>
  );
}