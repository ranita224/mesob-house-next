export const AREAS = ["Bole", "Kazanchis", "Megenagna"];

export const AREA_COORDS = {
  Bole: [8.995, 38.7896],
  Kazanchis: [9.0189, 38.7634],
  Megenagna: [9.0201, 38.8029],
  Other: [9.03, 38.74],
};
export const KITCHEN = [9.0107, 38.7613];
export const COURIER_NAME = "Almaz";

export const STAGES = [
  { key: "PENDING", label: "Order received", at: 0 },
  { key: "PREPARING", label: "Being prepared", at: 20 },
  { key: "ON_THE_WAY", label: "On the way", at: 50 },
  { key: "DELIVERED", label: "Delivered", at: 110 },
];

export const areaOf = (address = "") =>
  AREAS.find((a) => address.toLowerCase().includes(a.toLowerCase())) ?? "Other";

export function getStage(order, now = Date.now()) {
  if (order.status === "CANCELLED") return "CANCELLED";
  const elapsed = Math.max(0, (now - new Date(order.createdAt).getTime()) / 1000);
  let key = STAGES[0].key;
  for (const stage of STAGES) if (elapsed >= stage.at) key = stage.key;
  return key;
}

export const stageLabel = (key) =>
  key === "CANCELLED" ? "Cancelled" : STAGES.find((s) => s.key === key)?.label ?? key;

// Only before the courier has left
export const canCancel = (order, now) => ["PENDING", "PREPARING"].includes(getStage(order, now));

const TERMINAL = ["DELIVERED", "CANCELLED"];
export const isTerminal = (status) => TERMINAL.includes(status);

function distanceKm(a, b) {
  const R = 6371, rad = Math.PI / 180;
  const dLat = (b[0] - a[0]) * rad;
  const dLng = (b[1] - a[1]) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a[0] * rad) * Math.cos(b[0] * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function getTracking(order, now = Date.now()) {
  const area = areaOf(order.address);
  const destination = AREA_COORDS[area];
  const status = getStage(order, now);
  const created = new Date(order.createdAt).getTime();
  const base = {
    status,
    label: stageLabel(status),
    area,
    courierName: COURIER_NAME,
    destination,
    kitchen: KITCHEN,
    updatedAt: new Date(now).toISOString(),
  };

  if (status === "CANCELLED") {
    return { ...base, courier: null, distanceKm: null, etaAt: null };
  }

  const onWay = STAGES.find((s) => s.key === "ON_THE_WAY").at;
  const done = STAGES.find((s) => s.key === "DELIVERED").at;
  const elapsed = (now - created) / 1000;
  const t = status === "DELIVERED" ? 1 : status === "ON_THE_WAY" ? (elapsed - onWay) / (done - onWay) : 0;
  const courier = [
    KITCHEN[0] + (destination[0] - KITCHEN[0]) * t,
    KITCHEN[1] + (destination[1] - KITCHEN[1]) * t,
  ];

  return {
    ...base,
    courier,
    distanceKm: Math.round(distanceKm(courier, destination) * 10) / 10,
    etaAt: new Date(created + done * 1000).toISOString(),
  };
}
