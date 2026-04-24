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

  // ── 追加比較（21〜30件目） ─────────────────────────────────────────────────
  {
    id: "sqs-vs-kinesis-streams",
    title: "SQS vs Kinesis Data Streams",
    category: "メッセージング",
    summary:
      "メッセージキューとリアルタイムストリーミングの違いを理解して使い分けます。",
    services: [
      {
        name: "SQS",
        summary: "アプリ間の非同期メッセージ受け渡しに最適なキューサービスです。",
        points: [
          { label: "モデル", value: "メッセージキュー（1 メッセージを 1 コンシューマーが受け取る）" },
          { label: "データ保持", value: "最大 14 日間・受信後は削除される" },
          { label: "スループット", value: "スタンダードは無制限、FIFO は 3,000 件/秒（バッチ）" },
          { label: "コンシューマー", value: "1 つのメッセージは原則 1 コンシューマーが処理" },
          { label: "向いている用途", value: "タスクキュー、非同期ジョブ、バッファリング" },
        ],
      },
      {
        name: "Kinesis Data Streams",
        summary: "大量のリアルタイムストリームデータを複数の消費者で並列処理します。",
        points: [
          { label: "モデル", value: "ストリーム（同じデータを複数コンシューマーが独立して読める）" },
          { label: "データ保持", value: "デフォルト 24 時間、最大 7 日間（拡張保持）" },
          { label: "スループット", value: "シャード単位（1 シャード = 1 MB/秒書き込み）" },
          { label: "コンシューマー", value: "複数コンシューマーが同じストリームを独立して読める" },
          { label: "向いている用途", value: "ログ収集、IoT データ、リアルタイム分析、複数処理系" },
        ],
      },
    ],
    examTip:
      "「1 メッセージを 1 サービスが処理」→ SQS、「同じデータを複数サービスが並列処理」または「リアルタイム分析」→ Kinesis Data Streams と使い分けます。",
    conclusion:
      "タスクキューや非同期処理なら SQS、大量ストリームの複数コンシューマー処理やリアルタイム分析なら Kinesis Data Streams です。",
  },
  {
    id: "cloudwatch-vs-cloudtrail-vs-config",
    title: "CloudWatch vs CloudTrail vs AWS Config",
    category: "モニタリング",
    summary:
      "「何が起きているか（パフォーマンス）」「誰が操作したか（監査）」「設定は正しいか（コンプライアンス）」の 3 つを使い分けます。",
    services: [
      {
        name: "CloudWatch",
        summary: "リソースのメトリクスとログをリアルタイムで監視します。",
        points: [
          { label: "目的", value: "パフォーマンス監視・アラート・ダッシュボード" },
          { label: "収集対象", value: "CPU・メモリ・リクエスト数などのメトリクス、アプリログ" },
          { label: "アクション", value: "アラームで SNS 通知・Auto Scaling トリガー" },
          { label: "キーワード", value: "「CPU が 80% を超えたら通知」「ログの異常検知」" },
        ],
      },
      {
        name: "CloudTrail",
        summary: "AWS API 操作の全履歴を記録して監査します。",
        points: [
          { label: "目的", value: "API 操作の監査ログ・セキュリティ調査" },
          { label: "収集対象", value: "誰が・いつ・何の API を呼び出したかの証跡" },
          { label: "アクション", value: "S3 に証跡保存・CloudWatch Logs に転送" },
          { label: "キーワード", value: "「誰が S3 バケットを削除したか」「不正な API 呼び出しの調査」" },
        ],
      },
      {
        name: "AWS Config",
        summary: "リソースの設定変更履歴を記録しコンプライアンスを継続評価します。",
        points: [
          { label: "目的", value: "設定変更の追跡・コンプライアンスルールの継続評価" },
          { label: "収集対象", value: "リソースの設定スナップショットと変更履歴" },
          { label: "アクション", value: "非準拠リソースを検出・自動修復も可能" },
          { label: "キーワード", value: "「S3 バケットが暗号化されているか継続確認したい」「設定変更の監査」" },
        ],
      },
    ],
    examTip:
      "「パフォーマンス・メトリクス」→ CloudWatch、「API 操作の監査」→ CloudTrail、「設定の準拠確認・変更履歴」→ AWS Config と覚えます。3 つは補完関係にあり組み合わせて使います。",
    conclusion:
      "リソースの動作を監視するなら CloudWatch、誰が何をしたか追跡するなら CloudTrail、設定が正しいか継続チェックするなら AWS Config です。",
  },
  {
    id: "nat-gateway-vs-nat-instance",
    title: "NAT Gateway vs NAT Instance",
    category: "ネットワーク",
    summary:
      "プライベートサブネットからのインターネット接続を提供する 2 つの方法を比較します。",
    services: [
      {
        name: "NAT Gateway",
        summary: "マネージドな NAT サービスで可用性・スループットが高いです。",
        points: [
          { label: "管理", value: "AWS フルマネージド（パッチ・スケールは自動）" },
          { label: "可用性", value: "AZ 内で自動冗長化。複数 AZ 対応には各 AZ に 1 つ配置" },
          { label: "スループット", value: "最大 100 Gbps まで自動スケール" },
          { label: "コスト", value: "時間料金 + データ転送量（EC2 より高め）" },
          { label: "セキュリティグループ", value: "設定不可（自動で適切な設定が適用される）" },
        ],
      },
      {
        name: "NAT Instance",
        summary: "EC2 インスタンスを NAT として使う方法でコストを抑えられます。",
        points: [
          { label: "管理", value: "自己管理（パッチ・スケール・冗長化は自分で設計）" },
          { label: "可用性", value: "単一インスタンスはデフォルトで単一障害点になる" },
          { label: "スループット", value: "インスタンスサイズに依存・手動でスケールが必要" },
          { label: "コスト", value: "スポットインスタンス利用で安くできる場合もある" },
          { label: "セキュリティグループ", value: "設定可能・ポートフォワードなど細かい制御ができる" },
        ],
      },
    ],
    examTip:
      "試験では NAT Gateway が推奨解答になることがほとんどです。「コスト削減でスポットを使いたい」「ポートフォワードが必要」などの特殊要件が明示されたときだけ NAT Instance を選びます。",
    conclusion:
      "運用の手間をかけたくないなら NAT Gateway、細かい制御やコスト最優先ならNAT Instance です。現代の試験では NAT Gateway が基本解答です。",
  },
  {
    id: "shield-vs-waf-vs-firewall-manager",
    title: "Shield vs WAF vs Firewall Manager",
    category: "セキュリティ",
    summary:
      "DDoS 防御・アプリ層攻撃フィルタリング・ポリシー一元管理という異なる役割を持つ 3 つのセキュリティサービスを使い分けます。",
    services: [
      {
        name: "AWS Shield",
        summary: "DDoS 攻撃からインフラを保護するサービスです。",
        points: [
          { label: "保護対象", value: "L3/L4 の DDoS 攻撃（大量パケット・SYN フラッド など）" },
          { label: "プラン", value: "Standard（無料・自動適用）/ Advanced（有料・高度な保護・DRT サポート）" },
          { label: "適用範囲", value: "CloudFront・Route 53・ELB・EC2（Global Accelerator 経由）" },
          { label: "キーワード", value: "「DDoS 攻撃から守りたい」「大量トラフィックによるサービス停止を防ぎたい」" },
        ],
      },
      {
        name: "AWS WAF",
        summary: "HTTP/HTTPS レイヤーの悪意あるリクエストをフィルタリングします。",
        points: [
          { label: "保護対象", value: "L7 攻撃（SQL インジェクション・XSS・不正ボット など）" },
          { label: "ルール", value: "IP・地理・ヘッダー・本文の条件でカスタムルールを定義" },
          { label: "適用先", value: "CloudFront・ALB・API Gateway・AppSync" },
          { label: "キーワード", value: "「SQL インジェクションを防ぎたい」「特定 IP をブロックしたい」" },
        ],
      },
      {
        name: "AWS Firewall Manager",
        summary: "複数アカウントに WAF・Shield・Network Firewall ポリシーを一元適用します。",
        points: [
          { label: "保護対象", value: "WAF・Shield Advanced・Network Firewall のポリシー管理" },
          { label: "スコープ", value: "AWS Organizations 全アカウントに一括適用" },
          { label: "前提条件", value: "AWS Organizations と Config が有効であること" },
          { label: "キーワード", value: "「複数アカウントに WAF ルールを統一したい」「セキュリティポリシーの一元管理」" },
        ],
      },
    ],
    examTip:
      "「DDoS」→ Shield、「HTTP 攻撃・SQL インジェクション・XSS」→ WAF、「複数アカウントへのポリシー統一」→ Firewall Manager と問題文のキーワードで素早く判断します。",
    conclusion:
      "大量パケット攻撃は Shield、アプリ層の悪意あるリクエストは WAF、それらのポリシーを組織全体に適用するなら Firewall Manager です。",
  },
  {
    id: "cognito-user-pool-vs-identity-pool",
    title: "Cognito User Pool vs Identity Pool",
    category: "セキュリティ",
    summary:
      "Cognito の 2 つの機能、ユーザー認証管理と AWS リソースへのアクセス付与を使い分けます。",
    services: [
      {
        name: "Cognito User Pool",
        summary: "アプリのユーザー認証・管理を担います。",
        points: [
          { label: "役割", value: "ユーザーのサインアップ・サインイン・パスワード管理" },
          { label: "出力", value: "認証成功後に JWT トークン（ID/Access/Refresh Token）を発行" },
          { label: "連携", value: "Google・Facebook・Apple などのソーシャル IdP と Federation できる" },
          { label: "キーワード", value: "「アプリのユーザー認証基盤を作りたい」「MFA・パスワードポリシーを管理したい」" },
        ],
      },
      {
        name: "Cognito Identity Pool",
        summary: "認証済みユーザーに AWS リソースへのアクセス権限を付与します。",
        points: [
          { label: "役割", value: "認証済みユーザーに一時的な AWS 認証情報（IAM ロール）を付与" },
          { label: "出力", value: "STS から一時的な AWS アクセスキー・シークレット・セッショントークンを発行" },
          { label: "連携", value: "User Pool・Google・Facebook・SAML など様々な IdP と連携可能" },
          { label: "キーワード", value: "「モバイルアプリから S3 に直接アップロードしたい」「認証ユーザーに DynamoDB アクセスを許可したい」" },
        ],
      },
    ],
    examTip:
      "「ユーザーのサインイン・パスワード管理」→ User Pool、「AWS リソース（S3・DynamoDB など）への一時的なアクセス権」→ Identity Pool と判断します。多くの場合、両方を組み合わせて使います。",
    conclusion:
      "ユーザー認証基盤を作るなら User Pool、認証後に AWS サービスへのアクセス権を与えるなら Identity Pool です。",
  },
  {
    id: "systems-manager-vs-opsworks",
    title: "Systems Manager vs OpsWorks",
    category: "運用管理",
    summary:
      "EC2・オンプレミスサーバーの構成管理・自動化を担う 2 つのアプローチを比較します。",
    services: [
      {
        name: "AWS Systems Manager",
        summary: "AWS ネイティブのサーバー管理・自動化プラットフォームです。",
        points: [
          { label: "アプローチ", value: "SSM Agent を介した AWS ネイティブの管理（Chef/Puppet 不要）" },
          { label: "主な機能", value: "Run Command・Patch Manager・Session Manager・Parameter Store など" },
          { label: "対応環境", value: "EC2・オンプレミス・その他クラウドの混在環境" },
          { label: "キーワード", value: "「SSH なしでコマンド実行」「OS パッチ自動適用」「設定値の一元管理」" },
        ],
      },
      {
        name: "AWS OpsWorks",
        summary: "既存の Chef・Puppet ワークフローを AWS でそのまま使えるマネージドサービスです。",
        points: [
          { label: "アプローチ", value: "Chef Automate / Puppet Enterprise をマネージドで提供" },
          { label: "主な機能", value: "Chef レシピ・Puppet マニフェストによるサーバー構成管理" },
          { label: "対応環境", value: "EC2・オンプレミス" },
          { label: "キーワード", value: "「既存の Chef/Puppet スクリプトをそのまま AWS で使いたい」" },
        ],
      },
    ],
    examTip:
      "「Chef/Puppet を既に使っている」→ OpsWorks、それ以外の新規構築や AWS ネイティブの管理自動化 → Systems Manager が推奨です。試験では既存 Chef/Puppet 移行シナリオで OpsWorks が出ます。",
    conclusion:
      "新規で AWS のサーバー管理を自動化するなら Systems Manager、既存の Chef/Puppet 資産を活かすなら OpsWorks です。",
  },
  {
    id: "glue-vs-data-pipeline-vs-emr",
    title: "Glue vs Data Pipeline vs EMR",
    category: "分析",
    summary:
      "ETL・データ移動・大規模バッチ処理という異なるユースケースで使い分けます。",
    services: [
      {
        name: "AWS Glue",
        summary: "サーバーレス ETL とデータカタログを提供するマネージドサービスです。",
        points: [
          { label: "実行モデル", value: "サーバーレス（インフラ管理不要）" },
          { label: "得意なこと", value: "S3・RDS・DynamoDB 間の ETL、スキーマ自動検出、Data Catalog" },
          { label: "コード", value: "Python / Scala（Spark ベース）または Visual ETL（ノーコード）" },
          { label: "キーワード", value: "「サーバーレス ETL」「データカタログで Athena と連携」" },
        ],
      },
      {
        name: "AWS Data Pipeline",
        summary: "AWS サービス間のデータ移動・変換をスケジュール実行する旧世代サービスです。",
        points: [
          { label: "実行モデル", value: "EC2 や EMR クラスターを起動して実行（サーバーレスではない）" },
          { label: "得意なこと", value: "定期的なデータ移動・変換のワークフロー定義" },
          { label: "現状", value: "新規開発には Glue・Step Functions が推奨される旧世代サービス" },
          { label: "キーワード", value: "「既存の Data Pipeline を移行したい」シナリオで出題される" },
        ],
      },
      {
        name: "Amazon EMR",
        summary: "Hadoop・Spark などのビッグデータフレームワークを動かすマネージドクラスターです。",
        points: [
          { label: "実行モデル", value: "EC2 クラスター（または EMR Serverless）で Spark/Hadoop を実行" },
          { label: "得意なこと", value: "大規模バッチ処理・機械学習・インタラクティブ分析" },
          { label: "コスト最適化", value: "スポットインスタンスでクラスターコストを大幅削減可能" },
          { label: "キーワード", value: "「大規模 Spark ジョブ」「Hadoop エコシステム」「ペタバイト規模の処理」" },
        ],
      },
    ],
    examTip:
      "「サーバーレス ETL・データカタログ」→ Glue、「既存 Data Pipeline の置き換え」→ Glue + Step Functions、「大規模 Spark/Hadoop」→ EMR と使い分けます。",
    conclusion:
      "シンプルなサーバーレス ETL なら Glue、大規模な分散処理フレームワークが必要なら EMR、Data Pipeline は新規では使わずに Glue へ移行します。",
  },
  {
    id: "ecs-ec2-vs-fargate-vs-eks",
    title: "ECS on EC2 vs ECS on Fargate vs EKS",
    category: "コンテナ",
    summary:
      "コンテナワークロードの管理方法とオーケストレーターの選択を比較します。",
    services: [
      {
        name: "ECS on EC2",
        summary: "ECS が EC2 インスタンス上でコンテナを管理します。",
        points: [
          { label: "インフラ管理", value: "EC2 インスタンス（クラスター）を自分で管理する" },
          { label: "コスト", value: "EC2 の料金（スポットインスタンスで安くできる）" },
          { label: "向いている用途", value: "コスト最適化・特殊なインスタンスタイプ（GPU など）が必要" },
          { label: "オーケストレーター", value: "AWS 独自（ECS）" },
        ],
      },
      {
        name: "ECS on Fargate",
        summary: "サーバーレスでコンテナを実行します。インフラ管理不要です。",
        points: [
          { label: "インフラ管理", value: "不要（AWS がインフラを管理）" },
          { label: "コスト", value: "タスクの vCPU・メモリ使用量に応じた課金（Fargate Spot で削減可）" },
          { label: "向いている用途", value: "運用負荷を最小化・EC2 管理なしでコンテナを動かしたい" },
          { label: "オーケストレーター", value: "AWS 独自（ECS）" },
        ],
      },
      {
        name: "Amazon EKS",
        summary: "Kubernetes をマネージドで提供します。",
        points: [
          { label: "インフラ管理", value: "EC2 ノードまたは Fargate（マネージドノードグループも可）" },
          { label: "コスト", value: "EKS クラスター料金 + EC2/Fargate 料金" },
          { label: "向いている用途", value: "Kubernetes の知識・既存 K8s ワークロード・マルチクラウド対応" },
          { label: "オーケストレーター", value: "Kubernetes（業界標準）" },
        ],
      },
    ],
    examTip:
      "「サーバー管理なし・コンテナを AWS で手軽に動かす」→ ECS on Fargate、「既存の Kubernetes ワークロード・K8s 標準が必要」→ EKS、「EC2 コスト最適化・特殊ハードウェア」→ ECS on EC2 と判断します。",
    conclusion:
      "運用負荷を最小化するなら Fargate、K8s 標準が必要なら EKS、コスト最適化・EC2 制御が必要なら ECS on EC2 です。",
  },
  {
    id: "s3-transfer-acceleration-vs-cloudfront-vs-global-accelerator",
    title: "S3 Transfer Acceleration vs CloudFront vs Global Accelerator",
    category: "ネットワーク",
    summary:
      "グローバルユーザーへの高速配信・転送を目的とする 3 つのサービスを比較します。",
    services: [
      {
        name: "S3 Transfer Acceleration",
        summary: "S3 へのアップロードを CloudFront エッジ経由で高速化します。",
        points: [
          { label: "用途", value: "S3 へのファイルアップロードの高速化" },
          { label: "仕組み", value: "最寄りの CloudFront エッジロケーションを経由して AWS バックボーンを使う" },
          { label: "向き", value: "クライアント → S3（アップロード方向）" },
          { label: "キーワード", value: "「世界中のユーザーが S3 に大きなファイルをアップロードするのを高速化したい」" },
        ],
      },
      {
        name: "Amazon CloudFront",
        summary: "静的・動的コンテンツをエッジでキャッシュして配信します。",
        points: [
          { label: "用途", value: "静的コンテンツキャッシュ・動的コンテンツ高速配信・DDoS 軽減" },
          { label: "仕組み", value: "エッジロケーションでキャッシュし、オリジンへのリクエストを削減" },
          { label: "向き", value: "S3・ALB・EC2 → クライアント（ダウンロード方向）" },
          { label: "キーワード", value: "「静的ファイルのグローバル配信」「API レスポンスのキャッシュ」" },
        ],
      },
      {
        name: "AWS Global Accelerator",
        summary: "静的エニーキャスト IP で最適な AWS エンドポイントにルーティングします。",
        points: [
          { label: "用途", value: "TCP/UDP トラフィックの低レイテンシールーティング・フェイルオーバー" },
          { label: "仕組み", value: "AWS グローバルネットワーク経由でエンドポイント（ALB・EC2・EIP）に転送" },
          { label: "向き", value: "双方向（HTTP 以外の TCP/UDP にも対応）" },
          { label: "キーワード", value: "「固定 IP が必要」「ゲーム・VoIP など非 HTTP の低レイテンシー通信」「フェイルオーバーを秒単位で」" },
        ],
      },
    ],
    examTip:
      "「S3 アップロード高速化」→ Transfer Acceleration、「コンテンツキャッシュ・HTTP 配信」→ CloudFront、「固定 IP・非 HTTP・秒単位フェイルオーバー」→ Global Accelerator と使い分けます。",
    conclusion:
      "S3 へのアップロードを速くするなら Transfer Acceleration、コンテンツをキャッシュ配信するなら CloudFront、固定 IP や非 HTTP の低レイテンシー通信なら Global Accelerator です。",
  },
  {
    id: "rds-proxy-vs-elasticache",
    title: "RDS Proxy vs ElastiCache",
    category: "データベース",
    summary:
      "データベース性能を改善する 2 つのアプローチ、コネクション管理とキャッシュを比較します。",
    services: [
      {
        name: "RDS Proxy",
        summary: "DB コネクションを効率的にプールして DB への接続数を削減します。",
        points: [
          { label: "役割", value: "コネクションプールにより DB の同時接続数を削減" },
          { label: "仕組み", value: "アプリ → RDS Proxy（コネクション再利用）→ RDS/Aurora" },
          { label: "効果", value: "DB への接続数削減・フェイルオーバー時の自動再接続" },
          { label: "キーワード", value: "「Lambda から RDS に大量接続してエラーになる」「コネクション数上限超え」" },
        ],
      },
      {
        name: "ElastiCache",
        summary: "頻繁にアクセスするデータをインメモリにキャッシュして DB クエリを削減します。",
        points: [
          { label: "役割", value: "インメモリキャッシュで DB クエリ数と読み取り負荷を削減" },
          { label: "仕組み", value: "アプリ → ElastiCache でキャッシュヒット → DB クエリをスキップ" },
          { label: "効果", value: "マイクロ秒レベルのレスポンス・DB 読み取り負荷大幅削減" },
          { label: "キーワード", value: "「DB の読み取り負荷が高い」「同じクエリが繰り返し実行される」「セッション管理」" },
        ],
      },
    ],
    examTip:
      "「DB への接続数が多すぎる・Lambda からの同時接続」→ RDS Proxy、「DB のクエリが遅い・繰り返し同じデータを読む」→ ElastiCache と問題文の症状で判断します。",
    conclusion:
      "Lambda などの大量接続でコネクションエラーが出るなら RDS Proxy、同じデータへの繰り返しクエリで DB 負荷が高いなら ElastiCache です。",
  },
  {
    id: "step-functions-vs-sqs-vs-eventbridge",
    title: "Step Functions vs SQS vs EventBridge",
    category: "アプリ統合",
    summary:
      "ワークフローの状態管理が必要か、メッセージのキューイングが必要か、イベントのルーティングが必要かで使い分けます。",
    services: [
      {
        name: "Step Functions",
        summary: "複数のステップを順序・分岐・リトライ付きで制御したいときに向いています。",
        points: [
          { label: "役割", value: "ステートマシンによるワークフローオーケストレーション" },
          { label: "向いている用途", value: "複数 Lambda の連鎖処理、ヒューマン承認フロー、注文処理パイプライン" },
          { label: "特徴", value: "実行状態の可視化・分岐・並列・エラーリトライを標準機能で管理" },
          { label: "キーワード", value: "「複数ステップを順番に実行したい」「処理の進行状況を追跡したい」" },
        ],
      },
      {
        name: "SQS",
        summary: "メッセージをバッファリングして非同期に処理させたいときに向いています。",
        points: [
          { label: "役割", value: "プロデューサーとコンシューマーを切り離すメッセージキュー" },
          { label: "向いている用途", value: "バッチ処理の平滑化、マイクロサービス間の疎結合、負荷の平準化" },
          { label: "特徴", value: "最大14日間のメッセージ保持・可視性タイムアウトで重複処理制御" },
          { label: "キーワード", value: "「処理が追いつかない時にためておきたい」「コンポーネントを疎結合にしたい」" },
        ],
      },
      {
        name: "EventBridge",
        summary: "イベントを条件でフィルタリングして複数のターゲットにルーティングしたいときに向いています。",
        points: [
          { label: "役割", value: "イベントバスによるイベントルーティング・ファンアウト" },
          { label: "向いている用途", value: "SaaS 連携、クロスアカウントイベント、スケジュール実行" },
          { label: "特徴", value: "ルールでイベントをフィルタして複数ターゲットに同時配信" },
          { label: "キーワード", value: "「イベントを条件で振り分けたい」「複数サービスに同時通知したい」" },
        ],
      },
    ],
    examTip:
      "「複数ステップの順序制御・状態管理」→ Step Functions、「非同期バッファリング・負荷平準化」→ SQS、「イベントのフィルタ・ルーティング・ファンアウト」→ EventBridge と処理の性質で判断します。",
    conclusion:
      "ステップ間の依存関係や状態追跡が必要なら Step Functions、メッセージを溜めて後処理するなら SQS、イベント駆動の配信・振り分けなら EventBridge です。",
  },
  {
    id: "aurora-serverless-vs-provisioned",
    title: "Aurora Serverless v2 vs Aurora Provisioned",
    category: "データベース",
    summary:
      "ワークロードが予測しにくく変動が大きいか、安定した高負荷が続くかで使い分けます。",
    services: [
      {
        name: "Aurora Serverless v2",
        summary: "負荷に応じて自動でキャパシティが増減する可変負荷向けの構成です。",
        points: [
          { label: "キャパシティ管理", value: "ACU（Aurora Capacity Unit）で自動スケール" },
          { label: "向いている用途", value: "開発・テスト環境、夜間バッチ、アクセス数が不規則なアプリ" },
          { label: "コスト特性", value: "アイドル時は最小 ACU まで縮小してコストを抑えられる" },
          { label: "制限", value: "スケールアップに数秒かかるため急激なスパイクには注意" },
        ],
      },
      {
        name: "Aurora Provisioned",
        summary: "インスタンスサイズを固定して安定した大規模負荷をさばく構成です。",
        points: [
          { label: "キャパシティ管理", value: "インスタンスクラスを手動で選択・変更する" },
          { label: "向いている用途", value: "本番 OLTP、安定したスループットが必要なシステム" },
          { label: "コスト特性", value: "使用率にかかわらずインスタンス稼働時間で課金" },
          { label: "制限", value: "スケールアップはインスタンス変更が必要（短時間のダウンタイムあり）" },
        ],
      },
    ],
    examTip:
      "「負荷が予測できない」「夜間は無負荷で昼間だけ高負荷」→ Serverless v2、「高トラフィックが常時続く」「最大性能を固定で確保したい」→ Provisioned と負荷パターンで判断します。",
    conclusion:
      "変動が大きく節約も重視するなら Serverless v2、安定した大規模負荷には Provisioned を選びます。",
  },
  {
    id: "vpc-peering-vs-transit-gateway-vs-privatelink",
    title: "VPC Peering vs Transit Gateway vs PrivateLink",
    category: "ネットワーク",
    summary:
      "接続するVPC数・方向・公開範囲によって最適な接続方式が変わります。",
    services: [
      {
        name: "VPC Peering",
        summary: "2つのVPCを1対1でシンプルに接続する方式です。",
        points: [
          { label: "接続形態", value: "2 VPC 間の 1 対 1 ピアリング接続" },
          { label: "向いている用途", value: "少数 VPC 間の通信、クロスアカウント接続" },
          { label: "制限", value: "推移的ルーティング不可（A↔B・B↔C でも A↔C は通信不可）" },
          { label: "キーワード", value: "「2 つの VPC を直接接続したい」「シンプルな VPC 間通信」" },
        ],
      },
      {
        name: "Transit Gateway",
        summary: "多数のVPCをハブアンドスポーク型で集中管理する方式です。",
        points: [
          { label: "接続形態", value: "中央の TGW に多数の VPC・VPN・Direct Connect を接続" },
          { label: "向いている用途", value: "多数の VPC 管理、クロスリージョン接続、オンプレ統合" },
          { label: "制限", value: "接続数に応じてコストが増加する" },
          { label: "キーワード", value: "「VPC が 3 つ以上」「推移的ルーティングが必要」" },
        ],
      },
      {
        name: "PrivateLink",
        summary: "サービスを VPC に閉じた形で他のVPCやアカウントに安全に公開する方式です。",
        points: [
          { label: "接続形態", value: "エンドポイントサービス（NLB）とインターフェース型 VPC エンドポイントで接続" },
          { label: "向いている用途", value: "マネージドサービスへのプライベートアクセス、SaaS 提供" },
          { label: "制限", value: "双方向の全通信ではなく、特定サービスへの単方向アクセス" },
          { label: "キーワード", value: "「サービスを公開したいが IP を重複させたくない」「プライベートに API を提供」" },
        ],
      },
    ],
    examTip:
      "「2 VPC だけ繋ぐ」→ Peering、「VPC が多く推移的ルーティングが必要」→ Transit Gateway、「特定サービスをプライベートに公開」→ PrivateLink と接続規模・方向で判断します。",
    conclusion:
      "小規模な VPC 間接続は Peering、多対多の集中管理は Transit Gateway、サービス公開には PrivateLink を選びます。",
  },
  {
    id: "ebs-volume-types",
    title: "EBS gp2 vs gp3 vs io1 vs io2",
    category: "ストレージ",
    summary:
      "汎用ワークロードか I/O 集約型かで選択肢が変わり、同じ性能なら gp3 が最もコスト効率に優れます。",
    services: [
      {
        name: "gp2（汎用 SSD・旧世代）",
        summary: "ベースラインの IOPS がボリュームサイズに連動する汎用ボリュームです。",
        points: [
          { label: "IOPS", value: "3 IOPS/GB、最大 16,000 IOPS（バースト最大 3,000）" },
          { label: "向いている用途", value: "一般的な Web サーバー、小規模 DB（新規では gp3 推奨）" },
          { label: "コスト", value: "gp3 より高く、性能はサイズに依存するため調整しにくい" },
          { label: "キーワード", value: "既存の汎用 SSD ボリューム、旧世代のデフォルト選択" },
        ],
      },
      {
        name: "gp3（汎用 SSD・新世代）",
        summary: "IOPS とスループットをサイズと独立して設定できるコスト効率の高い汎用ボリュームです。",
        points: [
          { label: "IOPS", value: "ベースライン 3,000 IOPS を無料で提供、最大 16,000 IOPS まで追加可能" },
          { label: "向いている用途", value: "ほとんどの一般ワークロード、コスト最適化が重要な場合" },
          { label: "コスト", value: "gp2 より最大 20% 安価で AWS 推奨の汎用ボリューム" },
          { label: "キーワード", value: "「コスト効率よく高い IOPS が必要」「新規ボリューム作成」" },
        ],
      },
      {
        name: "io1 / io2（プロビジョンド IOPS SSD）",
        summary: "最大 64,000〜256,000 IOPS をプロビジョンして保証する超高 I/O ワークロード向けです。",
        points: [
          { label: "IOPS", value: "io1: 最大 64,000 IOPS、io2 Block Express: 最大 256,000 IOPS" },
          { label: "向いている用途", value: "大規模 OLTP、Oracle・SAP など I/O 集約型 DB" },
          { label: "コスト", value: "gp 系より高価だが IOPS を確実に保証できる" },
          { label: "キーワード", value: "「高い IOPS を安定して保証したい」「I/O 集約型データベース」" },
        ],
      },
    ],
    examTip:
      "「コスト効率よく汎用的に使いたい」→ gp3（新規のデフォルト）、「高 IOPS を確実に保証したい」→ io1/io2 と I/O 要件の厳格さで判断します。gp3 が gp2 より安価で高性能な点は頻出です。",
    conclusion:
      "ほとんどのワークロードは gp3、I/O 集約型の本番 DB では io1/io2 を選びます。gp2 は新規ではほぼ選びません。",
  },
  {
    id: "cicd-services",
    title: "CodeCommit vs CodeBuild vs CodeDeploy vs CodePipeline",
    category: "開発者ツール",
    summary:
      "AWS のCI/CDサービスはそれぞれ独立した役割をもち、組み合わせることでエンドツーエンドのパイプラインを構成します。",
    services: [
      {
        name: "CodeCommit",
        summary: "Git リポジトリをホストするソースコード管理サービスです。",
        points: [
          { label: "役割", value: "Git 互換のプライベートリポジトリホスティング" },
          { label: "向いている用途", value: "ソースコードの保管、バージョン管理、ブランチ戦略" },
          { label: "キーワード", value: "「Git リポジトリを AWS 内に置きたい」" },
          { label: "備考", value: "2024年以降は新規リポジトリ作成不可（GitHub等への移行推奨）" },
        ],
      },
      {
        name: "CodeBuild",
        summary: "ソースコードをビルド・テストするマネージド CI サービスです。",
        points: [
          { label: "役割", value: "ビルド・テストの実行（コンパイル・単体テスト・パッケージング）" },
          { label: "向いている用途", value: "Dockerfile のビルド、テスト自動化、成果物の生成" },
          { label: "キーワード", value: "「コードをビルドしてテストしたい」「CI を自動化したい」" },
          { label: "特徴", value: "buildspec.yml でビルド手順を定義、分単位の課金" },
        ],
      },
      {
        name: "CodeDeploy",
        summary: "EC2・Lambda・ECS へアプリケーションをデプロイするサービスです。",
        points: [
          { label: "役割", value: "EC2 / Lambda / ECS へのアプリケーションデプロイ自動化" },
          { label: "向いている用途", value: "ブルーグリーンデプロイ、ローリングアップデート" },
          { label: "キーワード", value: "「ダウンタイムなしでデプロイしたい」「段階的なリリース」" },
          { label: "特徴", value: "appspec.yml でデプロイ手順とライフサイクルフックを定義" },
        ],
      },
      {
        name: "CodePipeline",
        summary: "ソース→ビルド→テスト→デプロイの一連のフローを自動化するオーケストレーターです。",
        points: [
          { label: "役割", value: "CI/CD パイプライン全体のオーケストレーション" },
          { label: "向いている用途", value: "CodeCommit/Build/Deploy を組み合わせたパイプライン構築" },
          { label: "キーワード", value: "「コードプッシュから自動デプロイまでを一貫して管理したい」" },
          { label: "特徴", value: "各ステージに GitHub・S3・CodeBuild・CodeDeploy などを柔軟に接続" },
        ],
      },
    ],
    examTip:
      "「ソース管理」→ CodeCommit、「ビルド・テスト」→ CodeBuild、「デプロイ」→ CodeDeploy、「パイプライン全体の自動化」→ CodePipeline と役割で対応付けます。試験では組み合わせの正誤を問う形式が多いです。",
    conclusion:
      "それぞれが独立したサービスであり、CodePipeline がオーケストレーターとして全体を繋ぐ構成が典型パターンです。",
  },
  {
    id: "dynamodb-vs-elasticache",
    title: "DynamoDB vs ElastiCache",
    category: "データベース",
    summary:
      "永続化が必要な高速ストレージか、DB の読み取り負荷を下げる一時キャッシュかで使い分けます。",
    services: [
      {
        name: "DynamoDB",
        summary: "ミリ秒単位の低レイテンシーと高い耐久性を両立する NoSQL データベースです。",
        points: [
          { label: "データ永続性", value: "永続化（3 AZ に自動レプリケーション）" },
          { label: "レイテンシー", value: "ミリ秒レベル（DAX 併用でマイクロ秒も可能）" },
          { label: "向いている用途", value: "セッション管理、ゲームスコア、IoT、カタログデータ" },
          { label: "キーワード", value: "「データを永続化しながら高速に読み書きしたい」" },
        ],
      },
      {
        name: "ElastiCache",
        summary: "インメモリでデータをキャッシュして DB クエリを削減する高速キャッシュです。",
        points: [
          { label: "データ永続性", value: "基本は一時的（Redis は永続化オプションあり）" },
          { label: "レイテンシー", value: "マイクロ秒レベル" },
          { label: "向いている用途", value: "DB 読み取りキャッシュ、セッションストア、リーダーボード" },
          { label: "キーワード", value: "「同じ DB クエリが繰り返し実行されて負荷が高い」" },
        ],
      },
    ],
    examTip:
      "「データを永続化しながら低レイテンシーで扱いたい」→ DynamoDB、「既存 DB の読み取り負荷を下げて高速化したい」→ ElastiCache と永続化の要否で判断します。",
    conclusion:
      "新規の高速ストレージなら DynamoDB、既存 DB のフロントキャッシュなら ElastiCache を選びます。",
  },
  {
    id: "api-gateway-types",
    title: "API Gateway REST API vs HTTP API vs WebSocket API",
    category: "アプリ統合",
    summary:
      "機能の豊富さとコスト・レイテンシーのトレードオフ、またはリアルタイム双方向通信の要否で選択します。",
    services: [
      {
        name: "REST API",
        summary: "API Gateway の全機能を使えるが、HTTP API より高コストの従来型 API です。",
        points: [
          { label: "機能", value: "使用量プラン・API キー・リソースポリシー・WAF 統合など全機能" },
          { label: "向いている用途", value: "きめ細かいアクセス制御、API キー管理、企業向け API" },
          { label: "コスト・性能", value: "HTTP API より高価で遅い（最大 30 秒タイムアウト）" },
          { label: "キーワード", value: "「API キー管理」「使用量プラン（スロットリング）」「WAF で保護」" },
        ],
      },
      {
        name: "HTTP API",
        summary: "シンプルで高速・低コストなモダン API です。",
        points: [
          { label: "機能", value: "JWT 認証・Lambda 統合・CORS・ルーティングに特化" },
          { label: "向いている用途", value: "Lambda バックエンド、シンプルな RESTful API、低コスト重視" },
          { label: "コスト・性能", value: "REST API より最大 71% 安価でレイテンシーも低い" },
          { label: "キーワード", value: "「シンプルな Lambda バックエンド」「コストを抑えたい」" },
        ],
      },
      {
        name: "WebSocket API",
        summary: "クライアントとサーバーの双方向リアルタイム通信を実現する API です。",
        points: [
          { label: "機能", value: "持続的な接続を管理し、サーバーからクライアントへもプッシュ可能" },
          { label: "向いている用途", value: "チャット、リアルタイム通知、ゲーム、株価ストリーミング" },
          { label: "コスト・性能", value: "接続数とメッセージ数で課金" },
          { label: "キーワード", value: "「リアルタイム双方向通信」「サーバーからプッシュしたい」" },
        ],
      },
    ],
    examTip:
      "「API キー・使用量プランなど高度な管理が必要」→ REST API、「シンプルで安い Lambda バックエンド」→ HTTP API、「リアルタイム双方向通信」→ WebSocket API と要件で判断します。",
    conclusion:
      "高度な制御が不要なら HTTP API（コスト最小）、きめ細かいアクセス制御は REST API、双方向通信は WebSocket API です。",
  },
  {
    id: "redshift-vs-athena-vs-emr",
    title: "Redshift vs Athena vs EMR",
    category: "分析",
    summary:
      "データウェアハウスとして常時クエリするか、S3 に対してアドホック分析するか、カスタム分散処理が必要かで使い分けます。",
    services: [
      {
        name: "Redshift",
        summary: "ペタバイト規模のデータウェアハウスで定型・高速分析に向いています。",
        points: [
          { label: "仕組み", value: "列指向の MPP データウェアハウス、クラスターを事前プロビジョン" },
          { label: "向いている用途", value: "BI ツール連携、定期レポート、複雑な集計クエリ" },
          { label: "コスト特性", value: "クラスター稼働時間で課金。常時クエリするなら費用対効果が高い" },
          { label: "キーワード", value: "「大規模 DWH」「BI ツールから高速クエリ」「JDBC/ODBC 接続」" },
        ],
      },
      {
        name: "Athena",
        summary: "S3 に保存されたデータをサーバーレスで SQL クエリするサービスです。",
        points: [
          { label: "仕組み", value: "S3 データを直接クエリ（インフラ管理不要）" },
          { label: "向いている用途", value: "ログ分析、アドホック調査、データレイク上の分析" },
          { label: "コスト特性", value: "スキャンしたデータ量で課金（Parquet/ORC 形式でコスト削減）" },
          { label: "キーワード", value: "「S3 のデータをそのまま SQL で分析したい」「サーバーレス」" },
        ],
      },
      {
        name: "EMR",
        summary: "Hadoop・Spark などのフレームワークでカスタム分散処理を実行するサービスです。",
        points: [
          { label: "仕組み", value: "マネージド Hadoop/Spark クラスターで柔軟な分散処理" },
          { label: "向いている用途", value: "ML 前処理、ETL 処理、カスタムな大規模データ変換" },
          { label: "コスト特性", value: "クラスター稼働時間で課金。Spot インスタンス活用でコスト削減可" },
          { label: "キーワード", value: "「Spark/Hadoop を使いたい」「柔軟なカスタム分散処理」" },
        ],
      },
    ],
    examTip:
      "「DWH・定型 BI クエリ」→ Redshift、「S3 データのアドホック分析・サーバーレス」→ Athena、「Spark/Hadoop でカスタム ETL・ML 前処理」→ EMR と分析の目的と管理コストで判断します。",
    conclusion:
      "常時高速クエリするなら Redshift、S3 のアドホック分析なら Athena、カスタム分散処理なら EMR を選びます。",
  },
  {
    id: "iam-policy-types",
    title: "IAM Policy vs Resource Policy vs Permission Boundary",
    category: "セキュリティ",
    summary:
      "誰に権限を付けるか・リソース側で制御するか・付与できる権限の上限を設定するかで使い分けます。",
    services: [
      {
        name: "IAM Policy（アイデンティティベース）",
        summary: "IAM ユーザー・グループ・ロールにアタッチして、そのエンティティが「何をできるか」を定義します。",
        points: [
          { label: "アタッチ先", value: "IAM ユーザー・グループ・ロール" },
          { label: "制御の方向", value: "主体（誰が）→ リソース（何を）の方向で権限を付与" },
          { label: "向いている用途", value: "通常の権限管理、最小権限の原則の実装" },
          { label: "キーワード", value: "「このユーザーに S3 への読み取りを許可する」" },
        ],
      },
      {
        name: "Resource Policy（リソースベース）",
        summary: "S3・KMS・SQS などのリソース側にアタッチして、「誰からのアクセスを許可するか」を定義します。",
        points: [
          { label: "アタッチ先", value: "S3 バケット・KMS キー・SQS キュー・Lambda など" },
          { label: "制御の方向", value: "リソース側から特定のプリンシパルへのアクセスを許可" },
          { label: "向いている用途", value: "クロスアカウントアクセス、特定 IP からのみ許可" },
          { label: "キーワード", value: "「他のアカウントの Lambda から S3 にアクセスさせたい」" },
        ],
      },
      {
        name: "Permission Boundary",
        summary: "IAM エンティティが持てる権限の最大範囲を設定するガードレールです。",
        points: [
          { label: "役割", value: "権限の上限を定義（実際の権限は IAM Policy との AND 結果）" },
          { label: "向いている用途", value: "開発者が作成するロールの権限逸脱を防ぐ委任管理" },
          { label: "特徴", value: "Permission Boundary + IAM Policy の両方で Allow されないと実行不可" },
          { label: "キーワード", value: "「開発者がロールを作れるが Admin 権限は付与させたくない」" },
        ],
      },
    ],
    examTip:
      "「通常の権限付与」→ IAM Policy、「クロスアカウントや特定リソースへのアクセス制御」→ Resource Policy、「付与できる権限の上限設定」→ Permission Boundary と制御の目的で判断します。",
    conclusion:
      "3つは独立ではなく組み合わせて機能します。特に Permission Boundary は IAM Policy との AND 条件が重要です。",
  },
  {
    id: "snow-family",
    title: "Snowcone vs Snowball Edge vs Snowmobile",
    category: "移行",
    summary:
      "移行するデータ量と設置環境によって Snow ファミリーのデバイスを選択します。",
    services: [
      {
        name: "Snowcone",
        summary: "8〜14 TB の小型・軽量デバイスで、狭い場所やエッジ環境向けです。",
        points: [
          { label: "容量", value: "HDD: 8 TB、SSD: 14 TB" },
          { label: "形状・重量", value: "小型・約 2.1 kg、バッテリー動作も可能" },
          { label: "向いている用途", value: "エッジデータ収集、帯域の限られた遠隔地、少量データ転送" },
          { label: "キーワード", value: "「数 TB」「狭い場所」「持ち運びたい」" },
        ],
      },
      {
        name: "Snowball Edge",
        summary: "数十〜数百 TB の中規模データを転送できる標準デバイスです。",
        points: [
          { label: "容量", value: "Storage Optimized: 最大 210 TB、Compute Optimized: 最大 104 TB" },
          { label: "形状・重量", value: "スーツケースサイズ、クラスタリング対応（最大 16 台）" },
          { label: "向いている用途", value: "大規模 DC 移行、オフラインデータ転送、現地エッジコンピューティング" },
          { label: "キーワード", value: "「数十〜数百 TB」「大量データのオフライン転送」" },
        ],
      },
      {
        name: "Snowmobile",
        summary: "エクサバイト規模（最大 100 PB）の超大規模データセンター移行向けの輸送コンテナです。",
        points: [
          { label: "容量", value: "最大 100 PB（1 台のコンテナトラック）" },
          { label: "形状・重量", value: "大型コンテナトラック、AWS が専任チームと共に設置・回収" },
          { label: "向いている用途", value: "データセンター全体の AWS 移行、エクサバイト規模" },
          { label: "キーワード", value: "「100 PB 以上」「データセンターまるごと移行」" },
        ],
      },
    ],
    examTip:
      "「数 TB・エッジ・小型」→ Snowcone、「数十〜数百 TB・標準的なオフライン移行」→ Snowball Edge、「100 PB 以上・DC 丸ごと移行」→ Snowmobile とデータ量で判断します。ネットワーク転送が数週間〜数ヶ月かかる場合に Snow ファミリーが選ばれます。",
    conclusion:
      "データ量でそのまま選択します。Snowcone（数TB）→ Snowball Edge（数百TB）→ Snowmobile（100PB以上）の順です。",
  },
];
