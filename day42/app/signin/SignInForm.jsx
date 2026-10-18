"use client";

import { useActionState } from "react";
import { signIn } from "./actions";

export default function SignInForm({ next }) {
  const [state, formAction, pending] = useActionState(signIn, null);

  return (
    <form action={formAction} className="mt-4 space-y-3 max-w-md">
      <input type="hidden" name="next" value={next} />

      <div>
        <label htmlFor="phone" className="block">Phone number</label>
        <input
          id="phone"
          name="phone"
          autoComplete="tel"
          defaultValue={state?.phone}
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <div>
        <label htmlFor="password" className="block">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      {state?.error && (
        <p role="alert" className="text-red-600">{state.error}</p>
      )}

      <button type="submit" disabled={pending} className="border rounded px-4 py-2">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}