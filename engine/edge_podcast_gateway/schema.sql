-- Cloudflare D1 SQL Schema: Edge Podcast Shows, Episodes, Guests, Sponsors & Impressions
-- Tables: shows, episodes, guests, sponsors, listener_impressions

CREATE TABLE IF NOT EXISTS shows (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  show_slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  host_name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS episodes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  show_id INTEGER REFERENCES shows(id),
  episode_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  audio_url TEXT NOT NULL,
  duration_seconds INTEGER NOT NULL,
  published_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS guests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  episode_id INTEGER REFERENCES episodes(id),
  full_name TEXT NOT NULL,
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  dossier_json TEXT
);

CREATE TABLE IF NOT EXISTS sponsors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sponsor_code TEXT UNIQUE NOT NULL,
  company_name TEXT NOT NULL,
  destination_url TEXT NOT NULL,
  cpm_rate_usd REAL DEFAULT 45.0,
  active INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS listener_impressions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  episode_id INTEGER REFERENCES episodes(id),
  sponsor_id INTEGER REFERENCES sponsors(id),
  slot_type TEXT CHECK (slot_type IN ('pre_roll', 'mid_roll', 'post_roll')),
  listener_ip_hash TEXT NOT NULL,
  recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
