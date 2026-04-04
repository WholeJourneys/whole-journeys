import { pgTable, serial, text, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const customToursTable = pgTable("custom_tours", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  destination: text("destination").notNull().default(""),
  region: text("region").notNull().default("Europe"),
  country: text("country").array().notNull().default(sql`ARRAY[]::text[]`),
  groupSize: text("group_size").notNull().default("Private departures for 2+"),
  categories: text("categories").array().notNull().default(sql`ARRAY[]::text[]`),
  description: text("description").notNull().default(""),
  highlights: text("highlights").array().notNull().default(sql`ARRAY[]::text[]`),
  imageUrl: text("image_url").notNull().default(""),
  itineraryUrl: text("itinerary_url").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type CustomTour = typeof customToursTable.$inferSelect;
export type InsertCustomTour = typeof customToursTable.$inferInsert;
