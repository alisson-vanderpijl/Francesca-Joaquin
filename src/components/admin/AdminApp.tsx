"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminField } from "@/components/admin/AdminField";
import { Button } from "@/components/ui/Button";
import {
  ADMIN_CONTENT_SECTIONS,
  type AdminEditableSection,
  type SiteConfig,
  type WeddingEvent,
} from "@/lib/content-types";

function contentApiPath(view: Exclude<AdminView, "rsvps">): string {
  if (view === "gift-registry") return "/api/admin/content/site-config";
  return `/api/admin/content/${view}`;
}

type AdminView = AdminEditableSection | "rsvps";

export function AdminApp() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeView, setActiveView] = useState<AdminView>("itinerary-events");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState<unknown>(null);
  const [loadedSection, setLoadedSection] = useState<AdminView | null>(null);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/content/itinerary-events");
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
      const res = await fetch(contentApiPath(section));
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
      const res = await fetch(contentApiPath(activeView), {
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
            Itinerarios, lista de regalos y RSVPs
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
            <p className="text-xs text-charcoal/50">Itinerarios, lista de regalos y RSVPs</p>
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
            {ADMIN_CONTENT_SECTIONS.map((section) => (
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
                : ADMIN_CONTENT_SECTIONS.find((s) => s.id === activeView)?.label}
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
              {activeView === "gift-registry" && data != null && (
                <GiftRegistryEditor
                  data={data as SiteConfig}
                  onChange={setData}
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

function GiftRegistryEditor({
  data,
  onChange,
}: {
  data: SiteConfig;
  onChange: (data: unknown) => void;
}) {
  const url = data.GIFT_REGISTRY_URL ?? "";

  return (
    <div className="space-y-6">
      <p className="text-sm text-charcoal/60">
        Enlace del botón en la página Lista de regalos. Se abre en una pestaña nueva.
      </p>
      <AdminField
        label="URL del botón"
        type="url"
        value={url}
        onChange={(value) =>
          onChange({
            ...data,
            GIFT_REGISTRY_URL: value.trim(),
          })
        }
        placeholder="https://..."
      />
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-xs uppercase tracking-widest text-charcoal/50 hover:text-charcoal"
        >
          Probar enlace →
        </a>
      ) : null}
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
              <AdminField
                label="Google Maps"
                value={event.googleMapsUrl || ""}
                onChange={(v) => updateItem(index, { googleMapsUrl: v })}
                type="url"
              />
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
