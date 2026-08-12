import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { createToken, setSessionCookie } from "@/lib/auth";
import { hasValidOrigin } from "@/lib/request";
import { clearLoginFailures, getLoginRateLimit, recordLoginFailure } from "@/lib/login-rate-limit";

const DUMMY_PASSWORD_HASH = "$2b$12$5hBDO43fzttoxi.tJf.0COl6JdQxbF4KHGeaKmuPnb0NyJh5QdopC";

export async function POST(request: Request) {
  try {
    if (!hasValidOrigin(request)) {
      return NextResponse.json({ error: "Akses tidak diizinkan." }, { status: 401 });
    }

    const { username, password } = await request.json();

    if (typeof username !== "string" || typeof password !== "string" || !username.trim() || !password) {
      return NextResponse.json(
        { error: "Username dan password wajib diisi." },
        { status: 400 }
      );
    }

    const normalizedUsername = username.trim().toLowerCase();
    const rateLimit = await getLoginRateLimit(request, normalizedUsername);
    if (rateLimit.blocked) {
      return NextResponse.json(
        { error: "Terlalu banyak percobaan login. Silakan coba lagi nanti." },
        { status: 429, headers: { "Retry-After": rateLimit.retryAfter.toString() } }
      );
    }

    const user = await db.user.findUnique({
      where: { username: normalizedUsername },
    });

    if (!user) {
      await bcrypt.compare(password, DUMMY_PASSWORD_HASH);
      await recordLoginFailure(request, normalizedUsername);
      return NextResponse.json(
        { error: "Username atau password salah." },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      await recordLoginFailure(request, normalizedUsername);
      return NextResponse.json(
        { error: "Username atau password salah." },
        { status: 401 }
      );
    }

    await clearLoginFailures(request, normalizedUsername);

    const token = await createToken({
      username: user.username,
      name: user.name,
    });

    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: { username: user.username, name: user.name },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server saat login." },
      { status: 500 }
    );
  }
}
