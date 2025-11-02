import type { APIRoute } from "astro";
import { addReview } from "@lib/turso";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const name = data.name;
    const review = data.review;

    if (!name || !review) {
      return new Response(
        JSON.stringify({ error: "Name and review are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate input lengths
    if (name.trim().length === 0 || review.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Name and review cannot be empty" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Add review to Turso database
    const newReview = await addReview(name.trim(), review.trim());

    return new Response(JSON.stringify({ success: true, review: newReview }), {
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
