import { createClient, type Client } from "@libsql/client/web";

// Review type
export interface Review {
  id: number;
  name: string;
  review: string;
  timestamp: string;
  created_at: number;
}

// Lazy initialize the client to avoid issues with SSR/build
let tursoClient: Client | null = null;

function getTursoClient(): Client {
  if (tursoClient) {
    return tursoClient;
  }

  // Get environment variables - works in both Astro and Cloudflare runtime
  const url = import.meta.env.TURSO_DATABASE_URL;
  const authToken = import.meta.env.TURSO_AUTH_TOKEN;

  if (!url) {
    throw new Error("TURSO_DATABASE_URL environment variable is not set");
  }

  if (!authToken) {
    throw new Error("TURSO_AUTH_TOKEN environment variable is not set");
  }

  // Create and cache the Turso client (web version for Cloudflare compatibility)
  tursoClient = createClient({
    url,
    authToken,
  });

  return tursoClient;
}

// Add a new review
export async function addReview(name: string, review: string): Promise<Review> {
  const turso = getTursoClient();
  const timestamp = new Date().toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });
  const created_at = Date.now();

  const result = await turso.execute({
    sql: "INSERT INTO reviews (name, review, timestamp, created_at) VALUES (?, ?, ?, ?)",
    args: [name, review, timestamp, created_at],
  });

  return {
    id: Number(result.lastInsertRowid),
    name,
    review,
    timestamp,
    created_at,
  };
}

// Get all reviews (sorted by newest first)
export async function getReviews(): Promise<Review[]> {
  const turso = getTursoClient();
  const result = await turso.execute(
    "SELECT * FROM reviews ORDER BY created_at DESC"
  );

  return result.rows.map((row) => ({
    id: row.id as number,
    name: row.name as string,
    review: row.review as string,
    timestamp: row.timestamp as string,
    created_at: row.created_at as number,
  }));
}

// Delete a review (optional - for admin use)
export async function deleteReview(id: number): Promise<void> {
  const turso = getTursoClient();
  await turso.execute({
    sql: "DELETE FROM reviews WHERE id = ?",
    args: [id],
  });
}
