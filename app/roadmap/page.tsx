"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { studyTerms } from "@/lib/study/terms";
import {
  ROADMAP_STEPS,
  type RoadmapStep,
} from "@/lib/study/roadmap-data";

// ── 定数 ────────────────────────────────────────────────────────────────────

const STORAGE_KEY = "saa-roadmap-read";

// ── ユーティリティ ────────────────────────────────────────────────────────────

function loadReadIds(): Set<string> {
  if (typeof window === "undefined") return new Set<string>();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set<string>(JSON.parse(raw) as string[]) : new Set<string>();
  } catch {
    return new Set<string>();
  }
}

function saveReadIds(ids: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids)));
}

function getValidIds(step: RoadmapStep) {
  return step.termIds.filter((id) => studyTerms.some((t) => t.id === id));
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
  const router = useRouter();
  const validIds = getValidIds(roadmapStep);
  const readCount = validIds.filter((id) => readIds.has(id)).length;
  const total = validIds.length;
  const allDone = readCount === total;

  function startStudy() {
    router.push(`/roadmap?step=${roadmapStep.step}&index=0`);
  }

  return (
    <div
      className={`rounded-[1.5rem] border bg-slate-950/75 shadow-[0_8px_32px_rgba(2,6,23,0.2)] transition-colors ${
        allDone ? "border-emerald-800/50" : "border-slate-800/80"
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
      <div className="flex flex-wrap gap-2 px-5 py-3 sm:px-6">
        {validIds.map((id) => (
          <TermChip
            key={id}
            termId={id}
            isRead={readIds.has(id)}
            onRead={onRead}
          />
        ))}
      </div>

      {/* 学習ボタン */}
      <div className="border-t border-slate-800/60 px-5 py-3 sm:px-6">
        <button
          type="button"
          onClick={startStudy}
          className="inline-flex min-h-[38px] items-center gap-2 rounded-full border border-sky-800/60 bg-sky-950/30 px-4 text-xs font-medium text-sky-200 transition hover:border-sky-600 hover:bg-sky-950/50"
        >
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-3.5 w-3.5"
            aria-hidden
          >
            <path d="M3 2l10 6-10 6V2z" />
          </svg>
          このSTEPを学習する
        </button>
      </div>
    </div>
  );
}

// ── 学習モード（カードめくり）────────────────────────────────────────────────

function StudyMode({
  stepNum,
  index,
  readIds,
  onRead,
}: {
  stepNum: number;
  index: number;
  readIds: Set<string>;
  onRead: (id: string) => void;
}) {
  const router = useRouter();
  const roadmapStep = ROADMAP_STEPS.find((s) => s.step === stepNum);

  const validIds = roadmapStep ? getValidIds(roadmapStep) : [];
  const safeIndex = Math.max(0, Math.min(index, validIds.length - 1));
  const termId = validIds[safeIndex];
  const term = studyTerms.find((t) => t.id === termId);
  const isLast = safeIndex === validIds.length - 1;

  // render中にrouterを呼ぶのはReactエラーになるため、useEffectで処理する
  useEffect(() => {
    if (!roadmapStep || !term) {
      router.replace("/roadmap");
    }
  }, [roadmapStep, term, router]);

  if (!roadmapStep || !term) {
    return null;
  }

  function exit() {
    router.push("/roadmap");
  }

  function goTo(nextIndex: number) {
    if (nextIndex >= validIds.length) {
      router.push("/roadmap");
    } else {
      router.push(`/roadmap?step=${stepNum}&index=${nextIndex}`);
    }
  }

  function handleUnderstood() {
    onRead(termId);
    goTo(safeIndex + 1);
  }

  return (
    <main className="flex min-h-screen flex-col px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-4">

        {/* トップバー */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-xs tracking-[0.14em] text-sky-400">
              STEP {stepNum}　{roadmapStep.title}
            </p>
            <p className="text-xs text-slate-500">
              {safeIndex + 1} / {validIds.length}
            </p>
          </div>
          <button
            type="button"
            onClick={exit}
            className="inline-flex min-h-[36px] items-center rounded-full border border-slate-700 bg-slate-900/60 px-4 text-xs text-slate-300 transition hover:border-slate-500 hover:text-slate-100"
          >
            終了
          </button>
        </div>

        {/* プログレスバー */}
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-sky-500 transition-all duration-300"
            style={{
              width: `${((safeIndex + 1) / validIds.length) * 100}%`,
            }}
          />
        </div>

        {/* 用語カード */}
        <div className="rounded-[1.5rem] border border-slate-800/80 bg-slate-950/75 shadow-[0_18px_60px_rgba(2,6,23,0.3)]">
          {/* カテゴリ・用語名 */}
          <div className="border-b border-slate-800/60 px-6 py-5">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex min-h-[28px] items-center rounded-full border border-sky-900/70 bg-sky-950/60 px-3 text-[11px] tracking-[0.14em] text-sky-200">
                {term.category}
              </span>
              {readIds.has(termId) && (
                <span className="inline-flex min-h-[28px] items-center gap-1 rounded-full border border-emerald-900/60 bg-emerald-950/40 px-3 text-[11px] text-emerald-300">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3" aria-hidden>
                    <path d="M3 8l3.5 3.5L13 4" />
                  </svg>
                  既読
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-50">
              {term.name}
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              {term.shortDefinition}
            </p>
          </div>

          {/* 詳細 */}
          <div className="flex flex-col gap-3 px-6 py-5">
            <section className="rounded-[1.15rem] border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-[11px] tracking-[0.14em] text-slate-500">意味</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                {term.description}
              </p>
            </section>
            <section className="rounded-[1.15rem] border border-sky-900/45 bg-sky-950/25 p-4">
              <p className="text-[11px] tracking-[0.14em] text-sky-400">
                試験でどう出るか
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-200">
                {term.examTip}
              </p>
            </section>
          </div>
        </div>

        {/* ナビゲーションボタン */}
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => goTo(safeIndex - 1)}
            disabled={safeIndex === 0}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-5 text-sm text-slate-300 transition hover:border-slate-500 hover:text-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
              <path d="M10 3L5 8l5 5" />
            </svg>
            前へ
          </button>

          <button
            type="button"
            onClick={handleUnderstood}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full bg-sky-600 px-5 text-sm font-medium text-white transition hover:bg-sky-500"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
              <path d="M3 8l3.5 3.5L13 4" />
            </svg>
            {isLast ? "わかった（完了）" : "わかった"}
          </button>

          <button
            type="button"
            onClick={() => goTo(safeIndex + 1)}
            disabled={isLast}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-5 text-sm text-slate-300 transition hover:border-slate-500 hover:text-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            次へ
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
              <path d="M6 3l5 5-5 5" />
            </svg>
          </button>
        </div>

      </div>
    </main>
  );
}

// ── ロードマップ一覧 ───────────────────────────────────────────────────────────

function RoadmapList({
  readIds,
  onRead,
  mounted,
}: {
  readIds: Set<string>;
  onRead: (id: string) => void;
  mounted: boolean;
}) {
  const allTermIds = ROADMAP_STEPS.flatMap((s) => getValidIds(s));
  const uniqueTermIds = Array.from(new Set<string>(allTermIds));
  const totalCount = uniqueTermIds.length;
  const readCount = uniqueTermIds.filter((id) => readIds.has(id)).length;
  const progressPct =
    totalCount > 0 ? Math.round((readCount / totalCount) * 100) : 0;

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
              <span>{mounted ? readCount : 0}</span>
              <span className="mx-1 text-slate-600">/</span>
              <span>{totalCount}</span>
              <span className="ml-2 text-sky-400">
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
              readIds={mounted ? readIds : new Set<string>()}
              onRead={onRead}
            />
          ))}
        </div>

      </div>
    </main>
  );
}

// ── メインコンポーネント（Suspense内） ─────────────────────────────────────────

function RoadmapContent() {
  const searchParams = useSearchParams();
  const [readIds, setReadIds] = useState<Set<string>>(new Set<string>());
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

  const stepParam = searchParams?.get("step");
  const indexParam = searchParams?.get("index");
  const isStudyMode = stepParam !== null && indexParam !== null;

  // StudyModはマウント後にのみ描画（URLパラメータが確定してから）
  if (isStudyMode) {
    if (!mounted) return null;
    return (
      <StudyMode
        stepNum={parseInt(stepParam ?? "1", 10)}
        index={parseInt(indexParam ?? "0", 10)}
        readIds={readIds}
        onRead={handleRead}
      />
    );
  }

  // リスト表示はサーバーレンダリング可能（mounted=falseでも空のreadIdsで表示）
  return (
    <RoadmapList readIds={readIds} onRead={handleRead} mounted={mounted} />
  );
}

// ── デフォルトエクスポート ────────────────────────────────────────────────────

export default function RoadmapPage() {
  return (
    <Suspense fallback={null}>
      <RoadmapContent />
    </Suspense>
  );
}
