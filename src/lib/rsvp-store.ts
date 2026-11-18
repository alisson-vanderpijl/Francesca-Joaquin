import "server-only";
import type { RSVPData, StoredRSVP } from "@/types";
import { useNeonForRsvp } from "@/lib/neon";
import {
  getAllRSVPsFromFile,
  saveRSVPToFile,
} from "@/lib/rsvp-file";
import {
  getAllRSVPsFromNeon,
  saveRSVPToNeon,
} from "@/lib/rsvp-neon";

export type { StoredRSVP } from "@/types";

export async function getAllRSVPs(): Promise<StoredRSVP[]> {
  if (useNeonForRsvp()) {
    return getAllRSVPsFromNeon();
  }
  return getAllRSVPsFromFile();
}

export async function saveRSVP(data: RSVPData): Promise<StoredRSVP> {
  if (useNeonForRsvp()) {
    return saveRSVPToNeon(data);
  }
  return saveRSVPToFile(data);
}