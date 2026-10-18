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
export const categorySlug = (category) =>
  category.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const PAGE_SIZE = 6;

export function paginate(list, page) {
  const pageCount = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const current = Math.min(Math.max(1, page), pageCount);
  const start = (current - 1) * PAGE_SIZE;

  return {
    items: list.slice(start, start + PAGE_SIZE),
    total: list.length,
    page: current,
    pageCount,
  };
}