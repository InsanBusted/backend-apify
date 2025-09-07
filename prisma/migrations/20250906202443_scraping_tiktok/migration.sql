/*
  Warnings:

  - You are about to drop the `search` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `video_search` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `search_query` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."video_search" DROP CONSTRAINT "video_search_searchId_fkey";

-- DropForeignKey
ALTER TABLE "public"."video_search" DROP CONSTRAINT "video_search_videoId_fkey";

-- AlterTable
ALTER TABLE "public"."videos" ADD COLUMN     "search_query" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."search";

-- DropTable
DROP TABLE "public"."video_search";
