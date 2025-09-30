import { Router } from "express";
import TiktokController from "../controllers/TiktokController.js";
import DatasetController from "../controllers/DatasetController.js";
import InstagramController from "../controllers/InstagramController.js";
import DatasetShopeeController from "../controllers/DatasetShopeeController.js";

const router = Router();

/**
 * @swagger
 * /tiktok/run:
 *   get:
 *     summary: Evaluasi konten TikTok
 *     description: Mengambil daftar video TikTok beserta metrik dan hashtags
 *     responses:
 *       200:
 *         description: Data evaluasi berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       datasetId:
 *                         type: string
 *                         example: "cC94jVXJmHcdNT8bd"
 *                       id:
 *                         type: string
 *                         example: "7482626165547584814"
 *                       iklan:
 *                         type: boolean
 *                         example: false
 *                       text:
 *                         type: string
 *                         example: "chat noir?!?! | #fyp #foryoupage ..."
 *                       createTimeISO:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-03-17T04:11:34.000Z"
 *                       likeCount:
 *                         type: integer
 *                         example: 0
 *                       webVideoUrl:
 *                         type: string
 *                         example: "https://www.tiktok.com/@chatnoirfx/video/7482626165547584814"
 *                       shareCount:
 *                         type: integer
 *                         example: 140500
 *                       playCount:
 *                         type: integer
 *                         example: 16400000
 *                       searchQueries:
 *                         type: string
 *                         example: ""
 *                       collectCount:
 *                         type: integer
 *                         example: 427100
 *                       commentCount:
 *                         type: integer
 *                         example: 10100
 *                       coverVideo:
 *                         type: string
 *                         example: "https://p19-pu-sign-useast8.tiktokcdn-us.com/..."
 *                       hashtags:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                               example: "fyp"
 */

router.post("/tiktok/run", TiktokController.index);
router.post("/instagram/run", InstagramController.index);

/**
 * @swagger
 * /tiktok/run-reference:
 *   post:
 *     summary: Tambah konten referensi TikTok
 *     description: Mengirimkan daftar kata kunci (searchQueries) untuk diambil datanya
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               searchQueries:
 *                 oneOf:
 *                   - type: string
 *                     example: "insan, kamil"
 *                   - type: array
 *                     items:
 *                       type: string
 *                     example: ["insan", "kamil"]
 *     responses:
 *       200:
 *         description: Konten referensi berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       datasetId:
 *                         type: string
 *                         example: "cC94jVXJmHcdNT8bd"
 *                       id:
 *                         type: string
 *                         example: "7482626165547584814"
 *                       iklan:
 *                         type: boolean
 *                         example: false
 *                       text:
 *                         type: string
 *                         example: "chat noir?!?! | #fyp #foryoupage ..."
 *                       createTimeISO:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-03-17T04:11:34.000Z"
 *                       likeCount:
 *                         type: integer
 *                         example: 0
 *                       webVideoUrl:
 *                         type: string
 *                         example: "https://www.tiktok.com/@chatnoirfx/video/7482626165547584814"
 *                       shareCount:
 *                         type: integer
 *                         example: 140500
 *                       playCount:
 *                         type: integer
 *                         example: 16400000
 *                       searchQueries:
 *                         type: string
 *                         example: ""
 *                       collectCount:
 *                         type: integer
 *                         example: 427100
 *                       commentCount:
 *                         type: integer
 *                         example: 10100
 *                       coverVideo:
 *                         type: string
 *                         example: "https://p19-pu-sign-useast8.tiktokcdn-us.com/..."
 *                       hashtags:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                               example: "fyp"
 *       400:
 *         description: Request body tidak valid (kosong atau bukan string/array)
 *       500:
 *         description: Error internal server
 */

router.post("/tiktok/run-reference", TiktokController.reference);

/**
 * @swagger
 * /tiktok/run-detail:
 *   post:
 *     summary: Ambil detail konten TikTok
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               videoId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Detail konten berhasil diambil
 */
router.post("/tiktok/run-detail", TiktokController.getDetailKonten);
router.post("/instagram/run-detail", InstagramController.getDetailKonten);

/**
 * @swagger
 * /tiktok/konten:
 *   get:
 *     summary: Ambil semua konten TikTok
 *     responses:
 *       200:
 *         description: Semua konten TikTok berhasil diambil
 */
router.get("/tiktok/konten", DatasetController.getAllData);
router.get("/tiktok/konten/bankData", DatasetController.getAllDataBankData);

/**
 * @swagger
 * /instagram/konten:
 *   get:
 *     summary: Ambil semua konten Instagram
 *     responses:
 *       200:
 *         description: Semua konten Instagram berhasil diambil
 */
router.get("/instagram/konten", DatasetController.getAllDataInstagram);
router.get(
  "/instagram/konten/bankData",
  DatasetController.getAllDataInstagramBankData
);

/**
 * @swagger
 * /instagram/run-reference:
 *   post:
 *     summary: Tambah konten referensi Instagram
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               datasetId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Konten referensi Instagram berhasil ditambahkan
 */
router.post("/instagram/run-reference", InstagramController.reference);

/**
 * @swagger
 * /instagram/{datasetId}:
 *   get:
 *     summary: Ambil data Instagram berdasarkan datasetId
 *     parameters:
 *       - in: path
 *         name: datasetId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID dataset Instagram
 *     responses:
 *       200:
 *         description: Data Instagram berhasil diambil
 */
router.get("/instagram/:datasetId", InstagramController.getData);
router.get(
  "/instagram/detail/:datasetId",
  InstagramController.getDataDetailAnalisis
);
router.get(
  "/instagram/detail/bankdata/:datasetId",
  InstagramController.getDataDetailInstagram
);

/**
 * @swagger
 * /tiktok/{datasetId}:
 *   get:
 *     summary: Ambil detail data TikTok berdasarkan datasetId
 *     parameters:
 *       - in: path
 *         name: datasetId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID dataset TikTok
 *     responses:
 *       200:
 *         description: Detail data TikTok berhasil diambil
 */
router.get("/tiktok/:datasetId", DatasetController.getDetailData);
router.get(
  "/tiktok/detail/:datasetId",
  DatasetController.getDetailDataAnalisis
);
router.get(
  "/tiktok/referensi/:datasetId",
  DatasetController.getDetailDataReferensi
);


// SHOPEE
router.get("/shopee/get_affiliate", DatasetShopeeController.getAffiliate);
router.post("/shopee/detail_affiliate", DatasetShopeeController.getDetailAffiliate);
router.get("/shopee/category_affiliate", DatasetShopeeController.getCategoryAffiliate);
router.get("/shopee/list_affiliate", DatasetShopeeController.getListDetailAffiliate);

export default router;
