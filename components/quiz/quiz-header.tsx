import { ProgressBar } from "@/components/ui/progress-bar";
import { StatusChip } from "@/components/ui/status-chip";
import type { useQuizSession } from "@/lib/quiz/use-quiz-session";

type QuizHeaderProps = {
  session: ReturnType<typeof useQuizSession>;
};

export function QuizHeader({ session }: QuizHeaderProps) {
  return (
    <section className="rounded-[1.75rem] border border-slate-800 bg-slate-950 p-5 sm:p-7">
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="space-y-3">
          <p className="text-[11px] tracking-[0.24em] text-slate-500 sm:text-xs sm:tracking-[0.3em]">
            クイズ学習
          </p>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
              読む → 選ぶ → 理由を理解する
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-400 sm:text-[15px] sm:leading-7">
              今どこまで進んだかを見ながら、1問ずつ落ち着いて判断できる構成です。
            </p>
          </div>
        </div>

        <div className="grid gap-3 rounded-[1.35rem] border border-slate-800 bg-slate-900/60 p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <StatusChip
              label={`${session.currentIndex + 1} / ${session.totalQuestions} 問`}
              tone="accent"
            />
            <StatusChip label={session.question.modeLabel} />
            <StatusChip
              label={session.statusLabel}
              tone={
                session.isSubmitted
                  ? session.isCorrect
                    ? "success"
                    : "danger"
                  : "default"
              }
            />
          </div>
          <ProgressBar value={session.progressPercent} label="全体の進み具合" />
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[1.15rem] border border-slate-800 bg-slate-950/80 p-4">
              <p className="text-[11px] tracking-[0.16em] text-slate-500">現在のカテゴリ</p>
              <p className="mt-2 text-base font-medium text-slate-100">
                {session.question.category}
              </p>
            </div>
            <div className="rounded-[1.15rem] border border-slate-800 bg-slate-950/80 p-4">
              <p className="text-[11px] tracking-[0.16em] text-slate-500">ここまでの正解率</p>
              <p className="mt-2 text-base font-medium text-slate-100">
                {session.accuracyPercent}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
