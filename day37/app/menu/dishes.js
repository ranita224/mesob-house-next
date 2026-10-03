export const categories = ["Meat", "Vegetarian"];

export const dishes = [
  { id: "kitfo", name: "Kitfo", category: "Meat", price: 450, description: "Minced beef seasoned with mitmita and niter kibbeh." },
  { id: "shiro", name: "Shiro", category: "Vegetarian", price: 280, description: "Silky chickpea stew simmered with berbere and garlic." },
];

const DELAY = 1500;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getCategories() {
  return categories;
}

export async function getDishes() {
  await wait(DELAY);
  return dishes;
}

export async function getDish(id) {
  await wait(DELAY);
  return dishes.find((dish) => dish.id === id);
}