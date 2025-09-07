/*
  Warnings:

  - You are about to drop the column `tiktok_id` on the `videos` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."videos_tiktok_id_key";

-- AlterTable
ALTER TABLE "public"."videos" DROP COLUMN "tiktok_id";
