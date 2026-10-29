import { SignJWT, jwtVerify } from "jose";

const secretValue = process.env.SESSION_SECRET;
if (!secretValue) throw new Error("SESSION_SECRET is not set in .env.local");
const secret = new TextEncoder().encode(secretValue);

export async function signToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(secret);
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });
    return payload;
  } catch {
    return null;
  }
}