import Shopee from "../models/shopee.js";

class DatasetShopeeController {
  static async getAffiliate(req, res) {
    try {
      const categoryId = parseInt(req.query.category_id) || 100635;
      const maxItems = parseInt(req.query.max_items);
      const data = await Shopee.getShopeeAffiliate(req.shopeeUserAgent, categoryId, maxItems);
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

  static async getDetailAffiliate(req, res) {
    try {
      const affiliateId = req.query.affiliate_id;
      const sort = req.query.sort || 30;

      if (!affiliateId) {
        return res.status(400).json({
          success: false,
          message: "affiliate_id is required",
        });
      }

      const data = await Shopee.getShopeeDetailAffiliate(req.shopeeUserAgent,affiliateId,sort);
      res.status(200).json({
        success: true,
        message: "Data affiliate berhasil diambil",
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Gagal mengambil data detail affiliate",
      });
    }
  }

  static async getCategoryAffiliate(req, res) {
    try {
      const data = await Shopee.getShopeeCategoryAffiliate(req.shopeeUserAgent);
      res.status(200).json({
        success: true,
        message: "Data kategori affiliate berhasil diambil",
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Gagal mengambil data kategori affiliate",
      });
    }
  }

}

export default DatasetShopeeController;
