import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth";
import { hasValidOrigin } from "@/lib/request";

export async function POST(request: Request) {
  if (!hasValidOrigin(request)) {
    return NextResponse.json({ error: "Akses tidak diizinkan." }, { status: 401 });
  }

  await clearSessionCookie();
  return NextResponse.json({ success: true });
}
