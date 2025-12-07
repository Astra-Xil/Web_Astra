// app/api/anime/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  let q = searchParams.get("q") ?? "";

  // 安全のため文字数制限
  if (q.length > 50) q = q.slice(0, 50);

  try {
    const res = await fetch(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(q)}&sfw=true&order_by=popularity&limit=20`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from Jikan" },
        { status: res.status }
      );
    }

    const json = await res.json();

    // ▼ 必要なデータだけ抽出
    const slim = json.data.map((item: any) => ({
      mal_id: item.mal_id,
      title: item.title_japanese || item.title,
      image:
        item.images?.webp?.image_url ||
        item.images?.jpg?.image_url ||
        "",
      episodes: item.episodes ?? null,
      genres: item.genres?.map((g: any) => g.name) ?? [],
    }));

    return NextResponse.json({ data: slim });

  } catch (err) {
    return NextResponse.json(
      { error: "Server error fetching Jikan API" },
      { status: 500 }
    );
  }
}
