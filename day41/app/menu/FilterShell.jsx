"use client";

import { useState } from "react";

export default function FilterShell({ categories, children }) {
  const [selected, setSelected] = useState("All");

  const hideRule =
    selected === "All"
      ? ""
      : `.dish-section:not([data-category="${selected.replace(/"/g, '\\"')}"]){display:none}`;

  return (
    <div className="mt-4">
      {hideRule && <style>{hideRule}</style>}

      <div className="flex flex-wrap gap-2">
        {["All", ...categories].map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelected(category)}
            className={
              selected === category
                ? "border rounded-full px-3 py-1 text-sm font-bold"
                : "border rounded-full px-3 py-1 text-sm"
            }
          >
            {category}
          </button>
        ))}
      </div>

      {children}
    </div>
  );
}