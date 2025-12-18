"use client";

import { useEffect, useState } from "react";
import {
  Box,
  HStack,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import AnimeThumnail from "./AnimeThumnail";
import { AnimeSearchUI } from "@/types/ui/anime_search";

export default function AnimeList() {
  const router = useRouter();

  const [query] = useState("ブル");
  const [result, setResult] = useState<AnimeSearchUI[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadAnime(q: string) {
    setLoading(true);
    const res = await fetch(`/api/jikan?q=${q}`);
    const json: { data: AnimeSearchUI[] } = await res.json();
    setResult(json.data);
    setLoading(false);
  }

  useEffect(() => {
    loadAnime(query);
  }, []);

  const goDetail = (anime: AnimeSearchUI) => {
    router.push(`/anime/${anime.id}`);
  };

  return (
    <Box position="relative" w="100%">
      {/* Header */}
      <HStack mb={3}>
        <Text fontSize="lg" fontWeight="light" lineHeight="28px">
          注目のアニメ
        </Text>
      </HStack>

      {/* List */}
      <Box overflowX="auto" css={{
        scrollbarWidth: "none",     // Firefox
        msOverflowStyle: "none",    // IE / Edge
        "&::-webkit-scrollbar": {
          display: "none",          // Chrome / Safari
        },
      }}>
        <HStack
          gap={3}
          px="20px"
          align="center"
          w="max-content"
        >
          {loading
            ? [...Array(6)].map((_, i) => (
              <Box key={i} w="328px">
                <AnimeThumnail isLoading />
              </Box>
            ))
            : result.map((anime) => (
              <Box
                key={anime.id}
                w="328px"
                cursor="pointer"
                onClick={() => goDetail(anime)}
              >
                <AnimeThumnail anime={anime} />
              </Box>
            ))}
        </HStack>
      </Box>

      {/* Back */}
      {/* <IconButton
        aria-label="Back"
        position="absolute"
        left="0"
        top="50%"
        transform="translateY(-50%)"
        w="44px"
        h="44px"
        borderRadius="100px"
        bg="rgba(155,206,248,0.5)"
        _hover={{ bg: "rgba(155,206,248,0.7)" }}
      />

      {/* Next */}
      {/* <IconButton
        aria-label="Next"
        position="absolute"
        right="0"
        top="50%"
        transform="translateY(-50%)"
        w="44px"
        h="44px"
        borderRadius="100px"
        bg="rgba(155,206,248,0.5)"
        _hover={{ bg: "rgba(155,206,248,0.7)" }}
      /> */}
    </Box>
  );
}
