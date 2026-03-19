import { SectionFrame } from "@/components/ui/section-frame";
import { StatusChip } from "@/components/ui/status-chip";
import type { useQuizSession } from "@/lib/quiz/use-quiz-session";

type QuizFeedbackPanelProps = {
  session: ReturnType<typeof useQuizSession>;
};

export function QuizFeedbackPanel({ session }: QuizFeedbackPanelProps) {
  if (!session.isSubmitted) {
    return (
      <SectionFrame
        eyebrow="解説"
        title="回答後に、正誤と判断理由をまとめて確認する"
        description="提出すると、自分の回答と正解の差、それが起きた理由、次に使う判断軸がここに並びます。"
      >
        <div className="grid gap-4">
          <div className="rounded-[1.25rem] border border-slate-800 bg-slate-900/55 p-4 sm:p-5">
            <p className="text-[11px] tracking-[0.16em] text-slate-500">提出後に見えるもの</p>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-300">
              <li>自分の回答と正解</li>
              <li>なぜその答えなのか</li>
              <li>似た選択肢とどう違うか</li>
              <li>次に迷わないための判断軸</li>
            </ul>
          </div>
          <div className="rounded-[1.25rem] border border-slate-800 bg-slate-950/70 p-4 sm:p-5">
            <p className="text-sm leading-6 text-slate-400">
              まずは条件に合うと思う選択肢を一つ選び、提出してから理由の差を整理します。
            </p>
          </div>
        </div>
      </SectionFrame>
    );
  }

  return (
    <SectionFrame
      eyebrow="解説"
      title={session.isCorrect ? "正解です。判断軸を言葉にして残す" : "不正解です。迷った理由をここで修正する"}
      description="正誤だけで終わらず、次の問題にも使える比較軸として持ち帰れる形にしています。"
      aside={
        <StatusChip
          label={session.isCorrect ? "正解" : "不正解"}
          tone={session.isCorrect ? "success" : "danger"}
        />
      }
    >
      <div className="grid gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.2rem] border border-slate-800 bg-slate-900/55 p-4">
            <p className="text-[11px] tracking-[0.16em] text-slate-500">自分の回答</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">
              {session.selectedChoice?.label}. {session.selectedChoice?.text}
            </p>
          </div>
          <div className="rounded-[1.2rem] border border-slate-800 bg-slate-900/55 p-4">
            <p className="text-[11px] tracking-[0.16em] text-slate-500">正解</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">
              {session.correctChoice?.label}. {session.correctChoice?.text}
            </p>
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-slate-800 bg-slate-900/55 p-4 sm:p-5">
          <p className="text-[11px] tracking-[0.16em] text-slate-500">なぜその答えか</p>
          <p className="mt-2 text-sm leading-7 text-slate-200">
            {session.question.explanation}
          </p>
        </div>

        <div className="rounded-[1.25rem] border border-slate-800 bg-slate-950/70 p-4 sm:p-5">
          <p className="text-[11px] tracking-[0.16em] text-slate-500">比較ポイント</p>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            {session.question.comparePoint}
          </p>
        </div>

        <div className="rounded-[1.25rem] border border-slate-800 bg-slate-950/70 p-4 sm:p-5">
          <p className="text-[11px] tracking-[0.16em] text-slate-500">覚える軸</p>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            {session.question.rememberAxis}
          </p>
        </div>
      </div>
    </SectionFrame>
  );
}
