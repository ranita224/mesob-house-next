export const categories = ["Meat", "Vegetarian"];

export const dishes = [
  { id: "kitfo", name: "Kitfo", category: "Meat", price: 450, description: "Minced beef seasoned with mitmita and niter kibbeh." },
  { id: "shiro", name: "Shiro", category: "Vegetarian", price: 280, description: "Silky chickpea stew simmered with berbere and garlic." },
];

export function getDish(id) {
  return dishes.find((dish) => dish.id === id);
}