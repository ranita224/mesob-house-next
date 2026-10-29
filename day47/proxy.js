import { NextResponse } from "next/server";
import { verifyToken } from "./lib/token";

export async function proxy(request) {
  const token = request.cookies.get("session")?.value;
  const payload = token ? await verifyToken(token) : null;

  if (!payload) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    url.search = "";
    url.searchParams.set(
      "next",
      request.nextUrl.pathname + request.nextUrl.search
    );
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*", "/dashboard/:path*", "/track/:path*"],
};
