import { PrismaClient } from "@prisma/client";
import Jam from "../models/jam.js";

const prisma = new PrismaClient();

class JamController {
  // Create jam
  static async create(req, res) {
    try {
      const jam = await Jam.createJam({
        body: req.body
      });

      return res.json({ success: true, data: jam });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // Get all jam
  static async getAll(req, res) {
    try {
      const jams = await prisma.jam.findMany({
        orderBy: { datePost: "desc" },
      });

      return res.json({ success: true, data: jams });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // Delete jam
  static async delete(req, res) {
    try {
      const deleted = await Jam.deleteJam({ id: req.params.id });

      return res.json({ success: true, data: deleted });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default JamController;
