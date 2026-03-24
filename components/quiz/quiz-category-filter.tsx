"use client";

import { quizQuestions } from "@/lib/quiz/data";

const ALL_VALUE = "all";
const ALL_LABEL = "すべて";

const categories = Array.from(
  new Set(quizQuestions.map((q) => q.category)),
).sort();

type QuizCategoryFilterProps = {
  selected: string;
  onChange: (category: string) => void;
  questionCounts: Record<string, number>;
};

export function QuizCategoryFilter({
  selected,
  onChange,
  questionCounts,
}: QuizCategoryFilterProps) {
  const totalCount = quizQuestions.length;

  return (
    <div className="rounded-[1.35rem] border border-slate-800 bg-slate-900/50 p-4 sm:p-5">
      <p className="mb-3 text-[11px] tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-[0.22em]">
        カテゴリで絞り込む
      </p>
      <div className="flex flex-wrap gap-2">
        <CategoryButton
          label={ALL_LABEL}
          count={totalCount}
          isSelected={selected === ALL_VALUE}
          onClick={() => onChange(ALL_VALUE)}
        />
        {categories.map((cat) => (
          <CategoryButton
            key={cat}
            label={cat}
            count={questionCounts[cat] ?? 0}
            isSelected={selected === cat}
            onClick={() => onChange(cat)}
          />
        ))}
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
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
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
