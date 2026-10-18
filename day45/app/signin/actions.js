"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { findUserByPhone } from "../../lib/db";
import { createSession, destroySession } from "../../lib/session";
import { normalizePhone, safeNext } from "../../lib/authHelpers";

export async function signIn(prevState, formData) {
  const phone = normalizePhone(formData.get("phone"));
  const password = String(formData.get("password") ?? "");
  const next = safeNext(formData.get("next"));

  const user = await findUserByPhone(phone);
  const ok = user && (await bcrypt.compare(password, user.passwordHash));

  if (!ok) {
    return { error: "Phone number or password is incorrect", phone };
  }

  await createSession(user);
  redirect(next);
}

export async function signInAsDemo(formData) {
  if (process.env.DEMO_LOGIN !== "true") redirect("/signin");

  const user = await findUserByPhone("0944444444");
  if (!user) redirect("/signin");

  await createSession(user);
  redirect(safeNext(formData.get("next")));
}

export async function signOut() {
  await destroySession();
  redirect("/");
}