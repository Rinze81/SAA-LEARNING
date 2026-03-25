import { studyTerms } from "@/lib/study/terms";

export type RoadmapStep = {
  step: number;
  title: string;
  description: string;
  termIds: string[];
};

export const ROADMAP_STEPS: RoadmapStep[] = [
  {
    step: 1,
    title: "設計の基礎",
    description: "クラウド設計の根幹となる考え方を最初に押さえましょう。",
    termIds: [
      "high-availability",
      "fault-tolerance",
      "scalability",
      "elasticity",
      "stateless",
      "durability",
    ],
  },
  {
    step: 2,
    title: "ネットワークの土台",
    description: "VPC を中心にネットワーク構成の基礎を理解します。",
    termIds: [
      "vpc",
      "public-subnet",
      "private-subnet",
      "security-group",
      "internet-gateway",
      "nat-gateway",
    ],
  },
  {
    step: 3,
    title: "コンピュート",
    description: "仮想サーバーからサーバーレスまでの実行環境を学びます。",
    termIds: [
      "ec2",
      "ami",
      "auto-scaling",
      "load-balancer",
      "lambda",
      "elastic-beanstalk",
    ],
  },
  {
    step: 4,
    title: "ストレージ",
    description: "用途に合ったストレージサービスの使い分けを整理します。",
    termIds: ["object-storage", "block-storage", "s3", "ebs", "efs", "cdn"],
  },
  {
    step: 5,
    title: "データベース",
    description: "RDB から NoSQL まで、データ特性に応じた選択を学びます。",
    termIds: [
      "rds",
      "aurora",
      "dynamodb",
      "elasticache",
      "read-replica",
      "multi-az",
    ],
  },
  {
    step: 6,
    title: "セキュリティ",
    description: "IAM・暗号化・アクセス制御で安全なアーキテクチャを設計します。",
    termIds: [
      "iam-role",
      "iam-user",
      "iam-policy",
      "kms",
      "security-group",
      "waf",
      "cognito",
    ],
  },
  {
    step: 7,
    title: "アーキテクチャパターン",
    description: "実際の設計で繰り返し登場するパターンを俯瞰します。",
    termIds: ["event-driven", "serverless", "vpc", "multi-az"],
  },
];

/** ロードマップに含まれる有効な用語 ID（重複排除済み） */
export const ROADMAP_UNIQUE_TERM_IDS: string[] = Array.from(
  new Set<string>(
    ROADMAP_STEPS.flatMap((s) =>
      s.termIds.filter((id) => studyTerms.some((t) => t.id === id))
    )
  )
);

export const ROADMAP_TERM_TOTAL = ROADMAP_UNIQUE_TERM_IDS.length;
