export function normalizePhone(raw) {
  const p = String(raw ?? "").replace(/[\s-]+/g, "");
  return p.startsWith("+251") ? "0" + p.slice(4) : p;
}

export function safeNext(value) {
  if (typeof value !== "string" || !value.startsWith("/")) return "/";
  try {
    const url = new URL(value, "http://localhost");
    if (url.origin !== "http://localhost") return "/";
    return url.pathname + url.search;
  } catch {
    return "/";
  }
}