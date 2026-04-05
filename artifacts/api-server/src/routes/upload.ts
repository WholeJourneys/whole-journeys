import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";

const UPLOADS_DIR = path.join(process.cwd(), "uploads");
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 200 * 1024 * 1024 } });

const router = Router();

router.post("/upload-image", upload.single("image"), async (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  const outputFilename = `img-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`;
  const outputPath = path.join(UPLOADS_DIR, outputFilename);

  try {
    await sharp(file.buffer)
      .rotate()
      .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(outputPath);

    res.json({ url: `/api/uploads/${outputFilename}` });
  } catch (err) {
    console.error("Image processing error:", err);
    res.status(500).json({ error: "Image processing failed — make sure the file is a valid image (JPEG, PNG, HEIC, WebP, etc.)" });
  }
});

export default router;
