import { callShopeeAPI, callShopeeGetAPI } from "../helper/shopeeClient.js";

class Shopee {
  static async getShopeeAffiliate(userAgent,categoryId = 100635, maxItems = 50) {
    try {
      const url = "https://seller.shopee.co.id/api/v3/affiliateplatform/creator/list";

      let offset = 0;
      const limit = 12;
      let allCreators = [];

      while (allCreators.length < maxItems) {
        const body = {
          offset,
          page_type: "ams_kol_marketplace",
          limit,
          request_id: crypto.randomUUID(),
          is_liked_kol: false,
          category_id_list: [categoryId],
          show_meta_link: 0,
        };

        const res = await callShopeeAPI(url, body, userAgent);
        const creators = res?.data?.list ?? [];

        if (creators.length === 0) break;

        allCreators.push(...creators);

        if (allCreators.length >= maxItems) {
          allCreators = allCreators.slice(0, maxItems);
          break;
        }

        offset += limit;
      }

      return {
        success: true,
        message: "Data affiliate berhasil diambil",
        total: allCreators.length,
        data: allCreators,
      };
    } catch (error) {
      console.error(`Error fetching data dari API: ${error.message}`);
      throw error;
    }
  }

  static async getShopeeDetailAffiliate(userAgent,affiliateId ,sort) {
    try {
      const url =
        "https://seller.shopee.co.id/api/v3/affiliateplatform/creator/detail";
      const body = {
        affiliate_id: affiliateId,
        data_period: sort
      };

      const data = await callShopeeAPI(url, body, userAgent);
      return data;
    } catch (error) {
      console.error(`Error fetching data dari API: ${error.message}`);
      throw error;
    }
  }

  static async getShopeeCategoryAffiliate(userAgent) {
    try {
      const url =
        "https://seller.shopee.co.id/api/v3/affiliateplatform/commissions/category_setting";
     

      const data = await callShopeeGetAPI(url, userAgent);
      return data;
    } catch (error) {
      console.error(`Error fetching data dari API: ${error.message}`);
      throw error;
    }
  }

}

export default Shopee;
