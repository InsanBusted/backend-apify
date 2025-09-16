import prisma from "../lib/db/prisma.js";
import GetData from "../models/getData.js";

class DatasetController {
  static async getDetailDataReferensi(req, res) {
    try {
      const { datasetId } = req.params;

      if (!datasetId) {
        return res
          .status(400)
          .json({ success: false, error: "datasetId wajib ada" });
      }

      const data = await GetData.getDataDetailKonten(datasetId);

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
            source: 'referensi',
          };

          // Cari video yang matching webVideoUrl + source='referensi'
          const existingVideo = await prisma.video.findFirst({
            where: {
              webVideoUrl: item.webVideoUrl,
              source: 'referensi',
            },
            orderBy: { createTime: 'desc' },
          });

          let video;
          if (existingVideo) {
            // Update record yang sudah ada
            video = await prisma.video.update({
              where: { id: existingVideo.id },
              data: videoData,
            });
          } else {
            // Buat record baru
            video = await prisma.video.create({
              data: videoData,
            });
          }

          // Handle hashtags
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

      res.status(200).json({
        success: true,
        message: `Dataset saved successfully: ${data.length} videos`,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }



  static async getDetailData(req, res) {
    try {
      const { datasetId } = req.params;

      if (!datasetId) {
        return res
          .status(400)
          .json({ success: false, error: "datasetId wajib ada" });
      }

      const data = await GetData.getDataDetailKontenPost(datasetId);

      await Promise.all(
        data.map(async (item) => {
          const videoData = {
            datasetId,
            createTime: new Date(item.createTimeISO),
            author: item.author,
            isAd: item.iklan,
            createDate: item.createDate,
            webVideoUrl: item.webVideoUrl,
            playCount: item.playCount,
            coverVideo: item.coverVideo,
            searchQuery: item.searchQuery,
            likeCount: item.likeCount ?? 0,
            shareCount: item.shareCount,
            collectCount: item.collectCount,
            commentCount: item.commentCount,
            source: 'bank-konten'
          };

          const video = await prisma.video.create({
            data: videoData,
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

      res.status(200).json({
        success: true,
        message: `Dataset saved successfully: ${data.length} videos`,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  static async getAllData(req, res) {
    try {
      const { datasetId, author } = req.query;

      const latestPerLink = await prisma.video.groupBy({
        by: ['webVideoUrl'],
        _max: { createDate: true },
        where: {
          ...(datasetId && { datasetId: String(datasetId) }),
          ...(author && { author: String(author) }),
        },
      });

      const videos = await Promise.all(
        latestPerLink.map((v) =>
          prisma.video.findFirst({
            where: {
              webVideoUrl: v.webVideoUrl,
              createDate: v._max.createDate,
            },
            include: {
              hashtags: {
                include: { hashtag: true },
              },
            },
          })
        )
      );

      const data = videos.map((video) => ({
        id: video.tiktokId,
        datasetId: video.datasetId,
        author: video.author,
        iklan: video.isAd,
        coverVideo: video.coverVideo,
        webVideoUrl: video.webVideoUrl,
        shareCount: video.shareCount,
        playCount: video.playCount,
        likeCount: video.likeCount,
        collectCount: video.collectCount,
        commentCount: video.commentCount,
        searchQuery: video.searchQuery ?? "",
        createTimeISO: video.createTime.toISOString(),
        hashtags: video.hashtags.map((h) => ({ name: h.hashtag.name })),
      }));

      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async getAllDataInstagram(req, res) {
    try {
      const { datasetId, author } = req.query;
      const videos = await prisma.video.findMany({
        where: {
          ...(datasetId && { datasetId: String(datasetId) }),
          ...(author && { author: String(author) }),
        },
        include: {
          hashtags: {
            include: {
              hashtag: true,
            },
          },
        },
        orderBy: {
          createTime: "desc",
        },
      });

      const data = videos.map((video) => ({
        id: video.tiktokId,
        datasetId: video.datasetId,
        author: video.author,
        iklan: video.isAd,
        location: video.location,
        coverVideo: video.coverVideo,
        webVideoUrl: video.webVideoUrl,
        shareCount: video.shareCount,
        playCount: video.playCount,
        likeCount: video.likeCount,
        collectCount: video.collectCount,
        commentCount: video.commentCount,
        searchQuery: video.searchQuery ?? "",
        createTimeISO: video.createTime.toISOString(),
        hashtags: video.hashtags.map((h) => ({ name: h.hashtag.name })),
      }));

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

export default DatasetController;
