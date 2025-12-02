import { ApifyClient } from "apify-client";
import { mapTikTokData } from "../lib/utils/mapTiktokData.js";
import GetData from "./getData.js";
import { TASKS } from "../lib/utils/taskId.js";
import prisma from "../lib/db/prisma.js";

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

  static async saveInsight({ cookie, awemeId, insightUrl }) {
    try {
      const response = await fetch(insightUrl, {
        headers: {
          Cookie: cookie,
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!data) {
        throw new Error("Response kosong dari TikTok");
      }

      const realtime = data || {};
      const author = realtime.video_info.author.unique_id || "username";

      const mapped = {
        awemeId,
        webVideoUrl:
          `https://www.tiktok.com/@${author}/video/${awemeId}` || null,
        author: author,

        averageWatchTimeTotal:
          realtime?.realtime_average_watch_time_history?.total ?? null,

        finishRateTotal: realtime?.realtime_finish_rate_history?.total ?? null,

        newFollowersTotal:
          realtime?.realtime_new_followers_history?.total ?? null,

        totalPlayTime:
          realtime?.realtime_total_play_time_history?.total ?? null,

        totalVideoViews: realtime?.realtime_video_view_history?.total ?? null,

        averageWatchTimeHistory:
          realtime?.realtime_average_watch_time_history?.list ?? null,

        finishRateHistory: realtime?.realtime_finish_rate_history?.list ?? null,

        newFollowersHistory:
          realtime?.realtime_new_followers_history?.list ?? null,

        totalPlayTimeHistory:
          realtime?.realtime_total_play_time_history?.list ?? null,

        videoViewHistory: realtime?.realtime_video_view_history?.list ?? null,

        rawData: data,
      };
      const saved = await prisma.tikTokInsight.create({
        data: mapped,
      });

      return saved;
    } catch (error) {
      throw new Error(error?.message || "Gagal mengambil insight TikTok");
    }
  }

  static async getAll() {
    try {
      const insights = await prisma.tikTokInsight.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      return insights;  
    } catch (error) {
      throw new Error(error?.message || "Gagal mengambil data TikTok");
    }
  }
}

export default Tiktok;
