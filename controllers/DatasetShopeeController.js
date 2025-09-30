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
      const affiliateId = req.body.affiliate_id;
      const sort = req.body.sort || 30;

      if (!affiliateId) {
        return res.status(400).json({
          success: false,
          message: "affiliate_id is required",
        });
      }

      const data = await Shopee.getShopeeDetailAffiliate(req.shopeeUserAgent, affiliateId, sort);
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

  static async getListDetailAffiliate(req, res) {
    try {
      const categoryId = req.query.category_id || 100635;
      const maxItems = parseInt(req.query.max_items) || 50;
      const sort = req.query.sort;

      const response = await Shopee.getShopeeAffiliate(
        req.shopeeUserAgent,
        categoryId,
        maxItems
      );

      const dataAffiliate = response.data || [];

      // Ambil hanya affiliate_id
      const affiliateIds = dataAffiliate.map((data) => data.affiliate_id);

      res.status(200).json({
        success: true,
        message: "List affiliate_id berhasil diambil",
        total: affiliateIds.length,
        affiliate_ids: affiliateIds,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Gagal mengambil affiliate_id",
      });
    }
  }



}

export default DatasetShopeeController;
