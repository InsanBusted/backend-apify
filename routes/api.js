import { Router } from "express";
import TiktokController from "../controllers/TiktokController.js";
import DatasetController from "../controllers/DatasetController.js";

const router = Router();

// Evaluasi konten berl
router.get("/tiktok/run", TiktokController.index);
// Konten Referensi
router.post("/tiktok/run-reference", TiktokController.reference);
// DETAIL KONTEN
router.post("/tiktok/run-detail", TiktokController.getDetailKonten);
// ALL KONTEN
router.get("/tiktok/konten", DatasetController.getAllData);

// Simpan ke Database
router.get("/tiktok/:datasetId", DatasetController.getDetailData);
export default router;
