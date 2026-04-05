import { Router, type IRouter } from "express";
import { db, featuredSpecialsTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/specials", async (_req, res) => {
  try {
    const rows = await db.select().from(featuredSpecialsTable).orderBy(asc(featuredSpecialsTable.sortOrder));
    res.json(rows);
  } catch {
    res.status(500).json({ error: "Failed to load specials" });
  }
});

router.post("/specials", async (req, res) => {
  const body = req.body;
  try {
    const [row] = await db.insert(featuredSpecialsTable).values({
      title: body.title,
      badge: body.badge ?? "",
      description: body.description ?? "",
      imageUrl: body.imageUrl ?? "",
      linkUrl: body.linkUrl ?? "",
      sortOrder: body.sortOrder ?? 0,
      active: body.active ?? true,
    }).returning();
    res.json(row);
  } catch {
    res.status(500).json({ error: "Failed to create special" });
  }
});

router.put("/specials/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const body = req.body;
  try {
    const [row] = await db.update(featuredSpecialsTable)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(featuredSpecialsTable.id, id))
      .returning();
    res.json(row);
  } catch {
    res.status(500).json({ error: "Failed to update special" });
  }
});

router.delete("/specials/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await db.delete(featuredSpecialsTable).where(eq(featuredSpecialsTable.id, id));
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "Failed to delete special" });
  }
});

export default router;
