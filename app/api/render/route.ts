import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    const CF_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID!;
    const CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN!;

    const endpoint = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/browser-rendering/content`;

    const cfResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${CF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data = await cfResponse.json();

    if (!cfResponse.ok) {
      return NextResponse.json({ error: "Cloudflare Failed", data }, { status: 500 });
    }

    // <<< 修正ポイント >>> 
    // result が HTML なので content ではなく result を返す
    return NextResponse.json({ html: data.result });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
