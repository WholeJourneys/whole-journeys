import { pgTable, serial, text, boolean, integer, timestamp } from "drizzle-orm/pg-core";

export const featuredSpecialsTable = pgTable("featured_specials", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  badge: text("badge").notNull().default(""),
  description: text("description").notNull().default(""),
  imageUrl: text("image_url").notNull().default(""),
  linkUrl: text("link_url").notNull().default(""),
  referralTag: text("referral_tag").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type FeaturedSpecial = typeof featuredSpecialsTable.$inferSelect;
