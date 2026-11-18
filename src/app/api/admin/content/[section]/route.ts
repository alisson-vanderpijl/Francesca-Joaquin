import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import type { ContentSection } from "@/lib/content-types";
import {
  getContentSection,
  saveContentSection,
} from "@/lib/content-store";

const VALID_SECTIONS = new Set<ContentSection>([
  "itinerary-events",
  "wedding-events",
]);

type RouteContext = {
  params: Promise<{ section: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { section } = await context.params;

  if (!VALID_SECTIONS.has(section as ContentSection)) {
    return NextResponse.json({ error: "Sección no válida" }, { status: 400 });
  }

  const data = await getContentSection(section as ContentSection);
  return NextResponse.json(data);
}

export async function PUT(request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { section } = await context.params;

  if (!VALID_SECTIONS.has(section as ContentSection)) {
    return NextResponse.json({ error: "Sección no válida" }, { status: 400 });
  }

  try {
    const body = await request.json();
    await saveContentSection(section as ContentSection, body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}
