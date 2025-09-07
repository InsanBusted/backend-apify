import { ApifyClient } from "apify-client";
import { mapTikTokData } from "../lib/utils/mapTiktokData.js";
import GetData from "./getData.js";

class Tiktok {
  static async fetchData() {
    try {
      const client = new ApifyClient({
        token: process.env.APIFY_TOKEN,
      });

      const input = {
        excludePinnedPosts: false,
        newestPostDate: "2025-09-06",
        oldestPostDateUnified: "2025-07-06",
        profileScrapeSections: ["videos"],
        profiles: ["berlofficial"],
        resultsPerPage: 20,
        shouldDownloadAvatars: false,
        shouldDownloadCovers: false,
        shouldDownloadSlideshowImages: false,
        shouldDownloadSubtitles: false,
        shouldDownloadVideos: false,
      };

      const run = await client.task("DIlIcYVjwFabblZ97").call(input);
      const items = await GetData.getDataDetailKonten(run.defaultDatasetId);
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

      const run = await client.task("Lp4AbBQkvUWdaElwD").call(input);
      const items = await GetData.getDataDetailKonten(run.defaultDatasetId);
      const mappedData = mapTikTokData(items, run.defaultDatasetId);

      return mappedData;
    } catch (error) {
      console.error("Error fetchData:", error);
      throw new Error(`Error fetching data: ${error.message}`);
    }
  }

  static async fetchReferenceData({ searchQueries }) {
    try {
      const client = new ApifyClient({
        token: process.env.APIFY_TOKEN,
      });

      const input = {
        excludePinnedPosts: false,
        maxProfilesPerQuery: 5,
        profileSorting: "latest",
        proxyCountryCode: "ID",
        resultsPerPage: 5,
        scrapeRelatedVideos: false,
        searchQueries: Array.isArray(searchQueries)
          ? searchQueries
          : [searchQueries],
        searchSection: "/video",
        shouldDownloadAvatars: false,
        shouldDownloadCovers: false,
        shouldDownloadMusicCovers: false,
        shouldDownloadSlideshowImages: false,
        shouldDownloadSubtitles: false,
        shouldDownloadVideos: false,
      };

      const run = await client.task("y6PSprJnIEv5nLpas").call(input);
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
