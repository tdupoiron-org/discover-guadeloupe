-- Migration 001: Create sites table
-- Run this migration to set up the initial schema.

CREATE TABLE IF NOT EXISTS sites (
  id           VARCHAR(100)   PRIMARY KEY,
  name         VARCHAR(255)   NOT NULL,
  description  TEXT           NOT NULL,
  image        TEXT           NOT NULL,
  duration     VARCHAR(50)    NOT NULL,
  crowd_level  VARCHAR(10)    NOT NULL CHECK (crowd_level IN ('low', 'medium', 'high')),
  rating       NUMERIC(3, 1)  NOT NULL CHECK (rating >= 0 AND rating <= 5),
  popularity   VARCHAR(20)    NOT NULL CHECK (popularity IN ('must-see', 'popular', 'hidden-gem')),
  category     VARCHAR(100)   NOT NULL,
  lat          NUMERIC(9, 6)  NOT NULL,
  lng          NUMERIC(9, 6)  NOT NULL,
  created_at   TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

-- Automatically update the updated_at column on every row modification
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'sites_updated_at'
  ) THEN
    CREATE TRIGGER sites_updated_at
    BEFORE UPDATE ON sites
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;
END;
$$;
