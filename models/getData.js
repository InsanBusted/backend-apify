import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class GetData {
  static async getDataDetailKonten(datasetId) {
    try {
      const response = await fetch(
        `https://api.apify.com/v2/datasets/${datasetId}/items?token=${process.env.APIFY_TOKEN}`
      );

      if (!response.ok) {
        throw new Error(`API error ${response.status}`);
      }

      const items = await response.json();

      const mappedData = items.map((item) => ({
        id: item.id,
        author: item.authorMeta?.name,
        iklan: item.isAd,
        text: item.text ?? "",
        createTimeISO: item.createTimeISO,
        likeCount: item.diggCount ?? 0,
        webVideoUrl: item.webVideoUrl ?? "",
        shareCount: item.shareCount ?? 0,
        playCount: item.playCount ?? 0,
        collectCount: item.collectCount ?? 0,
        commentCount: item.commentCount ?? 0,
        searchQuery: item.searchQuery ?? "",
        coverVideo: item.videoMeta?.originalCoverUrl ?? "",
        hashtags: item.hashtags?.map((h) => ({ name: h.name })) || [],
      }));

      return mappedData;
    } catch (error) {
      console.error(`Error fetching data dari API: ${error.message}`);
      throw error;
    }
  }

  static async getDataDetailKontenInstagramPost(datasetId) {
    try {
      const response = await fetch(
        `https://api.apify.com/v2/datasets/${datasetId}/items?token=${process.env.APIFY_TOKEN}`
      );

      if (!response.ok) {
        throw new Error(`API error ${response.status}`);
      }

      const items = await response.json();

      const mappedData = items.map((item) => ({
        id: item.id,
        author: item.ownerUsername,
        iklan: item.isSponsored,
        text: item.caption ?? "",
        location: item.locationName,
        createTimeISO: item.timestamp,
        likeCount: item.likesCount ?? 0,
        commentCount: item.commentsCount ?? 0,
        shareCount: item.reshareCount ?? 0,
        playCount: item.videoPlayCount ?? 0,
        collectCount: item.reshareCount ?? 0,
        webVideoUrl: item.url ?? "",
        coverVideo: item.displayUrl ?? "",
        hashtags:
          item.hashtags?.map((h) => (typeof h === "string" ? h : h.name)) || [],
        searchQuery: item.name ?? "",
      }));

      return mappedData;
    } catch (error) {
      console.error(`Error fetching data dari API: ${error.message}`);
      throw error;
    }
  }

  static async getDataDetailKontenInstagram(datasetId) {
    try {
      const response = await fetch(
        `https://api.apify.com/v2/datasets/${datasetId}/items?token=${process.env.APIFY_TOKEN}`
      );

      if (!response.ok) {
        throw new Error(`API error ${response.status}`);
      }

      const items = await response.json();

      const mappedData = items.map((item) => ({
        id: item.id,
        author: item.author || item.ownerUsername || "",
        iklan: item.iklan ?? item.isSponsored ?? false,
        text: item.text || item.caption || "",
        location: item.location || item.locationName || "",
        createTimeISO: item.createTimeISO || item.timestamp,
        likeCount: item.likeCount ?? item.likesCount ?? 0,
        commentCount: item.commentCount ?? item.commentsCount ?? 0,
        shareCount: item.shareCount ?? item.reshareCount ?? 0,
        playCount: item.playCount ?? item.videoPlayCount ?? 0,
        collectCount: item.collectCount ?? item.reshareCount ?? 0,
        webVideoUrl: item.webVideoUrl || item.url || "",
        coverVideo: item.coverVideo || item.displayUrl || "",
        hashtags:
          item.hashtags?.map((h) => (typeof h === "string" ? h : h.name)) || [],
        searchQuery: item.searchQuery || item.name || "",
      }));


      return mappedData;
    } catch (error) {
      console.error(`Error fetching data dari API: ${error.message}`);
      throw error;
    }
  }
}

export default GetData;
