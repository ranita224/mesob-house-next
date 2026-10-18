import { cookies } from "next/headers";
import { signToken, verifyToken } from "./token";

const COOKIE = "session";

export async function getSession() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const payload = await verifyToken(token);
  if (!payload) return null;
  return { id: payload.id, name: payload.name, role: payload.role };
}

export async function createSession(user) {
  const token = await signToken({ id: user.id, name: user.name, role: user.role });
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}