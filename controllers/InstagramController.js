import prisma from "../lib/db/prisma.js";
import GetData from "../models/getData.js";
import Instagram from "../models/instagram.js";

class InstagramController {
  static async getData(req, res) {
    try {
      let { datasetId } = req.params;

      const data = await GetData.getDataDetailKontenInstagram(datasetId);

      await Promise.all(
        data.map(async (item) => {
          const videoData = {
            datasetId,
            createTime: new Date(item.createTimeISO),
            author: item.author,
            isAd: item.iklan,
            webVideoUrl: item.webVideoUrl,
            playCount: item.playCount,
            coverVideo: item.coverVideo,
            searchQuery: item.searchQuery,
            likeCount: item.likeCount ?? 0,
            shareCount: item.shareCount,
            collectCount: item.collectCount,
            commentCount: item.commentCount,
          };

          const video = await prisma.video.upsert({
            where: { webVideoUrl: item.webVideoUrl },
            update: videoData,
            create: { webVideoUrl: item.webVideoUrl, ...videoData },
          });

          if (item.hashtags?.length) {
            const hashtags = item.hashtags
              .map((tag) => tag.name?.trim())
              .filter(Boolean);

            if (hashtags.length > 0) {
              await prisma.hashtag.createMany({
                data: hashtags.map((name) => ({ name })),
                skipDuplicates: true,
              });

              const allTags = await prisma.hashtag.findMany({
                where: { name: { in: hashtags } },
              });

              await prisma.videoHashtag.createMany({
                data: allTags.map((tag) => ({
                  videoId: video.id,
                  hashtagId: tag.id,
                })),
                skipDuplicates: true,
              });
            }
          }
        })
      );

      return res.status(200).json({
        success: true,
        message: `Dataset saved successfully: ${data.length} videos`,
      });
    } catch (error) {
      console.error("getData error:", error);
      return res.status(500).json({
        success: false,
        message: "Terjadi kesalahan",
        error: error.message,
      });
    }
  }


  static async reference(req, res) {
    try {
      let { search } = req.body;

      const data = await Instagram.fetchReferenceDataInstagram({ search });
      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "error fetch",
        error: error.message,
      });
    }

  }
}

export default InstagramController