import { NextRequest, NextResponse } from "next/server";

export type VerifyResult = {
  status: "correct" | "warning" | "incorrect";
  summary: string;
  details: string;
  officialNote: string;
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  const { termName, description } = (await req.json()) as {
    termName: string;
    description: string;
  };

  const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: `あなたはAWS認定ソリューションアーキテクト試験の専門家です。
ユーザーが提示するAWSサービスの説明文を検証し、以下のJSON形式のみで回答してください。
前置きや補足テキスト・マークダウン記法は一切不要です。

{"status":"correct"|"warning"|"incorrect","summary":"20文字以内の一言評価","details":"具体的な補足・訂正内容（200文字以内）","officialNote":"公式ドキュメントで確認すべきポイント（100文字以内）"}`,
      messages: [
        {
          role: "user",
          content: `サービス名：${termName}\n説明文：${description}\n\nこの説明文をAWS公式情報と照合して検証してください。`,
        },
      ],
    }),
  });

  if (!anthropicRes.ok) {
    return NextResponse.json({ error: "Verification failed" }, { status: 502 });
  }

  const data = (await anthropicRes.json()) as {
    content: { type: string; text: string }[];
  };

  const text = data.content.find((c) => c.type === "text")?.text ?? "";

  try {
    const result = JSON.parse(text) as VerifyResult;
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Invalid response format" }, { status: 500 });
  }
}
