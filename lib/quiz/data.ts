import type { QuizQuestion } from "@/lib/quiz/types";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "storage-1",
    category: "Storage",
    modeLabel: "比較で覚える",
    prompt:
      "複数の Linux ベース EC2 インスタンスから同時にマウントでき、アプリケーション間で共有したい永続ストレージとして最も適切なサービスはどれですか。",
    context:
      "共有性と運用のしやすさを重視しています。単一インスタンス専用のボリュームでは要件を満たせません。",
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
        hint: "単一 EC2 向けのブロックストレージ",
      },
      {
        id: "c",
        label: "C",
        text: "Amazon EFS",
        hint: "複数サーバーで共有できるファイルストレージ",
      },
      {
        id: "d",
        label: "D",
        text: "Amazon FSx for Windows File Server",
        hint: "Windows ワークロード向け",
      },
    ],
    explanation:
      "EFS は複数の Linux ベース EC2 インスタンスから同時に利用できるマネージドファイルストレージです。S3 はオブジェクトストレージ、EBS は単一インスタンス向けのブロックストレージなので、この要件には合いません。",
    comparePoint:
      "EBS は 1 台の EC2 に近い使い方、EFS は複数サーバーで共有、S3 はファイル共有ではなくオブジェクト保存です。",
    rememberAxis:
      "共有したいなら EFS。1 台に強く結びつくブロックストレージなら EBS。HTTP ベースの保存先なら S3 と整理します。",
  },
  {
    id: "network-1",
    category: "Networking",
    modeLabel: "判断軸を使う",
    prompt:
      "複数リージョンに配置されたアプリケーションへ、利用者を最も近い正常なエンドポイントへ誘導したいです。最初に検討すべきサービスはどれですか。",
    context:
      "リージョンをまたいだ振り分けが必要です。アプリケーションロードバランサー単体では範囲が足りません。",
    correctChoiceId: "b",
    choices: [
      {
        id: "a",
        label: "A",
        text: "Application Load Balancer",
        hint: "リージョン内での L7 負荷分散",
      },
      {
        id: "b",
        label: "B",
        text: "Amazon Route 53",
        hint: "DNS レベルでルーティングする",
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
      "Route 53 は DNS レベルでヘルスチェックやルーティングポリシーを使い、複数リージョン間の誘導を行えます。ALB はリージョン内の負荷分散なので、広域ルーティングの起点にはなりません。",
    comparePoint:
      "Route 53 はリージョンの外側で振り分ける仕組み、ALB はリージョン内でトラフィックを分散する仕組みです。",
    rememberAxis:
      "ドメイン解決の段階で行き先を決めたいなら Route 53。受け取った後に負荷分散したいなら Load Balancer と考えます。",
  },
  {
    id: "database-1",
    category: "Database",
    modeLabel: "実戦で確認",
    prompt:
      "ミリ秒単位の応答が必要で、アクセス量の変動が大きく、キーと値で高速に処理したいアプリケーションに最も適したサービスはどれですか。",
    context:
      "スキーマの柔軟性とスケールしやすさを優先します。複雑な結合よりも高速アクセスが重要です。",
    correctChoiceId: "d",
    choices: [
      {
        id: "a",
        label: "A",
        text: "Amazon RDS for MySQL",
        hint: "リレーショナルデータベース",
      },
      {
        id: "b",
        label: "B",
        text: "Amazon Redshift",
        hint: "分析向けデータウェアハウス",
      },
      {
        id: "c",
        label: "C",
        text: "Amazon Aurora",
        hint: "高性能なリレーショナルデータベース",
      },
      {
        id: "d",
        label: "D",
        text: "Amazon DynamoDB",
        hint: "サーバーレス NoSQL",
      },
    ],
    explanation:
      "DynamoDB はサーバーレスの NoSQL データベースで、キーと値による高速アクセスと大きなスケールに向いています。RDS や Aurora はリレーショナル設計が必要な場面に適しています。",
    comparePoint:
      "SQL や結合を重視するなら RDS/Aurora、高速なキーアクセスと柔軟なスケールを重視するなら DynamoDB です。",
    rememberAxis:
      "アクセスパターンが決まっていて素早くさばきたいなら DynamoDB。関係性を扱うなら RDS 系と切り分けます。",
  },
];
