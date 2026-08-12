import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const jwtSecret = process.env.JWT_SECRET;
if (process.env.NODE_ENV === "production" && (!jwtSecret || jwtSecret.length < 32)) {
  throw new Error("JWT_SECRET production wajib berisi minimal 32 karakter.");
}

const JWT_SECRET = new TextEncoder().encode(jwtSecret ?? "development-only-jwt-secret-change-me");
const COOKIE_NAME = "admin_session";
const JWT_ISSUER = "sdn-danabhakti-cms";
const JWT_AUDIENCE = "sdn-danabhakti-admin";

export type SessionPayload = {
  username: string;
  name: string;
};

export async function createToken(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    expires: new Date(0),
    path: "/",
  });
  cookieStore.delete(COOKIE_NAME);
}
