export const termDiagrams: Record<string, string> = {
  vpc: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270" fill="none" font-family="system-ui,sans-serif" width="100%">
  <defs><marker id="vpc-a" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><path d="M0 0 L8 3 L0 6Z" fill="#475569"/></marker></defs>
  <rect x="175" y="6" width="130" height="34" rx="8" stroke="#475569" stroke-width="1.5" fill="#0f172a"/>
  <text x="240" y="27" text-anchor="middle" font-size="12" fill="#94a3b8">Internet</text>
  <line x1="240" y1="40" x2="240" y2="58" stroke="#475569" stroke-width="1.5" marker-end="url(#vpc-a)"/>
  <rect x="158" y="60" width="164" height="34" rx="8" stroke="#475569" stroke-width="1.5" fill="#0f172a"/>
  <text x="240" y="81" text-anchor="middle" font-size="12" fill="#cbd5e1">Internet Gateway</text>
  <line x1="240" y1="94" x2="240" y2="112" stroke="#475569" stroke-width="1.5"/>
  <line x1="114" y1="112" x2="240" y2="112" stroke="#475569" stroke-width="1.5"/>
  <line x1="114" y1="112" x2="114" y2="132" stroke="#475569" stroke-width="1.5" marker-end="url(#vpc-a)"/>
  <rect x="8" y="102" width="464" height="162" rx="12" stroke="#334155" stroke-width="1.5" stroke-dasharray="6 3"/>
  <text x="20" y="118" font-size="10" fill="#64748b">VPC</text>
  <rect x="18" y="122" width="210" height="132" rx="8" stroke="#0369a1" stroke-width="1.5"/>
  <text x="30" y="139" font-size="10" fill="#38bdf8">Public Subnet</text>
  <rect x="36" y="150" width="174" height="34" rx="6" stroke="#475569" stroke-width="1.5" fill="#1e293b"/>
  <text x="123" y="171" text-anchor="middle" font-size="12" fill="#cbd5e1">EC2 / ALB</text>
  <rect x="36" y="198" width="174" height="34" rx="6" stroke="#475569" stroke-width="1.5" fill="#1e293b"/>
  <text x="123" y="219" text-anchor="middle" font-size="12" fill="#cbd5e1">NAT Gateway</text>
  <line x1="210" y1="167" x2="252" y2="167" stroke="#475569" stroke-width="1.5" stroke-dasharray="4 2" marker-end="url(#vpc-a)"/>
  <rect x="254" y="122" width="218" height="132" rx="8" stroke="#334155" stroke-width="1.5"/>
  <text x="266" y="139" font-size="10" fill="#64748b">Private Subnet</text>
  <rect x="270" y="150" width="182" height="34" rx="6" stroke="#475569" stroke-width="1.5" fill="#1e293b"/>
  <text x="361" y="171" text-anchor="middle" font-size="12" fill="#cbd5e1">RDS</text>
  <rect x="270" y="198" width="182" height="34" rx="6" stroke="#475569" stroke-width="1.5" fill="#1e293b"/>
  <text x="361" y="219" text-anchor="middle" font-size="12" fill="#cbd5e1">App Server</text>
</svg>`,

  "load-balancer": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 200" fill="none" font-family="system-ui,sans-serif" width="100%">
  <defs><marker id="lb-a" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><path d="M0 0 L8 3 L0 6Z" fill="#475569"/></marker></defs>
  <rect x="140" y="14" width="200" height="40" rx="8" stroke="#0369a1" stroke-width="1.5" fill="#0f172a"/>
  <text x="240" y="38" text-anchor="middle" font-size="13" fill="#38bdf8">Application Load Balancer</text>
  <line x1="240" y1="54" x2="240" y2="76" stroke="#475569" stroke-width="1.5"/>
  <line x1="76" y1="76" x2="404" y2="76" stroke="#475569" stroke-width="1.5"/>
  <line x1="76" y1="76" x2="76" y2="118" stroke="#475569" stroke-width="1.5" marker-end="url(#lb-a)"/>
  <line x1="240" y1="76" x2="240" y2="118" stroke="#475569" stroke-width="1.5" marker-end="url(#lb-a)"/>
  <line x1="404" y1="76" x2="404" y2="118" stroke="#475569" stroke-width="1.5" marker-end="url(#lb-a)"/>
  <rect x="16" y="120" width="120" height="40" rx="6" stroke="#475569" stroke-width="1.5" fill="#1e293b"/>
  <text x="76" y="144" text-anchor="middle" font-size="12" fill="#cbd5e1">EC2 #1</text>
  <rect x="180" y="120" width="120" height="40" rx="6" stroke="#475569" stroke-width="1.5" fill="#1e293b"/>
  <text x="240" y="144" text-anchor="middle" font-size="12" fill="#cbd5e1">EC2 #2</text>
  <rect x="344" y="120" width="120" height="40" rx="6" stroke="#475569" stroke-width="1.5" fill="#1e293b"/>
  <text x="404" y="144" text-anchor="middle" font-size="12" fill="#cbd5e1">EC2 #3</text>
  <text x="240" y="184" text-anchor="middle" font-size="11" fill="#64748b">リクエストを複数インスタンスに均等分散</text>
</svg>`,

  "multi-az": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 220" fill="none" font-family="system-ui,sans-serif" width="100%">
  <defs><marker id="maz-a" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><path d="M0 0 L8 3 L0 6Z" fill="#475569"/></marker></defs>
  <rect x="8" y="8" width="214" height="168" rx="12" stroke="#0369a1" stroke-width="1.5"/>
  <text x="22" y="28" font-size="11" fill="#38bdf8">Availability Zone A</text>
  <rect x="258" y="8" width="214" height="168" rx="12" stroke="#334155" stroke-width="1.5"/>
  <text x="272" y="28" font-size="11" fill="#64748b">Availability Zone B</text>
  <rect x="24" y="40" width="182" height="36" rx="6" stroke="#475569" stroke-width="1.5" fill="#1e293b"/>
  <text x="115" y="62" text-anchor="middle" font-size="12" fill="#cbd5e1">EC2 (Active)</text>
  <rect x="274" y="40" width="182" height="36" rx="6" stroke="#334155" stroke-width="1.5" fill="#1e293b"/>
  <text x="365" y="62" text-anchor="middle" font-size="12" fill="#94a3b8">EC2 (Standby)</text>
  <rect x="24" y="104" width="182" height="44" rx="6" stroke="#0369a1" stroke-width="1.5" fill="#1e293b"/>
  <text x="115" y="122" text-anchor="middle" font-size="11" fill="#38bdf8">RDS Primary</text>
  <text x="115" y="139" text-anchor="middle" font-size="10" fill="#64748b">書き込み・読み取り</text>
  <rect x="274" y="104" width="182" height="44" rx="6" stroke="#334155" stroke-width="1.5" fill="#1e293b"/>
  <text x="365" y="122" text-anchor="middle" font-size="11" fill="#94a3b8">RDS Standby</text>
  <text x="365" y="139" text-anchor="middle" font-size="10" fill="#64748b">同期レプリカ</text>
  <text x="240" y="120" text-anchor="middle" font-size="10" fill="#64748b">Sync</text>
  <line x1="206" y1="126" x2="274" y2="126" stroke="#475569" stroke-width="1.5" stroke-dasharray="4 2" marker-end="url(#maz-a)"/>
  <text x="240" y="200" text-anchor="middle" font-size="11" fill="#64748b">障害時: AZ-a から AZ-b へ自動フェイルオーバー</text>
</svg>`,

  cdn: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 190" fill="none" font-family="system-ui,sans-serif" width="100%">
  <defs><marker id="cdn-a" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><path d="M0 0 L8 3 L0 6Z" fill="#475569"/></marker></defs>
  <rect x="10" y="54" width="118" height="54" rx="8" stroke="#475569" stroke-width="1.5" fill="#0f172a"/>
  <text x="69" y="77" text-anchor="middle" font-size="13" fill="#cbd5e1">S3</text>
  <text x="69" y="96" text-anchor="middle" font-size="10" fill="#64748b">Origin</text>
  <line x1="128" y1="81" x2="170" y2="81" stroke="#475569" stroke-width="1.5" marker-end="url(#cdn-a)"/>
  <rect x="172" y="38" width="136" height="86" rx="8" stroke="#0369a1" stroke-width="1.5" fill="#0f172a"/>
  <text x="240" y="68" text-anchor="middle" font-size="13" fill="#38bdf8">CloudFront</text>
  <text x="240" y="86" text-anchor="middle" font-size="10" fill="#64748b">Edge Location</text>
  <text x="240" y="103" text-anchor="middle" font-size="10" fill="#64748b">キャッシュ</text>
  <line x1="308" y1="81" x2="350" y2="81" stroke="#475569" stroke-width="1.5" marker-end="url(#cdn-a)"/>
  <rect x="352" y="54" width="118" height="54" rx="8" stroke="#475569" stroke-width="1.5" fill="#0f172a"/>
  <text x="411" y="77" text-anchor="middle" font-size="13" fill="#cbd5e1">User</text>
  <text x="411" y="96" text-anchor="middle" font-size="10" fill="#64748b">グローバル</text>
  <text x="240" y="158" text-anchor="middle" font-size="11" fill="#64748b">近くのエッジでキャッシュして低レイテンシーで配信</text>
</svg>`,

  "event-driven": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 256" fill="none" font-family="system-ui,sans-serif" width="100%">
  <defs><marker id="ev-a" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><path d="M0 0 L8 3 L0 6Z" fill="#475569"/></marker></defs>
  <text x="240" y="20" text-anchor="middle" font-size="11" fill="#64748b">イベント駆動 / Fan-out パターン</text>
  <rect x="10" y="100" width="120" height="40" rx="8" stroke="#475569" stroke-width="1.5" fill="#0f172a"/>
  <text x="70" y="124" text-anchor="middle" font-size="12" fill="#cbd5e1">S3 Bucket</text>
  <line x1="130" y1="120" x2="166" y2="120" stroke="#475569" stroke-width="1.5" marker-end="url(#ev-a)"/>
  <text x="148" y="114" text-anchor="middle" font-size="9" fill="#64748b">Event</text>
  <rect x="168" y="100" width="130" height="40" rx="8" stroke="#0369a1" stroke-width="1.5" fill="#0f172a"/>
  <text x="233" y="118" text-anchor="middle" font-size="12" fill="#38bdf8">EventBridge</text>
  <text x="233" y="133" text-anchor="middle" font-size="10" fill="#64748b">ルールで振り分け</text>
  <line x1="298" y1="120" x2="338" y2="50" stroke="#475569" stroke-width="1.5" marker-end="url(#ev-a)"/>
  <line x1="298" y1="120" x2="338" y2="120" stroke="#475569" stroke-width="1.5" marker-end="url(#ev-a)"/>
  <line x1="298" y1="120" x2="338" y2="190" stroke="#475569" stroke-width="1.5" marker-end="url(#ev-a)"/>
  <rect x="340" y="30" width="130" height="40" rx="6" stroke="#475569" stroke-width="1.5" fill="#1e293b"/>
  <text x="405" y="54" text-anchor="middle" font-size="12" fill="#cbd5e1">AWS Lambda</text>
  <rect x="340" y="100" width="130" height="40" rx="6" stroke="#475569" stroke-width="1.5" fill="#1e293b"/>
  <text x="405" y="124" text-anchor="middle" font-size="12" fill="#cbd5e1">Amazon SQS</text>
  <rect x="340" y="170" width="130" height="40" rx="6" stroke="#475569" stroke-width="1.5" fill="#1e293b"/>
  <text x="405" y="194" text-anchor="middle" font-size="12" fill="#cbd5e1">Amazon SNS</text>
  <text x="240" y="238" text-anchor="middle" font-size="11" fill="#64748b">1件のイベントで複数ターゲットに同時配信（疎結合）</text>
</svg>`,
};
