"use client";

import { useActionState } from "react";
import { signIn, signInAsDemo } from "./actions";

const input =
  "w-full rounded-lg border border-gray-300 p-3 focus:border-paprika";

export default function SignInForm({ next, demo = false }) {
  const [state, formAction, pending] = useActionState(signIn, null);

  return (
    <div className="mt-6">
      {demo && (
        <form action={signInAsDemo} className="mb-6">
          <input type="hidden" name="next" value={next} />
          <button
            type="submit"
            className="w-full rounded-xl bg-paprika py-3 font-semibold text-white hover:bg-maroon"
          >
            Continue as Raniya (demo)
          </button>
          <p className="mt-2 text-center text-sm text-gray-500">
            or sign in with a phone number
          </p>
        </form>
      )}

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="next" value={next} />

        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium">Phone number</label>
          <input
            id="phone"
            name="phone"
            autoComplete="tel"
            defaultValue={state?.phone}
            className={input}
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className={input}
          />
        </div>

        {state?.error && (
          <p role="alert" className="text-red-600">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-xl border border-paprika py-3 font-semibold text-paprika hover:bg-paprika hover:text-white disabled:opacity-50"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
