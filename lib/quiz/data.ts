import type { QuizQuestion } from "@/lib/quiz/types";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "storage-1",
    category: "ストレージ",
    modeLabel: "比較理解モード",
    prompt:
      "複数の EC2 インスタンスから同時にマウントでき、Linux ベースのアプリケーションで共有ファイルとして扱いたい保存先はどれですか。",
    context: "性能よりも共有性と運用のシンプルさを優先します。",
    correctChoiceId: "c",
    choices: [
      {
        id: "a",
        label: "A",
        text: "Amazon S3",
        hint: "オブジェクトストレージ",
      },
      {
        id: "b",
        label: "B",
        text: "Amazon EBS",
        hint: "単一 EC2 向けブロックストレージ",
      },
      {
        id: "c",
        label: "C",
        text: "Amazon EFS",
        hint: "共有ファイルストレージ",
      },
      {
        id: "d",
        label: "D",
        text: "Amazon FSx for Windows File Server",
        hint: "Windows 連携向け",
      },
    ],
    explanation:
      "EFS は複数の Linux ベース EC2 から同時に利用できるマネージドファイルストレージです。S3 はファイル共有マウントの前提が異なり、EBS は通常単一インスタンス向けです。",
    comparePoint:
      "EBS は単一接続、EFS は複数接続、S3 はオブジェクト保存という軸で切り分けると判断しやすくなります。",
    rememberAxis:
      "共有したいなら EFS、1 台に高性能ブロックなら EBS、HTTP ベースの保存なら S3。",
  },
  {
    id: "network-1",
    category: "ネットワーク",
    modeLabel: "問題演習モード",
    prompt:
      "独自ドメインで複数リージョンにトラフィックを振り分け、障害時には健全なリージョンへ自動で寄せたいとき、最も適したサービスはどれですか。",
    context: "可用性を優先し、DNS レベルで振り分けたいケースです。",
    correctChoiceId: "b",
    choices: [
      {
        id: "a",
        label: "A",
        text: "Application Load Balancer",
        hint: "L7 ロードバランサー",
      },
      {
        id: "b",
        label: "B",
        text: "Amazon Route 53",
        hint: "DNS とヘルスチェック",
      },
      {
        id: "c",
        label: "C",
        text: "AWS Direct Connect",
        hint: "専用線接続",
      },
      {
        id: "d",
        label: "D",
        text: "Amazon CloudFront",
        hint: "コンテンツ配信",
      },
    ],
    explanation:
      "Route 53 は DNS ベースのルーティングとヘルスチェックで、複数リージョン間のフェイルオーバーに対応できます。ALB はリージョン内の負荷分散が中心です。",
    comparePoint:
      "リージョンをまたいだ名前解決の制御なら Route 53、リージョン内のトラフィック分散なら ALB と考えると整理しやすいです。",
    rememberAxis:
      "ドメイン名の行き先を変える話なら Route 53、到達後の振り分けなら Load Balancer。",
  },
  {
    id: "database-1",
    category: "データベース",
    modeLabel: "理解確認モード",
    prompt:
      "ミリ秒未満の応答が必要で、アクセス量の変動が大きく、キーと値で高速に取得したいアプリケーションに適したサービスはどれですか。",
    context: "スキーマの柔軟性も重視します。",
    correctChoiceId: "d",
    choices: [
      {
        id: "a",
        label: "A",
        text: "Amazon RDS for MySQL",
        hint: "リレーショナルDB",
      },
      {
        id: "b",
        label: "B",
        text: "Amazon Redshift",
        hint: "分析向けDWH",
      },
      {
        id: "c",
        label: "C",
        text: "Amazon Aurora",
        hint: "高性能リレーショナルDB",
      },
      {
        id: "d",
        label: "D",
        text: "Amazon DynamoDB",
        hint: "サーバーレス NoSQL",
      },
    ],
    explanation:
      "DynamoDB はサーバーレスな NoSQL データベースで、低レイテンシかつスケーラブルなキー・バリューアクセスに向いています。RDS や Aurora はリレーショナル要件に適しています。",
    comparePoint:
      "リレーショナルな結合や厳密なSQLが必要なら RDS/Aurora、高速なキーアクセス中心なら DynamoDB です。",
    rememberAxis:
      "アクセスパターンが単純で速さ重視なら DynamoDB、複雑なクエリや結合なら RDS 系。",
  },
];
