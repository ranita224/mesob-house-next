import { getOrder } from "../../../../../lib/db";
import { getSession } from "../../../../../lib/session";
import { getTracking, isTerminal } from "../../../../../lib/tracking";

export const dynamic = "force-dynamic";
export const maxDuration = 60; 

const INTERVAL_MS = 2000;

export async function GET(request, { params }) {
  const user = await getSession();
  if (!user) return Response.json({ error: "Not signed in" }, { status: 401 });

  const { id } = await params;
  const order = await getOrder(id);
  if (!order) return Response.json({ error: "No such order" }, { status: 404 });
  if (order.userId !== user.id) return Response.json({ error: "Not yours" }, { status: 403 });

  const encoder = new TextEncoder();
  let stop = () => {};

  const stream = new ReadableStream({
    async start(controller) {
      let closed = false;
      let timer;

      stop = () => {
        if (closed) return;
        closed = true;
        clearInterval(timer);
        try { controller.close(); } catch {}
      };

      const push = async () => {
        if (closed) return;
        const current = await getOrder(id);
        if (closed) return;
        if (!current) return stop();

        const tracking = getTracking(current);
        // Strict SSE framing: "data: " + payload + TWO newlines
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(tracking)}\n\n`));

        if (isTerminal(tracking.status)) stop();
      };

      request.signal.addEventListener("abort", stop); 
      if (!closed) timer = setInterval(push, INTERVAL_MS);
    },
    cancel() {
      stop();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
