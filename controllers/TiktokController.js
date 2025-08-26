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
}

export default TiktokController;
