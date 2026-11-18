import { NextResponse } from "next/server";
import { saveRSVP } from "@/lib/rsvp-store";
import type { RSVPData } from "@/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RSVPData;

    if (!body.name?.trim()) {
      return NextResponse.json(
        { error: "El nombre es requerido." },
        { status: 400 },
      );
    }

    if (
      body.attendance !== "attending" &&
      body.attendance !== "not_attending"
    ) {
      return NextResponse.json(
        { error: "Debe indicar si asistirá o no." },
        { status: 400 },
      );
    }

    if (body.attendance === "not_attending") {
      const entry = await saveRSVP({
        name: body.name.trim(),
        attendance: "not_attending",
      });
      return NextResponse.json({ success: true, id: entry.id });
    }

    if (typeof body.attendingWithPartner !== "boolean") {
      return NextResponse.json(
        { error: "Debe indicar si viene con pareja." },
        { status: 400 },
      );
    }
    if (body.attendingWithPartner && !body.partnerName?.trim()) {
      return NextResponse.json(
        { error: "El nombre de la pareja es requerido." },
        { status: 400 },
      );
    }
    if (!body.arrivalDate) {
      return NextResponse.json(
        { error: "La fecha de llegada es requerida." },
        { status: 400 },
      );
    }
    if (!body.phone?.trim()) {
      return NextResponse.json(
        { error: "El teléfono es requerido." },
        { status: 400 },
      );
    }

    const entry = await saveRSVP({
      name: body.name.trim(),
      attendance: "attending",
      phoneCountryCode: body.phoneCountryCode?.trim() || "+51",
      phone: body.phone.trim(),
      attendingWithPartner: body.attendingWithPartner,
      partnerName: body.attendingWithPartner
        ? body.partnerName?.trim()
        : undefined,
      arrivalDate: body.arrivalDate,
    });

    return NextResponse.json({ success: true, id: entry.id });
  } catch {
    return NextResponse.json(
      { error: "Error al guardar la confirmación." },
      { status: 500 },
    );
  }
}
