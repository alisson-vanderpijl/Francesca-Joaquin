import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function getAdminSecret(): string {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "changeme";
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "changeme";
}

function signPayload(payload: string): string {
  return createHmac("sha256", getAdminSecret()).update(payload).digest("hex");
}

function createSessionToken(): string {
  const expiresAt = Date.now() + SESSION_MAX_AGE_MS;
  const payload = `${expiresAt}`;
  const signature = signPayload(payload);
  return `${payload}.${signature}`;
}

function verifySessionToken(token: string): boolean {
  const [expiresAtRaw, signature] = token.split(".");
  if (!expiresAtRaw || !signature) return false;

  const expected = signPayload(expiresAtRaw);
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (
    sigBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(sigBuffer, expectedBuffer)
  ) {
    return false;
  }

  const expiresAt = Number(expiresAtRaw);
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}

export function verifyAdminPassword(password: string): boolean {
  const expected = getAdminPassword();
  const inputBuffer = Buffer.from(password);
  const expectedBuffer = Buffer.from(expected);
  if (inputBuffer.length !== expectedBuffer.length) return false;
  return timingSafeEqual(inputBuffer, expectedBuffer);
}

export async function createAdminSession(): Promise<void> {
  const token = createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_MS / 1000,
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}
