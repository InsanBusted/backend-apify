import { Router } from "express";
import TiktokController from "../controllers/TiktokController.js";
import DatasetController from "../controllers/DatasetController.js";

const router = Router();

router.get("/tiktok/run", TiktokController.index);
router.get("/tiktok", DatasetController.getDataset);
router.post("/tiktok/save", DatasetController.saveDataset);

export default router;
