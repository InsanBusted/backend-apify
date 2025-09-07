/*
  Warnings:

  - A unique constraint covering the columns `[web_video_url]` on the table `videos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "videos_web_video_url_key" ON "public"."videos"("web_video_url");
