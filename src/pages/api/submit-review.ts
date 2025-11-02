import type { APIRoute } from "astro";
<<<<<<< HEAD
import { addReview } from "@lib/turso";
=======
import fs from "fs/promises";
import path from "path";
>>>>>>> ea362aa (Implement Reviews and Features page)

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

<<<<<<< HEAD
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
=======
    // Path to the reviews markdown file
    const reviewsPath = path.join(
      process.cwd(),
      "src",
      "content",
      "docs",
      "reviews.md"
    );

    // Read the existing content
    let content = await fs.readFile(reviewsPath, "utf-8");

    // Create a new review entry with timestamp
    const timestamp = new Date().toLocaleString("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    });

    const newReview = `## ${name}\n*${timestamp}*\n\n${review}\n\n---\n\n`;

    // Split content into frontmatter and body
    const frontmatterMatch = content.match(/^---\n[\s\S]*?\n---\n/);
    const frontmatter = frontmatterMatch ? frontmatterMatch[0] : "";
    const body = frontmatter ? content.slice(frontmatter.length) : content;

    // Prepend the new review to the body (so latest reviews appear first)
    const updatedContent = frontmatter + "\n" + newReview + body.trim();

    // Write back to the file
    await fs.writeFile(reviewsPath, updatedContent, "utf-8");

    return new Response(JSON.stringify({ success: true }), {
>>>>>>> ea362aa (Implement Reviews and Features page)
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
