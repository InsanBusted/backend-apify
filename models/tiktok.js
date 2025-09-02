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

      const run = await client.task("YEipdHNna2bfXAKqW").call(input);
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

}

export default Tiktok;
