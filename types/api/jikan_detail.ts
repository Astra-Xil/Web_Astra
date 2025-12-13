// src/types/api/jikan.ts
export type JikanAnimeDetail = {
  mal_id: number;
  title: string;
  title_english?: string;
  title_japanese?: string;

  images?: {
    webp?: {
      large_image_url?: string;
      image_url?: string;
    };
    jpg?: {
      large_image_url?: string;
      image_url?: string;
    };
  };

  synopsis?: string;
  episodes?: number | null;
  duration?: string;

  status?: string;
  year?: number;

  score?: number | null;
  rank?: number | null;

  genres?: { name: string }[];
  studios?: { name: string }[];

  trailer?: {
    url?: string;
    youtube_id?: string;
  };
};
