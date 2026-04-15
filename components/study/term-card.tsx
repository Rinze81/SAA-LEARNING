"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { StatusChip } from "@/components/ui/status-chip";
import type { StudyTerm } from "@/lib/study/terms";

const TERM_TO_QUIZ_CATEGORY: Record<string, string> = {
  ストレージ: "Storage",
  コンピュート: "Compute",
  ネットワーク: "Networking",
  データベース: "Database",
};

type VerifyStatus = "correct" | "warning" | "incorrect";

type VerifyResult = {
  status: VerifyStatus;
  summary: string;
  details: string;
  officialNote: string;
};

type VerifyState =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "done"; result: VerifyResult }
  | { phase: "error"; message: string };

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

const STATUS_CONFIG: Record<
  VerifyStatus,
  { color: string; icon: string; borderColor: string; bgColor: string }
> = {
  correct: {
    color: "text-emerald-300",
    icon: "✓",
    borderColor: "border-emerald-800/50",
    bgColor: "bg-emerald-950/30",
  },
  warning: {
    color: "text-yellow-300",
    icon: "⚠",
    borderColor: "border-yellow-800/50",
    bgColor: "bg-yellow-950/30",
  },
  incorrect: {
    color: "text-red-300",
    icon: "✗",
    borderColor: "border-red-800/50",
    bgColor: "bg-red-950/30",
  },
};

function VerifyResultPanel({
  result,
  docsUrl,
}: {
  result: VerifyResult;
  docsUrl?: string;
}) {
  const cfg = STATUS_CONFIG[result.status];
  return (
    <div
      className={`rounded-[1.25rem] border p-4 ${cfg.borderColor} ${cfg.bgColor}`}
    >
      <div className={`flex items-center gap-2 font-semibold ${cfg.color}`}>
        <span className="text-base">{cfg.icon}</span>
        <span className="text-sm">{result.summary}</span>
      </div>
      {result.details && (
        <p className="mt-2 text-sm leading-7 text-slate-300">{result.details}</p>
      )}
      {result.officialNote && (
        <p className="mt-2 text-xs leading-6 text-slate-400">
          <span className="font-medium text-slate-300">公式確認ポイント：</span>
          {result.officialNote}
        </p>
      )}
      {docsUrl && (
        <a
          href={docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex min-h-[34px] items-center gap-1.5 rounded-full border border-sky-800/50 bg-sky-950/30 px-3 text-xs font-medium text-sky-300 transition hover:border-sky-600 hover:text-sky-200"
        >
          AWS公式ドキュメント →
        </a>
      )}
    </div>
  );
}

async function callVerifyApi(term: StudyTerm): Promise<VerifyResult> {
  const response = await fetch("/api/verify-term", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      termName: term.name,
      description: term.description,
    }),
  });

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as {
      error?: string;
    };
    throw new Error(errorData.error ?? `Server error: ${response.status}`);
  }

  const result = (await response.json()) as VerifyResult;
  return result;
}

export function TermCard({ term, isHighlighted = false }: TermCardProps) {
  const [isOpen, setIsOpen] = useState(isHighlighted);
  const [verifyState, setVerifyState] = useState<VerifyState>({ phase: "idle" });
  const cacheRef = useRef<VerifyResult | null>(null);
  const quizCategory = TERM_TO_QUIZ_CATEGORY[term.category];

  useEffect(() => {
    if (isHighlighted) setIsOpen(true);
  }, [isHighlighted]);

  async function handleVerify() {
    if (verifyState.phase === "loading") return;
    if (cacheRef.current) {
      setVerifyState({ phase: "done", result: cacheRef.current });
      return;
    }

    setVerifyState({ phase: "loading" });
    try {
      const result = await callVerifyApi(term);
      cacheRef.current = result;
      setVerifyState({ phase: "done", result });
    } catch {
      setVerifyState({ phase: "error", message: "検証に失敗しました。しばらく後に再試行してください。" });
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

            {/* ── アクションエリア ── */}
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
            </div>

            {/* ── AI検証エリア ── */}
            <div className="flex flex-col gap-3">
              {verifyState.phase === "idle" && (
                <button
                  type="button"
                  onClick={handleVerify}
                  className="inline-flex min-h-[40px] w-fit items-center gap-2 rounded-full border border-violet-800/60 bg-violet-950/30 px-4 text-xs font-medium text-violet-300 transition hover:border-violet-600 hover:bg-violet-950/50 hover:text-violet-200"
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5"
                    aria-hidden
                  >
                    <circle cx="8" cy="8" r="6" />
                    <path d="M8 5v3l2 2" />
                  </svg>
                  この説明を検証する
                </button>
              )}

              {verifyState.phase === "loading" && (
                <div className="inline-flex min-h-[40px] w-fit items-center gap-2 rounded-full border border-violet-800/40 bg-violet-950/20 px-4 text-xs text-violet-400">
                  <svg
                    className="h-3.5 w-3.5 animate-spin"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path
                      d="M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2z"
                      strokeOpacity="0.25"
                    />
                    <path d="M8 2a6 6 0 0 1 6 6" />
                  </svg>
                  検証中...
                </div>
              )}

              {verifyState.phase === "done" && (
                <div className="flex flex-col gap-2">
                  <VerifyResultPanel
                    result={verifyState.result}
                    docsUrl={term.docsUrl}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      cacheRef.current = null;
                      setVerifyState({ phase: "idle" });
                    }}
                    className="w-fit text-xs text-slate-500 underline underline-offset-2 hover:text-slate-300"
                  >
                    再検証する
                  </button>
                </div>
              )}

              {verifyState.phase === "error" && (
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-red-400">{verifyState.message}</p>
                  <button
                    type="button"
                    onClick={() => setVerifyState({ phase: "idle" })}
                    className="w-fit text-xs text-slate-500 underline underline-offset-2 hover:text-slate-300"
                  >
                    再試行
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
