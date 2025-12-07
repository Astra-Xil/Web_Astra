import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch Jikan" },
        { status: res.status }
      );
    }

    const json = await res.json();
    const a = json.data;

    // ▼ 必要なものだけ返す
    return NextResponse.json({
      mal_id: a.mal_id,
      title: a.title,
      title_japanese: a.title_japanese,
      image:
        a.images?.webp?.large_image_url ||
        a.images?.jpg?.large_image_url ||
        "",
      synopsis: a.synopsis,
      episodes: a.episodes,
      genres: a.genres?.map((g: any) => g.name) || [],
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
