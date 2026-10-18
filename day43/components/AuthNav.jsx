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
    <>
      {user && <Link href="/orders" className="underline">Orders</Link>}
      {user?.role === "staff" && (
        <Link href="/kitchen" className="underline">Kitchen</Link>
      )}
      {user ? (
        <form
          action={signOut}
          onSubmit={() => mutate({ user: null }, false)}
          className="flex items-center gap-2"
        >
          <span>{user.name}</span>
          <button type="submit" className="underline">Sign out</button>
        </form>
      ) : (
        <Link href="/signin" className="underline">Sign in</Link>
      )}
    </>
  );
}