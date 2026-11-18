import type { WeddingEvent } from "@/types";

/** El Itinerario page — editable independently from the wedding-day timeline on La Boda */
export const itineraryEvents: WeddingEvent[] = [
  {
    id: "itinerary-welcome",
    title: "Cocktail de bienvenida",
    date: "Jueves 1 de abril de 2027",
    time: "Por confirmar",
    location: "Por confirmar",
    address: "Dirección por confirmar",
    description:
      "Bebidas y aperitivos para dar la bienvenida a quienes lleguen antes del fin de semana de la boda.",
    additionalInfo:
      "[Información adicional placeholder — ej. vestimenta, estacionamiento, etc.]",
  },
  {
    id: "itinerary-1",
    title: "Ceremonia",
    date: "Sábado 3 de abril de 2027",
    time: "3:30 PM",
    location: "Templo Inmaculado Corazón de María",
    address: "Alameda La Encantada - Chorrillos, Lima",
    description: "",
    googleMapsUrl:
      "https://maps.google.com/?q=Templo+Inmaculado+Corazon+de+Maria+Alameda+La+Encantada+Chorrillos+Lima",
    additionalInfo:
      "[Información adicional placeholder — ej. código de vestimenta, estacionamiento, etc.]",
  },
  {
    id: "itinerary-2",
    title: "Cocktail",
    date: "Sábado 3 de abril de 2027",
    time: "5:30 PM",
    location: "Fundo Mamacona",
    address: "Parcela 3, Alameda Mamacona, Mamacona, Pachacamac",
    description: "",
    googleMapsUrl:
      "https://maps.google.com/?q=Fundo+Mamacona+Parcela+3+Alameda+Mamacona+Pachacamac",
    additionalInfo:
      "[Información adicional placeholder — ej. asientos reservados, acceso, etc.]",
  },
  {
    id: "itinerary-3",
    title: "Fiesta",
    date: "Sábado 3 de abril de 2027",
    time: "7:00 PM",
    location: "Fundo Mamacona",
    address: "Parcela 3, Alameda Mamacona, Mamacona, Pachacamac",
    description: "",
    googleMapsUrl:
      "https://maps.google.com/?q=Fundo+Mamacona+Parcela+3+Alameda+Mamacona+Pachacamac",
    additionalInfo:
      "[Información adicional placeholder — ej. horario de cena, mesas, etc.]",
  },
];
