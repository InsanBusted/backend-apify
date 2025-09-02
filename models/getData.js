
class GetData {
    static async getData() {
        try {
            const API_KEY = process.env.APIFY_TOKEN
            const response = await fetch(`https://api.apify.com/v2/actor-tasks/mellow_cod~tiktok-scraping-berl/runs/last/dataset/items?token=${API_KEY}`)

            if (!response.ok) throw new Error(`Error dari sana nya: ${response.status}`)

            const data = await response.json()

            const mappedData = data.map(item => ({
                id: item.id,
                text: item.text,
                createTimeISO: item.createTimeISO,
                webVideoUrl: item.webVideoUrl,
                shareCount: item.shareCount,
                playCount: item.playCount,
                likeCount: item.diggCount,
                collectCount: item.collectCount,
                commentCount: item.commentCount,
                coverVideo: item.videoMeta.originalCoverUrl,
                hashtags: item.hashtags?.map(h => ({ name: h.name })) || []
            }));

            console.log(mappedData);
            return mappedData;
        } catch (error) {
            throw new Error(`Error data nya : ${error.message}`)
        }
    }
}

export default GetData