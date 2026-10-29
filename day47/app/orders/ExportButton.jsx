"use client";

import { toCsv, downloadText } from "../../lib/csv";
import { dayKey } from "../../lib/format";

export default function ExportButton({ rows }) {
  function handleClick() {
    downloadText(toCsv(rows), `orders-${dayKey(Date.now())}.csv`);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={rows.length === 0}
      className="rounded-full border border-paprika px-4 py-2 text-sm font-semibold text-paprika hover:bg-paprika hover:text-white disabled:opacity-50"
    >
      Export CSV ({rows.length} orders)
    </button>
  );
}
