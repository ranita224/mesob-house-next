import menu from "./menu.json";

export const dishes = menu.data.map((item) => ({
  id: item.slug,
  name: item.nameEn,
  nameAm: item.nameAm,
  category: item.category,
  price: item.priceETB,
  description: item.description,
  ingredients: item.ingredients,
  spiceLevel: item.spiceLevel,
  servings: item.servings,
  isFasting: item.isFasting,
  isSpecial: item.isSpecial,
}));

export const categories = [...new Set(dishes.map((dish) => dish.category))];

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