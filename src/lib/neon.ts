import "server-only";
import { neon } from "@neondatabase/serverless";

export function getDatabaseUrl(): string | undefined {
  const url = process.env.DATABASE_URL?.trim();
  return url || undefined;
}

export function useNeonForRsvp(): boolean {
  return Boolean(getDatabaseUrl());
}

export function getNeonSql() {
  const url = getDatabaseUrl();
  if (!url) {
    throw new Error("DATABASE_URL no está configurada.");
  }
  return neon(url);
}