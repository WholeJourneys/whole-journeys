import { pgTable, serial, text, boolean, integer, timestamp } from "drizzle-orm/pg-core";

export const picksHotelsTable = pgTable("picks_hotels", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull().default(""),
  description: text("description").notNull().default(""),
  imageUrl: text("image_url").notNull().default(""),
  bookUrl: text("book_url").notNull().default("https://travelpro365.com/consumer/wholejourneys"),
  perk1: text("perk1").notNull().default(""),
  perk2: text("perk2").notNull().default(""),
  perk3: text("perk3").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const picksArticlesTable = pgTable("picks_articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull().default(""),
  category: text("category").notNull().default(""),
  imageUrl: text("image_url").notNull().default(""),
  url: text("url").notNull().default(""),
  readTime: text("read_time").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const picksTripsTable = pgTable("picks_trips", {
  tourId: text("tour_id").primaryKey(),
  sortOrder: integer("sort_order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  customUrl: text("custom_url").notNull().default(""),
});

export type PicksHotel = typeof picksHotelsTable.$inferSelect;
export type PicksArticle = typeof picksArticlesTable.$inferSelect;
export type PicksTrip = typeof picksTripsTable.$inferSelect;
