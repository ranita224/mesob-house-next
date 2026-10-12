import { categories, categorySlug } from "./dishes";

export default function MenuLayout({ children }) {
  return (
    <div className="flex">
      <aside className="w-56 p-8 border-r">
        <h2 className="font-bold">Categories</h2>
        <ul className="mt-2 space-y-1">
          {categories.map((category) => (
            <li key={category}>
              <a href={`#${categorySlug(category)}`} className="underline">
                {category}
              </a>
            </li>
          ))}
        </ul>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}