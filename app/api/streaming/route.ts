// app/api/streaming/route.ts
import { NextResponse } from "next/server";

const SERVICES = {
  danime: (title: string) =>
    `https://animestore.docomo.ne.jp/animestore/sch_pc?searchKey=${encodeURIComponent(
      title
    )}&vodTypeList=svod_tvod&sortKey=4`,
  dmm: (title: string) =>
    `https://tv.dmm.com/vod/list/?keyword=${encodeURIComponent(title)}`,
  unext: (title: string) =>
    `https://video.unext.jp/browse?q=${encodeURIComponent(title)}`,
  abema: (title: string) =>
    `https://abema.tv/search?q=${encodeURIComponent(title)}`,
  prime: (title: string) =>
    `https://www.amazon.co.jp/s?k=${encodeURIComponent(
      title
    )}&i=instant-video`,
};

// 判定ロジック（あなた仕様）
function checkDanime(html: string) {
  return html.includes("workId=");
}

function checkDmm(html: string) {
  return html.includes("/vod/detail");
}

function checkUnext(html: string) {
  return html.includes("/title/SID");
}

function checkAbema(html: string) {
  return html.includes("/video/title/") || html.includes("/video/episode/");
}

function checkPrime(html: string) {
  return html.includes("/-/jp/detail/");
}

const CHECKERS: Record<string, (html: string) => boolean> = {
  danime: checkDanime,
  dmm: checkDmm,
  unext: checkUnext,
  abema: checkAbema,
  prime: checkPrime,
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");

  if (!title) {
    return NextResponse.json(
      { error: "title is required" },
      { status: 400 }
    );
  }

  const results: any = {};

  // 各サービスをチェック
  for (const key of Object.keys(SERVICES)) {
    const url = SERVICES[key](title);

    let html = "";
    try {
      html = await fetch(url, { cache: "no-store" }).then((r) => r.text());
    } catch (e) {
      results[key] = { available: false, url, error: true };
      continue;
    }

    const available = CHECKERS[key](html);

    results[key] = { available, url ,htmlSnippet: html.slice(0, 400)};
  }

  return NextResponse.json({ success: true, data: results });
}
