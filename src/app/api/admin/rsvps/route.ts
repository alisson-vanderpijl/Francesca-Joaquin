import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { getAllRSVPs } from "@/lib/rsvp-store";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const rsvps = await getAllRSVPs();
  return NextResponse.json(rsvps);
}
