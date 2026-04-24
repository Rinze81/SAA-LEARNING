export type StudyTerm = {
  id: string;
  name: string;
  category: string;
  shortDefinition: string;
  description: string;
  examTip: string;
  related: string[];
  diagram?: string;
  docsUrl?: string;
};

import { termDiagrams } from "@/lib/study/term-diagrams";

export const studyTerms: StudyTerm[] = [
  {
    id: "high-availability",
    docsUrl: "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html",
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
    docsUrl: "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html",
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
    docsUrl: "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html",
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
    docsUrl: "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html",
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
    docsUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html",
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
    docsUrl: "https://docs.aws.amazon.com/vpc/latest/userguide/security-groups.html",
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
    docsUrl: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html",
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
    docsUrl: "https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html",
    name: "Load Balancer",
    category: "ネットワーク",
    shortDefinition: "複数のサーバーへトラフィックを分散する仕組みです。",
    description:
      "単一サーバーへの負荷集中を防ぎ、可用性や拡張性を高めるために使います。",
    examTip:
      "ALB と NLB の使い分け、Auto Scaling や Multi-AZ と組み合わせた構成でよく問われます。",
    related: ["ALB", "NLB", "Auto Scaling"],
    diagram: termDiagrams["load-balancer"],
  },
  {
    id: "object-storage",
    docsUrl: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html",
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
    docsUrl: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AmazonEBS.html",
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
    docsUrl: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html",
    name: "CDN",
    category: "配信",
    shortDefinition: "利用者に近い拠点からコンテンツを配信して高速化する仕組みです。",
    description:
      "キャッシュを活用してレイテンシーを下げ、世界中のユーザーへ効率よくコンテンツを届けます。",
    examTip:
      "CloudFront の役割としてよく出ます。保存先の S3 と混同しないことが大切です。",
    related: ["CloudFront", "S3", "Durability"],
    diagram: termDiagrams["cdn"],
  },
  {
    id: "stateless",
    docsUrl: "https://docs.aws.amazon.com/whitepapers/latest/microservices-on-aws/stateless-microservices.html",
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
    docsUrl: "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html",
    name: "VPC",
    category: "ネットワーク",
    shortDefinition: "AWS 上に作る論理的に分離された仮想ネットワークです。",
    description:
      "IP 範囲、サブネット、ルート、セキュリティ設定を自分で設計して AWS リソースを配置できます。",
    examTip:
      "Public Subnet や Private Subnet、Security Group との関係をまとめて理解しているかが問われます。",
    related: ["Public Subnet", "Private Subnet", "Security Group"],
    diagram: termDiagrams["vpc"],
  },
  {
    id: "public-subnet",
    docsUrl: "https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html",
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
    docsUrl: "https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html",
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
    docsUrl: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html",
    name: "Multi-AZ",
    category: "可用性",
    shortDefinition: "複数の AZ にまたがって冗長化し、障害に強くする構成です。",
    description:
      "1 つの AZ が使えなくなってもサービス継続しやすくするための代表的な可用性向上策です。",
    examTip:
      "High Availability や RDS の可用性向上策としてよく出ます。Read Replica とは目的が違います。",
    related: ["High Availability", "Fault Tolerance", "Read Replica"],
    diagram: termDiagrams["multi-az"],
  },
  {
    id: "read-replica",
    docsUrl: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html",
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
    docsUrl: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html",
    name: "Event-driven",
    category: "アーキテクチャ",
    shortDefinition: "イベントの発生をきっかけに処理を進める設計です。",
    description:
      "S3 へのファイルアップロードやメッセージ受信を起点に、後続処理を非同期でつなげる構成に向いています。",
    examTip:
      "Lambda、SQS、SNS、EventBridge などと組み合わせて、疎結合な設計として出題されやすいです。",
    related: ["Serverless", "Lambda", "SQS"],
    diagram: termDiagrams["event-driven"],
  },
  {
    id: "serverless",
    docsUrl: "https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html",
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
    docsUrl: "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html",
    name: "Durability",
    category: "ストレージ",
    shortDefinition: "保存したデータが失われにくい性質です。",
    description:
      "可用性が『使えるか』を指すのに対し、Durability は『データが残るか』に焦点を当てた考え方です。",
    examTip:
      "S3 の高い耐久性やバックアップ戦略の説明で出やすく、可用性との違いを問う問題にもつながります。",
    related: ["S3", "High Availability", "Object Storage"],
  },

  // ── コンピュート ──────────────────────────────────────────────────────────

  {
    id: "ec2",
    docsUrl: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html",
    name: "EC2",
    category: "コンピュート",
    shortDefinition: "AWS が提供する仮想サーバーサービスです。",
    description:
      "インスタンスタイプ（CPU/メモリ比率）や OS を選んで起動できる仮想マシンです。オンデマンド・リザーブド・スポットなど複数の購入オプションがあります。",
    examTip:
      "購入オプション（オンデマンド・リザーブド・スポット）のコスト比較、インスタンスファミリーの選び方（C=CPU集約、R=メモリ、P=GPU）が頻出です。",
    related: ["AMI", "Auto Scaling Group", "EBS", "Elastic IP"],
  },
  {
    id: "ami",
    docsUrl: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html",
    name: "AMI",
    category: "コンピュート",
    shortDefinition: "EC2 インスタンスを起動するためのテンプレートイメージです。",
    description:
      "OS・ミドルウェア・アプリの設定を含んだスナップショットで、同じ構成のインスタンスを素早く複製できます。リージョン間コピーも可能です。",
    examTip:
      "Auto Scaling での同一構成の複製、リージョン間移行での AMI コピーが問われやすいです。カスタム AMI を作って展開するパターンを押さえましょう。",
    related: ["EC2", "Auto Scaling Group", "Launch Template"],
  },
  {
    id: "auto-scaling-group",
    docsUrl: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-groups.html",
    name: "Auto Scaling Group",
    category: "コンピュート",
    shortDefinition: "EC2 インスタンスの台数を自動で増減させるグループ設定です。",
    description:
      "最小・最大・希望台数を設定し、CloudWatch メトリクスに基づいてスケールイン／アウトを自動実行します。ELB と組み合わせるのが基本構成です。",
    examTip:
      "スケールインで台数が減るとき、どのインスタンスを終了するかはターミネーションポリシーが決めます。ヘルスチェック失敗時の自動置き換えも頻出です。",
    related: ["EC2", "Launch Template", "Load Balancer", "CloudWatch"],
  },
  {
    id: "launch-template",
    docsUrl: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-launch-templates.html",
    name: "Launch Template",
    category: "コンピュート",
    shortDefinition: "EC2 起動に必要な設定をまとめたテンプレートです。",
    description:
      "インスタンスタイプ・AMI・セキュリティグループ・ユーザーデータなどを一元管理し、バージョン管理もできます。旧 Launch Configuration の後継です。",
    examTip:
      "Auto Scaling Group での利用が前提となる問題が多いです。Launch Configuration との違いとして、バージョン管理と複数インスタンスタイプ指定ができる点を覚えましょう。",
    related: ["EC2", "Auto Scaling Group", "AMI"],
  },
  {
    id: "elastic-ip",
    docsUrl: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html",
    name: "Elastic IP",
    category: "コンピュート",
    shortDefinition: "EC2 インスタンスに紐付けられる固定パブリック IP アドレスです。",
    description:
      "インスタンスを停止・再起動しても IP が変わらないため、DNS 変更なしに別インスタンスへの付け替えができます。割り当て済みで未使用の場合は課金されます。",
    examTip:
      "フェイルオーバー時に固定 IP のまま別インスタンスへ切り替えるユースケースで出ます。未使用の EIP に課金される点も問われやすいです。",
    related: ["EC2", "NAT Gateway", "VPC"],
  },
  {
    id: "ecs",
    docsUrl: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html",
    name: "ECS",
    category: "コンピュート",
    shortDefinition: "AWS のマネージドコンテナオーケストレーションサービスです。",
    description:
      "Docker コンテナのデプロイ・スケーリング・管理を担います。起動タイプとして EC2（インフラ自己管理）と Fargate（サーバーレス）を選べます。",
    examTip:
      "ECS on EC2 vs ECS on Fargate の管理責任範囲の違いが頻出です。Kubernetes が不要ならシンプルな ECS が推奨されます。",
    related: ["Fargate", "EKS", "ECR", "ALB"],
  },
  {
    id: "fargate",
    docsUrl: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html",
    name: "Fargate",
    category: "コンピュート",
    shortDefinition: "コンテナをサーバーレスで実行できる ECS/EKS の起動タイプです。",
    description:
      "EC2 インスタンスのプロビジョニングや管理が不要で、コンテナのリソース（CPU・メモリ）定義だけに集中できます。",
    examTip:
      "「サーバー管理なしでコンテナを実行したい」という要件では Fargate が正解です。EC2 管理コストを削減したいシナリオで ECS on EC2 との比較で出ます。",
    related: ["ECS", "EKS", "Lambda", "Serverless"],
  },
  {
    id: "eks",
    docsUrl: "https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html",
    name: "EKS",
    category: "コンピュート",
    shortDefinition: "AWS が提供するマネージド Kubernetes サービスです。",
    description:
      "Kubernetes のコントロールプレーンを AWS が管理し、既存の Kubernetes ワークロードをそのまま移行できます。ノードは EC2 または Fargate で実行できます。",
    examTip:
      "「Kubernetes を使いたい」という要件では EKS を選びます。Kubernetes にこだわりがなければ ECS の方がシンプルという比較問題が出ます。",
    related: ["ECS", "Fargate", "EC2"],
  },
  {
    id: "lambda",
    docsUrl: "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html",
    name: "Lambda",
    category: "コンピュート",
    shortDefinition: "イベント駆動でコードを実行するサーバーレス関数サービスです。",
    description:
      "サーバー管理不要で、S3 イベント・API Gateway・SQS などをトリガーに実行されます。最大実行時間は 15 分、メモリは 128 MB〜10 GB まで設定可能です。",
    examTip:
      "15 分の実行時間制限が問われやすいです。RDS Proxy で DB 接続プール、Provisioned Concurrency でコールドスタート軽減するパターンも頻出です。",
    related: ["API Gateway", "SQS", "RDS Proxy", "Event-driven"],
  },
  {
    id: "api-gateway",
    docsUrl: "https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html",
    name: "API Gateway",
    category: "コンピュート",
    shortDefinition: "REST/WebSocket API を構築・公開・管理するマネージドサービスです。",
    description:
      "Lambda や EC2 などのバックエンドへのエントリーポイントとなり、認証・スロットリング・キャッシュなどを提供します。",
    examTip:
      "Lambda との組み合わせがサーバーレス API の定番構成です。スロットリング設定と Lambda オーソライザーによる認証制御が問われやすいです。",
    related: ["Lambda", "Serverless", "Cognito"],
  },
  {
    id: "elastic-beanstalk",
    docsUrl: "https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html",
    name: "Elastic Beanstalk",
    category: "コンピュート",
    shortDefinition: "アプリのデプロイとインフラプロビジョニングを自動化するサービスです。",
    description:
      "コードをアップロードするだけで EC2・ELB・Auto Scaling・RDS などの設定を自動で行います。インフラの詳細設定も保持しつつ運用負荷を下げられます。",
    examTip:
      "「インフラ管理を最小化しつつ Web アプリをデプロイしたい」という要件で出ます。コンテナや Lambda ではなく従来型 Web アプリのデプロイ自動化文脈で選びましょう。",
    related: ["EC2", "Auto Scaling Group", "Load Balancer", "RDS"],
  },
  {
    id: "batch",
    docsUrl: "https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html",
    name: "AWS Batch",
    category: "コンピュート",
    shortDefinition: "大規模バッチコンピューティングジョブを管理するマネージドサービスです。",
    description:
      "ジョブキューと計算環境を自動管理し、EC2 または Fargate 上でバッチジョブをスケジュール実行します。Lambda の 15 分制限を超える長時間処理に適しています。",
    examTip:
      "Lambda の 15 分制限を超えるバッチ処理の代替として問われます。Step Functions との違いとして、単発の長時間ジョブ実行に特化している点を押さえましょう。",
    related: ["Lambda", "Fargate", "EC2", "Step Functions"],
  },

  // ── ストレージ ────────────────────────────────────────────────────────────

  {
    id: "s3",
    docsUrl: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html",
    name: "S3",
    category: "ストレージ",
    shortDefinition: "AWS のオブジェクトストレージサービスです。",
    description:
      "イレブンナイン（99.999999999%）の耐久性を持つオブジェクトストレージです。バケットにオブジェクトを保存し、静的ウェブサイトホスティング・バックアップ・データレイク用途に幅広く使われます。",
    examTip:
      "ストレージクラスの使い分け（Standard / Standard-IA / Glacier）、ライフサイクルルール、バージョニング、Object Lock、VPC エンドポイントが頻出です。",
    related: ["S3 Glacier", "S3 Intelligent-Tiering", "CloudFront", "VPC エンドポイント"],
  },
  {
    id: "s3-glacier",
    docsUrl: "https://docs.aws.amazon.com/amazonglacier/latest/dev/introduction.html",
    name: "S3 Glacier",
    category: "ストレージ",
    shortDefinition: "長期アーカイブ向けの低コスト S3 ストレージクラスです。",
    description:
      "取得時間に応じて Instant Retrieval（ミリ秒）・Flexible Retrieval（数分〜数時間）・Deep Archive（12 時間以上）の 3 種類があります。保存コストは非常に安い反面、取得コストが発生します。",
    examTip:
      "取得時間と保存コストのトレードオフが問われます。即時取得不要なアーカイブデータには Glacier、12 時間以上許容できる長期保存には Deep Archive を選びます。",
    related: ["S3", "S3 Intelligent-Tiering", "Lifecycle Policy"],
  },
  {
    id: "s3-intelligent-tiering",
    docsUrl: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/intelligent-tiering.html",
    name: "S3 Intelligent-Tiering",
    category: "ストレージ",
    shortDefinition: "アクセス頻度に応じて自動でストレージコストを最適化するクラスです。",
    description:
      "30 日間アクセスがないオブジェクトを自動で低頻度アクセス層に移動し、再アクセスがあれば高頻度層に戻します。アクセスパターンが予測できない場合に最適です。",
    examTip:
      "「アクセスパターンが不明・不規則」という条件が出たら Intelligent-Tiering を選びます。監視費用（per-object 料金）が発生する点も覚えておきましょう。",
    related: ["S3", "S3 Glacier", "Lifecycle Policy"],
  },
  {
    id: "ebs",
    docsUrl: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AmazonEBS.html",
    name: "EBS",
    category: "ストレージ",
    shortDefinition: "EC2 インスタンスに接続する永続ブロックストレージです。",
    description:
      "インスタンスのライフサイクルとは独立して存在し、停止・終了後もデータを保持します。スナップショットで S3 にバックアップでき、別 AZ や別リージョンへのコピーも可能です。",
    examTip:
      "インスタンスストアとの違い（永続性）、gp3/io2 のボリュームタイプ選択、マルチアタッチ（io1/io2 のみ）、スナップショットによるバックアップが頻出です。",
    related: ["EC2", "Block Storage", "Snapshot"],
  },
  {
    id: "efs",
    docsUrl: "https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html",
    name: "EFS",
    category: "ストレージ",
    shortDefinition: "複数の EC2 から同時にマウントできるマネージドファイルストレージです。",
    description:
      "NFS プロトコルを使った Linux ベースの共有ファイルシステムで、複数の AZ にまたがって自動で拡張・縮小します。Standard と Infrequent Access の 2 ストレージクラスを持ちます。",
    examTip:
      "「複数の EC2 で同じファイルを共有したい」という要件では EFS を選びます。Windows の SMB が必要なら FSx for Windows が正解です。",
    related: ["EC2", "FSx for Windows", "EBS", "NFS"],
  },
  {
    id: "fsx-windows",
    docsUrl: "https://docs.aws.amazon.com/fsx/latest/WindowsGuide/what-is.html",
    name: "FSx for Windows File Server",
    category: "ストレージ",
    shortDefinition: "Windows の SMB プロトコルに対応したマネージドファイルストレージです。",
    description:
      "Active Directory と統合でき、Windows ベースのアプリケーションからオンプレミスのファイルサーバーと同じように利用できます。",
    examTip:
      "「SMB プロトコル」「Windows ワークロード」「Active Directory 統合」というキーワードが出たら FSx for Windows を選びます。EFS は Linux/NFS 向けと区別しましょう。",
    related: ["EFS", "FSx for Lustre", "Active Directory"],
  },
  {
    id: "fsx-lustre",
    docsUrl: "https://docs.aws.amazon.com/fsx/latest/LustreGuide/what-is.html",
    name: "FSx for Lustre",
    category: "ストレージ",
    shortDefinition: "HPC や機械学習向けの高スループットファイルシステムです。",
    description:
      "数百万 IOPS・数百 GB/s のスループットに対応し、S3 と透過的に連携できます。HPC・機械学習トレーニング・動画処理など大規模並列処理に最適です。",
    examTip:
      "「HPC」「機械学習トレーニング」「高スループット」というキーワードが出たら FSx for Lustre を選びます。EFS との差別化ポイントは圧倒的なスループット性能です。",
    related: ["EFS", "FSx for Windows", "S3", "EC2"],
  },
  {
    id: "storage-gateway",
    docsUrl: "https://docs.aws.amazon.com/storagegateway/latest/userguide/WhatIsStorageGateway.html",
    name: "Storage Gateway",
    category: "ストレージ",
    shortDefinition: "オンプレミスと AWS ストレージをシームレスに接続するハイブリッドサービスです。",
    description:
      "File Gateway（S3 への NFS/SMB）・Volume Gateway（EBS スナップショット）・Tape Gateway（S3 Glacier へのテープ移行）の 3 タイプがあります。",
    examTip:
      "オンプレミスから S3 へのシームレスなアクセスや、テープバックアップの AWS 移行シナリオで出ます。タイプごとのユースケースを整理しておきましょう。",
    related: ["S3", "S3 Glacier", "EBS", "Direct Connect"],
  },
  {
    id: "aws-backup",
    docsUrl: "https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html",
    name: "AWS Backup",
    category: "ストレージ",
    shortDefinition: "AWS リソースのバックアップを一元管理するサービスです。",
    description:
      "EC2・EBS・RDS・DynamoDB・EFS・FSx など複数サービスのバックアップポリシーを一か所で定義・スケジュール・監視できます。クロスリージョン・クロスアカウントのバックアップにも対応します。",
    examTip:
      "「複数サービスのバックアップを一元管理したい」という要件で出ます。個別サービスのスナップショットではなく、組織全体のバックアップガバナンスを問う文脈で登場します。",
    related: ["EBS", "RDS", "S3", "DynamoDB"],
  },
  {
    id: "snowball-edge",
    docsUrl: "https://docs.aws.amazon.com/snowball/latest/developer-guide/whatisedge.html",
    name: "Snowball Edge",
    category: "ストレージ",
    shortDefinition: "物理デバイスを使ってオフラインで大容量データを AWS へ移行するサービスです。",
    description:
      "インターネット帯域が限られた環境や 100 TB 超のデータを移行する際に有効です。Storage Optimized と Compute Optimized の 2 タイプがあり、エッジコンピューティングにも使えます。",
    examTip:
      "「帯域不足」「大容量（100 TB 超）」「物理デバイス」というキーワードが出たら Snowball Edge を選びます。DataSync（ネットワーク経由）との使い分けを押さえましょう。",
    related: ["S3", "DataSync", "Direct Connect"],
  },

  // ── データベース ──────────────────────────────────────────────────────────

  {
    id: "rds",
    docsUrl: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html",
    name: "RDS",
    category: "データベース",
    shortDefinition: "AWS のマネージドリレーショナルデータベースサービスです。",
    description:
      "MySQL・PostgreSQL・Oracle・SQL Server・MariaDB をサポートし、パッチ適用・バックアップ・フェイルオーバーを自動管理します。Multi-AZ で高可用性、Read Replica で読み取りスケールが可能です。",
    examTip:
      "Multi-AZ（高可用性）と Read Replica（読み取り性能向上）の違いが最頻出です。暗号化は作成時のみ有効化できる点も注意しましょう。",
    related: ["Aurora", "Multi-AZ", "Read Replica", "RDS Proxy"],
  },
  {
    id: "aurora",
    docsUrl: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html",
    name: "Aurora",
    category: "データベース",
    shortDefinition: "AWS が独自開発した高性能マネージドリレーショナルデータベースです。",
    description:
      "MySQL・PostgreSQL 互換で、標準 RDS より最大 5 倍（MySQL）・3 倍（PostgreSQL）高速です。ストレージは 3 AZ×2 コピー計 6 コピーで自動レプリケーションされます。",
    examTip:
      "高性能・高可用性が必要な RDS 互換ワークロードで選びます。Aurora Global Database でクロスリージョンの低レイテンシ読み取りとフェイルオーバーも頻出です。",
    related: ["RDS", "Aurora Serverless", "Multi-AZ", "Read Replica"],
  },
  {
    id: "aurora-serverless",
    docsUrl: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.html",
    name: "Aurora Serverless",
    category: "データベース",
    shortDefinition: "需要に応じてキャパシティを自動調整するサーバーレス版 Aurora です。",
    description:
      "アクセスがない間は自動で一時停止しコスト削減でき、急なトラフィック増加にも自動スケールで対応します。開発・テスト環境や断続的なワークロードに最適です。",
    examTip:
      "「間欠的なアクセス」「予測不能なトラフィック」「使った分だけ課金したい DB」という要件で選びます。常時稼働が必要な本番ならプロビジョニング型 Aurora を選びます。",
    related: ["Aurora", "RDS", "Serverless", "DynamoDB"],
  },
  {
    id: "dynamodb",
    docsUrl: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html",
    name: "DynamoDB",
    category: "データベース",
    shortDefinition: "AWS のフルマネージドサーバーレス NoSQL データベースです。",
    description:
      "キーバリュー／ドキュメント型で、ミリ秒以下のレイテンシと無制限のスケーラビリティを提供します。オンデマンドとプロビジョニングの 2 つのキャパシティモードがあります。",
    examTip:
      "「サーバーレス」「ミリ秒レイテンシ」「キーバリュー」「急激なスケール変動」という要件で選びます。DAX でさらに高速化、DynamoDB Streams でイベント駆動処理が可能です。",
    related: ["DAX", "DynamoDB Streams", "Aurora Serverless", "ElastiCache"],
  },
  {
    id: "dax",
    docsUrl: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html",
    name: "DynamoDB Accelerator (DAX)",
    category: "データベース",
    shortDefinition: "DynamoDB 専用のインメモリキャッシュサービスです。",
    description:
      "DynamoDB の前段に置くことで読み取りレイテンシをマイクロ秒単位に短縮します。アプリ側の変更が最小限で済み、DynamoDB と互換性のある API で利用できます。",
    examTip:
      "「DynamoDB の読み取りをさらに高速化したい」という要件では DAX を選びます。ElastiCache との違いとして、DynamoDB 専用かつアプリ変更が少ない点が差別化ポイントです。",
    related: ["DynamoDB", "ElastiCache", "Serverless"],
  },
  {
    id: "elasticache",
    docsUrl: "https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/WhatIs.html",
    name: "ElastiCache",
    category: "データベース",
    shortDefinition: "Redis または Memcached のマネージドインメモリキャッシュサービスです。",
    description:
      "データベースやアプリケーションの前段でキャッシュとして機能し、繰り返しのクエリを高速に返します。Redis はデータ永続化・レプリケーション・Pub/Sub も対応しています。",
    examTip:
      "「DB の読み取り負荷を下げたい」「セッション管理」「リアルタイムランキング」という要件で選びます。Redis vs Memcached の使い分け（永続化・レプリケーションが必要なら Redis）も頻出です。",
    related: ["RDS", "DynamoDB", "DAX", "Stateless"],
  },
  {
    id: "redshift",
    docsUrl: "https://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html",
    name: "Redshift",
    category: "データベース",
    shortDefinition: "AWS のマネージドデータウェアハウスサービスです。",
    description:
      "ペタバイト規模の構造化データを列指向ストレージで高速分析できます。S3 上のデータを直接クエリする Redshift Spectrum、ML 連携の Redshift ML も提供しています。",
    examTip:
      "「OLAP」「データウェアハウス」「大規模集計・分析」という要件で選びます。OLTP（トランザクション処理）には RDS/Aurora を使い、Redshift と混同しないようにしましょう。",
    related: ["RDS", "Aurora", "S3", "Athena"],
  },
  {
    id: "neptune",
    docsUrl: "https://docs.aws.amazon.com/neptune/latest/userguide/intro.html",
    name: "Neptune",
    category: "データベース",
    shortDefinition: "AWS のマネージドグラフデータベースサービスです。",
    description:
      "ノードとエッジの関係性を高速にクエリできるグラフ DB です。Gremlin と SPARQL をサポートし、SNS の友人関係・不正検出・知識グラフなどのユースケースに適しています。",
    examTip:
      "「グラフデータ」「関係性の分析」「ソーシャルネットワーク」「不正検出」というキーワードが出たら Neptune を選びます。",
    related: ["DynamoDB", "DocumentDB", "RDS"],
  },
  {
    id: "documentdb",
    docsUrl: "https://docs.aws.amazon.com/documentdb/latest/developerguide/what-is.html",
    name: "DocumentDB",
    category: "データベース",
    shortDefinition: "MongoDB 互換の AWS マネージドドキュメントデータベースです。",
    description:
      "JSON 形式のドキュメントを柔軟なスキーマで保存・クエリできます。MongoDB のワークロードを AWS へ移行する際の選択肢で、Aurora と同様のストレージアーキテクチャを採用しています。",
    examTip:
      "「MongoDB 互換」「ドキュメント指向」「JSON データ」という要件で選びます。DynamoDB との違いとして、より複雑なクエリや MongoDB 互換 API が必要なケースで使います。",
    related: ["DynamoDB", "Neptune", "RDS"],
  },
  {
    id: "dms",
    docsUrl: "https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html",
    name: "Database Migration Service (DMS)",
    category: "データベース",
    shortDefinition: "データベースを AWS へ移行するためのマネージドサービスです。",
    description:
      "オンプレミスや他クラウドの DB から AWS DB へのデータ移行を支援します。継続的なレプリケーション（CDC）で移行中もソース DB を稼働したまま移行できます。",
    examTip:
      "「ダウンタイム最小化」「オンプレから RDS/Aurora への移行」という要件で選びます。異なる DB エンジン間の変換には Schema Conversion Tool（SCT）と組み合わせます。",
    related: ["RDS", "Aurora", "Snowball Edge"],
  },

  // ── ネットワーク（追加分） ────────────────────────────────────────────────

  {
    id: "subnet",
    docsUrl: "https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html",
    name: "Subnet",
    category: "ネットワーク",
    shortDefinition: "VPC 内を細分化した IP アドレス範囲の区画です。",
    description:
      "1 つの AZ に紐付き、パブリックサブネット（IGW へのルートあり）とプライベートサブネット（IGW へのルートなし）に分けて設計します。リソースの公開範囲をサブネット単位で制御します。",
    examTip:
      "ALB はパブリックサブネット、RDS やアプリサーバーはプライベートサブネットに置く構成が基本です。NACL はサブネット単位で適用されます。",
    related: ["VPC", "Public Subnet", "Private Subnet", "Route Table", "NACL"],
  },
  {
    id: "internet-gateway",
    docsUrl: "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html",
    name: "Internet Gateway",
    category: "ネットワーク",
    shortDefinition: "VPC とインターネットを接続する水平スケールなゲートウェイです。",
    description:
      "VPC にアタッチするだけで双方向のインターネット通信を可能にします。パブリックサブネットのルートテーブルに IGW へのルートを追加することで外部通信ができます。",
    examTip:
      "「パブリックサブネット」「インターネットからのアクセスを許可」という要件では IGW が必要です。プライベートサブネットからの外向き通信には NAT Gateway を使います。",
    related: ["VPC", "NAT Gateway", "Public Subnet", "Route Table"],
  },
  {
    id: "nat-gateway",
    docsUrl: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html",
    name: "NAT Gateway",
    category: "ネットワーク",
    shortDefinition: "プライベートサブネットからインターネットへのアウトバウンド通信を可能にするゲートウェイです。",
    description:
      "パブリックサブネットに配置し、プライベートサブネットの EC2 がソフトウェア更新などで外部通信できるようにします。インバウンド通信は許可しないため、インスタンスの公開は行いません。",
    examTip:
      "プライベートサブネットからの外向き通信（ソフトウェア更新など）に使います。高可用性が必要なら各 AZ に 1 つずつ配置します。NAT インスタンスとの比較も頻出です。",
    related: ["VPC", "Internet Gateway", "Private Subnet", "Elastic IP"],
  },
  {
    id: "route-table",
    docsUrl: "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html",
    name: "Route Table",
    category: "ネットワーク",
    shortDefinition: "サブネット内のトラフィックをどこへ転送するかを定義するテーブルです。",
    description:
      "各サブネットに関連付けられ、宛先 CIDR に対する転送先（IGW・NAT GW・VPC ピアリング・Transit GW など）を定義します。明示的な関連付けがない場合はメインルートテーブルが使われます。",
    examTip:
      "パブリックサブネットには IGW へのルート（0.0.0.0/0 → IGW）が必要です。ルートテーブルの設定ミスはネットワーク疎通問題の原因として問われやすいです。",
    related: ["VPC", "Subnet", "Internet Gateway", "NAT Gateway"],
  },
  {
    id: "vpc-peering",
    docsUrl: "https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html",
    name: "VPC Peering",
    category: "ネットワーク",
    shortDefinition: "2 つの VPC をプライベートに接続する機能です。",
    description:
      "同一リージョン・クロスリージョン・クロスアカウントの VPC 間をインターネット経由なしで接続できます。推移的なルーティング（A→B→C）はサポートされません。",
    examTip:
      "「推移的ルーティング不可」という制約が頻出です。多数の VPC を効率よく繋ぐには Transit Gateway を使います。CIDR が重複している場合はピアリングできません。",
    related: ["VPC", "Transit Gateway", "Route Table"],
  },
  {
    id: "transit-gateway",
    docsUrl: "https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html",
    name: "Transit Gateway",
    category: "ネットワーク",
    shortDefinition: "複数の VPC やオンプレミス接続を集中管理するネットワークハブです。",
    description:
      "各 VPC を個別にピアリングするメッシュ構成の代わりに、星型トポロジーで一元管理できます。推移的なルーティングをサポートし、VPN や Direct Connect との統合も可能です。",
    examTip:
      "「多数の VPC を効率よく管理」「推移的ルーティングが必要」という要件で選びます。VPC ピアリングとの比較（シンプルな 2 VPC ならピアリング、多数なら TGW）が頻出です。",
    related: ["VPC", "VPC Peering", "Direct Connect", "VPN Gateway"],
  },
  {
    id: "direct-connect",
    docsUrl: "https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html",
    name: "Direct Connect",
    category: "ネットワーク",
    shortDefinition: "オンプレミスと AWS を専用物理回線で接続するサービスです。",
    description:
      "インターネットを経由しないため、安定した帯域と低レイテンシを提供します。1 Gbps・10 Gbps の専用接続と、パートナー経由の 50 Mbps〜10 Gbps のホスト接続があります。",
    examTip:
      "「専用線」「安定した帯域」「低レイテンシ」「大量データ転送」という要件で選びます。VPN との比較（低コスト・即時開通なら VPN、安定性・帯域なら Direct Connect）が頻出です。",
    related: ["VPN Gateway", "Transit Gateway", "VPC"],
  },
  {
    id: "vpn-gateway",
    docsUrl: "https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html",
    name: "VPN Gateway",
    category: "ネットワーク",
    shortDefinition: "オンプレミスと AWS VPC をインターネット経由で暗号化接続する仮想ゲートウェイです。",
    description:
      "AWS 側の Virtual Private Gateway と顧客側の Customer Gateway を組み合わせて Site-to-Site VPN を構成します。Direct Connect より低コストで短期間に構築でき、冗長化もできます。",
    examTip:
      "「低コスト」「短期間での VPN 接続」「Direct Connect のバックアップ」という要件で選びます。Direct Connect との使い分けを整理しておきましょう。",
    related: ["Direct Connect", "Transit Gateway", "VPC"],
  },
  {
    id: "cloudfront",
    docsUrl: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html",
    name: "CloudFront",
    category: "ネットワーク",
    shortDefinition: "世界中のエッジロケーションでコンテンツを配信する AWS の CDN サービスです。",
    description:
      "S3・ALB・EC2・API Gateway などをオリジンとして設定でき、静的・動的コンテンツ両方のレイテンシを下げます。WAF・Shield と統合してセキュリティ対策も行えます。",
    examTip:
      "「グローバルな低レイテンシ配信」「S3 コンテンツの配信」「HTTPS 強制」「WAF 統合」の要件で選びます。Global Accelerator との違いとして、HTTP/HTTPS のキャッシュ配信に特化している点を押さえましょう。",
    related: ["S3", "ALB", "WAF", "Route 53", "Global Accelerator"],
  },
  {
    id: "route-53",
    docsUrl: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html",
    name: "Route 53",
    category: "ネットワーク",
    shortDefinition: "AWS のマネージド DNS サービスです。",
    description:
      "ドメイン登録・DNS ルーティング・ヘルスチェックを一元管理します。ルーティングポリシーとして、シンプル・加重・レイテンシーベース・フェイルオーバー・地理的・地理的近接性の 6 種類があります。",
    examTip:
      "ルーティングポリシーの使い分けが最頻出です。フェイルオーバー（障害時切替）・レイテンシーベース（最速リージョン）・加重（カナリアリリース）を特に押さえましょう。",
    related: ["CloudFront", "ALB", "VPC", "Transit Gateway"],
  },
  {
    id: "alb",
    docsUrl: "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html",
    name: "ALB",
    category: "ネットワーク",
    shortDefinition: "HTTP/HTTPS を理解する L7 ロードバランサーです。",
    description:
      "URL パス・ホスト名・HTTP ヘッダー・クエリ文字列に基づいてリクエストをターゲットグループへ振り分けます。WebSocket・HTTP/2 もサポートし、Lambda もターゲットにできます。",
    examTip:
      "「パスベースルーティング」「ホストベースルーティング」「マイクロサービスへのトラフィック分散」という要件では ALB を選びます。NLB との違いとして、コンテンツを見て振り分ける L7 動作が差別化ポイントです。",
    related: ["NLB", "Auto Scaling Group", "WAF", "Route 53"],
  },
  {
    id: "nlb",
    docsUrl: "https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html",
    name: "NLB",
    category: "ネットワーク",
    shortDefinition: "超低レイテンシの TCP/UDP L4 ロードバランサーです。",
    description:
      "接続単位で処理するため ALB より低レイテンシで、固定 IP（Elastic IP）を割り当てられます。TLS オフロードも可能で、PrivateLink のフロントエンドとしても使われます。",
    examTip:
      "「超低レイテンシ」「TCP/UDP」「固定 IP が必要」「PrivateLink の公開」という要件では NLB を選びます。コンテンツ内容を見た振り分けが必要なら ALB を選びます。",
    related: ["ALB", "PrivateLink", "Elastic IP"],
  },
  {
    id: "global-accelerator",
    docsUrl: "https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html",
    name: "Global Accelerator",
    category: "ネットワーク",
    shortDefinition: "AWS グローバルネットワークを使って TCP/UDP トラフィックを高速化するサービスです。",
    description:
      "エニーキャスト IP を 2 つ提供し、最も近いエッジロケーションから AWS のバックボーンネットワーク経由でエンドポイントへ転送します。インターネット経路の不安定さを回避できます。",
    examTip:
      "CloudFront との違いが頻出です。CloudFront は HTTP キャッシュ配信、Global Accelerator は TCP/UDP の低レイテンシ転送・固定 IP が必要なケースに使います。",
    related: ["CloudFront", "NLB", "ALB", "Route 53"],
  },
  {
    id: "privatelink",
    docsUrl: "https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html",
    name: "PrivateLink",
    category: "ネットワーク",
    shortDefinition: "VPC 間または AWS サービスへをインターネットを経由せずプライベートに公開・接続する仕組みです。",
    description:
      "サービス提供側は NLB の前段に PrivateLink エンドポイントを作成し、消費側の VPC からは Interface 型 VPC エンドポイントで接続します。CIDR の重複があっても利用できます。",
    examTip:
      "「CIDR 重複がある VPC 間でも安全に接続したい」「SaaS サービスを VPC 内からプライベートに利用したい」という要件で選びます。VPC ピアリングとの違いとして、一方向公開でネットワーク全体は共有しない点が重要です。",
    related: ["NLB", "VPC Peering", "Transit Gateway", "VPC"],
  },

  // ── セキュリティ ──────────────────────────────────────────────────────────

  {
    id: "iam-policy",
    docsUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html",
    name: "IAM Policy",
    category: "セキュリティ",
    shortDefinition: "AWS リソースへのアクセス権限を定義する JSON ドキュメントです。",
    description:
      "Effect（Allow/Deny）・Action・Resource・Condition の 4 要素で構成されます。IAM User・Group・Role にアタッチする Identity-based ポリシーと、リソース側に設定する Resource-based ポリシーがあります。",
    examTip:
      "明示的な Deny は Allow より優先されます。最小権限の原則（Least Privilege）に基づいて必要最小限の権限だけを付与する設計が問われます。",
    related: ["IAM Role", "IAM User", "S3", "KMS"],
  },
  {
    id: "iam-user",
    docsUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html",
    name: "IAM User",
    category: "セキュリティ",
    shortDefinition: "AWS アカウント内の個人またはアプリケーションを表す恒久的な認証エンティティです。",
    description:
      "ユーザー名・パスワード（コンソール）またはアクセスキー（API）で認証します。長期認証情報（アクセスキー）を持つため、漏洩リスクを避けるために IAM Role の使用が推奨されます。",
    examTip:
      "アプリケーションや AWS サービスへの権限付与には IAM User ではなく IAM Role を使うのが正解パターンです。ルートアカウントの直接使用は避け、MFA を必ず有効化します。",
    related: ["IAM Role", "IAM Policy", "MFA"],
  },
  {
    id: "mfa",
    docsUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html",
    name: "MFA",
    category: "セキュリティ",
    shortDefinition: "パスワードに加えて追加の認証要素を要求する多要素認証の仕組みです。",
    description:
      "仮想 MFA デバイス（認証アプリ）・ハードウェア MFA・U2F セキュリティキーを使用できます。S3 の MFA Delete と組み合わせるとオブジェクト削除に MFA が必要になります。",
    examTip:
      "ルートアカウントと特権ユーザーには MFA 必須という設計原則が問われます。S3 MFA Delete はバージョニングと組み合わせたデータ保護の文脈で出ます。",
    related: ["IAM User", "IAM Policy", "S3"],
  },
  {
    id: "kms",
    docsUrl: "https://docs.aws.amazon.com/kms/latest/developerguide/overview.html",
    name: "KMS",
    category: "セキュリティ",
    shortDefinition: "AWS が管理する暗号化キーを作成・管理するサービスです。",
    description:
      "AWS マネージドキーと顧客マネージドキー（CMK）を使い分けられます。S3・EBS・RDS・Lambda など多くのサービスと統合しており、データの保存時暗号化（at rest）を実現します。",
    examTip:
      "「保存時の暗号化」「キーのローテーション」「クロスアカウントのキー共有」が頻出です。CloudHSM との違いとして、KMS は AWS がキーを管理し、CloudHSM は顧客が専有ハードウェアで管理します。",
    related: ["CloudHSM", "Secrets Manager", "S3", "EBS"],
  },
  {
    id: "cloudhsm",
    docsUrl: "https://docs.aws.amazon.com/cloudhsm/latest/userguide/introduction.html",
    name: "CloudHSM",
    category: "セキュリティ",
    shortDefinition: "顧客が専有するハードウェアセキュリティモジュール（HSM）を AWS 上で利用するサービスです。",
    description:
      "FIPS 140-2 Level 3 認定のハードウェアで暗号化キーを管理します。AWS はハードウェアのみを管理し、キーの管理は完全に顧客が行います。",
    examTip:
      "「FIPS 140-2 Level 3」「顧客がキーを完全管理」「規制要件でキーを AWS に触れさせたくない」という要件で選びます。KMS より高コスト・高管理負荷です。",
    related: ["KMS", "IAM Policy"],
  },
  {
    id: "secrets-manager",
    docsUrl: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html",
    name: "Secrets Manager",
    category: "セキュリティ",
    shortDefinition: "データベース認証情報や API キーなどのシークレットを安全に管理するサービスです。",
    description:
      "シークレットの自動ローテーション（RDS・Redshift・DocumentDB と直接統合）をサポートします。アプリはコード内にパスワードをハードコードせず、SDK 経由でシークレットを取得します。",
    examTip:
      "「パスワードの自動ローテーション」「DB 認証情報をコードに埋め込まない」という要件で選びます。Parameter Store との違いとして、自動ローテーション機能の有無が最大の差です。",
    related: ["Parameter Store", "KMS", "RDS", "IAM Role"],
  },
  {
    id: "parameter-store",
    docsUrl: "https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html",
    name: "Parameter Store",
    category: "セキュリティ",
    shortDefinition: "設定値やシークレットを階層構造で管理する AWS Systems Manager の機能です。",
    description:
      "文字列・StringList・SecureString（KMS 暗号化）の 3 タイプを保存できます。無料の Standard 階層と、高スループット向けの Advanced 階層があります。",
    examTip:
      "Secrets Manager との比較が頻出です。自動ローテーションが不要でコストを抑えたい設定値やシークレットには Parameter Store を選びます。",
    related: ["Secrets Manager", "KMS", "Systems Manager"],
  },
  {
    id: "waf",
    docsUrl: "https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html",
    name: "WAF",
    category: "セキュリティ",
    shortDefinition: "Web アプリケーションへの攻撃を検出・ブロックする L7 ファイアウォールです。",
    description:
      "SQL インジェクション・XSS・不正ボットなどを WebACL のルールで制御します。CloudFront・ALB・API Gateway・AppSync にアタッチして使用します。AWS マネージドルールで素早く保護を開始できます。",
    examTip:
      "「SQL インジェクション」「XSS」「レートベースの制限」「IP ブロック」という要件で選びます。Shield との違いとして、WAF は L7 の Web 攻撃対策、Shield は L3/L4 の DDoS 対策です。",
    related: ["Shield", "CloudFront", "ALB", "API Gateway"],
  },
  {
    id: "shield",
    docsUrl: "https://docs.aws.amazon.com/waf/latest/developerguide/shield-chapter.html",
    name: "Shield",
    category: "セキュリティ",
    shortDefinition: "AWS リソースを DDoS 攻撃から保護するサービスです。",
    description:
      "Shield Standard は全 AWS 利用者に無料で自動適用され L3/L4 の一般的な DDoS を防ぎます。Shield Advanced は高度な DDoS 対策・リアルタイム可視性・DRT サポート・コスト保護を追加提供します。",
    examTip:
      "「DDoS 保護」「自動適用・追加費用なし」なら Standard、「高度な DDoS 対策」「24/7 DRT サポート」なら Advanced を選びます。WAF との違いも整理しましょう。",
    related: ["WAF", "CloudFront", "Route 53"],
  },
  {
    id: "guardduty",
    docsUrl: "https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html",
    name: "GuardDuty",
    category: "セキュリティ",
    shortDefinition: "機械学習で AWS 環境の脅威を継続的に検出するサービスです。",
    description:
      "CloudTrail・VPC フローログ・DNS ログを分析し、不審な API コール・侵害されたインスタンス・マルウェア通信などを検出します。エージェント不要で有効化するだけで動作します。",
    examTip:
      "「AWS 環境全体の脅威検出」「侵害の検知」「エージェントレス」という要件で選びます。Inspector（脆弱性スキャン）や CloudTrail（API 記録）との違いを整理しましょう。",
    related: ["CloudTrail", "Inspector", "WAF", "Shield"],
  },
  {
    id: "inspector",
    docsUrl: "https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html",
    name: "Inspector",
    category: "セキュリティ",
    shortDefinition: "EC2 インスタンスやコンテナイメージの脆弱性を自動スキャンするサービスです。",
    description:
      "CVE（共通脆弱性識別子）に基づいてソフトウェアの脆弱性とネットワークの露出を継続的に評価します。ECR のコンテナイメージも対象です。",
    examTip:
      "「EC2 の脆弱性スキャン」「コンテナイメージの CVE チェック」「ネットワーク到達可能性の評価」という要件で選びます。GuardDuty（脅威検出）との違いを意識しましょう。",
    related: ["GuardDuty", "Systems Manager", "ECR"],
  },
  {
    id: "cognito",
    docsUrl: "https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html",
    name: "Cognito",
    category: "セキュリティ",
    shortDefinition: "Web・モバイルアプリにユーザー認証・認可機能を追加するサービスです。",
    description:
      "User Pool（ユーザーディレクトリ・サインアップ/サインイン）と Identity Pool（一時的な AWS 認証情報の払い出し）の 2 コンポーネントで構成されます。Google・Facebook などの外部 IdP とも統合できます。",
    examTip:
      "「モバイル/Web アプリのユーザー認証」「API Gateway の認証」「ソーシャルログイン統合」という要件で選びます。User Pool と Identity Pool の役割の違いも押さえましょう。",
    related: ["API Gateway", "IAM Role", "ALB"],
  },
  {
    id: "acm",
    docsUrl: "https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html",
    name: "ACM",
    category: "セキュリティ",
    shortDefinition: "AWS が管理する SSL/TLS 証明書を無料で発行・自動更新するサービスです。",
    description:
      "ALB・CloudFront・API Gateway・Elastic Beanstalk などと統合して HTTPS を簡単に有効化できます。パブリック証明書は無料で自動更新されます。EC2 への直接インストールには使用できません。",
    examTip:
      "「HTTPS の有効化」「証明書の自動更新」「無料 SSL 証明書」という要件で選びます。EC2 に直接インストールできない点が引っかけで出ることがあります。",
    related: ["ALB", "CloudFront", "API Gateway"],
  },

  // ── 監視・運用 ────────────────────────────────────────────────────────────

  {
    id: "cloudwatch",
    docsUrl: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html",
    name: "CloudWatch",
    category: "監視・運用",
    shortDefinition: "AWS リソースのメトリクス収集・アラーム設定・ダッシュボード作成を行う監視サービスです。",
    description:
      "CPU 使用率・ネットワーク・ディスクなどの標準メトリクスを自動収集し、カスタムメトリクスも送信できます。アラームで Auto Scaling や SNS 通知をトリガーできます。",
    examTip:
      "「メトリクス監視」「アラーム設定」「Auto Scaling のトリガー」「カスタムメトリクス（メモリ使用率は標準では取れない）」が頻出です。ログは CloudWatch Logs、API 記録は CloudTrail と区別しましょう。",
    related: ["CloudWatch Logs", "CloudTrail", "Auto Scaling Group", "SNS"],
  },
  {
    id: "cloudwatch-logs",
    docsUrl: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html",
    name: "CloudWatch Logs",
    category: "監視・運用",
    shortDefinition: "アプリケーションや AWS サービスのログを収集・保存・検索するサービスです。",
    description:
      "Lambda・EC2・ECS・VPC フローログ・CloudTrail などのログを一元管理します。Logs Insights で SQL ライクなクエリ分析が可能です。保存期間は 1 日〜永続まで設定できます。",
    examTip:
      "「ログの集中管理」「Lambda のログ確認」「VPC フローログの保存先」という要件で使います。メトリクスフィルターでログからメトリクスを生成して CloudWatch アラームにつなげるパターンも頻出です。",
    related: ["CloudWatch", "CloudTrail", "Lambda", "VPC"],
  },
  {
    id: "cloudtrail",
    docsUrl: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html",
    name: "CloudTrail",
    category: "監視・運用",
    shortDefinition: "AWS アカウントへの API コールを記録する監査ログサービスです。",
    description:
      "誰が・いつ・どのリソースに対して何をしたかを記録します。デフォルトで 90 日間のイベント履歴を保存し、S3 に長期保存したり CloudWatch Logs に送信して監視できます。",
    examTip:
      "「誰がリソースを変更したか」「コンプライアンス監査」「セキュリティインシデント調査」という要件で選びます。CloudWatch（パフォーマンス監視）との違いを明確にしましょう。",
    related: ["CloudWatch", "S3", "GuardDuty", "AWS Config"],
  },
  {
    id: "aws-config",
    docsUrl: "https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html",
    name: "AWS Config",
    category: "監視・運用",
    shortDefinition: "AWS リソースの設定変更を継続的に記録・評価するサービスです。",
    description:
      "リソースの設定履歴を記録し、コンプライアンスルールへの適合状況を自動評価します。非準拠リソースの自動修復（SSM Automation との連携）も可能です。",
    examTip:
      "「設定変更の追跡」「コンプライアンス評価」「誰が設定を変えたか（→CloudTrail）ではなく今の設定状態が正しいか」という文脈で選びます。",
    related: ["CloudTrail", "Systems Manager", "Trusted Advisor"],
  },
  {
    id: "systems-manager",
    docsUrl: "https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html",
    name: "Systems Manager",
    category: "監視・運用",
    shortDefinition: "EC2 インスタンスや オンプレミスサーバーを一元管理する運用サービスです。",
    description:
      "Session Manager（SSH 不要のブラウザ接続）・Patch Manager（パッチ自動適用）・Run Command（リモートコマンド実行）・Parameter Store（設定管理）などの機能を提供します。",
    examTip:
      "「SSH キーなしでインスタンスに接続したい」「パッチ適用を自動化したい」「Parameter Store で設定管理」という要件で選びます。Session Manager はセキュリティグループの SSH 開放が不要な点が重要です。",
    related: ["Parameter Store", "CloudWatch", "EC2", "Inspector"],
  },
  {
    id: "trusted-advisor",
    docsUrl: "https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html",
    name: "Trusted Advisor",
    category: "監視・運用",
    shortDefinition: "AWS 環境のコスト最適化・セキュリティ・パフォーマンス・耐障害性・サービス制限を自動チェックするサービスです。",
    description:
      "ベストプラクティスに基づいて現在の構成を評価し、改善推奨を提示します。Basic/Developer サポートでは一部チェックのみ、Business 以上では全チェックが利用できます。",
    examTip:
      "「使用されていないリソースの検出」「セキュリティグループの開放ポートの警告」「サービス制限の確認」といった要件で登場します。フルアクセスには Business 以上のサポートプランが必要です。",
    related: ["AWS Config", "CloudWatch", "Cost Explorer"],
  },
  {
    id: "health-dashboard",
    docsUrl: "https://docs.aws.amazon.com/health/latest/ug/what-is-aws-health.html",
    name: "Health Dashboard",
    category: "監視・運用",
    shortDefinition: "AWS サービスの状態と自アカウントへの影響を確認できるダッシュボードです。",
    description:
      "Service Health Dashboard（全 AWS サービスの公開状態）と Personal Health Dashboard（自アカウントに関連するイベント・メンテナンス通知）の 2 種類があります。",
    examTip:
      "「自分のアカウントに影響する AWS 障害を通知したい」という要件では Personal Health Dashboard を選びます。EventBridge と連携してアラートを自動化するパターンも出ます。",
    related: ["CloudWatch", "EventBridge", "Trusted Advisor"],
  },

  // ── アプリ統合 ────────────────────────────────────────────────────────────

  {
    id: "sqs",
    docsUrl: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html",
    name: "SQS",
    category: "アプリ統合",
    shortDefinition: "マネージドなメッセージキューサービスで、コンポーネント間を疎結合にします。",
    description:
      "Standard キュー（高スループット・順序保証なし）と FIFO キュー（順序保証・重複排除）の 2 種類があります。可視性タイムアウトで処理中メッセージを他のコンシューマーから隠せます。",
    examTip:
      "「疎結合」「非同期処理」「負荷の平準化」「処理の順序が重要なら FIFO」が頻出です。SNS との組み合わせ（fan-out パターン）も問われます。",
    related: ["SNS", "Lambda", "EventBridge", "Event-driven"],
  },
  {
    id: "sns",
    docsUrl: "https://docs.aws.amazon.com/sns/latest/dg/welcome.html",
    name: "SNS",
    category: "アプリ統合",
    shortDefinition: "Pub/Sub モデルでメッセージを複数のサブスクライバーに配信するサービスです。",
    description:
      "1 つのトピックへの発行で、SQS・Lambda・HTTP・Email・SMS など複数のエンドポイントへ同時配信できます。SNS → SQS の fan-out パターンで並列処理を実現します。",
    examTip:
      "「1 対多の通知」「fan-out（複数 SQS への同時配信）」「Lambda のトリガー」という要件で選びます。SQS は Pull 型、SNS は Push 型という違いを押さえましょう。",
    related: ["SQS", "Lambda", "EventBridge", "CloudWatch"],
  },
  {
    id: "eventbridge",
    docsUrl: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html",
    name: "EventBridge",
    category: "アプリ統合",
    shortDefinition: "AWS サービスや SaaS からのイベントをルーティングするサーバーレスイベントバスです。",
    description:
      "イベントパターンマッチングで特定のイベントを Lambda・SQS・Step Functions などへルーティングします。スケジュールルールで Cron 式による定期実行もできます。",
    examTip:
      "「AWS サービスのイベントに反応したい」「Cron でのスケジュール実行」「SaaS イベントの統合」という要件で選びます。SNS との違いとして、イベントのフィルタリングと柔軟なルーティングが強みです。",
    related: ["SNS", "SQS", "Lambda", "Step Functions"],
  },
  {
    id: "step-functions",
    docsUrl: "https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html",
    name: "Step Functions",
    category: "アプリ統合",
    shortDefinition: "複数の Lambda 関数やサービスをワークフローとして orchestrate するサービスです。",
    description:
      "ステートマシンで処理の順序・分岐・並列・エラー処理を視覚的に定義できます。Standard ワークフロー（最大 1 年）と Express ワークフロー（最大 5 分・高スループット）があります。",
    examTip:
      "「複数 Lambda の連鎖」「処理の分岐・並列化」「エラー時のリトライ制御」「長時間ワークフロー」という要件で選びます。AWS Batch との違いとして、ワークフロー管理に特化している点が重要です。",
    related: ["Lambda", "SQS", "EventBridge", "Batch"],
  },
  {
    id: "appsync",
    docsUrl: "https://docs.aws.amazon.com/appsync/latest/devguide/what-is-appsync.html",
    name: "AppSync",
    category: "アプリ統合",
    shortDefinition: "GraphQL API をマネージドで構築・実行するサービスです。",
    description:
      "DynamoDB・Lambda・HTTP などを data source として GraphQL スキーマで統合します。リアルタイムのデータ同期（サブスクリプション）とオフラインデータ同期もサポートします。",
    examTip:
      "「GraphQL API」「リアルタイムデータ同期」「モバイルアプリのバックエンド」という要件で選びます。REST API が必要なら API Gateway を使います。",
    related: ["API Gateway", "DynamoDB", "Lambda", "Cognito"],
  },
  {
    id: "kinesis-data-streams",
    docsUrl: "https://docs.aws.amazon.com/streams/latest/dev/introduction.html",
    name: "Kinesis Data Streams",
    category: "アプリ統合",
    shortDefinition: "リアルタイムのストリーミングデータを収集・処理するサービスです。",
    description:
      "シャード単位でスループットを管理し、複数のコンシューマーが同じストリームを並列読み取りできます。デフォルト 24 時間（最大 365 日）のデータ保持期間があります。",
    examTip:
      "「リアルタイム処理」「複数コンシューマーによる並列処理」「データの再処理」という要件で選びます。Kinesis Firehose との違いとして、カスタム処理ロジックが必要な場合は Data Streams を使います。",
    related: ["Kinesis Firehose", "Lambda", "SQS", "MSK"],
  },
  {
    id: "kinesis-firehose",
    docsUrl: "https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html",
    name: "Kinesis Firehose",
    category: "アプリ統合",
    shortDefinition: "ストリーミングデータを S3・Redshift・OpenSearch などへ自動配信するサービスです。",
    description:
      "データの変換（Lambda 連携）・圧縮・暗号化を行いながら配信先に書き込みます。サーバーレスで自動スケールし、管理オーバーヘッドがほぼありません。",
    examTip:
      "「ストリームデータを S3 や Redshift に自動保存したい」「管理なし」という要件で選びます。Data Streams との違いとして、カスタムコンシューマーが不要で配信先が固定されている場合に適しています。",
    related: ["Kinesis Data Streams", "S3", "Redshift", "Lambda"],
  },
  {
    id: "ses",
    docsUrl: "https://docs.aws.amazon.com/ses/latest/dg/Welcome.html",
    name: "SES",
    category: "アプリ統合",
    shortDefinition: "大量のメールを送受信できるマネージドメールサービスです。",
    description:
      "トランザクションメール（注文確認・パスワードリセット）やマーケティングメールを高配信率で送信できます。受信メールのルーティング・S3 保存・Lambda 実行もサポートします。",
    examTip:
      "「アプリからのメール送信」「大量メール配信」という要件で選びます。SNS との違いとして、SES はメール専用で高配信率・バウンス管理に優れています。",
    related: ["SNS", "Lambda", "S3"],
  },

  // ── コスト最適化 ─────────────────────────────────────────────────────────

  {
    id: "reserved-instances",
    docsUrl: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html",
    name: "Reserved Instances",
    category: "コスト最適化",
    shortDefinition: "1 年または 3 年の使用を予約することでオンデマンドより割引を受ける購入オプションです。",
    description:
      "Standard RI（特定インスタンスタイプに固定・最大 72% 割引）と Convertible RI（インスタンスタイプ変更可・最大 66% 割引）があります。全額前払い・一部前払い・前払いなしで割引率が変わります。",
    examTip:
      "安定した継続利用が見込まれる本番ワークロードのコスト最適化として頻出です。Savings Plans との比較として、より柔軟な割引が必要なら Savings Plans を選びます。",
    related: ["Savings Plans", "Spot Instance", "EC2", "Cost Explorer"],
  },
  {
    id: "savings-plans",
    docsUrl: "https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html",
    name: "Savings Plans",
    category: "コスト最適化",
    shortDefinition: "一定量のコンピュート使用量をコミットすることで割引を受える柔軟な購入オプションです。",
    description:
      "Compute Savings Plans（EC2・Lambda・Fargate に適用・最大 66% 割引）と EC2 Instance Savings Plans（特定リージョン・ファミリーに適用・最大 72% 割引）があります。",
    examTip:
      "「柔軟にインスタンスタイプやリージョンを変えながら割引したい」という要件では Savings Plans が適しています。RI より柔軟で、Lambda・Fargate にも適用できる点が差別化ポイントです。",
    related: ["Reserved Instances", "Spot Instance", "Cost Explorer"],
  },
  {
    id: "spot-instance",
    docsUrl: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html",
    name: "Spot Instance",
    category: "コスト最適化",
    shortDefinition: "AWS の余剰キャパシティを最大 90% 割引で利用できる購入オプションです。",
    description:
      "AWS がキャパシティを必要とした際に 2 分前通知で中断されます。中断を許容できるバッチ処理・CI/CD・分散処理に最適です。Spot Fleet で複数インスタンスタイプを組み合わせて安定性を高められます。",
    examTip:
      "「最大のコスト削減」「中断を許容できるワークロード」というキーワードで選びます。中断されると困る処理にはオンデマンドまたは RI を使います。",
    related: ["Reserved Instances", "Savings Plans", "EC2", "AWS Batch"],
  },
  {
    id: "cost-explorer",
    docsUrl: "https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html",
    name: "Cost Explorer",
    category: "コスト最適化",
    shortDefinition: "AWS のコストと使用量を可視化・分析するツールです。",
    description:
      "過去 13 ヶ月のコストデータをグラフで確認でき、サービス・アカウント・タグなどでフィルタリングできます。将来 12 ヶ月のコスト予測と RI/Savings Plans の購入推奨も提供します。",
    examTip:
      "「コスト分析」「コスト傾向の把握」「RI 購入推奨」という要件で選びます。Budgets との違いとして、Cost Explorer は分析ツール、Budgets はアラート設定ツールです。",
    related: ["Budgets", "Reserved Instances", "Savings Plans", "Trusted Advisor"],
  },
  {
    id: "budgets",
    docsUrl: "https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html",
    name: "Budgets",
    category: "コスト最適化",
    shortDefinition: "コスト・使用量・RI/Savings Plans の予算を設定し、超過時にアラートを送るサービスです。",
    description:
      "月次・四半期・年次の予算を設定し、実績または予測が閾値を超えたら SNS や Email で通知します。予算超過時に自動でアクションを実行する Budgets Actions も利用できます。",
    examTip:
      "「コスト超過の早期警告」「予算管理の自動化」という要件で選びます。Cost Explorer との役割分担（分析→Cost Explorer、アラート→Budgets）を整理しましょう。",
    related: ["Cost Explorer", "SNS", "CloudWatch"],
  },
  {
    id: "compute-optimizer",
    docsUrl: "https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html",
    name: "Compute Optimizer",
    category: "コスト最適化",
    shortDefinition: "機械学習で EC2・Lambda・EBS などの最適なリソースサイズを推奨するサービスです。",
    description:
      "過去の CloudWatch メトリクスを分析し、過剰プロビジョニングや不足しているリソースを検出して最適なサイズを提案します。EC2・ECS on Fargate・Lambda・EBS・Auto Scaling Group が対象です。",
    examTip:
      "「EC2 のサイズが適切か確認したい」「リソースの過剰プロビジョニングを削減したい」という要件で選びます。Trusted Advisor も似たチェックをしますが、Compute Optimizer は ML ベースでより詳細な推奨を出します。",
    related: ["EC2", "Lambda", "EBS", "Trusted Advisor", "Cost Explorer"],
  },

  // ── セキュリティ（追加）────────────────────────────────────────────────
  {
    id: "control-tower",
    docsUrl: "https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html",
    name: "AWS Control Tower",
    category: "セキュリティ",
    shortDefinition: "マルチアカウント環境を安全・標準的に構築・管理するサービスです。",
    description:
      "AWS Organizations と統合し、ガードレール（必須・推奨のポリシーセット）を適用してアカウントを一元管理します。新しい AWS アカウントをランディングゾーンと呼ばれる標準構成で自動プロビジョニングできます。",
    examTip:
      "「マルチアカウントのガバナンスを自動化したい」「ランディングゾーンを構成したい」というキーワードで選びます。Organizations との違いは、Control Tower はベストプラクティスの適用と自動化まで担う点です。",
    related: ["AWS Organizations", "Service Control Policy", "Security Hub", "Config"],
  },
  {
    id: "security-hub",
    docsUrl: "https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html",
    name: "AWS Security Hub",
    category: "セキュリティ",
    shortDefinition: "複数の AWS セキュリティサービスの検出結果を一元集約・可視化するサービスです。",
    description:
      "GuardDuty・Inspector・Macie・Firewall Manager などのセキュリティ検出結果を集約し、CSPM（クラウドセキュリティ姿勢管理）として CIS AWS Foundations Benchmark などのコンプライアンスチェックも提供します。",
    examTip:
      "「複数のセキュリティサービスの結果を一か所で確認したい」という要件で選びます。Detective（調査）・GuardDuty（脅威検出）との役割の違いを整理しましょう。",
    related: ["GuardDuty", "Inspector", "Macie", "AWS Config", "Detective"],
  },
  {
    id: "macie",
    docsUrl: "https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html",
    name: "Amazon Macie",
    category: "セキュリティ",
    shortDefinition: "S3 内の機密データ（PII など）を機械学習で自動検出するサービスです。",
    description:
      "S3 バケットを継続的にスキャンし、個人情報（氏名・クレジットカード番号など）を自動検出します。バケットのアクセス設定が過剰に公開されていないかも評価します。",
    examTip:
      "「S3 内の個人情報を自動検出したい」「PII の漏洩リスクを評価したい」という要件で選びます。GDPR・HIPAA 対応の文脈で頻出です。",
    related: ["S3", "Security Hub", "KMS", "CloudTrail"],
  },
  {
    id: "detective",
    docsUrl: "https://docs.aws.amazon.com/detective/latest/adminguide/what-is-detective.html",
    name: "Amazon Detective",
    category: "セキュリティ",
    shortDefinition: "セキュリティインシデントの根本原因を視覚的に調査するサービスです。",
    description:
      "VPC Flow Logs・CloudTrail・GuardDuty の検出結果をグラフ化し、攻撃の経路や影響範囲を視覚的に分析できます。GuardDuty が脅威を検出した後の深掘り調査に使います。",
    examTip:
      "「GuardDuty の検出結果をさらに調査したい」「セキュリティインシデントの影響範囲を特定したい」という要件で選びます。Detective = 調査、GuardDuty = 検出、Security Hub = 集約と役割を整理しましょう。",
    related: ["GuardDuty", "Security Hub", "CloudTrail", "VPC Flow Logs"],
  },
  {
    id: "firewall-manager",
    docsUrl: "https://docs.aws.amazon.com/waf/latest/developerguide/fms-chapter.html",
    name: "AWS Firewall Manager",
    category: "セキュリティ",
    shortDefinition: "WAF・Shield・Network Firewall のルールを複数アカウントに一元適用するサービスです。",
    description:
      "AWS Organizations と統合し、組織内のすべてのアカウントに WAF ルール・Shield Advanced・Security Group ポリシー・Network Firewall ポリシーを一括で適用・管理できます。",
    examTip:
      "「複数アカウントに WAF ポリシーを統一適用したい」という要件で選びます。Firewall Manager = ポリシーの一元管理、WAF = 個別リソースの保護と使い分けましょう。",
    related: ["WAF", "Shield", "Network Firewall", "AWS Organizations", "Security Hub"],
  },
  {
    id: "network-firewall",
    docsUrl: "https://docs.aws.amazon.com/network-firewall/latest/developerguide/what-is-aws-network-firewall.html",
    name: "AWS Network Firewall",
    category: "セキュリティ",
    shortDefinition: "VPC 内のトラフィックをステートフルに検査・フィルタリングするマネージドファイアウォールです。",
    description:
      "Suricata 互換のルールエンジンを使い、VPC の境界でネットワークトラフィックを深層パケット検査（DPI）できます。悪意のある IP・ドメインへの通信ブロックや IDS/IPS 機能を提供します。",
    examTip:
      "「VPC 内の通信を DPI・IDS/IPS で保護したい」という要件で選びます。Security Group・NACL はポート単位の制御、Network Firewall はパケット内容まで検査できる点が違いです。",
    related: ["VPC", "Security Group", "WAF", "Firewall Manager", "Transit Gateway"],
  },
  {
    id: "iam-identity-center",
    docsUrl: "https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html",
    name: "IAM Identity Center",
    category: "セキュリティ",
    shortDefinition: "複数の AWS アカウントやアプリへのシングルサインオン（SSO）を一元管理するサービスです。",
    description:
      "旧称 AWS SSO。Microsoft AD・Okta などの外部 IdP と連携し、組織内のユーザーが単一の認証でマルチアカウント環境に SSO できます。許可セット（Permission Set）で各アカウントへの権限を管理します。",
    examTip:
      "「複数 AWS アカウントへの SSO を実現したい」「従業員が社内 AD で AWS にログインしたい」という要件で選びます。IAM ユーザーを個別アカウントに作らずに済む点が重要です。",
    related: ["IAM Role", "AWS Organizations", "Control Tower", "Active Directory"],
  },
  {
    id: "verified-access",
    docsUrl: "https://docs.aws.amazon.com/verified-access/latest/ug/what-is-verified-access.html",
    name: "AWS Verified Access",
    category: "セキュリティ",
    shortDefinition: "VPN なしで企業アプリへのゼロトラストアクセスを実現するサービスです。",
    description:
      "ユーザーのデバイス状態・ID・場所などを継続的に検証し、条件を満たした場合のみ社内アプリへのアクセスを許可します。AWS IAM Identity Center や外部 IdP と統合して動作します。",
    examTip:
      "「VPN レスのゼロトラストアクセスを実現したい」という要件で選びます。ClientVPN が IP レベルのトンネルを提供するのに対し、Verified Access はアプリ単位のアクセス制御を行います。",
    related: ["IAM Identity Center", "Client VPN", "WAF", "CloudFront"],
  },
  {
    id: "resource-access-manager",
    docsUrl: "https://docs.aws.amazon.com/ram/latest/userguide/what-is.html",
    name: "AWS Resource Access Manager (RAM)",
    category: "セキュリティ",
    shortDefinition: "AWS リソースを別アカウントや Organization 内で安全に共有するサービスです。",
    description:
      "Transit Gateway・Subnet・License Manager の設定・Route 53 Resolver Rule などを別の AWS アカウントや Organization 内のアカウントと共有できます。リソースの重複作成を防ぎコストを削減できます。",
    examTip:
      "「Transit Gateway を複数アカウントで共有したい」「VPC サブネットをアカウントをまたいで使いたい」という要件で選びます。VPC Peering との違いは、RAM は Transit Gateway など VPC 以外のリソースも共有できる点です。",
    related: ["Transit Gateway", "AWS Organizations", "VPC", "Route 53"],
  },
  {
    id: "artifact",
    docsUrl: "https://docs.aws.amazon.com/artifact/latest/ug/what-is-aws-artifact.html",
    name: "AWS Artifact",
    category: "セキュリティ",
    shortDefinition: "AWS のコンプライアンスレポートや規約文書をオンデマンドでダウンロードできるサービスです。",
    description:
      "SOC・PCI DSS・ISO などの第三者監査レポートや、AWS との BAA（Business Associate Agreement）などの規約文書を提供します。コンプライアンス審査での証跡提出に使います。",
    examTip:
      "「AWS の SOC レポートを取得したい」「HIPAA の BAA を締結したい」という要件で選びます。AWS の責任範囲のコンプライアンス証跡が必要なときに Artifact を使います。",
    related: ["Security Hub", "AWS Config", "Control Tower", "Trusted Advisor"],
  },

  // ── 移行・転送（追加）────────────────────────────────────────────────
  {
    id: "datasync",
    docsUrl: "https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html",
    name: "AWS DataSync",
    category: "移行・転送",
    shortDefinition: "オンプレミスと AWS ストレージ間のデータ転送を高速・自動化するサービスです。",
    description:
      "NFS・SMB・HDFS などのオンプレミスファイルシステムから S3・EFS・FSx へのデータ転送を最大 10 倍高速化します。スケジュール転送・増分転送・整合性チェックもサポートします。",
    examTip:
      "「オンプレから S3/EFS へのファイル転送を自動化したい」という要件で選びます。Storage Gateway（継続的ハイブリッドアクセス）との違いは、DataSync は一時的な移行・同期に適している点です。",
    related: ["S3", "EFS", "FSx", "Storage Gateway", "Snowball Edge"],
  },
  {
    id: "transfer-family",
    docsUrl: "https://docs.aws.amazon.com/transfer/latest/userguide/what-is-aws-transfer-for-sftp.html",
    name: "AWS Transfer Family",
    category: "移行・転送",
    shortDefinition: "SFTP・FTPS・FTP で S3 や EFS にファイルを転送できるマネージドサービスです。",
    description:
      "既存の SFTP/FTP クライアントやワークフローをそのまま使って S3・EFS にファイルをアップロード・ダウンロードできます。サーバー管理不要で、IAM・Cognito・カスタム Lambda での認証に対応します。",
    examTip:
      "「既存の SFTP ワークフローを変更せずに S3 に移行したい」という要件で選びます。FTP/SFTP クライアントとの互換性を保ちながら AWS に移行する典型的なシナリオです。",
    related: ["S3", "EFS", "IAM", "Route 53"],
  },
  {
    id: "migration-hub",
    docsUrl: "https://docs.aws.amazon.com/migrationhub/latest/ug/whatishub.html",
    name: "AWS Migration Hub",
    category: "移行・転送",
    shortDefinition: "AWS への移行プロジェクト全体の進捗を一元追跡するダッシュボードです。",
    description:
      "Application Discovery Service・MGN・DMS などの移行ツールの進捗を一か所に集約して可視化します。移行対象のサーバー・アプリの状況・依存関係を追跡できます。",
    examTip:
      "「複数の移行ツールの進捗を一元管理したい」という要件で選びます。Migration Hub 自身は移行を実行せず、他ツールの進捗を追跡するハブの役割です。",
    related: ["Application Discovery Service", "MGN", "DMS", "DataSync"],
  },
  {
    id: "application-discovery-service",
    docsUrl: "https://docs.aws.amazon.com/application-discovery/latest/userguide/what-is-appdiscovery.html",
    name: "AWS Application Discovery Service",
    category: "移行・転送",
    shortDefinition: "オンプレミスのサーバー情報・依存関係を自動収集して移行計画を支援するサービスです。",
    description:
      "エージェント型（詳細な依存関係マップ）またはエージェントレス型（基本情報のみ）でオンプレミスのサーバーのスペック・ネットワーク依存関係・アプリ利用状況を収集します。Migration Hub と連携して移行計画を立てます。",
    examTip:
      "「移行前にオンプレのサーバー依存関係を把握したい」「移行計画の根拠データを収集したい」という要件で選びます。移行の第一歩として Discovery → Migration Hub で計画立案というフローを覚えましょう。",
    related: ["Migration Hub", "MGN", "DMS", "DataSync"],
  },
  {
    id: "mgn",
    docsUrl: "https://docs.aws.amazon.com/mgn/latest/ug/what-is-application-migration-service.html",
    name: "AWS MGN（Application Migration Service）",
    category: "移行・転送",
    shortDefinition: "物理・仮想・クラウドのサーバーを AWS EC2 にリフト＆シフト移行するサービスです。",
    description:
      "旧称 CloudEndure Migration。エージェントをインストールしてソースサーバーのブロックレベルレプリケーションを行い、カットオーバー時に最小ダウンタイムで EC2 に切り替えます。OS・アプリの変更なしに移行できます。",
    examTip:
      "「オンプレの仮想マシンを変更せずに EC2 に移行したい」「リフト＆シフト移行」というキーワードで選びます。データベースの移行は DMS、アプリサーバーの移行は MGN と使い分けましょう。",
    related: ["Migration Hub", "DMS", "EC2", "Application Discovery Service"],
  },
  {
    id: "sct",
    docsUrl: "https://docs.aws.amazon.com/SchemaConversionTool/latest/userguide/CHAP_Welcome.html",
    name: "AWS Schema Conversion Tool (SCT)",
    category: "移行・転送",
    shortDefinition: "異種データベース間のスキーマを自動変換してデータベース移行を支援するツールです。",
    description:
      "Oracle・SQL Server から Aurora MySQL・Aurora PostgreSQL・Redshift などへのスキーマ・ストアドプロシージャ・ビューを自動変換します。変換できない部分はレポートとして出力します。DMS とセットで使います。",
    examTip:
      "「Oracle から Aurora に移行する際のスキーマ変換」という要件で選びます。同種 DB 間（MySQL → MySQL）の移行では SCT は不要で DMS のみで対応できます。",
    related: ["DMS", "Aurora", "RDS", "Migration Hub"],
  },
  {
    id: "snowcone",
    docsUrl: "https://docs.aws.amazon.com/snowball/latest/snowcone-guide/snowcone-what-is-snowcone.html",
    name: "AWS Snowcone",
    category: "移行・転送",
    shortDefinition: "小型・軽量なエッジコンピューティング・データ転送デバイスです。",
    description:
      "Snowball Edge より小型（2.1 kg）で、8 TB（HDD）または 14 TB（SSD）のストレージを持ちます。インターネット接続がない場所でデータを収集し、AWS に物理発送するか DataSync でオンライン転送できます。",
    examTip:
      "「ネットワーク接続がない辺境地でデータを収集したい」「少量データを AWS に物理転送したい」という要件で選びます。大容量は Snowball Edge・Snowmobile との使い分けを整理しましょう。",
    related: ["Snowball Edge", "DataSync", "S3", "Edge Computing"],
  },

  // ── 分析（追加）──────────────────────────────────────────────────────
  {
    id: "glue",
    docsUrl: "https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html",
    name: "AWS Glue",
    category: "分析",
    shortDefinition: "サーバーレスの ETL（抽出・変換・ロード）サービスです。",
    description:
      "S3・RDS・DynamoDB などのデータソースからデータを抽出・変換し、S3・Redshift・RDS などに書き込みます。Glue Data Catalog はメタデータリポジトリとして Athena・EMR・Redshift Spectrum から参照できます。",
    examTip:
      "「S3 のデータを変換して Redshift にロードしたい」「データカタログでスキーマを一元管理したい」という要件で選びます。サーバーレス ETL = Glue、大規模 Hadoop/Spark = EMR と使い分けましょう。",
    related: ["Athena", "Redshift", "S3", "Lake Formation", "EMR"],
  },
  {
    id: "athena",
    docsUrl: "https://docs.aws.amazon.com/athena/latest/ug/what-is.html",
    name: "Amazon Athena",
    category: "分析",
    shortDefinition: "S3 のデータを SQL でアドホックにクエリできるサーバーレス分析サービスです。",
    description:
      "S3 上の CSV・JSON・Parquet・ORC などのファイルを、サーバー管理なしで標準 SQL でクエリできます。Glue Data Catalog と統合してテーブルのスキーマ情報を管理します。スキャンしたデータ量に応じた課金です。",
    examTip:
      "「S3 のログデータを SQL で分析したい」「サーバーレスでアドホッククエリしたい」という要件で選びます。継続的な高速クエリは Redshift、アドホック・不定期クエリは Athena が経済的です。",
    related: ["S3", "Glue", "QuickSight", "Lake Formation", "Redshift"],
  },
  {
    id: "quicksight",
    docsUrl: "https://docs.aws.amazon.com/quicksight/latest/user/welcome.html",
    name: "Amazon QuickSight",
    category: "分析",
    shortDefinition: "BI ツールとしてデータを可視化・ダッシュボード化するサーバーレスサービスです。",
    description:
      "S3・Athena・Redshift・RDS・Salesforce など多様なデータソースに接続してインタラクティブなダッシュボードを作成できます。SPICE（インメモリエンジン）で高速クエリが可能です。",
    examTip:
      "「データをグラフやダッシュボードで可視化したい」「BI レポートを作成したい」という要件で選びます。Athena はクエリ実行、QuickSight は可視化と役割を整理しましょう。",
    related: ["Athena", "Redshift", "S3", "Glue"],
  },
  {
    id: "opensearch",
    docsUrl: "https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html",
    name: "Amazon OpenSearch Service",
    category: "分析",
    shortDefinition: "全文検索・ログ分析・リアルタイムモニタリングに使うマネージド検索エンジンです。",
    description:
      "旧称 Amazon Elasticsearch Service。ログデータのリアルタイム検索・集計・可視化（OpenSearch Dashboards）に使います。Kinesis Data Firehose や CloudWatch Logs との統合でログ分析パイプラインを構築できます。",
    examTip:
      "「ログを全文検索したい」「ELK スタックをマネージドで使いたい」という要件で選びます。Athena は SQL でのバッチ分析、OpenSearch は全文検索・リアルタイム分析に向いています。",
    related: ["Kinesis Firehose", "CloudWatch Logs", "Athena", "QuickSight"],
  },
  {
    id: "emr",
    docsUrl: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-what-is-emr.html",
    name: "Amazon EMR",
    category: "分析",
    shortDefinition: "Hadoop・Spark・Hive などのビッグデータフレームワークを実行するマネージドクラスターサービスです。",
    description:
      "大規模なバッチデータ処理・機械学習・インタラクティブ分析を、EC2 スポットインスタンスなどを活用してコスト効率よく実行できます。EMR Serverless で EC2 管理不要の運用も可能です。",
    examTip:
      "「大規模な Spark ジョブを実行したい」「Hadoop エコシステムをマネージドで使いたい」という要件で選びます。Glue はサーバーレス ETL、EMR はより複雑・大規模な Spark/Hadoop ワークロードに向いています。",
    related: ["Glue", "S3", "Athena", "Redshift", "Kinesis Data Streams"],
  },
  {
    id: "data-pipeline",
    docsUrl: "https://docs.aws.amazon.com/datapipeline/latest/DeveloperGuide/what-is-datapipeline.html",
    name: "AWS Data Pipeline",
    category: "分析",
    shortDefinition: "異なる AWS サービス間でのデータ移動・変換をスケジュール実行するサービスです。",
    description:
      "S3・RDS・DynamoDB・Redshift 間のデータ移動と変換をワークフローとして定義し、定期的に自動実行できます。現在は Step Functions + Glue の組み合わせが推奨されることが多くなっています。",
    examTip:
      "SAA 試験では古いサービスとして出題されることがあります。「データ移動のスケジュール実行」なら Glue・Step Functions・Glue Workflows が現在の推奨です。",
    related: ["Glue", "Step Functions", "S3", "Redshift", "DynamoDB"],
  },
  {
    id: "lake-formation",
    docsUrl: "https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html",
    name: "AWS Lake Formation",
    category: "分析",
    shortDefinition: "S3 ベースのデータレイクの構築・セキュリティ・アクセス制御を一元管理するサービスです。",
    description:
      "Glue Data Catalog と統合し、テーブル・列・行レベルの細粒度アクセス制御をデータレイク全体に適用できます。データのインジェスト・クリーニング・カタログ化を自動化し、Athena・Redshift Spectrum・EMR からのアクセスを一元制御します。",
    examTip:
      "「データレイクのアクセス制御を一元管理したい」「テーブル・列レベルの権限管理をしたい」という要件で選びます。Glue はデータ変換、Lake Formation はアクセス制御・ガバナンスと役割が違います。",
    related: ["Glue", "Athena", "S3", "Redshift", "EMR"],
  },
  {
    id: "clean-rooms",
    docsUrl: "https://docs.aws.amazon.com/clean-rooms/latest/userguide/what-is.html",
    name: "AWS Clean Rooms",
    category: "分析",
    shortDefinition: "生データを共有せずに複数企業がデータを安全に共同分析できるサービスです。",
    description:
      "パートナー企業と生データを見せ合わずに、SQL クエリの結果のみを共有する「クリーンルーム」を構築できます。GDPR・プライバシー規制対応の共同マーケティング分析などに使います。",
    examTip:
      "「複数社のデータを生データ非共有で共同分析したい」という要件で選びます。SAA では新しめのサービスですが、プライバシー保護のデータコラボレーションというキーワードで覚えましょう。",
    related: ["Athena", "Glue", "Lake Formation", "S3"],
  },

  // ── コンテナ・開発（追加）────────────────────────────────────────────
  {
    id: "ecr",
    docsUrl: "https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html",
    name: "Amazon ECR",
    category: "コンテナ",
    shortDefinition: "Docker コンテナイメージを保存・管理するフルマネージドレジストリです。",
    description:
      "ECS・EKS・Lambda で使うコンテナイメージを安全に保存・バージョン管理できます。イメージスキャン（脆弱性検出）・ライフサイクルポリシー（古いイメージの自動削除）・クロスリージョンレプリケーションもサポートします。",
    examTip:
      "「コンテナイメージを AWS で管理したい」という要件で選びます。ECR = Docker Hub の AWS 版と捉えると分かりやすいです。ECS・EKS のデプロイと必ずセットで出てきます。",
    related: ["ECS", "EKS", "Fargate", "CodePipeline", "CodeBuild"],
  },
  {
    id: "app-mesh",
    docsUrl: "https://docs.aws.amazon.com/app-mesh/latest/userguide/what-is-app-mesh.html",
    name: "AWS App Mesh",
    category: "コンテナ",
    shortDefinition: "マイクロサービス間の通信を可視化・制御するサービスメッシュです。",
    description:
      "Envoy プロキシを各サービスにサイドカーとして注入し、サービス間トラフィックのルーティング・リトライ・タイムアウト・サーキットブレーカーを一元管理します。ECS・EKS・EC2 で動作します。",
    examTip:
      "「マイクロサービス間の通信制御・可視化をしたい」「サービスメッシュを構築したい」という要件で選びます。App Mesh はサービス間通信の制御、Cloud Map はサービスディスカバリと役割が違います。",
    related: ["ECS", "EKS", "Cloud Map", "X-Ray"],
  },
  {
    id: "cloud-map",
    docsUrl: "https://docs.aws.amazon.com/cloud-map/latest/dg/what-is-cloud-map.html",
    name: "AWS Cloud Map",
    category: "コンテナ",
    shortDefinition: "マイクロサービスの場所（IP・エンドポイント）を登録・検索するサービスディスカバリです。",
    description:
      "ECS タスク・EKS Pod・EC2 インスタンスのエンドポイントを自動的に登録し、アプリが DNS または API でサービスを動的に検索できるようにします。ヘルスチェックと連携して不健全なインスタンスを自動除外します。",
    examTip:
      "「マイクロサービスのエンドポイントを動的に検索したい」「サービスディスカバリを実装したい」という要件で選びます。Route 53 がグローバルな DNS 解決、Cloud Map はアプリ内サービス検索と使い分けましょう。",
    related: ["ECS", "EKS", "App Mesh", "Route 53"],
  },
  {
    id: "codepipeline",
    docsUrl: "https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html",
    name: "AWS CodePipeline",
    category: "開発者ツール",
    shortDefinition: "ソースからデプロイまでの CI/CD パイプラインを自動化するサービスです。",
    description:
      "GitHub・CodeCommit のソース変更をトリガーに、CodeBuild でビルド・テストし、CodeDeploy・ECS・Elastic Beanstalk・Lambda にデプロイするまでのパイプラインをノーコードで定義できます。",
    examTip:
      "「CI/CD パイプラインを構築したい」という要件で選びます。CodePipeline = パイプライン全体のオーケストレーション、CodeBuild = ビルド実行、CodeDeploy = デプロイ実行と役割を整理しましょう。",
    related: ["CodeBuild", "CodeDeploy", "ECR", "Elastic Beanstalk", "ECS"],
  },
  {
    id: "codebuild",
    docsUrl: "https://docs.aws.amazon.com/codebuild/latest/userguide/welcome.html",
    name: "AWS CodeBuild",
    category: "開発者ツール",
    shortDefinition: "コードのビルド・テストをサーバーレスで実行するマネージドビルドサービスです。",
    description:
      "buildspec.yml でビルドコマンドを定義し、Docker イメージのビルド・ユニットテスト・静的解析などを実行します。使用した分だけ課金でき、ビルドサーバーの管理が不要です。ECR への Docker イメージ push も担います。",
    examTip:
      "「CI/CD のビルドフェーズをサーバーレスで実行したい」という要件で選びます。Jenkins をマネージドに置き換える選択肢として出てきます。",
    related: ["CodePipeline", "CodeDeploy", "ECR", "S3"],
  },
  {
    id: "codedeploy",
    docsUrl: "https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html",
    name: "AWS CodeDeploy",
    category: "開発者ツール",
    shortDefinition: "EC2・Lambda・ECS へのデプロイを自動化・安全にロールアウトするサービスです。",
    description:
      "Blue/Green デプロイ・カナリアデプロイ・ローリングアップデートをサポートし、デプロイ失敗時の自動ロールバックも行います。EC2・オンプレミス・Lambda・ECS に対応しています。",
    examTip:
      "「Blue/Green デプロイを自動化したい」「デプロイ失敗時に自動ロールバックしたい」という要件で選びます。ECS のデプロイ戦略（Blue/Green・ローリング）はどちらも CodeDeploy で管理できます。",
    related: ["CodePipeline", "CodeBuild", "ECS", "Lambda", "EC2"],
  },
  {
    id: "xray",
    docsUrl: "https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html",
    name: "AWS X-Ray",
    category: "開発者ツール",
    shortDefinition: "マイクロサービスのリクエストを追跡・可視化する分散トレーシングサービスです。",
    description:
      "Lambda・EC2・ECS・API Gateway などを通過するリクエストの経路・レイテンシー・エラーをサービスマップとして可視化します。ボトルネックや障害箇所を特定するのに使います。",
    examTip:
      "「マイクロサービスのレイテンシーを分析したい」「どのサービスでエラーが発生しているか特定したい」という要件で選びます。CloudWatch はメトリクス監視、X-Ray はリクエストのエンドツーエンド追跡です。",
    related: ["CloudWatch", "App Mesh", "Lambda", "API Gateway", "ECS"],
  },

  // ── ガバナンス・運用（追加）──────────────────────────────────────────
  {
    id: "organizations",
    docsUrl: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html",
    name: "AWS Organizations",
    category: "ガバナンス",
    shortDefinition: "複数の AWS アカウントを階層的に管理し、ポリシーを一元適用するサービスです。",
    description:
      "組織単位（OU）にアカウントをグループ化し、SCP（Service Control Policy）でアカウントの最大権限を制限できます。一括請求（Consolidated Billing）でボリュームディスカウントを受けながら、アカウント単位のコスト管理もできます。",
    examTip:
      "「複数アカウントに特定の操作を禁止したい」「全アカウントの請求を一本化したい」という要件で選びます。SCP は IAM を上書きして最大権限を制限する点を覚えましょう。",
    related: ["Control Tower", "IAM Identity Center", "Security Hub", "Firewall Manager"],
  },
  {
    id: "service-catalog",
    docsUrl: "https://docs.aws.amazon.com/servicecatalog/latest/adminguide/introduction.html",
    name: "AWS Service Catalog",
    category: "ガバナンス",
    shortDefinition: "承認済みの AWS リソース構成（製品）をセルフサービスでプロビジョニングできる仕組みです。",
    description:
      "管理者が CloudFormation テンプレートを「製品」として登録し、承認されたリソースのみをユーザーがデプロイできるようにします。標準化・コンプライアンス遵守・セルフサービスの両立を実現します。",
    examTip:
      "「開発者が承認済みの構成のみをデプロイできるようにしたい」「セルフサービスでリソース作成を制御したい」という要件で選びます。CloudFormation がインフラ定義、Service Catalog がその配布・制御の仕組みです。",
    related: ["CloudFormation", "Organizations", "Control Tower", "IAM"],
  },
  {
    id: "opsworks",
    docsUrl: "https://docs.aws.amazon.com/opsworks/latest/userguide/welcome.html",
    name: "AWS OpsWorks",
    category: "ガバナンス",
    shortDefinition: "Chef・Puppet を使ったインフラ構成管理をマネージドで提供するサービスです。",
    description:
      "OpsWorks for Chef Automate・OpsWorks for Puppet Enterprise の 2 種類があり、既存の Chef/Puppet レシピをそのまま AWS で使えます。EC2・オンプレミスのサーバー構成を一元管理します。",
    examTip:
      "「既存の Chef/Puppet スクリプトをそのまま AWS で使いたい」という要件で選びます。新規構築なら Systems Manager・CloudFormation・AWS CDK が推奨されることが多く、Chef/Puppet 移行シナリオで出ます。",
    related: ["Systems Manager", "CloudFormation", "EC2", "Elastic Beanstalk"],
  },
  {
    id: "patch-manager",
    docsUrl: "https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-patch.html",
    name: "AWS Systems Manager Patch Manager",
    category: "ガバナンス",
    shortDefinition: "EC2 やオンプレサーバーへの OS パッチ適用を自動化する Systems Manager の機能です。",
    description:
      "パッチベースライン（適用するパッチの基準）とメンテナンスウィンドウ（実行スケジュール）を設定して、SSH 不要でパッチを自動適用できます。パッチコンプライアンスレポートで各インスタンスの状態を一元確認できます。",
    examTip:
      "「大量 EC2 のパッチ適用を自動化・一元管理したい」という要件で選びます。Patch Manager は Systems Manager の一機能であり、SSM Agent がインストールされたインスタンスに適用できます。",
    related: ["Systems Manager", "EC2", "Organizations", "CloudWatch"],
  },

  // ── 追加：機械学習・AI ──────────────────────────────────────────────
  {
    id: "sagemaker",
    docsUrl: "https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html",
    name: "Amazon SageMaker",
    category: "機械学習",
    shortDefinition: "機械学習モデルの構築・学習・デプロイをフルマネージドで提供するサービスです。",
    description:
      "データ前処理・モデル学習・ハイパーパラメータ調整・デプロイ・モニタリングまでの ML ライフサイクル全体を統合環境で管理できます。SageMaker Studio・Autopilot・Pipelines などの機能群があります。",
    examTip:
      "「カスタム ML モデルを構築・学習・デプロイしたい」という要件で選びます。Rekognition（画像認識 API）や Comprehend（テキスト分析 API）は事前学習済みモデルの利用で、カスタムモデルが必要なら SageMaker です。",
    related: ["S3", "ECR", "Lambda", "Rekognition", "Comprehend"],
  },
  {
    id: "rekognition",
    docsUrl: "https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html",
    name: "Amazon Rekognition",
    category: "機械学習",
    shortDefinition: "画像・動画の物体検出・顔認識・テキスト抽出を API で提供するサービスです。",
    description:
      "事前学習済みモデルを API として提供しており、画像内の物体・顔・テキスト・不適切コンテンツを検出できます。顔比較・有名人認識・PPE（防護具）検出などにも対応します。",
    examTip:
      "「画像・動画から顔・物体を検出したい」という要件で選びます。カスタムモデルが不要な画像認識は Rekognition、独自データで学習したモデルが必要なら SageMaker です。",
    related: ["SageMaker", "Lambda", "S3", "Kinesis Data Streams"],
  },
  {
    id: "comprehend",
    docsUrl: "https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html",
    name: "Amazon Comprehend",
    category: "機械学習",
    shortDefinition: "テキストから感情・エンティティ・言語・キーフレーズを抽出する NLP サービスです。",
    description:
      "事前学習済みの NLP モデルで、テキストのセンチメント分析・固有表現抽出（人名・地名・組織名）・言語検出・キーフレーズ抽出を API で提供します。Comprehend Medical は医療テキスト専用です。",
    examTip:
      "「レビューのネガポジ分析をしたい」「テキストから固有表現を抽出したい」という要件で選びます。テキスト分析 = Comprehend、画像分析 = Rekognition、音声文字起こし = Transcribe と整理しましょう。",
    related: ["SageMaker", "Lambda", "S3", "Translate"],
  },
  {
    id: "translate",
    docsUrl: "https://docs.aws.amazon.com/translate/latest/dg/what-is.html",
    name: "Amazon Translate",
    category: "機械学習",
    shortDefinition: "テキストを 75 以上の言語間でリアルタイム翻訳する NMT ベースのサービスです。",
    description:
      "ニューラル機械翻訳（NMT）でテキスト・HTML・XML の翻訳を API で提供します。カスタム用語集（専門用語を特定の訳語に固定）や Active Custom Translation（独自コーパスで翻訳精度向上）もサポートします。",
    examTip:
      "「多言語対応のアプリを構築したい」「テキストを自動翻訳したい」という要件で選びます。Translate は翻訳、Comprehend は感情・言語検出と役割が異なります。",
    related: ["Comprehend", "Polly", "Transcribe", "Lambda"],
  },
  {
    id: "textract",
    docsUrl: "https://docs.aws.amazon.com/textract/latest/dg/what-is.html",
    name: "Amazon Textract",
    category: "機械学習",
    shortDefinition: "スキャン画像や PDF からテキスト・フォーム・テーブルを自動抽出するサービスです。",
    description:
      "OCR を超えて、フォームのキー・バリューペアやテーブルの構造を理解して抽出します。健康保険証・契約書・請求書などのドキュメント処理の自動化に使います。",
    examTip:
      "「PDF や画像からフォームのデータを自動抽出したい」「スキャンした文書をデジタル化したい」という要件で選びます。Rekognition が画像の視覚的検出、Textract がドキュメントのテキスト構造抽出です。",
    related: ["Rekognition", "Comprehend", "S3", "Lambda"],
  },

  // ── 追加：IoT・エッジ ──────────────────────────────────────────────
  {
    id: "iot-core",
    docsUrl: "https://docs.aws.amazon.com/iot/latest/developerguide/what-is-aws-iot.html",
    name: "AWS IoT Core",
    category: "IoT",
    shortDefinition: "IoT デバイスと AWS クラウドを安全に接続・管理するマネージドサービスです。",
    description:
      "MQTT・HTTP・WebSocket でデバイスからデータを受信し、ルールエンジンで S3・DynamoDB・Lambda・Kinesis などに転送できます。数十億台のデバイス接続に対応するスケーラブルな設計です。",
    examTip:
      "「IoT デバイスからのデータを AWS に取り込みたい」という要件で選びます。デバイス側の処理は IoT Greengrass、クラウド側の接続・ルーティングは IoT Core と使い分けましょう。",
    related: ["Kinesis Data Streams", "Lambda", "DynamoDB", "IoT Greengrass"],
  },
  {
    id: "iot-greengrass",
    docsUrl: "https://docs.aws.amazon.com/greengrass/v2/developerguide/what-is-iot-greengrass.html",
    name: "AWS IoT Greengrass",
    category: "IoT",
    shortDefinition: "エッジデバイス上で Lambda 関数・ML 推論・ローカルデータ処理を実行するランタイムです。",
    description:
      "インターネット接続が不安定な環境でもデバイス上でローカル処理を行い、クラウドと同期します。Lambda 関数・Docker コンテナ・SageMaker モデルをエッジで実行でき、クラウドへのデータ転送量を削減できます。",
    examTip:
      "「ネットワーク接続が不安定な環境でもデバイス上で処理を実行したい」「エッジで ML 推論をしたい」という要件で選びます。IoT Core がクラウド接続、Greengrass がエッジ処理です。",
    related: ["IoT Core", "Lambda", "SageMaker", "Kinesis Data Streams"],
  },
  {
    id: "amazon-mq",
    docsUrl: "https://docs.aws.amazon.com/amazon-mq/latest/developer-guide/welcome.html",
    name: "Amazon MQ",
    category: "アプリケーション統合",
    shortDefinition: "Apache ActiveMQ・RabbitMQ をマネージドで提供するメッセージブローカーサービスです。",
    description:
      "既存の AMQP・MQTT・STOMP・OpenWire などのプロトコルを使うアプリケーションを変更なしに AWS に移行できます。SQS と異なりブローカーサーバーが存在するためマルチプロトコルに対応しています。",
    examTip:
      "「既存の ActiveMQ/RabbitMQ システムをそのまま AWS に移行したい」という要件で選びます。新規開発なら SQS・SNS が推奨で、Amazon MQ は既存メッセージングシステムの移行シナリオで出ます。",
    related: ["SQS", "SNS", "EventBridge", "Step Functions"],
  },
  {
    id: "lightsail",
    docsUrl: "https://docs.aws.amazon.com/lightsail/latest/userguide/what-is-amazon-lightsail.html",
    name: "Amazon Lightsail",
    category: "コンピューティング",
    shortDefinition: "仮想サーバー・ストレージ・データベースをシンプルな固定料金で使えるサービスです。",
    description:
      "EC2 の複雑さを抽象化し、WordPress・Node.js・LAMP スタックなどの定番構成をワンクリックでセットアップできます。固定の月額料金で VPS・ストレージ・データ転送が含まれます。",
    examTip:
      "「シンプルな VPS を低コストで使いたい」「小規模 Web サイトを素早く立ち上げたい」という要件で選びます。EC2 より設定の自由度は低いが、シンプル・低コストを優先する場合に選びます。",
    related: ["EC2", "Elastic Beanstalk", "RDS"],
  },
  {
    id: "outposts",
    docsUrl: "https://docs.aws.amazon.com/outposts/latest/userguide/what-is-outposts.html",
    name: "AWS Outposts",
    category: "ハイブリッド",
    shortDefinition: "AWS のインフラをオンプレミスのデータセンターに設置して使えるハイブリッドサービスです。",
    description:
      "EC2・EBS・RDS・ECS・EKS などの AWS サービスをオンプレミス環境で実行できます。超低レイテンシーが必要なワークロードや、データを国外に出せない規制要件に対応します。",
    examTip:
      "「AWS サービスをオンプレミスのラック内で実行したい」「超低レイテンシーまたはデータ主権の要件でクラウド移行できない」という要件で選びます。",
    related: ["Direct Connect", "Storage Gateway", "ECS", "RDS"],
  },
  {
    id: "global-accelerator-adv",
    docsUrl: "https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html",
    name: "AWS Global Accelerator（詳細）",
    category: "ネットワーク",
    shortDefinition: "静的エニーキャスト IP でユーザーを最適な AWS エンドポイントに誘導するサービスです。",
    description:
      "2 つの静的エニーキャスト IP アドレスを提供し、AWS のグローバルネットワーク経由でユーザーを最も近いエッジロケーションに誘導します。フェイルオーバーは秒単位で、DNS キャッシュの影響を受けません。",
    examTip:
      "CloudFront との違いを問われます。Global Accelerator は TCP/UDP（非 HTTP にも対応）で固定 IP、CloudFront は HTTP/HTTPS でコンテンツキャッシュが主目的です。",
    related: ["CloudFront", "Route 53", "ALB", "NLB"],
  },
  {
    id: "transcribe",
    docsUrl: "https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html",
    name: "Amazon Transcribe",
    category: "機械学習",
    shortDefinition: "音声ファイルをテキストに自動変換する音声認識サービスです。",
    description:
      "S3 の音声ファイル（MP3・WAV・FLAC など）や リアルタイムの音声ストリームをテキストに変換します。話者識別・カスタム語彙（専門用語の認識精度向上）・有害コンテンツフィルタリングにも対応します。",
    examTip:
      "「コールセンターの音声をテキスト化したい」「会議録を自動生成したい」という要件で選びます。Transcribe = 音声→テキスト、Polly = テキスト→音声と対になって覚えましょう。",
    related: ["Polly", "Comprehend", "S3", "Lambda"],
  },
  {
    id: "polly",
    docsUrl: "https://docs.aws.amazon.com/polly/latest/dg/what-is.html",
    name: "Amazon Polly",
    category: "機械学習",
    shortDefinition: "テキストを自然な音声に変換する TTS（テキスト読み上げ）サービスです。",
    description:
      "60 以上の言語・100 以上の音声スタイルでテキストを MP3・OGG などの音声ファイルに変換します。SSML タグで話し方・速度・感情を細かく制御できます。リアルタイム変換にも対応します。",
    examTip:
      "「アプリに音声読み上げ機能を追加したい」「多言語の音声ナビを実装したい」という要件で選びます。Transcribe（音声→テキスト）と Polly（テキスト→音声）はセットで覚えましょう。",
    related: ["Transcribe", "Comprehend", "Lambda", "S3"],
  },
  {
    id: "kinesis-data-analytics",
    docsUrl: "https://docs.aws.amazon.com/kinesisanalytics/latest/java/what-is.html",
    name: "Amazon Kinesis Data Analytics",
    category: "分析",
    shortDefinition: "Kinesis ストリームのデータを Apache Flink で リアルタイム処理するサービスです。",
    description:
      "Kinesis Data Streams・Kinesis Data Firehose のストリームを Apache Flink アプリケーションでリアルタイム集計・異常検知・ウィンドウ処理できます。SQL ベースの処理（旧 KDA for SQL）は非推奨となり Flink が推奨です。",
    examTip:
      "「Kinesis のリアルタイムストリームをミリ秒単位で集計・分析したい」という要件で選びます。Firehose（60 秒以上のバッファで S3 配信）との違いは、KDA はリアルタイム変換・集計ができる点です。",
    related: ["Kinesis Data Streams", "Kinesis Firehose", "EMR", "Lambda"],
  },

  // ── データベース（追加分） ────────────────────────────────────────────────

  {
    id: "aurora-global-database",
    docsUrl: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html",
    name: "Aurora Global Database",
    category: "データベース",
    shortDefinition: "複数リージョンにまたがる Aurora のグローバル構成で、低レイテンシの読み取りとリージョン障害時のフェイルオーバーを実現します。",
    description:
      "プライマリリージョンで書き込みを行い、最大 5 つのセカンダリリージョンへ 1 秒未満のレイテンシでレプリケーションします。リージョン障害時はセカンダリを昇格させ RTO 1 分未満でフェイルオーバーできます。",
    examTip:
      "「クロスリージョンの DR」「グローバルな低レイテンシ読み取り」「RPO 秒単位・RTO 1 分未満」という要件で選びます。Aurora Multi-AZ（同一リージョン内 AZ 冗長）との違いを区別することが重要です。",
    related: ["Aurora", "RDS", "Multi-AZ", "Read Replica"],
  },
  {
    id: "dynamodb-streams",
    docsUrl: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html",
    name: "DynamoDB Streams",
    category: "データベース",
    shortDefinition: "DynamoDB テーブルの変更（追加・更新・削除）を時系列に記録するストリームです。",
    description:
      "テーブルへの書き込みイベントを最大 24 時間保持し、Lambda などのコンシューマーがポーリングして変更を処理できます。クロスリージョンレプリケーションやイベント駆動処理の起点として使われます。",
    examTip:
      "「DynamoDB の変更をリアルタイムに別システムへ連携したい」「DynamoDB テーブルのレプリケーション」という要件で選びます。Lambda トリガーとの組み合わせが頻出です。",
    related: ["DynamoDB", "Lambda", "Kinesis Data Streams", "DAX"],
  },
  {
    id: "redshift-spectrum",
    docsUrl: "https://docs.aws.amazon.com/redshift/latest/dg/c-getting-started-using-spectrum.html",
    name: "Redshift Spectrum",
    category: "データベース",
    shortDefinition: "Redshift クラスターから S3 上のデータを直接クエリできる機能です。",
    description:
      "S3 に保存された Parquet・ORC・CSV などのデータをクラスターにロードせずに SQL でクエリできます。Redshift クラスターとデータレイク（S3）を組み合わせた分析基盤を低コストで構築できます。",
    examTip:
      "「S3 のデータを Redshift で分析したいがクラスターにロードしたくない」「データレイクと DWH の統合」という要件で選びます。Athena との違いは、既存の Redshift テーブルと S3 データを JOIN できる点です。",
    related: ["Redshift", "S3", "Athena", "Glue"],
  },

  // ── コンピュート（追加分） ────────────────────────────────────────────────

  {
    id: "placement-group",
    docsUrl: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html",
    name: "EC2 Placement Group",
    category: "コンピュート",
    shortDefinition: "EC2 インスタンスの物理的な配置戦略を制御する設定です。",
    description:
      "Cluster（同一ラック集約・超低レイテンシ）・Spread（異なるハードウェアに分散・障害分離）・Partition（ラック単位のグループ分離・Hadoop/Kafka 向け）の 3 種類があります。",
    examTip:
      "「HPC・低レイテンシのインスタンス間通信」→ Cluster。「ハードウェア障害の影響を限定したい」→ Spread。「Hadoop・Kafka など大規模分散処理」→ Partition。それぞれの違いが頻出です。",
    related: ["EC2", "Auto Scaling Group", "EFA"],
  },
  {
    id: "lambda-layer",
    docsUrl: "https://docs.aws.amazon.com/lambda/latest/dg/chapter-layers.html",
    name: "AWS Lambda Layer",
    category: "コンピュート",
    shortDefinition: "Lambda 関数間で共有するライブラリや依存パッケージをまとめたアーカイブです。",
    description:
      "共通ライブラリ・カスタムランタイム・設定ファイルを Layer としてまとめ、複数の Lambda 関数で再利用できます。関数のデプロイパッケージサイズを小さく保ちながら依存関係を一元管理できます。",
    examTip:
      "「複数の Lambda で同じライブラリを共有したい」「デプロイパッケージを軽量にしたい」という要件で選びます。Lambda 関数あたり最大 5 Layer まで追加できます。",
    related: ["Lambda", "Lambda@Edge", "Serverless", "API Gateway"],
  },
  {
    id: "lambda-edge",
    docsUrl: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-at-the-edge.html",
    name: "Lambda@Edge",
    category: "コンピュート",
    shortDefinition: "CloudFront のエッジロケーションで Lambda 関数を実行するサービスです。",
    description:
      "ユーザーに最も近いエッジで HTTP リクエスト・レスポンスを加工できます。ビューワーリクエスト・オリジンリクエスト・オリジンレスポンス・ビューワーレスポンスの 4 つのイベントで実行できます。",
    examTip:
      "「エッジで認証・認可を行いたい」「URL の書き換え・リダイレクト」「A/B テスト」「ユーザーの地域に応じたコンテンツ切り替え」という要件で選びます。通常の Lambda より実行環境の制約が厳しい点も注意です。",
    related: ["Lambda", "CloudFront", "API Gateway", "Lambda Layer"],
  },
  {
    id: "wavelength",
    docsUrl: "https://docs.aws.amazon.com/wavelength/latest/developerguide/what-is-wavelength.html",
    name: "AWS Wavelength",
    category: "コンピュート",
    shortDefinition: "5G 通信キャリアのネットワーク内に AWS コンピュートとストレージを配置するサービスです。",
    description:
      "通信キャリアのデータセンター内に AWS インフラを埋め込むことで、5G デバイスからのトラフィックがインターネットを経由せずにアプリケーションへ到達し、1 桁ミリ秒のレイテンシを実現します。",
    examTip:
      "「5G デバイス向けの超低レイテンシアプリ」「自動運転・AR/VR・ゲームストリーミング」というキーワードが出たら Wavelength を選びます。Outposts（オンプレミス）との違いを区別しましょう。",
    related: ["Outposts", "EC2", "VPC", "Global Accelerator"],
  },
  {
    id: "vmware-cloud",
    docsUrl: "https://docs.aws.amazon.com/vmware/",
    name: "VMware Cloud on AWS",
    category: "コンピュート",
    shortDefinition: "VMware の仮想化環境をそのまま AWS 上で稼働させるハイブリッドクラウドサービスです。",
    description:
      "vSphere・vSAN・NSX を使った VMware 環境を AWS のベアメタルインフラ上で動かします。オンプレミスの VMware ワークロードをリファクタリングなしに AWS へ移行・拡張できます。",
    examTip:
      "「VMware 環境をそのまま AWS に移行したい」「オンプレの VMware と AWS を統合したい」という要件で選びます。AWS Outposts との違いは、VMware の管理ツール（vCenter 等）をそのまま使える点です。",
    related: ["Outposts", "EC2", "Migration Hub", "Direct Connect"],
  },
  {
    id: "app-runner",
    docsUrl: "https://docs.aws.amazon.com/apprunner/latest/dg/what-is-apprunner.html",
    name: "AWS App Runner",
    category: "コンピュート",
    shortDefinition: "コンテナやソースコードから Web アプリを自動でデプロイ・スケールするフルマネージドサービスです。",
    description:
      "ECR のコンテナイメージや GitHub のソースコードを指定するだけで、ロードバランサー・Auto Scaling・TLS 証明書の設定が自動化されます。インフラ管理が不要で Web アプリの迅速な公開に適しています。",
    examTip:
      "「インフラ管理なしでコンテナアプリを素早く公開したい」という要件で選びます。Fargate（ECS/EKS）との違いは、App Runner はさらに抽象化されており VPC やクラスター設定が不要な点です。",
    related: ["Fargate", "ECS", "Elastic Beanstalk", "Lambda"],
  },
];

export const studyTermCategories = Array.from(
  new Set(studyTerms.map((term) => term.category)),
);
