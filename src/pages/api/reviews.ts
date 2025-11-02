import type { APIRoute } from "astro";
import { db } from "@/db/index";
import { reviews } from "@/db/schema";
import { desc } from "drizzle-orm";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const name = body.name;
    const review = body.review;

    if (!name || !review) {
      return new Response(
        JSON.stringify({ error: "Name and review are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const timestamp = new Date().toISOString();
    const createdAt = Date.now();

    await db.insert(reviews).values({
      name,
      review,
      timestamp,
      createdAt,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error submitting review:", error);
    return new Response(JSON.stringify({ error: "Failed to submit review" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const GET: APIRoute = async () => {
  try {
    const allReviews = await db
      .select()
      .from(reviews)
      .orderBy(desc(reviews.createdAt));

    return new Response(JSON.stringify(allReviews), {
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
