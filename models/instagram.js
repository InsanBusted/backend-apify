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
        resultsLimit: 1,
        resultsType: "posts",   
        search: search,
        searchLimit: 1,
        searchType: "hashtag",
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
}

export default Instagram;
