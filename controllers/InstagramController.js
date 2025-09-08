import GetData from "../models/getData.js";
import Instagram from "../models/instagram.js";

class InstagramController {
    static async getData(req,res) {
        try {
            let {datasetId} = req.params

            const data = await GetData.getDataDetailKontenInstagram(datasetId)
            res.status(200).json({success:true, data})
        } catch (error) {
            
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