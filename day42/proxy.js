import { NextResponse } from "next/server";
import { verifyToken } from "./lib/token";

export async function proxy(request) {
  const token = request.cookies.get("session")?.value;
  const session = token ? await verifyToken(token) : null;

  if (!session) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("next", request.nextUrl.pathname + request.nextUrl.search);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*"],
};