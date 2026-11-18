import "server-only";
import { promises as fs } from "fs";
import path from "path";
import type { RSVPData, StoredRSVP } from "@/types";

const DATA_DIR = path.join(process.cwd(), "data");
const RSVP_FILE = path.join(DATA_DIR, "rsvps.json");

async function ensureDataFile(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(RSVP_FILE);
  } catch {
    await fs.writeFile(RSVP_FILE, "[]", "utf-8");
  }
}

export async function getAllRSVPsFromFile(): Promise<StoredRSVP[]> {
  await ensureDataFile();
  const content = await fs.readFile(RSVP_FILE, "utf-8");
  return JSON.parse(content) as StoredRSVP[];
}

export async function saveRSVPToFile(data: RSVPData): Promise<StoredRSVP> {
  await ensureDataFile();
  const rsvps = await getAllRSVPsFromFile();

  const entry: StoredRSVP = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  rsvps.push(entry);
  await fs.writeFile(RSVP_FILE, JSON.stringify(rsvps, null, 2), "utf-8");
  return entry;
}