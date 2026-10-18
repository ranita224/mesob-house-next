"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { registerSchema } from "../../lib/registerSchema";
import { createUser, findUserByPhone } from "../../lib/db";
import { createSession } from "../../lib/session";
import { normalizePhone, safeNext } from "../../lib/authHelpers";

export async function register(prevState, formData) {
  const values = {
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
  };
  const next = safeNext(formData.get("next"));

  const parsed = registerSchema.safeParse({
    name: values.name,
    phone: normalizePhone(values.phone),
    password: String(formData.get("password") ?? ""),
    confirm: String(formData.get("confirm") ?? ""),
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors, values };
  }

  const existing = await findUserByPhone(parsed.data.phone);
  if (existing) {
    return {
      fieldErrors: {
        phone: ["An account with this phone number already exists. Sign in instead."],
      },
      values,
    };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);
  const user = await createUser({
    name: parsed.data.name,
    phone: parsed.data.phone,
    passwordHash,
  });

  await createSession(user);
  redirect(next);
}