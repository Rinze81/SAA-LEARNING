"use client";

import { useMemo, useState } from "react";
import { QuizCategoryFilter } from "@/components/quiz/quiz-category-filter";
import { QuizFeedbackPanel } from "@/components/quiz/quiz-feedback-panel";
import { QuizFooterActions } from "@/components/quiz/quiz-footer-actions";
import { QuizHeader } from "@/components/quiz/quiz-header";
import { QuizOptions } from "@/components/quiz/quiz-options";
import { QuizQuestionCard } from "@/components/quiz/quiz-question-card";
import { quizQuestions } from "@/lib/quiz/data";
import { useQuizSession } from "@/lib/quiz/use-quiz-session";

type QuizExperienceProps = {
  initialQuestionId?: string;
  initialCategory?: string;
};

export function QuizExperience({ initialQuestionId, initialCategory }: QuizExperienceProps) {
  const [categoryFilter, setCategoryFilter] = useState(initialCategory ?? "all");
  const session = useQuizSession({ initialQuestionId, categoryFilter });

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
        <QuizHeader session={session} />
        <QuizCategoryFilter
          selected={categoryFilter}
          onChange={setCategoryFilter}
          questionCounts={questionCounts}
        />
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
      </div>
    </main>
  );
}
