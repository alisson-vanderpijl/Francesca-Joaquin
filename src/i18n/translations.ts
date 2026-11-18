import { deepMerge } from "@/lib/deep-merge";
import { enRestaurantOverrides } from "./en-restaurant-overrides";
import type { Locale } from "./types";

const es = {
  onboarding: {
    continueInSpanish: "Continuar en Español",
    continueInEnglish: "English",
    rsvpStatusQuestion: "¿Ya registraste tu asistencia?",
    rsvpYes: "Sí",
    rsvpNo: "No",
    guideIntroTitle: "¡Qué alegría celebrar juntos este día tan especial!",
    guideIntroMessage:
      "Estamos muy felices de celebrar este momento con personas tan importantes para nosotros.",
    guideIntroMessageSecond:
      "Hemos preparado esta guía con mucho cariño para que disfruten al máximo de la celebración y puedan descubrir Perú durante la estadía.",
    guideIntroCta: "Entrar a la guía",
    guideIntroSignoff: "Con cariño,",
  },
  nav: {
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    ourWedding: "Nuestra boda",
    ourWeddingDesc:
      "Información que necesitan para participar en nuestra celebración.",
    guestGuide: "Guía para invitados",
    guestGuideDesc:
      "Información para aprovechar su viaje y estadía en Lima y Perú.",
    itinerary: "El Itinerario",
    wedding: "La Boda",
    giftRegistry: "Lista de regalos",
    stay: "Hoteles",
    eatDrink: "Gastronomía",
    getReady: "Dónde arreglarse",
    health: "Salud y emergencias",
    practicalInfo: "Información práctica",
    exploreLima: "Explorar Lima",
    explorePeru: "Explorar Perú",
    map: "Mapa interactivo",
  },
  pageHeaders: {
    stay: {
      title: "Hospedaje",
      subtitle:
        "Para facilitar su estancia, hemos reservado bloques de habitaciones con tarifas especiales en 2 hoteles y les sugerimos un tercer hotel también recomendado pero con tarifas un poco más económicas. A continuación, encontrará los detalles de cada opción disponible. Para confirmar su reserva, le rogamos que se ponga en contacto directamente con el hotel de su elección. Una vez completado el proceso, le agradeceríamos que nos enviara un correo electrónico con las fechas de su estancia y el nombre del hotel donde se aloja. Quedamos a su disposición para cualquier consulta adicional.",
    },
    eatDrink: {
      title: "Gastronomía",
      subtitle:
        "Reservar con anticipación es muy recomendable en los restaurantes más populares de Lima, especialmente para cena y fines de semana.",
    },
    getReady: {
      title: "Dónde arreglarse",
      subtitle:
        "Salones, spas y barberías para arreglarse antes del matrimonio. Reserva con anticipación.",
    },
    health: {
      title: "Salud y emergencias",
      subtitle:
        "Contactos de confianza para emergencias médicas, farmacias y hospitales cerca de Miraflores y San Isidro.",
    },
    practicalInfo: {
      title: "Información práctica",
      subtitle:
        "Moneda, clima, electricidad y otros datos útiles para disfrutar Lima con tranquilidad.",
    },
    exploreLima: {
      title: "Explora Lima",
      subtitle:
        "Actividades y lugares imperdibles en la capital peruana — desde el centro histórico hasta los distritos costeros.",
    },
    explorePeru: {
      title: "Explorar Perú",
      subtitle:
        "Si tienes tiempo extra, Perú ofrece algunos de los destinos más extraordinarios del mundo. Estas son sugerencias para extender tu viaje.",
    },
    map: {
      title: "Mapa",
      subtitle:
        "Hemos preparado un mapa con todos los lugares recomendados en esta guía — hoteles, restaurantes, salones y puntos de interés en Lima.",
    },
  },
  cardLabels: {
    address: "Dirección",
    phone: "Teléfono",
    roomRate: "Tarifas",
    visitWebsite: "Visitar sitio web",
    viewAirbnb: "Ver en Airbnb",
    googleMaps: "Google Maps →",
    location: "Ubicación",
    minDurationPrefix: "Mín.",
    day: "día",
    days: "días",
    phonePlaceholder: "[Placeholder — teléfono]",
    lodgingFoundOne: "alojamiento encontrado",
    lodgingFoundMany: "alojamientos encontrados",
  },
  mapPage: {
    placeholderLabel: "Placeholder — Mapa interactivo de Lima con lugares recomendados",
    openMaps: "Abrir Google Maps",
    downloadMap: "Descargar mapa",
    adminHint: "Configura la URL de Google Maps en el panel de administración.",
  },
  eatDrinkPage: {
    filters: {
      district: "Distrito",
      cuisine: "Tipo de comida",
      ambiance: "Ambiente",
      all: "Todos",
      quickFilters: "Filtros rápidos",
      foundOne: "restaurante encontrado",
      foundMany: "restaurantes encontrados",
      empty: "No hay restaurantes que coincidan con los filtros seleccionados.",
    },
    tagLabels: {} as Record<string, string>,
    restaurantOverrides: {} as Record<string, { description: string }>,
  },
  footer: {
    rsvp: "RSVP",
    guide: "Guía",
  },
  rsvp: {
    back: "← Volver",
    label: "RSVP",
    title: "Confirmar asistencia",
    intro:
      "Por favor completa el formulario para que podamos preparar todo para tu llegada a Lima.",
    attendanceQuestion: "¿Podrás acompañarnos?",
    attendingYes: "Sí, asistiré",
    attendingNo: "No podré asistir",
    fullName: "Nombre completo",
    fullNamePlaceholder: "Tu nombre completo",
    partnerQuestion: "¿Vienes con pareja?",
    partnerYes: "Sí",
    partnerNo: "No",
    partnerName: "Nombre completo de tu pareja",
    partnerNamePlaceholder: "Nombre de tu pareja",
    phone: "Teléfono",
    phoneCountryCode: "Código de país",
    phonePlaceholder: "Tu número de teléfono",
    arrivalDate: "Fecha de llegada a Lima",
    submit: "Registrar asistencia",
    submitting: "Registrando...",
    errors: {
      nameRequired: "Por favor ingresa tu nombre completo.",
      attendanceRequired: "Por favor indica si podrás acompañarnos.",
      partnerRequired: "Por favor indica si vienes con pareja.",
      partnerNameRequired: "Por favor ingresa el nombre de tu pareja.",
      phoneRequired: "Por favor ingresa tu número de teléfono.",
      arrivalRequired: "Por favor selecciona tu fecha de llegada a Lima.",
      submitFailed: "Error al confirmar asistencia.",
      unexpected: "Error inesperado.",
    },
    confirmed: {
      label: "RSVP",
      attendingTitle: "¡Gracias! Nos vemos en Lima.",
      attendingMessage:
        "Hemos recibido tu confirmación. Explora la guía para planificar tu viaje.",
      attendingCta: "Ir a la guía",
      notAttendingTitle: "Gracias por hacérnoslo saber ❤️",
      notAttendingMessage:
        "Nos hubiera encantado celebrar este día contigo. Aunque no puedas acompañarnos, nos alegra mucho saber que estarás con nosotros de corazón.",
      continue: "Continuar",
      leaveMessage: "Déjanos un mensaje",
    },
  },
  guide: {
    landing: {
      label: "Francesca & Joaquín",
      subtitleLead:
        "¡Estamos muy felices de poder compartir este día tan especial con ustedes!",
      subtitleRest:
        "Aquí encontrarán todos los detalles para acompañarnos en nuestro gran día, además de una guía que hemos preparado con mucho cariño para que aprovechen al máximo su estadía y disfruten de Lima y Perú.",
      ourWeddingTitle: "Nuestra boda",
      ourWeddingDesc:
        "Itinerario, detalles prácticos y todo lo que necesitan para la celebración.",
      guestGuideTitle: "Tu viaje",
      guestGuideDesc:
        "Hospedaje, restaurantes, actividades y recomendaciones para su estadía.",
      menuHint: "Explore el menú para acceder a todas las secciones.",
      explore: "Ver más",
      countdown: {
        label: "Faltan",
        days: "días",
        hours: "hrs",
        minutes: "min",
        seconds: "seg",
        today: "¡Hoy es el gran día!",
      },
    },
  },
  explorePeruPage: {
    travelAgenciesTitle: "Agencias de viajes",
    travelAgenciesSubtitle:
      "Agencias recomendadas para organizar excursiones y extensiones de tu viaje por Perú.",
    placeOverrides: {},
  },
  stayPage: {
    hotelOverrides: {},
    chooseWhereToStayTitle: "Cómo elegir dónde hospedarte",
    chooseWhereToStaySubtitle:
      "Estos tres distritos son los más recomendados para invitados internacionales — cada uno con un estilo distinto.",
    districts: [
      {
        name: "San Isidro",
        description:
          "Zona residencial y de negocios, tranquila y segura. Ideal si prefieres un ambiente más calmado, con buenos restaurantes y parques como El Olivar.",
      },
      {
        name: "Miraflores",
        description:
          "El distrito turístico por excelencia, junto al mar. Malecón, Larcomar y muchos hoteles y restaurantes — perfecto si es tu primera vez en Lima.",
      },
      {
        name: "Barranco",
        description:
          "Barrio bohemio con arte, música y arquitectura colonial. Ambiente más local y creativo, cerca del mar — ideal si buscas algo con carácter.",
      },
    ],
  },
  getReadyPage: {
    atHomeTitle: "Maquilladores y peinadores a domicilio",
    atHomeSubtitle:
      "Profesionales que van a tu hotel o alojamiento el día del evento. Contáctalos con anticipación para reservar.",
    servicesLabel: "Servicios",
    phoneLabel: "Teléfono",
    placeOverrides: {},
  },
  healthPage: {
    emergencyTitle: "Emergencia médica",
    emergencyLine: "Alerta Médica: +511 4166777 (abierto 24 h)",
    pharmaciesTitle: "Farmacias",
    pharmaciesIntro:
      "Ambas cadenas tienen múltiples locales en Miraflores y San Isidro, y muchas ofrecen delivery.",
    pharmacies: [
      {
        name: "InkaFarma",
        websiteUrl: "https://inkafarma.pe",
        websiteLabel: "inkafarma.pe",
        phone: "+511 314 2020",
      },
      {
        name: "Mi Farma",
        websiteUrl: "https://www.mifarma.com.pe",
        websiteLabel: "mifarma.com.pe",
        phone: "+511 612 5000",
      },
    ],
    hospitalsTitle: "Hospitales",
    phoneLabel: "Teléfono",
    websiteLabel: "Sitio web",
    addressLabel: "Dirección",
    hospitals: [
      {
        name: "Clínica Anglo Americana",
        websiteUrl: "https://clinicaangloamericana.pe/",
        websiteLabel: "clinicaangloamericana.pe",
        address: "Alfredo Salazar 350, San Isidro",
        phone: "+511 616 8900",
      },
      {
        name: "Clínica El Golf (SANNA)",
        websiteUrl: "https://sanna.pe/clinicas/el-golf-lima/",
        websiteLabel: "sanna.pe",
        address: "Aurelio Miro Quesada 1030, San Isidro",
        phone: "+511 635 5000",
      },
      {
        name: "Clínica Delgado (AUNA)",
        websiteUrl: "https://clinicadelgado.pe/",
        websiteLabel: "clinicadelgado.pe",
        address: "Esquina Av. Angamos con Gral. Borgoño, Miraflores",
        phone: "+511 377 7000",
      },
    ],
  },
  practicalInfoPage: {
    topics: [
      {
        id: "currency",
        title: "Moneda",
        body: "La moneda local es el sol peruano (PEN). Las tarjetas de crédito se aceptan ampliamente en hoteles, restaurantes y comercios.",
      },
      {
        id: "tipping",
        title: "Propinas",
        body: "Es habitual dejar un 10 % en restaurantes si el servicio no está ya incluido.",
      },
      {
        id: "water",
        title: "Agua",
        body: "Recomendamos beber agua embotellada o filtrada durante su estadía.",
      },
      {
        id: "food",
        title: "Comida",
        body: "Lima tiene una escena gastronómica excepcional. En los restaurantes más populares conviene reservar con anticipación, especialmente para cena y fines de semana.",
      },
      {
        id: "electricity",
        title: "Electricidad",
        body: "En Perú la electricidad es de 220 V. Los enchufes tipo A y C son los más comunes.",
      },
      {
        id: "getting-around",
        title: "Desplazarse",
        body: "El tráfico en Lima puede ser intenso, sobre todo en hora punta entre semana. Calcule tiempo extra al moverse entre distritos.",
      },
      {
        id: "weather",
        title: "Clima — principios de abril",
        body: "A principios de abril Lima suele ser templada y agradable, con temperaturas diurnas de unos 23–25 °C (73–77 °F) y noches más frescas de 18–20 °C (64–68 °F). La lluvia es poco frecuente, aunque puede haber humedad y las noches junto al costa resultan más frescas.\n\nRecomendamos ropa ligera durante el día y llevar una chaqueta ligera, chal o pareo para la noche, sobre todo en eventos al aire libre.",
      },
    ],
  },
  exploreLimaPage: {
    transportTitle: "Transporte",
    transportSubtitle:
      "Consejos para llegar al aeropuerto y moverte por la ciudad durante tu visita a Lima.",
    transportCardTitle: "Aeropuerto",
    transportCardDescription:
      "Para llegadas y salidas, recomendamos traslados del hotel o taxis oficiales dentro de la terminal.",
    transportCardNote: "Taxi Lima Airport: +51 993 665 563",
    avoidPublicTransportTitle: "En la ciudad",
    avoidPublicTransportDescription:
      "Uber y Cabify (app) son opciones habituales para moverse entre distritos.",
    avoidPublicTransportNote:
      "Como en cualquier gran ciudad, mantén tus pertenencias contigo y evita mostrar objetos de valor.",
    placeOverrides: {},
    shoppingSection: {
      title: "Compras y diseño peruano",
      subtitle:
        "Tiendas y mercados para descubrir artesanía, moda y diseño hecho en Perú.",
      addressLabel: "Dirección",
      visitWebsiteLabel: "Visitar sitio web",
      spots: [
        {
          id: "dedalo",
          name: "Dédalo",
          district: "Barranco",
          imageLabel: "Dédalo",
          imageUrl: "/Images/shopping-dedalo.jpg",
          description:
            "Diseño peruano, artesanía, objetos para el hogar y regalos.",
          address: "Av. Sáenz Peña 295, Barranco",
        },
        {
          id: "indian-market",
          name: "Indian Market",
          district: "Miraflores",
          imageLabel: "Indian Market",
          imageUrl: "/Images/shopping-indian-market.png",
          description: "Artesanía tradicional peruana y recuerdos.",
          address: "Av. Petit Thouars 5200, Miraflores",
        },
        {
          id: "larcomar",
          name: "Larcomar",
          district: "Miraflores",
          imageLabel: "Larcomar",
          imageUrl: "/Images/Miraflores.jpg",
          description:
            "Visita KUNA, Sol Alpaca y Anntarah para ropa y accesorios de alpaca de alta calidad.",
          address: "Malecón de la Reserva 610, Miraflores",
        },
      ],
      miguelDassoTitle: "Miguel Dasso — San Isidro",
      miguelDassoIntro:
        "Boutiques, cafés y restaurantes en una de las zonas comerciales más agradables de Lima:",
      boutiques: [
        {
          id: "the-hanger",
          name: "The Hanger",
          tagline: "Concept Store",
          imageLabel: "The Hanger",
          description:
            "Selección curada de moda, accesorios y lifestyle de marcas locales e internacionales.",
          address: "Calle Miguel Dasso 198, San Isidro",
          websiteUrl: "https://www.instagram.com/thehangerlima/",
        },
        {
          id: "roxana-pardo",
          name: "Roxana Pardo",
          tagline: "Accesorios artesanales",
          imageLabel: "Roxana Pardo",
          description:
            "Aretes, pulseras, collares y piezas de autoría de una diseñadora peruana.",
          address: "Calle Miguel Dasso 140, San Isidro",
          websiteUrl: "https://roxanapardo.com",
        },
        {
          id: "isidra",
          name: "Isidra",
          tagline: "Boutique de moda femenina",
          imageLabel: "Isidra",
          description:
            "Ropa y accesorios para mujer con un estilo femenino y contemporáneo.",
          address: "Calle Miguel Dasso 182, San Isidro",
        },
        {
          id: "ecru",
          name: "Ecru",
          tagline: "Boutique de moda y lifestyle",
          imageLabel: "Ecru",
          description:
            "Selección cuidada de ropa, accesorios y piezas de lifestyle con estética limpia y actual.",
          address: "Calle Miguel Dasso 160, of. 302, San Isidro",
          websiteUrl: "https://ecru.pe",
        },
      ],
    },
  },
  itinerary: {
    title: "El Itinerario",
    subtitle:
      "Calendario de eventos de nuestra boda. Los detalles definitivos se actualizarán próximamente.",
    additionalInfo: "Información adicional",
  },
  wedding: {
    title: "La Boda",
    subtitle:
      "Todo lo que necesitan saber para acompañarnos en este día tan especial.",
    timeline: {
      title: "Itinerario",
      subtitle: "Calendario de eventos de nuestra celebración.",
    },
    generalInfo: {
      title: "Información sobre la boda",
      content:
        "Estamos muy felices de compartir este momento con ustedes. Aquí encontrarán la información práctica para disfrutar de la celebración con tranquilidad. [Placeholder — agregar detalles generales del evento, ubicación principal, contacto de coordinación, etc.]",
      dateLabel: "Fecha",
      datePlaceholder: "[Placeholder — actualizar con fecha real]",
    },
    howToGetThere: {
      title: "Cómo llegar",
      mapLabel: "Placeholder — Mapa con ubicación del evento",
      mapEmbedTitle: "Fundo Mamacona — Pachacámac",
      transportQuestion: "¿Necesitas transporte?",
    },
    dressCode: {
      title: "Dress Code",
      intro:
        "Queremos que se sientan elegantes y cómodos. A continuación, algunas referencias para la ceremonia y la recepción.",
      women: {
        title: "Para mujeres",
        description:
          "Vestido largo de color entero. Evitar estampados, blanco, marfil y tonos similares al blanco.",
        imageLabel: "Placeholder — Referencia vestimenta mujeres",
      },
      men: {
        title: "Para hombres",
        description:
          "Terno y corbata. Vestimenta formal.",
        imageLabel: "Placeholder — Referencia vestimenta hombres",
      },
    },
    transport: {
      title: "Información Adicional",
      intro:
        "Queremos que disfruten de la celebración sin preocupaciones. Hemos organizado diferentes opciones de transporte para que puedan regresar de manera segura.",
      designatedDrivers: {
        title: "Choferes de reemplazo",
        description:
          "Contaremos con choferes de reemplazo para que puedan disfrutar de la celebración sin preocuparse por conducir.",
        note: "[Placeholder — horarios, punto de encuentro y contacto]",
      },
      taxi: {
        title: "Taxis",
        description:
          "Tendremos servicio de taxi disponible para facilitar el regreso de los invitados al finalizar la celebración.",
        note: "[Placeholder — proveedor, teléfono y horarios]",
      },
      buses: {
        title: "Buses",
        description:
          "Tendremos diferentes buses que saldrán desde distintos puntos de Lima para llevar a los invitados al evento.",
        note: "[Placeholder — puntos de salida, horarios y rutas]",
      },
    },
  },
  giftRegistry: {
    title: "Lista de regalos",
    description:
      "Si desean hacernos un regalo, pueden encontrar nuestra lista aquí.",
    cta: "Ver lista de regalos",
    externalNote: "Se abre en una plataforma externa",
  },
} as const;

