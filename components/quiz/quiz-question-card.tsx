import { SectionFrame } from "@/components/ui/section-frame";
import { StatusChip } from "@/components/ui/status-chip";
import type { Difficulty, QuizQuestion } from "@/lib/quiz/types";
import type { useQuizSession } from "@/lib/quiz/use-quiz-session";

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  basic: "基礎",
  standard: "標準",
  advanced: "応用",
};

const DIFFICULTY_CLASS: Record<Difficulty, string> = {
  basic: "border-slate-600 bg-slate-800/60 text-slate-400",
  standard: "border-sky-700/60 bg-sky-950/60 text-sky-400",
  advanced: "border-orange-700/60 bg-orange-950/60 text-orange-400",
};

type QuizQuestionCardProps = {
  question: QuizQuestion;
  session: ReturnType<typeof useQuizSession>;
};

export function QuizQuestionCard({
  question,
  session,
}: QuizQuestionCardProps) {
  return (
    <SectionFrame
      eyebrow="問題"
      aside={
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${DIFFICULTY_CLASS[question.difficulty]}`}
          >
            {DIFFICULTY_LABEL[question.difficulty]}
          </span>
          <StatusChip label={question.category} tone="accent" />
        </div>
      }
    >
      <div className="grid gap-4">
        {question.context ? (
          <div className="rounded-[1.2rem] border border-slate-800 bg-slate-900/55 p-4">
            <p className="text-[11px] tracking-[0.16em] text-slate-500">前提</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{question.context}</p>
          </div>
        ) : null}

        <div className="rounded-[1.35rem] border border-slate-800 bg-slate-950/80 p-5 sm:p-6">
          <p className="text-base leading-8 text-slate-100 sm:text-lg">
            {question.prompt}
          </p>
        </div>
      </div>
    </SectionFrame>
  );
}
