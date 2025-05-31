const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./data.db");

// Initialize users table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      name TEXT,
      gender TEXT,
      role TEXT
    )
  `);
});

module.exports = db;
