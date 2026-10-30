import Link from "next/link";

const base = "inline-flex min-h-11 min-w-11 items-center justify-center px-2 underline";

export default function Pager({ page, pages, sort, dir }) {
  if (pages <= 1) return null;
  const href = (p) => `/orders?sort=${sort}&dir=${dir}&page=${p}`;
  return (
    <nav aria-label="Pagination" className="mt-6 flex flex-wrap items-center gap-1">
      {page > 1 && <Link href={href(page - 1)} rel="prev" className={base}>Previous</Link>}
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === page ? "page" : undefined}
          className={p === page ? `${base} font-bold text-paprika` : base}
        >
          {p}
        </Link>
      ))}
      {page < pages && <Link href={href(page + 1)} rel="next" className={base}>Next</Link>}
    </nav>
  );
}