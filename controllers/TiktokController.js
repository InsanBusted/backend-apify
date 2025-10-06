import prisma from "../lib/db/prisma.js";
import GetData from "../models/getData.js";
import Tiktok from "../models/tiktok.js";

class TiktokController {
  static async index(req, res) {
    try {
      let { input } = req.body;
      let { startDate } = req.body;
      let { endDate } = req.body;

      if (typeof input === "string") {
        input = input.split(/\s+/);
      }

      if (!Array.isArray(input) || input.length === 0) {
        return res.status(400).json({
          success: false,
          message: "input must be a non-empty string or array",
        });
      }
      const data = await Tiktok.fetchData({ input, startDate, endDate });
      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "error fetch",
        error: error.message,
      });
    }
  }

  static async reference(req, res) {
    try {
      let { searchQueries } = req.body;
      let { sort } = req.body;
      let { time } = req.body;
      if (typeof searchQueries === "string") {
        searchQueries = searchQueries
          .split(/\n+/)
          .map((s) => s.trim())
          .filter((s) => s !== "");
      }

      if (!Array.isArray(searchQueries) || searchQueries.length === 0) {
        return res.status(400).json({
          success: false,
          message: "searchQueries must be a non-empty string or array",
        });
      }

      const data = await Tiktok.fetchReferenceData({ searchQueries, sort, time });
      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "error fetch",
        error: error.message,
      });
    }
  }

  static async getDetailKonten(req, res) {
    try {
      let { postUrl } = req.body;

      if (typeof postUrl === "string") {
        postUrl = postUrl.split(/\s+/);
      }

      if (!Array.isArray(postUrl) || postUrl.length === 0) {
        return res.status(400).json({
          success: false,
          message: "postUrl must be a non-empty string or array",
        });
      }

      const data = await Tiktok.fetchDetailData({ postUrl });
      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "error fetch",
        error: error.message,
      });
    }
  }

  static async getAllAkunBankKonten(req, res) {
    try {
      const videos = await prisma.video.findMany({
        where: {
          source: 'bank-konten',
        },
        select: {
          author: true,
          createDate: true,
        },
        orderBy: {
          createDate: 'desc', // tampilkan yang terbaru dulu
        },
        distinct: ['author'], // hanya satu data per akun
      });

      const data = videos.map((v) => ({
        author: v.author,
        createDate: v.createDate.toISOString(),
      }));

      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }


}

export default TiktokController;
