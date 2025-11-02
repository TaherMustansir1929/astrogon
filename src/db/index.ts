import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const db_url = process.env.TURSO_DATABASE_URL;
const db_auth_token = process.env.TURSO_AUTH_TOKEN;
if (!db_url || !db_auth_token) {
  throw new Error(
    "Database URL or Auth Token is not set in environment variables"
  );
}

const client = createClient({
  url: db_url!,
  authToken: db_auth_token!,
});
export const db = drizzle({ client });
