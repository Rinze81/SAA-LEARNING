export type StudyTerm = {
  id: string;
  name: string;
  category: string;
  shortDefinition: string;
  description: string;
  examTip: string;
  related: string[];
};

export const studyTerms: StudyTerm[] = [
  {
    id: "high-availability",
    name: "High Availability",
    category: "設計原則",
    shortDefinition: "障害が起きてもサービスを継続しやすい状態を保つ考え方です。",
    description:
      "単一障害点を減らし、複数の AZ や冗長構成を使ってサービス停止の可能性を下げます。",
    examTip:
      "可用性を高める設計として、Multi-AZ、ロードバランサー、冗長構成と一緒に問われやすい用語です。",
    related: ["Multi-AZ", "Load Balancer", "Auto Scaling"],
  },
  {
    id: "fault-tolerance",
    name: "Fault Tolerance",
    category: "設計原則",
    shortDefinition: "一部に障害が起きても、全体として動き続けられる性質です。",
    description:
      "障害を前提に設計し、どこかが壊れてもサービス全体が止まらないようにします。",
    examTip:
      "高可用性よりも一歩進んで、障害発生中でも処理を継続できるかが論点になるときに出やすいです。",
    related: ["High Availability", "Multi-AZ", "Load Balancer"],
  },
  {
    id: "scalability",
    name: "Scalability",
    category: "設計原則",
    shortDefinition: "負荷の増減に合わせてシステム規模を拡張しやすい性質です。",
    description:
      "ユーザー数やトラフィックが増えても、性能を維持できるようにリソースを増やせる状態を指します。",
    examTip:
      "スケールアップとスケールアウトのどちらが適切か、Auto Scaling やマネージドサービスと合わせて問われます。",
    related: ["Elasticity", "Auto Scaling", "Load Balancer"],
  },
  {
    id: "elasticity",
    name: "Elasticity",
    category: "設計原則",
    shortDefinition: "必要なときに増やし、不要になったら減らせる柔軟性です。",
    description:
      "負荷に応じて自動でリソース量を調整し、過剰なコストを抑えながら性能を保ちます。",
    examTip:
      "Scalability が拡張しやすさ全体を指すのに対し、Elasticity は負荷変動への自動追従として出ることが多いです。",
    related: ["Scalability", "Auto Scaling", "Serverless"],
  },
  {
    id: "iam-role",
    name: "IAM Role",
    category: "セキュリティ",
    shortDefinition: "必要なときだけ一時的な権限を引き受けるための IAM の仕組みです。",
    description:
      "EC2 や Lambda などの AWS サービスに権限を安全に渡したいときによく使います。長期アクセスキーを配らずに済むのが重要です。",
    examTip:
      "AWS サービスへ権限を付与する場面では、IAM User ではなく IAM Role を選ばせる問題が頻出です。",
    related: ["IAM Policy", "Serverless", "EC2"],
  },
  {
    id: "security-group",
    name: "Security Group",
    category: "ネットワーク",
    shortDefinition: "EC2 などに設定する仮想ファイアウォールです。",
    description:
      "インスタンス単位で、どの通信を許可するかを制御します。ステートフルである点が重要です。",
    examTip:
      "NACL との違いや、許可ルール中心であること、ステートフルであることが問われやすいです。",
    related: ["VPC", "Public Subnet", "Private Subnet"],
  },
  {
    id: "auto-scaling",
    name: "Auto Scaling",
    category: "運用",
    shortDefinition: "負荷に応じて EC2 などの台数を自動調整する仕組みです。",
    description:
      "トラフィック増加時にはインスタンスを増やし、落ち着いたら減らすことで可用性とコスト効率を両立します。",
    examTip:
      "可用性向上とコスト最適化の両方を満たす選択肢として、Load Balancer とセットで出やすいです。",
    related: ["Scalability", "Elasticity", "Load Balancer"],
  },
  {
    id: "load-balancer",
    name: "Load Balancer",
    category: "ネットワーク",
    shortDefinition: "複数のサーバーへトラフィックを分散する仕組みです。",
    description:
      "単一サーバーへの負荷集中を防ぎ、可用性や拡張性を高めるために使います。",
    examTip:
      "ALB と NLB の使い分け、Auto Scaling や Multi-AZ と組み合わせた構成でよく問われます。",
    related: ["ALB", "NLB", "Auto Scaling"],
  },
  {
    id: "object-storage",
    name: "Object Storage",
    category: "ストレージ",
    shortDefinition: "データをオブジェクト単位で保存するストレージ方式です。",
    description:
      "ファイルを URL ベースで扱いやすく、大量データの保存や配信に向いています。AWS では S3 が代表例です。",
    examTip:
      "S3 の特徴として出ることが多く、EBS や EFS との違いを理解しているかが見られます。",
    related: ["S3", "CDN", "Durability"],
  },
  {
    id: "block-storage",
    name: "Block Storage",
    category: "ストレージ",
    shortDefinition: "データをブロック単位で扱うストレージ方式です。",
    description:
      "OS ディスクやデータベースの保存先として使いやすく、EC2 に接続してローカルディスクのように利用します。",
    examTip:
      "EBS の特徴として問われやすく、単一インスタンス向け永続ディスクという理解が重要です。",
    related: ["EBS", "EC2", "Object Storage"],
  },
  {
    id: "cdn",
    name: "CDN",
    category: "配信",
    shortDefinition: "利用者に近い拠点からコンテンツを配信して高速化する仕組みです。",
    description:
      "キャッシュを活用してレイテンシーを下げ、世界中のユーザーへ効率よくコンテンツを届けます。",
    examTip:
      "CloudFront の役割としてよく出ます。保存先の S3 と混同しないことが大切です。",
    related: ["CloudFront", "S3", "Durability"],
  },
  {
    id: "stateless",
    name: "Stateless",
    category: "設計原則",
    shortDefinition: "サーバー側に個別ユーザー状態を持たない設計です。",
    description:
      "どのサーバーが処理しても同じように応答できるため、スケールアウトや負荷分散と相性がよくなります。",
    examTip:
      "Auto Scaling や Load Balancer と組み合わせた設計で、なぜ拡張しやすいかを説明する文脈で出やすいです。",
    related: ["Load Balancer", "Scalability", "Serverless"],
  },
  {
    id: "vpc",
    name: "VPC",
    category: "ネットワーク",
    shortDefinition: "AWS 上に作る論理的に分離された仮想ネットワークです。",
    description:
      "IP 範囲、サブネット、ルート、セキュリティ設定を自分で設計して AWS リソースを配置できます。",
    examTip:
      "Public Subnet や Private Subnet、Security Group との関係をまとめて理解しているかが問われます。",
    related: ["Public Subnet", "Private Subnet", "Security Group"],
  },
  {
    id: "public-subnet",
    name: "Public Subnet",
    category: "ネットワーク",
    shortDefinition: "インターネットとの直接通信経路を持つサブネットです。",
    description:
      "インターネットゲートウェイへのルートを持ち、外部公開するリソースを置く場所として使われます。",
    examTip:
      "ALB、踏み台サーバー、NAT Gateway など、外部と通信が必要な構成要素の配置先として問われます。",
    related: ["VPC", "Private Subnet", "Internet Gateway"],
  },
  {
    id: "private-subnet",
    name: "Private Subnet",
    category: "ネットワーク",
    shortDefinition: "インターネットから直接は到達できないサブネットです。",
    description:
      "データベースや内部アプリなど、外部公開が不要なリソースを安全に置くために使います。",
    examTip:
      "RDS やアプリケーションサーバーの配置先として頻出です。外向き通信が必要なら NAT Gateway も合わせて考えます。",
    related: ["VPC", "Public Subnet", "RDS"],
  },
  {
    id: "multi-az",
    name: "Multi-AZ",
    category: "可用性",
    shortDefinition: "複数の AZ にまたがって冗長化し、障害に強くする構成です。",
    description:
      "1 つの AZ が使えなくなってもサービス継続しやすくするための代表的な可用性向上策です。",
    examTip:
      "High Availability や RDS の可用性向上策としてよく出ます。Read Replica とは目的が違います。",
    related: ["High Availability", "Fault Tolerance", "Read Replica"],
  },
  {
    id: "read-replica",
    name: "Read Replica",
    category: "データベース",
    shortDefinition: "読み取り専用の複製を作り、参照負荷を分散する仕組みです。",
    description:
      "主に読み取り性能を高めるために使い、可用性向上だけを目的にする Multi-AZ とは役割が異なります。",
    examTip:
      "性能改善なのか可用性改善なのかを見分ける問題で、Multi-AZ との比較で出やすいです。",
    related: ["RDS", "Multi-AZ", "Scalability"],
  },
  {
    id: "event-driven",
    name: "Event-driven",
    category: "アーキテクチャ",
    shortDefinition: "イベントの発生をきっかけに処理を進める設計です。",
    description:
      "S3 へのファイルアップロードやメッセージ受信を起点に、後続処理を非同期でつなげる構成に向いています。",
    examTip:
      "Lambda、SQS、SNS、EventBridge などと組み合わせて、疎結合な設計として出題されやすいです。",
    related: ["Serverless", "Lambda", "SQS"],
  },
  {
    id: "serverless",
    name: "Serverless",
    category: "アーキテクチャ",
    shortDefinition: "サーバー管理を意識せずにアプリを動かせる実行モデルです。",
    description:
      "インフラ運用負荷を減らし、必要なときだけ実行して課金されるサービスと相性がよい考え方です。",
    examTip:
      "Lambda、API Gateway、DynamoDB などと合わせて、運用負荷削減や変動負荷対応の文脈で問われやすいです。",
    related: ["Lambda", "Event-driven", "Elasticity"],
  },
  {
    id: "durability",
    name: "Durability",
    category: "ストレージ",
    shortDefinition: "保存したデータが失われにくい性質です。",
    description:
      "可用性が『使えるか』を指すのに対し、Durability は『データが残るか』に焦点を当てた考え方です。",
    examTip:
      "S3 の高い耐久性やバックアップ戦略の説明で出やすく、可用性との違いを問う問題にもつながります。",
    related: ["S3", "High Availability", "Object Storage"],
  },
];

export const studyTermCategories = Array.from(
  new Set(studyTerms.map((term) => term.category)),
);
