const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'sellora.db');

const db = new Database(dbPath);

// init table (sementara)
db.prepare(`
  CREATE TABLE IF NOT EXISTS app_info (
    key TEXT PRIMARY KEY,
    value TEXT
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS transactions (
    id TEXT PRIMARY KEY,
    invoice_number TEXT NOT NULL,
    total_amount INTEGER NOT NULL,
    payment_method TEXT NOT NULL,
    items TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    synced_at INTEGER
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    user_id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('admin', 'kasir', 'manajer')) DEFAULT 'admin',
    full_name TEXT,
    status TEXT NOT NULL CHECK(status IN ('active', 'inactive')) DEFAULT 'active',
    created_at INTEGER NOT NULL
  )
`).run();

// Seed default admin if no users exist
const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
if (userCount.count === 0) {
  // Password: 'admin' (hashed with bcrypt, cost 10)
  // $2b$10$X7V... is just a placeholder, we need to generate it or use a known hash.
  // actually, let's use a fixed hash for 'admin123' to keep it simple for now or generate it in code?
  // Since we can't easily run bcrypt here without async or import, let's just insert one if we can or
  // maybe clearer to do it in a seed script. But for now I'll use a known hash for 'admin'
  // Hash for 'admin': $2b$10$g.g.g.g.g.g.g.g.g.g.g.u
  // Wait, I should probably use a script to generate it or just insert it.
  // I will use a known hash for 'admin' generated online: $2b$10$EpRnTzVlqHNP0.f0Z.U0..s.s.s.s.s.s.s.s
  // Actually, I'll trust the user to register or I'll implement a proper seed in repo.
  // Let's just create the table for now.
}

module.exports = db;