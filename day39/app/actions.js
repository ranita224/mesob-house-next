"use server";

import { revalidatePath } from "next/cache";
import { orderSchema } from "../lib/schema";
import { createOrder, getOrder, markCancelled, getSession } from "../lib/db";

export async function placeOrder(prevState, formData) {
  const values = {
    name: formData.get("name") ?? "",
    phone: formData.get("phone") ?? "",
    notes: formData.get("notes") ?? "",
  };

  const parsed = orderSchema.safeParse({
    name: values.name,
    phone: values.phone,
    notes: values.notes || undefined,
  });

  if (!parsed.success) {
    return {
      error: "Validation failed",
      fieldErrors: parsed.error.flatten().fieldErrors,
      values,
    };
  }

  const order = await createOrder(parsed.data);
  revalidatePath("/orders");

  return { order };
}

export async function cancelOrder(prevState, formData) {
  const orderId = formData.get("orderId");

  const user = await getSession();
  if (!user) return { error: "Not signed in" };

  const order = await getOrder(orderId);
  if (!order) return { error: "Order not found" };

  if (order.userId !== user.id) return { error: "Not yours" };

  if (order.status === "CANCELLED") return { error: "Already cancelled" };

  await markCancelled(orderId);
  revalidatePath("/orders");

  return { ok: true };
}