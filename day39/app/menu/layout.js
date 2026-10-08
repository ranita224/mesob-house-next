import { Suspense } from "react";
import { categories } from "./dishes";
import CategoryLinks from "./CategoryLinks";

export default function MenuLayout({ children }) {
  return (
    <div className="flex">
      <aside className="w-56 p-8 border-r">
        <h2 className="font-bold">Categories</h2>
        <Suspense fallback={null}>
          <CategoryLinks categories={categories} />
        </Suspense>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}