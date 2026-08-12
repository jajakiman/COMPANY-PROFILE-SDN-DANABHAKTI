import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const jwtSecret = process.env.JWT_SECRET;
if (process.env.NODE_ENV === "production" && (!jwtSecret || jwtSecret.length < 32)) {
  throw new Error("JWT_SECRET production wajib berisi minimal 32 karakter.");
}

const JWT_SECRET = new TextEncoder().encode(jwtSecret ?? "development-only-jwt-secret-change-me");
const JWT_ISSUER = "sdn-danabhakti-cms";
const JWT_AUDIENCE = "sdn-danabhakti-admin";

function clearAuthCookies(response: NextResponse) {
  response.cookies.set("admin_session", "", {
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });
  response.cookies.delete("admin_session");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("admin_session")?.value;

  // 1. Handling access to Login Page "/login"
  if (pathname === "/login") {
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET, {
          issuer: JWT_ISSUER,
          audience: JWT_AUDIENCE,
        });
        // Valid active session: redirect logged-in admin directly to /admin
        return NextResponse.redirect(new URL("/admin", request.url));
      } catch {
        // Invalid or expired token: clear cookies and show login form
        const response = NextResponse.next();
        clearAuthCookies(response);
        return response;
      }
    }
    return NextResponse.next();
  }

  // 2. Handling access to Admin Routes "/admin/*"
  if (pathname.startsWith("/admin")) {
    if (!token) {
      // Unauthenticated user attempting to access /admin -> REDIRECT IMMEDIATELY TO /login!
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET, {
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE,
      });
      // Valid session -> allow access to admin
      return NextResponse.next();
    } catch {
      // Invalid/expired token attempting to access /admin -> CLEAR COOKIES & REDIRECT TO /login!
      const response = NextResponse.redirect(new URL("/login", request.url));
      clearAuthCookies(response);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/admin/:path*"],
};
