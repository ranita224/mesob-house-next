import Link from "next/link";

export default function Pager({ page, pages, sort, dir }) {
  if (pages <= 1) return null;
  const href = (p) => `/orders?sort=${sort}&dir=${dir}&page=${p}`;
  return (
    <nav aria-label="Pagination" className="mt-6 flex flex-wrap items-center gap-3">
      {page > 1 && <Link href={href(page - 1)} rel="prev" className="underline">Previous</Link>}
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === page ? "page" : undefined}
          className={p === page ? "font-bold text-paprika underline" : "underline"}
        >
          {p}
        </Link>
      ))}
      {page < pages && <Link href={href(page + 1)} rel="next" className="underline">Next</Link>}
    </nav>
  );
}
