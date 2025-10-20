import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class Jam {
  static async createJam({ body }) {
    try {
      const { jam, datePost } = body;

      if (!jam || !Array.isArray(jam) || jam.length === 0) {
        throw new Error("Field 'jam' harus berupa array string.");
      }

      const jamData = await prisma.jam.create({
        data: {
          daftarJam: jam, // langsung array string
          datePost: datePost ? new Date(datePost) : new Date(),
        },
      });

      return jamData;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteJam({ id }) {
    try {
      const jamData = await prisma.jam.findUnique({ where: { id } });

      if (!jamData) {
        throw new Error("Data jam tidak ditemukan.");
      }

      const deletedJam = await prisma.jam.delete({
        where: { id },
      });

      return deletedJam;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default Jam;
