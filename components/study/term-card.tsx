"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { StatusChip } from "@/components/ui/status-chip";
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

export function TermCard({ term, isHighlighted = false }: TermCardProps) {
  const [isOpen, setIsOpen] = useState(isHighlighted);
  const quizCategory = TERM_TO_QUIZ_CATEGORY[term.category];

  useEffect(() => {
    if (isHighlighted) setIsOpen(true);
  }, [isHighlighted]);

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

            {quizCategory ? (
              <Link
                href={`/quiz?category=${quizCategory}`}
                className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-700 bg-slate-900/60 px-5 text-sm font-medium text-slate-200 transition hover:border-sky-700 hover:bg-sky-950/40 hover:text-sky-100"
              >
                この用語の関連問題を解く →
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
