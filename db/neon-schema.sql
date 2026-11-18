-- Ejecutar en el SQL Editor de Neon (proyecto → SQL Editor → Run).

CREATE TABLE IF NOT EXISTS rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name TEXT NOT NULL,
  attendance TEXT NOT NULL CHECK (attendance IN ('attending', 'not_attending')),
  attending_with_partner BOOLEAN,
  partner_name TEXT,
  arrival_date TEXT,
  phone_country_code TEXT,
  phone TEXT
);

CREATE INDEX IF NOT EXISTS rsvps_created_at_idx ON rsvps (created_at DESC);