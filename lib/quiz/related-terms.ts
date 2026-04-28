/** Maps quiz question ID → array of study term IDs */
export const questionRelatedTerms: Record<string, string[]> = {
  "storage-1": ["efs", "ebs", "s3", "block-storage", "object-storage"],
  "storage-2": ["s3", "s3-intelligent-tiering"],
  "storage-3": ["ebs", "s3", "efs", "block-storage"],
  "storage-4": ["s3", "s3-glacier", "s3-intelligent-tiering"],
  "storage-5": ["fsx-windows", "efs"],
  "storage-6": ["s3", "vpc", "privatelink"],
  "storage-7": ["fsx-lustre", "efs"],
  "storage-8": ["s3-intelligent-tiering", "s3"],
  "storage-9": ["s3"],
  "storage-10": ["snowball-edge", "s3"],
  "storage-11": ["s3"],
  "compute-1": ["lambda", "serverless", "ec2"],
  "compute-2": ["reserved-instances", "spot-instance", "ec2"],
  "compute-3": ["auto-scaling-group", "auto-scaling", "load-balancer"],
  "compute-4": ["fargate", "ecs", "ec2"],
  "compute-5": ["ec2"],
  "compute-6": ["spot-instance", "reserved-instances", "ec2"],
  "compute-7": ["rds", "lambda"],
  "compute-8": ["eks", "ecs", "fargate"],
  "compute-9": ["alb", "auto-scaling-group", "load-balancer"],
  "compute-10": ["batch", "lambda"],
  "network-1": ["route-53", "alb", "load-balancer", "cloudfront"],
  "network-2": ["nat-gateway", "internet-gateway", "private-subnet", "vpc"],
  "network-3": ["alb", "nlb", "load-balancer"],
  "network-4": ["vpc-peering", "transit-gateway"],
  "network-5": ["direct-connect", "vpc"],
  "network-6": ["waf", "shield", "guardduty", "cloudfront"],
  "network-7": ["security-group", "vpc", "subnet"],
  "network-8": ["cloudfront", "cdn", "route-53"],
  "network-9": ["transit-gateway", "vpc-peering", "nat-gateway"],
  "network-10": ["route-53", "high-availability", "fault-tolerance"],
  "network-11": ["vpc", "privatelink", "s3"],
  "database-1": ["dynamodb", "rds", "aurora", "redshift"],

  // ── データベース（追加分） ───────────────────────────────────────────────
  "database-2": ["rds", "aurora", "multi-az"],
  "database-3": ["dynamodb", "dax"],
  "database-4": ["elasticache"],
  "database-5": ["aurora-serverless", "aurora"],
  "database-6": ["redshift", "athena"],

  // ── セキュリティ ─────────────────────────────────────────────────────────
  "security-1": ["iam-role", "s3"],
  "security-2": ["kms", "rds"],
  "security-3": ["security-group", "vpc"],
  "security-4": ["waf", "alb"],
  "security-5": ["secrets-manager"],
  "security-6": ["iam-policy"],
  "security-7": ["iam-role", "iam-policy"],
  "security-8": ["iam-policy", "iam-user"],
  "security-9": ["iam-policy", "mfa"],
  "security-10": ["iam-access-analyzer", "s3"],
  "security-11": ["scp"],
  "security-12": ["iam-role", "lambda"],
  "security-13": ["iam-identity-center"],
  "security-14": ["iam-policy"],
  "security-15": ["cognito"],
  "security-16": ["kms"],
  "security-17": ["kms", "iam-policy"],
  "security-18": ["cloudhsm", "kms"],
  "security-19": ["kms"],
  "security-20": ["kms", "s3"],
  "security-21": ["kms", "iam-policy"],
  "security-22": ["kms"],
  "security-23": ["security-group", "vpc"],
  "security-24": ["security-group", "vpc"],
  "security-25": ["security-group"],
  "security-26": ["vpc-flow-logs", "cloudwatch-logs"],
  "security-27": ["security-group", "vpc"],
  "security-28": ["nat-gateway", "security-group"],
  "security-29": ["guardduty", "cloudtrail", "vpc-flow-logs"],
  "security-30": ["shield", "waf"],
  "security-31": ["inspector", "ecr"],
  "security-32": ["macie", "s3"],
  "security-33": ["waf"],
  "security-34": ["guardduty", "eventbridge", "security-group"],
  "security-35": ["firewall-manager", "waf", "shield"],
  "security-36": ["waf"],
  "security-37": ["cloudtrail"],
  "security-38": ["aws-config", "aws-config-rules", "s3"],
  "security-39": ["security-hub", "guardduty"],
  "security-40": ["cloudtrail"],
  "security-41": ["cloudtrail", "aws-config"],
  "security-42": ["aws-config", "aws-config-rules"],
  "security-43": ["cloudtrail"],
  "security-44": ["secrets-manager", "parameter-store"],
  "security-45": ["secrets-manager", "ecs"],
  "security-46": ["secrets-manager", "lambda"],
  "security-47": ["parameter-store", "ram"],
  "security-48": ["secrets-manager"],
  "security-49": ["secrets-manager", "parameter-store"],
  "security-50": ["s3"],
  "security-51": ["s3", "iam-policy"],
  "security-52": ["s3", "iam-role"],
  "security-53": ["s3", "iam-policy"],
  "security-54": ["s3-object-lock", "s3"],
  "security-55": ["vpc", "s3", "privatelink"],
  "security-56": ["cloudtrail", "s3"],

  // ── アプリ統合 ──────────────────────────────────────────────────────────
  "appintegration-1": ["sqs", "sqs-dlq"],
  "appintegration-2": ["eventbridge"],
  "appintegration-3": ["step-functions"],
  "appintegration-4": ["kinesis-data-streams"],
  "appintegration-5": ["api-gateway", "lambda"],

  // ── メッセージング ────────────────────────────────────────────────────────
  "messaging-1": ["sqs", "sqs-dlq"],
  "messaging-2": ["sns", "sns-fanout", "sqs"],
  "messaging-3": ["eventbridge", "eventbridge-pipes"],
  "messaging-4": ["step-functions", "lambda"],
  "messaging-5": ["appsync"],

  // ── コスト最適化 ─────────────────────────────────────────────────────────
  "cost-1": ["savings-plans", "ec2"],
  "cost-2": ["spot-instance", "ec2"],
  "cost-3": ["reserved-instances", "rds"],
  "cost-4": ["instance-scheduler", "ec2"],
  "cost-5": ["s3", "s3-intelligent-tiering"],
  "cost-6": ["s3-glacier", "s3"],
  "cost-7": ["s3-intelligent-tiering", "s3"],
  "cost-8": ["compute-optimizer", "ec2"],
  "cost-9": ["auto-scaling-group", "ec2"],
  "cost-10": ["lambda", "ec2"],
  "cost-11": ["fargate", "ecs", "spot-instance"],
  "cost-12": ["lambda"],
  "cost-13": ["placement-group", "ec2"],
  "cost-14": ["vpc", "s3"],
  "cost-15": ["cloudfront", "s3"],
  "cost-16": ["ebs", "ebs-snapshot"],
  "cost-17": ["ebs", "ebs-snapshot"],
  "cost-18": ["budgets", "cloudwatch"],
  "cost-19": ["trusted-advisor"],
  "cost-20": ["cost-explorer"],
  "cost-21": ["savings-plans"],

  // ── 分析 ────────────────────────────────────────────────────────────────
  "analytics-1": ["kinesis-data-streams", "kinesis-firehose"],
  "analytics-2": ["glue", "redshift"],
  "analytics-3": ["athena", "s3"],
  "analytics-4": ["glue", "redshift", "athena"],
  "analytics-5": ["redshift", "quicksight"],

  // ── コンテナ ─────────────────────────────────────────────────────────────
  "containers-1": ["ecs", "fargate"],
  "containers-2": ["ecs", "fargate", "auto-scaling"],
  "containers-3": ["ecr", "ecs"],
  "containers-4": ["eks", "alb"],
  "containers-5": ["ecs", "fargate"],

  // ── IAM ─────────────────────────────────────────────────────────────────
  "iam-1": ["iam-role", "s3"],
  "iam-2": ["iam-policy", "mfa"],
  "iam-3": ["iam-role", "iam-policy"],
  "iam-4": ["iam-policy", "mfa"],
  "iam-5": ["secrets-manager", "rds"],

  // ── VPC ─────────────────────────────────────────────────────────────────
  "vpc-1": ["vpc", "public-subnet", "private-subnet"],
  "vpc-2": ["systems-manager-session-manager", "systems-manager"],
  "vpc-3": ["vpc-flow-logs", "cloudwatch-logs"],
  "vpc-4": ["privatelink", "vpc"],
  "vpc-5": ["waf", "alb"],

  // ── 移行 ────────────────────────────────────────────────────────────────
  "migration-1": ["dms", "aurora", "sct"],
  "migration-2": ["snowball-edge", "s3-glacier"],
  "migration-3": ["mgn", "ec2"],
  "migration-4": ["mgn", "dms"],
  "migration-5": ["datasync", "s3"],

  // ── 災害対策 ─────────────────────────────────────────────────────────────
  "dr-1": ["aws-backup", "rds"],
  "dr-2": ["aurora", "cloudfront", "route-53"],
  "dr-3": ["aurora", "ec2", "auto-scaling-group"],
  "dr-4": ["aurora-global-database", "aurora"],
  "dr-5": ["aurora", "aws-backup"],

  // ── シナリオ：高可用性 ───────────────────────────────────────────────────
  "scenario-ha-1": ["rds", "multi-az"],
  "scenario-ha-2": ["route-53", "cloudfront"],
  "scenario-ha-3": ["aurora-global-database", "aurora"],
  "scenario-ha-4": ["auto-scaling-group", "alb", "ec2"],
  "scenario-ha-5": ["s3", "s3-object-lock"],

  // ── シナリオ：コスト最適化 ───────────────────────────────────────────────
  "scenario-cost-1": ["spot-instance", "ec2"],
  "scenario-cost-2": ["s3-intelligent-tiering", "s3"],
  "scenario-cost-3": ["reserved-instances", "ec2"],
  "scenario-cost-4": ["savings-plans"],
  "scenario-cost-5": ["compute-optimizer", "ec2", "auto-scaling-group"],

  // ── シナリオ：セキュリティ ───────────────────────────────────────────────
  "scenario-sec-1": ["iam-role", "s3"],
  "scenario-sec-2": ["kms", "s3"],
  "scenario-sec-3": ["vpc", "s3", "privatelink"],
  "scenario-sec-4": ["secrets-manager", "rds"],
  "scenario-sec-5": ["guardduty", "cloudtrail"],

  // ── シナリオ：サーバーレス ───────────────────────────────────────────────
  "scenario-sls-1": ["lambda", "api-gateway"],
  "scenario-sls-2": ["sqs", "lambda"],
  "scenario-sls-3": ["lambda", "sns", "eventbridge"],
  "scenario-sls-4": ["step-functions", "lambda"],
  "scenario-sls-5": ["dynamodb", "elasticache"],

  // ── シナリオ：データベース ───────────────────────────────────────────────
  "scenario-db-1": ["aurora", "dms"],
  "scenario-db-2": ["elasticache", "rds"],
  "scenario-db-3": ["rds", "aurora"],
  "scenario-db-4": ["dms", "rds"],
  "scenario-db-5": ["redshift", "athena"],

  // ── シナリオ：ストレージ ─────────────────────────────────────────────────
  "scenario-storage-1": ["s3-intelligent-tiering", "s3"],
  "scenario-storage-2": ["efs", "s3"],
  "scenario-storage-3": ["ebs"],
  "scenario-storage-4": ["fsx-windows", "efs"],
  "scenario-storage-5": ["snowball-edge", "s3"],

  // ── シナリオ：ネットワーク ───────────────────────────────────────────────
  "scenario-net-1": ["nat-gateway", "vpc"],
  "scenario-net-2": ["direct-connect"],
  "scenario-net-3": ["transit-gateway", "vpc-peering"],
  "scenario-net-4": ["cloudfront", "global-accelerator"],
  "scenario-net-5": ["vpc", "s3", "privatelink"],

  // ── シナリオ：コンピュート ───────────────────────────────────────────────
  "scenario-compute-1": ["auto-scaling-group", "alb", "lambda"],
  "scenario-compute-2": ["spot-instance", "ec2"],
  "scenario-compute-3": ["ecs", "fargate"],
  "scenario-compute-4": ["fargate", "lambda"],
  "scenario-compute-5": ["ec2", "ami"],

  // ── シナリオ：AI・アプリ統合 ─────────────────────────────────────────────
  "scenario-ai-1": ["sns", "sns-fanout", "sqs"],
  "scenario-ai-2": ["step-functions", "lambda"],
  "scenario-ai-3": ["eventbridge", "lambda"],
  "scenario-ai-4": ["eventbridge", "eventbridge-pipes"],
  "scenario-ai-5": ["amazon-mq"],

  // ── シナリオ：監視 ───────────────────────────────────────────────────────
  "scenario-mon-1": ["cloudwatch", "cloudwatch-logs"],
  "scenario-mon-2": ["aws-config", "cloudtrail"],
  "scenario-mon-3": ["xray", "cloudwatch"],
  "scenario-mon-4": ["s3", "athena"],
  "scenario-mon-5": ["security-hub", "guardduty"],

  // ── Well-Architected ─────────────────────────────────────────────────────
  "well-arch-1": ["systems-manager", "cloudwatch"],
  "well-arch-2": ["waf", "shield"],
  "well-arch-3": ["auto-scaling-group", "multi-az"],
  "well-arch-4": ["elasticache", "rds"],
  "well-arch-5": ["reserved-instances", "savings-plans"],

  // ── 機械学習 ─────────────────────────────────────────────────────────────
  "ml-1": ["sagemaker"],
  "ml-2": ["rekognition"],
  "ml-3": ["comprehend"],
  "ml-4": ["transcribe", "translate", "polly"],
  "ml-5": ["sagemaker"],

  // ── ガバナンス ────────────────────────────────────────────────────────────
  "governance-1": ["scp", "control-tower"],
  "governance-2": ["aws-config-rules", "aws-config"],
  "governance-3": ["cloudtrail"],
  "governance-4": ["security-hub", "guardduty"],
  "governance-5": ["control-tower", "scp"],

  // ── エッジ・グローバル ───────────────────────────────────────────────────
  "edge-1": ["cloudfront", "s3"],
  "edge-2": ["global-accelerator", "nlb"],
  "edge-3": ["route-53", "alb"],
  "edge-4": ["cloudfront"],
  "edge-5": ["route-53", "global-accelerator"],

  // ── ハイブリッド ─────────────────────────────────────────────────────────
  "hybrid-1": ["direct-connect", "vpn-gateway"],
  "hybrid-2": ["iot-greengrass"],
  "hybrid-3": ["iam-identity-center"],
  "hybrid-4": ["route-53"],
  "hybrid-5": ["storage-gateway"],

  // ── S3 上級 ──────────────────────────────────────────────────────────────
  "s3-adv-1": ["macie", "s3"],
  "s3-adv-2": ["s3-object-lock", "s3"],
  "s3-adv-3": ["cloudfront", "s3"],
  "s3-adv-4": ["s3-replication", "s3"],
  "s3-adv-5": ["kms", "s3"],

  // ── コスト上級 ────────────────────────────────────────────────────────────
  "cost-adv-1": ["vpc", "s3"],
  "cost-adv-2": ["aurora-serverless", "rds"],
  "cost-adv-3": ["cost-explorer"],
  "cost-adv-4": ["redshift"],
  "cost-adv-5": ["compute-optimizer", "reserved-instances"],

  // ── Lambda 上級 ──────────────────────────────────────────────────────────
  "lambda-adv-1": ["lambda", "vpc"],
  "lambda-adv-2": ["lambda"],
  "lambda-adv-3": ["waf", "api-gateway"],
  "lambda-adv-4": ["lambda"],
  "lambda-adv-5": ["lambda", "dynamodb-streams"],

  // ── IaC ─────────────────────────────────────────────────────────────────
  "iac-2": ["rds"],
  "iac-4": ["inspector", "ecr"],
  "iac-5": ["s3-storage-lens", "s3"],

  // ── 監視・運用 ────────────────────────────────────────────────────────────
  "monitoring-1": ["cloudtrail"],

  // ── 特化カテゴリ ─────────────────────────────────────────────────────────
  "kinesis-1": ["kinesis-data-streams", "lambda"],
  "kinesis-2": ["kinesis-firehose", "redshift"],
  "stepfunctions-1": ["step-functions", "lambda"],
  "elasticache-1": ["elasticache", "rds"],
  "rds-1": ["rds", "multi-az"],
  "rds-2": ["rds", "aurora"],
  "rds-3": ["aurora-serverless", "aurora"],
  "ecs-1": ["ecs", "fargate", "auto-scaling"],
  "ecs-2": ["spot-instance", "ecs"],
  "route53-1": ["route-53", "cloudfront"],
  "route53-2": ["route-53", "alb"],
  "cloudfront-1": ["cloudfront", "s3"],
  "cloudfront-2": ["cloudfront", "s3"],
  "sqs-adv-1": ["sqs", "sqs-dlq"],
  "sqs-adv-2": ["sns", "sns-fanout", "sqs"],
  "ssm-1": ["systems-manager", "patch-manager"],
  "ssm-2": ["parameter-store", "systems-manager"],
  "backup-1": ["aws-backup", "rds"],
  "backup-2": ["aws-backup", "rds"],
};
