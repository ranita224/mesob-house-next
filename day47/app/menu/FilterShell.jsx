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

      <div
        role="group"
        aria-label="Filter the menu by category"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2"
      >
        {["All", ...categories].map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={selected === category}
            onClick={() => setSelected(category)}
            className={
              selected === category
                ? "min-h-11 shrink-0 rounded-full bg-paprika px-4 text-sm font-semibold text-white"
                : "min-h-11 shrink-0 rounded-full bg-blush px-4 text-sm font-medium text-ink-soft"
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