import Image from "next/image";
import { Card, Text, Box, HStack, VStack, Skeleton } from "@chakra-ui/react";
import { AnimeSearchUI } from "@/types/ui/anime_search";

type Props = {
  anime?: AnimeSearchUI;
  isLoading?: boolean;
};

export default function AnimeThumnail({
  anime,
  isLoading = false,
}: Props) {
  if (!anime && !isLoading) return null;
  const {
    title = "",
    imageUrl,
    episodes = 0,
    genres = [],
  } = anime ?? {};

  return (
    <Card.Root w="sm" variant="subtle" bg="white">
      <HStack align="center" gap={5}>
        {/* 画像 */}
        <Box w="150px" h="220px" position="relative" flexShrink={0}>
          {isLoading ? (
            <Skeleton w="150px" h="220px" borderRadius="12px" />
          ) : (
            <Image
              src={imageUrl || "/placeholder.png"}
              alt={title}
              fill
              style={{ objectFit: "cover", borderRadius: "12px" }}
            />
          )}
        </Box>

        {/* テキスト */}
        <VStack align="start" flex="1">
          {isLoading ? (
            <>
              <Skeleton w="80px" h="12px" />
              <Skeleton w="120px" h="12px" />
              <Skeleton w="200px" h="20px" mt={2} />
              <Skeleton w="160px" h="12px" mt={2} />
              <Skeleton w="100px" h="12px" />
            </>
          ) : (
            <>
              <Text>{episodes} episodes</Text>

              <Text mt={1}>
                {title}
              </Text>

              <HStack mt={1}>
                {genres.map((g) => (
                  <Text key={g} fontSize="xs">
                    #{g}
                  </Text>
                ))}
              </HStack>
            </>
          )}
        </VStack>
      </HStack>
    </Card.Root>
  );
}
