import type { QuizQuestion } from "@/lib/quiz/types";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "storage-1",
    category: "Storage",
    modeLabel: "使い分け重視",
    prompt:
      "複数の Linux ベース EC2 インスタンスから同時にマウントでき、アプリケーション層で共有したいファイルストレージとして最も適切なサービスはどれですか。",
    context:
      "複数台の EC2 で同じファイルを共有したいケースです。オブジェクト保存ではなく、マウントして使う前提で考えます。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "Amazon S3", hint: "オブジェクトストレージ" },
      { id: "b", label: "B", text: "Amazon EBS", hint: "単一 EC2 に近いブロックストレージ" },
      { id: "c", label: "C", text: "Amazon EFS", hint: "複数 EC2 から共有できるファイルストレージ" },
      {
        id: "d",
        label: "D",
        text: "Amazon FSx for Windows File Server",
        hint: "Windows ワークロード向けの共有ファイルストレージ",
      },
    ],
    explanation:
      "EFS は複数の Linux ベース EC2 から同時に利用できるマネージドファイルストレージです。S3 はオブジェクトストレージ、EBS は基本的に単一インスタンス向けのブロックストレージなので要件に合いません。",
    comparePoint:
      "EBS は 1 台の EC2 に近い用途、EFS は複数台で共有するファイル用途、S3 は API ベースで扱うオブジェクト用途です。",
    rememberAxis:
      "共有してマウントしたいなら EFS。1 台に近いブロック用途なら EBS。HTTP/API 前提の保存なら S3。",
  },
  {
    id: "network-1",
    category: "Networking",
    modeLabel: "設計判断",
    prompt:
      "複数リージョンに展開したアプリケーションへ、利用者を最も近いエンドポイントへ誘導したいです。まず選ぶべきサービスはどれですか。",
    context:
      "リージョン間の振り分けが必要です。アプリケーションロードバランサー単体ではリージョンをまたいだ判断はできません。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "Application Load Balancer", hint: "L7 の負荷分散" },
      { id: "b", label: "B", text: "Amazon Route 53", hint: "DNS レベルでルーティングできる" },
      { id: "c", label: "C", text: "AWS Direct Connect", hint: "専用線接続" },
      { id: "d", label: "D", text: "Amazon CloudFront", hint: "コンテンツ配信" },
    ],
    explanation:
      "Route 53 は DNS レベルでレイテンシーベースルーティングなどを提供し、複数リージョン間での誘導に向いています。ALB は各リージョン内での負荷分散には有効ですが、リージョン選択の役割ではありません。",
    comparePoint:
      "Route 53 はどこへ誘導するかを決める役割、Load Balancer は選ばれた先でどうさばくかを決める役割です。",
    rememberAxis:
      "入口で宛先リージョンを決めるなら Route 53。選ばれた先でトラフィックを振り分けるなら Load Balancer。",
  },
  {
    id: "database-1",
    category: "Database",
    modeLabel: "要件から選ぶ",
    prompt:
      "ミリ秒単位の応答が必要で、アクセス量の変動が大きいキーと値中心のアプリケーションに最も適したサービスはどれですか。",
    context:
      "スキーマ固定のリレーショナル処理よりも、スケールしやすいキーバリューアクセスを重視します。",
    correctChoiceId: "d",
    choices: [
      { id: "a", label: "A", text: "Amazon RDS for MySQL", hint: "リレーショナル DB" },
      { id: "b", label: "B", text: "Amazon Redshift", hint: "分析向けデータウェアハウス" },
      { id: "c", label: "C", text: "Amazon Aurora", hint: "高性能なリレーショナル DB" },
      { id: "d", label: "D", text: "Amazon DynamoDB", hint: "サーバーレス NoSQL" },
    ],
    explanation:
      "DynamoDB はサーバーレスな NoSQL データベースで、キーバリュー中心のアクセスと大きなスケール変動に向いています。RDS や Aurora はリレーショナル要件が強い場面で選びます。",
    comparePoint:
      "SQL や複雑な結合を重視するなら RDS/Aurora。キーバリュー中心で高いスケーラビリティを重視するなら DynamoDB。",
    rememberAxis:
      "アクセスパターンが先に決まっていて高速に捌きたいなら DynamoDB。関係性や SQL が重要なら RDS/Aurora。",
  },

  // ── Storage ──────────────────────────────────────────────────────────────

  {
    id: "storage-2",
    category: "Storage",
    modeLabel: "使い分け重視",
    prompt:
      "S3 バケットに保存されたオブジェクトを、作成から 30 日後に低頻度アクセス層へ、90 日後に削除したい。最も適切な設定はどれですか。",
    context:
      "コストを最小化しながら自動で移動・削除する仕組みが必要です。手動運用は考えません。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "S3 バージョニングを有効化する", hint: "オブジェクトの変更履歴管理" },
      { id: "b", label: "B", text: "S3 ライフサイクルルールを設定する", hint: "自動でストレージクラス移行や削除ができる" },
      { id: "c", label: "C", text: "S3 レプリケーションを設定する", hint: "別バケットへのコピー" },
      { id: "d", label: "D", text: "S3 イベント通知で Lambda を呼び出す", hint: "任意の処理を自動実行" },
    ],
    explanation:
      "S3 ライフサイクルルールを使うと、経過日数に応じてストレージクラスを自動移行したり、オブジェクトを自動削除したりできます。コスト最適化の基本設定です。",
    comparePoint:
      "ライフサイクルルールは時間経過によるコスト最適化。レプリケーションは可用性・DR目的。バージョニングは変更履歴の保護が目的。",
    rememberAxis:
      "時間が経つにつれてコストを下げたい → ライフサイクル。データを守りたい → バージョニング。別リージョンにコピー → レプリケーション。",
  },
  {
    id: "storage-3",
    category: "Storage",
    modeLabel: "使い分け重視",
    prompt:
      "EC2 インスタンスを停止・終了してもデータを保持し続けたいブロックストレージはどれですか。",
    context:
      "インスタンスストアはエフェメラルなためデータが消えます。永続化できるサービスを選んでください。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "インスタンスストア", hint: "インスタンス停止でデータが消える一時ストレージ" },
      { id: "b", label: "B", text: "Amazon S3", hint: "オブジェクトストレージ（マウント不可）" },
      { id: "c", label: "C", text: "Amazon EBS", hint: "EC2 とは独立して永続するブロックストレージ" },
      { id: "d", label: "D", text: "Amazon EFS", hint: "複数 EC2 で共有するファイルストレージ" },
    ],
    explanation:
      "EBS ボリュームはインスタンスのライフサイクルとは独立して存在し、停止・終了後もデータを保持します（DeleteOnTermination を false に設定した場合）。インスタンスストアは再起動以外でデータが失われます。",
    comparePoint:
      "インスタンスストアは高速だが揮発性。EBS は永続性があり、スナップショットでバックアップも可能。",
    rememberAxis:
      "再起動しかしない一時キャッシュ → インスタンスストア。停止・終了しても残したい → EBS。",
  },
  {
    id: "storage-4",
    category: "Storage",
    modeLabel: "コスト最適化",
    prompt:
      "アクセス頻度は低いが即時取得が必要なデータを保存するとき、S3 Standard より安く、Glacier より早いストレージクラスはどれですか。",
    context:
      "取得に数時間かかる Glacier は要件を満たしません。ミリ秒単位でアクセスできるクラスから選んでください。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "S3 Standard", hint: "標準クラス・高頻度アクセス向け" },
      { id: "b", label: "B", text: "S3 Standard-IA", hint: "低頻度アクセス向け・即時取得可能" },
      { id: "c", label: "C", text: "S3 Glacier Flexible Retrieval", hint: "数分〜数時間の取得時間" },
      { id: "d", label: "D", text: "S3 Glacier Deep Archive", hint: "最低コスト・取得に12時間以上" },
    ],
    explanation:
      "S3 Standard-IA（Infrequent Access）はアクセス頻度が低いデータ向けで、ミリ秒単位の即時取得が可能です。Standard より保存コストが安い代わりに、取得ごとに料金が発生します。",
    comparePoint:
      "Standard：高頻度。Standard-IA：低頻度だが即時。Glacier：アーカイブ・取得遅延あり。Deep Archive：最安・最低速。",
    rememberAxis:
      "即時取得が必要で頻度が低い → Standard-IA。取得遅延を許容できるアーカイブ → Glacier。",
  },
  {
    id: "storage-5",
    category: "Storage",
    modeLabel: "設計判断",
    prompt:
      "オンプレミスのファイルサーバーを AWS に移行し、Windows ベースのアプリケーションから SMB プロトコルでアクセスしたい。最適なサービスはどれですか。",
    context:
      "Linux の NFS ではなく、Windows の SMB プロトコルが必要です。",
    correctChoiceId: "d",
    choices: [
      { id: "a", label: "A", text: "Amazon EFS", hint: "Linux/NFS 向けマネージドファイルストレージ" },
      { id: "b", label: "B", text: "Amazon S3", hint: "オブジェクトストレージ" },
      { id: "c", label: "C", text: "Amazon EBS", hint: "ブロックストレージ" },
      { id: "d", label: "D", text: "Amazon FSx for Windows File Server", hint: "SMB 対応のマネージドファイルストレージ" },
    ],
    explanation:
      "FSx for Windows File Server は SMB プロトコルをサポートし、Windows ベースのワークロードに最適です。EFS は NFS ベースで Linux 向けです。",
    comparePoint:
      "EFS は Linux/NFS。FSx for Windows は Windows/SMB。FSx for Lustre はHPC/機械学習の高スループット向け。",
    rememberAxis:
      "Linux で共有 → EFS。Windows/SMB で共有 → FSx for Windows。",
  },
  {
    id: "storage-6",
    category: "Storage",
    modeLabel: "使い分け重視",
    prompt:
      "S3 バケットへのアクセスを特定の VPC 内からのみ許可したい。最も適切な方法はどれですか。",
    context:
      "インターネット経由のアクセスを遮断し、AWS ネットワーク内だけで通信を完結させたいケースです。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "VPC エンドポイント（Gateway 型）を作成し、バケットポリシーで VPC を制限する", hint: "VPC 内からプライベートに S3 へアクセス" },
      { id: "b", label: "B", text: "S3 パブリックアクセスをすべてブロックする", hint: "インターネットからのアクセスを遮断するが VPC 制限ではない" },
      { id: "c", label: "C", text: "S3 Transfer Acceleration を有効化する", hint: "アップロード高速化の機能" },
      { id: "d", label: "D", text: "CloudFront で S3 の前段に置く", hint: "CDN によるコンテンツ配信" },
    ],
    explanation:
      "S3 用の Gateway 型 VPC エンドポイントを作成すると、インターネットを経由せず VPC 内から S3 へアクセスできます。バケットポリシーと組み合わせて特定 VPC からのみ許可できます。",
    comparePoint:
      "VPC エンドポイントはプライベート通信。パブリックアクセスブロックはインターネット全体の遮断。目的が異なります。",
    rememberAxis:
      "VPC 内からだけアクセスしたい → VPC エンドポイント + バケットポリシー。",
  },
  {
    id: "storage-7",
    category: "Storage",
    modeLabel: "要件から選ぶ",
    prompt:
      "大量の小さなファイルを高速に読み書きする HPC（高性能コンピューティング）ワークロード向けに最適なストレージはどれですか。",
    context:
      "数十万 IOPS レベルの高スループットが必要で、並列アクセスを前提とします。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "Amazon S3", hint: "オブジェクトストレージ" },
      { id: "b", label: "B", text: "Amazon EFS", hint: "汎用マネージドファイルストレージ" },
      { id: "c", label: "C", text: "Amazon FSx for Lustre", hint: "HPC 向け高スループットファイルシステム" },
      { id: "d", label: "D", text: "Amazon EBS io2", hint: "高 IOPS のブロックストレージ（単一インスタンス向け）" },
    ],
    explanation:
      "FSx for Lustre は HPC や機械学習ワークロード向けの高スループットなファイルシステムです。S3 と連携して大規模データを高速処理できます。EBS io2 は高 IOPS ですが単一インスタンス向けです。",
    comparePoint:
      "EFS は汎用共有。FSx for Lustre は HPC/ML の高スループット用途。EBS は単一インスタンスのブロック用途。",
    rememberAxis:
      "HPC・機械学習・大規模並列処理 → FSx for Lustre。一般的なファイル共有 → EFS。",
  },
  {
    id: "storage-8",
    category: "Storage",
    modeLabel: "コスト最適化",
    prompt:
      "S3 に保存されたオブジェクトのアクセスパターンが予測できない場合、自動でコスト最適なストレージクラスに移行してくれるクラスはどれですか。",
    context:
      "手動でライフサイクルポリシーを設定することなく、アクセス頻度に応じて自動最適化したいケースです。",
    correctChoiceId: "d",
    choices: [
      { id: "a", label: "A", text: "S3 Standard", hint: "高頻度アクセス向け固定クラス" },
      { id: "b", label: "B", text: "S3 Standard-IA", hint: "低頻度アクセス固定クラス" },
      { id: "c", label: "C", text: "S3 One Zone-IA", hint: "単一 AZ の低頻度アクセスクラス" },
      { id: "d", label: "D", text: "S3 Intelligent-Tiering", hint: "アクセス頻度に応じて自動でティアを移動" },
    ],
    explanation:
      "S3 Intelligent-Tiering はアクセスパターンを監視し、30 日間アクセスがないオブジェクトを自動で低頻度アクセス層に移動します。予測困難なアクセスパターンに最適です。",
    comparePoint:
      "Intelligent-Tiering は自動最適化。Standard-IA は手動で低頻度と判断したデータ向け。用途に応じて使い分けます。",
    rememberAxis:
      "アクセスパターンが読めない → Intelligent-Tiering。パターンが明確 → 手動でクラス指定。",
  },
  {
    id: "storage-9",
    category: "Storage",
    modeLabel: "設計判断",
    prompt:
      "S3 バケット内のオブジェクトが誤って削除・上書きされないよう保護したい。最も適切な設定はどれですか。",
    context:
      "オペレーションミスや悪意ある操作からデータを保護します。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "S3 Transfer Acceleration を有効化する", hint: "高速アップロードの機能" },
      { id: "b", label: "B", text: "S3 バージョニングを有効化する", hint: "全バージョンを保持し誤削除・上書きから保護" },
      { id: "c", label: "C", text: "S3 ライフサイクルルールを設定する", hint: "自動移行・削除の設定" },
      { id: "d", label: "D", text: "S3 クロスリージョンレプリケーションを設定する", hint: "別リージョンへのコピー" },
    ],
    explanation:
      "S3 バージョニングを有効化すると、オブジェクトの全バージョンが保持されます。誤って削除した場合は削除マーカーを除去することで復元でき、上書きされた場合も旧バージョンに戻せます。",
    comparePoint:
      "バージョニングは誤操作からの保護。レプリケーションは DR・可用性向上。目的が異なります。",
    rememberAxis:
      "誤削除・誤上書きから守りたい → バージョニング。別リージョンに冗長化 → レプリケーション。",
  },
  {
    id: "storage-10",
    category: "Storage",
    modeLabel: "要件から選ぶ",
    prompt:
      "オンプレミスのデータセンターから大量のデータ（100 TB 超）を AWS S3 へ移行したい。インターネット帯域が限られている場合、最も適切なサービスはどれですか。",
    context:
      "ネットワーク転送に数ヶ月かかる見込みです。物理デバイスを使った移行方法を検討しています。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "AWS DataSync", hint: "ネットワーク経由のデータ転送サービス" },
      { id: "b", label: "B", text: "S3 Transfer Acceleration", hint: "CloudFront を使った高速アップロード" },
      { id: "c", label: "C", text: "AWS Snowball Edge", hint: "物理デバイスでオフライン転送" },
      { id: "d", label: "D", text: "AWS Direct Connect", hint: "専用線によるネットワーク接続" },
    ],
    explanation:
      "Snowball Edge は物理デバイスに大量のデータをロードして AWS へ配送する移行サービスです。帯域が限られた環境で 10 TB〜100 TB 超のデータ移行に適しています。DataSync はネットワーク経由なので帯域不足の環境では時間がかかります。",
    comparePoint:
      "物理デバイス転送 → Snowball。ネットワーク経由の同期 → DataSync。専用線で継続接続 → Direct Connect。",
    rememberAxis:
      "帯域不足で大容量移行 → Snowball/Snowmobile。継続的なオンライン同期 → DataSync。",
  },
  {
    id: "storage-11",
    category: "Storage",
    modeLabel: "設計判断",
    prompt:
      "規制要件として S3 オブジェクトを一定期間削除・変更できないようにロックしたい。最も適切な機能はどれですか。",
    context:
      "金融・医療業界のコンプライアンス要件として、WORM（Write Once Read Many）モデルが求められています。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "S3 Object Lock（Compliance モード）", hint: "保持期間中は誰も削除・変更できない" },
      { id: "b", label: "B", text: "S3 バージョニング", hint: "変更履歴を保持するが削除は可能" },
      { id: "c", label: "C", text: "S3 バケットポリシーで DELETE を拒否", hint: "ポリシーは管理者が変更できる" },
      { id: "d", label: "D", text: "S3 MFA Delete", hint: "削除に MFA 認証を要求" },
    ],
    explanation:
      "S3 Object Lock の Compliance モードは、保持期間中はルートユーザーを含む誰もオブジェクトを削除・変更できません。WORM 要件を持つ規制対応に最適です。Governance モードは一部の権限を持つユーザーが例外的に変更可能です。",
    comparePoint:
      "Compliance モード：誰も変更不可。Governance モード：特権ユーザーは変更可。MFA Delete：削除時に MFA を要求するが権限があれば削除可能。",
    rememberAxis:
      "絶対に削除できないようにしたい（規制対応）→ Object Lock Compliance。削除に承認フローを加えたい → MFA Delete。",
  },

  // ── Compute ──────────────────────────────────────────────────────────────

  {
    id: "compute-1",
    category: "Compute",
    modeLabel: "使い分け重視",
    prompt:
      "イベント発生時のみコードを実行し、サーバー管理が不要で、実行時間が短い処理に最も適したサービスはどれですか。",
    context:
      "常時稼働のサーバーを持たず、使った分だけ課金されるモデルを想定します。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "Amazon EC2", hint: "仮想サーバー・常時起動" },
      { id: "b", label: "B", text: "AWS Lambda", hint: "サーバーレス関数実行・最大15分" },
      { id: "c", label: "C", text: "Amazon ECS on EC2", hint: "コンテナオーケストレーション（EC2 管理あり）" },
      { id: "d", label: "D", text: "AWS Elastic Beanstalk", hint: "アプリデプロイの自動化" },
    ],
    explanation:
      "Lambda はサーバーレスでイベント駆動の関数実行サービスです。サーバー管理不要で、コードが実行された時間だけ課金されます。最大実行時間は 15 分です。",
    comparePoint:
      "Lambda：短時間・イベント駆動・サーバーレス。EC2：長時間・常時起動・フル制御。Fargate：コンテナのサーバーレス実行。",
    rememberAxis:
      "処理が短くイベント起動 → Lambda。長時間や常時稼働 → EC2/ECS。コンテナ管理なし → Fargate。",
  },
  {
    id: "compute-2",
    category: "Compute",
    modeLabel: "コスト最適化",
    prompt:
      "EC2 インスタンスを 1 年間継続して使用する予定があります。オンデマンドより大幅にコストを削減できる購入オプションはどれですか。",
    context:
      "使用量が安定しており、インスタンスタイプも決まっています。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "スポットインスタンス", hint: "最大 90% 削減だが中断される可能性あり" },
      { id: "b", label: "B", text: "オンデマンドインスタンス", hint: "標準料金・予約不要" },
      { id: "c", label: "C", text: "リザーブドインスタンス（1 年）", hint: "1 年または 3 年の予約で最大 72% 割引" },
      { id: "d", label: "D", text: "Dedicated Host", hint: "物理サーバー専有・ライセンス持ち込み向け" },
    ],
    explanation:
      "リザーブドインスタンスは 1 年または 3 年の使用を予約することでオンデマンドより最大 72% 安くなります。安定した継続利用に最適です。スポットインスタンスはさらに安いですが中断リスクがあります。",
    comparePoint:
      "オンデマンド：柔軟・標準料金。リザーブド：予約で割引・安定利用向け。スポット：最安値・中断リスクあり。",
    rememberAxis:
      "1 年以上確実に使う → リザーブド。中断してもいい処理 → スポット。短期・変動あり → オンデマンド。",
  },
  {
    id: "compute-3",
    category: "Compute",
    modeLabel: "設計判断",
    prompt:
      "Web アプリケーションのトラフィックが急増したとき、EC2 インスタンス数を自動で増減させたい。最も適切なサービスはどれですか。",
    context:
      "需要の変動に合わせて自動でキャパシティを調整し、コストも最適化したいです。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "EC2 Auto Scaling", hint: "負荷に応じてインスタンスを自動増減" },
      { id: "b", label: "B", text: "Elastic Load Balancing", hint: "トラフィックを複数インスタンスに分散" },
      { id: "c", label: "C", text: "AWS CloudFormation", hint: "インフラのコード化・プロビジョニング" },
      { id: "d", label: "D", text: "Amazon CloudWatch", hint: "監視・メトリクス収集" },
    ],
    explanation:
      "EC2 Auto Scaling は CPU 使用率などのメトリクスに基づいてインスタンスを自動で追加・削除します。ELB と組み合わせると、スケール後に自動でトラフィックが分散されます。",
    comparePoint:
      "Auto Scaling：インスタンス数の増減。ELB：既存インスタンスへのトラフィック分散。両者は組み合わせて使うのが基本。",
    rememberAxis:
      "インスタンス数を増やしたい → Auto Scaling。トラフィックを振り分けたい → ELB。両方必要な場合は組み合わせる。",
  },
  {
    id: "compute-4",
    category: "Compute",
    modeLabel: "要件から選ぶ",
    prompt:
      "コンテナ化されたアプリケーションをサーバー管理なしで実行したい。最も適切なサービスはどれですか。",
    context:
      "EC2 の管理コストをなくし、コンテナに集中したいケースです。",
    correctChoiceId: "d",
    choices: [
      { id: "a", label: "A", text: "Amazon EC2", hint: "仮想サーバー" },
      { id: "b", label: "B", text: "AWS Lambda", hint: "関数単位のサーバーレス（コンテナ定義とは別）" },
      { id: "c", label: "C", text: "Amazon ECS on EC2", hint: "コンテナ実行だが EC2 の管理が必要" },
      { id: "d", label: "D", text: "AWS Fargate", hint: "サーバーレスのコンテナ実行環境" },
    ],
    explanation:
      "Fargate は ECS または EKS 上でコンテナをサーバーレスで実行できます。EC2 インスタンスのプロビジョニング・管理が不要で、コンテナのリソース定義だけに集中できます。",
    comparePoint:
      "ECS on EC2：コンテナ管理は AWS、インフラ管理は自分。ECS on Fargate：コンテナもインフラも AWS 管理。",
    rememberAxis:
      "コンテナをサーバーレスで → Fargate。EC2 を自分で管理しつつコンテナ → ECS on EC2。",
  },
  {
    id: "compute-5",
    category: "Compute",
    modeLabel: "使い分け重視",
    prompt:
      "機械学習の推論処理など、GPU を必要とするワークロードに対応した EC2 インスタンスファミリーはどれですか。",
    context:
      "一般的な汎用インスタンスでは GPU を利用できません。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "M シリーズ（例：m5）", hint: "汎用バランス型" },
      { id: "b", label: "B", text: "P シリーズ（例：p3）", hint: "GPU 搭載・機械学習・HPC 向け" },
      { id: "c", label: "C", text: "C シリーズ（例：c5）", hint: "コンピューティング最適化" },
      { id: "d", label: "D", text: "R シリーズ（例：r5）", hint: "メモリ最適化" },
    ],
    explanation:
      "P シリーズインスタンスは NVIDIA GPU を搭載しており、機械学習のトレーニング・推論や HPC ワークロードに適しています。G シリーズはグラフィック処理向けです。",
    comparePoint:
      "P シリーズ：機械学習・HPC。G シリーズ：グラフィック・ゲームサーバー。C シリーズ：CPU 集約処理。R シリーズ：大容量メモリ。",
    rememberAxis:
      "GPU が必要 → P シリーズ（ML）または G シリーズ（グラフィック）。CPU 集約 → C シリーズ。メモリ集約 → R シリーズ。",
  },
  {
    id: "compute-6",
    category: "Compute",
    modeLabel: "コスト最適化",
    prompt:
      "バッチ処理や CI ジョブなど、中断されても再実行できるワークロードに最もコスト効率の良い EC2 購入オプションはどれですか。",
    context:
      "中断リスクを許容できるかどうかが判断のポイントです。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "スポットインスタンス", hint: "余剰キャパシティを最大 90% 割引で利用・中断あり" },
      { id: "b", label: "B", text: "オンデマンドインスタンス", hint: "標準料金・予約不要" },
      { id: "c", label: "C", text: "リザーブドインスタンス", hint: "予約割引・継続利用向け" },
      { id: "d", label: "D", text: "Dedicated Instance", hint: "専有ハードウェアで実行" },
    ],
    explanation:
      "スポットインスタンスは AWS の余剰キャパシティをオンデマンドの最大 90% 割引で利用できます。AWS が容量を回収する際に 2 分前通知で中断されますが、再実行可能なバッチ処理に最適です。",
    comparePoint:
      "スポット：最安・中断リスクあり。オンデマンド：柔軟・標準料金。リザーブド：予約割引・安定稼働向け。",
    rememberAxis:
      "中断 OK の処理 → スポット。中断 NG の重要処理 → オンデマンドまたはリザーブド。",
  },
  {
    id: "compute-7",
    category: "Compute",
    modeLabel: "設計判断",
    prompt:
      "Lambda 関数がデータベースに接続する際、毎回接続を確立するオーバーヘッドを減らしたい。最も適切なサービスはどれですか。",
    context:
      "Lambda のコールドスタートや短命な実行サイクルによるデータベース接続数の枯渇も問題になっています。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "Amazon RDS のマルチ AZ を有効化する", hint: "高可用性のための設定" },
      { id: "b", label: "B", text: "Lambda のメモリを増やす", hint: "実行速度を上げる設定" },
      { id: "c", label: "C", text: "Amazon RDS Proxy を使用する", hint: "DB 接続プールを管理するプロキシ" },
      { id: "d", label: "D", text: "Lambda の同時実行数を制限する", hint: "スロットリングの設定" },
    ],
    explanation:
      "RDS Proxy は Lambda などのサーバーレス環境からのデータベース接続をプールして管理します。毎回の接続確立コストを減らし、DB の最大接続数超過を防ぎます。",
    comparePoint:
      "RDS Proxy：接続プールで効率化。マルチ AZ：フェイルオーバーによる高可用性。目的が異なります。",
    rememberAxis:
      "Lambda + RDS で接続数・オーバーヘッドが問題 → RDS Proxy。DB の可用性を高めたい → マルチ AZ。",
  },
  {
    id: "compute-8",
    category: "Compute",
    modeLabel: "要件から選ぶ",
    prompt:
      "既存の Docker イメージを使って Kubernetes クラスターを AWS 上でマネージドに運用したい。最も適切なサービスはどれですか。",
    context:
      "Kubernetes のコントロールプレーンの管理をなくしたいケースです。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "Amazon ECS", hint: "AWS 独自のコンテナオーケストレーター" },
      { id: "b", label: "B", text: "Amazon EKS", hint: "マネージド Kubernetes サービス" },
      { id: "c", label: "C", text: "AWS Batch", hint: "バッチコンピューティングサービス" },
      { id: "d", label: "D", text: "AWS Lambda", hint: "サーバーレス関数実行" },
    ],
    explanation:
      "EKS（Elastic Kubernetes Service）はマネージドな Kubernetes コントロールプレーンを提供します。既存の Kubernetes ワークロードをそのまま移行でき、コントロールプレーンの管理が不要です。",
    comparePoint:
      "ECS：AWS 独自オーケストレーター（Kubernetes 不要）。EKS：Kubernetes 互換（既存資産を活かせる）。",
    rememberAxis:
      "Kubernetes を使いたい → EKS。Kubernetes にこだわりがなければ → ECS の方がシンプル。",
  },
  {
    id: "compute-9",
    category: "Compute",
    modeLabel: "設計判断",
    prompt:
      "EC2 インスタンスのメンテナンスウィンドウ中、接続中のユーザーに影響を与えずにアプリを更新したい。どの構成が最適ですか。",
    context:
      "1 台構成ではダウンタイムが発生します。無停止デプロイを実現する構成を考えます。",
    correctChoiceId: "d",
    choices: [
      { id: "a", label: "A", text: "単一 EC2 インスタンスでインプレース更新する", hint: "シンプルだがダウンタイムあり" },
      { id: "b", label: "B", text: "EC2 のスナップショットを取って新しいインスタンスを起動する", hint: "手動で切り替えが必要" },
      { id: "c", label: "C", text: "CloudFormation でスタックを更新する", hint: "インフラ変更の管理" },
      { id: "d", label: "D", text: "ALB + Auto Scaling でローリングデプロイを実施する", hint: "インスタンスを順番に入れ替えてダウンタイムゼロ" },
    ],
    explanation:
      "ALB（Application Load Balancer）と Auto Scaling を組み合わせたローリングデプロイでは、古いインスタンスを順番に新しいものに置き換えます。ユーザーへの影響なく無停止でデプロイできます。",
    comparePoint:
      "ローリングデプロイ：一部ずつ切り替え。ブルーグリーンデプロイ：新旧環境を並列に用意して一括切り替え。両者はトレードオフがある。",
    rememberAxis:
      "無停止で更新 → ローリング（ALB + Auto Scaling）またはブルーグリーン。シンプルに更新 → インプレース（ダウンタイムあり）。",
  },
  {
    id: "compute-10",
    category: "Compute",
    modeLabel: "使い分け重視",
    prompt:
      "Lambda 関数の実行時間がタイムアウト（15 分）を超える長時間バッチ処理を移行したい。最も適切なサービスはどれですか。",
    context:
      "Lambda の 15 分制限を超えるジョブです。サーバー管理は最小化したいです。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "Lambda の設定でタイムアウトを延ばす", hint: "Lambda の上限は 15 分" },
      { id: "b", label: "B", text: "AWS Step Functions で Lambda を連鎖させる", hint: "ステートマシンで処理を分割" },
      { id: "c", label: "C", text: "AWS Batch", hint: "長時間・大規模バッチ処理向けマネージドサービス" },
      { id: "d", label: "D", text: "Amazon EC2 を常時起動して処理する", hint: "サーバー管理が必要" },
    ],
    explanation:
      "AWS Batch はバッチコンピューティングジョブを管理するサービスです。ジョブキューと実行環境を自動管理し、Lambda の 15 分制限を超える長時間処理に対応します。Fargate または EC2 上で実行でき、サーバー管理を最小化できます。",
    comparePoint:
      "Lambda：15 分以内の短時間処理。AWS Batch：15 分超の長時間バッチ。Step Functions：複数 Lambda の連鎖・ワークフロー管理。",
    rememberAxis:
      "15 分超のバッチ → AWS Batch。処理を分割して管理 → Step Functions。15 分以内のイベント処理 → Lambda。",
  },

  // ── Networking ───────────────────────────────────────────────────────────

  {
    id: "network-2",
    category: "Networking",
    modeLabel: "設計判断",
    prompt:
      "VPC 内のプライベートサブネットに配置した EC2 インスタンスがインターネットへアクセスしたい（インバウンドは不要）。最も適切な構成はどれですか。",
    context:
      "外部からの直接アクセスは許可せず、アウトバウンドのみ必要なケースです。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "インターネットゲートウェイ（IGW）を直接アタッチする", hint: "パブリックサブネット向け・インバウンドも許可される" },
      { id: "b", label: "B", text: "NAT ゲートウェイをパブリックサブネットに配置する", hint: "アウトバウンドのみ許可・インバウンドは不可" },
      { id: "c", label: "C", text: "VPC ピアリングを設定する", hint: "VPC 間の通信" },
      { id: "d", label: "D", text: "AWS PrivateLink を使用する", hint: "プライベートな AWS サービス接続" },
    ],
    explanation:
      "NAT ゲートウェイはプライベートサブネットの EC2 がインターネットへアウトバウンド通信できるようにしますが、インターネットからのインバウンド通信は許可しません。IGW を直接使うとパブリック IP が必要でインバウンドも開いてしまいます。",
    comparePoint:
      "IGW：パブリックサブネット用・双方向通信。NAT GW：プライベートサブネット用・アウトバウンドのみ。",
    rememberAxis:
      "プライベートからの外部通信（アウトバウンドのみ）→ NAT GW。パブリックに公開する → IGW。",
  },
  {
    id: "network-3",
    category: "Networking",
    modeLabel: "使い分け重視",
    prompt:
      "HTTP/HTTPS リクエストをパスやホスト名に基づいて複数のバックエンドに振り分けたい。最も適切なロードバランサーはどれですか。",
    context:
      "L7（アプリケーション層）のルーティングが必要なケースです。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "Application Load Balancer（ALB）", hint: "L7・パス/ホストベースルーティング" },
      { id: "b", label: "B", text: "Network Load Balancer（NLB）", hint: "L4・TCP/UDP・超低レイテンシ" },
      { id: "c", label: "C", text: "Classic Load Balancer（CLB）", hint: "旧世代・推奨されない" },
      { id: "d", label: "D", text: "Gateway Load Balancer（GWLB）", hint: "仮想アプライアンスの分散" },
    ],
    explanation:
      "ALB は HTTP/HTTPS を理解する L7 ロードバランサーで、URL パスやホスト名に基づいたルーティングが可能です。マイクロサービスへのトラフィック振り分けによく使われます。",
    comparePoint:
      "ALB：L7・HTTP/HTTPS のコンテンツベースルーティング。NLB：L4・TCP/UDP の超低レイテンシ。GWLB：セキュリティアプライアンスの透過的挿入。",
    rememberAxis:
      "パス・ホストで振り分け → ALB。極低レイテンシ・TCP/UDP → NLB。ファイアウォール等の挿入 → GWLB。",
  },
  {
    id: "network-4",
    category: "Networking",
    modeLabel: "設計判断",
    prompt:
      "2 つの VPC 間でプライベートに通信したい。最もシンプルな方法はどれですか。",
    context:
      "インターネットを経由せず、AWS のネットワーク内で VPC 間を繋ぎます。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "AWS Direct Connect", hint: "オンプレミスと AWS の専用線接続" },
      { id: "b", label: "B", text: "AWS Site-to-Site VPN", hint: "インターネット経由の暗号化トンネル" },
      { id: "c", label: "C", text: "VPC ピアリング", hint: "2 つの VPC を直接接続" },
      { id: "d", label: "D", text: "AWS Transit Gateway", hint: "複数 VPC・オンプレの集中管理ハブ" },
    ],
    explanation:
      "VPC ピアリングは 2 つの VPC をプライベートに接続する最もシンプルな方法です。ただし、推移的なルーティング（A→B→C）はできません。多数の VPC を接続する場合は Transit Gateway が適しています。",
    comparePoint:
      "VPC ピアリング：2 VPC のシンプルな接続（推移的ルーティング不可）。Transit Gateway：多数の VPC を集中管理（推移的ルーティング可）。",
    rememberAxis:
      "2 VPC をシンプルに繋ぐ → VPC ピアリング。多数の VPC を効率よく管理 → Transit Gateway。",
  },
  {
    id: "network-5",
    category: "Networking",
    modeLabel: "設計判断",
    prompt:
      "オンプレミスのデータセンターと AWS VPC の間に、安全で低レイテンシの専用線接続を確立したい。最も適切なサービスはどれですか。",
    context:
      "インターネット経由の VPN より安定した帯域と低レイテンシが求められています。",
    correctChoiceId: "d",
    choices: [
      { id: "a", label: "A", text: "AWS Site-to-Site VPN", hint: "インターネット経由の暗号化トンネル・低コスト" },
      { id: "b", label: "B", text: "VPC ピアリング", hint: "VPC 間の接続（オンプレとは繋がらない）" },
      { id: "c", label: "C", text: "AWS Transit Gateway", hint: "複数 VPC の集中管理" },
      { id: "d", label: "D", text: "AWS Direct Connect", hint: "専用物理回線・安定帯域・低レイテンシ" },
    ],
    explanation:
      "Direct Connect はオンプレミスから AWS への専用物理回線です。インターネットを経由しないため、帯域が安定し低レイテンシを実現できます。初期コストは高いですが、大量データ転送では VPN よりコスト効率が良い場合があります。",
    comparePoint:
      "Direct Connect：専用線・安定・低レイテンシ・高コスト。Site-to-Site VPN：インターネット経由・低コスト・レイテンシ変動あり。",
    rememberAxis:
      "安定帯域・低レイテンシが必要 → Direct Connect。コスト重視・帯域変動許容 → Site-to-Site VPN。",
  },
  {
    id: "network-6",
    category: "Networking",
    modeLabel: "使い分け重視",
    prompt:
      "AWS 上の Web アプリケーションを DDoS 攻撃や一般的な Web 脆弱性（SQLインジェクション・XSS）から保護したい。最も適切なサービスはどれですか。",
    context:
      "ALB や CloudFront の前段にセキュリティ層を追加するケースです。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "Amazon GuardDuty", hint: "脅威検出・異常検知サービス" },
      { id: "b", label: "B", text: "AWS WAF", hint: "Web アプリケーションファイアウォール・L7 フィルタリング" },
      { id: "c", label: "C", text: "AWS Shield Standard", hint: "自動的に有効な DDoS 保護（L3/L4）" },
      { id: "d", label: "D", text: "Amazon Inspector", hint: "EC2・コンテナの脆弱性スキャン" },
    ],
    explanation:
      "AWS WAF は SQL インジェクションや XSS などの Web 攻撃を検出・ブロックする L7 ファイアウォールです。CloudFront や ALB にアタッチして使います。DDoS への追加保護には AWS Shield Advanced も組み合わせます。",
    comparePoint:
      "WAF：L7 の Web 攻撃フィルタリング。Shield：L3/L4 の DDoS 保護。GuardDuty：AWS 環境全体の脅威検出（ログ分析）。",
    rememberAxis:
      "SQL インジェクション・XSS のブロック → WAF。DDoS 対策 → Shield。異常検知・脅威ハンティング → GuardDuty。",
  },
  {
    id: "network-7",
    category: "Networking",
    modeLabel: "設計判断",
    prompt:
      "EC2 インスタンスへのインバウンドトラフィックを制御するために、ステートフルなファイアウォールルールを設定したい。最も適切なものはどれですか。",
    context:
      "リターントラフィックを自動で許可する「ステートフル」なフィルタリングが必要です。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "セキュリティグループ", hint: "インスタンスレベルのステートフルファイアウォール" },
      { id: "b", label: "B", text: "ネットワーク ACL（NACL）", hint: "サブネットレベルのステートレスファイアウォール" },
      { id: "c", label: "C", text: "ルートテーブル", hint: "トラフィックの経路設定" },
      { id: "d", label: "D", text: "Elastic IP", hint: "固定パブリック IP アドレス" },
    ],
    explanation:
      "セキュリティグループはインスタンスレベルで動作するステートフルなファイアウォールです。インバウンドを許可するとリターントラフィックは自動で許可されます。一方 NACL はサブネットレベルでステートレスなため、インバウンドとアウトバウンドを両方設定する必要があります。",
    comparePoint:
      "セキュリティグループ：インスタンスレベル・ステートフル。NACL：サブネットレベル・ステートレス。両者は多層防御として組み合わせることが多い。",
    rememberAxis:
      "インスタンスへのアクセス制御 → セキュリティグループ。サブネット全体の制御 → NACL。",
  },
  {
    id: "network-8",
    category: "Networking",
    modeLabel: "要件から選ぶ",
    prompt:
      "静的コンテンツと動的コンテンツを持つ Web サイトを、世界中のユーザーに低レイテンシで配信したい。最も適切なサービスはどれですか。",
    context:
      "エッジロケーションを活用したコンテンツ配信を検討しています。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "Amazon Route 53", hint: "DNS サービス" },
      { id: "b", label: "B", text: "Amazon S3 静的ウェブサイトホスティング", hint: "静的コンテンツのみ" },
      { id: "c", label: "C", text: "Amazon CloudFront", hint: "グローバル CDN・エッジキャッシュ" },
      { id: "d", label: "D", text: "AWS Global Accelerator", hint: "TCP/UDP の低レイテンシ・固定 IP" },
    ],
    explanation:
      "CloudFront は世界中のエッジロケーションでコンテンツをキャッシュする CDN サービスです。S3・ALB・EC2 などをオリジンとして設定でき、静的・動的コンテンツ両方の配信を高速化します。",
    comparePoint:
      "CloudFront：HTTP/HTTPS コンテンツの CDN。Global Accelerator：TCP/UDP の低レイテンシ・固定エニーキャスト IP。用途が異なります。",
    rememberAxis:
      "Web コンテンツをキャッシュしてグローバル配信 → CloudFront。TCP/UDP で固定 IP が必要 → Global Accelerator。",
  },
  {
    id: "network-9",
    category: "Networking",
    modeLabel: "設計判断",
    prompt:
      "複数の AWS アカウントや VPC からインターネットアクセスを集約し、一元管理したい。最も適切なサービスはどれですか。",
    context:
      "各 VPC に個別に NAT ゲートウェイを置くのではなく、集中管理したいケースです。",
    correctChoiceId: "d",
    choices: [
      { id: "a", label: "A", text: "VPC ピアリング", hint: "VPC 間の直接接続" },
      { id: "b", label: "B", text: "NAT ゲートウェイ（各 VPC）", hint: "分散管理・コスト増" },
      { id: "c", label: "C", text: "AWS Direct Connect", hint: "オンプレミスとの専用線" },
      { id: "d", label: "D", text: "AWS Transit Gateway", hint: "複数 VPC・アカウントの集中管理ハブ" },
    ],
    explanation:
      "Transit Gateway は複数の VPC やオンプレミス接続を一元管理するネットワークハブです。NAT ゲートウェイを共有する集中型インターネットアウトバウンドアーキテクチャにも使われます。",
    comparePoint:
      "VPC ピアリング：2 VPC のシンプル接続。Transit Gateway：多数の VPC・アカウントを集中管理・推移的ルーティング可能。",
    rememberAxis:
      "多数の VPC を効率よく管理 → Transit Gateway。シンプルな 2 VPC 接続 → ピアリング。",
  },
  {
    id: "network-10",
    category: "Networking",
    modeLabel: "使い分け重視",
    prompt:
      "Route 53 で EC2 インスタンスの障害を検知し、自動でトラフィックを別リージョンへ切り替えたい。最も適切なルーティングポリシーはどれですか。",
    context:
      "プライマリが正常なときはプライマリへ、障害時はセカンダリへ自動切り替えします。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "レイテンシーベースルーティング", hint: "最も応答が速いリージョンへ誘導" },
      { id: "b", label: "B", text: "フェイルオーバールーティング", hint: "プライマリ障害時にセカンダリへ自動切り替え" },
      { id: "c", label: "C", text: "加重ルーティング", hint: "設定した比率でトラフィックを分散" },
      { id: "d", label: "D", text: "地理的ルーティング", hint: "ユーザーの地理的位置に基づいて誘導" },
    ],
    explanation:
      "Route 53 のフェイルオーバールーティングは、ヘルスチェックと組み合わせてプライマリエンドポイントの障害を検知し、自動的にセカンダリへ切り替えます。DR（ディザスタリカバリ）構成の基本です。",
    comparePoint:
      "フェイルオーバー：障害時の自動切り替え。レイテンシーベース：最も速いリージョンへ誘導。加重：A/B テストやカナリアリリースに利用。",
    rememberAxis:
      "障害時の自動切り替え → フェイルオーバー。最低レイテンシー → レイテンシーベース。比率で分散 → 加重ルーティング。",
  },
  {
    id: "network-11",
    category: "Networking",
    modeLabel: "設計判断",
    prompt:
      "VPC 内の EC2 インスタンスから、インターネットを経由せず Amazon S3 や DynamoDB などの AWS サービスにアクセスしたい。最も適切な方法はどれですか。",
    context:
      "セキュリティ要件としてインターネット経路を使わずにサービスと通信する必要があります。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "VPC エンドポイントを作成する", hint: "プライベート接続で AWS サービスへアクセス" },
      { id: "b", label: "B", text: "NAT ゲートウェイ経由でアクセスする", hint: "インターネットを経由する" },
      { id: "c", label: "C", text: "Elastic IP をアタッチしてアクセスする", hint: "パブリック IP 経由でインターネットを使う" },
      { id: "d", label: "D", text: "AWS Direct Connect で接続する", hint: "オンプレミスからの専用線" },
    ],
    explanation:
      "VPC エンドポイントを作成すると、インターネットを経由せずに AWS のサービスへプライベートにアクセスできます。S3・DynamoDB は Gateway 型、その他多くのサービスは Interface 型（PrivateLink）が使えます。",
    comparePoint:
      "Gateway 型：S3・DynamoDB 向け・無料。Interface 型（PrivateLink）：その他 AWS サービス向け・料金あり。",
    rememberAxis:
      "インターネット不要で AWS サービスへ → VPC エンドポイント。S3/DynamoDB は Gateway 型、その他は Interface 型。",
  },

  // ── Database ─────────────────────────────────────────────────────────────

  {
    id: "database-2",
    category: "Database",
    modeLabel: "使い分け重視",
    prompt:
      "本番 RDS データベースの障害時に自動フェイルオーバーして可用性を高めたい。最も適切な設定はどれですか。",
    context:
      "性能向上ではなく、障害への耐性を高めることが目的です。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "RDS Multi-AZ を有効化する", hint: "スタンバイへの自動フェイルオーバーで高可用性を実現" },
      { id: "b", label: "B", text: "RDS リードレプリカを作成する", hint: "読み取りオフロードが目的・フェイルオーバーは自動でない" },
      { id: "c", label: "C", text: "RDS のインスタンスクラスをアップグレードする", hint: "性能向上であり可用性対策ではない" },
      { id: "d", label: "D", text: "RDS の自動バックアップを有効にする", hint: "データ復旧が目的・障害時の自動切り替えはしない" },
    ],
    explanation:
      "Multi-AZ は別の AZ にスタンバイインスタンスを自動で同期レプリケーションし、プライマリ障害時に数分以内で自動フェイルオーバーします。リードレプリカは読み取り性能の向上が目的で、フェイルオーバーは自動ではありません。",
    comparePoint:
      "Multi-AZ：可用性向上・自動フェイルオーバー・同一リージョン。リードレプリカ：読み取りスケール・クロスリージョン可。",
    rememberAxis:
      "障害に強くしたい（HA）→ Multi-AZ。読み取り性能を上げたい → リードレプリカ。両方必要なら両方設定する。",
  },
  {
    id: "database-3",
    category: "Database",
    modeLabel: "設計判断",
    prompt:
      "DynamoDB でユーザーの注文履歴を保存し、ユーザー ID で検索しつつ注文日時でソートして取得したい。最も適切なキー設計はどれですか。",
    context:
      "1 つのクエリで特定ユーザーの注文を日時順に効率よく取得できる設計が必要です。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "ユーザー ID のみをパーティションキーにする", hint: "ソートができない" },
      { id: "b", label: "B", text: "ユーザー ID をパーティションキー、注文日時をソートキーにする", hint: "ユーザーごとに日時でソートして取得できる" },
      { id: "c", label: "C", text: "注文日時のみをパーティションキーにする", hint: "特定ユーザーの絞り込みが非効率" },
      { id: "d", label: "D", text: "注文 ID をパーティションキー、ユーザー ID をソートキーにする", hint: "ユーザー単位の検索に向かない" },
    ],
    explanation:
      "DynamoDB では、パーティションキーで物理的なデータ分散先が決まり、ソートキーで同一パーティション内のデータを効率よく範囲検索・ソートできます。ユーザー ID + 注文日時の複合キーにすることで、1 クエリで特定ユーザーの注文を日時順に取得できます。",
    comparePoint:
      "パーティションキーのみ：点検索のみ。パーティション + ソートキー：範囲検索・ソートが可能。GSI：異なるキーパターンでの検索に使う。",
    rememberAxis:
      "「誰の」を絞るのがパーティションキー。「いつからいつまで」を絞るのがソートキー。",
  },
  {
    id: "database-4",
    category: "Database",
    modeLabel: "使い分け重視",
    prompt:
      "頻繁に読み書きされるセッションデータをキャッシュして DB の負荷を下げたい。データの永続化は不要で、シンプルなキーバリューキャッシュが必要な場合、最も適切な ElastiCache エンジンはどれですか。",
    context:
      "高速なキャッシュが目的で、データ構造の複雑さや永続化は要件にありません。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "ElastiCache for Redis（スタンドアロン）", hint: "豊富なデータ構造と永続化が可能・シンプル用途には過剰" },
      { id: "b", label: "B", text: "ElastiCache for Memcached", hint: "シンプルなキーバリュー・マルチスレッド・スケールアウト向き" },
      { id: "c", label: "C", text: "Amazon DynamoDB", hint: "フルマネージド NoSQL・キャッシュ層としての設計ではない" },
      { id: "d", label: "D", text: "Amazon RDS for MySQL", hint: "リレーショナル DB・キャッシュには不向き" },
    ],
    explanation:
      "Memcached はシンプルなキーバリューキャッシュに特化し、マルチスレッドで高いスループットを実現します。永続化やレプリケーションは不要で水平スケールしたい場合に最適です。Redis はリスト・セット・ソートセットなど豊富なデータ構造・永続化・Pub/Sub が必要な場合に選びます。",
    comparePoint:
      "Memcached：シンプルなキャッシュ・マルチスレッド・永続化なし。Redis：豊富なデータ構造・永続化・レプリケーション・Pub/Sub あり。",
    rememberAxis:
      "シンプルキャッシュで高スループット → Memcached。永続化・複雑なデータ構造・フェイルオーバー → Redis。",
  },
  {
    id: "database-5",
    category: "Database",
    modeLabel: "要件から選ぶ",
    prompt:
      "開発・テスト環境や使用頻度が低い本番環境向けに、DB が不要な間は自動停止してコストを最小化したい Aurora の利用形態はどれですか。",
    context:
      "常時稼働のプロビジョニングコストを避けたいケースです。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "Aurora Standard（プロビジョニング）", hint: "常時インスタンスが稼働しコストがかかる" },
      { id: "b", label: "B", text: "Aurora グローバルデータベース", hint: "マルチリージョンの高可用性・DR 向け" },
      { id: "c", label: "C", text: "Aurora Serverless v2", hint: "需要に応じて自動スケール・アイドル時はほぼ 0 まで縮小" },
      { id: "d", label: "D", text: "Aurora マルチマスター", hint: "複数のライターインスタンス構成" },
    ],
    explanation:
      "Aurora Serverless v2 は ACU（Aurora Capacity Unit）を需要に応じて自動でスケールアップ・ダウンします。使用していない間は最小 ACU まで縮小されるため、開発・テスト環境やアクセス頻度が予測しにくいワークロードでコストを大幅に削減できます。",
    comparePoint:
      "Aurora Provisioned：安定した高負荷に最適・コスト予測しやすい。Aurora Serverless：変動が大きい・アイドルあり・コスト最小化。",
    rememberAxis:
      "アイドル時間がある・負荷が予測不能 → Aurora Serverless。安定した高負荷 → Aurora Provisioned。",
  },
  {
    id: "database-6",
    category: "Database",
    modeLabel: "要件から選ぶ",
    prompt:
      "数十億件の販売データを格納し、複雑な集計クエリや BI レポートを高速に実行したい。最も適切なサービスはどれですか。",
    context:
      "OLAP（分析処理）ワークロードを想定しています。OLTP（トランザクション処理）とは要件が異なります。",
    correctChoiceId: "d",
    choices: [
      { id: "a", label: "A", text: "Amazon RDS for PostgreSQL", hint: "OLTP 向けリレーショナル DB・大規模分析には不向き" },
      { id: "b", label: "B", text: "Amazon DynamoDB", hint: "キーバリュー/ドキュメント型 NoSQL・複雑な集計が苦手" },
      { id: "c", label: "C", text: "Amazon Aurora", hint: "高性能 OLTP 向け・分析専用設計ではない" },
      { id: "d", label: "D", text: "Amazon Redshift", hint: "列指向の分析専用 DWH・大規模 OLAP に最適" },
    ],
    explanation:
      "Redshift は列指向ストレージとマッシブパラレル処理（MPP）により、ペタバイト規模のデータ分析を高速に実行できます。RDS や Aurora は行指向で OLTP に最適化されており、大規模な集計クエリには向いていません。",
    comparePoint:
      "RDS/Aurora：OLTP・行指向・高頻度の読み書きトランザクション。Redshift：OLAP・列指向・大規模集計・BI。",
    rememberAxis:
      "トランザクション処理・アプリ DB → RDS/Aurora。集計・分析・DWH → Redshift。",
  },

  // ── Security ──────────────────────────────────────────────────────────────

  {
    id: "security-1",
    category: "Security",
    modeLabel: "使い分け重視",
    prompt:
      "EC2 インスタンスから S3 バケットへアクセスする際、認証情報をコード内やインスタンスに保存せず安全に権限を付与したい。最も適切な方法はどれですか。",
    context:
      "ハードコードされたアクセスキーはセキュリティリスクになります。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "IAM ユーザーを作成しアクセスキーを EC2 に設定する", hint: "キーの漏洩リスクがある・非推奨" },
      { id: "b", label: "B", text: "S3 アクセス権限を持つ IAM ロールを作成し EC2 にアタッチする", hint: "認証情報不要で安全に権限付与できる" },
      { id: "c", label: "C", text: "S3 バケットをパブリックに公開する", hint: "誰でもアクセスできてしまう" },
      { id: "d", label: "D", text: "IAM グループに EC2 インスタンスを追加する", hint: "IAM グループはユーザーに適用するもの" },
    ],
    explanation:
      "IAM ロールを EC2 にアタッチすると、インスタンスメタデータから一時的な認証情報が自動で取得・更新されます。アクセスキーをコードや設定ファイルに保存する必要がなく、漏洩リスクを排除できます。",
    comparePoint:
      "IAM ユーザー：人間の操作向け・長期認証情報。IAM ロール：AWS サービス・アプリ向け・一時認証情報・キー不要。",
    rememberAxis:
      "AWS サービスへのアクセス権限付与 → IAM ロール。人がコンソール/CLI を使う → IAM ユーザー。",
  },
  {
    id: "security-2",
    category: "Security",
    modeLabel: "設計判断",
    prompt:
      "RDS のデータを保存時に暗号化したい。暗号化キーの管理を AWS に委ねつつ、キーの使用履歴を監査できる仕組みはどれですか。",
    context:
      "コンプライアンス要件として暗号化キーの操作ログが必要なケースです。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "AWS KMS のカスタマーマネージドキー（CMK）を使用する", hint: "キーポリシー設定・CloudTrail で使用履歴を監査可能" },
      { id: "b", label: "B", text: "AWS マネージドキー（aws/rds）を使用する", hint: "AWS が管理・監査ログはあるが細かいキー制御ができない" },
      { id: "c", label: "C", text: "クライアントサイドで独自に暗号化する", hint: "アプリ側の実装が必要・KMS との統合なし" },
      { id: "d", label: "D", text: "S3 サーバーサイド暗号化（SSE-S3）を使う", hint: "S3 向けの設定・RDS には適用されない" },
    ],
    explanation:
      "KMS のカスタマーマネージドキーを使うと、キーポリシーで誰がキーを使えるかを細かく制御でき、CloudTrail と組み合わせてキーの使用履歴を監査できます。AWS マネージドキーは AWS が自動ローテーションしますが、キーポリシーのカスタマイズはできません。",
    comparePoint:
      "AWS マネージドキー：管理コスト低・監査は限定的。CMK：細かい制御・監査・ローテーション設定が可能。CloudHSM：専用 HSM が必要な規制対応向け。",
    rememberAxis:
      "キー制御・監査ログが必要 → CMK。シンプルに暗号化したい → AWS マネージドキー。専用 HSM 必須 → CloudHSM。",
  },
  {
    id: "security-3",
    category: "Security",
    modeLabel: "使い分け重視",
    prompt:
      "VPC 内の EC2 インスタンスへのアクセス制御について、インスタンス単位でステートフルなルールを設定する方法と、サブネット単位でステートレスなルールを設定する方法はそれぞれどれですか。",
    context:
      "Security Group と NACL の違いを理解しているかを確認する問題です。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "どちらも Security Group で設定する", hint: "Security Group はインスタンスレベル" },
      { id: "b", label: "B", text: "どちらも NACL で設定する", hint: "NACL はサブネットレベル" },
      { id: "c", label: "C", text: "インスタンス単位はSecurity Group、サブネット単位はNACL", hint: "正しい組み合わせ" },
      { id: "d", label: "D", text: "インスタンス単位はNACL、サブネット単位はSecurity Group", hint: "逆の説明" },
    ],
    explanation:
      "Security Group はインスタンス（ENI）レベルで動作するステートフルなファイアウォールです。インバウンドを許可するとリターントラフィックは自動で許可されます。NACL はサブネットレベルで動作するステートレスなファイアウォールで、インバウンドとアウトバウンドの両方を明示的に設定する必要があります。",
    comparePoint:
      "Security Group：インスタンスレベル・ステートフル・許可ルールのみ。NACL：サブネットレベル・ステートレス・許可と拒否ルール両方あり。",
    rememberAxis:
      "インスタンスへの細かいアクセス制御 → Security Group。サブネット全体の第二防衛線 → NACL。両方組み合わせて多層防御。",
  },
  {
    id: "security-4",
    category: "Security",
    modeLabel: "要件から選ぶ",
    prompt:
      "ALB の前段で SQL インジェクションや XSS などの Web 攻撃をブロックし、特定 IP アドレスからのアクセスも拒否したい。最も適切なサービスはどれですか。",
    context:
      "アプリケーション層（L7）でのフィルタリングが必要なケースです。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "AWS Shield Standard", hint: "L3/L4 の DDoS 保護・L7 の Web 攻撃フィルタリングはしない" },
      { id: "b", label: "B", text: "AWS WAF", hint: "L7 の Web 攻撃ルール・IP 制限・ALB や CloudFront にアタッチ可能" },
      { id: "c", label: "C", text: "VPC Security Group", hint: "IP/ポートレベルの制御・HTTP リクエスト内容は見られない" },
      { id: "d", label: "D", text: "Amazon GuardDuty", hint: "脅威検出・異常検知サービス・トラフィックブロックはしない" },
    ],
    explanation:
      "AWS WAF は HTTP/HTTPS リクエストの内容を検査し、SQL インジェクション・XSS などの攻撃パターンや特定の IP アドレスをブロックできます。ALB・CloudFront・API Gateway にアタッチして使います。Shield Standard は L3/L4 の DDoS 保護が目的で Web 攻撃のフィルタリングはできません。",
    comparePoint:
      "WAF：L7 Web 攻撃フィルタリング・IP 制限。Shield：L3/L4 DDoS 保護。GuardDuty：ログ分析ベースの脅威検出（ブロックはしない）。",
    rememberAxis:
      "SQL インジェクション・XSS・IP ブロック → WAF。DDoS 対策 → Shield。異常検知・脅威ハンティング → GuardDuty。",
  },
  {
    id: "security-5",
    category: "Security",
    modeLabel: "設計判断",
    prompt:
      "アプリケーションが使用するデータベースのパスワードを安全に管理し、一定期間ごとに自動でローテーションしたい。最も適切なサービスはどれですか。",
    context:
      "平文のパスワードをコードや環境変数にハードコードすることを避けたいケースです。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "AWS Systems Manager パラメータストア（標準）", hint: "シークレット管理は可能だが自動ローテーション機能はない" },
      { id: "b", label: "B", text: "S3 バケットに暗号化して保存する", hint: "手動管理・ローテーション機能なし" },
      { id: "c", label: "C", text: "AWS Secrets Manager", hint: "シークレットの安全な保存・自動ローテーション・RDS 対応" },
      { id: "d", label: "D", text: "AWS KMS", hint: "暗号化キーの管理サービス・パスワード管理は目的外" },
    ],
    explanation:
      "Secrets Manager はデータベースの認証情報・API キーなどのシークレットを安全に保存・取得でき、RDS との統合により自動ローテーションを設定できます。アプリは Secrets Manager の API からシークレットを取得するため、コードに認証情報を埋め込む必要がありません。",
    comparePoint:
      "Secrets Manager：自動ローテーション・RDS 統合・高機能・有料。Parameter Store（SecureString）：KMS 暗号化可能・ローテーション機能なし・低コスト。",
    rememberAxis:
      "自動ローテーションが必要 → Secrets Manager。ローテーション不要の設定値管理 → Parameter Store。",
  },

  // ── Application Integration ───────────────────────────────────────────────

  {
    id: "appintegration-1",
    category: "Application Integration",
    modeLabel: "使い分け重視",
    prompt:
      "注文処理システムで、注文イベントを確実に 1 件ずつ処理したい。処理に失敗した場合はリトライし、順序を保証する必要はない。最も適切なサービスはどれですか。",
    context:
      "非同期で疎結合な処理キューが必要です。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "Amazon SQS（スタンダードキュー）", hint: "非同期キュー・少なくとも1回の配信・スケール容易" },
      { id: "b", label: "B", text: "Amazon SNS", hint: "Pub/Sub のファンアウト配信・キューイングは目的外" },
      { id: "c", label: "C", text: "Amazon EventBridge", hint: "イベントのルーティング・複数ターゲットへの配信" },
      { id: "d", label: "D", text: "AWS Step Functions", hint: "ワークフローのオーケストレーション" },
    ],
    explanation:
      "SQS は非同期メッセージキューで、プロデューサーとコンシューマーを疎結合にし、処理失敗時のリトライや DLQ（デッドレターキュー）による失敗メッセージ管理ができます。SNS はプッシュ型のファンアウト配信が目的で、キューとしての蓄積機能はありません。",
    comparePoint:
      "SQS：プル型キュー・メッセージ蓄積・1 対 1 処理。SNS：プッシュ型 Pub/Sub・1 対多配信・蓄積なし。",
    rememberAxis:
      "1 件ずつ確実に処理したい → SQS。複数のシステムに同時通知したい → SNS。両方をつなぐ → SNS + SQS ファンアウト。",
  },
  {
    id: "appintegration-2",
    category: "Application Integration",
    modeLabel: "設計判断",
    prompt:
      "SaaS アプリケーションのイベントや AWS サービスのイベントを受け取り、特定の条件に一致するイベントだけを複数の Lambda 関数や SQS キューへルーティングしたい。最も適切なサービスはどれですか。",
    context:
      "イベントの内容を見てルーティング先を動的に変えたいケースです。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "Amazon SQS", hint: "キューイング・ルーティングルールの設定はできない" },
      { id: "b", label: "B", text: "Amazon EventBridge", hint: "イベントバス・ルールベースのルーティング・SaaS 統合対応" },
      { id: "c", label: "C", text: "Amazon SNS", hint: "フィルタリングは可能だが複雑なルール設定は限定的" },
      { id: "d", label: "D", text: "Amazon Kinesis Data Streams", hint: "ストリーミングデータ処理・イベントルーティングは目的外" },
    ],
    explanation:
      "EventBridge はイベントバスにイベントを受け取り、ルール（イベントパターンマッチング）に基づいて Lambda・SQS・SNS など複数のターゲットへルーティングします。AWS サービスや SaaS アプリとの統合が豊富で、複雑なイベントドリブンアーキテクチャを疎結合に構築できます。",
    comparePoint:
      "EventBridge：イベントのフィルタリング・ルーティング・スケジュール実行・SaaS 統合。SNS：シンプルなファンアウト配信。SQS：メッセージキューイング。",
    rememberAxis:
      "イベントの内容でルーティングを変えたい → EventBridge。同じ内容を全員に届けたい → SNS。確実にキューに溜めたい → SQS。",
  },
  {
    id: "appintegration-3",
    category: "Application Integration",
    modeLabel: "設計判断",
    prompt:
      "注文受付・在庫確認・決済・発送通知という複数のステップを順番に実行し、各ステップの成功・失敗に応じて次の処理を分岐させたい。最も適切なサービスはどれですか。",
    context:
      "複数の Lambda 関数を順番につなぐワークフローを構築したいケースです。",
    correctChoiceId: "d",
    choices: [
      { id: "a", label: "A", text: "Amazon SQS で複数のキューをつなぐ", hint: "キューイングは可能だがステート管理・分岐が難しい" },
      { id: "b", label: "B", text: "Lambda から Lambda を直接呼び出す", hint: "シンプルだがエラーハンドリングやリトライ管理が複雑になる" },
      { id: "c", label: "C", text: "Amazon EventBridge でイベントをルーティングする", hint: "イベント駆動は向いているが複雑なステート管理が難しい" },
      { id: "d", label: "D", text: "AWS Step Functions", hint: "ステートマシンでフロー・分岐・リトライ・エラー処理を一元管理" },
    ],
    explanation:
      "Step Functions はステートマシンとして各ステップ（Lambda・ECS タスクなど）の実行順序・分岐・並列処理・リトライ・タイムアウト・エラーハンドリングをコードなしで視覚的に定義できます。複雑なビジネスプロセスを疎結合に管理するのに最適です。",
    comparePoint:
      "Step Functions：ステートマシン・複雑なフロー管理・視覚的なモニタリング。SQS + Lambda：シンプルな非同期処理向け。EventBridge：イベントドリブンルーティング。",
    rememberAxis:
      "複数ステップのフロー・分岐・エラーハンドリングを管理 → Step Functions。単純なイベント処理 → Lambda 単体。",
  },
  {
    id: "appintegration-4",
    category: "Application Integration",
    modeLabel: "使い分け重視",
    prompt:
      "IoT デバイスから秒間数万件のセンサーデータをリアルタイムに収集し、後続の Lambda で即座に処理したい。最も適切なサービスはどれですか。",
    context:
      "高スループットのリアルタイムストリーム処理が必要です。S3 への保存だけが目的ではありません。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "Amazon Kinesis Data Streams", hint: "リアルタイムストリーム・複数コンシューマーが同時読み取り可能" },
      { id: "b", label: "B", text: "Amazon Kinesis Data Firehose", hint: "S3・Redshift・OpenSearch への配信専用・Lambda 処理は直接連携できない" },
      { id: "c", label: "C", text: "Amazon SQS", hint: "メッセージキュー・超高スループットのストリームには限界がある" },
      { id: "d", label: "D", text: "Amazon SNS", hint: "Pub/Sub 通知・ストリーミングデータ処理には向かない" },
    ],
    explanation:
      "Kinesis Data Streams は大量のデータをリアルタイムにストリーミング処理でき、複数のコンシューマー（Lambda・Kinesis Analytics・カスタムアプリ）が同じデータを同時に読み取れます。Firehose はストリームデータをバッファリングして S3・Redshift などにバッチ配信するサービスで、リアルタイムな Lambda 処理には直接使えません。",
    comparePoint:
      "Kinesis Data Streams：リアルタイム・複数コンシューマー・Lambda 連携・データを保持（デフォルト24h）。Firehose：自動バッファリング・S3/Redshift/OpenSearch へ配信・変換処理は Lambda 経由で可能。",
    rememberAxis:
      "リアルタイム処理・複数コンシューマー → Kinesis Data Streams。S3 や Redshift へ自動配信 → Firehose。",
  },
  {
    id: "appintegration-5",
    category: "Application Integration",
    modeLabel: "要件から選ぶ",
    prompt:
      "モバイルアプリのバックエンドとして、Lambda 関数を HTTPS エンドポイントで公開し、認証・スロットリング・ステージ管理を一元化したい。最も適切なサービスはどれですか。",
    context:
      "Lambda を直接 URL で公開する方法もありますが、API 管理機能が必要なケースです。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "Application Load Balancer（ALB）", hint: "Lambda をターゲットにできるが API 管理機能はない" },
      { id: "b", label: "B", text: "Amazon API Gateway", hint: "REST/HTTP/WebSocket API・認証・スロットリング・ステージ管理が揃う" },
      { id: "c", label: "C", text: "Amazon CloudFront", hint: "CDN・API 管理機能はない" },
      { id: "d", label: "D", text: "Lambda Function URL", hint: "シンプルな HTTPS エンドポイント・スロットリングやステージ管理はない" },
    ],
    explanation:
      "API Gateway は REST API・HTTP API・WebSocket API を提供し、Lambda や HTTP バックエンドと連携します。Cognito や IAM による認証・API キー管理・スロットリング・使用量プラン・ステージ（dev/prod）管理などの API 管理機能がすべて揃っています。",
    comparePoint:
      "API Gateway：API 管理フル機能・認証・スロットリング・ステージ。ALB：L7 負荷分散・API 管理機能なし。Lambda URL：シンプル公開・管理機能なし。",
    rememberAxis:
      "API 認証・スロットリング・ステージ管理が必要 → API Gateway。シンプルな公開だけ → Lambda URL。",
  },

  // ── Cost Optimization ────────────────────────────────────────────────────

  {
    id: "cost-1",
    category: "Cost Optimization",
    modeLabel: "使い分け重視",
    prompt:
      "1年間継続して稼働する EC2 ワークロードのコストを削減したい。インスタンスタイプを柔軟に変更する可能性があり、将来的に Fargate や Lambda も使う予定がある。最も適切な購入オプションはどれですか。",
    context:
      "長期コミットメントで割引を受けつつ、サービスをまたいで割引を適用したいケースです。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "スタンダードリザーブドインスタンス（1年）", hint: "インスタンスファミリー・OS の変更不可。EC2 のみに適用" },
      { id: "b", label: "B", text: "Compute Savings Plans（1年）", hint: "EC2・Fargate・Lambda に横断適用・インスタンスタイプ変更自由" },
      { id: "c", label: "C", text: "スポットインスタンス", hint: "最大90%割引だが中断リスクあり・継続稼働には不向き" },
      { id: "d", label: "D", text: "EC2 Instance Savings Plans（1年）", hint: "特定インスタンスファミリーに限定・Fargate/Lambda には不適用" },
    ],
    explanation:
      "Compute Savings Plans は EC2・Fargate・Lambda に横断して適用される最も柔軟な割引プランです。インスタンスファミリー・サイズ・OS・リージョンを問わず適用されます。リザーブドインスタンス（RI）は EC2 専用で変更の柔軟性が低く、EC2 Instance Savings Plans は特定ファミリーに限定されます。",
    comparePoint:
      "Compute Savings Plans：EC2+Fargate+Lambda・最も柔軟・最大66%割引。EC2 Instance Savings Plans：EC2特定ファミリー・最大72%割引。スタンダード RI：最も高割引（最大72%）・変更不可。",
    rememberAxis:
      "サービスをまたいで柔軟に使いたい → Compute Savings Plans。EC2 のみ・ファミリー固定で最大割引 → スタンダード RI。インスタンスファミリーは固定・OS は変えたい → EC2 Instance Savings Plans。",
  },

  // ── Monitoring ────────────────────────────────────────────────────────────

  {
    id: "monitoring-1",
    category: "Monitoring",
    modeLabel: "使い分け重視",
    prompt:
      "「誰が・いつ・どの AWS API を呼び出したか」を記録・監査したい。最も適切なサービスはどれですか。",
    context:
      "セキュリティ監査・コンプライアンス対応のため API 操作の証跡を残す要件があります。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "Amazon CloudWatch Metrics", hint: "CPU・メモリなどのリソースメトリクスを収集・可視化する" },
      { id: "b", label: "B", text: "Amazon CloudWatch Logs", hint: "アプリケーションログ・システムログを収集・検索する" },
      { id: "c", label: "C", text: "AWS CloudTrail", hint: "AWS API 呼び出しの操作ログ（誰が・いつ・何を）を記録する" },
      { id: "d", label: "D", text: "AWS Config", hint: "リソースの設定変更履歴と準拠状況を評価する" },
    ],
    explanation:
      "CloudTrail はすべての AWS API 呼び出しのログ（誰が・いつ・どのリージョンで・何のリソースに対して・何をしたか）を S3 に記録します。セキュリティ監査・コンプライアンス・不正操作の調査に使います。CloudWatch はメトリクス・ログ・アラームによる運用監視が目的です。",
    comparePoint:
      "CloudTrail：API 操作の監査ログ・誰が何をしたか。CloudWatch：メトリクス収集・ログ監視・アラーム・ダッシュボード。AWS Config：設定の準拠チェック・変更履歴。",
    rememberAxis:
      "API 操作の証跡・誰が何をしたか → CloudTrail。CPU/メモリなどの監視・アラーム → CloudWatch。設定変更の追跡・コンプライアンス → AWS Config。",
  },

  // ── シナリオ: 高可用性・DR設計 ───────────────────────────────────────────

  {
    id: "scenario-ha-1",
    category: "High Availability",
    modeLabel: "シナリオ",
    prompt:
      "ある金融系企業が Amazon RDS MySQL を使用している。データベース障害時のダウンタイムを最小化したい。追加コストを抑えつつ、AZ 障害に対して自動フェイルオーバーを実現するには何をすべきか。",
    context:
      "現在 RDS はシングル AZ 構成で稼働中。週末の障害発生時でも数分以内に復旧できるよう求められています。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "リードレプリカを同一 AZ に作成し、障害時に手動で昇格する", hint: "リードレプリカは読み取り分散が目的。手動昇格は RPO/RTO の観点で不確実" },
      { id: "b", label: "B", text: "Multi-AZ 配置を有効化し、スタンバイインスタンスへ自動フェイルオーバーさせる", hint: "Multi-AZ はスタンバイへ同期レプリケーションし、自動フェイルオーバーを提供" },
      { id: "c", label: "C", text: "毎時スナップショットを取得し、障害時に別 AZ へリストアする", hint: "スナップショットからのリストアは数十分かかり RTO を満たせない" },
      { id: "d", label: "D", text: "Aurora に移行して Global Database を有効化する", hint: "Aurora Global Database はクロスリージョン DR が目的でコストが高い" },
    ],
    explanation:
      "RDS Multi-AZ は同一リージョンの別 AZ にスタンバイを同期レプリケーションで維持します。プライマリに障害が発生すると、自動的にスタンバイへフェイルオーバーされ、通常 60〜120 秒以内に復旧します。リードレプリカは非同期レプリケーションのため手動昇格が必要で、Auto-failover には使えません。",
    comparePoint:
      "Multi-AZ：同期・自動フェイルオーバー・高可用性が目的。リードレプリカ：非同期・読み取りスケールが目的・フェイルオーバーは手動。",
    rememberAxis:
      "AZ 障害時の自動復旧が必要 → Multi-AZ。読み取り負荷分散が目的 → リードレプリカ。クロスリージョン DR → Aurora Global Database。",
  },
  {
    id: "scenario-ha-2",
    category: "High Availability",
    modeLabel: "シナリオ",
    prompt:
      "ある EC サイトがプライマリリージョン（us-east-1）でサービスを提供している。リージョン全体の障害に備えてフェイルオーバー先（ap-northeast-1）を用意したい。RTO は 10 分以内、RPO は 1 時間以内で、コストを最小化したい。最適な DR 戦略はどれか。",
    context:
      "フェイルオーバー先ではデータが存在するだけでよく、平時はトラフィックを受けなくてもよい。最低限のリソースだけ起動しておきたい。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "バックアップ＆リストア戦略：定期スナップショットを DR リージョンへコピーし、障害時にリストアする", hint: "RTO が数時間以上になりやすく 10 分の要件を満たせない" },
      { id: "b", label: "B", text: "マルチサイトアクティブ/アクティブ：両リージョンで常時トラフィックを受ける", hint: "RTO/RPO は最小だがコストが最大。平時にトラフィックが不要な要件と合わない" },
      { id: "c", label: "C", text: "パイロットライト：DR リージョンに最小限のコアリソース（DB レプリカ等）だけ起動しておき、障害時にスケールアップする", hint: "コアコンポーネントのみ稼働させ、障害時に残りを素早く起動できる低コスト戦略" },
      { id: "d", label: "D", text: "ウォームスタンバイ：DR リージョンで縮小版のシステムを常時稼働させる", hint: "パイロットライトより高速だがコストも高い。RTO 10 分はウォームスタンバイでも達成できる" },
    ],
    explanation:
      "パイロットライトはデータベースレプリカなどコアコンポーネントのみ DR リージョンで稼働させ、障害時に EC2 等を起動・スケールする戦略です。RTO 10 分・RPO 1 時間の要件を満たしつつ、ウォームスタンバイより低コストで運用できます。バックアップ&リストアは RTO が長すぎ、アクティブ/アクティブはコストが高すぎます。",
    comparePoint:
      "バックアップ&リストア（最安・RTO 長）→ パイロットライト（低コスト・RTO 数分〜数十分）→ ウォームスタンバイ（中コスト・RTO 数分）→ マルチサイト（最高コスト・RTO ほぼゼロ）。",
    rememberAxis:
      "コスト最小でそこそこの RTO → パイロットライト。少し速い復旧でコスト中程度 → ウォームスタンバイ。最速復旧・コスト度外視 → マルチサイトアクティブ/アクティブ。",
  },
  {
    id: "scenario-ha-3",
    category: "High Availability",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が Amazon Aurora MySQL をプライマリに使用している。DR 要件は RPO 5 秒以内・RTO 1 分以内。クロスリージョンの自動フェイルオーバーを実現したい。最適な構成はどれか。",
    context:
      "現在はシングルリージョン構成。規制要件によりクロスリージョンのフェイルオーバーが必要になりました。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "Aurora Global Database を有効化し、セカンダリリージョンへ 1 秒未満のレプリケーションを行う", hint: "RPO < 1秒・RTO < 1分のクロスリージョン DR を実現できる Aurora 専用機能" },
      { id: "b", label: "B", text: "RDS リードレプリカをクロスリージョンに作成し、障害時に手動昇格する", hint: "手動昇格は RTO 1 分以内を満たせない可能性が高い" },
      { id: "c", label: "C", text: "S3 クロスリージョンレプリケーションと DMS を組み合わせて同期する", hint: "DMS はデータ移行ツールであり、RPO 5 秒のリアルタイム同期には不向き" },
      { id: "d", label: "D", text: "Aurora Multi-AZ を有効化する", hint: "Multi-AZ は同一リージョン内の可用性向上。クロスリージョン DR には対応しない" },
    ],
    explanation:
      "Aurora Global Database はプライマリリージョンから最大 5 つのセカンダリリージョンへ、1 秒未満のレプリケーション遅延でデータを同期します。障害時のフェイルオーバー（Managed Planned Failover）は約 1 分以内で完了します。RDS クロスリージョンリードレプリカは手動昇格が必要で RTO の保証が難しく、Multi-AZ はリージョン障害に対応しません。",
    comparePoint:
      "Aurora Global Database：クロスリージョン・RPO < 1 秒・RTO < 1 分・Aurora 専用。RDS クロスリージョンリードレプリカ：手動昇格・RTO 不確実。Multi-AZ：同一リージョン内のみ。",
    rememberAxis:
      "クロスリージョンの自動フェイルオーバーが必要かつ Aurora を使っている → Aurora Global Database 一択。",
  },
  {
    id: "scenario-ha-4",
    category: "High Availability",
    modeLabel: "シナリオ",
    prompt:
      "ある Web アプリが EC2 + ALB 構成で us-east-1 に展開されている。ヘルスチェックで EC2 の異常を検知したとき、自動的に同一 AZ 内の別インスタンスへトラフィックを振り替えるとともに、異常インスタンスを置き換えたい。最も適切な構成はどれか。",
    context:
      "単一 EC2 では障害時にダウンタイムが発生しています。Auto Scaling は未使用です。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "CloudWatch アラームで EC2 を監視し、Lambda で新インスタンスを起動するスクリプトを実行する", hint: "可能だが複雑な自動化が必要。Auto Scaling の代替として設計するのは非効率" },
      { id: "b", label: "B", text: "ALB + Auto Scaling グループを組み合わせ、ヘルスチェック失敗時に異常インスタンスを置換する", hint: "ALB が異常インスタンスをターゲットから除外し、ASG がインスタンスを自動補充する標準的な高可用性パターン" },
      { id: "c", label: "C", text: "Elastic IP を使用し、障害時に EIP を別インスタンスへ付け替えるスクリプトを実行する", hint: "EIP の付け替えは手動または半自動。切り替えに時間がかかりダウンタイムが発生する" },
      { id: "d", label: "D", text: "NLB に変更し、ヘルスチェックを TCP レベルで行う", hint: "NLB 単体では不健全インスタンスを置き換える機能はない。Auto Scaling が必要" },
    ],
    explanation:
      "ALB と Auto Scaling グループの組み合わせが EC2 高可用性の基本パターンです。ALB はターゲットグループのヘルスチェックで異常インスタンスをルーティング対象から除外し、Auto Scaling がそのインスタンスを終了して新しいインスタンスを起動・登録します。この一連の処理は完全に自動化されます。",
    comparePoint:
      "ALB + Auto Scaling：自動検知・自動置換・標準パターン。Elastic IP 付け替え：手動・ダウンタイムあり。CloudWatch + Lambda カスタム：複雑・管理コスト高。",
    rememberAxis:
      "EC2 の自動置換・無停止フェイルオーバー → ALB + Auto Scaling グループ。リードレプリカの自動フェイルオーバー → Multi-AZ。",
  },
  {
    id: "scenario-ha-5",
    category: "High Availability",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が S3 に重要なドキュメントを保存している。誤削除や上書きに備えてデータを保護したい。削除・上書き操作から 30 日間は元のバージョンに戻せる必要がある。最も適切な設定はどれか。",
    context:
      "現在 S3 はバージョニングなし・ライフサイクルルールなしで運用中。コストも考慮してください。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "バージョニングを有効化し、過去バージョンを 30 日後に削除するライフサイクルルールを設定する", hint: "バージョニングで世代管理、ライフサイクルで古いバージョンを自動削除してコストを抑える" },
      { id: "b", label: "B", text: "S3 クロスリージョンレプリケーション（CRR）を有効化する", hint: "CRR は別リージョンへのコピー。誤削除は両方に反映されるため保護にならない" },
      { id: "c", label: "C", text: "S3 Object Lock を Compliance モードで設定する", hint: "Object Lock は削除・上書きの禁止。バージョン管理ではなく法的保持が目的" },
      { id: "d", label: "D", text: "毎日 AWS Backup で S3 をバックアップする", hint: "AWS Backup の S3 対応はあるが、バージョニングの方がシンプルかつリアルタイム" },
    ],
    explanation:
      "S3 バージョニングを有効化すると、同じキーへの上書き・削除操作でも旧バージョンが保持されます。ライフサイクルルールで「非カレントバージョンを 30 日後に削除」を設定することで、30 日間のバージョン履歴を保ちつつストレージコストを抑えられます。CRR は誤削除操作もレプリカに同期されるため保護になりません。",
    comparePoint:
      "バージョニング + ライフサイクル：誤削除保護・コスト管理・最適解。CRR：リージョン障害対策・誤削除は防げない。Object Lock：法的保持・改ざん防止。",
    rememberAxis:
      "誤削除・上書きの取り消しが必要 → バージョニング。古いバージョンのコスト削減 → ライフサイクルと組み合わせる。",
  },

  // ── シナリオ: コスト最適化 ────────────────────────────────────────────────

  {
    id: "scenario-cost-1",
    category: "Cost Optimization",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が深夜に大量の画像処理バッチジョブを EC2 で実行している。ジョブは途中で中断されても最初から再実行できる設計になっている。月次のコストを最大限削減したい。最も適切な選択肢はどれか。",
    context:
      "バッチは毎日深夜 0〜6 時に実行。中断・再開に対応したチェックポイント機能があります。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "オンデマンドインスタンスを使用する", hint: "確実だがコストが最も高い" },
      { id: "b", label: "B", text: "1 年の Standard Reserved Instance を購入する", hint: "安定した稼働時間に有効。深夜 6 時間のみの利用ではコスト効率が低い" },
      { id: "c", label: "C", text: "スポットインスタンスを使用し、中断時はチェックポイントから再実行する", hint: "スポットはオンデマンド比最大 90% 安価。中断耐性があるバッチに最適" },
      { id: "d", label: "D", text: "AWS Lambda で処理する", hint: "Lambda は最大 15 分の実行制限があり、長時間バッチには不向き" },
    ],
    explanation:
      "スポットインスタンスはオンデマンドと比べて最大 90% 安価で、AWS の余剰キャパシティを利用します。ただし AWS からの 2 分前通知で中断される可能性があります。チェックポイント（途中から再開できる設計）があるバッチ処理はスポットと相性が最高です。リザーブドインスタンスは 24 時間稼働するワークロードに向いており、深夜 6 時間のみでは元が取れません。",
    comparePoint:
      "スポット：最安・中断あり・中断耐性バッチに最適。オンデマンド：確実・高コスト。リザーブド：長時間安定稼働に有効。Savings Plans：柔軟なコミットメント。",
    rememberAxis:
      "中断を許容できる・再実行可能なバッチ → スポットインスタンス。中断できない・常時稼働 → オンデマンド or リザーブド。",
  },
  {
    id: "scenario-cost-2",
    category: "Cost Optimization",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が S3 に IoT センサーデータを蓄積している。データは収集直後の 30 日間は頻繁にアクセスされるが、その後はほとんど参照されない。90 日後はコンプライアンス要件で 3 年間の保持が義務付けられている。コストを最適化するライフサイクルポリシーはどれか。",
    context:
      "現在すべてのデータが S3 Standard に保存されており、ストレージコストが増大しています。",
    correctChoiceId: "d",
    choices: [
      { id: "a", label: "A", text: "すべてのデータを S3 Intelligent-Tiering に移動する", hint: "アクセスパターンが予測できない場合に有効。ここでは明確なパターンがあるので最適ではない" },
      { id: "b", label: "B", text: "30 日後に S3 Standard-IA へ移行し、それ以降はそのまま保持する", hint: "Standard-IA は低頻度アクセスに適切だが、90 日以降のさらなる削減機会を逃している" },
      { id: "c", label: "C", text: "収集直後から S3 Glacier に保存する", hint: "Glacier は取り出しに数分〜時間かかる。頻繁アクセスが必要な最初の 30 日に使えない" },
      { id: "d", label: "D", text: "30 日後に S3 Standard-IA、90 日後に S3 Glacier Flexible Retrieval へ移行するライフサイクルルールを設定する", hint: "アクセス頻度に合わせた段階移行でコストを最適化する正解パターン" },
    ],
    explanation:
      "S3 ライフサイクルポリシーで複数のストレージクラスへの段階移行が可能です。「0〜30 日：Standard（高頻度アクセス）→ 30〜90 日：Standard-IA（低頻度・取り出し迅速）→ 90 日以降：Glacier Flexible Retrieval（長期保持・低コスト）」の構成がこの要件に最適です。Intelligent-Tiering はアクセスパターンが不明な場合に有効ですが、パターンが分かっている場合は手動設定の方がコスト効率が高いです。",
    comparePoint:
      "Standard：高コスト・即時アクセス。Standard-IA：低コスト・低頻度・最低保存 30 日。Glacier：最安・取り出しに時間がかかる・長期保存。Intelligent-Tiering：パターン不明時の自動最適化。",
    rememberAxis:
      "アクセスパターンが分かっている → ライフサイクルルールで段階移行。パターン不明・変動する → Intelligent-Tiering。",
  },
  {
    id: "scenario-cost-3",
    category: "Cost Optimization",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が本番環境で 10 台の m5.xlarge EC2 インスタンスを 24 時間 365 日稼働させている。今後 3 年間は同じ構成を維持する予定。コストを最大限削減したい。最も適切な選択肢はどれか。",
    context:
      "ワークロードは安定しており、インスタンスタイプの変更予定はありません。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "Compute Savings Plans を 3 年・全前払いで購入する", hint: "Savings Plans はインスタンスファミリー・リージョンの変更が柔軟だが、Reserved より若干割引率が低い場合がある" },
      { id: "b", label: "B", text: "Standard Reserved Instance（m5.xlarge）を 3 年・全前払いで購入する", hint: "特定インスタンスタイプを確定している場合、Standard RI の 3 年全前払いが最大割引" },
      { id: "c", label: "C", text: "Convertible Reserved Instance を 3 年で購入する", hint: "Convertible RI はインスタンスタイプ変更が可能だが、Standard より割引率が低い" },
      { id: "d", label: "D", text: "スポットインスタンスを使用する", hint: "スポットは本番の 24 時間稼働ワークロードには中断リスクがあり不向き" },
    ],
    explanation:
      "インスタンスタイプと稼働期間が確定している場合、Standard Reserved Instance の 3 年・全前払いが最大の割引率（オンデマンド比最大 72%）を提供します。Savings Plans はファミリーやリージョンを変更する可能性がある場合に柔軟性が高いですが、変更予定がなければ Standard RI の方が割引が大きいことが多いです。Convertible RI はタイプ変更が可能な代わりに割引率が Standard より低くなります。",
    comparePoint:
      "Standard RI：最大割引・インスタンスタイプ固定。Convertible RI：タイプ変更可・割引率低め。Savings Plans：柔軟・ファミリー/リージョン変更可。スポット：最安だが中断リスクあり。",
    rememberAxis:
      "インスタンスタイプが確定・長期稼働 → Standard RI 全前払い。将来変更の可能性あり → Convertible RI or Savings Plans。",
  },
  {
    id: "scenario-cost-4",
    category: "Cost Optimization",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が EC2、Fargate、Lambda を組み合わせたマイクロサービスアーキテクチャを運用している。各サービスのインスタンスタイプは将来変更する可能性があるが、全体の compute 使用量コミットメントでコストを削減したい。最も適切な方法はどれか。",
    context:
      "EC2 は m 系・c 系を混在。Fargate と Lambda も使用中。今後インスタンスタイプを最適化していく予定があります。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "各インスタンスタイプに合わせて Standard Reserved Instance を個別に購入する", hint: "将来のタイプ変更に対応できない。管理も複雑になる" },
      { id: "b", label: "B", text: "EC2 Instance Savings Plans を購入する", hint: "EC2 Instance Savings Plans は特定のインスタンスファミリー・リージョンに限定されるため柔軟性が低い" },
      { id: "c", label: "C", text: "Compute Savings Plans を購入する", hint: "EC2・Fargate・Lambda に横断して適用でき、インスタンスファミリーやリージョンの変更にも対応" },
      { id: "d", label: "D", text: "すべてのワークロードをスポットインスタンスに移行する", hint: "本番のマイクロサービスをすべてスポットにするのは中断リスクが高く非現実的" },
    ],
    explanation:
      "Compute Savings Plans は EC2（インスタンスファミリー・リージョン・OS 不問）、Fargate、Lambda に横断して適用される柔軟なコミットメントプランです。インスタンスファミリーを変更しても自動的に割引が適用され続けます。EC2 Instance Savings Plans は特定ファミリー・リージョンに縛られ、Standard RI は特定インスタンスタイプに固定されます。",
    comparePoint:
      "Compute Savings Plans：EC2・Fargate・Lambda に適用・最も柔軟。EC2 Instance Savings Plans：EC2 のみ・ファミリー固定・割引やや大きい。Standard RI：インスタンスタイプ固定・最大割引。",
    rememberAxis:
      "複数の compute サービスを使い、将来変更の可能性あり → Compute Savings Plans。EC2 のみで変更なし → Standard RI。",
  },
  {
    id: "scenario-cost-5",
    category: "Cost Optimization",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が本番環境で r5.4xlarge（16 vCPU / 128 GiB メモリ）EC2 インスタンスを使用しているが、実際の CPU 使用率は常時 15% 未満でメモリも 40 GiB 程度しか使っていない。コストを削減するために最初に取るべき行動はどれか。",
    context:
      "CloudWatch のメトリクスを見ると CPU・メモリ共に大幅に過剰スペックです。ダウンタイムは最小化したい。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "AWS Compute Optimizer の推奨事項を確認し、適切なインスタンスサイズへダウンサイズする", hint: "Compute Optimizer はメトリクスを分析して最適なインスタンスタイプ・サイズを推奨する" },
      { id: "b", label: "B", text: "直ちにスポットインスタンスに切り替える", hint: "スポットは中断リスクがあり本番には慎重な検討が必要。まずサイジングを見直すべき" },
      { id: "c", label: "C", text: "インスタンスを削除して Lambda に移行する", hint: "移行には大幅な設計変更が必要。まず既存環境のサイジング最適化が先決" },
      { id: "d", label: "D", text: "Reserved Instance を購入してコストを削減する", hint: "過剰スペックなまま RI を購入しても無駄なスペックのコミットが残る。先にサイジングを最適化すべき" },
    ],
    explanation:
      "過剰スペックのインスタンスは、まず AWS Compute Optimizer でサイジングを最適化するのが正しいアプローチです。Compute Optimizer は過去の CloudWatch メトリクスを機械学習で分析し、コスト効率と性能を両立する最適なインスタンスタイプ・サイズを推奨します。サイジング最適化後に Reserved Instance や Savings Plans を検討するのが正しい順序です。",
    comparePoint:
      "Compute Optimizer：ML ベースのサイジング推奨・無料で利用可能。AWS Cost Explorer：コスト分析・RI 推奨。Trusted Advisor：コスト・セキュリティ・パフォーマンスの幅広いチェック。",
    rememberAxis:
      "インスタンスが過剰スペックか確認したい → Compute Optimizer。コストの傾向分析・RI 推奨 → Cost Explorer。まずサイジング → 次にコミットメント購入の順番で。",
  },

  // ── シナリオ: セキュリティ設計 ───────────────────────────────────────────

  {
    id: "scenario-sec-1",
    category: "Security",
    modeLabel: "シナリオ",
    prompt:
      "ある企業の EC2 インスタンス上のアプリケーションが Amazon S3 バケットへアクセスする必要がある。開発者がアクセスキーをコード内にハードコードしているのを発見した。最もセキュアな修正方法はどれか。",
    context:
      "コード内の認証情報は git リポジトリにも含まれている恐れがあります。最小権限も徹底したい。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "アクセスキーを環境変数に移し、EC2 の .env ファイルに保存する", hint: "環境変数でも EC2 上のファイルに残るためリスクが残る" },
      { id: "b", label: "B", text: "S3 への最小権限アクセスを許可する IAM ロールを作成し、EC2 インスタンスプロファイルとしてアタッチする", hint: "アクセスキー不要でインスタンスが自動的に一時認証情報を取得する最善策" },
      { id: "c", label: "C", text: "AWS Secrets Manager にアクセスキーを保存し、アプリから取得する", hint: "Secrets Manager は有効だが、EC2 から S3 へのアクセスには IAM ロールがよりシンプルで適切" },
      { id: "d", label: "D", text: "S3 バケットポリシーで EC2 のパブリック IP アドレスからのアクセスを許可する", hint: "IP ベースのアクセス制御は IP 変更時に破綻し、長期認証情報の問題も解決しない" },
    ],
    explanation:
      "EC2 から AWS サービスへのアクセスには IAM ロール（インスタンスプロファイル）を使用するのがベストプラクティスです。ロールをアタッチすると、EC2 のメタデータエンドポイント（169.254.169.254）から自動的に一時認証情報を取得します。長期的なアクセスキーが不要になり、認証情報のローテーション管理も不要です。最小権限の原則に従い、必要な S3 操作だけを許可するポリシーをロールにアタッチします。",
    comparePoint:
      "IAM ロール（インスタンスプロファイル）：アクセスキー不要・自動ローテーション・最も安全。アクセスキー：長期認証情報・漏洩リスクあり・非推奨。Secrets Manager：DB パスワードや外部 API キーの管理に適切。",
    rememberAxis:
      "EC2 から AWS サービスへのアクセス → IAM ロール（アクセスキーは使わない）。外部 API キーや DB パスワードの管理 → Secrets Manager。",
  },
  {
    id: "scenario-sec-2",
    category: "Security",
    modeLabel: "シナリオ",
    prompt:
      "ある医療系企業が患者データを Amazon S3 に保存している。規制要件として、S3 に保存されるすべてのデータを暗号化する必要があり、暗号化キーの管理は AWS が行いつつも企業がキーの使用を監査・制御できる必要がある。最も適切な暗号化方式はどれか。",
    context:
      "キーの完全な自己管理（HSM）は要件外。ただしキーポリシーで使用を制御できる必要があります。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "SSE-S3（Amazon S3 マネージドキー）で暗号化する", hint: "S3 が自動管理。キーの制御・監査はできない" },
      { id: "b", label: "B", text: "クライアントサイド暗号化で S3 にアップロードする", hint: "自社でキーを完全管理する必要があり、要件の「AWS がキーを管理」と異なる" },
      { id: "c", label: "C", text: "SSE-KMS（AWS KMS マネージドキー）で暗号化する", hint: "AWS KMS がキーを管理しつつ、キーポリシーで使用制御・CloudTrail で監査が可能" },
      { id: "d", label: "D", text: "AWS CloudHSM を使用したキーでクライアントサイド暗号化する", hint: "CloudHSM は専用 HSM での完全自己管理。要件より過剰でコストも高い" },
    ],
    explanation:
      "SSE-KMS は AWS KMS（Key Management Service）がキーを管理し、S3 がデータを暗号化・復号します。KMS キーポリシーで「誰がキーを使えるか」を細かく制御でき、CloudTrail と連携してキーの使用ログをすべて記録・監査できます。SSE-S3 はキーが完全に S3 マネージドでアクセス制御・監査ができません。CloudHSM は要件より過剰です。",
    comparePoint:
      "SSE-S3：S3 が全自動管理・監査不可・最安。SSE-KMS：KMS 管理・ポリシー制御・監査可能・推奨。SSE-C：顧客がキーを指定・S3 は保持しない。CloudHSM：専用 HSM・完全自己管理。",
    rememberAxis:
      "キー制御・監査が必要 → SSE-KMS。完全自動・監査不要 → SSE-S3。自社 HSM・規制最高レベル → CloudHSM。",
  },
  {
    id: "scenario-sec-3",
    category: "Security",
    modeLabel: "シナリオ",
    prompt:
      "ある企業がプライベートサブネット内の EC2 から Amazon S3 に大量のデータをアップロードしている。現在は NAT Gateway 経由でインターネットに出てから S3 に到達しており、NAT Gateway のデータ転送料金が高額になっている。セキュリティを維持しつつコストを削減するには何が最適か。",
    context:
      "EC2 はプライベートサブネットにあり、インターネットへの直接アクセスは禁止されています。S3 への通信は AWS 内で完結させたい。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "S3 用の Gateway VPC エンドポイントを作成し、ルートテーブルを更新する", hint: "Gateway VPC エンドポイントは無料で S3 への通信を AWS バックボーン経由にできる" },
      { id: "b", label: "B", text: "EC2 にパブリック IP を付与して直接 S3 へアクセスする", hint: "プライベートサブネットの EC2 にパブリック IP を付与するとセキュリティ要件に違反する" },
      { id: "c", label: "C", text: "S3 Transfer Acceleration を有効化する", hint: "Transfer Acceleration は外部からの高速アップロード用。VPC 内からのコスト削減には無関係" },
      { id: "d", label: "D", text: "Interface VPC エンドポイントを S3 に作成する", hint: "S3 の Interface エンドポイントも可能だが Gateway エンドポイントが無料で優先される" },
    ],
    explanation:
      "S3（と DynamoDB）は Gateway 型の VPC エンドポイントをサポートしており、作成するだけで利用料金は無料です。ルートテーブルに S3 エンドポイントへのルートを追加すると、プライベートサブネットからの S3 トラフィックが NAT Gateway を経由せず AWS のバックボーンネットワーク経由で直接届きます。NAT Gateway のデータ処理コストが削減され、セキュリティも維持できます。",
    comparePoint:
      "Gateway VPC エンドポイント：無料・S3/DynamoDB のみ・ルートテーブルで制御。Interface VPC エンドポイント（PrivateLink）：有料・多くのサービス対応・DNS で解決。",
    rememberAxis:
      "プライベートサブネットから S3 へ NAT なしでアクセス → Gateway VPC エンドポイント（無料）。他の AWS サービスへのプライベートアクセス → Interface VPC エンドポイント（PrivateLink）。",
  },
  {
    id: "scenario-sec-4",
    category: "Security",
    modeLabel: "シナリオ",
    prompt:
      "ある企業がアプリケーションから RDS データベースへの接続にユーザー名とパスワードを使用している。パスワードは現在 EC2 の設定ファイルに平文で保存されている。セキュリティを向上させ、パスワードの定期ローテーションも自動化したい。最も適切なサービスはどれか。",
    context:
      "セキュリティ監査でハードコードされた認証情報が問題視されました。今後は 90 日ごとの自動ローテーションが要件です。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "AWS Systems Manager Parameter Store（SecureString）に保存する", hint: "SecureString は暗号化保存できるが、自動ローテーション機能はない" },
      { id: "b", label: "B", text: "AWS Secrets Manager に保存し、RDS の自動ローテーションを設定する", hint: "Secrets Manager は RDS パスワードの自動ローテーションをネイティブサポートしている" },
      { id: "c", label: "C", text: "IAM データベース認証を使用して RDS へアクセスする", hint: "IAM 認証は有効だが、既存アプリのパスワード認証からの移行が必要で大規模な変更を伴う" },
      { id: "d", label: "D", text: "KMS で暗号化した設定ファイルを S3 に保存し、起動時に取得する", hint: "可能だが自動ローテーションの仕組みを別途構築する必要があり複雑" },
    ],
    explanation:
      "AWS Secrets Manager は DB パスワードや API キーなどのシークレットを安全に保存し、RDS・Aurora・Redshift のパスワード自動ローテーションをネイティブサポートしています。設定した間隔で Lambda が自動的にパスワードを変更し、アプリはコードを変更せずに最新のパスワードを取得できます。Parameter Store は暗号化保存はできますがローテーション機能がなく、手動または Lambda の自作が必要です。",
    comparePoint:
      "Secrets Manager：自動ローテーション・監査・RDS ネイティブ対応・有料（$0.40/シークレット/月）。Parameter Store SecureString：暗号化保存・ローテーションなし・安価。",
    rememberAxis:
      "DB パスワードの自動ローテーションが必要 → Secrets Manager。設定値の安全な保存（ローテーション不要）→ Parameter Store SecureString。",
  },
  {
    id: "scenario-sec-5",
    category: "Security",
    modeLabel: "シナリオ",
    prompt:
      "ある企業の AWS 環境で、深夜に普段使わないリージョンから大量の EC2 インスタンスが起動された。このような不審なアクティビティをリアルタイムで検知し、セキュリティチームに通知する仕組みを最小限の設定で実装したい。最も適切な方法はどれか。",
    context:
      "セキュリティ担当者が常時ログを監視することは現実的でない。自動検知・通知の仕組みが必要です。",
    correctChoiceId: "d",
    choices: [
      { id: "a", label: "A", text: "CloudTrail ログを S3 に保存し、Lambda で定期的にスキャンして異常を検知する", hint: "構築・維持が複雑。リアルタイム検知には不向き" },
      { id: "b", label: "B", text: "CloudWatch でカスタムメトリクスを作成し、EC2 起動数のアラームを設定する", hint: "特定のアクションには対応できるが、複合的な脅威パターンの検知能力は低い" },
      { id: "c", label: "C", text: "AWS Config ルールを作成して EC2 起動を監視する", hint: "AWS Config はリソース設定の準拠チェックが目的。脅威検知には不向き" },
      { id: "d", label: "D", text: "Amazon GuardDuty を有効化する", hint: "GuardDuty は ML ベースでCloudTrail・VPC フローログ・DNS ログを分析し、異常なパターンを自動検知する" },
    ],
    explanation:
      "Amazon GuardDuty はワンクリックで有効化でき、CloudTrail・VPC フローログ・DNS ログを機械学習で継続分析します。普段使わないリージョンでの EC2 起動、クレデンシャルの不審な使用、クリプトマイニングなどの脅威を自動検知し、EventBridge + SNS で通知を送ることができます。カスタム実装なしで脅威インテリジェンスを活用できるのが最大の利点です。",
    comparePoint:
      "GuardDuty：ML ベース脅威検知・設定最小・自動更新の脅威インテリジェンス。CloudTrail + Lambda：カスタム検知・構築コスト高。CloudWatch：メトリクス監視・脅威パターン検知は限定的。",
    rememberAxis:
      "不審なアクティビティの自動検知・最小設定 → GuardDuty。API 操作の証跡記録 → CloudTrail。設定準拠チェック → AWS Config。",
  },

  // ── シナリオ: サーバーレス設計 ───────────────────────────────────────────

  {
    id: "scenario-sls-1",
    category: "Serverless",
    modeLabel: "シナリオ",
    prompt:
      "あるスタートアップがモバイルアプリ向けの REST API を構築したい。サーバー管理不要で、リクエスト数が少ないときはコストをほぼゼロに、急増時は自動スケールさせたい。最も適切な構成はどれか。",
    context:
      "現在ユーザー数は少ないが、急速に成長する可能性がある。インフラ運用に工数を割けない。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "Amazon API Gateway + AWS Lambda で REST API を構築する", hint: "リクエスト単位の課金・自動スケール・サーバー管理不要のサーバーレス API の王道構成" },
      { id: "b", label: "B", text: "ALB + EC2 Auto Scaling で構築する", hint: "スケーラブルだが最低 1 台の EC2 コストが発生し、管理も必要" },
      { id: "c", label: "C", text: "ECS Fargate + ALB で構築する", hint: "サーバー管理不要だがコンテナが常時稼働しリクエストがない時もコストが発生する" },
      { id: "d", label: "D", text: "EC2 に Express.js を直接デプロイする", hint: "最もシンプルだが管理が必要・スケールしない" },
    ],
    explanation:
      "API Gateway + Lambda はサーバーレス REST API の標準構成です。リクエスト数が少ないときのコストはほぼゼロ（Lambda は 100 万リクエスト/月まで無料枠あり）で、急増時はコンカレンシー上限まで自動スケールします。EC2 や Fargate はアイドル時もコストが発生します。Lambda の制約（最大 15 分・コールドスタート）が要件に合う場合はこの構成が最適です。",
    comparePoint:
      "API Gateway + Lambda：サーバーレス・リクエスト課金・管理不要・コールドスタートあり。Fargate：サーバーレスだが常時稼働コスト。EC2：管理必要・固定コスト。",
    rememberAxis:
      "サーバー管理不要・低トラフィック時のコスト最小 → API Gateway + Lambda。長時間処理・常時接続 → EC2 or Fargate。",
  },
  {
    id: "scenario-sls-2",
    category: "Serverless",
    modeLabel: "シナリオ",
    prompt:
      "ある EC サイトが注文処理システムを構築している。注文受付（フロントエンド）と在庫更新・決済処理（バックエンド）を疎結合にして、バックエンドが一時的に停止してもフロントエンドが影響を受けないようにしたい。最も適切な構成はどれか。",
    context:
      "バックエンドの処理は順序保証不要だが、注文は確実に処理される必要があります。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "フロントエンドからバックエンドの REST API を直接同期呼び出しする", hint: "バックエンド障害がフロントエンドに直接影響する。密結合" },
      { id: "b", label: "B", text: "Amazon SNS でフロントエンドから通知を送り、バックエンドが受信する", hint: "SNS は Pub/Sub。ポーリング不要だが、バックエンドが停止中のメッセージは失われる可能性がある" },
      { id: "c", label: "C", text: "Amazon SQS キューを間に挟み、フロントエンドがキューへメッセージを送信、バックエンドがポーリングして処理する", hint: "SQS がメッセージを保持するためバックエンド停止中のメッセージも失われない。疎結合の定番" },
      { id: "d", label: "D", text: "フロントエンドと バックエンドを同じ Lambda 関数内でまとめて処理する", hint: "結合度が上がり、障害が波及しやすくなる" },
    ],
    explanation:
      "SQS（Simple Queue Service）はプロデューサー（注文受付）とコンシューマー（在庫・決済処理）を疎結合にする標準的なパターンです。バックエンドが停止していてもメッセージは SQS に保持され（デフォルト 4 日、最大 14 日）、復旧後に処理されます。SNS との違いは、SQS はメッセージをキューに保持してコンシューマーがポーリングする「プル型」で、耐久性が高い点です。",
    comparePoint:
      "SQS：キューにメッセージ保持・コンシューマーがポーリング・メッセージ損失なし・疎結合。SNS：プッシュ型・即時配信・購読者が停止中はメッセージ消失リスクあり。",
    rememberAxis:
      "システム間の疎結合・バッファリング → SQS。複数の購読者へのファンアウト通知 → SNS。SQS + SNS の組み合わせ → ファンアウトパターン。",
  },
  {
    id: "scenario-sls-3",
    category: "Serverless",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が S3 に動画ファイルがアップロードされたとき、トランスコード処理・サムネイル生成・メタデータ抽出の 3 つの処理を並行して実行したい。各処理は独立した Lambda 関数で実装されている。最も適切なイベント配信方法はどれか。",
    context:
      "S3 イベントを複数の Lambda に同時配信する必要があります。処理の追加・削除を柔軟に行えると望ましい。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "S3 イベント通知を各 Lambda に直接設定する（3 つのトリガーを登録）", hint: "S3 は同じイベントタイプに対して複数の直接 Lambda 通知を設定できない" },
      { id: "b", label: "B", text: "S3 → Amazon EventBridge → 複数の Lambda ルールでファンアウトする", hint: "EventBridge はイベントを複数のターゲットに同時配信でき、ルールの追加・変更が柔軟" },
      { id: "c", label: "C", text: "S3 → SNS → 3 つの Lambda をサブスクリプションとして登録する", hint: "SNS + Lambda も有効なファンアウトパターンだが EventBridge ほど柔軟ではない" },
      { id: "d", label: "D", text: "1 つのオーケストレーター Lambda が他の 2 つを順番に呼び出す", hint: "順番に呼び出すと並行実行にならず時間がかかる。密結合にもなる" },
    ],
    explanation:
      "Amazon EventBridge は S3 イベントを受け取り、ルールで複数のターゲット（Lambda、SQS、Step Functions 等）へ同時配信できます。処理の追加はルールとターゲットを追加するだけで S3 側の設定変更が不要です。SNS + Lambda も類似のファンアウトパターンですが、EventBridge はよりリッチなフィルタリングと多様なターゲットサービスをサポートします。S3 から Lambda への直接トリガーは同一イベントタイプへの複数設定が制限されます。",
    comparePoint:
      "EventBridge：柔軟なルール・多様なターゲット・イベントフィルタリング・アーキテクチャの疎結合化。SNS：シンプルなファンアウト・プッシュ型。S3 直接 Lambda：単一ターゲットに限定。",
    rememberAxis:
      "1 つのイベントを複数の処理に同時配信 → EventBridge or SNS ファンアウト。複数 Lambda の順序制御・条件分岐 → Step Functions。",
  },
  {
    id: "scenario-sls-4",
    category: "Serverless",
    modeLabel: "シナリオ",
    prompt:
      "ある企業がローン審査ワークフローをサーバーレスで実装したい。「書類確認 → 信用スコア取得 → 審査判定 → 通知送信」という順序で処理し、各ステップが失敗した場合はリトライまたはエラー処理を行いたい。最も適切なサービスはどれか。",
    context:
      "各ステップは個別の Lambda 関数。ステップ間の状態管理・エラーハンドリング・リトライを一元管理したい。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "Lambda 関数が次の Lambda を直接 SDK で呼び出すチェーン方式にする", hint: "エラーハンドリングが複雑になり、状態管理が各 Lambda に分散する" },
      { id: "b", label: "C", text: "SQS キューをステップ間に挟んでメッセージを渡す", hint: "非同期で疎結合にはなるが、順序制御・状態管理・エラーハンドリングの一元管理が難しい" },
      { id: "c", label: "C", text: "AWS Step Functions で各 Lambda をステートとして定義し、ワークフローを管理する", hint: "ステート間の遷移・エラーハンドリング・リトライをビジュアルワークフローで管理できる" },
      { id: "d", label: "D", text: "Amazon SWF（Simple Workflow Service）を使用する", hint: "SWF は古いサービスで新規開発には Step Functions が推奨される" },
    ],
    explanation:
      "AWS Step Functions は Lambda 関数や他の AWS サービスをステートマシンとして定義し、複雑なワークフローのオーケストレーションを行います。JSON（Amazon States Language）でステート遷移・エラー処理（Catch）・リトライ（Retry）・並行実行（Parallel）・条件分岐（Choice）を定義でき、実行状況をビジュアルで追跡できます。Lambda チェーンは管理が複雑になり、SQS は順序制御・状態管理が難しいです。",
    comparePoint:
      "Step Functions：ワークフロー管理・エラーハンドリング・状態の可視化・複雑なフロー制御。SQS：疎結合・非同期・シンプルなキューイング。Lambda チェーン：シンプルだが管理が分散。",
    rememberAxis:
      "順序制御・エラーハンドリング・リトライを一元管理 → Step Functions。疎結合な非同期処理 → SQS。単純なイベント配信 → EventBridge or SNS。",
  },
  {
    id: "scenario-sls-5",
    category: "Serverless",
    modeLabel: "シナリオ",
    prompt:
      "あるゲーム会社がリアルタイムランキング機能を実装したい。毎秒数万件のスコア更新が発生し、上位 100 名のランキングをミリ秒で返す必要がある。データは永続化も必要。最も適切なデータストアの構成はどれか。",
    context:
      "既存のユーザーデータは RDS に保存されています。ランキングは別途最適なデータストアで管理したい。",
    correctChoiceId: "d",
    choices: [
      { id: "a", label: "A", text: "RDS にスコアテーブルを追加し、ORDER BY でランキングを取得する", hint: "毎秒数万件の更新と ORDER BY クエリは RDS の負荷が高く、ミリ秒応答は困難" },
      { id: "b", label: "B", text: "DynamoDB にスコアを保存し、GSI でランキング順に取得する", hint: "DynamoDB は高速だが、リアルタイムの順位計算や上位 N 件の効率的な取得は設計が複雑" },
      { id: "c", label: "C", text: "S3 にスコアファイルを保存し、Lambda で定期的にランキングを計算する", hint: "定期バッチ処理はリアルタイムランキングには不向き" },
      { id: "d", label: "D", text: "ElastiCache for Redis の Sorted Set を使ってリアルタイムランキングを管理する", hint: "Redis の Sorted Set は O(log N) でスコアを更新・取得でき、ランキングに最適なデータ構造" },
    ],
    explanation:
      "Redis の Sorted Set（ZADD/ZRANK/ZRANGE コマンド）はスコア付きのメンバー集合をソート済みで管理するデータ構造で、リアルタイムランキングに最適です。O(log N) でスコア更新・上位 N 件取得ができ、ElastiCache for Redis はインメモリでミリ秒以下の応答を実現します。永続化には既存の RDS や DynamoDB と組み合わせます。RDS の ORDER BY は大量の書き込みと高頻度クエリには性能的に限界があります。",
    comparePoint:
      "ElastiCache Redis Sorted Set：インメモリ・O(log N)・ランキングに最適。DynamoDB：高スループット・ランキング設計は複雑。RDS：リレーショナル・ランキングクエリは重い。",
    rememberAxis:
      "リアルタイムランキング・スコアボード → Redis Sorted Set（ElastiCache）。高速キャッシュ → Redis or Memcached。永続的なデータ保存 → RDS or DynamoDB。",
  },

  // ── シナリオ: データベース選定 ───────────────────────────────────────────

  {
    id: "scenario-db-1",
    category: "Database",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が Oracle データベースで運用している基幹システムを AWS に移行したい。SQL の互換性を維持しつつ、Oracle のライセンスコストを削減したい。データ量は 5 TB で複雑な JOIN クエリが多い。最も適切な移行先はどれか。",
    context:
      "アプリケーション側の SQL を大きく書き換えずに移行したい。マネージドサービスで運用負荷を下げる方針です。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "Amazon DynamoDB に移行する", hint: "DynamoDB は NoSQL でリレーショナル SQL 互換性がなく、大規模な書き換えが必要" },
      { id: "b", label: "B", text: "AWS DMS を使って Amazon Aurora PostgreSQL へ移行する", hint: "Aurora PostgreSQL は Oracle と高い SQL 互換性を持ち、DMS でスキーマ・データを移行できる" },
      { id: "c", label: "C", text: "Amazon Redshift に移行する", hint: "Redshift は OLAP（分析系）向けで、OLTP の基幹システムには不向き" },
      { id: "d", label: "D", text: "Amazon RDS for Oracle に移行する", hint: "RDS for Oracle は AWS で管理可能だが Oracle ライセンスが引き続き必要でコスト削減効果が限定的" },
    ],
    explanation:
      "Oracle からのライセンスコスト削減を目的とした移行では、Aurora PostgreSQL が最も多く採用されます。PostgreSQL は Oracle と高い SQL 互換性があり、AWS Schema Conversion Tool（SCT）でスキーマ変換、DMS（Database Migration Service）でデータ移行を行います。Aurora は RDS MySQL/PostgreSQL より最大 3 倍高速で、マネージド運用でライセンス不要です。DynamoDB への移行は SQL の全面書き換えが必要で要件に合いません。",
    comparePoint:
      "Aurora PostgreSQL：Oracle と SQL 互換性高・ライセンスフリー・高パフォーマンス。RDS for Oracle：ライセンスコスト継続。DynamoDB：NoSQL・SQL 互換なし。Redshift：分析特化・OLTP 不向き。",
    rememberAxis:
      "Oracle から移行・SQL 互換維持・ライセンス削減 → Aurora PostgreSQL + DMS + SCT。分析・集計 → Redshift。キーバリュー高速アクセス → DynamoDB。",
  },
  {
    id: "scenario-db-2",
    category: "Database",
    modeLabel: "シナリオ",
    prompt:
      "ある EC サイトの商品詳細ページが RDS の読み取り負荷増大でレスポンスが遅くなっている。商品情報はほぼ静的で変更は 1 日数回程度。読み取りは秒間数千リクエスト。コストを抑えつつ最速でパフォーマンスを改善したい。最も適切な対策はどれか。",
    context:
      "DB スキーマの変更は困難。アプリケーション側でキャッシュレイヤーを追加できます。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "ElastiCache for Memcached または Redis を導入し、商品データをキャッシュする", hint: "インメモリキャッシュで RDB へのアクセスを大幅に削減し、ミリ秒以下で応答できる" },
      { id: "b", label: "B", text: "RDS のリードレプリカを追加し、読み取りを分散する", hint: "リードレプリカも有効だが、DB への通信は発生し続けるため ElastiCache ほど速くない" },
      { id: "c", label: "C", text: "RDS のインスタンスサイズをアップグレードする", hint: "即効性はあるがコストが高く、根本的な解決にならない" },
      { id: "d", label: "D", text: "CloudFront を導入して商品ページ全体をキャッシュする", hint: "静的コンテンツには有効だが、動的なユーザー固有データが混在する場合は複雑" },
    ],
    explanation:
      "ElastiCache（Memcached または Redis）は RDS の前段にインメモリキャッシュ層を設置し、頻繁に読まれる商品データを RAM に保持します。RDS へのクエリがキャッシュヒットに変わることで負荷が劇的に減り、ミリ秒以下のレスポンスが実現できます。商品情報が変更された際はキャッシュを無効化（または TTL 設定）します。リードレプリカも有効ですが、DB へのネットワーク往復は残るため ElastiCache ほどの効果はありません。",
    comparePoint:
      "ElastiCache：インメモリ・最速・RDB 負荷激減・キャッシュ無効化の仕組みが必要。リードレプリカ：DB 負荷分散・レプリケーション遅延あり・キャッシュより遅い。",
    rememberAxis:
      "DB の読み取り負荷を最速で解消 → ElastiCache（キャッシュ）。読み取りを複数 DB に分散 → リードレプリカ。両方を組み合わせるのがベストプラクティス。",
  },
  {
    id: "scenario-db-3",
    category: "Database",
    modeLabel: "シナリオ",
    prompt:
      "あるメディア企業が RDS MySQL でブログ記事を管理している。記事の閲覧は書き込みの 20 倍のトラフィックがある。書き込みは管理画面からのみで少ないが、読み取りで DB のCPUが 80% を超えている。アーキテクチャ変更を最小限にしてスケールさせたい。最も適切な方法はどれか。",
    context:
      "スキーマ変更・アプリの大規模改修は避けたい。読み取り専用の SQL クエリをオフロードできる。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "RDS インスタンスを垂直スケールアップ（インスタンスサイズを上げる）する", hint: "一時的な効果はあるが限界があり、コストが高い。根本的な解決にならない" },
      { id: "b", label: "B", text: "DynamoDB に記事データを移行する", hint: "移行コストが大きく、スキーマ・アプリの大幅改修が必要" },
      { id: "c", label: "C", text: "RDS リードレプリカを作成し、アプリの読み取りクエリをレプリカに向ける", hint: "プライマリの変更なし・リードレプリカを非同期レプリケーションで作成・読み取り負荷を分散" },
      { id: "d", label: "D", text: "Aurora に移行してオートスケーリングを設定する", hint: "Aurora の Aurora Serverless や Aurora Replica Auto Scaling は有効だが移行コストが発生する" },
    ],
    explanation:
      "RDS リードレプリカはプライマリ DB から非同期でレプリケーションしたインスタンスで、SELECT クエリをオフロードできます。MySQL は最大 5 つのリードレプリカを追加でき、アプリ側で読み取り用の接続先エンドポイントを変更するだけです。スキーマ変更不要で最小限の改修でスケールできます。わずかなレプリケーション遅延（最新でない可能性）は許容できます。ElastiCache との組み合わせでさらに効果的です。",
    comparePoint:
      "リードレプリカ：読み取りオフロード・非同期・軽微なアプリ変更で対応。Multi-AZ：高可用性・フェイルオーバー（読み取りオフロードではない）。ElastiCache：さらに高速なキャッシュ層。",
    rememberAxis:
      "読み取り負荷の分散 → リードレプリカ。AZ 障害のフェイルオーバー → Multi-AZ。読み取りのキャッシュ → ElastiCache。",
  },
  {
    id: "scenario-db-4",
    category: "Database",
    modeLabel: "シナリオ",
    prompt:
      "ある会社が自社のオンプレミスの PostgreSQL（100 GB）を AWS に移行したい。移行中もオンプレのDBを稼働させ続け、ダウンタイムを最小化したい。移行後は Amazon Aurora PostgreSQL で運用する予定。最も適切な移行手順はどれか。",
    context:
      "移行は週末の深夜に行うが、ダウンタイムは 1 時間以内に収めたい。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "AWS DMS の継続的レプリケーション（CDC）でオンプレから Aurora へリアルタイム同期し、切替時に接続先を変更する", hint: "DMS CDC は本番稼働中に差分をリアルタイム同期し、切替時のダウンタイムをほぼゼロにできる" },
      { id: "b", label: "B", text: "pg_dump でスナップショットを取得して Aurora へリストアする", hint: "100 GB のリストアには数時間かかり、その間のデータ更新が失われるためダウンタイムが長くなる" },
      { id: "c", label: "C", text: "AWS Snowball でデータをエクスポートし、Aurora へインポートする", hint: "Snowball は TB〜PB 規模のデータ転送向け。100 GB であればネットワーク経由で十分" },
      { id: "d", label: "D", text: "Aurora の S3 インポート機能を使ってデータを移行する", hint: "S3 経由のインポートは可能だが継続的な差分同期機能がなく、静止点が必要" },
    ],
    explanation:
      "AWS DMS（Database Migration Service）は初回の全量移行（Full Load）後に CDC（Change Data Capture）で差分を継続レプリケーションします。本番オンプレが稼働中でもリアルタイムで Aurora に同期し続け、切替時は接続先 DSN を変更するだけでほぼゼロダウンタイムの移行ができます。pg_dump は単純ですが、リストア中の差分が失われる問題があります。AWS SCT（Schema Conversion Tool）と組み合わせると互換性のない DDL の変換も自動化できます。",
    comparePoint:
      "DMS（CDC）：ほぼゼロダウンタイム・リアルタイム差分同期・推奨手法。pg_dump + restore：シンプルだがダウンタイム発生。Snowball：大規模データ（TB〜）向け。",
    rememberAxis:
      "ダウンタイム最小化で DB 移行 → DMS + CDC。スキーマ変換が必要 → SCT + DMS の組み合わせ。大容量データのオフライン移行 → Snowball。",
  },
  {
    id: "scenario-db-5",
    category: "Database",
    modeLabel: "シナリオ",
    prompt:
      "ある小売企業が各店舗の販売データ（合計 50 TB）を分析して、売れ筋商品・地域別トレンド・在庫最適化のレポートを作成したい。データは毎日バッチで追加される。複雑な集計クエリの実行時間を短縮したい。最も適切なサービスはどれか。",
    context:
      "現在は RDS に全データを入れているが、分析クエリが遅く業務に支障が出ています。",
    correctChoiceId: "d",
    choices: [
      { id: "a", label: "A", text: "RDS のインスタンスをアップグレードしてクエリを最適化する", hint: "OLTP 向け RDS に 50 TB の分析データを置くのは根本的に設計が合っていない" },
      { id: "b", label: "B", text: "DynamoDB にデータを移行する", hint: "DynamoDB は NoSQL でアクセスパターンが固定化される。複雑な集計クエリには不向き" },
      { id: "c", label: "C", text: "S3 にデータを保存して Amazon Athena でクエリする", hint: "Athena はサーバーレスで費用対効果が高いが、50 TB の複雑な集計クエリは Redshift より遅くなる可能性がある" },
      { id: "d", label: "D", text: "Amazon Redshift にデータをロードし、分析クエリを実行する", hint: "Redshift は列指向 MPP データウェアハウスで大規模 OLAP クエリに最適化されている" },
    ],
    explanation:
      "Amazon Redshift は列指向の MPP（大規模並列処理）データウェアハウスで、TB〜PB スケールの分析クエリに特化しています。データを列単位で圧縮・分散保持するため、大量データのスキャン・集計が高速です。毎日の販売データは S3 経由で Redshift にロード（COPY コマンド）し、SQL で複雑な集計レポートを生成します。RDS は OLTP 向けで大量データの分析には不向きです。Athena はサーバーレスで低コストですが、超大規模データの複雑クエリでは Redshift の方が高速です。",
    comparePoint:
      "Redshift：列指向 MPP・大規模 OLAP・高速集計・DWH の定番。Athena：サーバーレス・S3 を直接クエリ・従量課金・中規模分析に適切。RDS：OLTP 向け・大量集計には不向き。",
    rememberAxis:
      "TB 以上の大規模分析・DWH → Redshift。S3 データをアドホックにクエリ → Athena。リアルタイムの OLTP 処理 → RDS/Aurora。",
  },

  // ── シナリオ: ストレージ ──────────────────────────────────────────────────

  {
    id: "scenario-storage-1",
    category: "Storage",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が S3 に保存している画像ファイル（合計 10 TB）のストレージコストを削減したい。ファイルの 80% は作成から 30 日後にほとんどアクセスされなくなる。残り 20% は頻繁にアクセスされる。最もコスト効率の高い構成はどれか。",
    context:
      "現在はすべての画像を S3 Standard に保存しています。コスト削減が最優先です。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "すべてのファイルを S3 Glacier Instant Retrieval に移動する", hint: "頻繁にアクセスされるファイルを Glacier に移すとアクセスコストが高くなる" },
      { id: "b", label: "B", text: "S3 ライフサイクルポリシーで 30 日後に S3 Standard-IA へ自動移行する", hint: "30 日後のアクセス頻度が低いファイルを Standard-IA に移すことでストレージコストを削減できる" },
      { id: "c", label: "C", text: "S3 Intelligent-Tiering を有効化してすべてのオブジェクトを管理する", hint: "Intelligent-Tiering は自動で最適化するが、小さなオブジェクトにはモニタリング料金が割高になる場合がある" },
      { id: "d", label: "D", text: "EFS に移行してコスト削減する", hint: "EFS は S3 より高価なファイルストレージ。画像保存用途では逆効果" },
    ],
    explanation:
      "S3 ライフサイクルポリシーを使い、作成から 30 日後に自動的に S3 Standard-IA（Infrequent Access）へ移行するのが最適です。Standard-IA は Standard よりストレージ単価が約 40% 安く、アクセス頻度が低いデータに適しています。頻繁にアクセスされる 20% は Standard のままなので、アクセスコストも最適化されます。Intelligent-Tiering はアクセスパターンが読めない場合に有効ですが、定期的なアクセス低下がわかっているならライフサイクルポリシーの方がシンプルで確実です。",
    comparePoint:
      "S3 Standard：高頻度アクセス向け・高コスト。S3 Standard-IA：低頻度アクセス向け・約 40% 安。S3 Glacier：長期アーカイブ・取得に時間。S3 Intelligent-Tiering：自動最適化・モニタリング費用あり。",
    rememberAxis:
      "アクセスパターンが予測可能 → ライフサイクルポリシーで Standard → Standard-IA → Glacier と段階移行。アクセスパターン不明 → Intelligent-Tiering。",
  },
  {
    id: "scenario-storage-2",
    category: "Storage",
    modeLabel: "シナリオ",
    prompt:
      "ある動画配信企業が、EC2 上の動画変換バッチ処理で生成した大量の一時ファイルを保存している。これらのファイルはバッチ完了後に削除され、複数の EC2 インスタンスから同時にアクセスされる必要がある。最適なストレージはどれか。",
    context:
      "バッチ処理は複数の EC2 インスタンスで並列実行されます。ファイルは処理中のみ必要で、完了後は不要です。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "各 EC2 インスタンスの EBS ボリュームにファイルを保存する", hint: "EBS は単一 EC2 インスタンス専用（io1/io2 の Multi-Attach を除く）。複数インスタンスからの同時アクセスには不向き" },
      { id: "b", label: "B", text: "S3 にファイルを保存し、各 EC2 から SDK でアクセスする", hint: "S3 は利用可能だがファイルシステムインターフェースが必要な場合は EFS の方が適切" },
      { id: "c", label: "C", text: "EFS（Elastic File System）を使用し、複数 EC2 から同時マウントする", hint: "EFS は NFS プロトコルで複数 EC2 から同時にマウント・アクセスできる共有ファイルシステム" },
      { id: "d", label: "D", text: "FSx for Windows File Server を使用する", hint: "FSx for Windows は Windows SMB プロトコル向け。Linux ベースの EC2 バッチ処理には EFS が適切" },
    ],
    explanation:
      "EFS（Elastic File System）は NFS v4 プロトコルを使った完全マネージドの共有ファイルシステムです。複数の EC2 インスタンスから同時にマウントして読み書きでき、共有ストレージが必要な並列バッチ処理に最適です。EBS は原則として単一 EC2 専用、S3 はオブジェクトストレージで POSIX ファイルシステムのセマンティクスとは異なります。一時ファイルでストレージコストを抑えたい場合は EFS の Infrequent Access ティアも活用できます。",
    comparePoint:
      "EFS：複数 EC2 から同時共有・NFS・Linux 向け・スケーラブル。EBS：単一 EC2 専用（原則）・高 IOPS・ブロックストレージ。S3：オブジェクトストレージ・HTTP API。FSx for Windows：SMB・Windows 向け。",
    rememberAxis:
      "複数 EC2 から同時アクセスが必要な共有ファイルシステム → EFS。Windows 共有フォルダ（SMB） → FSx for Windows。高 IOPS な単一 EC2 ストレージ → EBS。",
  },
  {
    id: "scenario-storage-3",
    category: "Storage",
    modeLabel: "シナリオ",
    prompt:
      "ある会社が EC2 インスタンス上でデータベースを運用している。データベースのトランザクションログは高い IOPS（16,000 IOPS 以上）が必要で、ディスク障害に備えてデータを失いたくない。最適な EBS ボリューム構成はどれか。",
    context:
      "現在は gp2 ボリュームを使用しているが IOPS が不足しています。データの耐久性も確保したい。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "io2 ボリュームを使用し、RAID 1 構成で 2 本組み合わせる", hint: "io2 は最大 64,000 IOPS を提供し、RAID 1 でデータを冗長化できる" },
      { id: "b", label: "B", text: "gp3 ボリュームを使用して IOPS をプロビジョニングする", hint: "gp3 は最大 16,000 IOPS まで設定可能。ちょうど境界値だが io2 の方が高 IOPS 要件には確実" },
      { id: "c", label: "C", text: "st1（スループット最適化 HDD）を使用する", hint: "st1 は大きなシーケンシャル I/O 向け。高 IOPS のランダム I/O には不向き" },
      { id: "d", label: "D", text: "sc1（コールドHDD）を使用する", hint: "sc1 は低コスト・低頻度アクセス向け。高 IOPS 要件には全く合わない" },
    ],
    explanation:
      "io2（Provisioned IOPS SSD）は最大 64,000 IOPS をプロビジョニングでき、高い IOPS が必要なデータベースワークロードに最適です。耐久性は 99.999%（5 つの 9）で io1 より高く、重要なデータ保護にも適しています。gp3 は最大 16,000 IOPS まで設定可能ですが、16,000 超の要件には io2 が必要です。RAID 1 はミラーリングによりディスク障害からデータを保護します。ただし AWS では EBS 自体がリージョン内で冗長化されているため、RAID 1 は追加の保護層として使います。",
    comparePoint:
      "io2：最大 64,000 IOPS・高耐久性（99.999%）・ミッションクリティカル DB 向け。gp3：最大 16,000 IOPS・コスト効率が良い・一般的なワークロード。st1：HDD・高スループット・低 IOPS。",
    rememberAxis:
      "16,000 IOPS 超が必要 → io2。コスト効率重視で 16,000 IOPS 以内 → gp3。大量シーケンシャル読み書き（ログ収集など） → st1。",
  },
  {
    id: "scenario-storage-4",
    category: "Storage",
    modeLabel: "シナリオ",
    prompt:
      "ある企業がオンプレミスのファイルサーバー（5 TB）を AWS に移行したい。移行後も社内のユーザーが Windows の共有フォルダ（\\\\server\\share）としてアクセスし続けられる必要がある。最適なソリューションはどれか。",
    context:
      "Active Directory と統合した認証が必要で、移行後も既存のアクセスパターンを変えたくない。",
    correctChoiceId: "d",
    choices: [
      { id: "a", label: "A", text: "S3 にファイルをアップロードし、S3 File Gateway でアクセスする", hint: "S3 File Gateway は NFS/SMB アクセスを S3 に変換するが、AD 統合や完全な Windows 互換性は FSx の方が優れている" },
      { id: "b", label: "B", text: "EFS（Elastic File System）を使用する", hint: "EFS は NFS プロトコルで Linux/Unix 向け。Windows の SMB 共有フォルダには対応しない" },
      { id: "c", label: "C", text: "EC2 に Windows Server を立て、ファイルサーバーを自己管理する", hint: "可能だが OS・ソフトウェアの管理が必要。マネージドサービスの FSx の方が運用コストが低い" },
      { id: "d", label: "D", text: "Amazon FSx for Windows File Server を使用する", hint: "Windows ネイティブの SMB プロトコル・AD 統合・DFS 名前空間をサポートした完全マネージドサービス" },
    ],
    explanation:
      "Amazon FSx for Windows File Server は Windows Server をベースにした完全マネージドのファイルシステムで、SMB プロトコル・Active Directory 統合・DFS（分散ファイルシステム）名前空間をネイティブにサポートします。既存の Windows ファイルサーバーとの互換性が最も高く、ユーザーはドライブ文字や UNC パス（\\\\server\\share）のまま移行後もアクセスできます。EC2 での自己管理は可能ですが、パッチ適用・バックアップなどの運用負担が増えます。",
    comparePoint:
      "FSx for Windows：SMB・AD 統合・完全マネージド・Windows ネイティブ互換。EFS：NFS・Linux 向け・マルチ AZ。S3 File Gateway：S3 バックエンドで NFS/SMB を提供・オンプレ向けキャッシュ。",
    rememberAxis:
      "Windows 共有フォルダ（SMB）・AD 統合が必要 → FSx for Windows File Server。Linux 共有ファイルシステム（NFS） → EFS。",
  },
  {
    id: "scenario-storage-5",
    category: "Storage",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が毎月 200 TB のデータをオンプレミスから S3 へ移行したい。現在のインターネット接続帯域は 1 Gbps で、他のトラフィックとの共有のため実質利用可能な帯域は限られている。転送を最短で完了させるには何を使うべきか。",
    context:
      "データの機密性が高く、インターネット経由での転送はセキュリティ上のリスクがある。1 回限りの大量移行です。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "AWS DataSync を使ってインターネット経由でデータを同期する", hint: "DataSync はデータ転送の自動化・高速化に優れるが、200 TB を 1 Gbps 回線で転送すると数日〜数週間かかる" },
      { id: "b", label: "B", text: "AWS Snowball Edge を使ってデータを物理的に AWS に送る", hint: "Snowball Edge は 80 TB 容量の物理デバイスで、複数台使えば 200 TB を数日で移行できる" },
      { id: "c", label: "C", text: "AWS Direct Connect を新規に開通してデータを転送する", hint: "Direct Connect の開通には数週間かかるため、急ぎの移行には不向き" },
      { id: "d", label: "D", text: "マルチパートアップロードを使って S3 に並列アップロードする", hint: "マルチパートは大きなファイルの信頼性向上に有効だが、帯域の制約は変わらない" },
    ],
    explanation:
      "200 TB のデータを 1 Gbps 回線で転送すると理論値でも約 18 日かかります（200 TB ÷ 125 MB/s）。実際の共有帯域ではさらに長くなります。AWS Snowball Edge は 80 TB 容量の物理デバイスで、3 台あれば 200 TB 以上を格納でき、宅配便で AWS のデータセンターへ送ることで数日以内に完了します。データは暗号化されて転送されるためセキュリティ要件も満たせます。さらに大規模（PB 以上）なら Snowball Edge 複数台を束ねる AWS Snowmobile も選択肢です。",
    comparePoint:
      "Snowball Edge：物理デバイス・80 TB/台・ネットワーク不要・大量一括移行に最適。DataSync：ネットワーク経由・継続的同期・100 TB 以下の差分同期向け。Direct Connect：専用線・レイテンシ低減・開通に時間。",
    rememberAxis:
      "TB 以上の一括移行でネットワーク転送が遅い → Snowball（Edge）。継続的な差分同期やオンプレ→AWSのレプリケーション → DataSync。専用帯域が必要 → Direct Connect。",
  },

  // ── シナリオ: ネットワーキング ────────────────────────────────────────────

  {
    id: "scenario-net-1",
    category: "Networking",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が VPC 内のプライベートサブネットにある EC2 インスタンスから、インターネット上の外部 API（HTTPS）を呼び出したい。EC2 はインターネットから直接アクセスされてはならない。最も適切な構成はどれか。",
    context:
      "VPC にはパブリックサブネットとプライベートサブネットがあります。プライベートサブネットの EC2 には EIP がありません。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "パブリックサブネットに NAT Gateway を配置し、プライベートサブネットのルートテーブルに追加する", hint: "NAT Gateway はアウトバウンド通信を許可しつつインバウンド接続を遮断するマネージドサービス" },
      { id: "b", label: "B", text: "EC2 に Elastic IP を付与してインターネットゲートウェイ経由で通信する", hint: "EIP を付与するとインターネットからも EC2 に直接アクセスできてしまう" },
      { id: "c", label: "C", text: "VPC ピアリングを使って他の VPC 経由でインターネットにアクセスする", hint: "VPC ピアリングは VPC 間の接続であり、インターネットアクセスの手段ではない" },
      { id: "d", label: "D", text: "プライベートサブネットのルートテーブルにインターネットゲートウェイを追加する", hint: "インターネットゲートウェイに直接ルーティングするとそのサブネットはパブリックになってしまう" },
    ],
    explanation:
      "NAT Gateway（またはレガシーの NAT Instance）をパブリックサブネットに配置し、プライベートサブネットのルートテーブルのデフォルトルート（0.0.0.0/0）を NAT Gateway に向けることで、EC2 からのアウトバウンド通信（外部 API 呼び出しなど）が可能になります。NAT は IP アドレス変換を行うため、外部からプライベート EC2 への直接インバウンド接続は不可能で、セキュリティ要件を満たせます。",
    comparePoint:
      "NAT Gateway：プライベートサブネットからのアウトバウンドのみ・インバウンド不可・マネージド。インターネットゲートウェイ：双方向通信・パブリックサブネット専用。",
    rememberAxis:
      "プライベートサブネット EC2 からインターネットへのアウトバウンドのみ → NAT Gateway。双方向のインターネット通信が必要 → インターネットゲートウェイ + EIP。",
  },
  {
    id: "scenario-net-2",
    category: "Networking",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が AWS 上のシステムとオンプレミスのデータセンターを接続したい。接続には低レイテンシと安定した帯域が必要で、インターネット経由の VPN では品質が不安定だった。最適な接続方法はどれか。",
    context:
      "オンプレ〜AWS 間のデータ転送は月に数十 TB あります。VPN の帯域不足とレイテンシのばらつきが問題でした。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "AWS Site-to-Site VPN を 2 本に増やして冗長化する", hint: "VPN の数を増やしてもインターネット回線のレイテンシ・不安定さは解消されない" },
      { id: "b", label: "B", text: "VPC ピアリングを使ってオンプレと接続する", hint: "VPC ピアリングは AWS アカウント間の VPC 接続。オンプレミスとの接続には使えない" },
      { id: "c", label: "C", text: "AWS Direct Connect を使って専用の物理回線を確立する", hint: "Direct Connect は ISP 経由の専用回線で、安定した低レイテンシと高帯域を提供する" },
      { id: "d", label: "D", text: "AWS Transit Gateway を使ってオンプレと接続する", hint: "Transit Gateway は複数 VPC とオンプレを集約接続するハブだが、物理回線は別途 Direct Connect か VPN が必要" },
    ],
    explanation:
      "AWS Direct Connect は専用の物理回線（通信キャリア経由）でオンプレミスと AWS を接続するサービスです。インターネットを経由しないため安定した低レイテンシと一貫した帯域幅を提供します。月次の大量データ転送にもコスト的に有利な場合があります。冗長性のために 2 本の Direct Connect 回線を用意するか、バックアップとして VPN と組み合わせることが推奨されます。",
    comparePoint:
      "Direct Connect：専用回線・安定・低レイテンシ・高帯域・高コスト・開通に時間。Site-to-Site VPN：インターネット経由・暗号化・低コスト・簡単に開通・レイテンシ不安定。",
    rememberAxis:
      "安定した低レイテンシ・大量データ転送 → Direct Connect。コスト重視・許容できるレイテンシ → Site-to-Site VPN。両方の冗長構成 → Direct Connect + VPN バックアップ。",
  },
  {
    id: "scenario-net-3",
    category: "Networking",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が複数の AWS アカウント（10 個）にまたがる VPC を相互に接続したい。各 VPC 間で通信が必要で、将来的にオンプレミスとの接続も追加する予定がある。最もスケーラブルな構成はどれか。",
    context:
      "現在は VPC ピアリングで接続しているが、VPC が増えるたびに接続数が爆発的に増えることが問題になっています。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "すべての VPC 間で VPC ピアリングを張り続ける", hint: "N 個の VPC を相互接続するには N×(N-1)/2 本のピアリングが必要で管理が困難" },
      { id: "b", label: "B", text: "AWS Transit Gateway を中央ハブとして全 VPC とオンプレを接続する", hint: "Transit Gateway は VPC・VPN・Direct Connect をスター型に集約し、N 本の接続で全通信を実現" },
      { id: "c", label: "C", text: "VPC を 1 つに統合してサービスを移行する", hint: "VPC の統合はアカウント分離・セキュリティ境界の観点から現実的でない" },
      { id: "d", label: "D", text: "AWS PrivateLink で各サービスを公開する", hint: "PrivateLink はサービスを VPC エンドポイント経由で公開する仕組み。汎用的な VPC 間ルーティングには不向き" },
    ],
    explanation:
      "AWS Transit Gateway は複数の VPC・Site-to-Site VPN・Direct Connect をスター型のハブアンドスポーク構成で接続するサービスです。10 個の VPC をすべてピアリングするには 45 本の接続が必要ですが、Transit Gateway なら 10 本（各 VPC から TGW へ）で全通信が可能になります。また Direct Connect や VPN も同じ Transit Gateway に接続することで、将来のオンプレ接続の追加も容易です。ルートテーブルでトラフィックの分離・許可制御も細かく設定できます。",
    comparePoint:
      "Transit Gateway：ハブアンドスポーク・スケーラブル・複数 VPC + オンプレ接続を一元管理。VPC ピアリング：シンプル・少数 VPC 向け・推移的ルーティング不可。PrivateLink：サービス単位の公開・エンドポイントが必要。",
    rememberAxis:
      "多数の VPC を相互接続 → Transit Gateway。数個の VPC を簡単に接続 → VPC ピアリング。サービスを他 VPC へ安全に公開 → PrivateLink。",
  },
  {
    id: "scenario-net-4",
    category: "Networking",
    modeLabel: "シナリオ",
    prompt:
      "ある企業のウェブアプリが全世界のユーザーから利用されている。静的コンテンツ（画像・CSS・JS）の配信レイテンシを最小化し、オリジンサーバーの負荷を下げたい。また DDoS 攻撃への基本的な防御も必要。最適な構成はどれか。",
    context:
      "オリジンは ALB の背後にある EC2 クラスターです。グローバルに展開されたユーザーがいます。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "Amazon CloudFront を ALB の前段に配置し、エッジロケーションからコンテンツを配信する", hint: "CloudFront は世界 450 以上のエッジロケーションでキャッシュ配信し、AWS Shield Standard で DDoS 対策も標準提供" },
      { id: "b", label: "B", text: "各リージョンに ALB を立て Route 53 のジオルーティングで振り分ける", hint: "リージョン分散は可能だが、エッジキャッシュの代替にはならず静的コンテンツのレイテンシ改善も限定的" },
      { id: "c", label: "C", text: "EC2 インスタンスを大幅にスケールアップしてオリジンの処理能力を高める", hint: "スケールアップはコスト増。グローバルなレイテンシ改善にはならない" },
      { id: "d", label: "D", text: "S3 の静的ウェブサイトホスティングに移行する", hint: "S3 静的ホスティングだけではレイテンシはリージョン固定。CloudFront との組み合わせが必要" },
    ],
    explanation:
      "Amazon CloudFront は世界 450 以上のエッジロケーション（POP）にコンテンツをキャッシュし、ユーザーに最寄りのエッジから高速配信します。キャッシュヒット時はオリジン（ALB/EC2）へのリクエストがなくなり負荷も大幅に減少します。AWS Shield Standard が自動的に有効化され、L3/L4 の DDoS 攻撃から保護されます。さらに WAF を組み合わせることで L7 の防御も追加できます。",
    comparePoint:
      "CloudFront：CDN・グローバルエッジキャッシュ・DDoS 対策（Shield Standard）・オリジン負荷軽減。ALB：リージョン内ロードバランシング・CDN ではない。Route 53 ジオルーティング：DNS レベルの地域振り分け・CDN ではない。",
    rememberAxis:
      "グローバルなレイテンシ最小化・静的コンテンツのキャッシュ → CloudFront。L7 の細かな攻撃フィルタリング → WAF + CloudFront。大規模 DDoS 対策 → Shield Advanced。",
  },
  {
    id: "scenario-net-5",
    category: "Networking",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が VPC 内の EC2 インスタンスから Amazon S3 へのアクセスをインターネット経由ではなく AWS 内部のネットワーク経由で行いたい。NAT Gateway のコストを削減しつつ、S3 へのアクセスをセキュアにしたい。最適な構成はどれか。",
    context:
      "現在はプライベートサブネットの EC2 が NAT Gateway 経由で S3 にアクセスしています。NAT Gateway のデータ処理料金が高くなっています。",
    correctChoiceId: "d",
    choices: [
      { id: "a", label: "A", text: "S3 バケットをパブリックアクセス可能にして EC2 から直接アクセスする", hint: "パブリックアクセスを許可するとセキュリティリスクが高くなる" },
      { id: "b", label: "B", text: "S3 Transfer Acceleration を有効化する", hint: "Transfer Acceleration は S3 へのアップロード高速化機能でコスト削減や内部ルーティングには関係しない" },
      { id: "c", label: "C", text: "Direct Connect を使って S3 にアクセスする", hint: "Direct Connect はオンプレ〜AWS の接続。VPC 内 EC2 から S3 へのアクセスには適していない" },
      { id: "d", label: "D", text: "S3 用の VPC ゲートウェイエンドポイントを作成し、ルートテーブルに追加する", hint: "VPC ゲートウェイエンドポイントは無料で S3/DynamoDB へのプライベートアクセスを可能にする" },
    ],
    explanation:
      "VPC ゲートウェイエンドポイント（Gateway Endpoint）を作成することで、EC2 インスタンスから S3 や DynamoDB への通信をインターネットや NAT Gateway を経由せず AWS の内部ネットワーク経由で行えます。ゲートウェイエンドポイント自体の料金は無料で、NAT Gateway のデータ処理料金（$0.045/GB 程度）を節約できます。エンドポイントポリシーで特定バケットへのアクセスのみに制限することも可能です。",
    comparePoint:
      "VPC ゲートウェイエンドポイント：無料・S3/DynamoDB 専用・ルートテーブルで設定・内部ネットワーク経由。VPC インターフェースエンドポイント（PrivateLink）：有料・多数の AWS サービス対応・ENI 経由。NAT Gateway：インターネット経由・有料（データ処理課金）。",
    rememberAxis:
      "S3 または DynamoDB への内部アクセス・NAT コスト削減 → VPC ゲートウェイエンドポイント（無料）。その他の AWS サービス（SQS・SSM 等）へのプライベートアクセス → インターフェースエンドポイント。",
  },

  // ── シナリオ: コンピューティング ─────────────────────────────────────────

  {
    id: "scenario-compute-1",
    category: "Compute",
    modeLabel: "シナリオ",
    prompt:
      "ある EC サイトがトラフィックに大きな波がある（平時: 100 リクエスト/秒、ブラックフライデー: 10,000 リクエスト/秒）。コストを最小化しながらピーク時の需要に自動対応したい。最適な EC2 構成はどれか。",
    context:
      "現在は固定の EC2 インスタンス群を手動でスケールしています。ピーク時にキャパシティ不足が発生しています。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "ピーク時の 10,000 req/s に対応できる EC2 を常時起動しておく", hint: "平時に 100 倍のキャパシティを保有するのは大幅なコスト無駄" },
      { id: "b", label: "B", text: "Auto Scaling グループを設定し、CPU 使用率などのメトリクスに基づいてスケールアウト/インする", hint: "需要に応じて自動的にインスタンスを追加・削除し、コストと可用性を最適化できる" },
      { id: "c", label: "C", text: "Lambda に移行してサーバーレスで対応する", hint: "Lambda は有効だが、既存の EC2 ベースのアーキテクチャをすぐに移行するには大きな改修が必要" },
      { id: "d", label: "D", text: "予約インスタンスを大量に購入してピークに備える", hint: "予約インスタンスは割引が大きいが、平時に余剰になり柔軟性がない" },
    ],
    explanation:
      "Auto Scaling グループ（ASG）は CloudWatch メトリクス（CPU 使用率・カスタムメトリクスなど）に基づいてインスタンス数を自動調整します。平時は最小インスタンス数で運用し、トラフィック急増時には自動的にスケールアウトしてピークに対応します。コストは実際の使用量に比例するため、固定キャパシティよりも大幅に節約できます。ベースライン分は Reserved Instance、スパイク分は On-Demand または Spot Instance を使う混合戦略も有効です。",
    comparePoint:
      "Auto Scaling：需要に応じた自動調整・コスト最適化・可用性向上。固定キャパシティ：シンプルだが過剰コストまたはキャパシティ不足のリスク。Lambda：サーバーレス・無限スケール・既存 EC2 アーキテクチャからの移行が必要。",
    rememberAxis:
      "トラフィック変動に応じた EC2 の自動スケール → Auto Scaling グループ + CloudWatch。リクエスト駆動のイベント処理 → Lambda。固定ベースライン + スパイクの混合 → Reserved + On-Demand/Spot。",
  },
  {
    id: "scenario-compute-2",
    category: "Compute",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が EC2 上でバッチ処理ジョブ（機械学習モデルの学習）を実行している。ジョブは 8〜12 時間かかるが、途中で中断されても再実行できるようチェックポイントが実装されている。コストを大幅に削減したい。最適なインスタンス購入オプションはどれか。",
    context:
      "現在はオンデマンドインスタンスで実行しており、月あたりのコストが高い。ジョブは深夜〜早朝に実行されます。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "1 年の予約インスタンス（Standard RI）を購入する", hint: "バッチ処理は常時稼働ではないので、予約インスタンスの割引メリットを最大限活用できない" },
      { id: "b", label: "B", text: "On-Demand インスタンスのまま使い続ける", hint: "コスト削減の余地がある。中断可能なバッチ処理には Spot が最適" },
      { id: "c", label: "C", text: "Spot インスタンスを使用し、中断時はチェックポイントから再開する", hint: "Spot は On-Demand 比最大 90% 割引。中断耐性があるワークロードに最適" },
      { id: "d", label: "D", text: "Dedicated Host を購入する", hint: "Dedicated Host はライセンス持ち込み（BYOL）や規制要件向け。コスト削減が目的なら不適切" },
    ],
    explanation:
      "Spot インスタンスは AWS の余剰コンピューティングキャパシティを利用するため、On-Demand 比最大 90% の割引でインスタンスを使えます。中断（スポット中断）が発生する可能性がありますが、機械学習のチェックポイント実装により中断時に途中から再開できるため、Spot インスタンスに最適なワークロードです。AWS Batch や Amazon SageMaker でも Spot インスタンスを活用でき、さらに管理が楽になります。",
    comparePoint:
      "Spot インスタンス：最大 90% 割引・中断あり・中断耐性があるバッチ向け。On-Demand：中断なし・高コスト・予測不可能な需要向け。Reserved：常時稼働の安定ワークロード向け・最大 72% 割引。",
    rememberAxis:
      "中断耐性があるバッチ・ML 学習 → Spot インスタンス（最大 90% 割引）。常時稼働のベースライン → Reserved Instance。予測不可能な需要・短期 → On-Demand。",
  },
  {
    id: "scenario-compute-3",
    category: "Compute",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が API サーバーをコンテナで運用したい。インフラの管理（サーバーのパッチ適用・容量管理など）をできるだけ減らし、コンテナのオーケストレーションに集中したい。最適なサービスはどれか。",
    context:
      "Docker コンテナを使って開発しています。Kubernetes の運用経験はありませんが、コンテナのスケーリングは必要です。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "Amazon ECS（Fargate 起動タイプ）を使用する", hint: "Fargate は EC2 を管理せずにコンテナを実行できるサーバーレスコンテナ環境" },
      { id: "b", label: "B", text: "Amazon EKS（EC2 ノード）を使用する", hint: "EKS は Kubernetes のマネージドサービスだが、EC2 ノードの管理は依然として必要。Kubernetes 経験も必要" },
      { id: "c", label: "C", text: "EC2 に Docker を直接インストールして Docker Compose で管理する", hint: "EC2 の管理・スケーリング・高可用性をすべて自前で実装する必要があり、運用負荷が高い" },
      { id: "d", label: "D", text: "AWS Lambda にコンテナイメージをデプロイする", hint: "Lambda はコンテナイメージをサポートするが、常時起動の API サーバーより関数型・短時間処理向け" },
    ],
    explanation:
      "Amazon ECS の Fargate 起動タイプは、サーバー（EC2）を一切管理せずにコンテナを実行できるサーバーレスなコンテナ実行環境です。CPU・メモリのリソースを指定するだけで Fargate がプロビジョニングを自動処理し、コンテナのスケーリング・ヘルスチェック・ローリングデプロイも ECS が管理します。Kubernetes（EKS）よりシンプルなため、Kubernetes 経験がない場合は ECS + Fargate が最適です。",
    comparePoint:
      "ECS Fargate：サーバーレス・EC2 管理不要・シンプル・AWS ネイティブ。EKS：Kubernetes・EC2 ノード管理が必要（Fargate 起動タイプもある）・複雑・高機能。EC2 + Docker：完全自己管理・高運用コスト。",
    rememberAxis:
      "インフラ管理を最小化したコンテナ実行 → ECS Fargate。Kubernetes が必要 → EKS（+ Fargate でもノード管理不要にできる）。短時間・イベント駆動の処理 → Lambda。",
  },
  {
    id: "scenario-compute-4",
    category: "Compute",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が Lambda 関数で画像処理（リサイズ・フォーマット変換）を行っている。処理には最大 8 GB のメモリと 10 分以上の実行時間が必要な場合がある。現在の Lambda 設定では制限に達してしまう。最適な解決策はどれか。",
    context:
      "Lambda の最大メモリは 10 GB、最大実行時間は 15 分です。8 GB で 10〜15 分の処理が必要です。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "Lambda の設定をメモリ 10 GB・タイムアウト 15 分に設定する", hint: "Lambda の最大制限内には収まるが、15 分を超える可能性がある処理には対応できない" },
      { id: "b", label: "B", text: "AWS Fargate（または ECS）でコンテナとして実行し、制限なく処理する", hint: "Fargate はタイムアウトがなく大容量メモリも設定可能。長時間・大容量処理に適切" },
      { id: "c", label: "C", text: "Step Functions で Lambda を連鎖させて処理を分割する", hint: "有効な場合もあるが、画像処理の途中で Lambda を分割するのは複雑で状態管理が必要" },
      { id: "d", label: "D", text: "EC2 Spot インスタンスで処理する専用サーバーを立てる", hint: "可能だが、Fargate の方がサーバー管理不要で適切" },
    ],
    explanation:
      "Lambda には最大実行時間 15 分・最大メモリ 10 GB の制限があります。処理がこの制限に近づいている場合、AWS Fargate（ECS）でコンテナとして実行するのが適切です。Fargate には実行時間の制限がなく、vCPU・メモリも柔軟に設定できます。画像処理が確実に 15 分以内に収まるなら Lambda の設定変更で対応できますが、超過のリスクがある場合は Fargate や ECS が安全です。処理を並列化して Lambda で分割できる場合は Step Functions も有効です。",
    comparePoint:
      "Lambda：最大 15 分・10 GB・サーバーレス・短時間処理向け。Fargate：時間制限なし・大容量・サーバーレス・長時間バッチ処理向け。EC2：完全な制御・サーバー管理が必要。",
    rememberAxis:
      "15 分以内・10 GB 以内の処理 → Lambda。長時間または大容量の処理 → Fargate/ECS。細かく分割できる長い処理 → Step Functions + Lambda。",
  },
  {
    id: "scenario-compute-5",
    category: "Compute",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が Windows Server 2019 上で動作するカスタムアプリを EC2 に移行したい。ソフトウェアのライセンスはすでに所有しており（BYOL: Bring Your Own License）、ライセンスはソケット単位で課金される。ライセンスを最大限活用するための EC2 構成はどれか。",
    context:
      "ライセンスはソケット（物理 CPU）単位で課金。同じ物理ホストで安定して稼働させる必要があります。",
    correctChoiceId: "d",
    choices: [
      { id: "a", label: "A", text: "On-Demand インスタンスを使用する", hint: "On-Demand は物理ホストが共有されるため、ライセンスが物理ソケット単位の場合は過剰課金になる可能性" },
      { id: "b", label: "B", text: "Reserved Instance を購入する", hint: "RI はコスト削減に有効だが、物理ホストは共有のまま。BYOL のライセンス管理には不向き" },
      { id: "c", label: "C", text: "Spot インスタンスを使用する", hint: "Spot は中断されるため安定した稼働が必要なアプリには不適切" },
      { id: "d", label: "D", text: "Dedicated Host を使用する", hint: "Dedicated Host は物理サーバー全体を占有でき、ソケット数を把握した BYOL が可能" },
    ],
    explanation:
      "AWS Dedicated Host は物理サーバー全体をお客様専用に割り当てるサービスです。物理 CPU ソケット数・コア数が把握できるため、ソケット単位や vCPU 単位のライセンス（Windows Server・SQL Server・Oracle など）を BYOL で持ち込む場合に最適です。Dedicated Instance（物理ホストの専有だがホストレベルの制御なし）とは異なり、Dedicated Host ではホスト ID やソケット情報が取得でき、ライセンスコンプライアンスの管理に使えます。",
    comparePoint:
      "Dedicated Host：物理ホスト専有・ソケット/コア単位 BYOL 対応・最高コスト。Dedicated Instance：物理ホスト専有だがホスト詳細不可・中程度コスト。On-Demand/Reserved：物理ホスト共有・AWS ライセンス込み。",
    rememberAxis:
      "ソケット/コア単位の BYOL ライセンス → Dedicated Host。物理ホストの専有だけが目的（セキュリティ要件等） → Dedicated Instance。コスト重視の安定ワークロード → Reserved Instance。",
  },

  // ── シナリオ: アプリケーション統合 ───────────────────────────────────────

  {
    id: "scenario-ai-1",
    category: "Application Integration",
    modeLabel: "シナリオ",
    prompt:
      "ある EC サイトで、注文が入ったときに在庫管理・配送手配・メール通知の 3 つのシステムへ非同期に通知を送りたい。各システムは独立して動作しており、将来的にシステムが増える可能性がある。最適な疎結合アーキテクチャはどれか。",
    context:
      "現在は注文処理サービスが各システムに直接 API を呼び出す密結合構成。新しいシステムが増えるたびに注文サービスの改修が必要になっています。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "SQS キューを 1 つ作成し、すべてのシステムが同じキューをポーリングする", hint: "同じ SQS キューのメッセージは 1 つのコンシューマにのみ届く。全システムへのファンアウトには使えない" },
      { id: "b", label: "B", text: "各システムへの同期 API 呼び出しを Lambda で並列化する", hint: "並列化は改善だが、システムが増えると Lambda の改修が必要。疎結合ではない" },
      { id: "c", label: "C", text: "SNS トピックに注文イベントをパブリッシュし、各システムの SQS キューをサブスクライブさせる", hint: "SNS のファンアウトで 1 つのイベントが複数のサブスクライバーに届く。新システム追加はサブスクライブを追加するだけ" },
      { id: "d", label: "D", text: "Kinesis Data Streams で注文イベントをストリーミングする", hint: "Kinesis はリアルタイム大量ストリーム処理向け。このユースケースには SNS + SQS がシンプル" },
    ],
    explanation:
      "SNS（Simple Notification Service）のファンアウトパターンが最適です。注文サービスが SNS トピックにイベントをパブリッシュすると、サブスクライブしている複数の SQS キュー（在庫管理・配送・メール通知）それぞれにメッセージが届きます。新しいシステムが増えても SNS にサブスクリプションを追加するだけで注文サービスの改修は不要です。各システムは自分の SQS キューを独立してポーリングするため、一方のシステムの障害が他に影響しません。",
    comparePoint:
      "SNS + SQS ファンアウト：1 イベントを複数サブスクライバーへ・疎結合・拡張が容易。SQS のみ：メッセージは 1 コンシューマのみ・ファンアウト不可。Kinesis：大量ストリーム・リプレイ可能・複雑。",
    rememberAxis:
      "1 つのイベントを複数システムへファンアウト → SNS + SQS（ファンアウトパターン）。単一コンシューマへのキューイング → SQS のみ。時系列ストリームを複数ビューアが並行処理 → Kinesis。",
  },
  {
    id: "scenario-ai-2",
    category: "Application Integration",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が注文処理ワークフロー（在庫確認 → 決済 → 配送登録 → 通知）を実装したい。各ステップは独立した Lambda 関数で実装されており、エラー時は前のステップへのロールバックが必要。ステップの実行順序と状態管理を簡素化したい。最適なサービスはどれか。",
    context:
      "現在は各 Lambda が次の Lambda を直接呼び出す連鎖構成で、エラーハンドリングが複雑になっています。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "SQS で各 Lambda をチェーンし、デッドレターキューでエラー処理する", hint: "SQS は非同期メッセージキュー。順序保証・状態管理・ロールバックロジックは自前で実装が必要" },
      { id: "b", label: "B", text: "AWS Step Functions でワークフローを定義し、状態管理とエラーハンドリングを自動化する", hint: "Step Functions はワークフローの状態機械を管理し、リトライ・タイムアウト・補償トランザクションを宣言的に定義できる" },
      { id: "c", label: "C", text: "EventBridge でイベントをルーティングして各 Lambda を起動する", hint: "EventBridge はイベント駆動のルーティングに優れるが、ステップ間の状態管理・ロールバックは自前実装が必要" },
      { id: "d", label: "D", text: "SNS トピックで各 Lambda に通知して並列実行する", hint: "SNS は並列通知向け。順序制御・状態管理・ロールバックには不適切" },
    ],
    explanation:
      "AWS Step Functions は Lambda 関数などのマイクロサービスをワークフローとして定義し、実行状態を管理するサービスです。JSON ベースの状態マシン定義（Amazon States Language）で各ステップの順序・分岐・並列化・リトライ・エラーキャッチを宣言的に記述できます。エラー時の補償トランザクション（Saga パターン）も実装しやすく、複雑なビジネスロジックのオーケストレーションに最適です。実行履歴も自動的に記録されるため、デバッグが容易です。",
    comparePoint:
      "Step Functions：状態マシン・順序制御・エラーハンドリング・ビジュアル化・オーケストレーション向け。SQS：非同期キュー・疎結合・状態管理なし。EventBridge：イベントルーティング・コレオグラフィー向け。",
    rememberAxis:
      "複数ステップのワークフロー・状態管理・エラーハンドリング → Step Functions。疎結合なイベント駆動 → EventBridge / SQS + SNS。",
  },
  {
    id: "scenario-ai-3",
    category: "Application Integration",
    modeLabel: "シナリオ",
    prompt:
      "ある企業がサードパーティの SaaS サービス（Stripe、GitHub 等）からの Webhook イベントを受け取り、AWS Lambda で処理したい。イベントの量は不定で、瞬間的に大量のイベントが来る場合もある。処理の失敗時には再試行が必要。最適な構成はどれか。",
    context:
      "Webhook はリトライ機能を持つが、AWS 側で受け取り確認を素早く返す必要があります。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "API Gateway → SQS → Lambda の構成にして、処理を非同期化する", hint: "API Gateway が即座に 200 を返し、SQS がバッファリングして Lambda が順番に処理。失敗時は DLQ に移動" },
      { id: "b", label: "B", text: "API Gateway → Lambda（同期）でそのまま処理する", hint: "処理が遅れると Webhook タイムアウトが発生し、SaaS 側がリトライを繰り返してしまう" },
      { id: "c", label: "C", text: "EC2 上の Webhook サーバーが直接処理する", hint: "サーバー管理が必要でスパイクへの対応も手動スケーリングになる" },
      { id: "d", label: "D", text: "Kinesis Data Streams → Lambda で処理する", hint: "Kinesis は大量リアルタイムストリームに適するが、Webhook の量規模では SQS の方がシンプルで適切" },
    ],
    explanation:
      "API Gateway で Webhook を受け取り、即座に SQS キューへメッセージを書き込んで 200 OK を返します。Lambda は SQS をポーリングして非同期に処理します。この構成のメリット：①API Gateway が素早く応答するため SaaS 側のタイムアウトが発生しない、②SQS がバッファリングするためスパイクにも対応、③処理失敗時はデッドレターキュー（DLQ）に移動してリトライや調査が可能です。",
    comparePoint:
      "API GW + SQS + Lambda：非同期・バッファリング・DLQ でリトライ・スパイク対応。API GW + Lambda（同期）：シンプルだが処理が遅いとタイムアウト・スパイクに弱い。",
    rememberAxis:
      "Webhook の即時応答 + 非同期処理 → API Gateway → SQS → Lambda。順序が重要なストリーム → Kinesis。単純な同期 API → API Gateway → Lambda（直接）。",
  },
  {
    id: "scenario-ai-4",
    category: "Application Integration",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が異なる複数のシステム（社内システム・SaaS・AWS サービス）からのイベントを収集し、イベントのパターンに応じて異なる Lambda 関数やターゲットにルーティングしたい。ルールベースのイベントルーティングを実現する最適なサービスはどれか。",
    context:
      "イベントの種類によって異なるターゲット（Lambda・SNS・SQS・Step Functions 等）に振り分けたい。",
    correctChoiceId: "d",
    choices: [
      { id: "a", label: "A", text: "SNS でイベントをパブリッシュし、フィルターポリシーで振り分ける", hint: "SNS フィルターポリシーは有効だが、複雑なルールロジックや多数のターゲット種別は EventBridge の方が柔軟" },
      { id: "b", label: "B", text: "SQS キューを複数作成し、プロデューサーが適切なキューを選んで送信する", hint: "ルーティングロジックをプロデューサーに持たせると密結合になる" },
      { id: "c", label: "C", text: "Kinesis Data Streams でイベントをストリーミングし、Lambda でフィルタリングする", hint: "Kinesis は大量リアルタイムデータ向け。イベントルーティングには EventBridge が適切" },
      { id: "d", label: "D", text: "Amazon EventBridge でイベントバスを作成し、ルールでターゲットに振り分ける", hint: "EventBridge は JSON パターンマッチングによるルールベースのルーティングで多数のターゲット種別に対応" },
    ],
    explanation:
      "Amazon EventBridge（旧 CloudWatch Events）は、イベントバスを介してイベントを受信し、JSON パターンマッチングルールに基づいてターゲット（Lambda・SNS・SQS・Step Functions・API Gateway 等）にルーティングするサービスです。サードパーティの SaaS イベント（Stripe・GitHub 等）もパートナーイベントバスで直接受信できます。SNS のフィルターポリシーより複雑なルールが記述でき、AWS サービス全体のイベント統合ハブとして機能します。",
    comparePoint:
      "EventBridge：ルールベースルーティング・多数のターゲット種別・サードパーティ統合・イベント駆動アーキテクチャの中心。SNS：シンプルなファンアウト・フィルターポリシーあり。SQS：キューイング・順序処理。",
    rememberAxis:
      "パターンに基づく柔軟なイベントルーティング → EventBridge。1 対多のファンアウト → SNS。キューイングと非同期処理 → SQS。",
  },
  {
    id: "scenario-ai-5",
    category: "Application Integration",
    modeLabel: "シナリオ",
    prompt:
      "ある企業がレガシーシステムのメッセージブローカー（ActiveMQ）を AWS に移行したい。アプリケーションコードの変更を最小限にしつつ、JMS（Java Message Service）プロトコルを引き続き使いたい。最適なサービスはどれか。",
    context:
      "既存アプリケーションは JMS を使って ActiveMQ と通信しています。プロトコルの変更なしに移行したい。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "Amazon SQS に移行する", hint: "SQS は JMS プロトコルをネイティブにサポートしない。アプリケーションコードの大幅な変更が必要" },
      { id: "b", label: "B", text: "Amazon MQ（ActiveMQ ブローカー）を使用する", hint: "Amazon MQ は ActiveMQ・RabbitMQ をマネージドで提供し、JMS 等の既存プロトコルをそのまま使える" },
      { id: "c", label: "C", text: "Amazon Kinesis Data Streams に移行する", hint: "Kinesis はリアルタイムストリーミング向けで、JMS プロトコルには対応していない" },
      { id: "d", label: "D", text: "Amazon SNS に移行する", hint: "SNS は HTTP/HTTPS・SQS・Lambda 等への通知向けで、JMS プロトコルには対応していない" },
    ],
    explanation:
      "Amazon MQ は Apache ActiveMQ と RabbitMQ のマネージドメッセージブローカーサービスです。JMS・AMQP・STOMP・MQTT・OpenWire といった標準プロトコルをサポートするため、既存の ActiveMQ を使ったアプリケーションをコードの変更最小限で移行できます。SQS や SNS は AWS ネイティブで高スケーラビリティを持ちますが、JMS プロトコルには対応しておらず、移行にはアプリケーションの大幅な改修が必要です。新規開発では SQS/SNS が推奨されます。",
    comparePoint:
      "Amazon MQ：ActiveMQ/RabbitMQ 互換・JMS 等の標準プロトコル・既存システムの移行向け。SQS：AWS ネイティブ・高スケーラブル・JMS 非対応・新規開発向け。SNS：パブリッシュ/サブスクライブ・JMS 非対応。",
    rememberAxis:
      "既存の JMS/AMQP アプリをそのまま移行 → Amazon MQ。新規開発で AWS ネイティブのキューが必要 → SQS。新規開発でファンアウトが必要 → SNS。",
  },

  // ── シナリオ: モニタリング ────────────────────────────────────────────────

  {
    id: "scenario-mon-1",
    category: "Monitoring",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が EC2 上のアプリケーションのメモリ使用率を CloudWatch で監視したい。CloudWatch はデフォルトでは EC2 のメモリ使用率を収集しない。メモリ使用率のアラームを設定するにはどうすればよいか。",
    context:
      "CPU 使用率・ネットワーク I/O は標準メトリクスで監視できています。メモリだけが取れていません。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "CloudWatch エージェントを EC2 にインストールし、カスタムメトリクスとして収集する", hint: "CloudWatch エージェントはメモリ・ディスク等の OS レベルメトリクスをカスタムメトリクスとして送信できる" },
      { id: "b", label: "B", text: "AWS Systems Manager でメモリ情報を取得する", hint: "SSM はパッチ管理・リモート実行等の機能。メトリクス収集は CloudWatch エージェントが担う" },
      { id: "c", label: "C", text: "VPC フローログでメモリ使用率を収集する", hint: "VPC フローログはネットワークトラフィックのログ。メモリ使用率は収集できない" },
      { id: "d", label: "D", text: "CloudWatch に詳細モニタリングを有効化する", hint: "詳細モニタリングは標準メトリクス（CPU・ネットワーク等）の収集間隔を 5 分→1 分に短縮するもの。メモリは収集対象外" },
    ],
    explanation:
      "Amazon CloudWatch はデフォルトで EC2 のハイパーバイザーレベルのメトリクス（CPU 使用率・ネットワーク I/O・ディスク I/O など）を収集しますが、OS 内部のメモリ使用率・ディスク空き容量などは収集しません。これらを収集するには CloudWatch エージェント（統合 CloudWatch エージェント）を EC2 にインストールし、収集設定ファイル（JSON）でメトリクスを指定します。収集されたメトリクスはカスタムメトリクスとして CloudWatch に送信され、通常のメトリクスと同様にアラームを設定できます。",
    comparePoint:
      "標準メトリクス（エージェント不要）：CPUUtilization・NetworkIn/Out・DiskReadOps 等。カスタムメトリクス（エージェント必要）：メモリ使用率・ディスク空き容量・プロセス数等。",
    rememberAxis:
      "メモリ・ディスク空き容量など OS レベルのメトリクス → CloudWatch エージェントをインストールしてカスタムメトリクスとして収集。",
  },
  {
    id: "scenario-mon-2",
    category: "Monitoring",
    modeLabel: "シナリオ",
    prompt:
      "ある企業の AWS 環境で、誰かが意図せず S3 バケットをパブリックアクセス可能な状態に変更した。このような設定変更をリアルタイムで検知してアラートを発報するには何を使うべきか。",
    context:
      "IAM ユーザーやロールの設定変更も監視したい。コンプライアンス要件として変更の証跡も必要です。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "CloudWatch メトリクスで S3 バケットポリシーの変更を監視する", hint: "CloudWatch は S3 設定変更のメトリクスを提供しない。CloudTrail ログを使う必要がある" },
      { id: "b", label: "B", text: "GuardDuty を有効化する", hint: "GuardDuty は脅威検出（不審な API コール・マルウェア等）向け。設定変更のコンプライアンス監視は AWS Config が適切" },
      { id: "c", label: "C", text: "AWS Config ルールで S3 のパブリックアクセス設定を監視し、EventBridge でアラートを発報する", hint: "AWS Config は設定変更を継続的に評価し、非準拠リソースを検出。EventBridge でリアルタイムアラートが可能" },
      { id: "d", label: "D", text: "S3 アクセスログを CloudWatch Logs に送り、メトリクスフィルターでアラートする", hint: "S3 アクセスログはオブジェクトレベルのアクセス記録。バケット設定変更の検知には CloudTrail + Config が適切" },
    ],
    explanation:
      "AWS Config は AWS リソースの設定変更を継続的に記録・評価します。S3 のパブリックアクセスブロック設定を監視する Config ルール（s3-bucket-public-access-prohibited など）を設定することで、非準拠状態を即座に検出できます。設定変更は CloudTrail がイベントとして記録し、EventBridge（CloudWatch Events）でリアルタイムに Lambda や SNS へ通知を発報できます。GuardDuty は不審な動作の検出、Config は設定のコンプライアンス評価という役割分担です。",
    comparePoint:
      "AWS Config：設定変更のコンプライアンス評価・変更履歴・継続的な評価。CloudTrail：API 操作の証跡・誰が何をしたかの記録。GuardDuty：脅威検出・不審な動作の機械学習ベース検出。",
    rememberAxis:
      "設定変更の検知・コンプライアンス監視 → AWS Config。API 操作の証跡・監査ログ → CloudTrail。不審な動作・脅威検出 → GuardDuty。",
  },
  {
    id: "scenario-mon-3",
    category: "Monitoring",
    modeLabel: "シナリオ",
    prompt:
      "ある企業がマイクロサービスアーキテクチャを採用しており、10 個のサービスが相互に呼び合っている。本番環境でパフォーマンス問題が発生したとき、どのサービスがボトルネックになっているかを素早く特定したい。最適なサービスはどれか。",
    context:
      "各サービスは Lambda または EC2/ECS で動作しています。サービス間の呼び出しチェーンをトレースしたい。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "CloudWatch Logs に各サービスがリクエスト時間を出力し、ログインサイトで分析する", hint: "ログ分析でも可能だが、リクエストのトレースと依存関係の可視化は AWS X-Ray の方が圧倒的に優れている" },
      { id: "b", label: "B", text: "AWS X-Ray でトレーシングを有効化し、サービスマップでボトルネックを特定する", hint: "X-Ray は分散トレーシングでリクエストの流れを可視化し、レイテンシのボトルネックを特定できる" },
      { id: "c", label: "C", text: "CloudWatch メトリクスで各サービスの CPU 使用率を監視する", hint: "CPU 使用率はリソース監視に有効だが、サービス間の依存関係トレーシングには使えない" },
      { id: "d", label: "D", text: "VPC フローログで通信量を分析する", hint: "フローログはネットワークレベルの通信量記録。アプリケーションレイヤーのトレースには使えない" },
    ],
    explanation:
      "AWS X-Ray は分散トレーシングサービスで、マイクロサービス間のリクエストフローをエンドツーエンドで追跡します。サービスマップでは各サービスの依存関係・平均レイテンシ・エラー率が視覚化され、ボトルネックを一目で特定できます。各サービスに X-Ray SDK を組み込むか、Lambda・API Gateway の場合は設定で有効化するだけでトレースデータが収集されます。CloudWatch ServiceLens と組み合わせると、メトリクス・ログ・トレースを統合的に分析できます。",
    comparePoint:
      "X-Ray：分散トレーシング・サービスマップ・レイテンシ分析・マイクロサービスのボトルネック特定。CloudWatch：メトリクス・ログ・アラーム。CloudTrail：API 操作の証跡。",
    rememberAxis:
      "マイクロサービスのボトルネック特定・分散トレーシング → AWS X-Ray。メトリクス監視・アラーム → CloudWatch。API 操作の監査 → CloudTrail。",
  },
  {
    id: "scenario-mon-4",
    category: "Monitoring",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が本番環境の ALB のアクセスログを長期保存し、攻撃パターンの分析やデバッグに使いたい。ログは毎日 GB 単位で生成される。低コストで保存しつつ、必要なときに SQL でクエリできるようにしたい。最適な構成はどれか。",
    context:
      "ログは 1 年間保持する必要があります。頻繁にクエリするわけではありませんが、調査が必要なときに素早く検索したい。",
    correctChoiceId: "d",
    choices: [
      { id: "a", label: "A", text: "CloudWatch Logs にアクセスログを送信し、インサイトで分析する", hint: "CloudWatch Logs は高価。GB 単位のログを 1 年間保存するとコストが高くなる" },
      { id: "b", label: "B", text: "Elasticsearch（OpenSearch）クラスターに格納してリアルタイム分析する", hint: "OpenSearch は強力だが常時稼働のクラスターコストが高く、低頻度クエリには過剰" },
      { id: "c", label: "C", text: "RDS に ALB ログを格納して SQL でクエリする", hint: "GB 単位の非構造化ログを RDS に格納するのはコスト・パフォーマンス面で非効率" },
      { id: "d", label: "D", text: "S3 に ALB ログを保存し、Amazon Athena で SQL クエリする", hint: "S3 は低コストストレージ、Athena はクエリした分だけ課金のサーバーレス分析。長期保存 + 必要時クエリに最適" },
    ],
    explanation:
      "ALB はアクセスログを直接 S3 バケットに出力できます（S3 アクセスログ機能）。S3 は非常に低コスト（$0.023/GB 程度）で長期保存に最適です。Amazon Athena は S3 上のデータを直接 SQL でクエリできるサーバーレスサービスで、クエリしたデータ量に対してのみ課金（$5/TB 程度）されます。頻繁にクエリしない場合はほぼコストがかかりません。ログを Parquet 形式や Gzip 圧縮で保存すると、クエリコストと速度がさらに改善します。",
    comparePoint:
      "S3 + Athena：低コスト長期保存・サーバーレス SQL・スキャン課金・低頻度クエリに最適。CloudWatch Logs：高コスト・常時インデックス。OpenSearch：高コスト常時稼働・リアルタイム検索向け。",
    rememberAxis:
      "大量ログの低コスト長期保存 + 必要時 SQL クエリ → S3 + Athena。リアルタイムの全文検索・ダッシュボード → OpenSearch。構造化データの細かな分析 → CloudWatch Logs Insights（中規模まで）。",
  },
  {
    id: "scenario-mon-5",
    category: "Monitoring",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が AWS 環境全体のセキュリティ状態を把握したい。IAM の設定ミス・S3 の公開バケット・セキュリティグループの不適切な設定など、セキュリティベストプラクティスへの適合状況を一元的に確認したい。最適なサービスはどれか。",
    context:
      "複数の AWS アカウント（10 個）を使用しています。各アカウントの設定を一元的に確認したい。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "AWS Config で各リソースの設定を個別に監視する", hint: "Config は個別のルール設定監視に優れるが、セキュリティ全体の包括的な評価には Security Hub の方が適切" },
      { id: "b", label: "B", text: "Amazon GuardDuty を有効化して脅威を検出する", hint: "GuardDuty は実際の脅威（不審なアクセス・マルウェア等）の検出。設定ミスの予防的評価は Security Hub" },
      { id: "c", label: "C", text: "AWS Security Hub で CIS ベンチマークや AWS 基礎セキュリティのベストプラクティスを評価する", hint: "Security Hub は複数アカウントのセキュリティ状態を集約し、標準フレームワークに基づいてスコア化する" },
      { id: "d", label: "D", text: "AWS Trusted Advisor でセキュリティチェックを実行する", hint: "Trusted Advisor はセキュリティ・コスト・パフォーマンスの推奨事項を提供するが、Security Hub ほど詳細でない" },
    ],
    explanation:
      "AWS Security Hub は複数の AWS アカウント・リージョンのセキュリティ状態を集約して一元管理するサービスです。CIS AWS Foundations Benchmark・AWS 基礎セキュリティのベストプラクティス・PCI DSS などの標準フレームワークに基づいて自動的にセキュリティスコアを計算します。GuardDuty・Inspector・Macie・Config などの検出結果も Security Hub に集約でき、SIEM のような統合ダッシュボードとして機能します。Organizations と統合することで複数アカウントを一元管理できます。",
    comparePoint:
      "Security Hub：セキュリティ態勢の一元管理・コンプライアンス評価・複数アカウント集約。GuardDuty：脅威検出（実際の攻撃・不審な動作）。Config：設定変更の追跡・個別ルール評価。Trusted Advisor：全般的な推奨事項（コスト・パフォーマンス・セキュリティ）。",
    rememberAxis:
      "セキュリティ態勢の全体評価・コンプライアンス → Security Hub。実際の脅威・攻撃の検出 → GuardDuty。設定変更のコンプライアンス監視 → AWS Config。",
  },

  // ── シナリオ: 移行・転送 ──────────────────────────────────────────────────

  {
    id: "migration-1",
    category: "Migration & Transfer",
    modeLabel: "シナリオ",
    prompt:
      "ある企業がオンプレミスの Oracle データベース（500 GB）を Amazon Aurora PostgreSQL へ移行したい。移行中も本番 DB を稼働させ続け、カットオーバー時のダウンタイムを 30 分以内に収めたい。スキーマの変換も必要。最も適切な移行手順はどれか。",
    context:
      "Oracle 固有の構文（プロシージャ・トリガー）が多数あり、そのまま PostgreSQL へ移行できない箇所がある。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "exp/imp ユーティリティでダンプを取得し、Aurora へ手動インポートする", hint: "ダウンタイム中にインポートが必要で 30 分以内は困難。スキーマ変換も手動になる" },
      { id: "b", label: "B", text: "AWS SCT でスキーマを変換し、AWS DMS の CDC で差分をリアルタイム同期したあとカットオーバーする", hint: "SCT がスキーマ変換を自動化し、DMS CDC で本番稼働中のデータを継続同期。カットオーバーは DNS 切替のみ" },
      { id: "c", label: "C", text: "AWS Snowball でデータをエクスポートし Aurora へインポートする", hint: "Snowball はネットワーク転送が困難な大容量データ向け。500 GB は DMS の方が適切" },
      { id: "d", label: "D", text: "Aurora の S3 インポート機能でデータを一括ロードする", hint: "S3 インポートは静止点が必要で継続的な差分同期ができない" },
    ],
    explanation:
      "AWS Schema Conversion Tool（SCT）は Oracle の DDL・ストアドプロシージャ・トリガーなどを PostgreSQL 互換の構文に自動変換します。変換できない箇所は手動修正ガイドを出力します。AWS DMS はスキーマ変換後に Full Load + CDC（Change Data Capture）で本番 Oracle が稼働中のままリアルタイムに Aurora へ差分を同期します。カットオーバー時はアプリの接続先 DSN を切り替えるだけで、ダウンタイムを最小化できます。",
    comparePoint:
      "SCT：スキーマ変換（DDL・コード）担当。DMS：データ転送（Full Load + CDC）担当。Snowball：ネットワーク帯域が不足する大容量オフライン移行向け。",
    rememberAxis:
      "異種 DB 移行でスキーマ変換が必要 → SCT + DMS。同種 DB のダウンタイム最小移行 → DMS CDC のみ。ネットワーク経由が困難な大容量データ → Snowball。",
  },
  {
    id: "migration-2",
    category: "Migration & Transfer",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が 2 PB のアーカイブデータをオンプレミスのテープライブラリから S3 Glacier へ移行したい。専用線は引いていないため通常のインターネット回線（1 Gbps）しかない。移行は 3 か月以内に完了させたい。最適な転送方法はどれか。",
    context:
      "インターネット帯域は他業務と共用のため実効帯域は約 200 Mbps。データは機密性が高い。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "AWS DataSync を使ってインターネット経由で転送する", hint: "200 Mbps で 2 PB を転送すると約 926 日かかり、3 か月では完了しない" },
      { id: "b", label: "B", text: "AWS Direct Connect を新規開通して転送する", hint: "Direct Connect の開通には 1〜3 か月かかり、間に合わない可能性が高い" },
      { id: "c", label: "C", text: "AWS Snowball Edge を複数台同時に使ってデータを物理輸送する", hint: "Snowball Edge は 80 TB/台。2 PB なら約 25 台で並列輸送し数週間で完了できる" },
      { id: "d", label: "D", text: "AWS Snowmobile を使って一括輸送する", hint: "Snowmobile は 100 PB 規模向け。2 PB は Snowball Edge 複数台で対応可能" },
    ],
    explanation:
      "1 Gbps 回線の実効帯域 200 Mbps で 2 PB を転送すると単純計算で 926 日以上かかり現実的ではありません。AWS Snowball Edge は 80 TB の暗号化ストレージを持つ物理デバイスで、複数台を並列利用することで短期間に大量データを移行できます。2 PB なら約 25 台を一度に発注・データ書き込み・返送することで数週間以内に完了可能です。データは AES-256 で暗号化されるためセキュリティ要件も満たせます。Snowmobile は 10 PB 以上の超大規模移行向けのトラック型デバイスです。",
    comparePoint:
      "Snowball Edge：80 TB/台・複数台並列・TB〜PB 規模・暗号化済み。Snowmobile：最大 100 PB・超大規模一括輸送。DataSync：ネットワーク経由・継続的同期・中小規模。",
    rememberAxis:
      "ネットワーク転送が現実的でない大容量データ → Snowball Edge（複数台並列）。10 PB 以上の超大規模 → Snowmobile。継続的な差分同期 → DataSync。",
  },
  {
    id: "migration-3",
    category: "Migration & Transfer",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が VMware vSphere 上で動作する仮想マシン（約 200 台）を AWS に移行したい。各 VM は Windows Server または Linux で動作しており、できるだけ現在の構成を変えずに移行（リフト&シフト）したい。移行の進捗を一元管理できるサービスはどれか。",
    context:
      "アプリケーションのコード変更は最小限にしたい。移行後は EC2 として稼働させる予定。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "AWS Application Migration Service（MGN）を使って VM を EC2 へ自動的にリプラットフォームする", hint: "MGN はエージェントベースで継続レプリケーションし、カットオーバー時に EC2 として起動する AWS 推奨の移行サービス" },
      { id: "b", label: "B", text: "AWS Server Migration Service（SMS）を使って VMware の VM を AMI に変換する", hint: "SMS は現在は非推奨（MGN への移行を推奨）" },
      { id: "c", label: "C", text: "VM Import/Export で OVF ファイルを手動でインポートする", hint: "VM Import/Export は可能だが手動作業が多く、200 台の管理には向かない" },
      { id: "d", label: "D", text: "AWS DataSync で VM のディスクデータを S3 にコピーする", hint: "DataSync はファイルデータの同期ツール。VM の移行には対応していない" },
    ],
    explanation:
      "AWS Application Migration Service（MGN）は VM へエージェントをインストールし、ストレージを継続的に AWS へレプリケーションします。本番移行時（カットオーバー）にはわずか数分のダウンタイムで EC2 インスタンスとして起動できます。AWS Migration Hub と連携することで 200 台の移行状況を一元管理できます。旧サービスの SMS は非推奨となり、現在は MGN が AWS 公式推奨のリフト&シフト移行ツールです。VMware Cloud on AWS を使えばさらにシームレスな移行も可能です。",
    comparePoint:
      "MGN：エージェントベース・継続レプリケーション・カットオーバー数分・AWS 推奨。SMS：非推奨・VMware 専用。VM Import/Export：手動・少数台向け。",
    rememberAxis:
      "VM のリフト&シフト移行（推奨） → AWS MGN。データベースの移行 → DMS。大量データ移行 → Snowball Edge。",
  },
  {
    id: "migration-4",
    category: "Migration & Transfer",
    modeLabel: "シナリオ",
    prompt:
      "ある企業がオンプレミスで動作する三層 Web アプリケーション（Web / AP / DB）を AWS に移行したい。アプリケーションの改修は行わず、現行の構成のままインフラだけ AWS に移す（リフト&シフト）。移行前に TCO 分析とサーバーの依存関係を把握したい。最適なアプローチはどれか。",
    context:
      "移行するサーバーは約 50 台。どのサーバーがどのサーバーと通信しているかが不明。",
    correctChoiceId: "d",
    choices: [
      { id: "a", label: "A", text: "手動でサーバーの構成情報を収集し、スプレッドシートで管理する", hint: "50 台のサーバーを手動管理するのは漏れが発生しやすく非効率" },
      { id: "b", label: "B", text: "AWS Pricing Calculator でコスト見積もりだけ実施する", hint: "コスト計算はできるが依存関係の把握には使えない" },
      { id: "c", label: "C", text: "AWS Config でオンプレミスの構成情報を収集する", hint: "AWS Config は AWS リソース向けのサービス。オンプレミスの情報収集には使えない" },
      { id: "d", label: "D", text: "AWS Application Discovery Service でエージェントを導入し、サーバー情報と依存関係を自動収集する", hint: "Application Discovery Service はサーバーの構成・パフォーマンス・ネットワーク依存関係を自動収集し Migration Hub へ連携する" },
    ],
    explanation:
      "AWS Application Discovery Service はオンプレミスサーバーにエージェントをインストールし、CPU・メモリ・ディスク・ネットワーク通信先などを自動収集します。収集したデータは AWS Migration Hub へ送られ、どのサーバーがどのサーバーと通信しているかの依存関係マップが作成されます。この情報をもとに移行グループ（Wave）を決定し、依存関係を壊さない順序で計画的に移行できます。TCO 分析には Migration Evaluator（旧 TSO Logic）を組み合わせると精度の高い試算が可能です。",
    comparePoint:
      "Application Discovery Service：依存関係の自動収集・Migration Hub 連携。Migration Evaluator：TCO 分析・コスト比較。AWS MGN：実際の移行実施ツール。",
    rememberAxis:
      "移行前の依存関係把握・インベントリ収集 → Application Discovery Service。TCO 分析 → Migration Evaluator。リフト&シフト実施 → MGN。",
  },
  {
    id: "migration-5",
    category: "Migration & Transfer",
    modeLabel: "シナリオ",
    prompt:
      "ある企業がオンプレミスのファイルサーバー（NFS）上のデータを Amazon S3 に継続的に同期したい。毎晩バッチでオンプレのファイルと S3 を比較し、追加・更新されたファイルだけを効率的に転送したい。また転送中のデータは暗号化したい。最適なサービスはどれか。",
    context:
      "ファイル総量は 10 TB。毎日の差分は数十 GB 程度。専用線（Direct Connect）は既に開通済み。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "AWS Snowball Edge でデータを定期的に物理転送する", hint: "Snowball は一括移行向け。毎日の差分同期には不向き" },
      { id: "b", label: "B", text: "AWS DataSync を使って差分を自動検出・暗号化転送する", hint: "DataSync はファイルの差分を自動検出し、TLS 暗号化でスケジュール転送できる" },
      { id: "c", label: "C", text: "rsync スクリプトを EC2 上で実行して差分転送する", hint: "技術的には可能だが、EC2 の管理・監視・エラーハンドリングを自前で実装する必要がある" },
      { id: "d", label: "D", text: "S3 Transfer Acceleration を使って転送を高速化する", hint: "Transfer Acceleration は S3 へのアップロード高速化機能。差分検出や自動スケジュール機能はない" },
    ],
    explanation:
      "AWS DataSync はオンプレミスのストレージ（NFS・SMB）と AWS ストレージ（S3・EFS・FSx）間のデータ転送を自動化するサービスです。ファイルのメタデータ（タイムスタンプ・チェックサム）を比較して差分のみを転送し、転送は TLS で暗号化されます。スケジュール転送（毎日・毎時など）を設定でき、転送速度は Direct Connect の帯域を最大限活用します。専用のエージェントをオンプレにデプロイするだけで設定でき、EC2 の管理は不要です。",
    comparePoint:
      "DataSync：差分自動検出・スケジュール転送・TLS 暗号化・マネージド。rsync：手動管理・スクリプト・エラーハンドリングが必要。Snowball：物理デバイス・大容量一括移行。",
    rememberAxis:
      "オンプレ〜AWS 間のファイル差分同期・スケジュール転送 → DataSync。大容量の一括移行 → Snowball Edge。DB の継続レプリケーション → DMS。",
  },

  // ── シナリオ: 分析・データ処理 ──────────────────────────────────────────

  {
    id: "analytics-1",
    category: "Analytics",
    modeLabel: "シナリオ",
    prompt:
      "ある IoT 企業がセンサーから毎秒 100,000 件のデータを収集し、リアルタイムでダッシュボードに表示したい。また生データは S3 に保存して後続の分析にも活用したい。最適なアーキテクチャはどれか。",
    context:
      "データは JSON 形式でセンサーから送信されます。1 秒以内のリアルタイム表示が要件です。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "Kinesis Data Streams でリアルタイム処理し、Kinesis Data Firehose で S3 に保存する", hint: "Data Streams は低レイテンシのリアルタイム処理、Firehose は S3/Redshift への自動配信を担う" },
      { id: "b", label: "B", text: "SQS キューにデータを入れて Lambda で処理し、RDS に保存する", hint: "SQS + Lambda でも処理は可能だが、毎秒 10 万件の大量ストリームには Kinesis の方が適している" },
      { id: "c", label: "C", text: "API Gateway → Lambda → DynamoDB の構成でリアルタイム処理する", hint: "API Gateway のスロットリング制限や Lambda のコールドスタートが 1 秒以内の要件を満たせない可能性がある" },
      { id: "d", label: "D", text: "Amazon MSK（Managed Streaming for Apache Kafka）を使う", hint: "MSK は有効だが Kinesis より運用が複雑。既存の Kafka スキルがなければ Kinesis の方がシンプル" },
    ],
    explanation:
      "Amazon Kinesis Data Streams は大量のリアルタイムストリームデータを低レイテンシで処理するサービスです。シャード数を調整することでスループットを柔軟にスケールできます。処理したデータは Kinesis Data Analytics でリアルタイム集計し、Amazon Kinesis Data Firehose を使って自動的に S3 へ保存できます（圧縮・変換も可能）。この構成はリアルタイム処理とデータレイクへの保存を同時に実現できる標準的なパターンです。",
    comparePoint:
      "Kinesis Data Streams：リアルタイム・低レイテンシ・複数コンシューマ・シャードでスケール。SQS：非同期キュー・順序保証はFIFOのみ・大量ストリームには不向き。MSK：Kafka 互換・高機能だが運用が複雑。",
    rememberAxis:
      "大量リアルタイムデータの収集・処理 → Kinesis Data Streams。処理済みデータの S3/Redshift への自動配信 → Kinesis Data Firehose。既存 Kafka 環境の移行 → Amazon MSK。",
  },
  {
    id: "analytics-2",
    category: "Analytics",
    modeLabel: "シナリオ",
    prompt:
      "ある金融機関が複数のデータソース（トランザクション DB・CRM・ログ）からデータを統合し、毎日バッチで集計レポートを生成したい。データ量は合計 100 TB 以上で、SQL で複雑なビジネス分析クエリを実行する必要がある。最適なデータウェアハウス構成はどれか。",
    context:
      "現在は各システムのデータが分散しており、統合した分析ができていません。レポートは毎朝 9 時までに完成する必要があります。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "Aurora MySQL に全データを統合して分析クエリを実行する", hint: "Aurora は OLTP 向けで 100 TB の大規模分析クエリには不向き" },
      { id: "b", label: "B", text: "S3 にデータを保存して Athena でクエリする", hint: "Athena は中規模の分析に適するが、毎日 100 TB の複雑集計クエリでは Redshift の方が速い" },
      { id: "c", label: "C", text: "Redshift をデータウェアハウスとし、各ソースから AWS Glue で ETL してロードする", hint: "Redshift は列指向 MPP で大規模 OLAP に最適。Glue が ETL を自動化する" },
      { id: "d", label: "D", text: "DynamoDB にデータを格納して Lambda で集計処理する", hint: "DynamoDB は NoSQL でアクセスパターンが固定化される。複雑な JOIN を伴う分析には不向き" },
    ],
    explanation:
      "Amazon Redshift は列指向の MPP（大規模並列処理）データウェアハウスで、100 TB 以上の大規模データの SQL 分析クエリに特化しています。各ソースのデータは AWS Glue の ETL ジョブで抽出・変換し、Redshift の COPY コマンドで高速にロードします。Glue のジョブはスケジュール実行できるため、毎朝のバッチ処理を自動化できます。Redshift Spectrum を使えば S3 のデータを直接クエリすることも可能です。",
    comparePoint:
      "Redshift：列指向 MPP・大規模 OLAP・定期バッチ集計向け。Athena：サーバーレス・S3 直接クエリ・中規模アドホック分析向け。Glue：サーバーレス ETL・データカタログ。",
    rememberAxis:
      "100 TB 超の定期バッチ集計・DWH → Redshift。S3 データのアドホック SQL クエリ → Athena。データ変換・統合（ETL） → AWS Glue。",
  },
  {
    id: "analytics-3",
    category: "Analytics",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が ALB・CloudFront・Lambda のアクセスログを S3 に集約している。セキュリティインシデント調査時に「特定 IP からのアクセス」や「エラーレスポンスのパターン」をアドホックに SQL で検索したい。サーバーレスで低コストな分析基盤を構築したい。最適な構成はどれか。",
    context:
      "ログは毎日 50 GB 増加します。調査は月数回程度で、常時稼働のクラスターは不要です。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "OpenSearch（Elasticsearch）クラスターを常時起動してログを格納する", hint: "OpenSearch は強力だが、月数回の調査向けに常時稼働させるとコストが高い" },
      { id: "b", label: "B", text: "S3 にログを保存し Amazon Athena でサーバーレス SQL クエリする", hint: "Athena はサーバーレスで S3 を直接クエリし、スキャンしたデータ量のみ課金。常時稼働コストがない" },
      { id: "c", label: "C", text: "CloudWatch Logs Insights でログを分析する", hint: "CloudWatch Logs Insights は有効だが、S3 に保存済みのログを直接クエリできない。また大量ログは高コスト" },
      { id: "d", label: "D", text: "Redshift にログをロードして分析する", hint: "Redshift は継続的な大規模集計向け。月数回のアドホック調査には Athena の方がコスト効率が良い" },
    ],
    explanation:
      "Amazon Athena は S3 上のデータを標準 SQL でクエリできるサーバーレス分析サービスです。クラスターの管理が不要で、クエリしたデータ量（$5/TB）のみ課金されます。AWS Glue Data Catalog でテーブル定義を登録すると、ALB ログや CloudFront ログを構造化されたテーブルとして SQL でクエリできます。Parquet 形式や列指向圧縮（Snappy）に変換するとスキャン量が大幅に減りコストも速度も改善します。月数回の調査では OpenSearch の常時稼働コストと比べ大幅にコストを削減できます。",
    comparePoint:
      "Athena：サーバーレス・S3 直接クエリ・スキャン課金・アドホック調査向け。OpenSearch：常時稼働・全文検索・リアルタイムダッシュボード向け。CloudWatch Logs Insights：CloudWatch Logs 専用・S3 には不可。",
    rememberAxis:
      "S3 ログのアドホック SQL 分析・低コスト → Athena。リアルタイム全文検索・ダッシュボード → OpenSearch。構造化ログのリアルタイム集計 → Kinesis Data Analytics。",
  },
  {
    id: "analytics-4",
    category: "Analytics",
    modeLabel: "シナリオ",
    prompt:
      "ある企業がオンプレミスの様々なデータソース（RDS・S3・DynamoDB・REST API）からデータを抽出し、データウェアハウス（Redshift）へロードするための ETL パイプラインを構築したい。コードの管理を最小化しサーバーレスで実装したい。最適なサービスはどれか。",
    context:
      "データ変換ロジックは複雑で、スキーマのマッピングや NULL 値の処理が必要です。エンジニアは Python が得意です。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "AWS Glue を使いサーバーレスの ETL ジョブを Python（PySpark）で実装する", hint: "Glue はサーバーレスの ETL サービスで PySpark または Python Shell で変換ロジックを記述できる" },
      { id: "b", label: "B", text: "EC2 上に Apache Spark クラスターを構築して ETL を実装する", hint: "Spark は高性能だが EC2 クラスターの管理コストが高く、サーバーレス要件に反する" },
      { id: "c", label: "C", text: "Lambda で ETL スクリプトを実装する", hint: "Lambda は最大 15 分・10 GB メモリの制限があり、大規模な ETL には不向き" },
      { id: "d", label: "D", text: "AWS Data Pipeline を使って ETL を実装する", hint: "Data Pipeline は機能が限定的で現在は Glue の利用が推奨されている" },
    ],
    explanation:
      "AWS Glue はサーバーレスの ETL（Extract, Transform, Load）サービスで、DynamicFrame という Glue 独自のデータ構造を使って PySpark または Python Shell でデータ変換を記述できます。Glue Crawler がデータソースを自動スキャンしてスキーマを推測し、Glue Data Catalog にメタデータを登録します。ETL ジョブはスケジュール実行・トリガー実行が可能で、実行時のみ課金されます。複数のデータソースに対応し、Redshift・S3・RDS・DynamoDB などへの書き込みに対応しています。",
    comparePoint:
      "AWS Glue：サーバーレス ETL・PySpark/Python・複数ソース対応・Data Catalog 付き。EMR：Apache Spark/Hadoop クラスター・大規模処理・クラスター管理必要。Lambda：短時間処理向け・ETL には制限あり。",
    rememberAxis:
      "サーバーレス ETL・スキーマ変換・複数ソースの統合 → AWS Glue。大規模なカスタム Spark/Hadoop 処理 → Amazon EMR。リアルタイムストリーム処理 → Kinesis Data Analytics。",
  },
  {
    id: "analytics-5",
    category: "Analytics",
    modeLabel: "シナリオ",
    prompt:
      "ある小売企業が Redshift のデータウェアハウスを使って売上分析を行っている。経営陣がブラウザから視覚的なダッシュボードでデータを確認したい。IT 部門のリソースが少ないため、BI ツールのサーバー管理は行いたくない。最適なサービスはどれか。",
    context:
      "経営陣は技術的知識がなく、ドラッグ&ドロップでグラフを作れる操作性が必要。Redshift との連携がシームレスであることが重要。",
    correctChoiceId: "d",
    choices: [
      { id: "a", label: "A", text: "EC2 に Tableau Server をインストールして社内公開する", hint: "Tableau は強力だが EC2・ライセンス管理が必要でサーバーレス要件に反する" },
      { id: "b", label: "B", text: "EC2 に Grafana をインストールしてダッシュボードを構築する", hint: "Grafana は主にメトリクス監視向け。BI レポート用途は限定的でサーバー管理も必要" },
      { id: "c", label: "C", text: "Lambda で定期的にレポートを PDF 生成してメール送信する", hint: "静的レポートはインタラクティブなダッシュボードの代替にならない" },
      { id: "d", label: "D", text: "Amazon QuickSight を使ってサーバーレスの BI ダッシュボードを構築する", hint: "QuickSight は AWS のサーバーレス BI サービスで Redshift とネイティブに連携し、ドラッグ&ドロップでダッシュボードを作成できる" },
    ],
    explanation:
      "Amazon QuickSight は AWS のフルマネージドな BI（Business Intelligence）サービスです。サーバーの管理が不要で、Redshift・S3・RDS・Athena などの AWS データソースとネイティブに接続できます。SPICE（超高速並列インメモリ計算エンジン）によりクエリを高速化し、ドラッグ&ドロップでグラフ・ダッシュボードを作成できます。ユーザー数やセッション数に応じた従量課金のため、アクセスが少ない場合はコストも低く抑えられます。ML Insights 機能で異常検知や予測分析も可能です。",
    comparePoint:
      "QuickSight：AWS ネイティブ BI・サーバーレス・Redshift 連携・従量課金。Tableau：高機能 BI・サーバー管理必要・ライセンス高価。Grafana：メトリクス監視向け・BI には不向き。",
    rememberAxis:
      "AWS データソースとのサーバーレス BI → Amazon QuickSight。高度なビジュアライゼーション・既存 Tableau 環境 → Tableau on EC2。メトリクス・ログ監視 → Grafana/CloudWatch。",
  },

  // ── シナリオ: コンテナ ────────────────────────────────────────────────────

  {
    id: "containers-1",
    category: "Containers",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が新規の Web API をコンテナで開発・運用したい。チームは Kubernetes の経験がなく、なるべくシンプルに始めたい。一方、将来的に Kubernetes が必要になる可能性があるため、移行パスも確保しておきたい。最適なサービスはどれか。",
    context:
      "コンテナオーケストレーションは初めて。インフラの管理工数を最小化したい。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "Amazon EKS（Kubernetes）で始める", hint: "EKS は強力だが、Kubernetes 未経験チームにはラーニングコストが高い" },
      { id: "b", label: "B", text: "Amazon ECS（Fargate 起動タイプ）で始め、必要なら EKS へ移行する", hint: "ECS はシンプルで学習コストが低く、Fargate でサーバー管理も不要。EKS への移行パスも確保できる" },
      { id: "c", label: "C", text: "EC2 に Docker Compose をインストールして運用する", hint: "Docker Compose は本番運用向けの冗長化・スケーリングが難しい" },
      { id: "d", label: "D", text: "AWS Lambda のコンテナイメージサポートを使う", hint: "Lambda は短時間処理向け。常時起動の Web API サーバーには不向き" },
    ],
    explanation:
      "Amazon ECS は AWS 独自のコンテナオーケストレーションサービスで、Kubernetes より学習コストが低くシンプルです。Fargate 起動タイプを選択するとサーバー（EC2）の管理が不要になり、インフラ運用の負荷が最小化されます。ECS の Task Definition は Kubernetes の Pod spec に概念的に近く、将来 EKS に移行する際の概念理解にも繋がります。チームが Kubernetes の必要性を感じたタイミングで EKS へ段階的に移行できます。",
    comparePoint:
      "ECS：AWS ネイティブ・シンプル・Fargate 対応・学習コスト低。EKS：Kubernetes 互換・高機能・学習コスト高・マルチクラウド対応。Fargate：EC2 管理不要のサーバーレスコンテナ実行環境（ECS/EKS 両対応）。",
    rememberAxis:
      "シンプルなコンテナ管理・AWS ネイティブ → ECS + Fargate。Kubernetes が必要・マルチクラウド → EKS。短時間・イベント駆動 → Lambda（コンテナイメージ対応）。",
  },
  {
    id: "containers-2",
    category: "Containers",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が ECS で複数の API コンテナを運用している。夜間は利用者がほぼいないが、日中は急激にトラフィックが増える。コストを最適化しながら、日中のピーク時でも応答速度を維持したい。最適な構成はどれか。",
    context:
      "現在は固定の ECS タスク数（常時 10 タスク）で運用しており、夜間にリソースが無駄になっている。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "夜間に手動でタスク数を減らし、朝に増やすオペレーションを実施する", hint: "手動操作は運用ミスのリスクがあり、スケールアップが遅れる可能性がある" },
      { id: "b", label: "B", text: "タスクを Spot インスタンスで起動してコスト削減する", hint: "Spot インスタンスは中断リスクがある。API サービスには予備プランが必要" },
      { id: "c", label: "C", text: "ECS Service Auto Scaling を設定し、CPU/リクエスト数に応じてタスクをスケールする", hint: "ECS Service Auto Scaling は CloudWatch メトリクスに基づいてタスク数を自動調整する" },
      { id: "d", label: "D", text: "ECS タスクを Lambda 関数に変換する", hint: "API のコンテナを Lambda に変換するには大幅な改修が必要" },
    ],
    explanation:
      "ECS Service Auto Scaling は AWS Application Auto Scaling を利用して、ECS サービスのタスク数を自動的に増減させます。CPU 使用率・メモリ使用率・ALB のリクエスト数などの CloudWatch メトリクスをトリガーとして、最小・最大タスク数の範囲内でスケールします。夜間は最小タスク数（例：2 タスク）まで縮小し、日中のピーク時には自動的にスケールアウトするため、コストと性能を両立できます。スケジュールに基づいた Scheduled Scaling も組み合わせると予測可能なピークに対応できます。",
    comparePoint:
      "ECS Service Auto Scaling：タスク数を CloudWatch メトリクスで自動調整。EC2 Auto Scaling：インスタンス数を調整（Fargate では不要）。Scheduled Scaling：時刻ベースの事前スケール。",
    rememberAxis:
      "ECS タスクの自動スケール → ECS Service Auto Scaling。予測可能な日次ピーク → Scheduled Scaling と組み合わせ。EC2 ノードのスケール（ECS EC2 起動タイプ）→ EC2 Auto Scaling。",
  },
  {
    id: "containers-3",
    category: "Containers",
    modeLabel: "シナリオ",
    prompt:
      "ある企業がマイクロサービスのコンテナイメージを安全に保管・管理したい。CI/CD パイプラインから自動でイメージをプッシュし、ECS へのデプロイ時にプルできる環境を構築したい。また、脆弱性スキャンも自動で実施したい。最適なサービスはどれか。",
    context:
      "現在は Docker Hub を使用しているが、セキュリティ要件でプライベートレジストリが必要になった。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "Amazon ECR（Elastic Container Registry）を使いプライベートレジストリを構築し、プッシュ時に脆弱性スキャンを有効にする", hint: "ECR は ECS/EKS と緊密に統合され、IAM でアクセス制御。プッシュ時スキャン（Inspector V2 連携）で脆弱性を自動検出できる" },
      { id: "b", label: "B", text: "S3 バケットにコンテナイメージ（tar 形式）を保存する", hint: "S3 はオブジェクトストレージであり、コンテナレジストリとしては使用できない" },
      { id: "c", label: "C", text: "EC2 に GitLab Container Registry を構築してセルフホストする", hint: "可能だが EC2・GitLab の管理コストが発生し、マネージドサービスの ECR の方が運用負荷が低い" },
      { id: "d", label: "D", text: "AWS CodeArtifact を使ってコンテナイメージを管理する", hint: "CodeArtifact はパッケージ（npm・Maven・PyPI 等）管理サービス。コンテナイメージの管理には使えない" },
    ],
    explanation:
      "Amazon ECR（Elastic Container Registry）は AWS のフルマネージドなコンテナイメージレジストリです。IAM ポリシーでリポジトリへのアクセスを制御でき、ECS・EKS・CodeBuild から IAM ロールで安全にプル/プッシュできます。プッシュ時スキャン設定を有効にすると、Amazon Inspector V2 がイメージの OS パッケージや言語ライブラリの脆弱性を自動スキャンし、ECR コンソールと Security Hub に結果を表示します。ライフサイクルポリシーで古いイメージを自動削除することでコスト管理もできます。",
    comparePoint:
      "ECR：AWS ネイティブ・IAM 統合・ECS/EKS と緊密連携・脆弱性スキャン（Inspector）。Docker Hub：パブリック/プライベート・外部サービス・AWS IAM 統合なし。CodeArtifact：ソフトウェアパッケージ管理（npm 等）・コンテナレジストリではない。",
    rememberAxis:
      "ECS/EKS 用のプライベートコンテナレジストリ → Amazon ECR。脆弱性スキャン自動化 → ECR + Amazon Inspector V2。npm/Maven 等のパッケージ管理 → CodeArtifact。",
  },
  {
    id: "containers-4",
    category: "Containers",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が EKS でマイクロサービスを運用している。外部からのトラフィックを各サービスへ適切にルーティングし、TLS 終端・認証・レートリミットを一元管理したい。また、サービス間通信の可視化も行いたい。最適な構成はどれか。",
    context:
      "現在はサービスごとに ALB を立てているが、管理が煩雑になっています。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "各サービスに NLB を追加し、サービスごとに TLS 設定を管理する", hint: "NLB を増やすと管理の煩雑さが増す。一元管理には API ゲートウェイかサービスメッシュが適切" },
      { id: "b", label: "B", text: "AWS Load Balancer Controller で Ingress を管理し、AWS App Mesh でサービスメッシュを構築する", hint: "Ingress で外部トラフィックのルーティングを一元化し、App Mesh でサービス間通信を可視化できる" },
      { id: "c", label: "C", text: "Amazon API Gateway を全サービスの前段に配置する", hint: "API Gateway は有効だが、Kubernetes ネイティブのワークロードには Ingress の方が自然な統合方法" },
      { id: "d", label: "D", text: "Route 53 でサービスごとに DNS レコードを管理する", hint: "DNS だけでは TLS 終端・認証・レートリミットは実現できない" },
    ],
    explanation:
      "EKS では AWS Load Balancer Controller を使うと Kubernetes の Ingress リソースが自動的に ALB（Application Load Balancer）として作成されます。1 つの ALB でパスベース・ホストベースのルーティングを設定でき、ACM 証明書による TLS 終端も一元管理できます。AWS App Mesh（または Istio などのサービスメッシュ）を組み合わせると、サービス間通信にサイドカープロキシ（Envoy）が注入され、通信の可視化・トレーシング・サーキットブレーカーなどを実現できます。",
    comparePoint:
      "AWS Load Balancer Controller + Ingress：外部トラフィックのルーティング一元化。App Mesh：サービス間通信の制御・可視化・サービスメッシュ。API Gateway：REST/HTTP API の管理・認証・スロットリング。",
    rememberAxis:
      "EKS の外部トラフィック一元管理 → Ingress + AWS Load Balancer Controller。サービス間通信の可視化・制御 → App Mesh（サービスメッシュ）。API の認証・スロットリング → API Gateway。",
  },
  {
    id: "containers-5",
    category: "Containers",
    modeLabel: "シナリオ",
    prompt:
      "ある企業がモノリシックなアプリケーションをマイクロサービスアーキテクチャに移行したい。移行は段階的に行い、まず一部の機能を切り出してコンテナ化する。既存のモノリスと新しいマイクロサービスが共存できる構成を設計したい。最適なアプローチはどれか。",
    context:
      "既存のモノリスは EC2 で動作しています。最初に「注文処理」機能を切り出す予定です。",
    correctChoiceId: "d",
    choices: [
      { id: "a", label: "A", text: "モノリスを一括でマイクロサービスに分解してから移行する（ビッグバン移行）", hint: "ビッグバン移行はリスクが高く、移行中に機能が使えなくなる可能性がある" },
      { id: "b", label: "B", text: "モノリスを完全に停止してから段階的に移行する", hint: "停止期間中はサービスが利用不可になりビジネスに影響がある" },
      { id: "c", label: "C", text: "Lambda でマイクロサービスを実装し、モノリスを即座に廃止する", hint: "Lambda への移行にはコードの大幅な改修が必要で即座の廃止は困難" },
      { id: "d", label: "D", text: "ストラングラーフィグパターンを採用し、ALB でリクエストを新旧システムに段階的に振り分ける", hint: "新機能を徐々にマイクロサービスに移し、ALB のパスベースルーティングで振り分けることでモノリスと共存できる" },
    ],
    explanation:
      "ストラングラーフィグ（Strangler Fig）パターンは、モノリスを一括置換するのではなく、新機能をマイクロサービスとして実装しながら古いコードを徐々に廃止していく移行戦略です。ALB のパスベースルーティング（/orders/* → 新しいコンテナサービス、それ以外 → 既存 EC2）を使うことで、モノリスと新しいマイクロサービスを同時に稼働させながら段階的に移行できます。リスクが低く、各ステップで動作確認しながら進められます。API Gateway を使ってルーティングを管理する方法もあります。",
    comparePoint:
      "ストラングラーフィグパターン：段階的移行・リスク低・モノリスと共存・ALB/API GW でルーティング。ビッグバン移行：一括置換・リスク高・テスト困難。",
    rememberAxis:
      "モノリスからマイクロサービスへの段階的移行 → ストラングラーフィグパターン + ALB パスルーティング。新規のマイクロサービス開発 → ECS/EKS + Fargate。",
  },

  // ── シナリオ: エッジ・グローバル ─────────────────────────────────────────

  {
    id: "edge-1",
    category: "Edge & Global",
    modeLabel: "シナリオ",
    prompt:
      "ある動画配信企業がグローバルのユーザーに高画質動画（最大 4K）を低レイテンシで配信したい。動画ファイルは S3 に保存されており、ユーザーはアジア・欧米・中南米から利用する。コンテンツに対するアクセス制御（有料会員のみ視聴可）も必要。最適な構成はどれか。",
    context:
      "現在は S3 の静的ウェブサイトホスティングで配信しているが、海外ユーザーの再生品質が低い。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "CloudFront を S3 オリジンとして設定し、署名付き URL で有料会員のアクセスを制御する", hint: "CloudFront はグローバルのエッジロケーションで動画をキャッシュし、署名付き URL でアクセス制御を実現できる" },
      { id: "b", label: "B", text: "各リージョンに S3 バケットを作成し Route 53 ジオルーティングで振り分ける", hint: "ジオルーティングは可能だが、エッジキャッシュがなくレイテンシ改善は限定的" },
      { id: "c", label: "C", text: "EC2 にメディアサーバーを構築してグローバルに展開する", hint: "各リージョンに EC2 を管理する運用コストが高く、CloudFront より効率が悪い" },
      { id: "d", label: "D", text: "Global Accelerator を使って動画を配信する", hint: "Global Accelerator はレイテンシ改善に有効だが動画キャッシュ機能がない。CDN としての利用には CloudFront が適切" },
    ],
    explanation:
      "Amazon CloudFront は世界 450 以上のエッジロケーション（POP）に動画をキャッシュし、ユーザーの最寄りエッジから配信するため低レイテンシを実現します。S3 をオリジンとする場合、OAC（Origin Access Control）を設定することで S3 バケットをパブリックにせず CloudFront 経由のアクセスのみを許可できます。CloudFront の署名付き URL または署名付き Cookie を使うと、有料会員にのみコンテンツへのアクセスを許可できます。AWS Elemental MediaConvert と組み合わせてアダプティブビットレートストリーミング（HLS/DASH）も構成できます。",
    comparePoint:
      "CloudFront：CDN・エッジキャッシュ・動画配信・署名付き URL でアクセス制御。Global Accelerator：TCP/UDP の高速化・キャッシュなし・動的コンテンツ向け。S3 静的ホスティング：単一リージョン・エッジキャッシュなし。",
    rememberAxis:
      "グローバルな静的/動画コンテンツのキャッシュ配信 → CloudFront。アクセス制御が必要なプレミアムコンテンツ → CloudFront 署名付き URL/Cookie。グローバルなアプリの TCP 高速化 → Global Accelerator。",
  },
  {
    id: "edge-2",
    category: "Edge & Global",
    modeLabel: "シナリオ",
    prompt:
      "あるゲーム企業がグローバルのプレイヤーに対してリアルタイムのゲームサーバー（UDP 通信）を提供している。東京・バージニア・フランクフルトにサーバーがある。プレイヤーが最も近いリージョンのゲームサーバーに自動的に接続され、レイテンシを最小化したい。最適なサービスはどれか。",
    context:
      "ゲームは UDP プロトコルを使用しており、固定 IP アドレスが必要。レイテンシが 50ms を超えるとプレイヤー体験が悪化する。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "CloudFront を使って最寄りのサーバーへルーティングする", hint: "CloudFront は HTTP/HTTPS の CDN であり、UDP プロトコルには対応していない" },
      { id: "b", label: "B", text: "AWS Global Accelerator を使い、Anycast IP で最寄りの AWS エッジへ接続させる", hint: "Global Accelerator は TCP/UDP 対応で固定 Anycast IP を提供し、AWS バックボーンで最寄りリージョンへルーティングする" },
      { id: "c", label: "C", text: "Route 53 レイテンシーベースルーティングで最寄りリージョンへ振り分ける", hint: "DNS ベースのルーティングはキャッシュ TTL があり切り替えが遅い。固定 IP も提供できない" },
      { id: "d", label: "D", text: "各リージョンの ELB に Elastic IP を付与してユーザーに直接 IP を配布する", hint: "ELB に直接 Elastic IP は付与できない。また最寄りリージョンへの自動ルーティングも実現できない" },
    ],
    explanation:
      "AWS Global Accelerator は 2 つの静的 Anycast IP アドレスをエントリポイントとして提供し、インターネット上のユーザーを最寄りの AWS エッジロケーションへ誘導します。その後は AWS のプライベートグローバルネットワーク（バックボーン）を通じてターゲットリージョンのエンドポイント（NLB・ALB・EC2 等）に転送するため、インターネット経由より安定した低レイテンシを実現できます。UDP プロトコルにも対応しており、ゲームや VoIP などのリアルタイムアプリに適しています。固定 IP はファイアウォールホワイトリストにも使えます。",
    comparePoint:
      "Global Accelerator：固定 Anycast IP・TCP/UDP 対応・AWS バックボーン経由・動的コンテンツ向け。CloudFront：CDN・HTTP/HTTPS・静的/動的コンテンツのキャッシュ。Route 53：DNS・TTL によるルーティング遅延あり。",
    rememberAxis:
      "固定 IP・TCP/UDP の低レイテンシ・グローバルルーティング → Global Accelerator。HTTP/HTTPS コンテンツのキャッシュ配信 → CloudFront。",
  },
  {
    id: "edge-3",
    category: "Edge & Global",
    modeLabel: "シナリオ",
    prompt:
      "ある企業がプライマリリージョン（us-east-1）の ALB を使った Web アプリを運用している。プライマリが障害になったとき、バックアップリージョン（ap-northeast-1）へ自動的にフェイルオーバーしたい。DNSのTTLを活用した最適な構成はどれか。",
    context:
      "バックアップリージョンには最小限のインフラ（パイロットライト）が稼働中。フェイルオーバー時の RTO は 5 分以内。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "Route 53 の重み付けルーティングで 90:10 に振り分け、障害時に手動で 0:100 に変更する", hint: "手動変更はヒューマンエラーリスクがあり、5 分以内の自動フェイルオーバーを保証できない" },
      { id: "b", label: "B", text: "Route 53 のジオロケーションルーティングで地域ごとにリージョンを振り分ける", hint: "ジオルーティングは地域によるルーティング分離。障害時の自動フェイルオーバーには対応していない" },
      { id: "c", label: "C", text: "Route 53 のフェイルオーバールーティングで、ヘルスチェックが失敗したらセカンダリへ自動切替する", hint: "Route 53 のアクティブ/パッシブフェイルオーバーはヘルスチェックと組み合わせて自動切替が可能" },
      { id: "d", label: "D", text: "ELB のクロスリージョン機能でフェイルオーバーする", hint: "ELB はリージョン内のロードバランサーで、クロスリージョンフェイルオーバー機能はない" },
    ],
    explanation:
      "Route 53 のフェイルオーバールーティングポリシーを使うと、プライマリレコードにヘルスチェックを設定し、ヘルスチェックが失敗した場合にセカンダリ（バックアップリージョンの ALB）へ自動的に DNS を切り替えられます。Route 53 のヘルスチェックは 10〜30 秒間隔で確認し、3 回連続失敗でフェイルオーバーが実行されます。TTL を短く（60 秒以下）設定しておくことで、DNS キャッシュのクリアも早く、5 分以内のフェイルオーバーを実現できます。",
    comparePoint:
      "Route 53 フェイルオーバールーティング：自動フェイルオーバー・ヘルスチェック連動・アクティブ/パッシブ。重み付けルーティング：A/B テスト・比率制御・手動変更。ジオルーティング：地域別振り分け・障害フェイルオーバーなし。",
    rememberAxis:
      "自動フェイルオーバー → Route 53 フェイルオーバールーティング + ヘルスチェック。段階的なトラフィック移行 → 重み付けルーティング。地域ごとのエンドポイント → ジオロケーションルーティング。",
  },
  {
    id: "edge-4",
    category: "Edge & Global",
    modeLabel: "シナリオ",
    prompt:
      "ある EC サイトが CloudFront を使って静的コンテンツを配信している。ユーザーが古いコンテンツを参照しないよう、デプロイ直後にエッジキャッシュを即座に無効化したい。また、ユーザーの国によって表示言語を変えるため、リクエストのヘッダー情報を参照してリダイレクトしたい。最適な構成はどれか。",
    context:
      "キャッシュの TTL は 24 時間に設定されています。ユーザーの Accept-Language ヘッダーで言語を振り分けたい。",
    correctChoiceId: "d",
    choices: [
      { id: "a", label: "A", text: "CloudFront のキャッシュ無効化は TTL が切れるまで待つ", hint: "TTL 24 時間では新機能のデプロイ後にユーザーへの反映が遅すぎる" },
      { id: "b", label: "B", text: "CloudFront ディストリビューションを削除・再作成してキャッシュをクリアする", hint: "ディストリビューションの削除・再作成は設定も含めてリセットされ、ダウンタイムが発生する" },
      { id: "c", label: "C", text: "Route 53 の TTL を短くしてキャッシュを制御する", hint: "Route 53 は DNS サービスであり、CloudFront のコンテンツキャッシュの制御はできない" },
      { id: "d", label: "D", text: "CloudFront のキャッシュ無効化 API でパスを指定してパージし、言語振り分けは Lambda@Edge で実装する", hint: "Invalidation API でエッジキャッシュを即座に無効化。Lambda@Edge でリクエストヘッダーを参照したリダイレクトが可能" },
    ],
    explanation:
      "CloudFront の Invalidation（キャッシュ無効化）API を使うと、特定のパス（例：/index.html や /*）のキャッシュを即座に全エッジロケーションから削除できます（最大 3,000 パスを無料で月次無効化可能）。Lambda@Edge は CloudFront のエッジロケーションで Lambda 関数を実行する機能で、ビューワーリクエスト・オリジンリクエスト・オリジンレスポンス・ビューワーレスポンスの 4 つのイベントをフックできます。Accept-Language ヘッダーを参照して言語別 URL にリダイレクトする処理をビューワーリクエストイベントで実装できます。",
    comparePoint:
      "CloudFront Invalidation：エッジキャッシュの即時無効化。Lambda@Edge：エッジでのリクエスト/レスポンス操作・A/B テスト・認証・リダイレクト。CloudFront Functions：超軽量な処理向け・Lambda@Edge より安価・高速。",
    rememberAxis:
      "エッジキャッシュの即時クリア → CloudFront Invalidation API。エッジでのリクエスト操作（ヘッダー変換・リダイレクト） → Lambda@Edge または CloudFront Functions。",
  },
  {
    id: "edge-5",
    category: "Edge & Global",
    modeLabel: "シナリオ",
    prompt:
      "ある金融系企業が複数リージョン（us-east-1・eu-west-1・ap-northeast-1）で Active-Active 構成のアプリを運用したい。ユーザーは最寄りのリージョンへ接続し、各リージョンのデータは DynamoDB Global Tables で同期する。リージョン障害時は他のリージョンへ自動フェイルオーバーさせたい。最適な構成はどれか。",
    context:
      "99.99% の可用性が求められます。リージョン障害は年に数回発生する可能性があります。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "Route 53 の重み付けルーティングで 3 リージョンに均等に振り分ける", hint: "重み付けルーティングはフェイルオーバー機能がないため、障害リージョンへもトラフィックが流れ続ける" },
      { id: "b", label: "B", text: "Route 53 のレイテンシーベースルーティング + ヘルスチェックを組み合わせる", hint: "レイテンシーベースで最寄りリージョンへ接続し、ヘルスチェック失敗時に他のリージョンへ自動フェイルオーバーする" },
      { id: "c", label: "C", text: "CloudFront で 3 リージョンのオリジンをオリジングループに設定する", hint: "CloudFront のオリジングループはプライマリ/セカンダリのフェイルオーバーが目的でActive-Activeには不向き" },
      { id: "d", label: "D", text: "Global Accelerator のエンドポイントに 3 リージョンの ALB を登録する", hint: "Global Accelerator も有効だが、レイテンシーベースルーティングは Route 53 で実現する方が柔軟性が高い" },
    ],
    explanation:
      "Route 53 のレイテンシーベースルーティングはユーザーの位置から最もレイテンシーが低いリージョンへトラフィックを誘導します。各リージョンの ALB にヘルスチェックを設定することで、リージョン障害時に自動的に正常なリージョンへフェイルオーバーします。DynamoDB Global Tables はマルチリージョンのマルチマスター構成でデータを自動同期するため、どのリージョンで書き込んでも他のリージョンに秒以内に反映されます。この構成により Active-Active でのマルチリージョン運用と自動フェイルオーバーを実現できます。",
    comparePoint:
      "Route 53 レイテンシーベース + ヘルスチェック：Active-Active・最寄りリージョン接続・フェイルオーバー。DynamoDB Global Tables：マルチリージョン同期・マルチマスター書き込み。Global Accelerator：固定 IP・TCP/UDP・バックボーン経由。",
    rememberAxis:
      "Active-Active マルチリージョン + 最寄りリージョンへの接続 → Route 53 レイテンシーベース + ヘルスチェック。DB のマルチリージョン同期 → DynamoDB Global Tables。固定 IP + グローバルルーティング → Global Accelerator。",
  },

  // ── シナリオ: ハイブリッドアーキテクチャ ─────────────────────────────────

  {
    id: "hybrid-1",
    category: "Hybrid Architecture",
    modeLabel: "シナリオ",
    prompt:
      "ある企業がオンプレミスのデータセンターと AWS を接続しており、通常時は Direct Connect を使って低レイテンシな接続を維持している。Direct Connect に障害が発生した場合にも接続を維持したい。コストを抑えつつ冗長性を確保する最適な構成はどれか。",
    context:
      "Direct Connect の月額費用は高いため、同じ帯域の回線を 2 本引くのはコスト的に難しい。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "Direct Connect をプライマリとし、Site-to-Site VPN をバックアップとして構成する", hint: "Direct Connect 障害時に VPN へ自動フェイルオーバーする標準的な冗長構成。VPN のコストは Direct Connect より大幅に安い" },
      { id: "b", label: "B", text: "Direct Connect を 2 本引いてデュアル接続にする", hint: "最も可用性が高いが、同じ帯域の回線を 2 本引くとコストが 2 倍になる" },
      { id: "c", label: "C", text: "VPN のみに変更してコストを削減する", hint: "VPN はインターネット経由でレイテンシが不安定。Direct Connect の低レイテンシの利点を失う" },
      { id: "d", label: "D", text: "Transit Gateway のみで冗長化する", hint: "Transit Gateway は複数の VPC・VPN・Direct Connect を集約するハブだが、それ自体は物理回線の冗長化手段ではない" },
    ],
    explanation:
      "Direct Connect と Site-to-Site VPN のハイブリッド冗長構成は AWS が推奨するベストプラクティスです。Direct Connect は通常の業務に低レイテンシ・安定した帯域を提供し、障害時にはインターネット経由の VPN へ自動フェイルオーバーします（BGP のルートで自動切替）。VPN の費用は Direct Connect の 1/10 以下のため、コストを抑えた冗長化が可能です。最高の可用性が必要な場合は Direct Connect を異なるロケーションで 2 本引くデュアル DX 構成が推奨されます。",
    comparePoint:
      "Direct Connect：専用回線・低レイテンシ・安定帯域・高コスト。Site-to-Site VPN：インターネット経由・低コスト・レイテンシ変動あり・バックアップに最適。Direct Connect + VPN：コスト効率の高い推奨冗長構成。",
    rememberAxis:
      "コスト効率の良いオンプレ〜AWS 冗長接続 → Direct Connect（プライマリ）+ VPN（バックアップ）。最高可用性 → デュアル Direct Connect。低コスト重視・レイテンシ許容 → VPN のみ。",
  },
  {
    id: "hybrid-2",
    category: "Hybrid Architecture",
    modeLabel: "シナリオ",
    prompt:
      "ある製造業企業が工場のエッジで機械学習推論（品質検査の画像判定）をリアルタイムで実行したい。工場内の通信は閉鎖的でインターネットには接続できない環境。AWS のサービスをオンプレミス環境に持ち込んで使いたい。最適なサービスはどれか。",
    context:
      "レイテンシ要件は 100ms 以内。機械学習モデルは定期的に AWS で再学習し、デプロイする。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "EC2 インスタンスをオンプレに設置して推論サーバーを構築する", hint: "AWS のマネージドサービスとの統合が難しく、モデル更新の自動化も自前で実装が必要" },
      { id: "b", label: "C", text: "AWS IoT Greengrass をエッジデバイスにインストールしてローカル推論を実行する", hint: "IoT Greengrass はエッジデバイスで Lambda や ML 推論を実行できるが、AWS Outposts よりスケールは小さい" },
      { id: "c", label: "C", text: "AWS Outposts を工場に設置し、AWS のインフラとサービスをオンプレミスで実行する", hint: "Outposts は AWS のラックをオンプレに設置し、EC2・ECS・RDS・S3 等を AWS と同じ API でオンプレ環境で利用できる" },
      { id: "d", label: "D", text: "Amazon SageMaker のみで推論を AWS クラウド上で実行する", hint: "インターネット非接続環境では AWS クラウドへのリアルタイム推論リクエストができない" },
    ],
    explanation:
      "AWS Outposts は AWS のラック型ハードウェアをお客様のオンプレミス施設に設置するサービスです。EC2・ECS・EKS・RDS・ElastiCache・S3 などの AWS サービスを AWS と全く同じ API・ツール・コンソールで利用できます。インターネット非接続環境でもローカルに処理できるため、工場内の低レイテンシ要件を満たせます。モデルの再学習は AWS クラウドの SageMaker で行い、更新したモデルを Outposts にデプロイするハイブリッド ML パイプラインが構築できます。小規模デバイスには AWS IoT Greengrass が適しています。",
    comparePoint:
      "AWS Outposts：ラック型・フルの AWS サービス・低レイテンシ・大規模インフラ向け。IoT Greengrass：軽量・エッジデバイス（Raspberry Pi 等）・Lambda/ML 実行・センサー向け。Local Zones：AWS が管理する低レイテンシ拠点（オンプレではない）。",
    rememberAxis:
      "オンプレに AWS フルサービスを持ち込む → AWS Outposts。軽量エッジデバイスで Lambda/ML 推論 → IoT Greengrass。都市部の低レイテンシ AWS インフラ → Local Zones。",
  },
  {
    id: "hybrid-3",
    category: "Hybrid Architecture",
    modeLabel: "シナリオ",
    prompt:
      "ある企業がオンプレミスの Active Directory（AD）を使って社内ユーザーを管理している。AWS 環境でも同じ AD アカウントで EC2 や AWS Management Console へのアクセスを可能にしたい。オンプレ AD とのシームレスな認証統合を実現するには何を使うべきか。",
    context:
      "ユーザーは社内 PC から AWS リソースへアクセスします。パスワードの二重管理は避けたい。",
    correctChoiceId: "d",
    choices: [
      { id: "a", label: "A", text: "AWS IAM ユーザーを全員分作成し、オンプレ AD のパスワードと同期する", hint: "手動同期は管理コストが高く、パスワードの二重管理になる" },
      { id: "b", label: "B", text: "Amazon Cognito を使ってオンプレ AD と連携する", hint: "Cognito は主に外部ユーザー（アプリのエンドユーザー）向け。社内 AD 連携には IAM Identity Center の方が適切" },
      { id: "c", label: "C", text: "AWS Directory Service の Simple AD を作成し、オンプレ AD の代替にする", hint: "Simple AD はスタンドアロンの LDAP 互換 AD。既存のオンプレ AD との信頼関係（トラスト）は設定できない" },
      { id: "d", label: "D", text: "AWS IAM Identity Center とオンプレ AD（Directory Service AD Connector 経由）を連携させる", hint: "IAM Identity Center（旧 SSO）は AD Connector でオンプレ AD に接続し、既存の AD 認証で AWS Console や EC2 にアクセスできる" },
    ],
    explanation:
      "AWS IAM Identity Center（旧 AWS SSO）はシングルサインオン機能を提供するサービスです。AWS Directory Service の AD Connector を使ってオンプレミスの Active Directory に接続すると、既存の AD ユーザー・グループをそのまま利用して AWS Management Console へのアクセス権を割り当てられます。ユーザーは社内 AD のパスワードで AWS Console にサインインでき、パスワードの二重管理が不要です。EC2 への AD 参加（Domain Join）は AWS Managed Microsoft AD を使う方法もあります。",
    comparePoint:
      "IAM Identity Center + AD Connector：既存 AD でシングルサインオン・Console アクセス。AWS Managed Microsoft AD：完全な AD 機能（Group Policy 等）・オンプレ AD とのトラスト設定可能。AD Connector：オンプレ AD へのプロキシ・AD を AWS 上に複製しない。",
    rememberAxis:
      "オンプレ AD で AWS Console SSO → IAM Identity Center + AD Connector。完全な AD 機能が必要 → AWS Managed Microsoft AD。外部ユーザー（顧客）の認証 → Amazon Cognito。",
  },
  {
    id: "hybrid-4",
    category: "Hybrid Architecture",
    modeLabel: "シナリオ",
    prompt:
      "ある企業がオンプレミスと AWS のハイブリッドな DNS 環境を構築したい。AWS の VPC 内のリソース（EC2・RDS）はオンプレのサーバーから内部 DNS 名で名前解決したい。逆に、AWS からオンプレの内部 DNS 名も解決したい。最適な構成はどれか。",
    context:
      "オンプレの内部ドメインは example.local。AWS VPC の内部ドメインは example.aws.internal。Direct Connect で接続済み。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "Route 53 Resolver のインバウンド/アウトバウンドエンドポイントを作成し、条件付きフォワーダーを設定する", hint: "Inbound Endpoint でオンプレ→AWS の名前解決を受け付け、Outbound Endpoint + Forwarding Rule でAWS→オンプレに転送できる" },
      { id: "b", label: "B", text: "オンプレの DNS サーバーをプライマリとし、AWS の DNS をセカンダリに設定する", hint: "AWS Route 53 はセカンダリ DNS として外部ゾーン転送を受けることができない構成になっている" },
      { id: "c", label: "C", text: "EC2 上に BIND サーバーを立てて全ての DNS クエリを中継する", hint: "可能だが EC2 の管理・単一障害点のリスクがある。Route 53 Resolver のマネージド機能の方が適切" },
      { id: "d", label: "D", text: "AWS Global Accelerator で DNS を統合管理する", hint: "Global Accelerator はトラフィックルーティングサービスで DNS サーバーではない" },
    ],
    explanation:
      "Route 53 Resolver は VPC 内の DNS リゾルバーで、インバウンドエンドポイントとアウトバウンドエンドポイントで双方向のハイブリッド DNS 解決を実現します。インバウンドエンドポイントは VPC 内に ENI を作成し、オンプレの DNS サーバーがこの IP アドレスに AWS 内部 DNS クエリを転送します（オンプレ → AWS の名前解決）。アウトバウンドエンドポイントと Forwarding Rules を設定すると、VPC 内からオンプレのドメイン（example.local）へのクエリをオンプレの DNS サーバーに転送できます（AWS → オンプレの名前解決）。",
    comparePoint:
      "Route 53 Resolver インバウンドエンドポイント：オンプレ→AWS の名前解決受付。Route 53 Resolver アウトバウンドエンドポイント + Forwarding Rule：AWS→オンプレの名前解決転送。Route 53 プライベートホストゾーン：VPC 内部の DNS 管理。",
    rememberAxis:
      "ハイブリッド双方向 DNS 解決 → Route 53 Resolver インバウンド/アウトバウンドエンドポイント。VPC 内部の DNS 名前解決 → Route 53 プライベートホストゾーン。",
  },
  {
    id: "hybrid-5",
    category: "Hybrid Architecture",
    modeLabel: "シナリオ",
    prompt:
      "ある企業がオンプレミスのファイルサーバー（数十 TB）を引き続き使いながら、AWS S3 をバックエンドストレージとして活用したい。オンプレのサーバーやアプリケーションは NFS・SMB でファイルにアクセスし続けられるようにしつつ、S3 へのデータ保存・バックアップも自動化したい。最適なサービスはどれか。",
    context:
      "アプリケーションの変更なしで既存の NFS マウントを使い続けることが条件。頻繁にアクセスするデータはオンプレにキャッシュしたい。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "AWS DataSync でオンプレのファイルを S3 に定期同期する", hint: "DataSync は差分同期に優れるが、既存の NFS マウントを維持しながらリアルタイムに S3 をバックエンドにする機能はない" },
      { id: "b", label: "B", text: "Amazon EFS をオンプレにマウントしてファイルサーバーを置き換える", hint: "EFS は VPC 内の NFS サービスで、オンプレから Direct Connect 経由でマウントできるが、S3 バックエンドではない" },
      { id: "c", label: "C", text: "AWS Storage Gateway（ファイルゲートウェイ）をオンプレに設置し、S3 をバックエンドに NFS/SMB を提供する", hint: "File Gateway はオンプレに仮想アプライアンスをデプロイし、NFS/SMB を提供しながら S3 に自動保存・キャッシュも管理する" },
      { id: "d", label: "D", text: "AWS Snowball Edge をオンプレに常時設置してストレージとして利用する", hint: "Snowball Edge は移行・エッジコンピューティング向けで、常時設置のストレージサービスではない" },
    ],
    explanation:
      "AWS Storage Gateway のファイルゲートウェイモードは、オンプレミスに仮想アプライアンス（VM または Hardware Appliance）をデプロイし、NFS または SMB インターフェースを提供します。アプリケーションは従来通り NFS マウントでファイルにアクセスでき、ファイルゲートウェイが自動的に S3 オブジェクトとして保存します。頻繁にアクセスするデータはローカルキャッシュから高速に返し、キャッシュにないデータは S3 から取得します。S3 に保存されたデータは S3 のライフサイクルポリシーで自動的に Glacier にアーカイブすることもできます。",
    comparePoint:
      "Storage Gateway ファイルゲートウェイ：NFS/SMB 維持・S3 バックエンド・ローカルキャッシュ・ハイブリッドストレージ。DataSync：差分同期・スケジュール転送・ゲートウェイ不要。EFS：NFS・VPC 内・S3 バックエンドではない。",
    rememberAxis:
      "既存 NFS/SMB を維持しながら S3 にデータ保存 → Storage Gateway ファイルゲートウェイ。オンプレ↔S3 の差分同期 → DataSync。VPC 内の共有ファイルシステム → EFS。",
  },

  // ── シナリオ: Well-Architected Framework ─────────────────────────────────

  {
    id: "well-arch-1",
    category: "Well-Architected",
    modeLabel: "シナリオ",
    prompt:
      "ある企業がシステム運用の自動化を推進したい。現在は本番環境への変更を手動で実施しており、ヒューマンエラーによる障害が頻発している。AWS Well-Architected Framework の「運用上の優秀性」の原則に基づく最も適切な改善方針はどれか。",
    context:
      "現在の運用チームはサーバーへの手動 SSH 接続・手動デプロイが常態化しています。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "ベテランオペレーターの手順書を詳細化し、手動作業の品質を高める", hint: "手順書の改善は有効だが、手動作業を排除しない限りヒューマンエラーは根本解決しない" },
      { id: "b", label: "B", text: "変更時は必ずメンテナンスウィンドウを設けて計画的に実施する", hint: "計画的な変更は重要だが、自動化なしでは依然としてヒューマンエラーリスクが残る" },
      { id: "c", label: "C", text: "IaC（CloudFormation/CDK）で環境を定義し、CI/CD パイプラインで変更を自動デプロイする", hint: "運用上の優秀性の核心は「運用をコードとして扱う」こと。IaC と CI/CD で変更の一貫性・反復可能性を確保する" },
      { id: "d", label: "D", text: "本番環境を読み取り専用にして変更できないようにする", hint: "変更を禁止してもシステムは進化できない。変更プロセスの自動化・安全化が目的" },
    ],
    explanation:
      "AWS Well-Architected Framework の「運用上の優秀性（Operational Excellence）」の柱では、「運用をコードとして実行する」ことが重要な設計原則です。インフラを CloudFormation や CDK で IaC（Infrastructure as Code）として定義し、アプリケーションの変更は CodePipeline・CodeBuild・CodeDeploy などの CI/CD パイプラインで自動デプロイします。手動作業を排除することでヒューマンエラーを防ぎ、変更の一貫性・トレーサビリティ・ロールバック能力を確保できます。",
    comparePoint:
      "運用上の優秀性の原則：運用をコードとして扱う・変更の自動化・失敗から学ぶ・頻繁な小さな変更。IaC（CloudFormation/CDK）：インフラ定義のコード化。CI/CD：変更の自動テスト・デプロイ。",
    rememberAxis:
      "ヒューマンエラー削減・運用自動化 → IaC + CI/CD。インフラのバージョン管理 → CloudFormation/CDK。アプリのブルーグリーンデプロイ → CodeDeploy。",
  },
  {
    id: "well-arch-2",
    category: "Well-Architected",
    modeLabel: "シナリオ",
    prompt:
      "ある金融系企業が AWS でシステムを設計する際、セキュリティを多層防御（Defense in Depth）で実装したい。AWS Well-Architected Framework の「セキュリティ」の柱に基づいて、最も適切な多層防御の構成はどれか。",
    context:
      "インターネットに公開された Web アプリで、EC2 上で動作しています。データベースは RDS を使用。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "インターネットゲートウェイにセキュリティグループを設定する", hint: "インターネットゲートウェイ自体にセキュリティグループは設定できない" },
      { id: "b", label: "B", text: "WAF + Shield で DDoS/L7 攻撃を防ぎ、NACL と SG で通信を制限し、KMS でデータを暗号化する", hint: "WAF・Shield・NACL・SG・KMS を組み合わせた多層防御。各レイヤーで異なる攻撃を防ぐ" },
      { id: "c", label: "C", text: "EC2 に強力なパスワードポリシーを設定するだけで十分", hint: "パスワードポリシーは認証の一要素に過ぎない。ネットワーク・データ・アプリ各層の防御が必要" },
      { id: "d", label: "D", text: "すべてのトラフィックを VPN 経由にする", hint: "VPN は重要な手段だが、アプリ層・データ層・ネットワーク層の多層防御には不十分" },
    ],
    explanation:
      "Well-Architected の「セキュリティ」の柱では、多層防御（Defense in Depth）が重要な設計原則です。①エッジ層：CloudFront + WAF（L7 攻撃防御）+ Shield（DDoS 防御）、②ネットワーク層：VPC・パブリック/プライベートサブネット分離・NACL（ステートレス）・セキュリティグループ（ステートフル）、③アプリ層：最小権限の IAM ロール・EC2 は SSH を無効化（Systems Manager Session Manager を使用）、④データ層：KMS による保存時暗号化・TLS による転送時暗号化。各層が独立して機能するため、1 つの層が突破されても次の層で防御できます。",
    comparePoint:
      "多層防御のレイヤー：エッジ（WAF・Shield）→ ネットワーク（NACL・SG）→ アプリ（IAM・STS）→ データ（KMS・TLS）。単一の防御策への依存を避けることが重要。",
    rememberAxis:
      "L7 攻撃（SQL インジェクション・XSS） → WAF。DDoS 対策 → Shield Standard（無料）/ Advanced（有料）。通信制御 → SG（ステートフル）・NACL（ステートレス）。保存時暗号化 → KMS。",
  },
  {
    id: "well-arch-3",
    category: "Well-Architected",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が EC2 で動作するシステムを「信頼性」の観点で改善したい。現在は単一 EC2 が障害を起こすとサービス全体が停止する。AWS Well-Architected Framework の「信頼性」の柱に基づく、自動復旧を実現する最も適切な構成はどれか。",
    context:
      "EC2 の障害検知から復旧までを人手を介さず自動化したい。データは RDS に保存されています。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "Auto Scaling グループ（最小 2）と ALB を組み合わせ、ヘルスチェック失敗時にインスタンスを自動置換する", hint: "ASG + ALB の組み合わせは EC2 障害の自動検知・除外・置換を実現する信頼性の標準パターン" },
      { id: "b", label: "B", text: "CloudWatch アラームで EC2 の CPU を監視し、アラーム発生時に SNS でオペレーターに通知する", hint: "通知は重要だが人手による対応が必要で、自動復旧にはならない" },
      { id: "c", label: "C", text: "EC2 を予約インスタンスにして障害リスクを減らす", hint: "予約インスタンスはコスト削減の仕組みで、障害耐性とは無関係" },
      { id: "d", label: "D", text: "EC2 の EBS スナップショットを毎日取得して障害時に復旧する", hint: "スナップショットからの復旧には時間がかかり自動復旧ではない。RTO が長くなる" },
    ],
    explanation:
      "Well-Architected の「信頼性（Reliability）」の柱では、「障害から自動的に復旧する」ことが核心原則です。ALB は EC2 インスタンスのヘルスチェックを定期的に実施し、失敗したインスタンスをルーティング対象から除外します。Auto Scaling グループはその除外されたインスタンスを終了し、新しいインスタンスを自動起動・ALB に登録します。最小 2 台構成にすることで、1 台が障害中も残り 1 台がリクエストを処理できます（AZ 分散も重要）。この一連の処理は完全に自動化され、人手の介入なしに数分で復旧します。",
    comparePoint:
      "信頼性の原則：自動復旧・水平スケール・キャパシティを自動管理・変更の影響を限定。ASG + ALB：EC2 の自動置換・高可用性。RDS Multi-AZ：DB の自動フェイルオーバー。",
    rememberAxis:
      "EC2 の自動障害復旧 → ASG + ALB（ヘルスチェック + 自動置換）。DB の自動フェイルオーバー → RDS Multi-AZ。アプリ全体の自動復旧 → ASG + ALB + RDS Multi-AZ の組み合わせ。",
  },
  {
    id: "well-arch-4",
    category: "Well-Architected",
    modeLabel: "シナリオ",
    prompt:
      "ある企業の EC2 ベースの API サーバーがレイテンシの問題を抱えている。データベースへのクエリが遅く、同じデータを繰り返し取得している。AWS Well-Architected Framework の「パフォーマンス効率」の柱に基づく最も適切な改善策はどれか。",
    context:
      "API の 80% は同じマスターデータ（商品カタログ等）を返す読み取りリクエストです。データの更新頻度は 1 日 1 回程度。",
    correctChoiceId: "d",
    choices: [
      { id: "a", label: "A", text: "EC2 インスタンスのサイズをアップグレードして処理能力を高める", hint: "スケールアップは即効性があるが根本解決ではない。同じクエリを繰り返す非効率は解消されない" },
      { id: "b", label: "B", text: "RDS のリードレプリカを増やして読み取りを分散する", hint: "リードレプリカは有効だが、頻繁に同じデータを DB から取得し続ける非効率は残る" },
      { id: "c", label: "C", text: "API のコードを最適化してクエリ回数を減らす", hint: "コード最適化は重要だが、キャッシュ導入と組み合わせる方が大幅な改善を得られる" },
      { id: "d", label: "D", text: "ElastiCache（Redis）をキャッシュ層として追加し、頻繁に読まれるデータをメモリに保持する", hint: "ElastiCache はサブミリ秒のキャッシュ取得を提供し、DB へのクエリを 80% 以上削減できる" },
    ],
    explanation:
      "Well-Architected の「パフォーマンス効率（Performance Efficiency）」の柱では、「キャッシュを活用してリクエストを効率化する」ことが重要です。Amazon ElastiCache（Redis または Memcached）をアプリケーションとデータベースの間に配置すると、同じデータへのリクエストはメモリから数マイクロ秒で返せます。商品カタログのような 1 日 1 回更新のデータは TTL を適切に設定することでキャッシュヒット率を最大化できます。DB への読み取り負荷が 80% 削減されることでレイテンシが大幅に改善し、RDS のコストも下がります。",
    comparePoint:
      "ElastiCache（Redis）：サブミリ秒キャッシュ・セッション管理・Pub/Sub。RDS リードレプリカ：読み取りスケール・非同期レプリケーション・SQL クエリが必要。CloudFront：HTTP コンテンツのエッジキャッシュ。",
    rememberAxis:
      "DB の読み取り負荷軽減・高速キャッシュ → ElastiCache（Redis/Memcached）。読み取り DB のスケール → RDS リードレプリカ。API レスポンスの HTTP キャッシュ → CloudFront。",
  },
  {
    id: "well-arch-5",
    category: "Well-Architected",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が AWS のコストを削減したい。現在は本番・開発・テスト環境のすべてで On-Demand インスタンスを常時起動している。AWS Well-Architected Framework の「コスト最適化」の柱に基づく最も効果的な改善策はどれか。",
    context:
      "開発・テスト環境は平日 9〜18 時のみ使用。本番はベースラインが安定していてスパイクは少ない。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "すべての環境を最も安いインスタンスタイプに変更する", hint: "過小なインスタンスはパフォーマンス問題を引き起こす可能性があり、コスト最適化の手段としては不適切" },
      { id: "b", label: "B", text: "本番は Reserved Instance で割引を受け、開発・テストは夜間・週末に自動停止する", hint: "本番の安定ワークロードに RI（最大 72% 割引）、開発環境の停止で非稼働時間のコストをゼロにできる" },
      { id: "c", label: "C", text: "すべての EC2 を Spot インスタンスに変更する", hint: "Spot は中断リスクがある。本番サービスへの無条件適用は可用性を損なう" },
      { id: "d", label: "D", text: "AWS コスト削減のためにオンプレミスに戻す", hint: "オンプレへの回帰は運用コスト・CAPEX が発生し、AWS の柔軟性も失う" },
    ],
    explanation:
      "Well-Architected の「コスト最適化（Cost Optimization）」の柱では「需要と供給を一致させる」「消費モデルを採用する」が重要な原則です。安定した本番ベースラインには Reserved Instance（1 年 or 3 年）を購入すると最大 72% 割引を受けられます。Savings Plans（Compute/EC2）も同様の割引を提供します。開発・テスト環境は EC2 Instance Scheduler などで平日 9〜18 時以外に自動停止することで、非稼働時間（約 73%）のコストをゼロにできます。スパイク分は On-Demand で対応し、中断耐性のあるバッチは Spot を活用するという組み合わせが最適です。",
    comparePoint:
      "Reserved Instance：安定ベースライン・最大 72% 割引・1〜3 年コミット。Savings Plans：柔軟性が高い割引プラン・インスタンスタイプ変更可能。Spot：中断あり・最大 90% 割引・バッチ/ML 向け。",
    rememberAxis:
      "安定した常時稼働ワークロード → Reserved Instance または Savings Plans。開発・テスト環境 → スケジュール停止。中断耐性のあるバッチ → Spot インスタンス。",
  },

  // ── シナリオ: メッセージング・統合 ───────────────────────────────────────

  {
    id: "messaging-1",
    category: "Messaging & Integration",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が SQS キューで注文処理を行っている。処理に失敗したメッセージが何度もリトライされ、常に失敗するメッセージがキューを詰まらせている。失敗メッセージを分離して調査・再処理できるようにしたい。最適な構成はどれか。",
    context:
      "メッセージの処理失敗はアプリのバグや外部 API の障害が原因。失敗したメッセージを安全に保管して後から分析したい。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "SQS のデッドレターキュー（DLQ）を設定し、最大受信数を超えたメッセージを自動的に DLQ へ移動させる", hint: "DLQ は一定回数失敗したメッセージを隔離し、メインキューへの影響を防ぎながら失敗原因を調査できる" },
      { id: "b", label: "B", text: "失敗したメッセージを Lambda が検出して S3 に保存するカスタムロジックを実装する", hint: "可能だが複雑な実装が必要。DLQ はこの用途のためにネイティブにサポートされている機能" },
      { id: "c", label: "C", text: "メッセージの可視性タイムアウトを無限大に設定する", hint: "可視性タイムアウトを無限大にすると、メッセージが永遠に処理中とみなされキューが詰まる" },
      { id: "d", label: "D", text: "失敗したメッセージを手動で削除して再送する", hint: "手動対応はスケールしない。DLQ で自動隔離・一括再処理が可能" },
    ],
    explanation:
      "SQS のデッドレターキュー（DLQ）はメインキューと別に作成する SQS キューで、メッセージが最大受信数（maxReceiveCount）を超えて処理失敗した場合に自動的に移動します。DLQ にあるメッセージは通常のキューには戻らないため、メインキューのブロッキングを防ぎます。DLQ 内のメッセージは CloudWatch アラームで監視し、原因調査後に SQS コンソールまたは API で「DLQ からの再処理」機能を使ってメインキューに一括戻すことができます（SQS DLQ Redrive）。",
    comparePoint:
      "SQS DLQ：失敗メッセージの自動隔離・調査・一括再処理。可視性タイムアウト：処理中のメッセージを他のコンシューマーから隠す時間。最大受信数（maxReceiveCount）：DLQ 移動のトリガーとなる失敗回数。",
    rememberAxis:
      "処理失敗メッセージの隔離・調査 → SQS デッドレターキュー（DLQ）。メッセージの重複処理防止 → SQS FIFO キュー（Exactly-Once）。メッセージの順序保証 → SQS FIFO キュー。",
  },
  {
    id: "messaging-2",
    category: "Messaging & Integration",
    modeLabel: "シナリオ",
    prompt:
      "ある EC サイトで新規注文が発生したとき、在庫管理システム・配送システム・メール通知システムの 3 つへ同時にイベントを通知したい。将来的に分析システムも追加する予定がある。最も拡張性の高い疎結合アーキテクチャはどれか。",
    context:
      "現在は注文サービスが各システムに直接 API 呼び出しをしているが、システムが増えるたびに改修が必要になっている。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "注文サービスが 3 つの SQS キューに順番にメッセージを送る", hint: "注文サービスが送信先を知っている密結合。新システム追加のたびに注文サービスを改修する必要がある" },
      { id: "b", label: "B", text: "共有の SQS キューを 1 つ作り、全システムが同じキューをポーリングする", hint: "SQS の 1 メッセージは 1 コンシューマーにのみ届くため、全システムへのファンアウトには使えない" },
      { id: "c", label: "C", text: "SNS トピックに注文イベントをパブリッシュし、各システムの SQS キューをサブスクライブさせる", hint: "SNS ファンアウトパターン。1 パブリッシュで全サブスクライバーに届き、新システム追加はサブスクリプション追加のみ" },
      { id: "d", label: "D", text: "注文サービスがすべての処理を同期的に順番に実行する", hint: "同期処理では 1 つのシステムが遅い場合に全体が遅延し、障害の波及リスクもある" },
    ],
    explanation:
      "SNS（Simple Notification Service）のファンアウトパターンが拡張性の高い疎結合アーキテクチャの標準解です。注文サービスは SNS トピックにのみイベントをパブリッシュし、送信先を意識する必要がありません。各システムは独自の SQS キューを SNS トピックにサブスクライブし、自分のペースで処理します。分析システムを追加する場合は SNS に SQS サブスクリプションを追加するだけで、注文サービスの改修は不要です。各 SQS キューは DLQ と組み合わせて障害耐性も確保できます。",
    comparePoint:
      "SNS ファンアウト：1 対多・パブリッシャーは送信先を意識しない・拡張が容易。SQS のみ：1 対 1・ファンアウト不可。直接 API 呼び出し：密結合・拡張のたびに改修が必要。",
    rememberAxis:
      "1 イベントを複数サブスクライバーへ配信 → SNS ファンアウト + SQS。メッセージの非同期キューイング → SQS。リアルタイムのストリーム処理 → Kinesis。",
  },
  {
    id: "messaging-3",
    category: "Messaging & Integration",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が SaaS アプリ（Salesforce・GitHub・Stripe）からのイベントと AWS サービスのイベント（EC2 起動・S3 オブジェクト作成）を統合し、イベントの内容に応じて異なる Lambda 関数を呼び出したい。低コードでイベントルーティングを設定したい。最適なサービスはどれか。",
    context:
      "イベントの種類は今後も増える予定。ルーティングロジックを宣言的に管理したい。",
    correctChoiceId: "d",
    choices: [
      { id: "a", label: "A", text: "すべてのイベントを SQS に入れて Lambda でフィルタリングする", hint: "Lambda でのフィルタリングはコードの管理が必要でルーティングロジックが散在する" },
      { id: "b", label: "B", text: "SNS トピックを複数作成しイベント種別ごとに管理する", hint: "SNS は有効だが、SaaS イベントのネイティブ統合やJSON パターンマッチングは EventBridge の方が優れている" },
      { id: "c", label: "C", text: "API Gateway に全イベントを受け付け Lambda でルーティングを実装する", hint: "独自ルーティングロジックの実装・管理コストが高い。EventBridge の方が宣言的でシンプル" },
      { id: "d", label: "D", text: "Amazon EventBridge のイベントバスとルールで JSON パターンマッチングによりルーティングする", hint: "EventBridge は SaaS パートナー統合・AWS サービスのイベント・カスタムイベントを統合し、JSON ルールで宣言的にルーティングできる" },
    ],
    explanation:
      "Amazon EventBridge はイベント駆動アーキテクチャの中心となるサービスです。デフォルトのイベントバス（AWS サービスのイベント）に加え、カスタムイベントバス（独自アプリ）とパートナーイベントバス（Salesforce・GitHub・Stripe 等 200 以上の SaaS パートナーから直接受信）をサポートします。ルールは JSON パターンマッチングで定義し（コードなし）、マッチしたイベントを Lambda・SQS・SNS・Step Functions など多数のターゲットへルーティングします。スキーマレジストリでイベント構造を管理でき、IDE での自動補完も可能です。",
    comparePoint:
      "EventBridge：SaaS 統合・JSON パターンマッチング・多数のターゲット・スキーマレジストリ・コードなしルーティング。SNS：シンプルなファンアウト・フィルターポリシー（EventBridge より機能限定）。SQS：非同期キュー・ファンアウト不可。",
    rememberAxis:
      "SaaS イベント + AWS イベントの統合ルーティング → EventBridge。シンプルなファンアウト → SNS。非同期キューイング → SQS。複雑なビジネスフローの状態管理 → Step Functions。",
  },
  {
    id: "messaging-4",
    category: "Messaging & Integration",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が EC サイトの注文処理ワークフロー（在庫確認 → 決済 → 配送登録 → メール送信）を実装したい。各ステップは Lambda 関数で実装済みで、決済失敗時は在庫を元に戻す補償トランザクションが必要。また、配送 API が一時的に失敗した場合は 3 回まで自動リトライしたい。最適なサービスはどれか。",
    context:
      "現在は Lambda が次の Lambda を直接呼び出す実装で、エラーハンドリングが複雑化しています。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "SQS キューで Lambda を連鎖させ、DLQ でエラーを処理する", hint: "SQS 連鎖は疎結合だが、ステップ間の状態管理・補償トランザクション・順序制御は自前実装が必要" },
      { id: "b", label: "B", text: "AWS Step Functions でステートマシンを定義し、エラーキャッチ・リトライ・補償トランザクションを宣言的に設定する", hint: "Step Functions は各ステップの状態・リトライ・エラーハンドリング・補償フローを JSON/YAML で宣言的に定義できる" },
      { id: "c", label: "C", text: "単一の Lambda 関数に全ステップを組み込み、try-catch でエラーを処理する", hint: "モノリシックな Lambda では各ステップの独立した管理・リトライ・タイムアウト設定が困難" },
      { id: "d", label: "D", text: "EventBridge Scheduler でステップを時間差で順番に実行する", hint: "Scheduler は定期実行向けで、前ステップの結果を受けた条件分岐・エラーハンドリングには不向き" },
    ],
    explanation:
      "AWS Step Functions は Lambda 関数などをステートマシン（状態機械）として定義し、ワークフローの実行・状態管理・エラーハンドリングを自動化するサービスです。Amazon States Language（JSON ベース）で各ステップのリトライ回数・待機時間・エラーキャッチを宣言的に設定でき、コードの複雑さを排除できます。Saga パターン（補償トランザクション）も実装でき、決済失敗時に在庫戻しステップを呼び出すフローを定義できます。実行履歴は Step Functions コンソールでビジュアル確認でき、デバッグが容易です。",
    comparePoint:
      "Step Functions：ワークフロー状態管理・リトライ・補償トランザクション・ビジュアル確認。SQS：非同期キュー・状態管理なし。EventBridge：イベントルーティング・定期実行。Lambda 連鎖：密結合・エラーハンドリングが複雑。",
    rememberAxis:
      "複数ステップのワークフロー・状態管理・補償トランザクション → Step Functions。疎結合なイベント配信 → SNS/SQS/EventBridge。定期バッチ実行 → EventBridge Scheduler。",
  },
  {
    id: "messaging-5",
    category: "Messaging & Integration",
    modeLabel: "シナリオ",
    prompt:
      "ある企業がモバイルアプリのバックエンドとして GraphQL API を構築したい。リアルタイムのデータ更新（チャット・通知）が必要で、クライアントからのサブスクリプション機能（WebSocket）も実装したい。サーバーの管理を最小化したい。最適なサービスはどれか。",
    context:
      "モバイルアプリは iOS と Android で、データソースは DynamoDB と Lambda を組み合わせる予定。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "AWS AppSync を使い GraphQL API とリアルタイムサブスクリプションを実装する", hint: "AppSync はフルマネージドの GraphQL サービスで WebSocket によるリアルタイムサブスクリプションをネイティブサポートする" },
      { id: "b", label: "B", text: "API Gateway + Lambda で REST API を構築し、WebSocket API で通知を実装する", hint: "可能だが REST + WebSocket の 2 系統管理が必要。AppSync の方が GraphQL + サブスクリプションを一元管理できる" },
      { id: "c", label: "C", text: "EC2 に Node.js の Apollo Server をインストールして GraphQL サーバーを構築する", hint: "サーバーの管理・スケーリング・HA 設定が必要でサーバーレス要件に反する" },
      { id: "d", label: "D", text: "Amazon Cognito のみでリアルタイム通知を実装する", hint: "Cognito はユーザー認証サービスで GraphQL API やリアルタイム通知の機能はない" },
    ],
    explanation:
      "AWS AppSync はフルマネージドの GraphQL サービスで、スキーマを定義するだけで DynamoDB・Lambda・RDS・HTTP エンドポイントなど複数のデータソースをリゾルバーとして接続できます。クライアントの GraphQL サブスクリプション（Subscription）は WebSocket で自動的にリアルタイムに通知されます（Mutation の結果を購読中クライアントにプッシュ）。Cognito と統合することで認証済みユーザーのみがデータにアクセスできる fine-grained アクセス制御も実装できます。サーバーの管理は不要です。",
    comparePoint:
      "AppSync：GraphQL・リアルタイムサブスクリプション・複数データソース・Cognito 統合・サーバーレス。API Gateway REST：REST/HTTP API・WebSocket 別管理。API Gateway WebSocket：独自のリアルタイム通信・GraphQL ではない。",
    rememberAxis:
      "GraphQL API + リアルタイムサブスクリプション → AWS AppSync。REST API のサーバーレス構築 → API Gateway + Lambda。WebSocket のみ（非 GraphQL） → API Gateway WebSocket API。",
  },

  // ── シナリオ: 機械学習 ───────────────────────────────────────────────────

  {
    id: "ml-1",
    category: "Machine Learning",
    modeLabel: "シナリオ",
    prompt:
      "ある企業がカスタムの機械学習モデルを開発・学習・デプロイしたい。データサイエンティストが Jupyter Notebook で実験し、本番モデルを REST API エンドポイントとして公開する必要がある。サーバーの管理を最小化したい。最適なサービスはどれか。",
    context:
      "モデルは scikit-learn と TensorFlow で実装予定。学習データは S3 に保存されている。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "EC2 の GPU インスタンスで学習し、Flask API サーバーをデプロイする", hint: "EC2 の管理・スケーリング・監視を自前で実装する必要がある" },
      { id: "b", label: "B", text: "Amazon SageMaker でノートブック・学習・モデルデプロイを一元管理する", hint: "SageMaker は ML ライフサイクル全体（実験・学習・デプロイ・監視）をマネージドに提供する" },
      { id: "c", label: "C", text: "AWS Lambda でモデル推論を実装する", hint: "Lambda はモデルファイルが大きい場合や長時間推論には制限（10 GB・15 分）がある" },
      { id: "d", label: "D", text: "Amazon EMR で Spark ML を使って学習する", hint: "EMR は大規模分散処理向け。scikit-learn/TensorFlow の学習には SageMaker の方が適切" },
    ],
    explanation:
      "Amazon SageMaker は機械学習のライフサイクル全体をカバーするフルマネージドサービスです。①SageMaker Studio（Jupyter ベースの IDE）で実験・コード開発、②SageMaker Training Job で EC2/GPU インスタンスを自動プロビジョニングして学習（完了後に自動終了）、③SageMaker Endpoints でモデルを REST API としてデプロイ（Auto Scaling 対応）、④SageMaker Model Monitor でデータドリフトを監視。サーバーの管理は SageMaker が担当し、データサイエンティストは ML に集中できます。",
    comparePoint:
      "SageMaker：ML ライフサイクル全体・マネージド・Studio/Training/Endpoints/Pipelines。EC2 + Flask：完全な制御・サーバー管理が必要。Lambda：軽量推論・制限あり。Bedrock：生成 AI 基盤モデルの API 利用（カスタム学習なし）。",
    rememberAxis:
      "カスタム ML モデルの開発〜デプロイ → SageMaker。生成 AI 基盤モデルの API 利用 → Amazon Bedrock。大規模分散 ML（Spark ML） → EMR。",
  },
  {
    id: "ml-2",
    category: "Machine Learning",
    modeLabel: "シナリオ",
    prompt:
      "ある小売企業が店舗の監視カメラ映像から万引き疑い行動（棚から商品を隠すなど）をリアルタイムで検知したい。自社で ML モデルを構築するリソースはない。最も迅速に実現できるソリューションはどれか。",
    context:
      "監視カメラ映像は S3 にリアルタイムで保存されています。AIの知識は限られており、事前学習済みモデルを活用したい。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "Amazon Rekognition Video を使って動画内の人物行動・物体を分析する", hint: "Rekognition Video は事前学習済みモデルで人物検出・ラベル検出・カスタムラベルをコードなしで利用できる" },
      { id: "b", label: "B", text: "SageMaker でカスタムの物体検出モデルを学習して展開する", hint: "可能だが学習データ収集・モデル開発に時間がかかる。事前学習済みモデルがない場合は必要" },
      { id: "c", label: "C", text: "Lambda で映像を 1 フレームずつ処理して OpenCV で分析する", hint: "OpenCV での実装は専門知識が必要。Rekognition はより高度な分析をマネージドに提供する" },
      { id: "d", label: "D", text: "Amazon Comprehend で映像のテキストを分析する", hint: "Comprehend はテキスト分析サービスで映像・画像の分析はできない" },
    ],
    explanation:
      "Amazon Rekognition は画像・動画分析の事前学習済みモデルを API として提供するサービスです。Rekognition Video では動画内の人物検出・顔認識・行動ラベル検出（人物が荷物を持つ・置くなどの行動）をリアルタイムまたはバッチで分析できます。カスタムラベル（Custom Labels）機能を使うと、少量の学習画像（数十〜数百枚）で特定の物体・シーンを検出するカスタムモデルを作成できます。ML の専門知識なしに Amazon Kinesis Video Streams と連携してリアルタイム分析パイプラインを構築できます。",
    comparePoint:
      "Rekognition：画像/動画の事前学習済みモデル・顔認識・物体検出・コンテンツモデレーション。SageMaker：カスタムモデル開発・学習・デプロイ。Comprehend：テキスト分析・感情分析・エンティティ抽出。",
    rememberAxis:
      "画像/動画の顔認識・物体検出 → Amazon Rekognition。テキストの感情分析・エンティティ抽出 → Amazon Comprehend。カスタム ML モデルの開発 → Amazon SageMaker。",
  },
  {
    id: "ml-3",
    category: "Machine Learning",
    modeLabel: "シナリオ",
    prompt:
      "ある企業がカスタマーサポートの問い合わせメール（日英混合・1 日 10,000 件）を自動分析したい。メールの感情（ポジティブ・ネガティブ・中立）を判定し、ネガティブなメールを優先的に担当者へ割り振りたい。最も迅速に実現できる構成はどれか。",
    context:
      "ML モデルを自社開発するリソースはない。API 呼び出しで感情分析できることが条件。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "SageMaker でカスタムの感情分析モデルを学習・デプロイする", hint: "カスタムモデルは精度を上げられるが、開発・学習コストが高い。事前学習済みモデルが要件を満たせるなら不要" },
      { id: "b", label: "B", text: "Amazon Rekognition で感情分析する", hint: "Rekognition は画像/動画の分析サービスでテキストの感情分析はできない" },
      { id: "c", label: "C", text: "Amazon Comprehend の感情分析 API でメールのポジネガを判定する", hint: "Comprehend は事前学習済みのテキスト分析サービスで、API 1 回の呼び出しで感情・エンティティ・キーフレーズを返す" },
      { id: "d", label: "D", text: "Amazon Translate でメールを翻訳してから人手で判定する", hint: "Translate は言語変換サービスで感情分析機能はない。人手での判定は 1 日 1 万件をスケールできない" },
    ],
    explanation:
      "Amazon Comprehend はテキスト分析の事前学習済みモデルを API として提供するサービスです。感情分析（DetectSentiment API）はテキストを送信するだけで POSITIVE・NEGATIVE・NEUTRAL・MIXED の感情スコアを返します。日本語を含む多言語に対応しており、日英混合のメールでも言語自動検出（DetectDominantLanguage）と組み合わせて処理できます。SQS + Lambda + Comprehend のパイプラインで 1 日 1 万件のメールを非同期処理し、ネガティブスコアの高いメールを優先キューへ転送する構成が実現できます。",
    comparePoint:
      "Comprehend：テキスト分析・感情分析・エンティティ・キーフレーズ・言語検出・多言語対応。Rekognition：画像/動画分析。Translate：言語翻訳。Transcribe：音声→テキスト変換。",
    rememberAxis:
      "テキストの感情分析・エンティティ抽出 → Amazon Comprehend。音声の文字起こし → Amazon Transcribe。テキストの翻訳 → Amazon Translate。画像/動画の分析 → Amazon Rekognition。",
  },
  {
    id: "ml-4",
    category: "Machine Learning",
    modeLabel: "シナリオ",
    prompt:
      "ある企業がコールセンターの通話録音（日本語）を自動でテキスト化し、多言語（英語・中国語）に翻訳してグローバルチームで共有したい。さらにテキストを音声（TTS）に変換して海外スタッフがヒアリングできるようにしたい。最適な AWS サービスの組み合わせはどれか。",
    context:
      "通話録音は S3 に保存されています。自動化されたバッチ処理が必要。",
    correctChoiceId: "d",
    choices: [
      { id: "a", label: "A", text: "SageMaker + カスタム音声認識モデルで対応する", hint: "カスタムモデルの開発コストが高い。AWS のマネージドサービスで要件を満たせる" },
      { id: "b", label: "B", text: "Amazon Comprehend で音声ファイルを直接テキスト化する", hint: "Comprehend はテキスト分析サービスで音声ファイルの変換（ASR）はできない" },
      { id: "c", label: "C", text: "Amazon Rekognition で通話内容を分析する", hint: "Rekognition は画像/動画分析サービスで音声テキスト変換はできない" },
      { id: "d", label: "D", text: "Transcribe で音声をテキスト化 → Translate で翻訳 → Polly で音声合成する", hint: "Transcribe（ASR）→ Translate（翻訳）→ Polly（TTS）は音声関連処理の定番パイプライン" },
    ],
    explanation:
      "音声処理の三段階パイプラインが最適です。①Amazon Transcribe（ASR：自動音声認識）：日本語の通話音声を高精度にテキスト化します。カスタム語彙（専門用語・固有名詞）の登録も可能です。②Amazon Translate：テキストを英語・中国語など 75 以上の言語に高品質に翻訳します。③Amazon Polly（TTS：テキスト音声合成）：翻訳されたテキストを自然な音声（複数の声色・言語・感情表現）に変換して MP3 で出力します。この全パイプラインを Lambda と S3 で自動化できます。",
    comparePoint:
      "Transcribe：音声→テキスト（ASR）・話者分離・カスタム語彙。Translate：テキスト翻訳・75 以上の言語。Polly：テキスト→音声（TTS）・自然な音声・SSML 対応。Comprehend：テキスト分析（感情・エンティティ）。",
    rememberAxis:
      "音声→テキスト → Transcribe。テキスト翻訳 → Translate。テキスト→音声 → Polly。音声処理フル自動化 → Transcribe → Translate → Polly のパイプライン。",
  },
  {
    id: "ml-5",
    category: "Machine Learning",
    modeLabel: "シナリオ",
    prompt:
      "ある動画ストリーミング企業がユーザーの視聴履歴・クリック・評価データをもとに、各ユーザーへの動画レコメンドを自動化したい。ML の専門知識は少なく、大量の学習データを用意せずに迅速に展開したい。最適なサービスはどれか。",
    context:
      "ユーザー数は 100 万人、動画コンテンツは 10 万本。リアルタイムのパーソナライズが必要。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "Amazon Personalize を使い、インタラクションデータをアップロードしてレコメンドモデルを学習・デプロイする", hint: "Personalize は Amazon.com のレコメンドエンジン技術を API として提供し、ML 専門知識なしにパーソナライズを実現できる" },
      { id: "b", label: "B", text: "SageMaker で協調フィルタリングモデルを自作して学習・デプロイする", hint: "カスタムモデルは柔軟だが ML の専門知識と大量の開発工数が必要" },
      { id: "c", label: "C", text: "DynamoDB に閲覧履歴を保存して人気ランキングを表示する", hint: "全員に同じランキングを表示するのはパーソナライズではない" },
      { id: "d", label: "D", text: "Amazon Comprehend でコンテンツのジャンルを分類してルールベースでレコメンドする", hint: "ルールベースはパターンが固定化され、個々のユーザー行動を学習できない" },
    ],
    explanation:
      "Amazon Personalize は Amazon.com が内部で使用しているレコメンドエンジン技術を API として提供するサービスです。ユーザーのインタラクションデータ（視聴・クリック・購入履歴）・ユーザー属性・アイテム属性を S3 にアップロードし、Personalize がデータに最適なアルゴリズム（協調フィルタリング・コンテンツベース等）を自動選択して学習します。学習完了後は Campaign エンドポイントに API でリクエストを送ると、リアルタイムで各ユーザーへのパーソナライズされたレコメンドを返します。ML の専門知識なしに数時間で展開できます。",
    comparePoint:
      "Amazon Personalize：レコメンドエンジン・ユーザー行動学習・ML 専門知識不要・リアルタイム API。SageMaker：カスタムモデル・高い柔軟性・ML 専門知識必要。ルールベース：固定パターン・パーソナライズ不可。",
    rememberAxis:
      "パーソナライズされたレコメンド → Amazon Personalize。カスタム ML モデルの開発 → SageMaker。画像/動画分析 → Rekognition。テキスト分析 → Comprehend。",
  },

  // ── シナリオ: ガバナンス・コンプライアンス ──────────────────────────────

  {
    id: "governance-1",
    category: "Governance & Compliance",
    modeLabel: "シナリオ",
    prompt:
      "ある大企業が 50 個の AWS アカウントを管理しており、全アカウントに統一のセキュリティポリシー（特定リージョンのみ使用可・特定サービスの禁止）を適用したい。また、財務部門が全アカウントの請求を一括管理したい。最適な構成はどれか。",
    context:
      "各アカウントは異なるチームが管理しています。ポリシー違反のリソース作成をシステムレベルで阻止したい。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "各アカウントに同じ IAM ポリシーを手動で設定する", hint: "50 アカウントの手動管理は漏れが発生しやすく、スケールしない" },
      { id: "b", label: "C", text: "AWS Config ルールを全アカウントに展開して違反を検知する", hint: "Config は違反を検知できるが阻止はできない。阻止には SCP が必要" },
      { id: "c", label: "C", text: "AWS Organizations で SCP（サービスコントロールポリシー）を適用し、統合請求も有効化する", hint: "SCP は Organizations 配下の全アカウントでリソース作成を事前に阻止できる。統合請求も Organizations の機能" },
      { id: "d", label: "D", text: "各アカウントに CloudTrail を設定して不正操作を監査する", hint: "CloudTrail は監査ログの記録で、リソース作成の事前阻止はできない" },
    ],
    explanation:
      "AWS Organizations は複数の AWS アカウントをグループ（OU: Organizational Unit）に整理し、一元管理するサービスです。SCP（サービスコントロールポリシー）を OU またはアカウントに適用すると、その配下のアカウントで実行可能な API 操作を制限できます（IAM のアクセス許可の上限を設定）。たとえば「us-east-1 以外でのリソース作成を拒否」「EC2 Spot インスタンスの起動を禁止」などを宣言的に定義できます。統合請求（Consolidated Billing）により全アカウントの請求を一括管理でき、使用量の合算により AWS の Volume Discount も受けられます。",
    comparePoint:
      "SCP：アカウントレベルでの API 操作制限（事前阻止）・Organizations 必須。IAM ポリシー：アイデンティティ/リソースレベルの制御。AWS Config：設定変更の検知・コンプライアンス評価（事後検知）。",
    rememberAxis:
      "全アカウントへのポリシー強制・事前阻止 → Organizations + SCP。不正操作の事後検知 → CloudTrail + Config。全アカウントの請求一括管理 → Organizations 統合請求。",
  },
  {
    id: "governance-2",
    category: "Governance & Compliance",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が PCI DSS 準拠のため、AWS 環境内のすべての EC2 インスタンスが「パブリック IP なし」「特定のセキュリティグループを使用」などの設定要件を継続的に満たしているか監視したい。要件違反のリソースが検出されたら自動修復もしたい。最適なサービスはどれか。",
    context:
      "手動での設定確認は週 1 回実施しているが、その間に設定変更が起きても気づけない。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "CloudTrail ですべての API 操作を記録して手動で確認する", hint: "CloudTrail は操作の記録であり、継続的な設定評価や自動修復はできない" },
      { id: "b", label: "B", text: "AWS Config のマネージドルールで設定を継続評価し、自動修復アクションを設定する", hint: "Config はリソース設定を継続的に評価し、非準拠時に Systems Manager Automation で自動修復できる" },
      { id: "c", label: "C", text: "Lambda を定期実行して EC2 の設定を確認するスクリプトを書く", hint: "可能だが Lambda の維持・管理が必要。Config のマネージドルールの方がシンプルで確実" },
      { id: "d", label: "D", text: "GuardDuty で EC2 の設定違反を検知する", hint: "GuardDuty は脅威検出（不審なアクセス・マルウェア等）サービスで設定コンプライアンスの評価はしない" },
    ],
    explanation:
      "AWS Config はリソースの設定変更を継続的に記録・評価するサービスです。マネージドルール（例：ec2-instance-no-public-ip・restricted-ssh）を有効化すると、設定変更があるたびに自動的に評価し、非準拠リソースをコンソールに表示します。Systems Manager Automation ドキュメントと連携した「修復アクション」を設定すると、非準拠を検出した際に自動でセキュリティグループを変更・パブリック IP を無効化するなどの修復が実行されます。Config Aggregator を使うと複数アカウント・リージョンの結果を一元管理できます。",
    comparePoint:
      "AWS Config：設定の継続評価・コンプライアンス・自動修復。CloudTrail：API 操作の記録・監査証跡。GuardDuty：脅威検出・不審な動作。Security Hub：複数サービスの検出結果の統合。",
    rememberAxis:
      "設定の継続監視・コンプライアンス評価 → AWS Config。API 操作の監査ログ → CloudTrail。脅威・攻撃の検出 → GuardDuty。設定違反の自動修復 → Config + Systems Manager Automation。",
  },
  {
    id: "governance-3",
    category: "Governance & Compliance",
    modeLabel: "シナリオ",
    prompt:
      "ある金融企業が規制要件として「AWS 上のすべての API 操作を 7 年間保存し、改ざんを防止する必要がある」と定められている。また、特定の IAM ユーザーが本番環境のリソースを削除した場合は 10 分以内にセキュリティチームへ通知したい。最適な構成はどれか。",
    context:
      "現在 CloudTrail は有効だが、ログの保存場所・保存期間・改ざん防止・アラートが設定されていない。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "CloudTrail のログを S3 に送りログファイル整合性検証を有効化し、EventBridge で削除 API イベントを検知して SNS 通知する", hint: "CloudTrail のログファイル整合性検証で改ざんを検知でき、S3 のライフサイクルで 7 年保存、EventBridge で削除 API をリアルタイム検知できる" },
      { id: "b", label: "B", text: "CloudWatch Logs に CloudTrail ログを送り、ログを 7 年間保持する", hint: "CloudWatch Logs は高価なため 7 年保存はコストが高い。S3 の方が低コスト。また改ざん防止の仕組みもない" },
      { id: "c", label: "C", text: "AWS Config でリソースの設定変更を記録する", hint: "Config は設定変更の記録・評価が目的で、API 操作の完全な監査ログは CloudTrail が担う" },
      { id: "d", label: "D", text: "VPC フローログを 7 年間保存して API 操作を記録する", hint: "VPC フローログはネットワーク通信の記録で API 操作の詳細（誰が何をしたか）は含まない" },
    ],
    explanation:
      "AWS CloudTrail はすべての AWS API 操作を記録するサービスです。証跡（Trail）を作成して S3 バケットへのログ配信を設定し、S3 ライフサイクルポリシーで 7 年後に Glacier Deep Archive へ移行（低コストで長期保存）します。ログファイル整合性検証（Log File Validation）を有効化すると SHA-256 ダイジェストが生成され、ログの改ざん有無を検証できます。EventBridge の CloudTrail イベントルールを使い、特定 IAM ユーザーの DeleteBucket・TerminateInstances などのイベントをフィルタリングして SNS → メール通知を実現できます。",
    comparePoint:
      "CloudTrail：API 操作の監査ログ・誰が何をしたか・改ざん防止（ログ整合性検証）。Config：リソース設定の変更記録・コンプライアンス評価。VPC フローログ：ネットワーク通信の記録。",
    rememberAxis:
      "AWS API 操作の監査ログ・改ざん防止 → CloudTrail + S3（ログファイル整合性検証）。リアルタイム API イベント通知 → CloudTrail + EventBridge + SNS。設定変更のコンプライアンス → AWS Config。",
  },
  {
    id: "governance-4",
    category: "Governance & Compliance",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が複数の AWS アカウント（20 個）のセキュリティ状態を一元管理したい。GuardDuty・Inspector・Macie・Config のアラートを 1 つの画面で確認し、ISO 27001・PCI DSS への準拠状況もスコア化して把握したい。最適なサービスはどれか。",
    context:
      "各サービスのコンソールを個別に確認するのが煩雑で、全体の優先度がわかりにくい。",
    correctChoiceId: "d",
    choices: [
      { id: "a", label: "A", text: "Amazon GuardDuty の Organizations 統合で全アカウントを管理する", hint: "GuardDuty の統合は可能だが、他のセキュリティサービスの検出結果の統合や準拠スコアの計算はできない" },
      { id: "b", label: "B", text: "AWS Config Aggregator で全アカウントの設定を集約する", hint: "Config Aggregator は設定コンプライアンスの集約に有効だが、GuardDuty・Inspector などのアラート統合はない" },
      { id: "c", label: "C", text: "CloudWatch Dashboard に各サービスのメトリクスを集約して表示する", hint: "CloudWatch は監視・アラーム向けで、セキュリティ検出結果の統合・準拠スコア計算はできない" },
      { id: "d", label: "D", text: "AWS Security Hub で全アカウントのセキュリティ検出結果を集約し、コンプライアンス標準を評価する", hint: "Security Hub は GuardDuty・Inspector・Macie・Config の検出結果を統合し、CIS・PCI DSS・ISO 準拠スコアを計算する" },
    ],
    explanation:
      "AWS Security Hub は複数の AWS セキュリティサービス（GuardDuty・Amazon Inspector・Amazon Macie・AWS Config・AWS Firewall Manager 等）の検出結果を一元集約するサービスです。AWS Organizations と統合することで 20 アカウントの検出結果を管理アカウントのダッシュボードに集約できます。CIS AWS Foundations Benchmark・PCI DSS・AWS 基礎セキュリティベストプラクティス・ISO 27001 など複数のコンプライアンス標準に基づいて自動的にスコア計算し、改善が必要な箇所を優先度付きで表示します。",
    comparePoint:
      "Security Hub：複数サービスの検出結果統合・コンプライアンス標準評価・Organizations 対応。GuardDuty：脅威検出専門（Security Hub に検出結果を送信）。Config：設定コンプライアンス（Security Hub に結果を送信）。",
    rememberAxis:
      "複数セキュリティサービスの統合・準拠スコア → Security Hub。脅威検出 → GuardDuty（→ Security Hub へ連携）。設定コンプライアンス → Config（→ Security Hub へ連携）。機密データ検出 → Macie（→ Security Hub へ連携）。",
  },
  {
    id: "governance-5",
    category: "Governance & Compliance",
    modeLabel: "シナリオ",
    prompt:
      "ある大企業が新しい AWS 環境を複数のビジネスユニット向けに素早くセットアップしたい。各アカウントに対して、セキュリティの基準（CloudTrail 有効化・Config 有効化・ガードレール）を自動的に適用し、アカウント作成から運用までを標準化したい。最適なサービスはどれか。",
    context:
      "現在は各チームが個別に AWS アカウントを設定しており、設定のばらつきが発生している。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "AWS Organizations の SCP だけで全設定を強制する", hint: "SCP は API 操作の制限が可能だが、CloudTrail 有効化などの設定の自動適用はできない" },
      { id: "b", label: "B", text: "AWS Control Tower を使って Landing Zone を構築し、ガードレールで標準設定を自動適用する", hint: "Control Tower は Organizations・SSO・Config・CloudTrail などを統合したアカウント管理の自動化サービス" },
      { id: "c", label: "C", text: "CloudFormation StackSets で各アカウントに設定を展開する", hint: "StackSets は有効な手段だが、Control Tower はより包括的なランディングゾーン管理を提供する" },
      { id: "d", label: "D", text: "AWS Service Catalog で承認済みリソースのカタログを作成する", hint: "Service Catalog は承認済みのリソース（EC2・DB 等）をセルフサービスで展開する仕組みで、アカウント管理の標準化には Control Tower が適切" },
    ],
    explanation:
      "AWS Control Tower はマルチアカウント環境のセットアップと統制を自動化するサービスです。「Landing Zone」と呼ばれるベストプラクティスに基づいたマルチアカウント環境を数時間でセットアップし、AWS Organizations・IAM Identity Center（SSO）・AWS Config・CloudTrail・VPC などを自動設定します。「ガードレール（Guardrail）」は SCP や Config ルールとして実装された事前定義のポリシーで、「必須ガードレール」（有効化が強制）と「選択的ガードレール」（任意で有効化）があります。Account Factory でテンプレートに基づいた新しい AWS アカウントを自動作成・設定できます。",
    comparePoint:
      "Control Tower：Landing Zone・ガードレール・Account Factory・包括的なアカウント管理。Organizations + SCP：API 制限のみ・設定の自動適用なし。CloudFormation StackSets：テンプレートの一括展開・アカウント管理機能なし。",
    rememberAxis:
      "マルチアカウントの標準化・ガードレール → Control Tower。API 操作の制限 → Organizations SCP。設定の一括展開 → CloudFormation StackSets。",
  },

  // ── シナリオ: 災害復旧 ───────────────────────────────────────────────────

  {
    id: "dr-1",
    category: "Disaster Recovery",
    modeLabel: "シナリオ",
    prompt:
      "ある中小企業が AWS で Web アプリを運用している。RTO（目標復旧時間）は 24 時間以内、RPO（目標復旧時点）は 24 時間以内で構わない。DR コストを最小限に抑えたい。最も適切な DR 戦略はどれか。",
    context:
      "本番は EC2 + RDS 構成。DR リージョンは不要で、同一リージョン内での復旧を想定。コストが最重要。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "EC2 の AMI と RDS スナップショットを毎日取得し、障害時にリストアする", hint: "バックアップ&リストアは最もコストが低い DR 戦略。RTO 24 時間・RPO 24 時間であれば十分対応できる" },
      { id: "b", label: "B", text: "別 AZ にパイロットライト構成（DB レプリカのみ）を常時起動する", hint: "パイロットライトはコストが低いが、同一リージョン内の DR としてはバックアップ&リストアより高コスト" },
      { id: "c", label: "C", text: "別リージョンにウォームスタンバイを構築する", hint: "ウォームスタンバイは RTO 数分だが、コストが高く RTO 24 時間の要件には過剰" },
      { id: "d", label: "D", text: "マルチサイトアクティブ/アクティブ構成を組む", hint: "最も高コストな DR 戦略で、RTO 24 時間の要件に対して大幅に過剰" },
    ],
    explanation:
      "バックアップ&リストア戦略は、EC2 の AMI スナップショット・RDS の自動バックアップ（またはスナップショット）を定期取得し、障害時にそこからリストアする最も低コストな DR 戦略です。RTO は数時間〜24 時間程度（インスタンス起動・データのリストア時間）で、RPO はバックアップ頻度（毎日なら最大 24 時間）に依存します。AWS Backup サービスを使うと複数リソースのバックアップ計画を一元管理でき、バックアップの自動化・クロスリージョンコピー・保持期間管理が容易になります。",
    comparePoint:
      "バックアップ&リストア：最低コスト・RTO 時間単位・RPO バックアップ頻度依存。パイロットライト：低コスト・RTO 数十分。ウォームスタンバイ：中コスト・RTO 数分。マルチサイト：最高コスト・RTO ほぼゼロ。",
    rememberAxis:
      "コスト最小・RTO/RPO 時間単位 → バックアップ&リストア（AMI + RDS スナップショット）。低コストで RTO 数十分 → パイロットライト。RTO 数分・中コスト → ウォームスタンバイ。RTO ほぼゼロ → マルチサイト Active-Active。",
  },
  {
    id: "dr-2",
    category: "Disaster Recovery",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が us-east-1 をプライマリとして運用しており、DR リージョン（ap-northeast-1）を用意したい。コストを抑えつつ RTO 30 分・RPO 1 時間を実現したい。DR リージョンでは最小限のリソースだけを常時稼働させる。この要件に最も適切な DR 戦略はどれか。",
    context:
      "DB は RDS MySQL。アプリは EC2 + ALB で動作。DR リージョンではトラフィックを受けない（平時）。",
    correctChoiceId: "c",
    choices: [
      { id: "a", label: "A", text: "バックアップ&リストア：DR リージョンへスナップショットをコピーし、障害時にフルでリストアする", hint: "スナップショットからのフルリストアは RTO 30 分を満たせない可能性が高い" },
      { id: "b", label: "B", text: "ウォームスタンバイ：DR リージョンで縮小版のシステムを常時稼働させる", hint: "ウォームスタンバイは RTO 数分で達成できるが、常時稼働のコストがかかりコスト最適化の要件に対して過剰" },
      { id: "c", label: "C", text: "パイロットライト：DR リージョンで RDS リードレプリカのみ起動し、障害時に EC2 を素早く起動する", hint: "DB レプリカのみ稼働させ、障害時に EC2 を AMI から起動することで RTO 30 分・RPO 1 時間を低コストで達成できる" },
      { id: "d", label: "D", text: "マルチサイト Active-Active：両リージョンで常時トラフィックを受ける", hint: "Active-Active は RTO ほぼゼロだが、コストが 2 倍になり要件の「コストを抑える」に反する" },
    ],
    explanation:
      "パイロットライト（Pilot Light）戦略はデータベースのレプリカなどコア（核心）コンポーネントのみを DR リージョンで稼働させ、障害時にアプリケーション層（EC2 等）を素早く起動する戦略です。RDS クロスリージョンリードレプリカを作成すると、プライマリの変更がリアルタイムに同期されます（RPO 数分〜1 時間）。障害時はリードレプリカをライトに昇格し、EC2 を事前に用意した AMI から Auto Scaling で起動し、ALB のターゲットに登録します。EC2 を常時起動しないため、ウォームスタンバイより大幅に低コストで RTO 30 分を達成できます。",
    comparePoint:
      "パイロットライト：DB レプリカのみ常時稼働・障害時に EC2 起動・RTO 数十分・低コスト。ウォームスタンバイ：縮小版フルスタック常時稼働・RTO 数分・中コスト。バックアップ&リストア：スナップショットのみ・RTO 時間単位・最低コスト。",
    rememberAxis:
      "DR コスト最小で RTO 数時間 → バックアップ&リストア。低コストで RTO 30 分〜1 時間 → パイロットライト。中コストで RTO 数分 → ウォームスタンバイ。コスト不問で RTO 最小 → Active-Active。",
  },
  {
    id: "dr-3",
    category: "Disaster Recovery",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が us-east-1 をプライマリとして EC2 + RDS 環境を運用している。DR 要件は RTO 10 分以内・RPO 15 分以内。DR リージョンでは縮小版のシステムを常時稼働させておく予定。リージョン障害時にすぐにトラフィックを切り替えられる構成はどれか。",
    context:
      "DR リージョン（us-west-2）でも ALB・EC2（最小台数）・RDS を常時稼働させて準備する。",
    correctChoiceId: "b",
    choices: [
      { id: "a", label: "A", text: "パイロットライト：DB レプリカのみ稼働させ、障害時に EC2 を起動する", hint: "EC2 の起動には 5〜10 分かかり、RTO 10 分の達成が難しい場合がある" },
      { id: "b", label: "B", text: "ウォームスタンバイ：縮小版フルスタックを常時稼働させ、Route 53 フェイルオーバーで切り替える", hint: "縮小版スタックが稼働済みのため、Route 53 の DNS 切替だけで RTO 10 分以内に対応できる" },
      { id: "c", label: "C", text: "バックアップ&リストア：スナップショットから DR リージョンでリストアする", hint: "フルリストアは RTO 数時間かかり 10 分以内を達成できない" },
      { id: "d", label: "D", text: "DR リージョンに同規模のフルスタックを常時稼働させる（Active-Active）", hint: "Active-Active は RTO ほぼゼロだが、コストが 2 倍になる" },
    ],
    explanation:
      "ウォームスタンバイ（Warm Standby）戦略は DR リージョンで縮小版（最小スペック・最小台数）のフルスタックシステムを常時稼働させておく戦略です。プライマリが障害になったとき、Route 53 のフェイルオーバールーティングで DNS を DR リージョンの ALB に切り替えれば、EC2 の起動待ちなしにトラフィックを受けられます。その後、Auto Scaling でインスタンスを本番規模にスケールアップします。RDS はクロスリージョンリードレプリカをライターに昇格させます。RTO 10 分・RPO 15 分の要件をパイロットライトより確実に達成できます。",
    comparePoint:
      "ウォームスタンバイ：縮小版常時稼働・スケールアップで本番対応・RTO 数分・中コスト。パイロットライト：DB のみ常時稼働・EC2 起動が必要・RTO 数十分・低コスト。Active-Active：フルスタック常時稼働・RTO ほぼゼロ・最高コスト。",
    rememberAxis:
      "RTO 数分・縮小版常時稼働 → ウォームスタンバイ。RTO 数十分・DB のみ常時稼働 → パイロットライト。RTO ほぼゼロ・コスト不問 → Active-Active。",
  },
  {
    id: "dr-4",
    category: "Disaster Recovery",
    modeLabel: "シナリオ",
    prompt:
      "ある金融機関が RPO ほぼゼロ・RTO 数分以内の DR を要求されている。システムは常に最高のパフォーマンスを維持し、リージョン障害時もユーザーへの影響をほぼゼロにしたい。コストは二次的な考慮事項。最適な DR 戦略はどれか。",
    context:
      "us-east-1 と eu-west-1 の 2 リージョンで稼働させる予定。データは常に両リージョンに存在する必要がある。",
    correctChoiceId: "d",
    choices: [
      { id: "a", label: "A", text: "ウォームスタンバイ + RDS クロスリージョンレプリカ", hint: "縮小版スタックの稼働・スケールアップが必要で RTO 数分以内の保証が難しい場合がある" },
      { id: "b", label: "B", text: "パイロットライト + Aurora Global Database", hint: "EC2 の起動が必要で RTO 数分の保証が難しい。また RPO ほぼゼロにするにはデータ同期が必要" },
      { id: "c", label: "C", text: "バックアップ&リストア + S3 クロスリージョンレプリケーション", hint: "RPO ほぼゼロ・RTO 数分を達成できない最低コスト戦略" },
      { id: "d", label: "D", text: "マルチサイト Active-Active：両リージョンで常時フルトラフィックを受け、DynamoDB Global Tables でデータを同期する", hint: "両リージョンが常時稼働しているため RTO ほぼゼロ・RPO ほぼゼロを実現できる" },
    ],
    explanation:
      "マルチサイト Active-Active 戦略は両リージョン（またはマルチリージョン）で完全なフルスタックを常時稼働させ、実際のトラフィックを両方で処理する戦略です。Route 53 のレイテンシーベースルーティングで両リージョンに均等または最適な比率でトラフィックを振り分けます。DynamoDB Global Tables はマルチリージョンのマルチマスター書き込みをサポートし、どちらのリージョンで書き込んでも 1 秒以内に他のリージョンへ反映されます（RPO 約 1 秒）。リージョン障害時は Route 53 のヘルスチェックで自動的に正常なリージョンへ 100% のトラフィックを振り向けます（RTO 数秒〜数分）。",
    comparePoint:
      "Active-Active：両リージョン常時稼働・RTO 数秒・RPO ほぼゼロ・最高コスト・最高可用性。ウォームスタンバイ：片方が縮小版・RTO 数分・中コスト。パイロットライト：片方が DB のみ・RTO 数十分・低コスト。",
    rememberAxis:
      "RTO ほぼゼロ・RPO ほぼゼロ・コスト不問 → マルチサイト Active-Active。DynamoDB のマルチリージョン同期 → DynamoDB Global Tables。クロスリージョン Aurora → Aurora Global Database。",
  },
  {
    id: "dr-5",
    category: "Disaster Recovery",
    modeLabel: "シナリオ",
    prompt:
      "ある企業が以下の要件で DR 戦略を選択している。「医療記録システムで、患者データは最大 1 時間分の損失まで許容できる（RPO 1 時間）。障害から 4 時間以内にシステムを復旧させる必要がある（RTO 4 時間）。追加のインフラコストは月 $500 以内に抑えたい」。この要件を満たす最適な DR 戦略はどれか。",
    context:
      "本番はシングルリージョンで EC2 + RDS MySQL 構成。現在 DR はない。",
    correctChoiceId: "a",
    choices: [
      { id: "a", label: "A", text: "1 時間ごとの RDS 自動バックアップと EC2 AMI を取得し、障害時に別 AZ または DR リージョンへリストアする", hint: "RPO 1 時間（毎時バックアップ）・RTO 4 時間（リストア時間）をほぼ$0 の追加コストで達成できる" },
      { id: "b", label: "B", text: "パイロットライト構成で DR リージョンに RDS リードレプリカを常時起動する", hint: "RDS リードレプリカの費用（DB インスタンス料金）は月 $100〜300 程度かかるが、コスト内に収まる可能性がある" },
      { id: "c", label: "C", text: "ウォームスタンバイ構成で DR リージョンに縮小版スタックを常時稼働させる", hint: "EC2 + RDS の常時稼働は月 $500 を超える可能性が高く、コスト要件に反する場合がある" },
      { id: "d", label: "D", text: "マルチサイト Active-Active 構成を構築する", hint: "最高コスト戦略で月 $500 の制約を大幅に超える" },
    ],
    explanation:
      "RPO・RTO の要件とコスト制約からバックアップ&リストアが最適です。RPO 1 時間は RDS の自動バックアップ（15 分間隔）またはトランザクションログで達成でき、EC2 の AMI を定期取得することでアプリサーバーも復旧できます。RTO 4 時間は RDS のリストア（〜30 分）と EC2 AMI からの起動（〜10 分）で十分達成可能です。コストは S3 へのスナップショット保存費用（数十 GB = 数ドル/月）のみで、$500 以内に大きく収まります。AWS Backup で自動化・一元管理すれば運用コストも最小化できます。",
    comparePoint:
      "要件マッピング：RPO・RTO が長い＆コスト重視 → バックアップ&リストア。RPO 1 時間・RTO 30 分・低コスト → パイロットライト。RPO 数分・RTO 数分・中コスト → ウォームスタンバイ。RPO ほぼゼロ・RTO ほぼゼロ → Active-Active。",
    rememberAxis:
      "RPO・RTO の要件からコスト最小の DR 戦略を選ぶ：バックアップ&リストア < パイロットライト < ウォームスタンバイ < Active-Active（コスト順）。逆に RTO が短くなるほど常時稼働コストが増加する。",
  },
];
