import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: process.env.MINIO_REGION,
  endpoint: process.env.MINIO_ENDPOINT,
  credentials: {
    accessKeyId: process.env.MINIO_KEY,
    secretAccessKey: process.env.MINIO_SECRET,
  },
  forcePathStyle: true,
});

export const BUCKET = process.env.MINIO_BUCKET;
export const PUBLIC_URL = process.env.MINIO_PUBLIC_URL; 