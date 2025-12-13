// src/lib/transform/animeDetail.ts
import { JikanAnimeDetail } from "@/types/api/jikan_detail";
import { AnimeDetailUI } from "@/types/ui/anime_detail";

export function toAnimeDetailUI(
  a: JikanAnimeDetail
): AnimeDetailUI {
  return {
    id: a.mal_id,
    title: a.title,
    titleSub: a.title_japanese || a.title_english,

    imageUrl:
      a.images?.webp?.large_image_url ||
      a.images?.jpg?.large_image_url ||
      "",

    imagePreviewUrl:
      a.images?.webp?.image_url ||
      a.images?.jpg?.image_url ||
      "",

    hero: {
      scoreText: a.score ? a.score.toFixed(1) : "未評価",
      episodesText: a.episodes ? `${a.episodes}話` : "話数未定",
      statusLabel: a.status ?? "不明",
    },

    meta: {
      genres: a.genres?.map(g => g.name) ?? [],
      studios: a.studios?.map(s => s.name) ?? [],
      yearText: a.year ? `${a.year}年` : "年不明",
      durationText: a.duration ?? "不明",
    },

    synopsis: a.synopsis ?? "あらすじ未登録",

    trailer: {
      url: a.trailer?.url ?? "",
      youtubeId: a.trailer?.youtube_id ?? "",
    },
  };
}
