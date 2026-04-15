import { NextRequest, NextResponse } from "next/server";

type RequestBody = {
  termName: string;
  description: string;
};

type AnthropicResponse = {
  content: { text: string }[];
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY が設定されていません" },
      { status: 500 },
    );
  }

  let body: RequestBody;
  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { termName, description } = body;
  if (!termName || !description) {
    return NextResponse.json(
      { error: "termName と description は必須です" },
      { status: 400 },
    );
  }

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
      system:
        'あなたはAWS認定ソリューションアーキテクト試験の専門家です。ユーザーが提示するAWSサービスの説明文を検証し、以下のJSON形式のみで回答してください。前置きや補足テキストは一切不要です。\n\n{"status": "correct" | "warning" | "incorrect", "summary": "20文字以内の一言評価", "details": "具体的な補足・訂正内容（200文字以内）", "officialNote": "公式ドキュメントで確認すべきポイント（100文字以内）"}',
      messages: [
        {
          role: "user",
          content: `サービス名：${termName}\n説明文：${description}\n\nこの説明文をAWS公式情報と照合して検証してください。`,
        },
      ],
    }),
  });

  if (!anthropicRes.ok) {
    const errorText = await anthropicRes.text();
    return NextResponse.json(
      { error: `Anthropic API error: ${anthropicRes.status}`, detail: errorText },
      { status: 502 },
    );
  }

  const data = (await anthropicRes.json()) as AnthropicResponse;
  const text = data.content[0]?.text ?? "";

  try {
    const result = JSON.parse(text) as unknown;
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "API レスポンスのパースに失敗しました", raw: text },
      { status: 502 },
    );
  }
}
