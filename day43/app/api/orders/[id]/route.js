import { getOrder } from "../../../../lib/db";
import { getSession } from "../../../../lib/session";

export async function GET(request, { params }) {
  const user = await getSession();
  if (!user) {
    return Response.json({ error: "Not signed in" }, { status: 401 });
  }

  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    return Response.json({ error: "No such order" }, { status: 404 });
  }

  if (order.userId !== user.id) {
    return Response.json({ error: "Not yours" }, { status: 403 });
  }

  return Response.json(order);
}