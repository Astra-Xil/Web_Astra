"use client";

import { useEffect, useState } from "react";
import ReviewThumbnail from "./AnimeThumnail";
import SearchBar from "./SearchBar";
import { SimpleGrid, Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

// ▼ API で返す構造に合わせる
type Anime = {
  mal_id: number;
  title: string;
  image: string;
  episodes: number | null;
  genres: string[];
};

export default function AnimeList() {
  const router = useRouter();
  const [query, setQuery] = useState("ブル");
  const [input, setInput] = useState("ブル");
  const [result, setResult] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadAnime(q: string) {
    setLoading(true);
    const res = await fetch(`/api/jikan?q=${q}`);
    const json = await res.json();
    setResult(json.data);
    setLoading(false);
  }

  useEffect(() => {
    loadAnime(query);
  }, []);

  const handleSearch = () => {
    setQuery(input);
    loadAnime(input);
  };

  const goDetail = (anime: Anime) => {
    router.push(`/anime/${anime.mal_id}`);
  };

  return (
    <Box w="100%" px={3} py={3}>
      {/* 🔍 検索バー */}
      <SearchBar
        value={input}
        onChange={setInput}
        onSearch={handleSearch}
      />

      <SimpleGrid
        w="100%"
        gap={6}
        columns={{ base: 1, sm: 2, md: 3, lg: 3 }}
        placeItems="center"
      >
        {loading &&
          [...Array(6)].map((_, i) => (
            <ReviewThumbnail key={i} isLoading />
          ))}

        {!loading &&
          result.map((anime) => (
            <Box
              key={anime.mal_id}
              cursor="pointer"
              onClick={() => goDetail(anime)}
            >
              <ReviewThumbnail
                image={anime.image}
                title={anime.title}
                // 必要なら表示
                // episodes={anime.episodes}
                // genres={anime.genres}
              />
            </Box>
          ))}
      </SimpleGrid>
    </Box>
  );
}
