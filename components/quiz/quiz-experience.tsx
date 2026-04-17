"use client";

import { useMemo } from "react";
import { QuizCategoryFilter } from "@/components/quiz/quiz-category-filter";
import { QuizFeedbackPanel } from "@/components/quiz/quiz-feedback-panel";
import { QuizFooterActions } from "@/components/quiz/quiz-footer-actions";
import { QuizHeader } from "@/components/quiz/quiz-header";
import { QuizOptions } from "@/components/quiz/quiz-options";
import { QuizQuestionCard } from "@/components/quiz/quiz-question-card";
import { quizQuestions } from "@/lib/quiz/data";
import { DEFAULT_QUIZ_FILTER } from "@/lib/quiz/types";
import { useQuizFilter } from "@/lib/quiz/use-quiz-filter";
import { useQuizSession } from "@/lib/quiz/use-quiz-session";

type QuizExperienceProps = {
  initialQuestionId?: string;
  initialCategory?: string;
};

export function QuizExperience({ initialQuestionId, initialCategory }: QuizExperienceProps) {
  const { filter, updateFilter } = useQuizFilter(initialCategory);
  const session = useQuizSession({ initialQuestionId, filter });

  const questionCounts = useMemo(
    () =>
      quizQuestions.reduce<Record<string, number>>((acc, q) => {
        acc[q.category] = (acc[q.category] ?? 0) + 1;
        return acc;
      }, {}),
    [],
  );

  return (
    <main className="min-h-screen px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
        {!session.isEmpty && <QuizHeader session={session} />}

        <QuizCategoryFilter
          filter={filter}
          onFilterChange={updateFilter}
          questionCounts={questionCounts}
          filteredCount={session.totalQuestions}
        />

        {session.isEmpty ? (
          <div className="rounded-[1.75rem] border border-slate-800/80 bg-slate-950/70 p-8 text-center sm:rounded-[2rem] sm:p-12">
            <p className="text-sm text-slate-400">該当する問題がありません</p>
            <p className="mt-1 text-xs text-slate-600">
              フィルターを変更してください
            </p>
            <button
              type="button"
              onClick={() => updateFilter(DEFAULT_QUIZ_FILTER)}
              className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-700 px-6 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:text-slate-100"
            >
              フィルターをリセット
            </button>
          </div>
        ) : (
          <div className="grid gap-5 xl:grid-cols-[1.18fr_0.82fr]">
            <div className="grid gap-5">
              <QuizQuestionCard question={session.question} session={session} />
              <QuizOptions session={session} />
            </div>
            <div className="grid gap-5">
              <QuizFeedbackPanel session={session} />
              <QuizFooterActions session={session} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
