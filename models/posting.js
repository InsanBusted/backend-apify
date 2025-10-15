import { PrismaClient } from "@prisma/client";
import { PUBLIC_URL } from "../lib/minio.js";
import path from "path";
import { URL } from "url";


const prisma = new PrismaClient();

class Posting {
    // CREATE
    static async uploadBankKonten({ body }) {
        try {
            const {
                medsos,
                akun,
                idakun,
                idtoken,
                caption,
                jamPost,
                cby,
                mby,
                datePost,
                urutan,
                typePost,
                medias,
            } = body;

            const datePostValue = new Date(datePost);
            const jamPostValue = jamPost ? new Date(jamPost) : null;

            // Parse medias jika stringified JSON
            let mediaList = [];
            if (typeof medias === "string") {
                try {
                    mediaList = JSON.parse(medias);
                } catch {
                    mediaList = [];
                }
            } else if (Array.isArray(medias)) {
                mediaList = medias;
            }

            // 🔹 Buat record utama Post
            const post = await prisma.post.create({
                data: {
                    medsos,
                    akun,
                    idakun,
                    idtoken,
                    caption,
                    urutan,
                    typePost,
                    datePost: datePostValue,
                    jamPost: jamPostValue,
                    cby: parseInt(cby),
                    mby: parseInt(mby),
                },
            });

            // 🔹 Simpan semua file ke PostMedia
            if (mediaList.length > 0) {
                const mediaArray = mediaList.map((m) => ({
                    postId: post.id,
                    imageUrl: m.imageUrl,
                    coverUrl: m.coverUrl,
                    extention: m.extention,
                    urutan: m.urutan,
                }));

                await prisma.postMedia.createMany({ data: mediaArray });
            }

            return { success: true, data: post };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // UPDATE
    static async updateBankKonten({ id, body }) {
        try {
            const {
                medsos,
                akun,
                idakun,
                idtoken,
                caption,
                jamPost,
                cby,
                mby,
                datePost,
                urutan,
                typePost,
                medias, // semua file dari frontend
            } = body;

            const existingPost = await prisma.post.findUnique({
                where: { id },
                include: { medias: true }, // ✅ sesuai schema
            });

            if (!existingPost) throw new Error("Posting tidak ditemukan");

            const datePostValue = datePost ? new Date(datePost) : existingPost.datePost;
            const jamPostValue = jamPost ? new Date(jamPost) : existingPost.jamPost;

            // Update data utama Post
            const updatedPost = await prisma.post.update({
                where: { id },
                data: {
                    medsos: medsos ?? existingPost.medsos,
                    akun: akun ?? existingPost.akun,
                    idakun: idakun ?? existingPost.idakun,
                    idtoken: idtoken ?? existingPost.idtoken,
                    caption: caption ?? existingPost.caption,
                    urutan: urutan ?? existingPost.urutan,
                    typePost: typePost ?? existingPost.typePost,
                    datePost: datePostValue,
                    jamPost: jamPostValue,
                    cby: cby ? parseInt(cby) : existingPost.cby,
                    mby: mby ? parseInt(mby) : existingPost.mby,
                },
            });

            // Update PostMedia
            if (Array.isArray(medias)) {
                // Hapus media lama
                await prisma.postMedia.deleteMany({ where: { postId: id } });

                const mediaArray = medias.map((m) => ({
                    postId: id,
                    imageUrl: m.imageUrl,
                    coverUrl: m.coverUrl,
                    extention: m.extention,
                    urutan: m.urutan,
                }));

                if (mediaArray.length > 0) {
                    await prisma.postMedia.createMany({ data: mediaArray });
                }
            }

            return { success: true, data: updatedPost };
        } catch (error) {
            throw new Error(error.message);
        }
    }




    static async deleteBankKonten({ id }) {
        try {
            const post = await prisma.post.findUnique({
                where: { id },
            })

            if (!post) {
                throw new Error("Posting tidak ditemukan");
            }

            const deletedPost = await prisma.post.update({
                where: { id },
                data: {
                    isdelete: true
                }
            })

            return deletedPost

        } catch (error) {
            throw new Error(error.message);
        }
    }

}

export default Posting;