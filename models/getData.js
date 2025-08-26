
class GetData {
    static async getData() {
        try {
            const response = await fetch("https://api.apify.com/v2/actor-tasks/certified_businessman~tiktok-berl/runs/last/dataset/items?token=apify_api_zcp6VW96GAh477ef9LiYcZyYuYDcqi1bWV7K")

            if (!response.ok) throw new Error(`Error dari sana nya: ${response.status}`)

            const data = await response.json()

            const mappedData = data.map(item => ({
                id: item.id,
                text: item.text,
                createTimeISO: item.createTimeISO,
                webVideoUrl: item.webVideoUrl,
                shareCount: item.shareCount,
                playCount: item.playCount,
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