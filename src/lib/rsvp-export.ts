import "server-only";
import * as XLSX from "xlsx";
import type { StoredRSVP } from "@/lib/rsvp-store";

function formatAttendance(attendance?: string): string {
  if (attendance === "attending") return "Asiste";
  if (attendance === "not_attending") return "No asiste";
  return "";
}

function formatPartner(attendingWithPartner?: boolean): string {
  if (attendingWithPartner === true) return "Sí";
  if (attendingWithPartner === false) return "No";
  return "";
}

export function buildRsvpExcelBuffer(rsvps: StoredRSVP[]): Buffer {
  const rows = rsvps.map((rsvp) => ({
    Nombre: rsvp.name,
    Asistencia: formatAttendance(rsvp.attendance),
    "Viene con pareja": formatPartner(rsvp.attendingWithPartner),
    "Nombre pareja": rsvp.partnerName ?? "",
    Teléfono:
      rsvp.phoneCountryCode && rsvp.phone
        ? `${rsvp.phoneCountryCode} ${rsvp.phone}`
        : "",
    "Fecha llegada Lima": rsvp.arrivalDate ?? "",
    "Confirmado el": new Date(rsvp.createdAt).toLocaleString("es-PE"),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "RSVPs");

  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" }) as Buffer;
}
