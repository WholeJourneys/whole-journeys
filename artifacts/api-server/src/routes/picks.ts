import { Router, type IRouter } from "express";
import { db, picksHotelsTable, picksArticlesTable, picksTripsTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";

const router: IRouter = Router();

// ─── HOTELS ───────────────────────────────────────────────────────────────────

router.get("/picks/hotels", async (_req, res) => {
  try {
    const rows = await db.select().from(picksHotelsTable).orderBy(asc(picksHotelsTable.sortOrder));
    res.json(rows);
  } catch {
    res.status(500).json({ error: "Failed to load hotels" });
  }
});

router.post("/picks/hotels", async (req, res) => {
  const body = req.body;
  try {
    const [row] = await db.insert(picksHotelsTable).values({
      name: body.name,
      location: body.location ?? "",
      description: body.description ?? "",
      imageUrl: body.imageUrl ?? "",
      bookUrl: body.bookUrl ?? "https://travelpro365.com/consumer/wholejourneys",
      perk1: body.perk1 ?? "",
      perk2: body.perk2 ?? "",
      perk3: body.perk3 ?? "",
      sortOrder: body.sortOrder ?? 0,
      active: body.active ?? true,
    }).returning();
    res.json(row);
  } catch {
    res.status(500).json({ error: "Failed to create hotel" });
  }
});

router.put("/picks/hotels/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const body = req.body;
  try {
    const [row] = await db.update(picksHotelsTable)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(picksHotelsTable.id, id))
      .returning();
    res.json(row);
  } catch {
    res.status(500).json({ error: "Failed to update hotel" });
  }
});

router.delete("/picks/hotels/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await db.delete(picksHotelsTable).where(eq(picksHotelsTable.id, id));
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "Failed to delete hotel" });
  }
});

// ─── ARTICLES ─────────────────────────────────────────────────────────────────

router.get("/picks/articles", async (_req, res) => {
  try {
    const rows = await db.select().from(picksArticlesTable).orderBy(asc(picksArticlesTable.sortOrder));
    res.json(rows);
  } catch {
    res.status(500).json({ error: "Failed to load articles" });
  }
});

router.post("/picks/articles", async (req, res) => {
  const body = req.body;
  try {
    const [row] = await db.insert(picksArticlesTable).values({
      title: body.title,
      excerpt: body.excerpt ?? "",
      category: body.category ?? "",
      imageUrl: body.imageUrl ?? "",
      url: body.url ?? "",
      readTime: body.readTime ?? "",
      sortOrder: body.sortOrder ?? 0,
      active: body.active ?? true,
    }).returning();
    res.json(row);
  } catch {
    res.status(500).json({ error: "Failed to create article" });
  }
});

router.put("/picks/articles/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const body = req.body;
  try {
    const [row] = await db.update(picksArticlesTable)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(picksArticlesTable.id, id))
      .returning();
    res.json(row);
  } catch {
    res.status(500).json({ error: "Failed to update article" });
  }
});

router.delete("/picks/articles/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await db.delete(picksArticlesTable).where(eq(picksArticlesTable.id, id));
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "Failed to delete article" });
  }
});

// ─── TRIPS ────────────────────────────────────────────────────────────────────

router.get("/picks/trips", async (_req, res) => {
  try {
    const rows = await db.select().from(picksTripsTable).orderBy(asc(picksTripsTable.sortOrder));
    res.json(rows);
  } catch {
    res.status(500).json({ error: "Failed to load trips" });
  }
});

router.put("/picks/trips", async (req, res) => {
  const { trips } = req.body as { trips: { tourId: string; sortOrder: number; active: boolean; customUrl?: string }[] };
  if (!Array.isArray(trips)) {
    res.status(400).json({ error: "trips must be an array" });
    return;
  }
  try {
    await db.delete(picksTripsTable);
    if (trips.length > 0) {
      await db.insert(picksTripsTable).values(trips.map((t) => ({ ...t, customUrl: t.customUrl ?? "" })));
    }
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "Failed to save trips" });
  }
});

export default router;
