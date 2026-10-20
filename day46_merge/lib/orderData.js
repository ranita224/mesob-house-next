import "server-only";
import { getOrdersFor, getAllOrders } from "./db";

const TZ = "Africa/Addis_Ababa";
const AREAS = ["Bole", "Kazanchis", "Megenagna"];
const DAY = 24 * 60 * 60 * 1000;

// Demo switches (?demo=slow|empty|error) work in dev, or in prod when DEMO_LOGIN=true
const demoOn = process.env.NODE_ENV !== "production" || process.env.DEMO_LOGIN === "true";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// Orders store a free-text address; derive a neighbourhood from it.
export const areaOf = (address = "") =>
  AREAS.find((a) => address.toLowerCase().includes(a.toLowerCase())) ?? "Other";

const dayKey = (d) => new Date(d).toLocaleDateString("en-CA", { timeZone: TZ }); // YYYY-MM-DD
const dayLabel = (d) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: TZ });

async function loadOrders(user, demo) {
  if (demoOn && demo === "slow") await wait(3000);
  if (demoOn && demo === "error") throw new Error("Could not reach the orders database.");
  if (demoOn && demo === "empty") return [];
  // staff see everything; customers see their own
  const all = user.role === "staff" ? await getAllOrders() : await getOrdersFor(user.id);
  return all.filter((o) => o.status !== "CANCELLED");
}

const SORT_KEYS = {
  id: (o) => o.id,
  date: (o) => o.createdAt,
  area: (o) => o.area,
  status: (o) => o.status,
  total: (o) => o.total ?? 0,
};
const PAGE_SIZE = 20;

export async function getOrdersPage(user, { sort = "date", dir = "desc", page = 1, demo } = {}) {
  const key = SORT_KEYS[sort] ? sort : "date"; // whitelist
  const sign = dir === "asc" ? 1 : -1;

  const orders = (await loadOrders(user, demo)).map((o) => ({ ...o, area: areaOf(o.address) }));
  orders.sort((a, b) => {
    const x = SORT_KEYS[key](a), y = SORT_KEYS[key](b);
    return (x > y ? 1 : x < y ? -1 : 0) * sign;
  });

  const pages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
  const current = Math.min(Math.max(1, page), pages);
  const start = (current - 1) * PAGE_SIZE;

  return { rows: orders.slice(start, start + PAGE_SIZE), total: orders.length, page: current, pages, sort: key };
}

// Aggregate on the server: a handful of plain rows cross to the client chart.
export async function getDashboard(user, { demo, days = 14 } = {}) {
  const orders = await loadOrders(user, demo);
  const now = Date.now();

  const keys = Array.from({ length: days }, (_, i) => now - (days - 1 - i) * DAY);
  const inRange = new Set(keys.map(dayKey));
  const recent = orders.filter((o) => inRange.has(dayKey(o.createdAt)));

  const names = [...AREAS, "Other"];
  const byArea = names
    .map((area) => ({
      area,
      revenue: recent.filter((o) => areaOf(o.address) === area).reduce((s, o) => s + (o.total ?? 0), 0),
    }))
    .filter((r) => r.area !== "Other" || r.revenue > 0);

  const byDay = keys.map((t) => ({
    day: dayLabel(t),
    orders: recent.filter((o) => dayKey(o.createdAt) === dayKey(t)).length,
  }));

  const year = new Date(now).toLocaleDateString("en-GB", { year: "numeric", timeZone: TZ });
  return {
    count: recent.length,
    byArea,
    byDay,
    range: `${dayLabel(keys[0])} – ${dayLabel(keys[keys.length - 1])} ${year}`,
  };
}
