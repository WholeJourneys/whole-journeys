import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const tourTagsTable = pgTable("tour_tags", {
  tourId: text("tour_id").primaryKey(),
  categories: text("categories").array().notNull().default([]),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type TourTag = typeof tourTagsTable.$inferSelect;
export type InsertTourTag = typeof tourTagsTable.$inferInsert;
