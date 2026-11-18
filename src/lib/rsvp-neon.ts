import "server-only";
import type { RSVPData, StoredRSVP } from "@/types";
import { getNeonSql } from "@/lib/neon";

type RsvpRow = {
  id: string;
  created_at: string | Date;
  name: string;
  attendance: string;
  attending_with_partner: boolean | null;
  partner_name: string | null;
  arrival_date: string | null;
  phone_country_code: string | null;
  phone: string | null;
};

function rowToStored(row: RsvpRow): StoredRSVP {
  const createdAt =
    row.created_at instanceof Date
      ? row.created_at.toISOString()
      : new Date(row.created_at).toISOString();

  return {
    id: row.id,
    createdAt,
    name: row.name,
    attendance: row.attendance as StoredRSVP["attendance"],
    attendingWithPartner: row.attending_with_partner ?? undefined,
    partnerName: row.partner_name ?? undefined,
    arrivalDate: row.arrival_date ?? undefined,
    phoneCountryCode: row.phone_country_code ?? undefined,
    phone: row.phone ?? undefined,
  };
}

export async function getAllRSVPsFromNeon(): Promise<StoredRSVP[]> {
  const sql = getNeonSql();
  const rows = await sql`
    SELECT
      id,
      created_at,
      name,
      attendance,
      attending_with_partner,
      partner_name,
      arrival_date,
      phone_country_code,
      phone
    FROM rsvps
    ORDER BY created_at DESC
  `;
  return (rows as RsvpRow[]).map(rowToStored);
}

export async function saveRSVPToNeon(data: RSVPData): Promise<StoredRSVP> {
  const sql = getNeonSql();
  const rows = await sql`
    INSERT INTO rsvps (
      name,
      attendance,
      attending_with_partner,
      partner_name,
      arrival_date,
      phone_country_code,
      phone
    )
    VALUES (
      ${data.name},
      ${data.attendance},
      ${data.attendingWithPartner ?? null},
      ${data.partnerName ?? null},
      ${data.arrivalDate ?? null},
      ${data.phoneCountryCode ?? null},
      ${data.phone ?? null}
    )
    RETURNING
      id,
      created_at,
      name,
      attendance,
      attending_with_partner,
      partner_name,
      arrival_date,
      phone_country_code,
      phone
  `;
  const row = (rows as RsvpRow[])[0];
  if (!row) {
    throw new Error("No se pudo guardar el RSVP en la base de datos.");
  }
  return rowToStored(row);
}