import prisma from "../lib/db/prisma.js"
import GetData from "../models/getData.js"

class DatasetController {
  static async getDataset(req, res) {
    try {
      const data = await GetData.getData()
      res.status(200).json({ success: true, data })
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      })
    }
  }

  static async saveDataset(req, res) {
    try {
      const response = await GetData.getData()

      for (const item of response) {
        const video = await prisma.video.upsert({
          where: { tiktokId: item.id },
          update: {
            createTime: new Date(item.createTimeISO),
            isAd: item.iklan,
            webVideoUrl: item.webVideoUrl,
            playCount: item.playCount,
            coverVideo: item.coverVideo,
            likeCount: item.likeCount ?? 0,
            shareCount: item.shareCount,
            collectCount: item.collectCount,
            commentCount: item.commentCount
          },
          create: {
            tiktokId: item.id,
            createTime: new Date(item.createTimeISO),
            webVideoUrl: item.webVideoUrl,
            isAd: item.iklan,
            coverVideo: item.coverVideo,
            likeCount: item.likeCount ?? 0,
            playCount: item.playCount,
            shareCount: item.shareCount,
            collectCount: item.collectCount,
            commentCount: item.commentCount
          }
        })

        // masukin hastag
        if (item.hashtags && item.hashtags.length > 0) {
          const hashtags = item.hashtags
            .map(tag => tag.name)  
            .filter(Boolean)       
            .map(tag => tag.trim()) 

          if (hashtags.length > 0) {
            const existing = await prisma.hashtag.findMany({
              where: { name: { in: hashtags } }
            })
            const existingNames = existing.map(existing => existing.name)

            const newTags = hashtags.filter(tag => !existingNames.includes(tag))

            if (newTags.length > 0) {
              await prisma.hashtag.createMany({
                data: newTags.map(name => ({ name })),
                skipDuplicates: true
              })
            } 

            const allTags = await prisma.hashtag.findMany({
              where: { name: { in: hashtags } }
            })

            await prisma.videoHashtag.createMany({
              data: allTags.map(tag => ({
                videoId: video.id,
                hashtagId: tag.id
              })),
              skipDuplicates: true
            })
          }
        }

      }

      res.status(200).json({ success: true, message: "Dataset saved successfully (optimized)" })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, error: error.message })
    }
  }

}

export default DatasetController