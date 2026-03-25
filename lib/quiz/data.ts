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
];
