import { ApifyClient } from "apify-client";
import { mapTikTokData } from "../lib/utils/mapTiktokData.js";
import GetData from "./getData.js";
import { mapInstagramData } from "../lib/utils/mapInstagramData.js";


class Instagram {
    static async fetchReferenceDataInstagram({ search }) {
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
                searchQueries: search, 
                shouldDownloadAvatars: false,
                shouldDownloadCovers: false,
                shouldDownloadMusicCovers: false,
                shouldDownloadSlideshowImages: false,
                shouldDownloadSubtitles: false,
                shouldDownloadVideos: false,
            };

            const run = await client.task("SmOkfrStkUEkEAwcK").call(input);
            const items = await GetData.getDataDetailKontenInstagram(run.defaultDatasetId);
            const mappedData = mapInstagramData(items, run.defaultDatasetId);

            return mappedData;
        } catch (error) {
            console.error("Error fetchData:", error);
            throw new Error(`Error fetching data: ${error.message}`);
        }
    }

}

export default Instagram