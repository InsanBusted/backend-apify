import { PrismaClient } from "@prisma/client";
import { PUBLIC_URL } from "../lib/minio.js";
import path from "path";
import { URL } from "url";


const prisma = new PrismaClient();

class Posting {
    static async uploadBankKonten({ body, file }) {
        try {
            const { medsos, akun, idakun, idtoken, caption, jamPost, cby, mby, waktu, linkfile, extention } = body;

            if (file) {
                linkfile = `${PUBLIC_URL}/${file.key}`;
            }

            const jamPostValue = jamPost ? new Date(jamPost) : null;

            const posting = await prisma.post.create({
                data: {
                    medsos,
                    akun,
                    idakun,
                    idtoken,
                    caption,
                    jamPost: jamPostValue,
                    cby: parseInt(cby),
                    mby: parseInt(mby),
                    waktu,
                    linkfile,
                    extention,
                },
            });

            return posting;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default Posting;