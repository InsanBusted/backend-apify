-- CreateTable
CREATE TABLE "public"."videos" (
    "id" UUID NOT NULL,
    "tiktok_id" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "dataset_id" TEXT,
    "create_time" TIMESTAMP(3) NOT NULL,
    "coverVideo" TEXT NOT NULL,
    "web_video_url" TEXT NOT NULL,
    "share_count" INTEGER NOT NULL,
    "like_count" INTEGER NOT NULL,
    "play_count" INTEGER NOT NULL,
    "collect_count" INTEGER NOT NULL,
    "comment_count" INTEGER NOT NULL,
    "isAd" BOOLEAN,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."hashtags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "hashtags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."search" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "search_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."n8n_chat_histories" (
    "id" SERIAL NOT NULL,
    "session_id" TEXT NOT NULL,
    "message" JSONB NOT NULL,

    CONSTRAINT "n8n_chat_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."video_hashtags" (
    "videoId" UUID NOT NULL,
    "hashtagId" INTEGER NOT NULL,

    CONSTRAINT "video_hashtags_pkey" PRIMARY KEY ("videoId","hashtagId")
);

-- CreateTable
CREATE TABLE "public"."video_search" (
    "videoId" UUID NOT NULL,
    "searchId" INTEGER NOT NULL,

    CONSTRAINT "video_search_pkey" PRIMARY KEY ("videoId","searchId")
);

-- CreateIndex
CREATE UNIQUE INDEX "videos_tiktok_id_key" ON "public"."videos"("tiktok_id");

-- CreateIndex
CREATE INDEX "videos_dataset_id_idx" ON "public"."videos"("dataset_id");

-- CreateIndex
CREATE INDEX "videos_create_time_idx" ON "public"."videos"("create_time");

-- CreateIndex
CREATE UNIQUE INDEX "hashtags_name_key" ON "public"."hashtags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "search_name_key" ON "public"."search"("name");

-- AddForeignKey
ALTER TABLE "public"."video_hashtags" ADD CONSTRAINT "video_hashtags_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "public"."videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."video_hashtags" ADD CONSTRAINT "video_hashtags_hashtagId_fkey" FOREIGN KEY ("hashtagId") REFERENCES "public"."hashtags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."video_search" ADD CONSTRAINT "video_search_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "public"."videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."video_search" ADD CONSTRAINT "video_search_searchId_fkey" FOREIGN KEY ("searchId") REFERENCES "public"."search"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
