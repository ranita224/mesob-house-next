import bcrypt from "bcryptjs";

const mockDishes = [
  {
    id: "dish_1",
    name: "Doro Wat",
    description: "Traditional spicy chicken stew served with injera and boiled egg.",
    price: 350,
    currency: "ETB",
    category: "Main",
    available: true,
  },
  {
    id: "dish_2",
    name: "Beyaynetu",
    description: "Assorted vegan fasting dishes served on injera.",
    price: 220,
    currency: "ETB",
    category: "Vegetarian",
    available: true,
  },
  {
    id: "dish_3",
    name: "Kitfo",
    description: "Minced beef seasoned with mitmita and niter kibbeh.",
    price: 400,
    currency: "ETB",
    category: "Main",
    available: true,
  },
  {
    id: "dish_4",
    name: "Shiro Tegabeno",
    description: "Rich chickpea flour stew served bubbling hot in a clay pot.",
    price: 180,
    currency: "ETB",
    category: "Vegetarian",
    available: true,
  },
];

const demoHash = bcrypt.hashSync("password123", 10);

const mockUsers = (globalThis.__mockUsers ??= [
  { id: "user_addis_101", name: "Abebe Bikila", phone: "0911111111", role: "customer", passwordHash: demoHash },
  { id: "user_other_202", name: "Someone Else", phone: "0922222222", role: "customer", passwordHash: demoHash },
  { id: "user_staff_303", name: "Kitchen Staff", phone: "0933333333", role: "staff", passwordHash: demoHash },
]);

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
]);

export const db = {
  dish: {
    findMany: async () => [...mockDishes],
    findUnique: async ({ where }) =>
      mockDishes.find((d) => d.id === where.id) || null,
  },
  order: {
    findMany: async () => [...mockOrders],
  },
};

export async function getDish(id) {
  const dish = mockDishes.find((d) => d.id === id);
  return dish || null;
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
  const order = mockOrders.find((o) => o.id === id);
  return order || null;
}

export async function getOrdersFor(userId) {
  return mockOrders.filter((o) => o.userId === userId);
}

export async function getAllOrders() {
  return [...mockOrders];
}

export async function markCancelled(id) {
  const order = mockOrders.find((o) => o.id === id);
  if (!order) {
    throw new Error("Order not found");
  }

  order.status = "CANCELLED";
  order.updatedAt = new Date().toISOString();
  return order;
}