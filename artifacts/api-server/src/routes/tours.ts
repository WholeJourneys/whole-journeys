import { Router, type IRouter } from "express";
import { db, tourTagsTable, tourContentTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/tours/tags", async (_req, res) => {
  try {
    const rows = await db.select().from(tourTagsTable);
    const map: Record<string, string[]> = {};
    for (const row of rows) {
      map[row.tourId] = row.categories;
    }
    res.json(map);
  } catch (err) {
    res.status(500).json({ error: "Failed to load tags" });
  }
});

router.put("/tours/tags/:tourId", async (req, res) => {
  const { tourId } = req.params;
  const { categories } = req.body as { categories: string[] };

  if (!Array.isArray(categories)) {
    res.status(400).json({ error: "categories must be an array" });
    return;
  }

  try {
    await db
      .insert(tourTagsTable)
      .values({ tourId, categories })
      .onConflictDoUpdate({
        target: tourTagsTable.tourId,
        set: { categories, updatedAt: new Date() },
      });
    res.json({ tourId, categories });
  } catch (err) {
    res.status(500).json({ error: "Failed to save tags" });
  }
});

router.get("/tours/content", async (_req, res) => {
  try {
    const rows = await db.select().from(tourContentTable);
    const map: Record<string, {
      tourName: string | null;
      description: string | null;
      highlights: string[];
      destination: string | null;
      country: string[];
      groupSize: string | null;
      imageUrl: string | null;
      seoTitle: string | null;
      seoDescription: string | null;
      sortOrder: number | null;
    }> = {};
    for (const row of rows) {
      map[row.tourId] = {
        tourName: row.tourName ?? null,
        description: row.description,
        highlights: row.highlights,
        destination: row.destination ?? null,
        country: row.country ?? [],
        groupSize: row.groupSize ?? null,
        imageUrl: row.imageUrl ?? null,
        seoTitle: row.seoTitle ?? null,
        seoDescription: row.seoDescription ?? null,
        sortOrder: row.sortOrder ?? null,
      };
    }
    res.json(map);
  } catch (err) {
    res.status(500).json({ error: "Failed to load tour content" });
  }
});

router.put("/tours/content/:tourId", async (req, res) => {
  const { tourId } = req.params;
  const { tourName, description, highlights, destination, country, groupSize, imageUrl, seoTitle, seoDescription, sortOrder } = req.body as {
    tourName?: string;
    description?: string;
    highlights?: string[];
    destination?: string;
    country?: string[];
    groupSize?: string;
    imageUrl?: string;
    seoTitle?: string;
    seoDescription?: string;
    sortOrder?: number | null;
  };

  try {
    await db
      .insert(tourContentTable)
      .values({
        tourId,
        tourName: tourName ?? null,
        description: description ?? null,
        highlights: highlights ?? [],
        destination: destination ?? null,
        country: country ?? [],
        groupSize: groupSize ?? null,
        imageUrl: imageUrl ?? null,
        seoTitle: seoTitle ?? null,
        seoDescription: seoDescription ?? null,
        sortOrder: sortOrder ?? null,
      })
      .onConflictDoUpdate({
        target: tourContentTable.tourId,
        set: {
          tourName: tourName ?? null,
          description: description ?? null,
          highlights: highlights ?? [],
          destination: destination ?? null,
          country: country ?? [],
          groupSize: groupSize ?? null,
          imageUrl: imageUrl ?? null,
          seoTitle: seoTitle ?? null,
          seoDescription: seoDescription ?? null,
          sortOrder: sortOrder ?? null,
          updatedAt: new Date(),
        },
      });
    res.json({ tourId, tourName, description, highlights, destination, country, groupSize, imageUrl, seoTitle, seoDescription, sortOrder });
  } catch (err) {
    res.status(500).json({ error: "Failed to save tour content" });
  }
});

router.put("/tours/sortorder/:tourId", async (req, res) => {
  const { tourId } = req.params;
  const { sortOrder } = req.body as { sortOrder: number | null };

  if (sortOrder !== null && typeof sortOrder !== "number") {
    res.status(400).json({ error: "sortOrder must be a number or null" });
    return;
  }

  try {
    const existing = await db.select().from(tourContentTable).where(eq(tourContentTable.tourId, tourId)).limit(1);
    if (existing.length > 0) {
      await db.update(tourContentTable).set({ sortOrder: sortOrder ?? null, updatedAt: new Date() }).where(eq(tourContentTable.tourId, tourId));
    } else {
      await db.insert(tourContentTable).values({ tourId, sortOrder: sortOrder ?? null, highlights: [], country: [] });
    }
    res.json({ tourId, sortOrder });
  } catch (err) {
    res.status(500).json({ error: "Failed to save sort order" });
  }
});

export default router;
