import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { buildRsvpExcelBuffer } from "@/lib/rsvp-export";
import { getAllRSVPs } from "@/lib/rsvp-store";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const rsvps = await getAllRSVPs();
  const buffer = buildRsvpExcelBuffer(rsvps);

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="rsvps.xlsx"',
    },
  });
}
