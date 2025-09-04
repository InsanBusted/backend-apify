import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class GetData {
    static async getData() {
        try {
            const videos = await prisma.video.findMany({
                include: {
                    hashtags: {
                        include: {
                            hashtag: true,
                        },
                    },
                },
                orderBy: {
                    createTime: 'desc',
                },
            });

            const mappedData = videos.map(video => ({
                id: video.tiktokId,
                iklan: video.isAd,
                coverVideo: video.coverVideo,
                webVideoUrl: video.webVideoUrl,
                shareCount: video.shareCount,
                playCount: video.playCount,
                likeCount: video.likeCount,
                collectCount: video.collectCount,
                commentCount: video.commentCount,
                createTimeISO: video.createTime.toISOString(),
                hashtags: video.hashtags.map(h => ({ name: h.hashtag.name })),
            }));

            console.log(mappedData);
            return mappedData;
        } catch (error) {
            console.error(`Error fetching data dari DB: ${error.message}`);
            throw error;
        }
    }
}

export default GetData;
