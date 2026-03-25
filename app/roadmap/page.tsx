"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { studyTerms } from "@/lib/study/terms";

// ── 定数 ────────────────────────────────────────────────────────────────────

const STORAGE_KEY = "saa-roadmap-read";

type RoadmapStep = {
  step: number;
  title: string;
  description: string;
  termIds: string[];
};

const ROADMAP_STEPS: RoadmapStep[] = [
  {
    step: 1,
    title: "設計の基礎",
    description: "クラウド設計の根幹となる考え方を最初に押さえましょう。",
    termIds: [
      "high-availability",
      "fault-tolerance",
      "scalability",
      "elasticity",
      "stateless",
      "durability",
    ],
  },
  {
    step: 2,
    title: "ネットワークの土台",
    description: "VPC を中心にネットワーク構成の基礎を理解します。",
    termIds: [
      "vpc",
      "public-subnet",
      "private-subnet",
      "security-group",
      "internet-gateway",
      "nat-gateway",
    ],
  },
  {
    step: 3,
    title: "コンピュート",
    description: "仮想サーバーからサーバーレスまでの実行環境を学びます。",
    termIds: [
      "ec2",
      "ami",
      "auto-scaling",
      "load-balancer",
      "lambda",
      "elastic-beanstalk",
    ],
  },
  {
    step: 4,
    title: "ストレージ",
    description: "用途に合ったストレージサービスの使い分けを整理します。",
    termIds: ["object-storage", "block-storage", "s3", "ebs", "efs", "cdn"],
  },
  {
    step: 5,
    title: "データベース",
    description: "RDB から NoSQL まで、データ特性に応じた選択を学びます。",
    termIds: [
      "rds",
      "aurora",
      "dynamodb",
      "elasticache",
      "read-replica",
      "multi-az",
    ],
  },
  {
    step: 6,
    title: "セキュリティ",
    description: "IAM・暗号化・アクセス制御で安全なアーキテクチャを設計します。",
    termIds: [
      "iam-role",
      "iam-user",
      "iam-policy",
      "kms",
      "security-group",
      "waf",
      "cognito",
    ],
  },
  {
    step: 7,
    title: "アーキテクチャパターン",
    description: "実際の設計で繰り返し登場するパターンを俯瞰します。",
    termIds: ["event-driven", "serverless", "vpc", "multi-az"],
  },
];

// ── ユーティリティ ────────────────────────────────────────────────────────────

function loadReadIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set<string>(JSON.parse(raw) as string[]) : new Set<string>();
  } catch {
    return new Set();
  }
}

function saveReadIds(ids: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids)));
}

// ── 用語チップ ────────────────────────────────────────────────────────────────

