import "server-only";
import { getOrdersFor, getAllOrders } from "./db";
import { areaOf, getStage, stageLabel } from "./tracking";
import { dayKey, shortDay, yearOf, when } from "./format";

const DAY = 24 * 60 * 60 * 1000;

const demoOn = process.env.NODE_ENV !== "production" || process.env.DEMO_LOGIN === "true";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

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
  const now = Date.now();

  const orders = (await loadOrders(user, demo)).map((o) => {
    const status = getStage(o, now);
    return { ...o, area: areaOf(o.address), status, statusLabel: stageLabel(status) };
  });
  orders.sort((a, b) => {
    const x = SORT_KEYS[key](a), y = SORT_KEYS[key](b);
    return (x > y ? 1 : x < y ? -1 : 0) * sign;
  });

  const exportRows = orders.map((o) => ({
    Order: o.id,
    "Placed (Addis time)": when.format(new Date(o.createdAt)),
    Neighbourhood: o.area,
    Address: o.address ?? "",
    Status: o.statusLabel,
    "Total (ETB)": typeof o.total === "number" ? o.total : "",
    Notes: o.notes ?? "",
  }));

  const pages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
  const current = Math.min(Math.max(1, page), pages);
  const start = (current - 1) * PAGE_SIZE;

  return {
    rows: orders.slice(start, start + PAGE_SIZE),
    total: orders.length,
    page: current,
    pages,
    sort: key,
    exportRows,
  };
}

export async function getDashboard(user, { demo, days = 14 } = {}) {
  const orders = await loadOrders(user, demo);
  const now = Date.now();

  const keys = Array.from({ length: days }, (_, i) => now - (days - 1 - i) * DAY);
  const inRange = new Set(keys.map(dayKey));
  const recent = orders.filter((o) => inRange.has(dayKey(o.createdAt)));

  const names = [...["Bole", "Kazanchis", "Megenagna"], "Other"];
  const byArea = names
    .map((area) => ({
      area,
      revenue: recent.filter((o) => areaOf(o.address) === area).reduce((s, o) => s + (o.total ?? 0), 0),
    }))
    .filter((r) => r.area !== "Other" || r.revenue > 0);

  const byDay = keys.map((t) => ({
    day: shortDay.format(new Date(t)),
    orders: recent.filter((o) => dayKey(o.createdAt) === dayKey(t)).length,
  }));

  return {
    count: recent.length,
    byArea,
    byDay,
    range: `${shortDay.format(new Date(keys[0]))} – ${shortDay.format(new Date(keys[keys.length - 1]))} ${yearOf.format(new Date(now))}`,
  };
}

export async function getOrderById(user, id) {
  const orders = await loadOrders(user);

  return (
    orders.find((o) => o.id === id) || null
  );
}