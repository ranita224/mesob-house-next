"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { orderSchema } from "../lib/schema";
import { createOrderOnce, getOrder, markCancelled } from "../lib/db";
import { getSession } from "../lib/session";
import { canCancel } from "../lib/tracking";
import { dishes } from "./menu/dishes";

const placeOrderSchema = orderSchema.extend({
  address: z
    .string()
    .trim()
    .min(5, "Enter your delivery address")
    .max(200, "Address is too long"),
});

export async function placeOrder(prevState, formData) {
  const user = await getSession();
  if (!user) return { error: "Not signed in" };

  const values = {
    name: formData.get("name") ?? "",
    phone: formData.get("phone") ?? "",
    address: formData.get("address") ?? "",
    notes: formData.get("notes") ?? "",
  };
  const orderKey = String(formData.get("orderKey") ?? "").slice(0, 100);

  let requested = [];
  try {
    requested = JSON.parse(String(formData.get("items") ?? "[]"));
  } catch {
    requested = [];
  }

  const items = [];
  if (Array.isArray(requested)) {
    for (const line of requested) {
      const dish = dishes.find((d) => d.id === line?.id);
      const quantity = Number(line?.quantity);
      if (!dish || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) continue;
      items.push({ id: dish.id, name: dish.name, price: dish.price, quantity });
    }
  }

  if (items.length === 0) {
    return { error: "Your cart is empty", values };
  }

  const parsed = placeOrderSchema.safeParse({
    name: values.name,
    phone: values.phone,
    address: values.address,
    notes: values.notes || undefined,
  });

  if (!parsed.success) {
    return {
      error: "Validation failed",
      fieldErrors: parsed.error.flatten().fieldErrors,
      values,
    };
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = await createOrderOnce(
    {
      name: parsed.data.name,
      phone: parsed.data.phone,
      address: parsed.data.address,
      notes: parsed.data.notes,
      items,
      total,
    },
    user.id,
    orderKey
  );

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

  if (!canCancel(order)) return { error: "Too late to cancel: the courier has already left" };

  await markCancelled(orderId);
  revalidatePath("/orders");

  return { ok: true };
}