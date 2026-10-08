"use client";

import { useState } from "react";

export default function FilterShell({ children }) {
  const [visible, setVisible] = useState(true);

  return (
    <div className="mt-4">
      <button
        onClick={() => setVisible(!visible)}
        className="border rounded px-3 py-1"
      >
        {visible ? "Hide dishes" : "Show dishes"}
      </button>
      {visible && children}
    </div>
  );
}