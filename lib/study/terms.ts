export type StudyTerm = {
  id: string;
  name: string;
  category: string;
  shortDefinition: string;
  description: string;
  examTip: string;
  related: string[];
  diagram?: string;
};

import { termDiagrams } from "@/lib/study/term-diagrams";

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
    diagram: termDiagrams["load-balancer"],
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
    diagram: termDiagrams["cdn"],
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
    diagram: termDiagrams["vpc"],
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
    diagram: termDiagrams["multi-az"],
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
    diagram: termDiagrams["event-driven"],
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

  // ── コンピュート ──────────────────────────────────────────────────────────

  {
    id: "ec2",
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
    name: "Compute Optimizer",
    category: "コスト最適化",
    shortDefinition: "機械学習で EC2・Lambda・EBS などの最適なリソースサイズを推奨するサービスです。",
    description:
      "過去の CloudWatch メトリクスを分析し、過剰プロビジョニングや不足しているリソースを検出して最適なサイズを提案します。EC2・ECS on Fargate・Lambda・EBS・Auto Scaling Group が対象です。",
    examTip:
      "「EC2 のサイズが適切か確認したい」「リソースの過剰プロビジョニングを削減したい」という要件で選びます。Trusted Advisor も似たチェックをしますが、Compute Optimizer は ML ベースでより詳細な推奨を出します。",
    related: ["EC2", "Lambda", "EBS", "Trusted Advisor", "Cost Explorer"],
  },
];

export const studyTermCategories = Array.from(
  new Set(studyTerms.map((term) => term.category)),
);
