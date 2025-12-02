import { ApifyClient } from "apify-client";
import GetData from "./getData.js";
import { mapInstagramData } from "../lib/utils/mapInstagramData.js";
import { TASKS } from "../lib/utils/taskId.js";
import prisma from "../lib/db/prisma.js";

class Instagram {
  static async fetchData({ search, onlyPostsNewerThan }) {
    try {
      const client = new ApifyClient({
        token: process.env.APIFY_TOKEN,
      });

      const input = {
        onlyPostsNewerThan, // format "YYYY-MM-DD"
        resultsLimit: 50,
        skipPinnedPosts: false,
        username: Array.isArray(search) ? search : [search], // pastikan array
      };

      const run = await client.task(TASKS.getEvalInstagram).call(input);
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

  static async fetchReferenceDataInstagram({ search, onlyPostsNewerThan }) {
    try {
      const client = new ApifyClient({
        token: process.env.APIFY_TOKEN,
      });

      const input = {
        addParentData: false,
        enhanceUserSearchWithFacebookPage: false,
        isUserReelFeedURL: false,
        isUserTaggedFeedURL: false,
        onlyPostsNewerThan: onlyPostsNewerThan,
        resultsLimit: 5,
        search: search,
        searchLimit: 1,
      };
      const run = await client.task(TASKS.referensiInstagram).call(input);
      const items = await GetData.getDataDetailKontenInstagram(
        run.defaultDatasetId
      );
      console.log("data result referensi instagram", items);
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

  static async getVideoByUrl(webVideoUrl) {
    const videos = await prisma.video.findMany({
      where: { webVideoUrl },
    });

    if (!videos || videos.length === 0) {
      throw new Error("Video tidak ditemukan");
    }

    return videos;
  }

  static async getTrackingDataPost() {
    try {
      const data = await prisma.$queryRawUnsafe(`
      SELECT
        author,
        web_video_url,
        like_count,
        play_count,
        comment_count,
        share_count,
        collect_count,
        (create_date - interval '7 hour') AS create_date,
        (create_time - interval '7 hour') AS create_time,
        type_post
      FROM videos_analytics_mv
      ORDER BY web_video_url, create_date
    `);

      return data;
    } catch (error) {
      console.error("Error fetchData:", error);
      throw new Error(`Error fetching database: ${error.message}`);
    }
  }
}

export default Instagram;
