"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import { signOut } from "../app/signin/actions";

export default function AuthNav() {
  const pathname = usePathname();
  const { data, mutate } = useSWR(
    `/api/me?at=${encodeURIComponent(pathname)}`,
    fetcher,
    { keepPreviousData: true }
  );
  const user = data?.user ?? null;

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      {user && (
        <Link href="/orders" className="hover:text-maroon">Orders</Link>
      )}
      {user && (
        <Link href="/dashboard" className="hover:text-maroon">Dashboard</Link>
      )}
      {user?.role === "staff" && (
        <Link href="/kitchen" className="hover:text-maroon">Kitchen</Link>
      )}

      {user ? (
        <form
          action={signOut}
          onSubmit={() => mutate({ user: null }, false)}
          className="flex items-center gap-3"
        >
          <span className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 font-semibold text-maroon">
            Hi, {user.name.split(" ")[0]}
          </span>
          <button
            type="submit"
            className="rounded-full border border-paprika px-4 py-2 text-sm font-semibold text-paprika hover:bg-paprika hover:text-white"
          >
            Sign out
          </button>
        </form>
      ) : (
        <Link
          href="/signin"
          className="rounded-full bg-paprika px-5 py-2 text-sm font-semibold text-white hover:bg-maroon"
        >
          Sign in
        </Link>
      )}
    </div>
  );
}
