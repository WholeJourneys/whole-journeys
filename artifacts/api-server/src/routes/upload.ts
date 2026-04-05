import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const UPLOADS_DIR = path.join(process.cwd(), "uploads");
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
    cb(null, `tmp-${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});

const upload = multer({ storage, limits: { fileSize: 100 * 1024 * 1024 } });

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
    await execAsync(
      `ffmpeg -y -i "${file.path}" -vf "scale='min(1600,iw)':-2" -q:v 4 "${outputPath}"`
    );
    fs.unlinkSync(file.path);
    res.json({ url: `/api/uploads/${outputFilename}` });
  } catch (err) {
    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    res.status(500).json({ error: "Image processing failed" });
  }
});

export default router;
