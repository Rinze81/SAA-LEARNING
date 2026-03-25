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

  // ── 追加データ（1〜6件目） ──────────────────────────────────────────────────

  {
    id: "cloudwatch-vs-cloudtrail",
    title: "CloudWatch vs CloudTrail",
    category: "監視・運用",
    summary:
      "リソースの状態や性能を監視するのが CloudWatch、誰がいつ何をしたかを記録するのが CloudTrail です。",
    services: [
      {
        name: "CloudWatch",
        summary: "メトリクス・ログ・アラームによる運用監視に向いています。",
        points: [
          { label: "主な目的", value: "リソースの性能監視・アラーム・ログ収集" },
          { label: "向いている用途", value: "CPU/メモリ監視、アラーム通知、ダッシュボード作成" },
          { label: "取得できる情報", value: "メトリクス値、アプリケーションログ、イベント" },
          { label: "アクション", value: "アラームをトリガーに Auto Scaling や SNS 通知が可能" },
        ],
      },
      {
        name: "CloudTrail",
        summary: "AWS API 呼び出しの操作ログを記録する監査ツールです。",
        points: [
          { label: "主な目的", value: "API 操作の証跡記録・セキュリティ監査" },
          { label: "向いている用途", value: "誰が何をしたか調査、コンプライアンス対応、不正操作の検出" },
          { label: "取得できる情報", value: "API 呼び出し元・日時・操作対象リソース・ソース IP" },
          { label: "アクション", value: "S3 へのログ保存、EventBridge 連携で自動対応が可能" },
        ],
      },
    ],
    examTip:
      "「監視・アラーム・メトリクス」なら CloudWatch、「誰が・いつ・何をしたか」の監査なら CloudTrail と整理します。",
    conclusion:
      "運用監視とアラームは CloudWatch、API 操作の証跡と監査は CloudTrail です。",
  },
  {
    id: "security-group-vs-nacl",
    title: "Security Group vs NACL",
    category: "セキュリティ",
    summary:
      "EC2 インスタンス単位でステートフルに制御するのが Security Group、サブネット単位でステートレスに制御するのが NACL です。",
    services: [
      {
        name: "Security Group",
        summary: "インスタンスに直接アタッチするファイアウォールです。",
        points: [
          { label: "適用単位", value: "EC2 インスタンス・ENI 単位" },
          { label: "ステート", value: "ステートフル（戻りトラフィックは自動許可）" },
          { label: "ルール", value: "許可ルールのみ設定できる（拒否ルールは設定不可）" },
          { label: "評価方法", value: "全ルールを評価して許可されるか判断" },
        ],
      },
      {
        name: "NACL（ネットワーク ACL）",
        summary: "サブネット全体に適用する追加のファイアウォール層です。",
        points: [
          { label: "適用単位", value: "サブネット単位" },
          { label: "ステート", value: "ステートレス（戻りトラフィックも明示的に許可が必要）" },
          { label: "ルール", value: "許可・拒否の両方を設定できる" },
          { label: "評価方法", value: "番号の小さいルールから順に評価して最初にマッチしたものを適用" },
        ],
      },
    ],
    examTip:
      "ステートフル・インスタンス単位は Security Group、ステートレス・サブネット単位は NACL と覚えます。拒否ルールが必要な場合は NACL を使います。",
    conclusion:
      "通常のアクセス制御は Security Group、サブネット全体への明示的な拒否が必要な場合は NACL を追加します。",
  },
  {
    id: "secrets-manager-vs-parameter-store",
    title: "Secrets Manager vs Parameter Store",
    category: "セキュリティ",
    summary:
      "パスワードや API キーの自動ローテーションが必要なら Secrets Manager、設定値や一般的なパラメータ管理は Parameter Store が向いています。",
    services: [
      {
        name: "Secrets Manager",
        summary: "機密情報の保存と自動ローテーションに特化したサービスです。",
        points: [
          { label: "主な目的", value: "DB パスワード・API キーの安全な管理と自動ローテーション" },
          { label: "自動ローテーション", value: "Lambda を使った自動ローテーション機能を標準サポート" },
          { label: "コスト", value: "シークレット 1 件あたり月額料金が発生する" },
          { label: "向いている用途", value: "RDS パスワード、外部 API キー、定期更新が必要な認証情報" },
        ],
      },
      {
        name: "SSM Parameter Store",
        summary: "アプリ設定や構成情報を階層的に管理できるパラメータストアです。",
        points: [
          { label: "主な目的", value: "アプリの設定値・環境変数・構成パラメータの管理" },
          { label: "自動ローテーション", value: "標準機能としては持たない（手動更新が基本）" },
          { label: "コスト", value: "スタンダード階層は無料（アドバンスド階層は有料）" },
          { label: "向いている用途", value: "環境変数、エンドポイント URL、フィーチャーフラグなど" },
        ],
      },
    ],
    examTip:
      "「自動ローテーション」「DB 認証情報の安全な管理」と来たら Secrets Manager、設定値の管理・無料で使いたいなら Parameter Store と判断します。",
    conclusion:
      "自動ローテーションが必要な機密情報は Secrets Manager、一般的な設定値管理は Parameter Store です。",
  },
  {
    id: "sqs-standard-vs-fifo",
    title: "SQS Standard vs SQS FIFO",
    category: "アプリ統合",
    summary:
      "最大スループットを優先するなら Standard、メッセージの順序と重複排除を保証したいなら FIFO を選びます。",
    services: [
      {
        name: "SQS Standard",
        summary: "高スループットで大量メッセージをさばくキューです。",
        points: [
          { label: "スループット", value: "ほぼ無制限（1 秒あたり非常に高い件数）" },
          { label: "順序保証", value: "ベストエフォート（順序が入れ替わる可能性あり）" },
          { label: "重複配信", value: "少なくとも 1 回の配信（重複する可能性あり）" },
          { label: "向いている用途", value: "大量メッセージ処理、順序不問のバッチ処理、ログ収集" },
        ],
      },
      {
        name: "SQS FIFO",
        summary: "順序保証と重複排除が必要な処理向けのキューです。",
        points: [
          { label: "スループット", value: "最大 300 件/秒（バッチ利用で 3,000 件/秒）" },
          { label: "順序保証", value: "先入れ先出し（FIFO）を厳密に保証" },
          { label: "重複配信", value: "正確に 1 回のみ配信（重複なし）" },
          { label: "向いている用途", value: "金融取引、注文処理など順序と重複排除が重要な処理" },
        ],
      },
    ],
    examTip:
      "「順序保証」「重複排除」「exactly-once」と来たら FIFO、スループット重視・順序不問なら Standard を選びます。",
    conclusion:
      "最大スループットが必要なら Standard、順序と重複排除が必要なら FIFO です。",
  },
  {
    id: "elasticache-redis-vs-memcached",
    title: "ElastiCache Redis vs Memcached",
    category: "データベース",
    summary:
      "高機能なキャッシュやセッション管理・パブサブが必要なら Redis、シンプルなキャッシュを最大速度で使いたいなら Memcached を選びます。",
    services: [
      {
        name: "ElastiCache for Redis",
        summary: "高機能インメモリデータストアで、キャッシュ以外の用途にも対応します。",
        points: [
          { label: "データ構造", value: "文字列・リスト・セット・ハッシュ・ソート済みセットなど多彩" },
          { label: "永続化", value: "スナップショットや AOF によるデータ永続化が可能" },
          { label: "高可用性", value: "Multi-AZ・クラスターモード・自動フェイルオーバーに対応" },
          { label: "向いている用途", value: "セッション管理、リーダーボード、パブサブ、リアルタイム分析" },
        ],
      },
      {
        name: "ElastiCache for Memcached",
        summary: "シンプルで高速なキャッシュに特化したサービスです。",
        points: [
          { label: "データ構造", value: "文字列（シンプルなキーバリューのみ）" },
          { label: "永続化", value: "なし（再起動するとデータは消える）" },
          { label: "高可用性", value: "Multi-AZ フェイルオーバー非対応、マルチスレッド対応" },
          { label: "向いている用途", value: "シンプルなオブジェクトキャッシュ、水平スケールが容易" },
        ],
      },
    ],
    examTip:
      "「永続化」「高可用性」「セッション管理」「パブサブ」と来たら Redis、シンプルなキャッシュのみなら Memcached を選びます。試験では Redis が選ばれる場面が多いです。",
    conclusion:
      "高機能・高可用性・永続化が必要なら Redis、シンプルなキャッシュのみなら Memcached です。",
  },
  {
    id: "s3-tiers",
    title: "S3 Standard vs S3 Intelligent-Tiering vs S3 Glacier",
    category: "ストレージ",
    summary:
      "アクセス頻度と取り出し時間の要件によってストレージクラスを使い分けます。",
    services: [
      {
        name: "S3 Standard",
        summary: "頻繁にアクセスするデータの標準ストレージです。",
        points: [
          { label: "アクセス頻度", value: "高頻度アクセス向け" },
          { label: "取り出し時間", value: "即時（ミリ秒）" },
          { label: "コスト傾向", value: "ストレージ料金が高め・取り出し料金なし" },
          { label: "向いている用途", value: "Webコンテンツ、アプリデータ、頻繁に参照するログ" },
        ],
      },
      {
        name: "S3 Intelligent-Tiering",
        summary: "アクセスパターンが不明なデータを自動で最適なティアに移動します。",
        points: [
          { label: "アクセス頻度", value: "不定期・予測困難なアクセスに最適" },
          { label: "取り出し時間", value: "即時（高頻度ティア）〜数時間（アーカイブティア）" },
          { label: "コスト傾向", value: "自動最適化で総コストを削減・監視料金が少額発生" },
          { label: "向いている用途", value: "アクセスパターンが読めないデータ湖・ログ・バックアップ" },
        ],
      },
      {
        name: "S3 Glacier / Glacier Deep Archive",
        summary: "長期アーカイブ用の低コストストレージです。",
        points: [
          { label: "アクセス頻度", value: "めったにアクセスしない長期保存データ向け" },
          { label: "取り出し時間", value: "数分〜12時間（Glacier）、最大48時間（Deep Archive）" },
          { label: "コスト傾向", value: "ストレージ料金が非常に安い・取り出しに時間とコストがかかる" },
          { label: "向いている用途", value: "法規制対応のアーカイブ、バックアップの長期保存" },
        ],
      },
    ],
    examTip:
      "頻繁アクセスなら Standard、アクセスパターン不明なら Intelligent-Tiering、長期保存でほぼ取り出さないなら Glacier と整理します。",
    conclusion:
      "アクセス頻度が高い → Standard、パターン不明 → Intelligent-Tiering、長期アーカイブ → Glacier の順で考えます。",
  },

  // ── 追加データ（7〜12件目） ─────────────────────────────────────────────────

  {
    id: "direct-connect-vs-vpn",
    title: "Direct Connect vs Site-to-Site VPN",
    category: "ネットワーク",
    summary:
      "オンプレミスと AWS を接続する方法として、専用線の安定性を取るか、手軽なインターネット VPN を取るかで判断します。",
    services: [
      {
        name: "AWS Direct Connect",
        summary: "物理専用線でオンプレミスと AWS を直接接続します。",
        points: [
          { label: "接続方式", value: "専用の物理回線（インターネットを経由しない）" },
          { label: "帯域・安定性", value: "1Gbps〜100Gbps の安定した帯域を確保できる" },
          { label: "レイテンシー", value: "一定かつ低レイテンシーを実現しやすい" },
          { label: "向いている用途", value: "大量データ転送、低レイテンシーが必要なハイブリッド構成" },
        ],
      },
      {
        name: "Site-to-Site VPN",
        summary: "インターネット上に暗号化トンネルを張って接続します。",
        points: [
          { label: "接続方式", value: "インターネット経由の IPsec 暗号化トンネル" },
          { label: "帯域・安定性", value: "インターネット回線に依存し帯域が変動する" },
          { label: "レイテンシー", value: "インターネット経由のためレイテンシーが変動しやすい" },
          { label: "向いている用途", value: "素早く安価に接続したい場合、Direct Connect のバックアップ" },
        ],
      },
    ],
    examTip:
      "「安定した専用帯域」「インターネットを経由しない」と来たら Direct Connect、「手軽・低コスト・すぐに接続」なら VPN を選びます。",
    conclusion:
      "安定性・高帯域が必要な本番ハイブリッド接続は Direct Connect、簡易接続やバックアップには VPN です。",
  },
  {
    id: "ecs-vs-eks",
    title: "ECS vs EKS",
    category: "コンピュート",
    summary:
      "AWS ネイティブなコンテナオーケストレーションを使うか、Kubernetes のエコシステムを活用するかで選びます。",
    services: [
      {
        name: "Amazon ECS",
        summary: "AWS が独自に提供するシンプルなコンテナオーケストレーターです。",
        points: [
          { label: "オーケストレーター", value: "AWS 独自（シンプルで学習コストが低い）" },
          { label: "Kubernetes 互換", value: "なし" },
          { label: "運用負荷", value: "低め・AWS サービスとの統合がスムーズ" },
          { label: "向いている用途", value: "AWS 中心のシンプルなコンテナ運用、Fargate との組み合わせ" },
        ],
      },
      {
        name: "Amazon EKS",
        summary: "マネージド Kubernetes クラスターを提供するサービスです。",
        points: [
          { label: "オーケストレーター", value: "Kubernetes（標準準拠）" },
          { label: "Kubernetes 互換", value: "あり（既存の K8s ワークロードをそのまま移行しやすい）" },
          { label: "運用負荷", value: "高め・Kubernetes の知識が必要" },
          { label: "向いている用途", value: "既存 K8s 資産の移行、マルチクラウド対応、高度なオーケストレーション" },
        ],
      },
    ],
    examTip:
      "「Kubernetes」「既存 K8s ワークロード」と来たら EKS、「AWS でシンプルにコンテナを動かしたい」なら ECS を選びます。",
    conclusion:
      "Kubernetes エコシステムが必要なら EKS、AWS ネイティブでシンプルに使いたいなら ECS です。",
  },
  {
    id: "kinesis-streams-vs-firehose",
    title: "Kinesis Data Streams vs Kinesis Firehose",
    category: "アプリ統合",
    summary:
      "リアルタイムにカスタム処理したいなら Data Streams、S3 や Redshift などへの配信を自動化したいなら Firehose を選びます。",
    services: [
      {
        name: "Kinesis Data Streams",
        summary: "リアルタイムストリームデータをカスタム処理するためのサービスです。",
        points: [
          { label: "処理タイプ", value: "リアルタイム処理（ミリ秒単位）" },
          { label: "コンシューマー", value: "Lambda・EC2 など複数のコンシューマーが独立して読み取れる" },
          { label: "データ保持", value: "デフォルト24時間〜最大7日間保持可能" },
          { label: "向いている用途", value: "リアルタイム分析、不正検知、ゲームのスコア集計" },
        ],
      },
      {
        name: "Kinesis Data Firehose",
        summary: "ストリームデータを自動でデータストアへ配信するマネージドサービスです。",
        points: [
          { label: "処理タイプ", value: "準リアルタイム（バッファリングして配信・数十秒〜数分の遅延）" },
          { label: "配信先", value: "S3・Redshift・OpenSearch・Splunk などへ自動配信" },
          { label: "管理コスト", value: "シャード管理不要・フルマネージドで運用が簡単" },
          { label: "向いている用途", value: "ログの S3 保存、データウェアハウスへの自動ロード" },
        ],
      },
    ],
    examTip:
      "「リアルタイム処理」「複数コンシューマー」と来たら Data Streams、「S3 や Redshift への自動配信」「管理不要」なら Firehose を選びます。",
    conclusion:
      "カスタムリアルタイム処理は Data Streams、データストアへの自動配信は Firehose です。",
  },
  {
    id: "ri-vs-savings-plans-vs-spot",
    title: "Reserved Instances vs Savings Plans vs Spot Instances",
    category: "コスト最適化",
    summary:
      "長期コミットで割引を受けるか、柔軟に割引を適用するか、中断を許容して最大割引を得るかで選びます。",
    services: [
      {
        name: "Reserved Instances（RI）",
        summary: "特定インスタンスを1〜3年コミットすることで最大72%割引を受けます。",
        points: [
          { label: "割引率", value: "最大72%（スタンダード・3年・全額前払い）" },
          { label: "柔軟性", value: "低め・コンバーティブル RI なら一部変更可" },
          { label: "適用対象", value: "EC2 のみ（RDS・ElastiCache など向けの RI も別途存在）" },
          { label: "向いている用途", value: "インスタンスタイプが固定の安定した長期ワークロード" },
        ],
      },
      {
        name: "Savings Plans",
        summary: "時間あたりの使用量をコミットすることで柔軟に割引を適用します。",
        points: [
          { label: "割引率", value: "最大66%（Compute Savings Plans）" },
          { label: "柔軟性", value: "高め・インスタンスタイプ・リージョン・OS を問わず適用" },
          { label: "適用対象", value: "EC2・Fargate・Lambda（Compute Savings Plans の場合）" },
          { label: "向いている用途", value: "複数サービスを使うワークロード、将来の変更に備えたい場合" },
        ],
      },
      {
        name: "Spot Instances",
        summary: "未使用の EC2 容量を最大90%割引で利用できますが中断リスクがあります。",
        points: [
          { label: "割引率", value: "最大90%（オンデマンドと比較）" },
          { label: "中断リスク", value: "AWS が容量を必要とした場合に2分前通知で中断される" },
          { label: "適用対象", value: "EC2 のみ" },
          { label: "向いている用途", value: "バッチ処理、CI/CD、中断しても再実行できるワークロード" },
        ],
      },
    ],
    examTip:
      "中断不可の継続ワークロードには RI か Savings Plans、最大割引でコスト重視かつ中断許容なら Spot、複数サービスにまたがる柔軟な割引なら Savings Plans を選びます。",
    conclusion:
      "固定インスタンスの長期運用は RI、柔軟な長期割引は Savings Plans、中断許容のバッチ処理は Spot です。",
  },
  {
    id: "route53-routing-policies",
    title: "Route 53 ルーティングポリシー比較",
    category: "ネットワーク",
    summary:
      "Latency・Failover・Weighted の3ポリシーはそれぞれ目的が異なり、要件から使い分けます。",
    services: [
      {
        name: "Latency ベースルーティング",
        summary: "ユーザーへの応答が最も速いリージョンへ誘導します。",
        points: [
          { label: "振り分け基準", value: "ユーザーから各リージョンへのレイテンシー" },
          { label: "目的", value: "パフォーマンス最適化（最速リージョンへ誘導）" },
          { label: "フェイルオーバー", value: "ヘルスチェックと組み合わせれば障害時に別リージョンへ切り替え可" },
          { label: "向いている用途", value: "グローバルアプリで地域ごとのレイテンシーを最小化したい" },
        ],
      },
      {
        name: "Failover ルーティング",
        summary: "プライマリ障害時にセカンダリへ自動切り替えします。",
        points: [
          { label: "振り分け基準", value: "ヘルスチェックの結果（正常 / 異常）" },
          { label: "目的", value: "高可用性・ディザスタリカバリ（DR）" },
          { label: "フェイルオーバー", value: "プライマリ異常時に自動でセカンダリへ切り替え" },
          { label: "向いている用途", value: "本番/DR 構成、アクティブ・パッシブ構成" },
        ],
      },
      {
        name: "Weighted ルーティング",
        summary: "設定した重みの比率でトラフィックを複数エンドポイントへ分散します。",
        points: [
          { label: "振り分け基準", value: "設定した重み（Weight）の比率" },
          { label: "目的", value: "A/B テスト、カナリアリリース、段階的移行" },
          { label: "フェイルオーバー", value: "ヘルスチェック併用で不健全なエンドポイントを除外できる" },
          { label: "向いている用途", value: "新バージョンへの段階移行、複数リージョンへの比率分散" },
        ],
      },
    ],
    examTip:
      "「最速リージョン」→ Latency、「障害時の自動切り替え/DR」→ Failover、「A/B テスト/比率分散」→ Weighted と対応付けて覚えます。",
    conclusion:
      "パフォーマンス最適化は Latency、障害対策は Failover、段階移行・比率分散は Weighted です。",
  },
  {
    id: "lambda-vs-fargate-vs-ec2",
    title: "Lambda vs Fargate vs EC2",
    category: "コンピュート",
    summary:
      "サーバーレス関数・コンテナ・仮想サーバーという3つの実行形態を、管理コストとコントロールのバランスで選びます。",
    services: [
      {
        name: "Lambda",
        summary: "イベント駆動のサーバーレス関数実行環境です。",
        points: [
          { label: "管理コスト", value: "最小（インフラ・OS・ランタイムはすべて AWS 管理）" },
          { label: "実行時間", value: "最大15分" },
          { label: "スケーリング", value: "自動（リクエスト単位で即座にスケール）" },
          { label: "向いている用途", value: "短時間のイベント処理、API バックエンド、自動化タスク" },
        ],
      },
      {
        name: "Fargate",
        summary: "サーバー管理不要でコンテナを実行できるサーバーレスコンピュートエンジンです。",
        points: [
          { label: "管理コスト", value: "中（コンテナの定義と実行設定のみ管理）" },
          { label: "実行時間", value: "制限なし（常時起動も可能）" },
          { label: "スケーリング", value: "ECS/EKS の設定に基づいて自動スケール" },
          { label: "向いている用途", value: "サーバー管理なしで長時間動くコンテナワークロード" },
        ],
      },
      {
        name: "EC2",
        summary: "OS レベルから自由にカスタマイズできる仮想サーバーです。",
        points: [
          { label: "管理コスト", value: "最大（OS・パッチ・スケーリング設計をすべて自分で管理）" },
          { label: "実行時間", value: "制限なし（常時起動）" },
          { label: "スケーリング", value: "Auto Scaling Group で設定して水平スケール" },
          { label: "向いている用途", value: "細かいチューニング、既存アプリ移行、GPU など特殊なハードウェア要件" },
        ],
      },
    ],
    examTip:
      "「サーバーレス・短時間処理」→ Lambda、「コンテナ・サーバー管理不要」→ Fargate、「OS カスタマイズ・長時間・既存移行」→ EC2 と整理します。",
    conclusion:
      "管理コスト最小でイベント処理は Lambda、コンテナをサーバーレスで動かすなら Fargate、最大の制御が必要なら EC2 です。",
  },
];
