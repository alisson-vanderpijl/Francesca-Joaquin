import type { WeddingEvent } from "@/types";

/** Mock data — replace with real wedding details before launch */
export const weddingEvents: WeddingEvent[] = [
  {
    id: "event-1",
    title: "Ceremonia",
    date: "[Fecha placeholder]",
    time: "4:00 PM",
    location: "[Nombre del lugar placeholder, Lima]",
    address: "[Dirección placeholder, Lima]",
    description:
      "Descripción placeholder. Bebidas y aperitivos para dar la bienvenida a nuestros invitados.",
    additionalInfo:
      "[Información adicional placeholder — ej. código de vestimenta, estacionamiento, etc.]",
  },
  {
    id: "event-2",
    title: "Cóctel",
    date: "[Fecha placeholder]",
    time: "6:00 PM",
    location: "[Nombre del lugar placeholder, Lima]",
    address: "[Dirección placeholder, Lima]",
    description:
      "Descripción placeholder. Ceremonia religiosa / civil. Se recomienda llegar 30 minutos antes.",
    additionalInfo:
      "[Información adicional placeholder — ej. asientos reservados, acceso, etc.]",
  },
  {
    id: "event-3",
    title: "Fiesta",
    date: "[Fecha placeholder]",
    time: "8:00 PM",
    location: "[Nombre del lugar placeholder, Lima]",
    address: "[Dirección placeholder, Lima]",
    description:
      "Descripción placeholder. Cena, brindis y baile para celebrar juntos.",
    additionalInfo:
      "[Información adicional placeholder — ej. horario de cena, mesas, etc.]",
  },
];
