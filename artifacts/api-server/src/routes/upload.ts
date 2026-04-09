import { Router } from "express";
import multer from "multer";
import sharp from "sharp";
import { objectStorageClient } from "../lib/objectStorage";

const BUCKET_ID = process.env.DEFAULT_OBJECT_STORAGE_BUCKET_ID!;

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 200 * 1024 * 1024 } });

const router = Router();

router.post("/upload-image", upload.single("image"), async (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  const filename = `img-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`;
  const gcsPath = `uploads/${filename}`;

  try {
    const processed = await sharp(file.buffer)
      .rotate()
      .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();

    const bucket = objectStorageClient.bucket(BUCKET_ID);
    const gcsFile = bucket.file(gcsPath);
    await gcsFile.save(processed, { contentType: "image/jpeg" });

    res.json({ url: `/api/uploads/${filename}` });
  } catch (err) {
    console.error("Image upload error:", err);
    res.status(500).json({ error: "Image processing failed — make sure the file is a valid image (JPEG, PNG, HEIC, WebP, etc.)" });
  }
});

router.get("/uploads/:filename", async (req, res) => {
  const { filename } = req.params;
  const gcsPath = `uploads/${filename}`;

  try {
    const bucket = objectStorageClient.bucket(BUCKET_ID);
    const gcsFile = bucket.file(gcsPath);
    const [exists] = await gcsFile.exists();
    if (!exists) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    gcsFile.createReadStream().pipe(res);
  } catch (err) {
    console.error("Image serve error:", err);
    res.status(500).json({ error: "Failed to serve image" });
  }
});

export default router;
