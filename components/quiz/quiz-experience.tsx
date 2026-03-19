"use client";

import { QuizFeedbackPanel } from "@/components/quiz/quiz-feedback-panel";
import { QuizFooterActions } from "@/components/quiz/quiz-footer-actions";
import { QuizHeader } from "@/components/quiz/quiz-header";
import { QuizOptions } from "@/components/quiz/quiz-options";
import { QuizQuestionCard } from "@/components/quiz/quiz-question-card";
import { useQuizSession } from "@/lib/quiz/use-quiz-session";

type QuizExperienceProps = {
  initialQuestionId?: string;
};

export function QuizExperience({ initialQuestionId }: QuizExperienceProps) {
  const session = useQuizSession({ initialQuestionId });

  return (
    <main className="min-h-screen px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
        <QuizHeader session={session} />
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
