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

  static async saveDataset(res) {
    try {
      const response = await GetData.getData()
        
      for(const item of response) {
        const video = await prisma.video.upsert({
            where: {id: item.id},
            update: {
            playCount: item.playCount,
            shareCount: item.shareCount,
            collectCount: item.collectCount,
            commentCount: item.commentCount
            },
            create: {
            id: item.id,
            createTime: new Date(item.c)
            }

        })
        
      }

      
    } catch (error) {
      throw new Error(`Gagal menyimpan data : ${error.message}`)
    }
  }

  

}

export default DatasetController