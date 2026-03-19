import { SectionFrame } from "@/components/ui/section-frame";
import { StatusChip } from "@/components/ui/status-chip";
import type { QuizQuestion } from "@/lib/quiz/types";
import type { useQuizSession } from "@/lib/quiz/use-quiz-session";

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
      eyebrow="問題文"
      title="まずは要件を落ち着いて読む"
      description="サービス名を先に探すのではなく、何が求められているかを先に拾うための領域です。"
      aside={<StatusChip label={question.category} tone="accent" />}
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

        {session.isSubmitted ? (
          <div className="rounded-[1.2rem] border border-slate-800 bg-slate-900/45 p-4">
            <p className="text-[11px] tracking-[0.16em] text-slate-500">回答後の見方</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              正誤だけで終わらせず、なぜその選択肢になるかを右側で確認します。
            </p>
          </div>
        ) : null}
      </div>
    </SectionFrame>
  );
}
