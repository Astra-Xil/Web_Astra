// app/api/reviews/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// -----------------------
// POST: Insert Review
// -----------------------
export async function POST(req: Request) {
  const supabase = await createClient();
  const body = await req.json();

  const { anime_id, score, comment } = body;

  // 認証チェック
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const text = comment as string;

  // ① NGワード辞書
  const NG_WORDS = [
    "死ね",
    "殺す",
    "障害者",
    "レイプ",
    "薬物",
    "爆破",
    "自殺",
  ];

  function containsNgWord(str: string) {
    return NG_WORDS.some((w) => str.includes(w));
  }

  if (containsNgWord(text)) {
    return NextResponse.json(
      { error: "不適切な表現が含まれているため投稿できません。" },
      { status: 400 }
    );
  }

  // ② 個人情報チェック（AIが苦手な部分）
  const personalPatterns = [
    /\d{10,11}/, // 電話番号
    /\S+@\S+\.\S+/, // メール
    /\d{3}-\d{4}/, // 郵便番号
    /(LINE|Twitter|DM|ID)/i, // SNS誘導
    /(住所|住み)/, // 住所
  ];

  if (personalPatterns.some((re) => re.test(text))) {
    return NextResponse.json(
      { error: "個人情報を含む内容は投稿できません。" },
      { status: 400 }
    );
  }

  // ③ AIモデレーション（OpenAI Moderation API）
  const { data: aiResult, error: aiError } = await supabase.functions.invoke(
    "moderate",
    {
      body: { text },
    }
  );

  if (aiError) {
    console.error(aiError);
    return NextResponse.json(
      { error: "AI モデレーションに失敗しました。" },
      { status: 500 }
    );
  }

  const flagged = aiResult?.results?.[0]?.flagged;

  if (flagged) {
    return NextResponse.json(
      { error: "AI により不適切と判断されたため投稿できません。" },
      { status: 400 }
    );
  }

  // DB INSERT
  const { data, error } = await supabase
    .from("reviews")
    .insert({
      anime_id,
      score,
      comment,
      user_id: user.id,
    })
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

// -----------------------
// GET: Fetch Reviews
// -----------------------
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const anime_id = searchParams.get("anime_id");

  const supabase = await createClient(); // ← ★ ここも async

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("anime_id", anime_id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}