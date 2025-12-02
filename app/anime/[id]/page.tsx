"use client";

import {
  Box,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReviewForm from "@/app/components/ui/ReviewForm";
import ReviewList from "@/app/components/ui/ReviewList";

export default function AnimeDetailPage() {
  const params = useParams();
  const id = params.id; // string | undefined のまま使う（あなたの希望通り）

  const [anime, setAnime] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<any[]>([]);

  // ⭐ Supabase からレビュー取得
  async function loadReviews() {
    const res = await fetch(`/api/reviews?anime_id=${id}`);
    const json = await res.json();
    setReviews(json.data || []);
  }

  // ⭐ アニメ情報 + レビュー読み込み
  useEffect(() => {
    async function load() {
      if (!id) return; // URL が壊れている場合の保険

      // アニメ API
      const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      const json = await res.json();
      setAnime(json.data);
      setLoading(false);

      // reviews 取得
      await loadReviews();
    }

    load();
  }, [id]);

  if (loading) return <Box p={5}>読み込み中...</Box>;

  return (
    <Box px={5} py={5} textAlign="center">
      {/* ---- タイトル ---- */}
      <Heading fontSize="2xl" mb={3}>
        {anime?.title_japanese || anime?.title}
      </Heading>

      <Box display="flex" justifyContent="center">
        <Image
          src={
            anime.images?.webp?.large_image_url ||
            anime.images?.jpg?.large_image_url
          }
          alt={anime.title}
          w="320px"
          borderRadius="12px"
          mb={4}
        />
      </Box>

      <Text fontSize="md" whiteSpace="pre-wrap" mb={8}>
        {anime.synopsis || "説明文がありません。"}
      </Text>

      {/* ⭐ 切り出した口コミフォーム */}
      <ReviewForm animeId={id as string} onSubmitted={loadReviews} />

      {/* ⭐ コンポーネント化したレビュー一覧 */}
      <ReviewList reviews={reviews} />
    </Box>
  );
}
