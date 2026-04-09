"use client";

import { Suspense, useEffect, useId, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { TermCard } from "@/components/study/term-card";
import { SectionFrame } from "@/components/ui/section-frame";
import { studyTermCategories, studyTerms } from "@/lib/study/terms";

const ALL_CATEGORIES = "すべて";

function buildSearchTarget(term: (typeof studyTerms)[number]) {
  return [
    term.name,
    term.shortDefinition,
    term.description,
    term.examTip,
    ...term.related,
  ]
    .join(" ")
    .toLocaleLowerCase();
}

function TermsPageContent() {
  const searchParams = useSearchParams();
  const highlightedTermId = searchParams?.get("termId") ?? null;

  const searchInputId = useId();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);

  const normalizedQuery = searchQuery.trim().toLocaleLowerCase();

  const filteredTerms = studyTerms.filter((term) => {
    const matchesCategory =
      selectedCategory === ALL_CATEGORIES || term.category === selectedCategory;

    if (!matchesCategory) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    return buildSearchTarget(term).includes(normalizedQuery);
  });

  const hasActiveFilters =
    normalizedQuery.length > 0 || selectedCategory !== ALL_CATEGORIES;

  const resultSummary = hasActiveFilters
    ? `${studyTerms.length}件中 ${filteredTerms.length}件を表示`
    : `${studyTerms.length}件の用語を表示`;

  useEffect(() => {
    if (!highlightedTermId) return;
    const el = document.getElementById(highlightedTermId);
    if (el) {
      // Small delay to allow render to settle
      const id = setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
      return () => clearTimeout(id);
    }
  }, [highlightedTermId]);

  return (
    <main className="min-h-screen px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5">
        <SectionFrame
          eyebrow="AWS 用語"
          title="用語集"
          aside={
            <Link
              href="/comparisons"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-800 px-5 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5"
            >
              サービス比較へ進む
            </Link>
          }
        >
          <div className="rounded-[1.15rem] border border-slate-800 bg-slate-900/55 p-4">
            <p className="text-[11px] tracking-[0.18em] text-slate-500 sm:text-xs">
              収録用語数
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-100">
              {studyTerms.length}
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              頻出の設計原則と AWS 基礎用語を優先しています。
            </p>
          </div>
        </SectionFrame>

        <section className="rounded-[1.75rem] border border-slate-800/80 bg-slate-950/70 p-5 backdrop-blur sm:rounded-[2rem] sm:p-7">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <label
                htmlFor={searchInputId}
                className="text-xs tracking-[0.16em] text-slate-500"
              >
                用語検索
              </label>
              <input
                id={searchInputId}
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="用語名・説明・関連語で検索"
                className="min-h-[52px] rounded-2xl border border-slate-800 bg-slate-900/70 px-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-sky-700 focus:ring-2 focus:ring-sky-900/40"
              />
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-xs tracking-[0.16em] text-slate-500">
                カテゴリ絞り込み
              </p>
              <div className="flex flex-wrap gap-2">
                {[ALL_CATEGORIES, ...studyTermCategories].map((category) => {
                  const isSelected = selectedCategory === category;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`inline-flex min-h-[44px] items-center rounded-full border px-4 text-sm transition ${
                        isSelected
                          ? "border-sky-800 bg-sky-950/70 text-sky-100"
                          : "border-slate-800 bg-slate-900/65 text-slate-300 hover:border-slate-700 hover:text-slate-100"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-2 border-t border-slate-800/80 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-300">{resultSummary}</p>
              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(ALL_CATEGORIES);
                  }}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-800 px-4 text-sm text-slate-200 transition hover:border-slate-700 hover:text-slate-50"
                >
                  絞り込みをクリア
                </button>
              ) : null}
            </div>
          </div>
        </section>

        {filteredTerms.length > 0 ? (
          <section className="grid gap-4">
            {filteredTerms.map((term) => (
              <TermCard
                key={term.id}
                term={term}
                isHighlighted={term.id === highlightedTermId}
              />
            ))}
          </section>
        ) : (
          <section className="rounded-[1.5rem] border border-slate-800/80 bg-slate-950/75 p-6 text-center sm:p-8">
            <h2 className="text-lg font-semibold text-slate-100">
              該当する用語がありません
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              検索語やカテゴリを変えてみてください。
            </p>
          </section>
        )}
      </div>
    </main>
  );
}

export default function TermsPage() {
  return (
    <Suspense fallback={null}>
      <TermsPageContent />
    </Suspense>
  );
}
