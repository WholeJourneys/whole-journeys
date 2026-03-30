import { Router, type IRouter } from "express";
import { db, siteContentTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/content", async (_req, res) => {
  try {
    const rows = await db.select().from(siteContentTable);
    const map: Record<string, string> = {};
    for (const row of rows) {
      map[row.key] = row.value;
    }
    res.json(map);
  } catch {
    res.status(500).json({ error: "Failed to load content" });
  }
});

router.put("/content/:key", async (req, res) => {
  const { key } = req.params;
  const { value } = req.body as { value: string };
  if (typeof value !== "string") {
    res.status(400).json({ error: "value must be a string" });
    return;
  }
  try {
    await db
      .insert(siteContentTable)
      .values({ key, value })
      .onConflictDoUpdate({
        target: siteContentTable.key,
        set: { value, updatedAt: new Date() },
      });
    res.json({ key, value });
  } catch {
    res.status(500).json({ error: "Failed to save content" });
  }
});

export default router;
