"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminField } from "@/components/admin/AdminField";
import { Button } from "@/components/ui/Button";
import {
  CONTENT_SECTIONS,
  type AtHomeBeautyProvider,
  type ContentSection,
  type Hotel,
  type PriceLevel,
  type HotelsContent,
  type NavGroup,
  type PageHeaders,
  type PeruDestination,
  type Recommendation,
  type Restaurant,
  type RestaurantsContent,
  type SiteConfig,
  type TranslationsContent,
  type TravelAgency,
  type WeddingEvent,
} from "@/lib/content-types";

type AdminView = ContentSection | "rsvps";

export function AdminApp() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeView, setActiveView] = useState<AdminView>("site-config");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState<unknown>(null);
  const [loadedSection, setLoadedSection] = useState<AdminView | null>(null);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/content/site-config");
      setAuthenticated(res.ok);
    } catch {
      setAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const selectView = useCallback((view: AdminView) => {
    setActiveView(view);
    setData(null);
    setLoadedSection(null);
    setLoading(true);
    setMessage("");
  }, []);

  const loadSection = useCallback(async (section: AdminView) => {
    if (section === "rsvps") {
      try {
        const res = await fetch("/api/admin/rsvps");
        if (!res.ok) throw new Error();
        setData(await res.json());
        setLoadedSection(section);
      } catch {
        setMessage("Error al cargar RSVPs");
        setLoadedSection(null);
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      const res = await fetch(`/api/admin/content/${section}`);
      if (!res.ok) throw new Error();
      setData(await res.json());
      setLoadedSection(section);
    } catch {
      setMessage("Error al cargar la sección");
      setLoadedSection(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      loadSection(activeView);
    }
  }, [authenticated, activeView, loadSection]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setLoginError("Contraseña incorrecta");
      return;
    }
    setAuthenticated(true);
    setPassword("");
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setData(null);
    setLoadedSection(null);
  };

  const downloadRsvpsExcel = async () => {
    setMessage("");
    try {
      const res = await fetch("/api/admin/rsvps/export");
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "rsvps.xlsx";
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      setMessage("Error al descargar el archivo Excel");
    }
  };

  const saveSection = async () => {
    if (activeView === "rsvps") return;
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch(`/api/admin/content/${activeView}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setMessage("Cambios guardados correctamente");
    } catch {
      setMessage("Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  if (authenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-charcoal/50">Cargando...</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md border border-charcoal/10 bg-ivory p-8 md:p-10"
        >
          <h1 className="font-serif text-3xl text-charcoal">Admin</h1>
          <p className="mt-2 text-sm text-charcoal/60">
            Panel de edición de la guía de boda
          </p>
          <div className="mt-8">
            <AdminField
              label="Contraseña"
              value={password}
              onChange={setPassword}
              placeholder="Ingresa la contraseña de admin"
            />
          </div>
          {loginError && (
            <p className="mt-4 text-sm text-red-700">{loginError}</p>
          )}
          <div className="mt-8">
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory">
      <header className="border-b border-charcoal/10 bg-ivory px-6 py-5 lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl text-charcoal">Admin</h1>
            <p className="text-xs text-charcoal/50">Guía de boda — edición de contenido</p>
          </div>
          <div className="flex items-center gap-3">
            <Button href="/guide" variant="ghost" className="text-xs">
              Ver sitio →
            </Button>
            <Button variant="secondary" onClick={handleLogout} className="text-xs">
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 lg:grid-cols-[240px_1fr] lg:gap-8 lg:px-10 lg:py-8">
        <aside className="border-b border-charcoal/10 p-4 lg:border-b-0 lg:p-0">
          <nav className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {CONTENT_SECTIONS.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => selectView(section.id)}
                className={`px-3 py-2 text-left text-sm transition-colors ${
                  activeView === section.id
                    ? "bg-sand/40 text-charcoal"
                    : "text-charcoal/60 hover:text-charcoal"
                }`}
              >
                {section.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => selectView("rsvps")}
              className={`px-3 py-2 text-left text-sm transition-colors ${
                activeView === "rsvps"
                  ? "bg-sand/40 text-charcoal"
                  : "text-charcoal/60 hover:text-charcoal"
              }`}
            >
              RSVPs
            </button>
          </nav>
        </aside>

        <main className="p-6 lg:p-0 lg:pb-12">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-serif text-xl text-charcoal">
              {activeView === "rsvps"
                ? "Confirmaciones RSVP"
                : CONTENT_SECTIONS.find((s) => s.id === activeView)?.label}
            </h2>
            <div className="flex flex-wrap gap-3">
              {activeView === "rsvps" ? (
                <Button
                  variant="secondary"
                  onClick={downloadRsvpsExcel}
                  disabled={loading}
                >
                  Descargar Excel
                </Button>
              ) : (
                <Button onClick={saveSection} disabled={saving || loading}>
                  {saving ? "Guardando..." : "Guardar cambios"}
                </Button>
              )}
            </div>
          </div>

          {message && (
            <p className="mb-6 text-sm text-earth">{message}</p>
          )}

          {loading || loadedSection !== activeView ? (
            <p className="text-sm text-charcoal/50">Cargando...</p>
          ) : (
            <div className="space-y-6">
              {activeView === "site-config" && data != null && (
                <SiteConfigEditor
                  data={data as SiteConfig}
                  onChange={setData}
                />
              )}
              {activeView === "page-headers" && data != null && (
                <PageHeadersEditor
                  data={data as PageHeaders}
                  onChange={setData}
                />
              )}
              {activeView === "itinerary-events" && data != null && (
                <WeddingEventsEditor
                  data={data as WeddingEvent[]}
                  onChange={setData}
                  hint="Calendario de la página El Itinerario (fin de semana / eventos para invitados)."
                />
              )}
              {activeView === "wedding-events" && data != null && (
                <WeddingEventsEditor
                  data={data as WeddingEvent[]}
                  onChange={setData}
                  hint="Itinerario hora a hora del día de la boda en la página La Boda."
                />
              )}
              {activeView === "hotels" && data != null && (
                <HotelsEditor data={data as HotelsContent} onChange={setData} />
              )}
              {activeView === "restaurants" && data != null && (
                <RestaurantsEditor
                  data={data as RestaurantsContent}
                  onChange={setData}
                />
              )}
              {activeView === "explore-lima" && data != null && (
                <RecommendationsEditor
                  data={data as Recommendation[]}
                  onChange={setData}
                  category="explore-lima"
                />
              )}
              {activeView === "explore-peru" && data != null && (
                <PeruDestinationsEditor
                  data={data as PeruDestination[]}
                  onChange={setData}
                />
              )}
              {activeView === "travel-agencies" && data != null && (
                <TravelAgenciesEditor
                  data={data as TravelAgency[]}
                  onChange={setData}
                />
              )}
              {activeView === "get-ready" && data != null && (
                <RecommendationsEditor
                  data={data as Recommendation[]}
                  onChange={setData}
                  category="get-ready"
                />
              )}
              {activeView === "at-home-beauty" && data != null && (
                <AtHomeBeautyEditor
                  data={data as AtHomeBeautyProvider[]}
                  onChange={setData}
                />
              )}
              {activeView === "translations" && data != null && (
                <TranslationsEditor
                  data={data as TranslationsContent}
                  onChange={setData}
                />
              )}
              {activeView === "nav-groups" && data != null && (
                <JsonEditor
                  data={data as NavGroup[]}
                  onChange={setData}
                  hint="Estructura de navegación del menú. Edita con cuidado."
                />
              )}
              {activeView === "rsvps" && data != null && (
                <RsvpsTable data={data as RsvpRow[]} />
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

type RsvpRow = {
  id: string;
  name: string;
  attendance?: string;
  attendingWithPartner?: boolean;
  partnerName?: string;
  phoneCountryCode?: string;
  phone?: string;
  arrivalDate?: string;
  createdAt: string;
};

function SiteConfigEditor({
  data,
  onChange,
}: {
  data: SiteConfig;
  onChange: (data: SiteConfig) => void;
}) {
  const update = (key: keyof SiteConfig, value: string) =>
    onChange({ ...data, [key]: value });

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <AdminField label="Nombres de la pareja" value={data.coupleNames} onChange={(v) => update("coupleNames", v)} />
      <AdminField label="Fecha de la boda" value={data.weddingDate} onChange={(v) => update("weddingDate", v)} />
      <AdminField
        label="Cuenta atrás (ISO, ej. 2027-04-24T16:00:00-05:00)"
        value={data.weddingCountdownAt ?? ""}
        onChange={(v) => update("weddingCountdownAt", v)}
      />
      <AdminField label="URL lista de regalos" value={data.GIFT_REGISTRY_URL} onChange={(v) => update("GIFT_REGISTRY_URL", v)} type="url" />
      <AdminField label="URL dejar mensaje" value={data.GUEST_MESSAGE_URL} onChange={(v) => update("GUEST_MESSAGE_URL", v)} type="url" />
      <AdminField label="URL Google Maps" value={data.GOOGLE_MAPS_URL} onChange={(v) => update("GOOGLE_MAPS_URL", v)} type="url" />
      <div className="md:col-span-2">
        <AdminField label="Descripción del mapa" value={data.mapDescription} onChange={(v) => update("mapDescription", v)} multiline />
      </div>
    </div>
  );
}

function PageHeadersEditor({
  data,
  onChange,
}: {
  data: PageHeaders;
  onChange: (data: PageHeaders) => void;
}) {
  const keys = Object.keys(data) as (keyof PageHeaders)[];

  return (
    <div className="space-y-8">
      {keys.map((key) => (
        <section key={key} className="border border-charcoal/10 p-6">
          <h3 className="mb-4 text-xs uppercase tracking-widest text-earth">{key}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <AdminField
              label="Título"
              value={data[key].title}
              onChange={(v) =>
                onChange({ ...data, [key]: { ...data[key], title: v } })
              }
            />
            <div className="md:col-span-2">
              <AdminField
                label="Subtítulo"
                value={data[key].subtitle}
                onChange={(v) =>
                  onChange({ ...data, [key]: { ...data[key], subtitle: v } })
                }
                multiline
              />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

function WeddingEventsEditor({
  data,
  onChange,
  hint,
}: {
  data: WeddingEvent[];
  onChange: (data: WeddingEvent[]) => void;
  hint?: string;
}) {
  if (!Array.isArray(data)) {
    return (
      <p className="text-sm text-red-700">
        Formato de datos inválido. Recarga la sección o restaura el archivo JSON
        correspondiente.
      </p>
    );
  }

  const updateItem = (index: number, patch: Partial<WeddingEvent>) => {
    const next = [...data];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  };

  const addItem = () => {
    onChange([
      ...data,
      {
        id: `event-${Date.now()}`,
        title: "",
        date: "",
        time: "",
        location: "",
        address: "",
        description: "",
        additionalInfo: "",
      },
    ]);
  };

  const removeItem = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {hint && (
        <p className="text-sm leading-relaxed text-charcoal/60">{hint}</p>
      )}
      <ListShell onAdd={addItem} addLabel="Agregar evento">
      {data.map((event, index) => (
        <ItemCard key={event.id} title={event.title || `Evento ${index + 1}`} onRemove={() => removeItem(index)}>
          <div className="grid gap-4 md:grid-cols-2">
            <AdminField label="Título" value={event.title} onChange={(v) => updateItem(index, { title: v })} />
            <AdminField label="Fecha" value={event.date} onChange={(v) => updateItem(index, { date: v })} />
            <AdminField label="Hora" value={event.time} onChange={(v) => updateItem(index, { time: v })} />
            <AdminField label="Lugar" value={event.location} onChange={(v) => updateItem(index, { location: v })} />
            <div className="md:col-span-2">
              <AdminField label="Dirección" value={event.address} onChange={(v) => updateItem(index, { address: v })} />
            </div>
            <div className="md:col-span-2">
              <AdminField label="Descripción" value={event.description} onChange={(v) => updateItem(index, { description: v })} multiline />
            </div>
            <div className="md:col-span-2">
              <AdminField label="Info adicional" value={event.additionalInfo || ""} onChange={(v) => updateItem(index, { additionalInfo: v })} multiline />
            </div>
          </div>
        </ItemCard>
      ))}
      </ListShell>
    </div>
  );
}

function HotelsEditor({
  data,
  onChange,
}: {
  data: HotelsContent;
  onChange: (data: HotelsContent) => void;
}) {
  const updateHotel = (index: number, patch: Partial<Hotel>) => {
    const hotels = [...data.hotels];
    hotels[index] = { ...hotels[index], ...patch };
    onChange({ ...data, hotels });
  };

  return (
    <div className="space-y-8">
      <FilterOptionsEditor
        label="Distritos (filtro)"
        values={data.hotelDistricts}
        onChange={(hotelDistricts) => onChange({ ...data, hotelDistricts })}
      />
      <FilterOptionsEditor
        label="Tipos de alojamiento (filtro)"
        values={data.accommodationTypes}
        onChange={(accommodationTypes) => onChange({ ...data, accommodationTypes })}
      />
      <ListShell
        onAdd={() =>
          onChange({
            ...data,
            hotels: [
              ...data.hotels,
              {
                id: `hotel-${Date.now()}`,
                name: "",
                category: "hotel",
                district: "Miraflores",
                imageLabel: "",
                description: "",
                address: "",
                priceLevel: 2,
              },
            ],
          })
        }
        addLabel="Agregar alojamiento"
      >
        {data.hotels.map((hotel, index) => (
          <ItemCard key={hotel.id} title={hotel.name || `Alojamiento ${index + 1}`} onRemove={() => onChange({ ...data, hotels: data.hotels.filter((_, i) => i !== index) })}>
            <div className="grid gap-4 md:grid-cols-2">
              <AdminField label="Nombre" value={hotel.name} onChange={(v) => updateHotel(index, { name: v })} />
              <label className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-charcoal/60">Tipo</span>
                <select
                  value={hotel.category}
                  onChange={(e) => updateHotel(index, { category: e.target.value as Hotel["category"] })}
                  className="border border-charcoal/15 bg-ivory px-4 py-3 text-sm"
                >
                  <option value="hotel">Hotel</option>
                  <option value="airbnb">Airbnb</option>
                </select>
              </label>
              <AdminField label="Distrito" value={hotel.district} onChange={(v) => updateHotel(index, { district: v })} />
              <label className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-charcoal/60">
                  Nivel de precio
                </span>
                <select
                  value={hotel.priceLevel ?? 2}
                  onChange={(e) =>
                    updateHotel(index, {
                      priceLevel: Number(e.target.value) as PriceLevel,
                    })
                  }
                  className="border border-charcoal/15 bg-ivory px-4 py-3 text-sm"
                >
                  <option value={1}>$ — Económico</option>
                  <option value={2}>$$ — Moderado</option>
                  <option value={3}>$$$ — Alto</option>
                  <option value={4}>$$$$ — Lujo</option>
                </select>
              </label>
              <AdminField label="Etiqueta imagen" value={hotel.imageLabel} onChange={(v) => updateHotel(index, { imageLabel: v })} />
              <AdminField label="URL imagen" value={hotel.imageUrl || ""} onChange={(v) => updateHotel(index, { imageUrl: v })} type="url" />
              <AdminField label="Teléfono" value={hotel.phone || ""} onChange={(v) => updateHotel(index, { phone: v })} />
              <AdminField label="Sitio web" value={hotel.websiteUrl || ""} onChange={(v) => updateHotel(index, { websiteUrl: v })} type="url" />
              <AdminField label="Airbnb URL" value={hotel.airbnbUrl || ""} onChange={(v) => updateHotel(index, { airbnbUrl: v })} type="url" />
              <AdminField label="Google Maps" value={hotel.googleMapsUrl || ""} onChange={(v) => updateHotel(index, { googleMapsUrl: v })} type="url" />
              <AdminField label="Tarifas" value={hotel.roomRate || ""} onChange={(v) => updateHotel(index, { roomRate: v })} />
              <div className="md:col-span-2">
                <AdminField label="Dirección" value={hotel.address} onChange={(v) => updateHotel(index, { address: v })} />
              </div>
              <div className="md:col-span-2">
                <AdminField label="Descripción" value={hotel.description} onChange={(v) => updateHotel(index, { description: v })} multiline />
              </div>
            </div>
          </ItemCard>
        ))}
      </ListShell>
    </div>
  );
}

function RestaurantsEditor({
  data,
  onChange,
}: {
  data: RestaurantsContent;
  onChange: (data: RestaurantsContent) => void;
}) {
  const updateRestaurant = (index: number, patch: Partial<Restaurant>) => {
    const restaurants = [...data.restaurants];
    restaurants[index] = { ...restaurants[index], ...patch };
    onChange({ ...data, restaurants });
  };

  return (
    <div className="space-y-8">
      <FilterOptionsEditor label="Distritos" values={data.restaurantDistricts} onChange={(restaurantDistricts) => onChange({ ...data, restaurantDistricts })} />
      <FilterOptionsEditor label="Tipos de comida" values={data.cuisineTypes} onChange={(cuisineTypes) => onChange({ ...data, cuisineTypes })} />
      <FilterOptionsEditor label="Ambientes" values={data.ambianceTypes} onChange={(ambianceTypes) => onChange({ ...data, ambianceTypes })} />
      <ListShell
        onAdd={() =>
          onChange({
            ...data,
            restaurants: [
              ...data.restaurants,
              {
                id: `rest-${Date.now()}`,
                name: "",
                category: "restaurant",
                district: "Miraflores",
                cuisineType: "Peruana",
                ambiance: "Casual",
                description: "",
                address: "",
              },
            ],
          })
        }
        addLabel="Agregar restaurante"
      >
        {data.restaurants.map((restaurant, index) => (
          <ItemCard key={restaurant.id} title={restaurant.name || `Restaurante ${index + 1}`} onRemove={() => onChange({ ...data, restaurants: data.restaurants.filter((_, i) => i !== index) })}>
            <div className="grid gap-4 md:grid-cols-2">
              <AdminField label="Nombre" value={restaurant.name} onChange={(v) => updateRestaurant(index, { name: v })} />
              <AdminField label="Distrito" value={restaurant.district} onChange={(v) => updateRestaurant(index, { district: v })} />
              <AdminField label="Tipo de comida" value={restaurant.cuisineType} onChange={(v) => updateRestaurant(index, { cuisineType: v })} />
              <AdminField label="Ambiente" value={restaurant.ambiance} onChange={(v) => updateRestaurant(index, { ambiance: v })} />
              <AdminField label="Teléfono" value={restaurant.phone || ""} onChange={(v) => updateRestaurant(index, { phone: v })} />
              <AdminField label="Sitio web" value={restaurant.websiteUrl || ""} onChange={(v) => updateRestaurant(index, { websiteUrl: v })} type="url" />
              <AdminField label="Google Maps" value={restaurant.googleMapsUrl || ""} onChange={(v) => updateRestaurant(index, { googleMapsUrl: v })} type="url" />
              <AdminField label="Etiqueta imagen" value={restaurant.imageLabel || ""} onChange={(v) => updateRestaurant(index, { imageLabel: v })} />
              <AdminField label="URL imagen" value={restaurant.imageUrl || ""} onChange={(v) => updateRestaurant(index, { imageUrl: v })} type="url" />
              <div className="md:col-span-2">
                <AdminField label="Dirección" value={restaurant.address} onChange={(v) => updateRestaurant(index, { address: v })} />
              </div>
              <div className="md:col-span-2">
                <AdminField label="Descripción" value={restaurant.description} onChange={(v) => updateRestaurant(index, { description: v })} multiline />
              </div>
            </div>
          </ItemCard>
        ))}
      </ListShell>
    </div>
  );
}

function RecommendationsEditor({
  data,
  onChange,
  category,
}: {
  data: Recommendation[];
  onChange: (data: Recommendation[]) => void;
  category: string;
}) {
  const updateItem = (index: number, patch: Partial<Recommendation>) => {
    const next = [...data];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  };

  return (
    <ListShell
      onAdd={() =>
        onChange([
          ...data,
          {
            id: `${category}-${Date.now()}`,
            name: "",
            category,
            description: "",
            address: "",
          },
        ])
      }
      addLabel="Agregar lugar"
    >
      {data.map((item, index) => (
        <ItemCard key={item.id} title={item.name || `Lugar ${index + 1}`} onRemove={() => onChange(data.filter((_, i) => i !== index))}>
          <div className="grid gap-4 md:grid-cols-2">
            <AdminField label="Nombre" value={item.name} onChange={(v) => updateItem(index, { name: v })} />
            <AdminField label="Etiqueta imagen" value={item.imageLabel || ""} onChange={(v) => updateItem(index, { imageLabel: v })} />
            <AdminField label="URL imagen" value={item.imageUrl || ""} onChange={(v) => updateItem(index, { imageUrl: v })} type="url" />
            <AdminField label="Sitio web" value={item.websiteUrl || ""} onChange={(v) => updateItem(index, { websiteUrl: v })} type="url" />
            <AdminField label="Google Maps" value={item.googleMapsUrl || ""} onChange={(v) => updateItem(index, { googleMapsUrl: v })} type="url" />
            <div className="md:col-span-2">
              <AdminField label="Dirección" value={item.address} onChange={(v) => updateItem(index, { address: v })} />
            </div>
            <div className="md:col-span-2">
              <AdminField label="Descripción" value={item.description} onChange={(v) => updateItem(index, { description: v })} multiline />
            </div>
          </div>
        </ItemCard>
      ))}
    </ListShell>
  );
}

function TravelAgenciesEditor({
  data,
  onChange,
}: {
  data: TravelAgency[];
  onChange: (data: TravelAgency[]) => void;
}) {
  const updateItem = (index: number, patch: Partial<TravelAgency>) => {
    const next = [...data];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  };

  return (
    <ListShell
      onAdd={() =>
        onChange([
          ...data,
          {
            id: `agency-${Date.now()}`,
            name: "",
            category: "travel-agency",
            imageLabel: "",
            description: "",
            address: "",
          },
        ])
      }
      addLabel="Agregar agencia"
    >
      {data.map((item, index) => (
        <ItemCard key={item.id} title={item.name || `Agencia ${index + 1}`} onRemove={() => onChange(data.filter((_, i) => i !== index))}>
          <div className="grid gap-4 md:grid-cols-2">
            <AdminField label="Nombre" value={item.name} onChange={(v) => updateItem(index, { name: v })} />
            <AdminField label="Etiqueta imagen" value={item.imageLabel} onChange={(v) => updateItem(index, { imageLabel: v })} />
            <AdminField label="URL imagen" value={item.imageUrl || ""} onChange={(v) => updateItem(index, { imageUrl: v })} type="url" />
            <AdminField label="Teléfono" value={item.phone || ""} onChange={(v) => updateItem(index, { phone: v })} />
            <AdminField label="Sitio web" value={item.websiteUrl || ""} onChange={(v) => updateItem(index, { websiteUrl: v })} type="url" />
            <AdminField label="Google Maps" value={item.googleMapsUrl || ""} onChange={(v) => updateItem(index, { googleMapsUrl: v })} type="url" />
            <div className="md:col-span-2">
              <AdminField label="Dirección" value={item.address} onChange={(v) => updateItem(index, { address: v })} />
            </div>
            <div className="md:col-span-2">
              <AdminField label="Descripción" value={item.description} onChange={(v) => updateItem(index, { description: v })} multiline />
            </div>
          </div>
        </ItemCard>
      ))}
    </ListShell>
  );
}

function AtHomeBeautyEditor({
  data,
  onChange,
}: {
  data: AtHomeBeautyProvider[];
  onChange: (data: AtHomeBeautyProvider[]) => void;
}) {
  const updateItem = (index: number, patch: Partial<AtHomeBeautyProvider>) => {
    const next = [...data];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  };

  return (
    <ListShell
      onAdd={() =>
        onChange([
          ...data,
          {
            id: `at-home-${Date.now()}`,
            name: "",
            phone: "",
            services: [],
          },
        ])
      }
      addLabel="Agregar profesional"
    >
      {data.map((item, index) => (
        <ItemCard
          key={item.id}
          title={item.name || `Profesional ${index + 1}`}
          onRemove={() => onChange(data.filter((_, i) => i !== index))}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <AdminField label="Nombre" value={item.name} onChange={(v) => updateItem(index, { name: v })} />
            <AdminField label="Teléfono" value={item.phone} onChange={(v) => updateItem(index, { phone: v })} />
            <div className="md:col-span-2">
              <AdminField
                label="Servicios (uno por línea)"
                value={item.services.join("\n")}
                onChange={(v) =>
                  updateItem(index, {
                    services: v
                      .split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean),
                  })
                }
                multiline
              />
            </div>
          </div>
        </ItemCard>
      ))}
    </ListShell>
  );
}

function PeruDestinationsEditor({
  data,
  onChange,
}: {
  data: PeruDestination[];
  onChange: (data: PeruDestination[]) => void;
}) {
  const updateItem = (index: number, patch: Partial<PeruDestination>) => {
    const next = [...data];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  };

  return (
    <ListShell
      onAdd={() =>
        onChange([
          ...data,
          {
            id: `peru-${Date.now()}`,
            name: "",
            category: "explore-peru",
            minDurationDays: 3,
            imageLabel: "",
            description: "",
            address: "",
          },
        ])
      }
      addLabel="Agregar destino"
    >
      {data.map((item, index) => (
        <ItemCard key={item.id} title={item.name || `Destino ${index + 1}`} onRemove={() => onChange(data.filter((_, i) => i !== index))}>
          <div className="grid gap-4 md:grid-cols-2">
            <AdminField label="Nombre" value={item.name} onChange={(v) => updateItem(index, { name: v })} />
            <AdminField label="Duración mínima (días)" value={String(item.minDurationDays)} onChange={(v) => updateItem(index, { minDurationDays: Number(v) || 1 })} type="number" />
            <AdminField label="Etiqueta imagen" value={item.imageLabel} onChange={(v) => updateItem(index, { imageLabel: v })} />
            <AdminField label="URL imagen" value={item.imageUrl || ""} onChange={(v) => updateItem(index, { imageUrl: v })} type="url" />
            <AdminField label="Teléfono" value={item.phone || ""} onChange={(v) => updateItem(index, { phone: v })} />
            <AdminField label="Sitio web" value={item.websiteUrl || ""} onChange={(v) => updateItem(index, { websiteUrl: v })} type="url" />
            <AdminField label="Google Maps" value={item.googleMapsUrl || ""} onChange={(v) => updateItem(index, { googleMapsUrl: v })} type="url" />
            <div className="md:col-span-2">
              <AdminField label="Ubicación" value={item.address} onChange={(v) => updateItem(index, { address: v })} />
            </div>
            <div className="md:col-span-2">
              <AdminField label="Descripción" value={item.description} onChange={(v) => updateItem(index, { description: v })} multiline />
            </div>
          </div>
        </ItemCard>
      ))}
    </ListShell>
  );
}

function TranslationsEditor({
  data,
  onChange,
}: {
  data: TranslationsContent;
  onChange: (data: TranslationsContent) => void;
}) {
  const [locale, setLocale] = useState<"es" | "en">("es");
  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState("");

  useEffect(() => {
    setJsonText(JSON.stringify(data[locale], null, 2));
    setJsonError("");
  }, [data, locale]);

  const applyJson = () => {
    try {
      const parsed = JSON.parse(jsonText) as Record<string, unknown>;
      onChange({ ...data, [locale]: parsed });
      setJsonError("");
    } catch {
      setJsonError("JSON inválido. Revisa la sintaxis.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["es", "en"] as const).map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => setLocale(loc)}
            className={`px-4 py-2 text-sm uppercase tracking-widest ${
              locale === loc ? "bg-sand/40 text-charcoal" : "text-charcoal/50"
            }`}
          >
            {loc}
          </button>
        ))}
      </div>
      <p className="text-sm text-charcoal/60">
        Edita los textos del sitio en español e inglés. Incluye onboarding, menú, RSVP, guía, boda, dress code y transporte.
      </p>
      <textarea
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
        rows={24}
        className="w-full border border-charcoal/15 bg-ivory px-4 py-3 font-mono text-xs text-charcoal focus:border-earth focus:outline-none"
      />
      {jsonError && <p className="text-sm text-red-700">{jsonError}</p>}
      <Button variant="secondary" onClick={applyJson}>
        Aplicar JSON al borrador
      </Button>
      <p className="text-xs text-charcoal/40">
        Después de aplicar, pulsa &quot;Guardar cambios&quot; arriba para persistir.
      </p>
    </div>
  );
}

function JsonEditor<T>({
  data,
  onChange,
  hint,
}: {
  data: T;
  onChange: (data: T) => void;
  hint?: string;
}) {
  const [jsonText, setJsonText] = useState(JSON.stringify(data, null, 2));
  const [jsonError, setJsonError] = useState("");

  useEffect(() => {
    setJsonText(JSON.stringify(data, null, 2));
  }, [data]);

  const applyJson = () => {
    try {
      onChange(JSON.parse(jsonText) as T);
      setJsonError("");
    } catch {
      setJsonError("JSON inválido");
    }
  };

  return (
    <div className="space-y-4">
      {hint && <p className="text-sm text-charcoal/60">{hint}</p>}
      <textarea
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
        rows={20}
        className="w-full border border-charcoal/15 bg-ivory px-4 py-3 font-mono text-xs"
      />
      {jsonError && <p className="text-sm text-red-700">{jsonError}</p>}
      <Button variant="secondary" onClick={applyJson}>
        Aplicar JSON
      </Button>
    </div>
  );
}

function RsvpsTable({ data }: { data: RsvpRow[] }) {
  if (data.length === 0) {
    return (
      <p className="text-sm text-charcoal/50">
        No hay confirmaciones todavía. Puedes descargar un Excel vacío con el botón
        de arriba.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto border border-charcoal/10">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-charcoal/10 bg-sand/20 text-xs uppercase tracking-widest text-charcoal/60">
          <tr>
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Asistencia</th>
            <th className="px-4 py-3">Pareja</th>
            <th className="px-4 py-3">Teléfono</th>
            <th className="px-4 py-3">Llegada</th>
            <th className="px-4 py-3">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {data.map((rsvp) => (
            <tr key={rsvp.id} className="border-b border-charcoal/5">
              <td className="px-4 py-3">{rsvp.name}</td>
              <td className="px-4 py-3">
                {rsvp.attendance === "attending"
                  ? "Asiste"
                  : rsvp.attendance === "not_attending"
                    ? "No asiste"
                    : "—"}
              </td>
              <td className="px-4 py-3">{rsvp.partnerName || "—"}</td>
              <td className="px-4 py-3">
                {rsvp.phone
                  ? `${rsvp.phoneCountryCode ?? ""} ${rsvp.phone}`.trim()
                  : "—"}
              </td>
              <td className="px-4 py-3">{rsvp.arrivalDate || "—"}</td>
              <td className="px-4 py-3 text-charcoal/50">
                {new Date(rsvp.createdAt).toLocaleString("es-PE")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FilterOptionsEditor({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
}) {
  return (
    <AdminField
      label={`${label} (separados por coma)`}
      value={values.join(", ")}
      onChange={(v) =>
        onChange(
          v
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        )
      }
    />
  );
}

function ListShell({
  children,
  onAdd,
  addLabel,
}: {
  children: React.ReactNode;
  onAdd: () => void;
  addLabel: string;
}) {
  return (
    <div className="space-y-4">
      <Button variant="secondary" onClick={onAdd} className="text-xs">
        + {addLabel}
      </Button>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

function ItemCard({
  title,
  children,
  onRemove,
}: {
  title: string;
  children: React.ReactNode;
  onRemove: () => void;
}) {
  return (
    <section className="border border-charcoal/10 p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="font-serif text-lg text-charcoal">{title}</h3>
        <button
          type="button"
          onClick={onRemove}
          className="text-xs uppercase tracking-widest text-charcoal/40 hover:text-red-700"
        >
          Eliminar
        </button>
      </div>
      {children}
    </section>
  );
}
