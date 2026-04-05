import { Router, type IRouter } from "express";
import { db, tourTagsTable, tourContentTable } from "@workspace/db";
import { eq } from "drizzle-orm";

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
    const map: Record<string, { description: string | null; highlights: string[]; destination: string | null; groupSize: string | null }> = {};
    for (const row of rows) {
      map[row.tourId] = {
        description: row.description,
        highlights: row.highlights,
        destination: row.destination ?? null,
        groupSize: row.groupSize ?? null,
      };
    }
    res.json(map);
  } catch (err) {
    res.status(500).json({ error: "Failed to load tour content" });
  }
});

router.put("/tours/content/:tourId", async (req, res) => {
  const { tourId } = req.params;
  const { description, highlights, destination, groupSize } = req.body as {
    description?: string;
    highlights?: string[];
    destination?: string;
    groupSize?: string;
  };

  try {
    await db
      .insert(tourContentTable)
      .values({
        tourId,
        description: description ?? null,
        highlights: highlights ?? [],
        destination: destination ?? null,
        groupSize: groupSize ?? null,
      })
      .onConflictDoUpdate({
        target: tourContentTable.tourId,
        set: {
          description: description ?? null,
          highlights: highlights ?? [],
          destination: destination ?? null,
          groupSize: groupSize ?? null,
          updatedAt: new Date(),
        },
      });
    res.json({ tourId, description, highlights, destination, groupSize });
  } catch (err) {
    res.status(500).json({ error: "Failed to save tour content" });
  }
});

export default router;
