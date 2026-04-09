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
];
