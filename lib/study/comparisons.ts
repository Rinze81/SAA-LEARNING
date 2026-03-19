export type ComparisonPoint = {
  label: string;
  value: string;
};

export type ComparisonService = {
  name: string;
  summary: string;
  points: ComparisonPoint[];
};

export type ComparisonItem = {
  id: string;
  title: string;
  category: string;
  summary: string;
  services: ComparisonService[];
  examTip: string;
  conclusion: string;
};

export const comparisonItems: ComparisonItem[] = [
  {
    id: "ec2-vs-lambda",
    title: "EC2 vs Lambda",
    category: "コンピュート",
    summary:
      "常時稼働させるサーバーか、イベントに応じてコードを実行するかで使い分けます。",
    services: [
      {
        name: "EC2",
        summary: "OS やミドルウェアまで含めて柔軟に構成したいときに向いています。",
        points: [
          { label: "実行形態", value: "仮想サーバーを自分で起動して管理する" },
          { label: "向いている用途", value: "長時間処理、細かいチューニング、既存アプリ移行" },
          { label: "運用負荷", value: "パッチ適用、スケーリング設計、監視を自分で考える" },
          { label: "課金の考え方", value: "起動時間やインスタンスサイズが中心" },
        ],
      },
      {
        name: "Lambda",
        summary: "イベント駆動で素早く処理したいときに向いています。",
        points: [
          { label: "実行形態", value: "イベントを受けて関数を実行する" },
          { label: "向いている用途", value: "API バックエンド、ファイル処理、自動化処理" },
          { label: "運用負荷", value: "サーバー管理は不要だが実行時間や制約を意識する" },
          { label: "課金の考え方", value: "実行回数と実行時間が中心" },
        ],
      },
    ],
    examTip:
      "サーバー管理が必要か、イベントに応じて短時間だけ処理したいかを見分けると選びやすくなります。",
    conclusion:
      "柔軟なサーバー運用が必要なら EC2、サーバーレスでイベント処理したいなら Lambda を選びます。",
  },
  {
    id: "rds-vs-dynamodb",
    title: "RDS vs DynamoDB",
    category: "データベース",
    summary:
      "リレーショナルデータベースが必要か、NoSQL で大規模かつ低レイテンシーを重視するかで判断します。",
    services: [
      {
        name: "RDS",
        summary: "SQL や JOIN、トランザクションを前提にしたアプリに向いています。",
        points: [
          { label: "データモデル", value: "リレーショナル" },
          { label: "向いている用途", value: "業務システム、既存 DB 移行、複雑な問い合わせ" },
          { label: "拡張の考え方", value: "主にスケールアップ、リードレプリカも活用できる" },
          { label: "操作方法", value: "SQL ベースで扱う" },
        ],
      },
      {
        name: "DynamoDB",
        summary: "ミリ秒単位の高速応答と大規模アクセスをさばきたいときに向いています。",
        points: [
          { label: "データモデル", value: "キーバリュー / ドキュメント型の NoSQL" },
          { label: "向いている用途", value: "高トラフィック API、セッション管理、ゲーム、IoT" },
          { label: "拡張の考え方", value: "フルマネージドで自動的に大規模へ拡張しやすい" },
          { label: "操作方法", value: "主キー設計を中心にアクセスパターンを先に考える" },
        ],
      },
    ],
    examTip:
      "SQL、複雑な結合、厳密なリレーショナル設計が必要なら RDS、超低レイテンシーと大規模アクセスなら DynamoDB が基本です。",
    conclusion:
      "関係性の強い構造化データなら RDS、アクセスパターンが明確で高速性を重視するなら DynamoDB を選びます。",
  },
  {
    id: "s3-vs-ebs-vs-efs",
    title: "S3 vs EBS vs EFS",
    category: "ストレージ",
    summary:
      "オブジェクトストレージか、単一インスタンス向けのブロックストレージか、複数サーバーで共有するファイルストレージかを見分けます。",
    services: [
      {
        name: "S3",
        summary: "高耐久なオブジェクト保存に向いています。",
        points: [
          { label: "ストレージ形式", value: "オブジェクトストレージ" },
          { label: "向いている用途", value: "画像、ログ、バックアップ、静的 Web コンテンツ" },
          { label: "アクセス方法", value: "HTTP API や SDK で操作する" },
          { label: "共有性", value: "複数クライアントから広く利用しやすい" },
        ],
      },
      {
        name: "EBS",
        summary: "EC2 に接続して使う高性能なブロックストレージです。",
        points: [
          { label: "ストレージ形式", value: "ブロックストレージ" },
          { label: "向いている用途", value: "OS ディスク、データベース、単一サーバーの永続領域" },
          { label: "アクセス方法", value: "EC2 にアタッチしてローカルディスクのように使う" },
          { label: "共有性", value: "基本は 1 台の EC2 を中心に利用する" },
        ],
      },
      {
        name: "EFS",
        summary: "複数の EC2 から同時に共有したいファイル保存に向いています。",
        points: [
          { label: "ストレージ形式", value: "ファイルストレージ" },
          { label: "向いている用途", value: "共有コンテンツ、複数台アプリの共通ファイル領域" },
          { label: "アクセス方法", value: "NFS ベースでマウントして使う" },
          { label: "共有性", value: "複数インスタンスから同時利用しやすい" },
        ],
      },
    ],
    examTip:
      "ファイルを URL ベースで保存するなら S3、EC2 のディスクなら EBS、複数 EC2 で同じファイルを共有するなら EFS で整理すると迷いにくくなります。",
    conclusion:
      "オブジェクト保存は S3、単一サーバー向け永続ディスクは EBS、共有ファイルシステムは EFS です。",
  },
  {
    id: "sqs-vs-sns",
    title: "SQS vs SNS",
    category: "アプリ統合",
    summary:
      "メッセージをためて順に処理したいのか、複数先へ同時に通知したいのかで使い分けます。",
    services: [
      {
        name: "SQS",
        summary: "メッセージキューとして非同期処理のつなぎ役になります。",
        points: [
          { label: "通信モデル", value: "キューにためてコンシューマーが取り出す" },
          { label: "向いている用途", value: "疎結合化、バースト吸収、バックグラウンド処理" },
          { label: "受信方法", value: "受信側がポーリングして取得する" },
          { label: "特徴", value: "処理の平準化や再試行設計と相性がよい" },
        ],
      },
      {
        name: "SNS",
        summary: "トピックを使って複数の購読先へ同時配信できます。",
        points: [
          { label: "通信モデル", value: "Publish / Subscribe" },
          { label: "向いている用途", value: "ファンアウト通知、イベント配信、アラート" },
          { label: "受信方法", value: "購読先へプッシュで届ける" },
          { label: "特徴", value: "Lambda、SQS、HTTP エンドポイントなどへ広げやすい" },
        ],
      },
    ],
    examTip:
      "メッセージをためて後から処理するなら SQS、1 つのイベントを複数先へ配るなら SNS と考えると整理しやすいです。",
    conclusion:
      "キューで順次処理したいなら SQS、同時通知やファンアウトが必要なら SNS を選びます。",
  },
  {
    id: "alb-vs-nlb",
    title: "ALB vs NLB",
    category: "ネットワーク",
    summary:
      "HTTP/HTTPS レベルで賢く振り分けたいのか、TCP/UDP を超低レイテンシーで扱いたいのかが判断の分かれ目です。",
    services: [
      {
        name: "ALB",
        summary: "L7 での柔軟なルーティングに向いています。",
        points: [
          { label: "対応レイヤー", value: "Application Layer (L7)" },
          { label: "向いている用途", value: "Web アプリ、パスベース / ホストベースルーティング" },
          { label: "特徴", value: "HTTP ヘッダーや URL に応じた振り分けができる" },
          { label: "関連機能", value: "Web アプリ向け機能やコンテナ連携と相性がよい" },
        ],
      },
      {
        name: "NLB",
        summary: "L4 で高性能かつ低レイテンシーな振り分けに向いています。",
        points: [
          { label: "対応レイヤー", value: "Network Layer (L4)" },
          { label: "向いている用途", value: "TCP/UDP、極めて高い性能、固定 IP が必要な構成" },
          { label: "特徴", value: "超低レイテンシーで大量トラフィックを扱いやすい" },
          { label: "関連機能", value: "固定 IP や静的エンドポイントが求められるケースに向く" },
        ],
      },
    ],
    examTip:
      "パスやホスト名で振り分ける要件なら ALB、TCP/UDP や固定 IP を重視するなら NLB を優先して考えます。",
    conclusion:
      "Web アプリの柔軟なルーティングは ALB、ネットワーク性能と固定 IP を重視するなら NLB です。",
  },
  {
    id: "aurora-vs-rds",
    title: "Aurora vs RDS",
    category: "データベース",
    summary:
      "どちらもリレーショナルですが、高可用性と性能をより強く求めるか、標準的なマネージド DB で十分かを考えます。",
    services: [
      {
        name: "Aurora",
        summary: "高性能・高可用性を重視した AWS ネイティブなリレーショナル DB です。",
        points: [
          { label: "特徴", value: "高い性能と可用性を意識した設計" },
          { label: "向いている用途", value: "重要度の高い本番システム、読み取り負荷の高い環境" },
          { label: "可用性", value: "ストレージ層の冗長化が強く、障害時の切り替えに強い" },
          { label: "互換性", value: "MySQL / PostgreSQL 互換エディションを選べる" },
        ],
      },
      {
        name: "RDS",
        summary: "複数エンジンを選べる標準的なマネージドリレーショナル DB です。",
        points: [
          { label: "特徴", value: "一般的なマネージド DB として扱いやすい" },
          { label: "向いている用途", value: "標準的な業務 DB、既存エンジン活用、幅広い要件" },
          { label: "可用性", value: "Multi-AZ やリードレプリカで可用性と読み取りを補強する" },
          { label: "互換性", value: "MySQL、PostgreSQL、MariaDB、Oracle、SQL Server など" },
        ],
      },
    ],
    examTip:
      "より高い性能や可用性が強調されているなら Aurora、一般的なマネージドリレーショナル DB の話なら RDS をまず考えます。",
    conclusion:
      "高性能・高可用性を優先するなら Aurora、幅広い DB エンジンや標準構成で十分なら RDS です。",
  },
  {
    id: "cloudfront-vs-s3",
    title: "CloudFront vs S3",
    category: "配信",
    summary:
      "S3 は保存先、CloudFront は世界中へ高速配信する仕組みとして役割を分けて考えます。",
    services: [
      {
        name: "CloudFront",
        summary: "エッジロケーションを使ってコンテンツ配信を高速化します。",
        points: [
          { label: "役割", value: "CDN としてキャッシュ配信する" },
          { label: "向いている用途", value: "静的 / 動的コンテンツの高速配信、レイテンシー低減" },
          { label: "特徴", value: "世界中の利用者へ近い場所から配信しやすい" },
          { label: "S3 との関係", value: "S3 をオリジンとして前段に置くことが多い" },
        ],
      },
      {
        name: "S3",
        summary: "オブジェクトそのものを保存する土台です。",
        points: [
          { label: "役割", value: "高耐久なオブジェクト保存" },
          { label: "向いている用途", value: "静的サイト資産、バックアップ、ログ保存" },
          { label: "特徴", value: "保存基盤として強く、単体では CDN ではない" },
          { label: "CloudFront との関係", value: "配信元として組み合わせると効果が高い" },
        ],
      },
    ],
    examTip:
      "高速配信やキャッシュが問われているなら CloudFront、保存先そのものを問われているなら S3 を選びます。",
    conclusion:
      "保存は S3、世界中への高速配信は CloudFront と役割分担で覚えると整理しやすいです。",
  },
  {
    id: "iam-user-vs-iam-role",
    title: "IAM User vs IAM Role",
    category: "セキュリティ",
    summary:
      "人に長期認証情報を持たせるか、一時的な権限を引き受けて使うかの違いです。",
    services: [
      {
        name: "IAM User",
        summary: "人やアプリケーションに個別の恒久的な認証主体を持たせます。",
        points: [
          { label: "認証情報", value: "長期のパスワードやアクセスキーを持てる" },
          { label: "向いている用途", value: "個別ユーザー管理、限定的な既存運用" },
          { label: "注意点", value: "長期認証情報の管理負荷や漏えいリスクがある" },
          { label: "試験での扱い", value: "近年は必要最小限で使う前提が多い" },
        ],
      },
      {
        name: "IAM Role",
        summary: "必要なときだけ一時的に権限を引き受けて使います。",
        points: [
          { label: "認証情報", value: "一時的な認証情報を利用する" },
          { label: "向いている用途", value: "EC2 や Lambda への権限付与、クロスアカウントアクセス" },
          { label: "利点", value: "長期アクセスキーを配らずに済む" },
          { label: "試験での扱い", value: "AWS サービス間連携では Role を優先して考える" },
        ],
      },
    ],
    examTip:
      "AWS サービスへ権限を渡す場面や一時的なアクセスなら IAM Role、人の恒久的なログイン主体なら IAM User が基本です。",
    conclusion:
      "サービス連携や安全な権限委譲は IAM Role、個別ユーザー管理は IAM User と整理できます。",
  },
];
