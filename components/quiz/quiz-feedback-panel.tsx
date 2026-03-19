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
        title="解答後に、正誤と判断軸をまとめて確認します"
        description="回答すると、正誤だけでなく解説、比較ポイント、覚える軸までまとめて表示します。"
      >
        <div className="grid gap-4">
          <div className="rounded-[1.25rem] border border-slate-800 bg-slate-900/55 p-4 sm:p-5">
            <p className="text-[11px] tracking-[0.16em] text-slate-500">解答後に確認できること</p>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-300">
              <li>正解かどうか</li>
              <li>自分の回答と正答の違い</li>
              <li>なぜその選択肢になるのかの解説</li>
              <li>次に使える比較ポイント</li>
            </ul>
          </div>
          <div className="rounded-[1.25rem] border border-slate-800 bg-slate-950/70 p-4 sm:p-5">
            <p className="text-sm leading-6 text-slate-400">
              まずは一度選んでから回答すると、解説の理解がはっきり深まります。
            </p>
          </div>
        </div>
      </SectionFrame>
    );
  }

  return (
    <SectionFrame
      eyebrow="解説"
      title={session.isCorrect ? "正解です。判断軸もあわせて確認しましょう" : "不正解です。比較の視点をここで整理しましょう"}
      description="正解だった場合も、なぜそれが最適かまで確認しておくと、次の問題での再現性が高まります。"
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
            <p className="text-[11px] tracking-[0.16em] text-slate-500">あなたの回答</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">
              {session.selectedChoice?.label}. {session.selectedChoice?.text}
            </p>
          </div>
          <div className="rounded-[1.2rem] border border-slate-800 bg-slate-900/55 p-4">
            <p className="text-[11px] tracking-[0.16em] text-slate-500">正答</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">
              {session.correctChoice?.label}. {session.correctChoice?.text}
            </p>
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-slate-800 bg-slate-900/55 p-4 sm:p-5">
          <p className="text-[11px] tracking-[0.16em] text-slate-500">解説</p>
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
