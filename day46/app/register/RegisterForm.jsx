"use client";

import { useActionState, useEffect } from "react";
import { register } from "./actions";

function TextField({ id, label, type = "text", autoComplete, defaultValue, error }) {
  return (
    <div>
      <label htmlFor={id} className="block">{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="border rounded px-2 py-1 w-full"
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-red-600">
          ⚠ {error}
        </p>
      )}
    </div>
  );
}

export default function RegisterForm({ next }) {
  const [state, formAction, pending] = useActionState(register, null);
  const errors = state?.fieldErrors ?? {};
  const values = state?.values ?? {};

  useEffect(() => {
    const fields = state?.fieldErrors ?? {};
    const first = ["name", "phone", "password", "confirm"].find((f) => fields[f]);
    if (first) document.getElementById(first)?.focus();
  }, [state]);

  return (
    <form action={formAction} className="mt-4 space-y-3 max-w-md">
      <input type="hidden" name="next" value={next} />

      <TextField
        id="name"
        label="Full name"
        autoComplete="name"
        defaultValue={values.name}
        error={errors.name?.[0]}
      />
      <TextField
        id="phone"
        label="Phone number"
        type="tel"
        autoComplete="tel"
        defaultValue={values.phone}
        error={errors.phone?.[0]}
      />
      <TextField
        id="password"
        label="Password (at least 8 characters)"
        type="password"
        autoComplete="new-password"
        error={errors.password?.[0]}
      />
      <TextField
        id="confirm"
        label="Confirm password"
        type="password"
        autoComplete="new-password"
        error={errors.confirm?.[0]}
      />

      <button type="submit" disabled={pending} className="border rounded px-4 py-2">
        {pending ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}