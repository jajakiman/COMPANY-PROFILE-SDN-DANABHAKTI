import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth";

export async function POST() {
  await clearSessionCookie();
  const response = NextResponse.json({ success: true });
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
  return response;
}
