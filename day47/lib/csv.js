const FORMULA_START = /^[=+\-@\t\r]/;

function cell(value) {
  let s = String(value ?? "");
  if (typeof value === "string" && FORMULA_START.test(s)) s = "'" + s;
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function toCsv(rows, columns = rows[0] ? Object.keys(rows[0]) : []) {
  if (columns.length === 0) return "";
  const lines = [columns, ...rows.map((row) => columns.map((c) => row[c]))];
  return lines.map((line) => line.map(cell).join(",")).join("\r\n");
}

// Browser only: a Blob, a link, a click.
export function downloadText(text, filename) {
  const blob = new Blob(["\uFEFF" + text], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();

  setTimeout(() => URL.revokeObjectURL(url), 0);
}
