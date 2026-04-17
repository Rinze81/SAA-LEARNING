"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { StatusChip } from "@/components/ui/status-chip";
import type { VerifyResult } from "@/app/api/verify-term/route";
import type { StudyTerm } from "@/lib/study/terms";

const TERM_TO_QUIZ_CATEGORY: Record<string, string> = {
  ストレージ: "Storage",
  コンピュート: "Compute",
  ネットワーク: "Networking",
  データベース: "Database",
};

type TermCardProps = {
  term: StudyTerm;
  isHighlighted?: boolean;
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

const STATUS_STYLES = {
  correct: {
    container: "border-emerald-800/60 bg-emerald-950/40",
    header: "text-emerald-300",
    icon: "✓",
    iconClass: "text-emerald-400",
  },
  warning: {
    container: "border-yellow-800/60 bg-yellow-950/30",
    header: "text-yellow-300",
    icon: "⚠",
    iconClass: "text-yellow-400",
  },
  incorrect: {
    container: "border-rose-800/60 bg-rose-950/40",
    header: "text-rose-300",
    icon: "✗",
    iconClass: "text-rose-400",
  },
} as const;

export function TermCard({ term, isHighlighted = false }: TermCardProps) {
  const [isOpen, setIsOpen] = useState(isHighlighted);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<VerifyResult | null>(null);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const cacheRef = useRef<VerifyResult | null>(null);

  const quizCategory = TERM_TO_QUIZ_CATEGORY[term.category];

  useEffect(() => {
    if (isHighlighted) setIsOpen(true);
  }, [isHighlighted]);

  async function handleVerify(forceRefresh = false) {
    if (!forceRefresh && cacheRef.current) {
      setVerifyResult(cacheRef.current);
      return;
    }

    setIsVerifying(true);
    setVerifyError(null);
    if (forceRefresh) {
      cacheRef.current = null;
      setVerifyResult(null);
    }

    try {
      const res = await fetch("/api/verify-term", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          termName: term.name,
          description: term.description,
        }),
      });

      if (!res.ok) {
        const err = (await res.json()) as { error: string };
        setVerifyError(err.error ?? "検証に失敗しました");
        return;
      }

      const result = (await res.json()) as VerifyResult;
      cacheRef.current = result;
      setVerifyResult(result);
    } catch {
      setVerifyError("ネットワークエラーが発生しました");
    } finally {
      setIsVerifying(false);
    }
  }

  return (
    <article
      id={term.id}
      className={`rounded-[1.5rem] border bg-slate-950/75 shadow-[0_18px_60px_rgba(2,6,23,0.28)] transition-shadow ${
        isHighlighted
          ? "border-sky-600/60 ring-2 ring-sky-600/30"
          : "border-slate-800/80"
      }`}
    >
      {/* ── ヘッダー（常時表示・タップで開閉） ── */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
        aria-expanded={isOpen}
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <StatusChip label={term.category} tone="accent" />
            <StatusChip label="基礎用語" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
              {term.name}
            </h2>
            <p className="text-sm leading-7 text-slate-300 sm:text-[15px]">
              {term.shortDefinition}
            </p>
          </div>
        </div>
        <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-800 bg-slate-900/60">
          <ChevronIcon open={isOpen} />
        </span>
      </button>

      {/* ── アコーディオン本体 ── */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-4 border-t border-slate-800/60 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
            <section className="rounded-[1.25rem] border border-slate-800 bg-slate-900/65 p-4">
              <p className="text-xs tracking-[0.16em] text-slate-500">意味</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                {term.description}
              </p>
            </section>

            <div className="grid gap-3 sm:grid-cols-2">
              <section className="rounded-[1.25rem] border border-sky-900/45 bg-sky-950/30 p-4">
                <p className="text-xs tracking-[0.16em] text-sky-300">
                  試験でどう出るか
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-200">
                  {term.examTip}
                </p>
              </section>

              <section className="rounded-[1.25rem] border border-emerald-900/45 bg-emerald-950/25 p-4">
                <p className="text-xs tracking-[0.16em] text-emerald-300">
                  関連サービス / 関連概念
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {term.related.map((item) => (
                    <span
                      key={`${term.id}-${item}`}
                      className="inline-flex min-h-[32px] items-center rounded-full border border-emerald-900/45 bg-emerald-950/35 px-3 py-1 text-xs text-emerald-100"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            {term.diagram ? (
              <div className="overflow-x-auto rounded-[1.25rem] border border-slate-800 bg-slate-900/30 p-4">
                <p className="mb-3 text-xs tracking-[0.16em] text-slate-500">構成図</p>
                <div dangerouslySetInnerHTML={{ __html: term.diagram }} />
              </div>
            ) : null}

            {/* ── アクションボタン行 ── */}
            <div className="flex flex-wrap gap-2">
              {quizCategory ? (
                <Link
                  href={`/quiz?category=${quizCategory}`}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-700 bg-slate-900/60 px-5 text-sm font-medium text-slate-200 transition hover:border-sky-700 hover:bg-sky-950/40 hover:text-sky-100"
                >
                  この用語の関連問題を解く →
                </Link>
              ) : null}

              {term.docsUrl ? (
                <a
                  href={term.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-700 bg-slate-900/60 px-5 text-sm font-medium text-slate-200 transition hover:border-sky-700 hover:bg-sky-950/40 hover:text-sky-100"
                >
                  AWS公式ドキュメント →
                </a>
              ) : null}

              <button
                type="button"
                onClick={() => handleVerify(false)}
                disabled={isVerifying}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-5 text-sm font-medium text-slate-200 transition hover:border-violet-700 hover:bg-violet-950/40 hover:text-violet-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isVerifying ? (
                  <>
                    <SpinnerIcon />
                    検証中...
                  </>
                ) : (
                  "この説明を検証する"
                )}
              </button>
            </div>

            {/* ── 検証結果パネル ── */}
            {verifyError ? (
              <div className="rounded-[1.25rem] border border-rose-800/50 bg-rose-950/30 p-4 text-sm text-rose-300">
                {verifyError}
              </div>
            ) : null}

            {verifyResult ? (
              <div
                className={`rounded-[1.25rem] border p-4 ${STATUS_STYLES[verifyResult.status].container}`}
              >
                {/* ヘッダー */}
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-bold ${STATUS_STYLES[verifyResult.status].iconClass}`}>
                    {STATUS_STYLES[verifyResult.status].icon}
                  </span>
                  <p className={`text-base font-semibold ${STATUS_STYLES[verifyResult.status].header}`}>
                    {verifyResult.summary}
                  </p>
                </div>

                {/* 詳細 */}
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {verifyResult.details}
                </p>

                {/* 公式ドキュメント確認ポイント */}
                <div className="mt-3 rounded-[0.75rem] border border-slate-700/50 bg-slate-900/40 p-3">
                  <p className="text-[11px] tracking-[0.14em] text-slate-500">公式ドキュメントで確認</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {verifyResult.officialNote}
                  </p>
                </div>

                {/* 公式ドキュメントリンク */}
                {term.docsUrl ? (
                  <a
                    href={term.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs text-slate-400 underline-offset-2 transition hover:text-slate-200 hover:underline"
                  >
                    AWS公式ドキュメントで確認する →
                  </a>
                ) : null}

                {/* 再検証ボタン */}
                <div className="mt-3 border-t border-slate-700/40 pt-3">
                  <button
                    type="button"
                    onClick={() => handleVerify(true)}
                    disabled={isVerifying}
                    className="text-xs text-slate-500 transition hover:text-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    再検証する
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
