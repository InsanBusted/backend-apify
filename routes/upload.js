import express from "express";
import multer from "multer";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3, BUCKET, PUBLIC_URL } from "../lib/minio.js";

const router = express.Router();

// Gunakan memory storage, nanti langsung dikirim ke S3
const upload = multer({ storage: multer.memoryStorage() });

// 📦 Upload multiple files
router.post("/", upload.array("files"), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    // Upload semua file ke bucket
    const uploadedFiles = await Promise.all(
      req.files.map(async (file) => {
        const filename = `${Date.now()}-${file.originalname}`;

        await s3.send(
          new PutObjectCommand({
            Bucket: BUCKET,
            Key: filename,
            Body: file.buffer,
            ContentType: file.mimetype,
          })
        );

        // Kembalikan URL publik
        return {
          originalname: file.originalname,
          filename,
          url: `${PUBLIC_URL}/${filename}`,
          mimetype: file.mimetype,
          size: file.size,
        };
      })
    );

    return res.json({ success: true, files: uploadedFiles });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
