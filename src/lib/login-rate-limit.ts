import { createHash } from "crypto";
import { db } from "@/lib/db";

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const BLOCK_MS = 15 * 60 * 1000;

function hash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function getClientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function keysFor(request: Request, username: string) {
  return [`ip:${hash(getClientIp(request))}`, `user:${hash(username.toLowerCase())}`];
}

export async function getLoginRateLimit(request: Request, username: string) {
  const now = new Date();
  const attempts = await db.loginAttempt.findMany({
    where: { key: { in: keysFor(request, username) } },
  });
  const blocked = attempts.find((attempt) => attempt.blockedUntil && attempt.blockedUntil > now);

  return {
    blocked: Boolean(blocked),
    retryAfter: blocked
      ? Math.max(1, Math.ceil((blocked.blockedUntil!.getTime() - now.getTime()) / 1000))
      : 0,
  };
}

export async function recordLoginFailure(request: Request, username: string) {
  const now = new Date();
  const windowThreshold = new Date(now.getTime() - WINDOW_MS);
  const blockedUntil = new Date(now.getTime() + BLOCK_MS);

  for (const key of keysFor(request, username)) {
    await db.$executeRaw`
      INSERT INTO "LoginAttempt" ("key", "count", "windowStart", "blockedUntil", "updatedAt")
      VALUES (${key}, 1, ${now}, NULL, ${now})
      ON CONFLICT ("key") DO UPDATE SET
        "count" = CASE
          WHEN "LoginAttempt"."windowStart" < ${windowThreshold} THEN 1
          ELSE "LoginAttempt"."count" + 1
        END,
        "windowStart" = CASE
          WHEN "LoginAttempt"."windowStart" < ${windowThreshold} THEN ${now}
          ELSE "LoginAttempt"."windowStart"
        END,
        "blockedUntil" = CASE
          WHEN "LoginAttempt"."windowStart" < ${windowThreshold} THEN NULL
          WHEN "LoginAttempt"."count" + 1 >= ${MAX_ATTEMPTS} THEN ${blockedUntil}
          ELSE "LoginAttempt"."blockedUntil"
        END,
        "updatedAt" = ${now}
    `;
  }
}

export async function clearLoginFailures(request: Request, username: string) {
  await db.loginAttempt.deleteMany({ where: { key: { in: keysFor(request, username) } } });
}
