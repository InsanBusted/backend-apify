export function mapInstagramData(items, datasetId) {
  return items.map((item) => ({
    datasetId,
    id: item.id,
    iklan: item.iklan,
    text: item.text ?? "",
    createTimeISO: item.createTimeISO,
    likeCount: item.diggCount ?? 0,
    webVideoUrl: item.webVideoUrl ?? "",
    shareCount: item.shareCount ?? 0,
    playCount: item.playCount ?? 0,
    searchQueries: item.searchQueries ?? "",
    collectCount: item.collectCount ?? 0,
    commentCount: item.commentCount ?? 0,
    coverVideo: item.coverVideo ?? "",
    hashtags:
      (item.hashtags || [])
        .map((h) => (typeof h === "string" ? h : h?.name))
        .filter(Boolean), 
  }));
}