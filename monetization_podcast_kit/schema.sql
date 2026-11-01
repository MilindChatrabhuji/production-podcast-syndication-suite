-- Cloudflare D1 SQL Schema: Podcast Retainers, Contracts, and Invoices
-- Tables: podcast_clients, retainer_contracts, podcast_invoices, episode_deliverables

CREATE TABLE IF NOT EXISTS podcast_clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_name TEXT NOT NULL,
  client_email TEXT UNIQUE NOT NULL,
  show_title TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS retainer_contracts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER REFERENCES podcast_clients(id),
  retainer_tier TEXT NOT NULL CHECK (retainer_tier IN ('starter', 'growth', 'studio')),
  monthly_fee_usd REAL NOT NULL,
  monthly_episode_quota INTEGER DEFAULT 4,
  start_date DATE NOT NULL,
  active INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS podcast_invoices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invoice_number TEXT UNIQUE NOT NULL,
  client_id INTEGER REFERENCES podcast_clients(id),
  total_usd REAL NOT NULL,
  total_inr REAL NOT NULL,
  settlement_status TEXT DEFAULT 'pending' CHECK (settlement_status IN ('pending', 'settled', 'cancelled')),
  settlement_channel TEXT CHECK (settlement_channel IN ('upi', 'paypal')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS episode_deliverables (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  contract_id INTEGER REFERENCES retainer_contracts(id),
  episode_title TEXT NOT NULL,
  audio_lufs_level REAL DEFAULT -16.0,
  show_notes_delivered INTEGER DEFAULT 0,
  audiograms_delivered INTEGER DEFAULT 0,
  delivery_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
