import Shopee from "../models/shopee.js";

class DatasetShopeeController {
  static async getAffiliate(req, res) {
    try {
      const data = await Shopee.getShopeeAffiliate();
      res.status(200).json({
        success: true,
        message: "Data affiliate berhasil diambil",
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Gagal mengambil data affiliate",
      });
    }
  }
}

export default DatasetShopeeController;
