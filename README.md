# Lima Wedding Guide

Guía web para invitados (Francesca & Joaquín) — RSVP, hoteles, restaurantes y qué hacer en Lima y Perú.

## Requisitos

- Node.js 20+
- npm

## Desarrollo local

```bash
npm install
cp .env.example .env   # opcional: ADMIN_PASSWORD y ADMIN_SECRET
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

- Guía: `/guide`
- RSVP: `/rsvp`
- Admin: `/admin` (requiere `ADMIN_PASSWORD` en `.env`)

Los RSVPs locales se guardan en `data/rsvps.json` (no se sube a Git; copia `data/rsvps.example.json` si partes de cero).

## Build

```bash
npm run build
npm start
```

## Contenido editable

JSON en `data/` (también editable desde `/admin` en local). Defaults en `src/data/`.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
