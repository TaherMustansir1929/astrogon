import type { APIRoute } from "astro";
import { getReviews } from "@lib/turso";

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const reviews = await getReviews();

    return new Response(JSON.stringify({ reviews }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch reviews" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
