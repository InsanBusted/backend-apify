import { ApifyClient } from "apify-client";

class Tiktok {
  static async fetchData() {
    try {
      const client = new ApifyClient({
        token: process.env.APIFY_TOKEN,
      });

      const input = {
        "excludePinnedPosts": true,
        "oldestPostDateUnified": "1 week",
        "profileScrapeSections": [
          "videos"
        ],
        "profileSorting": "latest",
        "profiles": [
          "berlofficial"
        ],
        "resultsPerPage": 30,
        "shouldDownloadCovers": false,
        "shouldDownloadSlideshowImages": false,
        "shouldDownloadSubtitles": false,
        "shouldDownloadVideos": false
      }

      const run = await client.task("1cNAb4cx3VE0tvvia").call(input);
      console.log("Run object:", run);
      const datasetClient = client.dataset(run.defaultDatasetId);
      console.log("Dataset client:", datasetClient);
      const { items } = await datasetClient.listItems();

      const mappedData = items.map(item => ({
        id: item.id,
        iklan: item.isAd,
        text: item.text,
        createTimeISO: item.createTimeISO,
        likeCount: item.diggCount,
        webVideoUrl: item.webVideoUrl,
        shareCount: item.shareCount,
        playCount: item.playCount,
        collectCount: item.collectCount,
        commentCount: item.commentCount,
        coverVideo: item.videoMeta.originalCoverUrl,
        hashtags: item.hashtags?.map(h => ({ name: h.name })) || []
      }));

      // console.log("Items fetched:", items.length);

      return mappedData;
    } catch (error) {
      console.error("Error fetchData:", error);
      throw new Error(`Error fetching data: ${error.message}`);
    }
  }

  static async fetchDataReference() {
    try {
      const client = new ApifyClient({
        token: process.env.APIFY_TOKEN,
      });

      const input = {
        "excludePinnedPosts": false,
        "maxProfilesPerQuery": 5,
        "newestPostDate": "2025-09-04",
        "oldestPostDateUnified": "2025-08-01",
        "profileScrapeSections": [
          "videos"
        ],
        "profileSorting": "popular",
        "proxyCountryCode": "ID",
        "resultsPerPage": 10,
        "scrapeRelatedVideos": false,
        "searchQueries": [
          "body scrub",
          "bodycare",
          "skincare",
          "body scrub bagus"
        ],
        "shouldDownloadAvatars": false,
        "shouldDownloadCovers": false,
        "shouldDownloadMusicCovers": false,
        "shouldDownloadSlideshowImages": false,
        "shouldDownloadSubtitles": false,
        "shouldDownloadVideos": false
      }

      const run = await client.task("ISJbfbNdRQPWVJwed").call(input);
      console.log("Run object:", run);
      const datasetClient = client.dataset(run.defaultDatasetId);
      console.log("Dataset client:", datasetClient);
      const { items } = await datasetClient.listItems();

      const mappedData = items.map(item => ({
        id: item.id,
        text: item.text,
        createTimeISO: item.createTimeISO,
        likeCount: item.diggCount,
        webVideoUrl: item.webVideoUrl,
        shareCount: item.shareCount,
        playCount: item.playCount,
        collectCount: item.collectCount,
        commentCount: item.commentCount,
        coverVideo: item.videoMeta.originalCoverUrl,
        hashtags: item.hashtags?.map(h => ({ name: h.name })) || []
      }));

      // console.log("Items fetched:", items.length);

      return mappedData;
    } catch (error) {
      console.error("Error fetchData:", error);
      throw new Error(`Error fetching data: ${error.message}`);
    }
  }


  // static async fetchDataReference() {
  //   try {
  //     const client = new ApifyClient({
  //       token: process.env.APIFY_TOKEN,
  //     });

  //     const input = {
  //       "customMapFunction": "(object) => { return {...object} }",
  //       "dateRange": "THIS_MONTH",
  //       "includeSearchKeywords": false,
  //       "keywords": [
  //         "bodyscrub ",
  //         "body care",
  //         "skincare",
  //         "body serum",
  //         "body serum viral",
  //         "body scrub murah"
  //       ],
  //       "location": "ID",
  //       "maxItems": 20,
  //       "sortType": "DATE_POSTED"
  //     }

  //     const run = await client.task("hwKahpQx6gcwOHH2e").call(input);
  //     console.log("Run object:", run);
  //     const datasetClient = client.dataset(run.defaultDatasetId);
  //     console.log("Dataset client:", datasetClient);
  //     const { items } = await datasetClient.listItems();

  //     const mappedData = items.map(item => ({
  //       id: item.id,
  //       text: item.title,
  //       createTimeISO: item.uploadedAtFormatted,
  //       likeCount: item.likes,
  //       webVideoUrl: item.postPage,
  //       shareCount: item.shares,
  //       playCount: item.views,
  //       collectCount: item.bookmarks,
  //       commentCount: item.comment,
  //       coverVideo: item.video.cover,
  //       hashtags: item.hashtags?.map(h => ({ name: h.name })) || []
  //     }));

  //     // console.log("Items fetched:", items.length);

  //     return mappedData;
  //   } catch (error) {
  //     console.error("Error fetchData:", error);
  //     throw new Error(`Error fetching data: ${error.message}`);
  //   }
  // }



}

export default Tiktok;
