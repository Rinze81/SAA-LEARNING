import Link from "next/link";
import type { useQuizSession } from "@/lib/quiz/use-quiz-session";

type QuizFooterActionsProps = {
  session: ReturnType<typeof useQuizSession>;
};

export function QuizFooterActions({ session }: QuizFooterActionsProps) {
  const canSendToReview = session.isSubmitted || Boolean(session.selectedChoiceId);

  return (
    <section className="rounded-[1.5rem] border border-slate-800 bg-slate-950/85 p-4 sm:p-5">
      <div className="grid gap-4">
        <div className="rounded-[1.2rem] border border-slate-800 bg-slate-900/45 p-4">
          <p className="text-[11px] tracking-[0.16em] text-slate-500">次のアクション</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {session.isSubmitted
              ? "解説まで確認できたら、次の問題へ進むか、復習リストに追加して後で見直せます。"
              : "選択肢を一つ選んで回答すると、解説と比較ポイントを確認できます。"}
          </p>
        </div>

        <div className="grid gap-3">
          <button
            type="button"
            onClick={session.isSubmitted ? session.goToNextQuestion : session.submitAnswer}
            disabled={!session.isSubmitted && !session.selectedChoiceId}
            className="inline-flex min-h-[54px] items-center justify-center rounded-full bg-slate-100 px-5 text-sm font-semibold text-slate-950 transition disabled:cursor-not-allowed disabled:opacity-40"
          >
            {session.isSubmitted
              ? session.currentIndex === session.totalQuestions - 1
                ? "もう一周する"
                : "次の問題へ"
              : "この回答で提出する"}
          </button>

          <button
            type="button"
            onClick={session.toggleReview}
            disabled={!canSendToReview}
            className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-slate-800 px-5 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {session.isMarkedForReview ? "復習リストから外す" : "復習リストに追加"}
          </button>
        </div>

        <div className="grid gap-2 border-t border-slate-800 pt-4 sm:grid-cols-3">
          <Link
            href="/"
            className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-slate-800 px-4 text-sm text-slate-300 transition hover:bg-slate-900"
          >
            ホームへ戻る
          </Link>
          <Link
            href="/comparisons"
            className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-slate-800 px-4 text-sm text-slate-300 transition hover:bg-slate-900"
          >
            比較表を見る
          </Link>
          <Link
            href="/review"
            className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-slate-800 px-4 text-sm text-slate-300 transition hover:bg-slate-900"
          >
            復習リストを開く
          </Link>
        </div>
      </div>
    </section>
  );
}
