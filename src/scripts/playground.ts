import { db } from "@/db";
import { reviews } from "@/db/schema";

const result = await db.select().from(reviews);
console.log(result);
