import multer from "multer";
import multerS3 from "multer-s3-v3";
import { s3, BUCKET } from "../lib/minio.js";

const upload = multer({
  storage: multerS3({
    s3,
    bucket: BUCKET,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const uniqueKey = `${Date.now()}_${file.originalname}`;
      cb(null, uniqueKey);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMime = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "video/mp4",
      "video/quicktime",
    ];
    if (!allowedMime.includes(file.mimetype)) {
      return cb(new Error("Format file tidak didukung"), false);
    }
    cb(null, true);
  },
  limits: {
    fileSize: 100 * 1024 * 1024, 
  },
});


export default upload;