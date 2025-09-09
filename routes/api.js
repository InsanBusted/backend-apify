import { Router } from "express";
import TiktokController from "../controllers/TiktokController.js";
import DatasetController from "../controllers/DatasetController.js";
import InstagramController from "../controllers/InstagramController.js";

const router = Router();

// Evaluasi konten berl
router.get("/tiktok/run", TiktokController.index);
// Konten Referensi
router.post("/tiktok/run-reference", TiktokController.reference);
// DETAIL KONTEN
router.post("/tiktok/run-detail", TiktokController.getDetailKonten);
// ALL KONTEN
router.get("/tiktok/konten", DatasetController.getAllData);
router.get("/instagram/konten", DatasetController.getAllDataInstagram);

// instagram
router.post("/instagram/run-reference", InstagramController.reference);
router.get("/instagram/:datasetId" , InstagramController.getData)


// Simpan ke Database
router.get("/tiktok/:datasetId", DatasetController.getDetailData);
export default router;
