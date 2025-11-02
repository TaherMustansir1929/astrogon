import { createClient } from "@libsql/client";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  console.error("❌ Error: TURSO_DATABASE_URL environment variable is not set");
  console.log("Please create a .env file with your Turso credentials.");
  process.exit(1);
}

if (!authToken) {
  console.error("❌ Error: TURSO_AUTH_TOKEN environment variable is not set");
  console.log("Please create a .env file with your Turso credentials.");
  process.exit(1);
}

// Create the Turso client
const turso = createClient({
  url,
  authToken,
});

// Initialize the database schema
async function initializeDatabase() {
  try {
    console.log("🔄 Initializing database...");

    await turso.execute(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        review TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        created_at INTEGER NOT NULL
      )
    `);

    console.log("✅ Database tables created successfully!");
    console.log("🎉 Your review system is ready to use!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to initialize database:", error);
    process.exit(1);
  }
}

// Run the initialization
initializeDatabase();
