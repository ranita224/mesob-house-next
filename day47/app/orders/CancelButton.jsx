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
        className="border rounded px-2 py-0.5 text-sm"
      >
        {pending ? "Cancelling…" : "Cancel"}
      </button>
      {state?.error && (
        <span role="alert" className="text-red-600 text-sm">
          {state.error}
        </span>
      )}
    </form>
  );
}