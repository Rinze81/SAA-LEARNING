export const termDiagrams: Record<string, string> = {

  // ── VPC ───────────────────────────────────────────────────────────────────
  vpc: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 318" fill="none" font-family="system-ui,sans-serif" width="100%">
  <defs>
    <marker id="vpc-a" markerWidth="10" markerHeight="8" refX="10" refY="4" orient="auto" markerUnits="userSpaceOnUse">
      <path d="M0 0 L10 4 L0 8Z" fill="#64748b"/>
    </marker>
  </defs>
  <!-- Internet -->
  <rect x="195" y="6" width="150" height="42" rx="9" stroke="#64748b" stroke-width="2" fill="#0f172a"/>
  <text x="270" y="32" text-anchor="middle" font-size="16" fill="#94a3b8">Internet</text>
  <!-- ↓ to IGW -->
  <line x1="270" y1="48" x2="270" y2="68" stroke="#64748b" stroke-width="2" marker-end="url(#vpc-a)"/>
  <!-- Internet Gateway (AWS blue) -->
  <rect x="174" y="70" width="192" height="44" rx="9" stroke="#0369a1" stroke-width="2.5" fill="#0c1a2e"/>
  <text x="270" y="97" text-anchor="middle" font-size="16" fill="#7dd3fc">Internet Gateway</text>
  <!-- Routing: IGW → L-shape → Public Subnet -->
  <line x1="270" y1="114" x2="270" y2="130" stroke="#64748b" stroke-width="2"/>
  <line x1="128" y1="130" x2="270" y2="130" stroke="#64748b" stroke-width="2"/>
  <line x1="128" y1="130" x2="128" y2="166" stroke="#64748b" stroke-width="2" marker-end="url(#vpc-a)"/>
  <text x="154" y="148" font-size="12" fill="#64748b">インバウンド通信</text>
  <!-- VPC dashed border -->
  <rect x="10" y="120" width="520" height="192" rx="12" stroke="#334155" stroke-width="2" stroke-dasharray="7 4"/>
  <text x="24" y="139" font-size="13" fill="#64748b">VPC</text>
  <!-- Public Subnet (brighter border) -->
  <rect x="20" y="138" width="232" height="164" rx="10" stroke="#64748b" stroke-width="2"/>
  <text x="36" y="158" font-size="13" fill="#e2e8f0">Public Subnet</text>
  <!-- EC2 / ALB box -->
  <rect x="38" y="168" width="196" height="46" rx="8" stroke="#475569" stroke-width="2" fill="#1e293b"/>
  <text x="136" y="195" text-anchor="middle" font-size="16" fill="#cbd5e1">EC2 / ALB</text>
  <!-- NAT Gateway box -->
  <rect x="38" y="232" width="196" height="46" rx="8" stroke="#475569" stroke-width="2" fill="#1e293b"/>
  <text x="136" y="259" text-anchor="middle" font-size="16" fill="#cbd5e1">NAT Gateway</text>
  <!-- → Private arrow with label -->
  <line x1="234" y1="191" x2="292" y2="191" stroke="#64748b" stroke-width="2" stroke-dasharray="5 3" marker-end="url(#vpc-a)"/>
  <text x="263" y="184" text-anchor="middle" font-size="12" fill="#64748b">通信許可</text>
  <!-- Private Subnet (brighter border) -->
  <rect x="294" y="138" width="226" height="164" rx="10" stroke="#64748b" stroke-width="2"/>
  <text x="310" y="158" font-size="13" fill="#e2e8f0">Private Subnet</text>
  <text x="310" y="174" font-size="11" fill="#64748b">直接アクセス不可</text>
  <!-- RDS box -->
  <rect x="312" y="182" width="190" height="46" rx="8" stroke="#475569" stroke-width="2" fill="#1e293b"/>
  <text x="407" y="209" text-anchor="middle" font-size="16" fill="#cbd5e1">RDS</text>
  <!-- App Server box -->
  <rect x="312" y="244" width="190" height="46" rx="8" stroke="#475569" stroke-width="2" fill="#1e293b"/>
  <text x="407" y="271" text-anchor="middle" font-size="16" fill="#cbd5e1">App Server</text>
</svg>`,

  // ── Load Balancer ─────────────────────────────────────────────────────────
  "load-balancer": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 226" fill="none" font-family="system-ui,sans-serif" width="100%">
  <defs>
    <marker id="lb-a" markerWidth="10" markerHeight="8" refX="10" refY="4" orient="auto" markerUnits="userSpaceOnUse">
      <path d="M0 0 L10 4 L0 8Z" fill="#64748b"/>
    </marker>
  </defs>
  <!-- ALB box (two-line label) -->
  <rect x="138" y="10" width="264" height="58" rx="9" stroke="#0369a1" stroke-width="2.5" fill="#0c1a2e"/>
  <text x="270" y="36" text-anchor="middle" font-size="16" fill="#38bdf8">Application</text>
  <text x="270" y="57" text-anchor="middle" font-size="16" fill="#38bdf8">Load Balancer</text>
  <!-- Trunk line from ALB to horizontal branch -->
  <line x1="270" y1="68" x2="270" y2="92" stroke="#64748b" stroke-width="2"/>
  <line x1="80" y1="92" x2="460" y2="92" stroke="#64748b" stroke-width="2"/>
  <!-- Three arrows down to EC2 boxes -->
  <line x1="80" y1="92" x2="80" y2="132" stroke="#64748b" stroke-width="2" marker-end="url(#lb-a)"/>
  <line x1="270" y1="92" x2="270" y2="132" stroke="#64748b" stroke-width="2" marker-end="url(#lb-a)"/>
  <line x1="460" y1="92" x2="460" y2="132" stroke="#64748b" stroke-width="2" marker-end="url(#lb-a)"/>
  <!-- EC2 #1 -->
  <rect x="20" y="134" width="120" height="46" rx="8" stroke="#64748b" stroke-width="2" fill="#1e293b"/>
  <text x="80" y="161" text-anchor="middle" font-size="16" fill="#cbd5e1">EC2 #1</text>
  <!-- EC2 #2 -->
  <rect x="210" y="134" width="120" height="46" rx="8" stroke="#64748b" stroke-width="2" fill="#1e293b"/>
  <text x="270" y="161" text-anchor="middle" font-size="16" fill="#cbd5e1">EC2 #2</text>
  <!-- EC2 #3 -->
  <rect x="400" y="134" width="120" height="46" rx="8" stroke="#64748b" stroke-width="2" fill="#1e293b"/>
  <text x="460" y="161" text-anchor="middle" font-size="16" fill="#cbd5e1">EC2 #3</text>
  <!-- Description -->
  <text x="270" y="206" text-anchor="middle" font-size="13" fill="#64748b">リクエストを複数インスタンスに均等分散</text>
</svg>`,

  // ── Multi-AZ ──────────────────────────────────────────────────────────────
  "multi-az": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 252" fill="none" font-family="system-ui,sans-serif" width="100%">
  <defs>
    <marker id="maz-a" markerWidth="10" markerHeight="8" refX="10" refY="4" orient="auto" markerUnits="userSpaceOnUse">
      <path d="M0 0 L10 4 L0 8Z" fill="#64748b"/>
    </marker>
  </defs>
  <!-- AZ-a (blue border) -->
  <rect x="8" y="8" width="244" height="200" rx="12" stroke="#0369a1" stroke-width="2.5"/>
  <text x="24" y="30" font-size="13" fill="#38bdf8">Availability Zone A</text>
  <!-- AZ-b (grey border) -->
  <rect x="308" y="8" width="244" height="200" rx="12" stroke="#64748b" stroke-width="2"/>
  <text x="324" y="30" font-size="13" fill="#94a3b8">Availability Zone B</text>
  <!-- EC2 Active -->
  <rect x="24" y="44" width="212" height="46" rx="8" stroke="#64748b" stroke-width="2" fill="#1e293b"/>
  <text x="130" y="71" text-anchor="middle" font-size="16" fill="#cbd5e1">EC2 (Active)</text>
  <!-- EC2 Standby -->
  <rect x="324" y="44" width="212" height="46" rx="8" stroke="#334155" stroke-width="2" fill="#1e293b"/>
  <text x="430" y="71" text-anchor="middle" font-size="16" fill="#64748b">EC2 (Standby)</text>
  <!-- RDS Primary -->
  <rect x="24" y="114" width="212" height="58" rx="8" stroke="#0369a1" stroke-width="2" fill="#1e293b"/>
  <text x="130" y="138" text-anchor="middle" font-size="15" fill="#38bdf8">RDS Primary</text>
  <text x="130" y="158" text-anchor="middle" font-size="13" fill="#64748b">書き込み・読み取り</text>
  <!-- RDS Standby -->
  <rect x="324" y="114" width="212" height="58" rx="8" stroke="#334155" stroke-width="2" fill="#1e293b"/>
  <text x="430" y="138" text-anchor="middle" font-size="15" fill="#94a3b8">RDS Standby</text>
  <text x="430" y="158" text-anchor="middle" font-size="13" fill="#64748b">同期レプリカ</text>
  <!-- Sync label + arrow -->
  <text x="280" y="137" text-anchor="middle" font-size="12" fill="#64748b">Sync</text>
  <line x1="236" y1="143" x2="324" y2="143" stroke="#64748b" stroke-width="2" stroke-dasharray="5 3" marker-end="url(#maz-a)"/>
  <!-- Failover note -->
  <text x="280" y="234" text-anchor="middle" font-size="13" fill="#64748b">障害時: AZ-a から AZ-b へ自動フェイルオーバー</text>
</svg>`,

  // ── CDN ───────────────────────────────────────────────────────────────────
  cdn: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 220" fill="none" font-family="system-ui,sans-serif" width="100%">
  <defs>
    <marker id="cdn-a" markerWidth="10" markerHeight="8" refX="10" refY="4" orient="auto" markerUnits="userSpaceOnUse">
      <path d="M0 0 L10 4 L0 8Z" fill="#64748b"/>
    </marker>
  </defs>
  <!-- S3 Origin -->
  <rect x="12" y="56" width="140" height="68" rx="9" stroke="#64748b" stroke-width="2" fill="#0f172a"/>
  <text x="82" y="84" text-anchor="middle" font-size="16" fill="#cbd5e1">S3</text>
  <text x="82" y="107" text-anchor="middle" font-size="13" fill="#64748b">Origin</text>
  <!-- Arrow S3 → CloudFront -->
  <line x1="152" y1="90" x2="196" y2="90" stroke="#64748b" stroke-width="2" marker-end="url(#cdn-a)"/>
  <!-- CloudFront Edge (blue) -->
  <rect x="198" y="38" width="164" height="104" rx="9" stroke="#0369a1" stroke-width="2.5" fill="#0c1a2e"/>
  <text x="280" y="76" text-anchor="middle" font-size="16" fill="#38bdf8">CloudFront</text>
  <text x="280" y="98" text-anchor="middle" font-size="13" fill="#64748b">Edge Location</text>
  <text x="280" y="118" text-anchor="middle" font-size="13" fill="#64748b">キャッシュ</text>
  <!-- Arrow CloudFront → User -->
  <line x1="362" y1="90" x2="406" y2="90" stroke="#64748b" stroke-width="2" marker-end="url(#cdn-a)"/>
  <!-- User -->
  <rect x="408" y="56" width="140" height="68" rx="9" stroke="#64748b" stroke-width="2" fill="#0f172a"/>
  <text x="478" y="84" text-anchor="middle" font-size="16" fill="#cbd5e1">User</text>
  <text x="478" y="107" text-anchor="middle" font-size="13" fill="#64748b">グローバル</text>
  <!-- Description -->
  <text x="280" y="180" text-anchor="middle" font-size="13" fill="#64748b">近くのエッジでキャッシュして低レイテンシーで配信</text>
</svg>`,

  // ── Event-driven ──────────────────────────────────────────────────────────
  "event-driven": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 280" fill="none" font-family="system-ui,sans-serif" width="100%">
  <defs>
    <marker id="ev-a" markerWidth="10" markerHeight="8" refX="10" refY="4" orient="auto" markerUnits="userSpaceOnUse">
      <path d="M0 0 L10 4 L0 8Z" fill="#64748b"/>
    </marker>
  </defs>
  <text x="280" y="20" text-anchor="middle" font-size="13" fill="#64748b">イベント駆動 / Fan-out パターン</text>
  <!-- S3 Bucket -->
  <rect x="12" y="104" width="144" height="46" rx="9" stroke="#64748b" stroke-width="2" fill="#0f172a"/>
  <text x="84" y="131" text-anchor="middle" font-size="16" fill="#cbd5e1">S3 Bucket</text>
  <!-- Arrow S3 → EventBridge -->
  <line x1="156" y1="127" x2="198" y2="127" stroke="#64748b" stroke-width="2" marker-end="url(#ev-a)"/>
  <text x="177" y="120" text-anchor="middle" font-size="12" fill="#64748b">Event</text>
  <!-- EventBridge (blue) -->
  <rect x="200" y="96" width="162" height="62" rx="9" stroke="#0369a1" stroke-width="2.5" fill="#0c1a2e"/>
  <text x="281" y="122" text-anchor="middle" font-size="16" fill="#38bdf8">EventBridge</text>
  <text x="281" y="143" text-anchor="middle" font-size="13" fill="#64748b">ルールで振り分け</text>
  <!-- Fan-out arrows from EB right edge (362, 127) -->
  <line x1="362" y1="127" x2="398" y2="52" stroke="#64748b" stroke-width="2" marker-end="url(#ev-a)"/>
  <line x1="362" y1="127" x2="398" y2="127" stroke="#64748b" stroke-width="2" marker-end="url(#ev-a)"/>
  <line x1="362" y1="127" x2="398" y2="202" stroke="#64748b" stroke-width="2" marker-end="url(#ev-a)"/>
  <!-- Lambda -->
  <rect x="400" y="30" width="148" height="46" rx="8" stroke="#64748b" stroke-width="2" fill="#1e293b"/>
  <text x="474" y="57" text-anchor="middle" font-size="16" fill="#cbd5e1">AWS Lambda</text>
  <!-- SQS -->
  <rect x="400" y="104" width="148" height="46" rx="8" stroke="#64748b" stroke-width="2" fill="#1e293b"/>
  <text x="474" y="131" text-anchor="middle" font-size="16" fill="#cbd5e1">Amazon SQS</text>
  <!-- SNS -->
  <rect x="400" y="178" width="148" height="46" rx="8" stroke="#64748b" stroke-width="2" fill="#1e293b"/>
  <text x="474" y="205" text-anchor="middle" font-size="16" fill="#cbd5e1">Amazon SNS</text>
  <!-- Description -->
  <text x="280" y="258" text-anchor="middle" font-size="13" fill="#64748b">1件のイベントで複数ターゲットに同時配信（疎結合）</text>
</svg>`,
};
