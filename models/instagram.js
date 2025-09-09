import { ApifyClient } from "apify-client";
import { mapTikTokData } from "../lib/utils/mapTiktokData.js";
import GetData from "./getData.js";
import { mapInstagramData } from "../lib/utils/mapInstagramData.js";
import { TASKS } from "../lib/utils/taskId.js";

class Instagram {
  static async fetchReferenceDataInstagram({ search }) {
    try {
      const client = new ApifyClient({
        token: process.env.APIFY_TOKEN,
      });

      const input = {
        addParentData: false,
        enhanceUserSearchWithFacebookPage: false,
        isUserReelFeedURL: false,
        isUserTaggedFeedURL: false,
        resultsLimit: 5,
        resultsType: "posts",
        search: search,
        searchLimit: 1,
      };

      const run = await client.task(TASKS.referensiInstagram).call(input);
      const items = await GetData.getDataDetailKontenInstagram(
        run.defaultDatasetId
      );
      const mappedData = mapInstagramData(items, run.defaultDatasetId);

      return mappedData;
    } catch (error) {
      console.error("Error fetchData:", error);
      throw new Error(`Error fetching data: ${error.message}`);
    }
  }

  static async fetchDetailData({ postUrl }) {
    try {
      const client = new ApifyClient({
        token: process.env.APIFY_TOKEN,
      });

      const input = {
        username: Array.isArray(postUrl) ? postUrl : [postUrl],
        resultsLimit: 30,
        skipPinnedPosts: false,
      };

      const run = await client.task(TASKS.detailDataInstagram).call(input);
      const items = await GetData.getDataDetailKontenInstagramPost(
        run.defaultDatasetId
      );
      const mappedData = mapInstagramData(items, run.defaultDatasetId);

      return mappedData;
    } catch (error) {
      console.error("Error fetchData:", error);
      throw new Error(`Error fetching data: ${error.message}`);
    }
  }
}

export default Instagram;
