// app/api/anime/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  let q = searchParams.get("q") ?? "";

  // ▼ 悪い文字列を短くして防御（上限 50 文字）
  if (q.length > 50) q = q.slice(0, 50);

  try {
    const res = await fetch(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(q)}&sfw=true&order_by=popularity&limit=20`,
      { next: { revalidate: 60 } } // キャッシュして負荷軽減
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from Jikan" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (err) {
    return NextResponse.json(
      { error: "Server error fetching Jikan API" },
      { status: 500 }
    );
  }
}
