import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3, BUCKET } from "./minio.js";

export async function uploadToMinio(file) {
  const fileKey = `${Date.now()}-${file.name}`; // nama file unik
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: fileKey,
    Body: file, // file dari frontend FormData
    ContentType: file.type,
  });

  await s3.send(command);
  return fileKey; // nanti ini dikirim ke backend / DB
}
