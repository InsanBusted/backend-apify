import { PrismaClient } from "@prisma/client";
import Posting from "../models/posting.js";

const prisma = new PrismaClient();

class DatasetPostingController {
    static async upload(req, res) {
        try {
            const posting = await Posting.uploadBankKonten({
                body: req.body
            });

            return res.json({ success: true, data: posting });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    static async edit(req, res) {
        try {
            const posting = await Posting.updateBankKonten({
                id: req.params.id,
                body: req.body,
                file: req.file,
            });

            return res.json({ success: true, data: posting });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const posting = await Posting.deleteBankKonten({
                id: req.params.id,
            });

            return res.json({ success: true, data: posting });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }


    static async getAll(req, res) {
        try {
            const posts = await prisma.post.findMany({
                where: { isdelete: false },
                orderBy: { cdate: "desc" },
                include: {
                    medias: true, // tambahkan ini agar media ikut diambil
                },
            });

            return res.json({ success: true, data: posts });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;

            const post = await prisma.post.findUnique({
                where: { id },
                include: {
                    medias: {
                        orderBy: { urutan: 'asc' } // urutkan biar konsisten
                    },
                    jam: true, // kalau kamu juga ingin ambil relasi jam
                },
            });

            if (!post) {
                return res.status(404).json({
                    success: false,
                    message: 'Post tidak ditemukan',
                });
            }

            return res.json({ success: true, data: post });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}

export default DatasetPostingController;
