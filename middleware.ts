import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "sdn-danabhakti-super-secret-key-2026"
);

function clearAuthCookies(response: NextResponse) {
  response.cookies.set("admin_session", "", {
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });
  response.cookies.set("last_admin_activity", "", {
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });
  response.cookies.delete("admin_session");
  response.cookies.delete("last_admin_activity");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("admin_session")?.value;

  // 1. Handling access to Login Page "/login"
  if (pathname === "/login") {
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
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
      await jwtVerify(token, JWT_SECRET);
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
