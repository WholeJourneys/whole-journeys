import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const tourContentTable = pgTable("tour_content", {
  tourId: text("tour_id").primaryKey(),
  description: text("description"),
  highlights: text("highlights").array().notNull().default([]),
  destination: text("destination"),
  groupSize: text("group_size"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type TourContent = typeof tourContentTable.$inferSelect;
export type InsertTourContent = typeof tourContentTable.$inferInsert;
