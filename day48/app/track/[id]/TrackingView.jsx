"use client";

import { useEffect, useState } from "react";
import MapPanel from "./MapPanel";
import { etb, when, relative, km } from "../../../lib/format";
import { STAGES, isTerminal } from "../../../lib/tracking";

function courierLine(t) {
  if (t.status === "CANCELLED") return "No courier: this order was cancelled.";
  if (t.status === "DELIVERED") return `${t.courierName} has delivered your order.`;
  if (t.status === "ON_THE_WAY") return `${t.courierName} is ${km.format(t.distanceKm)} km away.`;
  return `${t.courierName} is at the kitchen.`;
}

export default function TrackingView({ id, initial, address, total }) {
  const [tracking, setTracking] = useState(initial); // seeded by the server render
  const [conn, setConn] = useState(isTerminal(initial.status) ? "done" : "connecting");
  const [attempt, setAttempt] = useState(0);
  const [now, setNow] = useState(null); 

  useEffect(() => {
    // Already delivered/cancelled when the page loaded: nothing to stream
    if (attempt === 0 && isTerminal(initial.status)) return;

    const es = new EventSource(`/api/orders/${id}/stream`);

    es.onopen = () => setConn("live");
    es.onmessage = (event) => {
      const next = JSON.parse(event.data);
      setTracking(next);
      if (isTerminal(next.status)) {
        es.close();
        setConn("done");
      } else {
        setConn("live");
      }
    };
    es.onerror = () => {
      setConn(es.readyState === EventSource.CLOSED ? "offline" : "reconnecting");
    };

    return () => es.close(); 
  }, [id, attempt, initial.status]);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const indicator = {
    connecting: { dot: "bg-gray-400", text: "Connecting…" },
    live: { dot: "bg-green-600", text: "Live" },
    reconnecting: { dot: "bg-amber-500", text: "Reconnecting…" },
    offline: { dot: "bg-red-600", text: "Connection lost" },
    done: {
      dot: "bg-gray-500",
      text: tracking.status === "CANCELLED" ? "Order cancelled: updates stopped" : "Delivered: updates stopped",
    },
  }[conn];

  const currentIndex = STAGES.findIndex((s) => s.key === tracking.status);
  const eta = tracking.etaAt ? new Date(tracking.etaAt) : null;

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
     
      <section aria-labelledby="status-heading" className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 id="status-heading" className="text-xl">Delivery status</h2>

        <p role="status" aria-live="polite" className="mt-2 text-2xl font-bold text-paprika">
          {tracking.label}
        </p>

        <p className="mt-2 flex items-center gap-2 text-sm">
          <span aria-hidden="true" className={`inline-block h-3 w-3 rounded-full ${indicator.dot}`} />
          <span>{indicator.text}</span>
          {conn === "offline" && (
            <button
              type="button"
              onClick={() => { setConn("connecting"); setAttempt((a) => a + 1); }}
              className="ml-2 rounded border px-2 py-0.5 font-semibold"
            >
              Retry
            </button>
          )}
        </p>

        {tracking.status !== "CANCELLED" && (
          <ol className="mt-4 space-y-1 text-sm">
            {STAGES.map((stage, i) => (
              <li
                key={stage.key}
                aria-current={i === currentIndex ? "step" : undefined}
                className={i === currentIndex ? "font-bold" : i < currentIndex ? "text-gray-500" : "text-gray-400"}
              >
                {i < currentIndex ? "✓ " : i === currentIndex ? "● " : "○ "}
                {stage.label}
              </li>
            ))}
          </ol>
        )}

        <dl className="mt-4 space-y-3 text-sm">
          <div>
            <dt className="font-semibold">Delivery address</dt>
            <dd>{address}</dd>
          </div>
          <div>
            <dt className="font-semibold">Neighbourhood</dt>
            <dd>{tracking.area}</dd>
          </div>
          <div>
            <dt className="font-semibold">Courier</dt>
            <dd>{courierLine(tracking)}</dd>
          </div>
          {eta && (
            <div>
              <dt className="font-semibold">{tracking.status === "DELIVERED" ? "Delivered at" : "Estimated arrival"}</dt>
              <dd suppressHydrationWarning>
                <time dateTime={tracking.etaAt}>{when.format(eta)}</time>
                {tracking.status !== "DELIVERED" && now !== null && ` (${relative(eta, now)})`}
              </dd>
            </div>
          )}
          {total !== null && (
            <div>
              <dt className="font-semibold">Order total</dt>
              <dd>{etb.format(total)}</dd>
            </div>
          )}
        </dl>

        {now !== null && (
          <p className="mt-4 text-xs text-gray-500">Last update {relative(tracking.updatedAt, now)}</p>
        )}
      </section>

      <div role="region" aria-label="Map showing the courier and the delivery address. The same details are in the text beside it.">
        <MapPanel
          courier={tracking.courier}
          destination={tracking.destination}
          address={address}
          courierName={tracking.courierName}
          distanceKm={tracking.distanceKm}
          fitKey={tracking.status}
        />
        <p className="mt-2 text-xs text-gray-500">
          Map data © OpenStreetMap contributors. Courier position is simulated for this exercise.
        </p>
      </div>
    </div>
  );
}
