import "server-only";
import { createHmac, timingSafeEqual, randomBytes, scrypt } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";

export const COOKIE = "shobon_admin";
const derive = promisify(scrypt);
export function authConfigured() {
  return (
    (process.env.ADMIN_PASSWORD?.length ?? 0) >= 16 &&
    (process.env.ADMIN_SESSION_SECRET?.length ?? 0) >= 32
  );
}
function signingKey() {
  if (!authConfigured())
    throw new Error("Admin authentication is not configured.");
  return createHmac("sha256", process.env.ADMIN_SESSION_SECRET!)
    .update(process.env.ADMIN_PASSWORD!)
    .digest();
}
function equal(a: string, b: string) {
  const x = Buffer.from(a),
    y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}
export async function verifyPassword(password: unknown) {
  if (
    !authConfigured() ||
    typeof password !== "string" ||
    password.length > 256
  )
    return false;
  const salt = randomBytes(16);
  const [a, b] = await Promise.all([
    derive(password, salt, 64),
    derive(process.env.ADMIN_PASSWORD!, salt, 64),
  ]);
  return timingSafeEqual(a as Buffer, b as Buffer);
}
export function issueSession() {
  const payload = Buffer.from(
    JSON.stringify({
      expires: Date.now() + 8 * 60 * 60 * 1000,
      nonce: randomBytes(24).toString("hex"),
    }),
  ).toString("base64url");
  return (
    payload +
    "." +
    createHmac("sha256", signingKey()).update(payload).digest("base64url")
  );
}
export function verifySession(token: string | undefined) {
  if (!token || !authConfigured() || token.length > 1024) return false;
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra) return false;
  if (
    !equal(
      signature,
      createHmac("sha256", signingKey()).update(payload).digest("base64url"),
    )
  )
    return false;
  try {
    const { expires } = JSON.parse(
      Buffer.from(payload, "base64url").toString(),
    );
    return (
      typeof expires === "number" &&
      expires > Date.now() &&
      expires <= Date.now() + 8 * 60 * 60 * 1000
    );
  } catch {
    return false;
  }
}
export async function authenticated() {
  return verifySession((await cookies()).get(COOKIE)?.value);
}
export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const incoming = new URL(request.url);
    const source = new URL(origin);
    const host = request.headers.get("host") ?? incoming.host;
    return (
      origin === source.origin &&
      source.host === host &&
      source.protocol === incoming.protocol
    );
  } catch {
    return false;
  }
}
export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge: 8 * 60 * 60,
};
// Per-instance throttling; the strong password and HMAC session remain mandatory.
const attempts = new Map<string, { count: number; expires: number }>();
export function allowLogin(request: Request) {
  const key =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for")?.split(",")[0] ??
    "local";
  const now = Date.now();
  for (const [k, v] of attempts) if (v.expires <= now) attempts.delete(k);
  if (attempts.size > 10000) return false;
  const entry = attempts.get(key) ?? {
    count: 0,
    expires: now + 15 * 60 * 1000,
  };
  entry.count++;
  attempts.set(key, entry);
  return entry.count <= 5;
}
