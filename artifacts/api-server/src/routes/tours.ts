import { Router, type IRouter } from "express";
import { db, tourTagsTable } from "@workspace/db";
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

export default router;
