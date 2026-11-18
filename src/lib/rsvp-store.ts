import { promises as fs } from "fs";
import path from "path";
import type { RSVPData } from "@/types";

const DATA_DIR = path.join(process.cwd(), "data");
const RSVP_FILE = path.join(DATA_DIR, "rsvps.json");

export type StoredRSVP = RSVPData & {
  id: string;
  createdAt: string;
};

async function ensureDataFile(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(RSVP_FILE);
  } catch {
    await fs.writeFile(RSVP_FILE, "[]", "utf-8");
  }
}

export async function getAllRSVPs(): Promise<StoredRSVP[]> {
  await ensureDataFile();
  const content = await fs.readFile(RSVP_FILE, "utf-8");
  return JSON.parse(content) as StoredRSVP[];
}

export async function saveRSVP(data: RSVPData): Promise<StoredRSVP> {
  await ensureDataFile();
  const rsvps = await getAllRSVPs();

  const entry: StoredRSVP = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  rsvps.push(entry);
  await fs.writeFile(RSVP_FILE, JSON.stringify(rsvps, null, 2), "utf-8");
  return entry;
}
