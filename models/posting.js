import { PrismaClient } from "@prisma/client";
import { PUBLIC_URL } from "../lib/minio.js";
import path from "path";
import { URL } from "url";


const prisma = new PrismaClient();

class Posting {
    static async uploadBankKonten({ body, file }) {
        try {
            let { medsos, akun, idakun, idtoken, caption, jamPost, cby, mby, linkfile, extention, datePost, urutan, typePost } = body;

            if (file) {
                linkfile = `${PUBLIC_URL}/${file.key}`;
            }

            const datePostValue = new Date(datePost);
            const jamPostValue = jamPost ? new Date(jamPost) : null;

            const posting = await prisma.post.create({
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
                    linkfile,
                    extention,
                },
            });

            return posting;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async updateBankKonten({ id, body, file }) {
        try {
            let { medsos, akun, idakun, idtoken, caption, jamPost, mby, linkfile, extention, datePost, urutan, typePost } = body;

            const existingPost = await prisma.post.findUnique({
                where: { id },
            });

            if (!existingPost) {
                throw new Error("Posting tidak ditemukan");
            }

            // Jika ada file baru, update linkfile & extention
            if (file) {
                linkfile = `${PUBLIC_URL}/${file.key}`;
                extention = file.originalname.split(".").pop();
            } else {
                // Kalau tidak ada file baru, tetap pakai yang lama
                linkfile = existingPost.linkfile;
                extention = existingPost.extention;
            }

            const datePostValue = datePost ? new Date(datePost) : existingPost.datePost;
            const jamPostValue = jamPost ? new Date(jamPost) : existingPost.jamPost;

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
                    mby: mby ? parseInt(mby) : existingPost.mby,
                    linkfile,
                    extention,
                },
            });

            return updatedPost;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async deleteBankKonten({id}) {
        try {
            const post = await prisma.post.findUnique({
                where: {id},
            })

            if (!post) {
                throw new Error("Posting tidak ditemukan");
            }

            const deletedPost = await prisma.post.update({
                where: {id},
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