function TermChip({
  termId,
  isRead,
  onRead,
}: {
  termId: string;
  isRead: boolean;
  onRead: (id: string) => void;
}) {
  const router = useRouter();
  const term = studyTerms.find((t) => t.id === termId);
  if (!term) return null;

  function handleClick() {
    onRead(termId);
    router.push(`/terms?termId=${termId}`);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition hover:-translate-y-0.5 ${
        isRead
          ? "border-emerald-800/60 bg-emerald-950/40 text-emerald-200"
          : "border-slate-700/70 bg-slate-900/60 text-slate-300 hover:border-sky-700 hover:text-sky-200"
      }`}
    >
      {isRead && (
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3 w-3 shrink-0 text-emerald-400"
          aria-hidden
        >
          <path d="M3 8l3.5 3.5L13 4" />
        </svg>
      )}
      {term.name}
    </button>
  );
}

// ── ステップカード ─────────────────────────────────────────────────────────────

function StepCard({
  roadmapStep,
  readIds,
  onRead,
}: {
  roadmapStep: RoadmapStep;
  readIds: Set<string>;
  onRead: (id: string) => void;
}) {
  const validIds = roadmapStep.termIds.filter((id) =>
    studyTerms.some((t) => t.id === id)
  );
  const readCount = validIds.filter((id) => readIds.has(id)).length;
  const total = validIds.length;
  const allDone = readCount === total;

  return (
    <div
      className={`rounded-[1.5rem] border bg-slate-950/75 shadow-[0_8px_32px_rgba(2,6,23,0.2)] transition-colors ${
        allDone
          ? "border-emerald-800/50"
          : "border-slate-800/80"
      }`}
    >
      {/* ヘッダー */}
      <div className="flex items-start justify-between gap-4 border-b border-slate-800/60 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${
              allDone
                ? "border-emerald-700 bg-emerald-950/60 text-emerald-300"
                : "border-slate-700 bg-slate-900/70 text-slate-300"
            }`}
          >
            {allDone ? (
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden
              >
                <path d="M3 8l3.5 3.5L13 4" />
              </svg>
            ) : (
              roadmapStep.step
            )}
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-100">
              STEP {roadmapStep.step}　{roadmapStep.title}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              {roadmapStep.description}
            </p>
          </div>
        </div>
        {/* 完了率バッジ */}
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium tabular-nums ${
            allDone
              ? "border-emerald-800/60 bg-emerald-950/40 text-emerald-300"
              : readCount > 0
              ? "border-sky-800/60 bg-sky-950/30 text-sky-300"
              : "border-slate-700 bg-slate-900/60 text-slate-400"
          }`}
        >
          {readCount} / {total}
        </span>
      </div>

      {/* チップ群 */}
      <div className="flex flex-wrap gap-2 px-5 py-4 sm:px-6">
        {validIds.map((id) => (
          <TermChip
            key={id}
            termId={id}
            isRead={readIds.has(id)}
            onRead={onRead}
          />
        ))}
      </div>
    </div>
  );
}

// ── ページ本体 ────────────────────────────────────────────────────────────────

export default function RoadmapPage() {
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setReadIds(loadReadIds());
    setMounted(true);
  }, []);

  const handleRead = useCallback((id: string) => {
    setReadIds((prev) => {
      const next = new Set<string>(prev);
      next.add(id);
      saveReadIds(next);
      return next;
    });
  }, []);

  // 全体の進捗計算
  const allTermIds = ROADMAP_STEPS.flatMap((s) =>
    s.termIds.filter((id) => studyTerms.some((t) => t.id === id))
  );
  // 重複 ID（security-group, vpc, multi-az）を除外してユニークに
  const uniqueTermIds = Array.from(new Set<string>(allTermIds));
  const totalCount = uniqueTermIds.length;
  const readCount = uniqueTermIds.filter((id) => readIds.has(id)).length;
  const progressPct = totalCount > 0 ? Math.round((readCount / totalCount) * 100) : 0;

  return (
    <main className="min-h-screen px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-5">

        {/* ページヘッダー */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
            学習ロードマップ
          </h1>
          <p className="text-sm leading-6 text-slate-400">
            この順番で用語を読むと、AWS SAA の全体像が体系的に身につきます。
          </p>
        </div>

        {/* 全体進捗バー */}
        <div className="rounded-[1.25rem] border border-slate-800/80 bg-slate-950/75 p-4 sm:p-5">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs tracking-[0.14em] text-slate-400">全体の進捗</p>
            <p className="text-xs font-medium tabular-nums text-slate-300">
              {mounted ? readCount : 0} / {totalCount}
              <span className="text-sky-400">
                {mounted ? progressPct : 0}%
              </span>
            </p>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-sky-500 transition-all duration-500"
              style={{ width: mounted ? `${progressPct}%` : "0%" }}
            />
          </div>
          {mounted && progressPct === 100 && (
            <p className="mt-2 text-center text-xs text-emerald-400">
              すべての用語を確認しました！
            </p>
          )}
        </div>

        {/* ステップカード一覧 */}
        <div className="flex flex-col gap-4">
          {ROADMAP_STEPS.map((s) => (
            <StepCard
              key={s.step}
              roadmapStep={s}
              readIds={mounted ? readIds : new Set()}
              onRead={handleRead}
            />
          ))}
        </div>

      </div>
    </main>
  );
}
