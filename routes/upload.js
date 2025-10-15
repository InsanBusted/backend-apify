import express from "express";
import multer from "multer";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3, BUCKET, PUBLIC_URL } from "../lib/minio.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); 

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const filename = `${Date.now()}-${req.file.originalname}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: filename,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      })
    );

    const linkurl = `${PUBLIC_URL}/${filename}`; 

    return res.json({ success: true, linkurl });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
