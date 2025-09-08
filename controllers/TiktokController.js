import GetData from "../models/getData.js";
import Tiktok from "../models/tiktok.js";

class TiktokController {
  static async index(req, res) {
    try {
      const data = await Tiktok.fetchData();
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

      const data = await Tiktok.fetchReferenceData({ searchQueries });
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
}

export default TiktokController;
