"use client";

import { quizQuestions } from "@/lib/quiz/data";
import type { QuizFilter } from "@/lib/quiz/types";

const ALL_VALUE = "all";
const ALL_LABEL = "すべて";

const categories = Array.from(
  new Set(quizQuestions.map((q) => q.category)),
).sort();

type QuizCategoryFilterProps = {
  filter: QuizFilter;
  onFilterChange: (updates: Partial<QuizFilter>) => void;
  questionCounts: Record<string, number>;
  filteredCount: number;
};

export function QuizCategoryFilter({
  filter,
  onFilterChange,
  questionCounts,
  filteredCount,
}: QuizCategoryFilterProps) {
  const totalCount = quizQuestions.length;

  return (
    <div className="rounded-[1.35rem] border border-slate-800 bg-slate-900/50 p-4 sm:p-5">
      {/* ヘッダー行: タイトル + 対象件数バッジ */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-[11px] tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-[0.22em]">
          絞り込み
        </p>
        <span
          data-testid="filtered-count"
          className="rounded-full border border-slate-700 bg-slate-800 px-3 py-0.5 text-xs font-medium text-slate-300"
        >
          対象：{filteredCount}問
        </span>
      </div>

      {/* カテゴリ横スクロール */}
      <div className="-mx-4 overflow-x-auto px-4 pb-0.5 sm:-mx-5 sm:px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-2" style={{ width: "max-content" }}>
          <CategoryButton
            label={ALL_LABEL}
            count={totalCount}
            isSelected={filter.category === ALL_VALUE}
            onClick={() => onFilterChange({ category: ALL_VALUE })}
          />
          {categories.map((cat) => (
            <CategoryButton
              key={cat}
              label={cat}
              count={questionCounts[cat] ?? 0}
              isSelected={filter.category === cat}
              onClick={() => onFilterChange({ category: cat })}
            />
          ))}
        </div>
      </div>

      {/* トグル行 */}
      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-800/70 pt-3">
        <ToggleButton
          label="未挑戦のみ"
          isActive={filter.untriedOnly}
          onClick={() => onFilterChange({ untriedOnly: !filter.untriedOnly })}
        />
        <ToggleButton
          label="復習リストのみ"
          isActive={filter.reviewOnly}
          onClick={() => onFilterChange({ reviewOnly: !filter.reviewOnly })}
        />
      </div>
    </div>
  );
}

type CategoryButtonProps = {
  label: string;
  count: number;
  isSelected: boolean;
  onClick: () => void;
};

function CategoryButton({ label, count, isSelected, onClick }: CategoryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[44px] items-center gap-2 rounded-full border px-4 text-sm font-medium transition-all duration-200 active:scale-95 ${
        isSelected
          ? "border-slate-500 bg-slate-700 text-white"
          : "border-slate-700 bg-slate-950/60 text-slate-400 hover:border-slate-600 hover:text-slate-200"
      }`}
    >
      {label}
      <span
        className={`rounded-full px-1.5 py-0.5 text-[11px] font-normal ${
          isSelected ? "bg-slate-600 text-slate-200" : "bg-slate-800 text-slate-500"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

type ToggleButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

function ToggleButton({ label, isActive, onClick }: ToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[36px] items-center gap-2 rounded-full border px-4 text-xs font-medium transition-all duration-200 active:scale-95 ${
        isActive
          ? "border-sky-700 bg-sky-950/70 text-sky-300"
          : "border-slate-700 bg-slate-950/60 text-slate-400 hover:border-slate-600 hover:text-slate-200"
      }`}
    >
      <span
        className={`inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border text-[9px] transition-colors ${
          isActive ? "border-sky-400 bg-sky-500 text-white" : "border-slate-600 bg-transparent"
        }`}
      >
        {isActive ? "✓" : ""}
      </span>
      {label}
    </button>
  );
}
