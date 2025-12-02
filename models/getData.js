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
        author: item.channel?.name ?? "",
        iklan: item.isAd ?? false,
        text: item.title ?? "",
        createTimeISO: item.uploadedAtFormatted ?? "",
        likeCount: item.likes ?? 0,
        webVideoUrl: item.postPage ?? "",
        shareCount: item.shares ?? 0,
        playCount: item.views ?? 0,
        collectCount: item.bookmarks ?? 0,
        commentCount: item.comments ?? 0,
        searchQuery: item.searchQuery ?? "",
        coverVideo: item.video?.cover ?? "",
        hashtags: item.hashtags?.map((h) => ({ name: h })) || [],
      }));

      return mappedData;
    } catch (error) {
      console.error(`Error fetching data dari API: ${error.message}`);
      throw error;
    }
  }

  static async getDataDetailKontenPost(datasetId) {
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
        createDate: new Date(),
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
        iklan: false,
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
      console.log("data dari apify nya", items);

      const mappedData = items.flatMap((item) =>
        (item.topPosts || []).map((post) => ({
          id: post.id,
          author: post.ownerUsername,
          iklan: post.isSponsored,
          text: post.caption ?? "",
          location: post.locationName,
          createTimeISO: post.timestamp,
          likeCount: post.likesCount ?? 0,
          commentCount: post.commentsCount ?? 0,
          shareCount: post.reshareCount ?? 0,
          playCount: post.videoPlayCount ?? 0,
          collectCount: post.reshareCount ?? 0,
          webVideoUrl: post.url ?? "",
          coverVideo: post.displayUrl ?? "",
          hashtags:
            post.hashtags?.map((h) => (typeof h === "string" ? h : h.name)) ||
            [],
          searchQuery: item.name ?? "",
        }))
      );

      return mappedData;
    } catch (error) {
      console.error(`Error fetching data dari API: ${error.message}`);
      throw error;
    }
  }
}

export default GetData;