const en = {
  onboarding: {
    continueInSpanish: "Continuar en Español",
    continueInEnglish: "English",
    rsvpStatusQuestion: "Have you already RSVP'd?",
    rsvpYes: "Yes",
    rsvpNo: "No",
    guideIntroTitle: "What a joy to celebrate this special day together!",
    guideIntroMessage:
      "We're so happy to celebrate this moment with people who mean so much to us.",
    guideIntroMessageSecond:
      "We've prepared this guide with so much love for you to enjoy the celebration to the fullest and discover Peru during your stay.",
    guideIntroCta: "Enter the guide",
    guideIntroSignoff: "With love,",
  },
  nav: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    ourWedding: "Our Wedding",
    ourWeddingDesc:
      "Everything you need to join us for our celebration.",
    guestGuide: "Guest Guide",
    guestGuideDesc:
      "Information to make the most of your trip and stay in Lima and Peru.",
    itinerary: "The Itinerary",
    wedding: "The Wedding",
    giftRegistry: "Gift Registry",
    stay: "Hotels",
    eatDrink: "Gastronomy",
    getReady: "Get Ready",
    health: "Health & Emergencies",
    practicalInfo: "Practical Information",
    exploreLima: "Explore Lima",
    explorePeru: "Explore Peru",
    map: "Interactive map",
  },
  pageHeaders: {
    stay: {
      title: "Accommodation",
      subtitle:
        "To make your stay easier, we have reserved room blocks at special rates at two hotels and suggest a third recommended option at a more economical price point. Below you will find details for each available option. To confirm your reservation, please contact your chosen hotel directly. Once you have completed the process, we would appreciate an email with your stay dates and the name of the hotel where you are staying. We are happy to help with any questions.",
    },
    eatDrink: {
      title: "Gastronomy",
      subtitle:
        "Booking ahead is highly recommended at Lima's most popular restaurants, especially for dinner and weekends.",
    },
    getReady: {
      title: "Get Ready",
      subtitle:
        "Salons, spas, and barbershops to get ready before the wedding. Book in advance.",
    },
    health: {
      title: "Health & Emergencies",
      subtitle:
        "Trusted contacts for medical emergencies, pharmacies, and hospitals near Miraflores and San Isidro.",
    },
    practicalInfo: {
      title: "Practical Information",
      subtitle:
        "Currency, weather, electricity, and other useful details for enjoying Lima with peace of mind.",
    },
    exploreLima: {
      title: "Explore Lima",
      subtitle:
        "Must-see activities and places in the Peruvian capital — from the historic centre to the coastal districts.",
    },
    explorePeru: {
      title: "Explore Peru",
      subtitle:
        "If you have extra time, Peru offers some of the most extraordinary destinations in the world. Here are suggestions to extend your trip.",
    },
    map: {
      title: "Map",
      subtitle:
        "We have prepared a map with all the recommended places in this guide — hotels, restaurants, salons, and points of interest in Lima.",
    },
  },
  cardLabels: {
    address: "Address",
    phone: "Phone",
    roomRate: "Rates",
    visitWebsite: "Visit website",
    viewAirbnb: "View on Airbnb",
    googleMaps: "Google Maps →",
    location: "Location",
    minDurationPrefix: "Min.",
    day: "day",
    days: "days",
    phonePlaceholder: "[Placeholder — phone number]",
    lodgingFoundOne: "property found",
    lodgingFoundMany: "properties found",
  },
  mapPage: {
    placeholderLabel: "Placeholder — Interactive map of Lima with recommended places",
    openMaps: "Open Google Maps",
    downloadMap: "Download map",
    adminHint: "Set the Google Maps URL in the admin panel.",
  },
  eatDrinkPage: {
    filters: {
      district: "District",
      cuisine: "Cuisine",
      ambiance: "Ambiance",
      all: "All",
      quickFilters: "Quick filters",
      foundOne: "restaurant found",
      foundMany: "restaurants found",
      empty: "No restaurants match the selected filters.",
    },
    tagLabels: {
      Mariscos: "Seafood",
      Peruana: "Peruvian",
      Internacional: "International",
      Italiana: "Italian",
      Japonesa: "Japanese",
      Nikkei: "Nikkei",
      Parrilla: "Grill",
      Bar: "Bar",
      Cafetería: "Café",
      Heladería: "Ice cream",
      Casual: "Casual",
      Romántico: "Romantic",
      "Fine dining": "Fine dining",
      Miraflores: "Miraflores",
      Barranco: "Barranco",
      "San Isidro": "San Isidro",
      Surquillo: "Surquillo",
      "Pueblo Libre": "Pueblo Libre",
      "La Molina": "La Molina",
      Otros: "Other",
    },
    restaurantOverrides: enRestaurantOverrides,
  },
  footer: {
    rsvp: "RSVP",
    guide: "Guide",
  },
  rsvp: {
    back: "← Back",
    label: "RSVP",
    title: "Confirm your attendance",
    intro:
      "Please complete the form so we can prepare everything for your arrival in Lima.",
    attendanceQuestion: "Will you be joining us?",
    attendingYes: "Yes, I'll be there",
    attendingNo: "Unfortunately, I won't be able to attend",
    fullName: "Full name",
    fullNamePlaceholder: "Your full name",
    partnerQuestion: "Are you bringing a partner?",
    partnerYes: "Yes",
    partnerNo: "No",
    partnerName: "Partner's full name",
    partnerNamePlaceholder: "Your partner's name",
    phone: "Phone",
    phoneCountryCode: "Country code",
    phonePlaceholder: "Your phone number",
    arrivalDate: "Arrival date in Lima",
    submit: "Register attendance",
    submitting: "Registering...",
    errors: {
      nameRequired: "Please enter your full name.",
      attendanceRequired: "Please let us know if you'll be joining us.",
      partnerRequired: "Please indicate if you're bringing a partner.",
      partnerNameRequired: "Please enter your partner's name.",
      phoneRequired: "Please enter your phone number.",
      arrivalRequired: "Please select your arrival date in Lima.",
      submitFailed: "Failed to confirm attendance.",
      unexpected: "Unexpected error.",
    },
    confirmed: {
      label: "RSVP",
      attendingTitle: "Thank you! See you in Lima.",
      attendingMessage:
        "We've received your confirmation. Explore the guide to plan your trip.",
      attendingCta: "Go to the guide",
      notAttendingTitle: "Thank you for letting us know ❤️",
      notAttendingMessage:
        "We would have loved to celebrate this day with you, but we completely understand. Thank you for being part of this special moment in our lives, even from afar.",
      continue: "Continue",
      leaveMessage: "Leave us a message",
    },
  },
  guide: {
    landing: {
      label: "Francesca & Joaquín",
      subtitleLead:
        "We're so happy to share this special day with you!",
      subtitleRest:
        "Here you'll find all the details to join us on our big day, plus a guide we've prepared with love to help you make the most of your stay and enjoy Lima and Peru.",
      ourWeddingTitle: "Our wedding",
      ourWeddingDesc:
        "Itinerary, practical details, and everything you need for the celebration.",
      guestGuideTitle: "Your trip",
      guestGuideDesc:
        "Accommodation, restaurants, activities, and recommendations for your stay.",
      menuHint: "Explore the menu to access all sections.",
      explore: "See more",
      countdown: {
        label: "Countdown",
        days: "days",
        hours: "hrs",
        minutes: "min",
        seconds: "sec",
        today: "Today's the big day!",
      },
    },
  },
  explorePeruPage: {
    travelAgenciesTitle: "Travel agencies",
    travelAgenciesSubtitle:
      "Recommended agencies to help plan extensions and tours across Peru.",
    placeOverrides: {
      "peru-cusco": {
        name: "Cusco & Machu Picchu",
        description:
          "Inca history, the Sacred Valley, and one of the Seven Wonders of the World.",
        address: "Cusco Region, Peru",
      },
      "peru-arequipa": {
        name: "Arequipa & Colca Canyon",
        description:
          "Colonial architecture, volcanoes, and one of the deepest canyons in the world.",
        address: "Arequipa, Peru",
      },
      "peru-puno": {
        name: "Puno & Lake Titicaca",
        description:
          "The world's highest navigable lake and the Uros and Taquile islands.",
        address: "Puno, Peru",
      },
      "peru-tambopata": {
        name: "Tambopata & the Amazon",
        description:
          "Wildlife, jungle lodges, and one of Peru's most biodiverse regions.",
        address: "Madre de Dios, Peru",
      },
    },
  },
  stayPage: {
    hotelOverrides: {
      "hotel-intercontinental": {
        description:
          "Several ocean-view rooms, close to restaurants and nightlife. When booking, contact Mijail Meza Arenas (WhatsApp +51 986 662 859, reservas.limha@r-hr.com) and mention the SOUZA-VILLANUEVA Wedding.",
        roomRate: "From USD 260 to USD 565",
      },
      "hotel-indigo": {
        description:
          "An excellent Miraflores option close to everything; internally connected to Hotel InterContinental. When booking, contact Mijail Meza Arenas (WhatsApp +51 986 662 859, reservas.limha@r-hr.com) and mention the SOUZA-VILLANUEVA Wedding.",
        roomRate: "From USD 140 to USD 265",
      },
      "hotel-ibis-larco": {
        description:
          "Three-star hotel in Miraflores with an excellent location, very close to the InterContinental and Indigo.",
        roomRate: "From USD 60",
      },
    },
    chooseWhereToStayTitle: "How to choose where to stay",
    chooseWhereToStaySubtitle:
      "These three districts are the most recommended for international guests — each with a different feel.",
    districts: [
      {
        name: "San Isidro",
        description:
          "A residential and business district, quiet and safe. Great if you prefer a calmer atmosphere, with good restaurants and parks like El Olivar.",
      },
      {
        name: "Miraflores",
        description:
          "The classic tourist district by the sea. Malecón, Larcomar, and plenty of hotels and restaurants — perfect for a first visit to Lima.",
      },
      {
        name: "Barranco",
        description:
          "A bohemian neighborhood with art, music, and colonial architecture. A more local, creative vibe near the ocean — ideal if you want somewhere with character.",
      },
    ],
  },
  getReadyPage: {
    atHomeTitle: "At-home makeup artists & hairstylists",
    atHomeSubtitle:
      "Professionals who come to your hotel or accommodation on the day of the event. Contact them in advance to book.",
    servicesLabel: "Services",
    phoneLabel: "Phone",
    placeOverrides: {
      "ready-kaoba": {
        description:
          "Hair and makeup salon. Book ahead, especially for the wedding weekend.",
      },
      "ready-specchi": {
        description:
          "Salon in Miraflores. Book ahead for hair and makeup.",
      },
      "ready-mig": {
        description: "Hair salon in Miraflores. Book ahead.",
      },
      "ready-marco-aldany": {
        description: "Salon in Miraflores (Av. 28 de Julio). Book ahead.",
      },
    },
  },
  healthPage: {
    emergencyTitle: "Medical emergency",
    emergencyLine: "Alerta Médica: +511 4166777 (open 24/7)",
    pharmaciesTitle: "Pharmacies",
    pharmaciesIntro:
      "Both chains have multiple locations throughout Miraflores and San Isidro, and many offer delivery.",
    pharmacies: [
      {
        name: "InkaFarma",
        websiteUrl: "https://inkafarma.pe",
        websiteLabel: "inkafarma.pe",
        phone: "+511 314 2020",
      },
      {
        name: "Mi Farma",
        websiteUrl: "https://www.mifarma.com.pe",
        websiteLabel: "mifarma.com.pe",
        phone: "+511 612 5000",
      },
    ],
    hospitalsTitle: "Hospitals",
    phoneLabel: "Phone",
    websiteLabel: "Website",
    addressLabel: "Address",
    hospitals: [
      {
        name: "Clínica Anglo Americana",
        websiteUrl: "https://clinicaangloamericana.pe/",
        websiteLabel: "clinicaangloamericana.pe",
        address: "Alfredo Salazar 350, San Isidro",
        phone: "+511 616 8900",
      },
      {
        name: "Clínica El Golf (SANNA)",
        websiteUrl: "https://sanna.pe/clinicas/el-golf-lima/",
        websiteLabel: "sanna.pe",
        address: "Aurelio Miro Quesada 1030, San Isidro",
        phone: "+511 635 5000",
      },
      {
        name: "Clínica Delgado (AUNA)",
        websiteUrl: "https://clinicadelgado.pe/",
        websiteLabel: "clinicadelgado.pe",
        address: "Corner of Av. Angamos & Gral. Borgoño, Miraflores",
        phone: "+511 377 7000",
      },
    ],
  },
  practicalInfoPage: {
    topics: [
      {
        id: "currency",
        title: "Currency",
        body: "The local currency is the Peruvian Sol (PEN). Credit cards are widely accepted in hotels, restaurants and shops.",
      },
      {
        id: "tipping",
        title: "Tipping",
        body: "A 10% tip is customary in restaurants if service is not already included.",
      },
      {
        id: "water",
        title: "Water",
        body: "We recommend drinking bottled or filtered water during your stay.",
      },
      {
        id: "food",
        title: "Food",
        body: "Lima has an exceptional culinary scene. For popular restaurants, reservations are highly recommended, especially for dinner and on weekends.",
      },
      {
        id: "electricity",
        title: "Electricity",
        body: "Peru uses 220V electricity. Plug types A and C are commonly used.",
      },
      {
        id: "getting-around",
        title: "Getting Around",
        body: "Lima traffic can be heavy, especially during weekday rush hours. Allow extra travel time when moving between districts.",
      },
      {
        id: "weather",
        title: "Weather — Early April",
        body: "Early April in Lima is usually mild and pleasant, with daytime temperatures around 23–25°C (73–77°F) and cooler evenings around 18–20°C (64–68°F). Rain is uncommon, although Lima can be humid and evenings near the coast may feel cooler.\n\nWe recommend light clothing during the day and bringing a light jacket, shawl or wrap for the evening, especially for outdoor events.",
      },
    ],
  },
  exploreLimaPage: {
    transportTitle: "Transportation",
    transportSubtitle:
      "Tips for getting to the airport and getting around Lima during your visit.",
    transportCardTitle: "Airport",
    transportCardDescription:
      "For arrivals and departures, hotel transfers or official taxis inside the terminal are recommended.",
    transportCardNote: "Taxi Lima Airport: +51 993 665 563",
    avoidPublicTransportTitle: "In the city",
    avoidPublicTransportDescription: "Uber and Cabify (apps) are common ways to move between districts.",
    avoidPublicTransportNote:
      "As in any large city, keep personal belongings with you and avoid displaying valuables unnecessarily.",
    placeOverrides: {
      "lima-malecon": {
        name: "Malecón & Larcomar — Miraflores",
        description:
          "Walk the clifftops overlooking the Pacific: Love Park, the lighthouse, and Larcomar. Ideal at sunset.",
      },
      "lima-huaca": {
        name: "Huaca Pucllana",
        description:
          "Pre-Inca archaeological site in the heart of Miraflores; there is also a restaurant with views of the illuminated ruins.",
      },
      "lima-barranco": {
        name: "Barranco",
        description:
          "Suggested route: Plaza de Barranco → Bridge of Sighs → Bajada de los Baños → Jr. Domeyer → Av. Pedro de Osma. Bohemian district with murals, galleries, and cafés.",
      },
      "lima-larco": {
        name: "Larco Museum",
        description:
          "More than 5,000 years of pre-Columbian history in a colonial mansion in Pueblo Libre. If you visit only one museum in Lima, make it this one.",
      },
      "lima-pisco-route": {
        name: "Pisco Sour Route — Historic Lima",
        description:
          "A classic route through Lima’s Historic Centre to try Peru’s iconic Pisco Sour in some of the city’s most traditional and historic venues. Tip: Pisco Sours are stronger than they taste. **Venues: Hotel Maury, Museo del Pisco, Bar Cordano, Gran Hotel Bolívar / El Bolivarcito. Suggested walking route: Hotel Maury → Museo del Pisco → Bar Cordano → Gran Hotel Bolívar.**",
      },
      "lima-centro": {
        name: "Historic Centre of Lima",
        description:
          "Half-day visit (guide recommended): Plaza Mayor → Cathedral → Government Palace area → San Francisco Monastery and catacombs → colonial balconies.",
      },
    },
    shoppingSection: {
      title: "Shopping & Peruvian Design",
      subtitle:
        "Shops and markets to discover Peruvian crafts, fashion, and design.",
      addressLabel: "Address",
      visitWebsiteLabel: "Visit website",
      spots: [
        {
          id: "dedalo",
          name: "Dédalo",
          district: "Barranco",
          imageLabel: "Dédalo",
          imageUrl: "/Images/shopping-dedalo.jpg",
          description:
            "Peruvian design, crafts, home objects and gifts.",
          address: "Av. Sáenz Peña 295, Barranco",
        },
        {
          id: "indian-market",
          name: "Indian Market",
          district: "Miraflores",
          imageLabel: "Indian Market",
          imageUrl: "/Images/shopping-indian-market.png",
          description: "Traditional Peruvian handicrafts and souvenirs.",
          address: "Av. Petit Thouars 5200, Miraflores",
        },
        {
          id: "larcomar",
          name: "Larcomar",
          district: "Miraflores",
          imageLabel: "Larcomar",
          imageUrl: "/Images/Miraflores.jpg",
          description:
            "Visit KUNA, Sol Alpaca and Anntarah for high-quality alpaca clothing and accessories.",
          address: "Malecón de la Reserva 610, Miraflores",
        },
      ],
      miguelDassoTitle: "Miguel Dasso — San Isidro",
      miguelDassoIntro:
        "Boutiques, cafés and restaurants in one of Lima’s nicest shopping areas:",
      boutiques: [
        {
          id: "the-hanger",
          name: "The Hanger",
          tagline: "Concept Store",
          imageLabel: "The Hanger",
          description:
            "A curated selection of fashion, accessories and lifestyle pieces from local and international brands.",
          address: "Calle Miguel Dasso 198, San Isidro",
          websiteUrl: "https://www.instagram.com/thehangerlima/",
        },
        {
          id: "roxana-pardo",
          name: "Roxana Pardo",
          tagline: "Handmade Accessories",
          imageLabel: "Roxana Pardo",
          description:
            "Handcrafted earrings, bracelets, necklaces and statement accessories by a Peruvian designer.",
          address: "Calle Miguel Dasso 140, San Isidro",
          websiteUrl: "https://roxanapardo.com",
        },
        {
          id: "isidra",
          name: "Isidra",
          tagline: "Women’s Fashion Boutique",
          imageLabel: "Isidra",
          description:
            "Contemporary women’s clothing and accessories with a feminine, modern style.",
          address: "Calle Miguel Dasso 182, San Isidro",
        },
        {
          id: "ecru",
          name: "Ecru",
          tagline: "Fashion & Lifestyle Boutique",
          imageLabel: "Ecru",
          description:
            "A refined selection of clothing, accessories and lifestyle pieces with a clean, contemporary aesthetic.",
          address: "Calle Miguel Dasso 160, of. 302, San Isidro",
          websiteUrl: "https://ecru.pe",
        },
      ],
    },
  },
  itinerary: {
    title: "The Itinerary",
    subtitle:
      "Calendar of wedding events. Final details will be updated soon.",
    additionalInfo: "Additional information",
  },
  wedding: {
    title: "The Wedding",
    subtitle:
      "Everything you need to know to join us on our special day.",
    timeline: {
      title: "Itinerary",
      subtitle: "Calendar of events for our celebration.",
    },
    generalInfo: {
      title: "About the wedding",
      content:
        "We are so happy to share this moment with you. Here you'll find practical information to enjoy the celebration with peace of mind. [Placeholder — add general event details, main venue, coordination contact, etc.]",
      dateLabel: "Date",
      datePlaceholder: "[Placeholder — update with actual date]",
    },
    howToGetThere: {
      title: "How to get there",
      mapLabel: "Placeholder — Map with event location",
      mapEmbedTitle: "Fundo Mamacona — Pachacámac",
      transportQuestion: "Need transportation?",
    },
    dressCode: {
      title: "Dress Code",
      intro:
        "We want you to feel elegant and comfortable. Below are some references for the ceremony and reception.",
      women: {
        title: "For women",
        description:
          "Solid-color long dress. Avoid prints, white, ivory, and tones similar to white.",
        imageLabel: "Placeholder — Women's outfit reference",
      },
      men: {
        title: "For men",
        description:
          "Suit and tie. Formal attire.",
        imageLabel: "Placeholder — Men's outfit reference",
      },
    },
    transport: {
      title: "Additional Information",
      intro:
        "We want you to enjoy the celebration worry-free. We've organized different transportation options so you can get back safely.",
      designatedDrivers: {
        title: "Designated drivers",
        description:
          "We'll have designated drivers available so you can enjoy the celebration without worrying about driving.",
        note: "[Placeholder — schedule, meeting point, and contact]",
      },
      taxi: {
        title: "Taxis",
        description:
          "We'll have taxi service available to help guests get home at the end of the celebration.",
        note: "[Placeholder — provider, phone, and schedule]",
      },
      buses: {
        title: "Shuttle buses",
        description:
          "We'll have shuttle buses departing from different points in Lima to take guests to the event.",
        note: "[Placeholder — departure points, times, and routes]",
      },
    },
  },
  giftRegistry: {
    title: "Gift Registry",
    description:
      "If you'd like to give us a gift, you can find our registry here.",
    cta: "View gift registry",
    externalNote: "Opens on an external platform",
  },
} as const;

export const translations = { es, en } as const;

export type TranslationKeys = (typeof translations)[Locale];

export function getTranslations(
  locale: Locale,
  overrides?: Record<string, unknown>,
): TranslationKeys {
  if (!overrides) return translations[locale];
  const base = translations[locale] as unknown as Record<string, unknown>;
  return deepMerge(base, overrides) as TranslationKeys;
}
