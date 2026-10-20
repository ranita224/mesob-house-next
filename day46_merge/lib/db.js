import bcrypt from "bcryptjs";

const mockDishes = [
  { id: "dish_1", name: "Doro Wat", description: "Traditional spicy chicken stew served with injera and boiled egg.", price: 350, currency: "ETB", category: "Main", available: true },
  { id: "dish_2", name: "Beyaynetu", description: "Assorted vegan fasting dishes served on injera.", price: 220, currency: "ETB", category: "Vegetarian", available: true },
  { id: "dish_3", name: "Kitfo", description: "Minced beef seasoned with mitmita and niter kibbeh.", price: 400, currency: "ETB", category: "Main", available: true },
  { id: "dish_4", name: "Shiro Tegabeno", description: "Rich chickpea flour stew served bubbling hot in a clay pot.", price: 180, currency: "ETB", category: "Vegetarian", available: true },
];

const demoHash = bcrypt.hashSync("password123", 10);

const mockUsers = (globalThis.__mockUsers ??= [
  { id: "user_addis_101", name: "Abebe Bikila", phone: "0911111111", role: "customer", passwordHash: demoHash },
  { id: "user_other_202", name: "Someone Else", phone: "0922222222", role: "customer", passwordHash: demoHash },
  { id: "user_raniya_001", name: "Raniya Ayalew", phone: "0944444444", role: "customer", passwordHash: demoHash },
]);

// Day 46: seed orders so the dashboard has a shape to show. Dates are relative to "now".
const DAY = 24 * 60 * 60 * 1000;
function seed(n, daysAgo, address, total, status = "PENDING") {
  return {
    id: `ord_demo_${n}`,
    name: "Raniya Ayalew",
    phone: "0944444444",
    address,
    items: [{ id: "doro-wat", name: "Classic Doro Wat", price: total, quantity: 1 }],
    total,
    status,
    userId: "user_raniya_001",
    createdAt: new Date(Date.now() - daysAgo * DAY).toISOString(),
  };
}

const mockOrders = (globalThis.__mockOrders ??= [
  {
    id: "ord_seed_1",
    name: "Someone Else",
    phone: "0922222222",
    dishId: "dish_1",
    quantity: 1,
    status: "PENDING",
    userId: "user_other_202",
    createdAt: new Date().toISOString(),
  },
  seed(1, 13, "Bole, near Edna Mall", 650),
  seed(2, 12, "Kazanchis, Nile Street", 580),
  seed(3, 11, "Megenagna, Zefmesh", 420),
  seed(4, 10, "Bole Medhanialem", 720),
  seed(5, 9, "Bole, Atlas", 540),
  seed(6, 8, "Kazanchis", 360),
  seed(7, 7, "Bole", 680),
  seed(8, 6, "Megenagna", 490),
  seed(9, 5, "Kazanchis, UN Road", 620),
  seed(10, 4, "Bole", 750),
  seed(11, 4, "Megenagna", 480),
  seed(12, 3, "Kazanchis", 560),
  seed(13, 2, "Piassa", 340),
  seed(14, 2, "Bole", 650),
  seed(15, 1, "Bole, Friendship", 580),
  seed(16, 1, "Kazanchis", 420, "CANCELLED"),
  seed(17, 0, "Megenagna", 620),
]);

export const db = {
  dish: {
    findMany: async () => [...mockDishes],
    findUnique: async ({ where }) => mockDishes.find((d) => d.id === where.id) || null,
  },
  order: {
    findMany: async () => [...mockOrders],
  },
};

export async function getDish(id) {
  return mockDishes.find((d) => d.id === id) || null;
}

export async function findUserByPhone(phone) {
  return mockUsers.find((u) => u.phone === phone) || null;
}

export async function createUser({ name, phone, passwordHash }) {
  const user = {
    id: `user_${globalThis.crypto.randomUUID()}`,
    name,
    phone,
    role: "customer",
    passwordHash,
  };
  mockUsers.push(user);
  return user;
}

export async function createOrder(data, userId) {
  const newOrder = {
    id: `ord_${Math.floor(100 + Math.random() * 900)}`,
    ...data,
    status: "PENDING",
    userId,
    createdAt: new Date().toISOString(),
  };
  mockOrders.push(newOrder);
  return newOrder;
}

export async function getOrder(id) {
  return mockOrders.find((o) => o.id === id) || null;
}

export async function getOrdersFor(userId) {
  return mockOrders.filter((o) => o.userId === userId);
}

export async function getAllOrders() {
  return [...mockOrders];
}

export async function markCancelled(id) {
  const order = mockOrders.find((o) => o.id === id);
  if (!order) throw new Error("Order not found");
  order.status = "CANCELLED";
  order.updatedAt = new Date().toISOString();
  return order;
}
