import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";

export const tourContentTable = pgTable("tour_content", {
  tourId: text("tour_id").primaryKey(),
  tourName: text("tour_name"),
  description: text("description"),
  highlights: text("highlights").array().notNull().default([]),
  destination: text("destination"),
  country: text("country").array().notNull().default([]),
  groupSize: text("group_size"),
  imageUrl: text("image_url"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  itineraryUrl: text("itinerary_url"),
  sortOrder: integer("sort_order"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type TourContent = typeof tourContentTable.$inferSelect;
export type InsertTourContent = typeof tourContentTable.$inferInsert;
