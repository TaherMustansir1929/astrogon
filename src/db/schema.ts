import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const reviews = sqliteTable("reviews", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  review: text("review").notNull(),
  timestamp: text("timestamp").notNull(),
  createdAt: integer("createdAt").notNull(),
});
