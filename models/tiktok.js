import { ApifyClient } from "apify-client";
import { mapTikTokData } from "../lib/utils/mapTiktokData.js";
import GetData from "./getData.js";
import { TASKS } from "../lib/utils/taskId.js";

class Tiktok {
  static async fetchData({ input, startDate, endDate }) {
    try {
      const client = new ApifyClient({
        token: process.env.APIFY_TOKEN,
      });

      const taskInput = {
        excludePinnedPosts: false,
        newestPostDate: endDate || new Date(),
        oldestPostDateUnified: startDate || new Date(),
        profileScrapeSections: ["videos"],
        profiles: Array.isArray(input) ? input : [input],
        resultsPerPage: 50,
        shouldDownloadAvatars: false,
        shouldDownloadCovers: false,
        shouldDownloadSlideshowImages: false,
        shouldDownloadSubtitles: false,
        shouldDownloadVideos: false,
      };

      const run = await client.task(TASKS.getEvalTiktok).call(taskInput);
      const items = await GetData.getDataDetailKontenPost(run.defaultDatasetId);
      const mappedData = mapTikTokData(items, run.defaultDatasetId);

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
        postURLs: Array.isArray(postUrl) ? postUrl : [postUrl],
        resultsPerPage: 50,
        scrapeRelatedVideos: false,
        shouldDownloadCovers: false,
        shouldDownloadSlideshowImages: false,
        shouldDownloadSubtitles: false,
        shouldDownloadVideos: false,
      };

      const run = await client.task(TASKS.detailDataTiktok).call(input);
      const items = await GetData.getDataDetailKonten(run.defaultDatasetId);
      const mappedData = mapTikTokData(items, run.defaultDatasetId);

      return mappedData;
    } catch (error) {
      console.error("Error fetchData:", error);
      throw new Error(`Error fetching data: ${error.message}`);
    }
  }

  static async fetchReferenceData({ searchQueries, sort, time }) {
    try {
      const client = new ApifyClient({
        token: process.env.APIFY_TOKEN,
      });

      const input = {
        customMapFunction: "(object) => { return {...object} }",
        dateRange: time,
        includeSearchKeywords: false,
        keywords: Array.isArray(searchQueries)
          ? searchQueries
          : [searchQueries],
        location: "ID",
        maxItems: 50,
        sortType: sort,
      };

      const run = await client.task(TASKS.referensiTiktok).call(input);
      const items = await GetData.getDataDetailKonten(run.defaultDatasetId);
      const mappedData = mapTikTokData(items, run.defaultDatasetId);

      return mappedData;
    } catch (error) {
      console.error("Error fetchData:", error);
      throw new Error(`Error fetching data: ${error.message}`);
    }
  }
}

export default Tiktok;
