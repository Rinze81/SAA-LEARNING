/** Maps quiz question ID → array of comparison item IDs */
export const questionRelatedComparisons: Record<string, string[]> = {
  // ── ストレージ ──────────────────────────────────────────────────────────
  "storage-1": ["s3-vs-ebs-vs-efs"],
  "storage-2": ["s3-tiers"],
  "storage-3": ["s3-vs-ebs-vs-efs", "ebs-volume-types"],
  "storage-4": ["s3-tiers"],
  "storage-5": ["s3-vs-ebs-vs-efs"],
  "storage-6": ["s3-vs-ebs-vs-efs", "vpc-peering-vs-transit-gateway-vs-privatelink"],
  "storage-7": ["s3-vs-ebs-vs-efs"],
  "storage-8": ["s3-tiers"],
  "storage-9": ["s3-vs-ebs-vs-efs"],
  "storage-10": ["snow-family"],
  "storage-11": ["s3-vs-ebs-vs-efs", "s3-tiers"],

  // ── データベース ─────────────────────────────────────────────────────────
  "database-1": ["rds-vs-dynamodb"],
  "database-2": ["aurora-vs-rds"],
  "database-3": ["rds-vs-dynamodb", "rds-proxy-vs-elasticache"],
  "database-4": ["rds-proxy-vs-elasticache"],
  "database-5": ["dynamodb-vs-elasticache"],
  "database-6": ["aurora-vs-rds", "aurora-serverless-vs-provisioned"],

  // ── コンピュート ─────────────────────────────────────────────────────────
  "compute-1": ["ec2-vs-lambda"],
  "compute-2": ["ri-vs-savings-plans-vs-spot"],
  "compute-3": ["ec2-vs-lambda"],
  "compute-4": ["ecs-vs-eks", "lambda-vs-fargate-vs-ec2"],
  "compute-5": ["ec2-vs-lambda"],
  "compute-6": ["ri-vs-savings-plans-vs-spot"],
  "compute-7": ["ec2-vs-lambda"],
  "compute-8": ["ecs-vs-eks", "ecs-ec2-vs-fargate-vs-eks"],
  "compute-9": ["alb-vs-nlb"],
  "compute-10": ["ec2-vs-lambda", "lambda-vs-fargate-vs-ec2"],

  // ── ネットワーク ─────────────────────────────────────────────────────────
  "network-1": ["alb-vs-nlb", "route53-routing-policies"],
  "network-2": ["nat-gateway-vs-nat-instance"],
  "network-3": ["alb-vs-nlb"],
  "network-4": ["vpc-peering-vs-transit-gateway-vs-privatelink"],
  "network-5": ["direct-connect-vs-vpn"],
  "network-6": ["shield-vs-waf-vs-firewall-manager"],
  "network-7": ["security-group-vs-nacl"],
  "network-8": ["s3-transfer-acceleration-vs-cloudfront-vs-global-accelerator"],
  "network-9": ["vpc-peering-vs-transit-gateway-vs-privatelink"],
  "network-10": ["route53-routing-policies"],
  "network-11": ["vpc-peering-vs-transit-gateway-vs-privatelink"],

  // ── セキュリティ ─────────────────────────────────────────────────────────
  "security-1": ["iam-user-vs-iam-role"],
  "security-3": ["security-group-vs-nacl"],
  "security-4": ["shield-vs-waf-vs-firewall-manager"],
  "security-5": ["secrets-manager-vs-parameter-store"],
  "security-6": ["iam-policy-types"],
  "security-7": ["iam-user-vs-iam-role", "iam-policy-types"],
  "security-8": ["iam-policy-types"],
  "security-9": ["iam-policy-types"],
  "security-10": ["iam-policy-types"],
  "security-12": ["iam-user-vs-iam-role"],
  "security-14": ["iam-policy-types"],
  "security-15": ["cognito-user-pool-vs-identity-pool"],
  "security-20": ["secrets-manager-vs-parameter-store"],
  "security-21": ["iam-policy-types"],
  "security-23": ["security-group-vs-nacl"],
  "security-24": ["security-group-vs-nacl"],
  "security-25": ["security-group-vs-nacl"],
  "security-26": ["security-group-vs-nacl"],
  "security-27": ["security-group-vs-nacl"],
  "security-28": ["security-group-vs-nacl", "nat-gateway-vs-nat-instance"],
  "security-30": ["shield-vs-waf-vs-firewall-manager"],
  "security-33": ["shield-vs-waf-vs-firewall-manager"],
  "security-34": ["shield-vs-waf-vs-firewall-manager"],
  "security-35": ["shield-vs-waf-vs-firewall-manager"],
  "security-36": ["shield-vs-waf-vs-firewall-manager"],
  "security-41": ["cloudwatch-vs-cloudtrail-vs-config"],
  "security-44": ["secrets-manager-vs-parameter-store"],
  "security-45": ["secrets-manager-vs-parameter-store"],
  "security-46": ["secrets-manager-vs-parameter-store"],
  "security-47": ["secrets-manager-vs-parameter-store"],
  "security-48": ["secrets-manager-vs-parameter-store"],
  "security-49": ["secrets-manager-vs-parameter-store"],
  "security-55": ["vpc-peering-vs-transit-gateway-vs-privatelink"],
  "security-56": ["cloudwatch-vs-cloudtrail"],

  // ── アプリ統合 ──────────────────────────────────────────────────────────
  "appintegration-1": ["sqs-vs-sns", "step-functions-vs-sqs-vs-eventbridge"],
  "appintegration-2": ["sqs-standard-vs-fifo"],
  "appintegration-3": ["sqs-vs-kinesis-streams"],
  "appintegration-4": ["step-functions-vs-sqs-vs-eventbridge"],
  "appintegration-5": ["sqs-vs-sns", "sqs-vs-kinesis-streams"],

  // ── コスト最適化 ─────────────────────────────────────────────────────────
  "cost-1": ["ri-vs-savings-plans-vs-spot"],
  "cost-2": ["ri-vs-savings-plans-vs-spot"],
  "cost-3": ["ri-vs-savings-plans-vs-spot"],
  "cost-4": ["ri-vs-savings-plans-vs-spot"],
  "cost-5": ["s3-tiers"],
  "cost-6": ["s3-tiers"],
  "cost-7": ["s3-tiers"],
  "cost-8": ["ri-vs-savings-plans-vs-spot"],
  "cost-9": ["ec2-vs-lambda"],
  "cost-10": ["ec2-vs-lambda"],
  "cost-11": ["ri-vs-savings-plans-vs-spot"],
  "cost-12": ["s3-tiers"],
  "cost-13": ["ec2-vs-lambda"],
  "cost-14": ["ri-vs-savings-plans-vs-spot"],
  "cost-15": ["s3-tiers"],
  "cost-16": ["ri-vs-savings-plans-vs-spot"],
  "cost-17": ["ec2-vs-lambda"],
  "cost-18": ["s3-tiers"],
  "cost-19": ["ri-vs-savings-plans-vs-spot"],
  "cost-20": ["ebs-volume-types"],
  "cost-21": ["ri-vs-savings-plans-vs-spot"],

  // ── 分析 ────────────────────────────────────────────────────────────────
  "analytics-1": ["kinesis-streams-vs-firehose"],
  "analytics-2": ["redshift-vs-athena-vs-emr"],
  "analytics-3": ["redshift-vs-athena-vs-emr"],
  "analytics-4": ["kinesis-streams-vs-firehose", "sqs-vs-kinesis-streams"],
  "analytics-5": ["redshift-vs-athena-vs-emr", "glue-vs-data-pipeline-vs-emr"],

  // ── メッセージング ────────────────────────────────────────────────────────
  "messaging-1": ["sqs-vs-sns"],
  "messaging-2": ["sqs-vs-sns", "sqs-vs-kinesis-streams"],
  "messaging-3": ["sqs-standard-vs-fifo"],
  "messaging-4": ["kinesis-streams-vs-firehose"],
  "messaging-5": ["step-functions-vs-sqs-vs-eventbridge"],

  // ── コンテナ ─────────────────────────────────────────────────────────────
  "containers-1": ["ecs-vs-eks", "ecs-ec2-vs-fargate-vs-eks"],
  "containers-2": ["ecs-vs-eks"],
  "containers-3": ["ecs-ec2-vs-fargate-vs-eks"],
  "containers-4": ["ecs-vs-eks", "ecs-ec2-vs-fargate-vs-eks"],
  "containers-5": ["ecs-ec2-vs-fargate-vs-eks"],

  // ── IAM ─────────────────────────────────────────────────────────────────
  "iam-1": ["iam-user-vs-iam-role"],
  "iam-2": ["iam-policy-types"],
  "iam-3": ["iam-policy-types"],
  "iam-4": ["iam-user-vs-iam-role", "iam-policy-types"],
  "iam-5": ["iam-policy-types"],

  // ── VPC ─────────────────────────────────────────────────────────────────
  "vpc-1": ["security-group-vs-nacl"],
  "vpc-2": ["nat-gateway-vs-nat-instance"],
  "vpc-3": ["vpc-peering-vs-transit-gateway-vs-privatelink"],
  "vpc-4": ["vpc-peering-vs-transit-gateway-vs-privatelink"],
  "vpc-5": ["direct-connect-vs-vpn"],

  // ── シナリオ：高可用性 ───────────────────────────────────────────────────
  "scenario-ha-1": ["aurora-vs-rds"],
  "scenario-ha-2": ["alb-vs-nlb"],
  "scenario-ha-3": ["ec2-vs-lambda"],
  "scenario-ha-4": ["aurora-vs-rds", "aurora-serverless-vs-provisioned"],
  "scenario-ha-5": ["alb-vs-nlb", "route53-routing-policies"],

  // ── シナリオ：コスト最適化 ───────────────────────────────────────────────
  "scenario-cost-1": ["ri-vs-savings-plans-vs-spot"],
  "scenario-cost-2": ["ri-vs-savings-plans-vs-spot", "s3-tiers"],
  "scenario-cost-3": ["ec2-vs-lambda"],
  "scenario-cost-4": ["ri-vs-savings-plans-vs-spot"],
  "scenario-cost-5": ["s3-tiers"],

  // ── シナリオ：セキュリティ ───────────────────────────────────────────────
  "scenario-sec-1": ["iam-policy-types", "security-group-vs-nacl"],
  "scenario-sec-2": ["shield-vs-waf-vs-firewall-manager"],
  "scenario-sec-3": ["secrets-manager-vs-parameter-store"],
  "scenario-sec-4": ["iam-policy-types"],
  "scenario-sec-5": ["cognito-user-pool-vs-identity-pool"],

  // ── シナリオ：サーバーレス ───────────────────────────────────────────────
  "scenario-sls-1": ["ec2-vs-lambda", "lambda-vs-fargate-vs-ec2"],
  "scenario-sls-2": ["ec2-vs-lambda"],
  "scenario-sls-3": ["api-gateway-types"],
  "scenario-sls-4": ["ec2-vs-lambda", "step-functions-vs-sqs-vs-eventbridge"],
  "scenario-sls-5": ["lambda-vs-fargate-vs-ec2"],

  // ── シナリオ：データベース ───────────────────────────────────────────────
  "scenario-db-1": ["aurora-vs-rds"],
  "scenario-db-2": ["rds-vs-dynamodb"],
  "scenario-db-3": ["aurora-vs-rds", "aurora-serverless-vs-provisioned"],
  "scenario-db-4": ["rds-proxy-vs-elasticache"],
  "scenario-db-5": ["dynamodb-vs-elasticache"],

  // ── シナリオ：ストレージ ─────────────────────────────────────────────────
  "scenario-storage-1": ["s3-vs-ebs-vs-efs"],
  "scenario-storage-2": ["s3-tiers"],
  "scenario-storage-3": ["s3-vs-ebs-vs-efs"],
  "scenario-storage-4": ["ebs-volume-types"],
  "scenario-storage-5": ["s3-vs-ebs-vs-efs", "s3-tiers"],

  // ── シナリオ：ネットワーク ───────────────────────────────────────────────
  "scenario-net-1": ["vpc-peering-vs-transit-gateway-vs-privatelink"],
  "scenario-net-2": ["alb-vs-nlb"],
  "scenario-net-3": ["direct-connect-vs-vpn"],
  "scenario-net-4": ["nat-gateway-vs-nat-instance"],
  "scenario-net-5": ["vpc-peering-vs-transit-gateway-vs-privatelink"],

  // ── シナリオ：コンピュート ───────────────────────────────────────────────
  "scenario-compute-1": ["ec2-vs-lambda", "ecs-ec2-vs-fargate-vs-eks"],
  "scenario-compute-2": ["ec2-vs-lambda"],
  "scenario-compute-3": ["ecs-vs-eks", "ecs-ec2-vs-fargate-vs-eks"],
  "scenario-compute-4": ["lambda-vs-fargate-vs-ec2"],
  "scenario-compute-5": ["ec2-vs-lambda", "ri-vs-savings-plans-vs-spot"],

  // ── シナリオ：監視 ───────────────────────────────────────────────────────
  "scenario-mon-1": ["cloudwatch-vs-cloudtrail"],
  "scenario-mon-2": ["cloudwatch-vs-cloudtrail-vs-config"],
  "scenario-mon-3": ["cloudwatch-vs-cloudtrail"],
  "scenario-mon-4": ["cloudwatch-vs-cloudtrail-vs-config"],
  "scenario-mon-5": ["systems-manager-vs-opsworks"],

  // ── 災害対策 ─────────────────────────────────────────────────────────────
  "dr-1": ["aurora-vs-rds"],
  "dr-2": ["direct-connect-vs-vpn", "aurora-vs-rds"],
  "dr-3": ["ec2-vs-lambda"],
  "dr-4": ["aurora-vs-rds", "aurora-serverless-vs-provisioned"],
  "dr-5": ["ri-vs-savings-plans-vs-spot"],

  // ── 移行 ────────────────────────────────────────────────────────────────
  "migration-1": ["snow-family"],
  "migration-2": ["snow-family", "s3-vs-ebs-vs-efs"],
  "migration-3": ["direct-connect-vs-vpn"],
  "migration-4": ["snow-family"],
  "migration-5": ["snow-family", "direct-connect-vs-vpn"],

  // ── 特化カテゴリ ─────────────────────────────────────────────────────────
  "kinesis-1": ["kinesis-streams-vs-firehose", "sqs-vs-kinesis-streams"],
  "kinesis-2": ["kinesis-streams-vs-firehose"],
  "stepfunctions-1": ["step-functions-vs-sqs-vs-eventbridge"],
  "elasticache-1": ["rds-proxy-vs-elasticache", "dynamodb-vs-elasticache"],
  "rds-1": ["aurora-vs-rds"],
  "rds-2": ["aurora-vs-rds", "rds-proxy-vs-elasticache"],
  "rds-3": ["aurora-serverless-vs-provisioned", "aurora-vs-rds"],
  "ecs-1": ["ecs-ec2-vs-fargate-vs-eks"],
  "ecs-2": ["ecs-vs-eks", "ecs-ec2-vs-fargate-vs-eks"],
  "route53-1": ["route53-routing-policies"],
  "route53-2": ["route53-routing-policies"],
  "cloudfront-1": ["cloudfront-vs-s3", "s3-transfer-acceleration-vs-cloudfront-vs-global-accelerator"],
  "cloudfront-2": ["cloudfront-vs-s3"],
  "sqs-adv-1": ["sqs-standard-vs-fifo", "sqs-vs-sns"],
  "sqs-adv-2": ["sqs-vs-kinesis-streams", "step-functions-vs-sqs-vs-eventbridge"],
};
