import { orderSchema } from "../../../lib/schema";
import { createOrder, getDish } from "../../../lib/db";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON" }, { status: 400 });
  }

  const result = orderSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      {
        error: "Validation failed",
        fieldErrors: result.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  if (result.data.dishId) {
    const dish = await getDish(result.data.dishId);
    if (!dish) {
      return Response.json(
        {
          error: "Validation failed",
          fieldErrors: { dishId: ["No such dish"] },
        },
        { status: 422 }
      );
    }
  }

  const order = await createOrder(result.data);
  return Response.json(order, { status: 201 });
}