import { dishes } from "./menu/dishes";
import { SITE_URL } from "../lib/site";

export default function sitemap() {
  return [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/menu`, priority: 0.9 },
    { url: `${SITE_URL}/dishes`, priority: 0.7 },
    ...dishes.map((dish) => ({
      url: `${SITE_URL}/menu/${dish.id}`,
      priority: 0.8,
    })),
  ];
}