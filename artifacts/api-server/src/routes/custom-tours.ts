import { Router, type IRouter } from "express";
import { db, customToursTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";

const router: IRouter = Router();

// ─── FETCH URL METADATA ───────────────────────────────────────────────────────

router.get("/fetch-url-meta", async (req, res) => {
  const url = req.query.url as string;
  if (!url) {
    res.status(400).json({ error: "url is required" });
    return;
  }
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; WJBot/1.0)" },
      signal: AbortSignal.timeout(8000),
    });
    const html = await response.text();

    const getTag = (property: string): string => {
      const match = html.match(
        new RegExp(`<meta[^>]+(?:property|name)=["']${property}["'][^>]*content=["']([^"']+)["']`, "i")
      ) || html.match(
        new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name)=["']${property}["']`, "i")
      );
      return match?.[1] ?? "";
    };

    const titleTag = html.match(/<title[^>]*>([^<]+)<\/title>/i);

    res.json({
      title: getTag("og:title") || titleTag?.[1]?.trim() || "",
      imageUrl: getTag("og:image") || "",
    });
  } catch {
    res.status(500).json({ error: "Failed to fetch URL metadata" });
  }
});

// ─── CUSTOM TOURS CRUD ────────────────────────────────────────────────────────

router.get("/custom-tours", async (_req, res) => {
  try {
    const rows = await db
      .select()
      .from(customToursTable)
      .orderBy(asc(customToursTable.sortOrder), asc(customToursTable.id));
    res.json(rows);
  } catch {
    res.status(500).json({ error: "Failed to load custom tours" });
  }
});

router.post("/custom-tours", async (req, res) => {
  const b = req.body;
  try {
    const [row] = await db
      .insert(customToursTable)
      .values({
        name: b.name ?? "",
        destination: b.destination ?? "",
        region: b.region ?? "Europe",
        country: Array.isArray(b.country) ? b.country : [],
        groupSize: b.groupSize ?? "Private departures for 2+",
        categories: Array.isArray(b.categories) ? b.categories : [],
        description: b.description ?? "",
        highlights: Array.isArray(b.highlights) ? b.highlights : [],
        imageUrl: b.imageUrl ?? "",
        itineraryUrl: b.itineraryUrl ?? "",
        sortOrder: b.sortOrder ?? 0,
        active: b.active ?? true,
      })
      .returning();
    res.json(row);
  } catch {
    res.status(500).json({ error: "Failed to create tour" });
  }
});

router.put("/custom-tours/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const b = req.body;
  try {
    const [row] = await db
      .update(customToursTable)
      .set({
        name: b.name,
        destination: b.destination,
        region: b.region,
        country: Array.isArray(b.country) ? b.country : [],
        groupSize: b.groupSize,
        categories: Array.isArray(b.categories) ? b.categories : [],
        description: b.description,
        highlights: Array.isArray(b.highlights) ? b.highlights : [],
        imageUrl: b.imageUrl,
        itineraryUrl: b.itineraryUrl,
        sortOrder: b.sortOrder,
        active: b.active,
        updatedAt: new Date(),
      })
      .where(eq(customToursTable.id, id))
      .returning();
    res.json(row);
  } catch {
    res.status(500).json({ error: "Failed to update tour" });
  }
});

router.delete("/custom-tours/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await db.delete(customToursTable).where(eq(customToursTable.id, id));
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "Failed to delete tour" });
  }
});

export default router;
