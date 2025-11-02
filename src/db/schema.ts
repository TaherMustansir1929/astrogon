import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const reviews = sqliteTable("reviews", {
  id: integer(),
  name: text(),
  review: text(),
  timestamp: text(),
  createdAt: integer(),
});
