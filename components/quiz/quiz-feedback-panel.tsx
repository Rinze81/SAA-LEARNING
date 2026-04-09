import Link from "next/link";
import { SectionFrame } from "@/components/ui/section-frame";
import { StatusChip } from "@/components/ui/status-chip";
import { questionRelatedTerms } from "@/lib/quiz/related-terms";
import { studyTerms } from "@/lib/study/terms";
import type { useQuizSession } from "@/lib/quiz/use-quiz-session";

type QuizFeedbackPanelProps = {
  session: ReturnType<typeof useQuizSession>;
};

function CheckCircleIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function XCircleIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export function QuizFeedbackPanel({ session }: QuizFeedbackPanelProps) {
  if (!session.isSubmitted) {
    return (
      <SectionFrame eyebrow="解説">
        <div className="rounded-[1.25rem] border border-dashed border-slate-800 bg-slate-950/60 p-6 text-center text-sm text-slate-500">
          選択肢を選んで回答すると、解説・比較ポイント・覚える軸が表示されます。
        </div>
      </SectionFrame>
    );
  }

  const isCorrect = session.isCorrect;

  const relatedTermList = (questionRelatedTerms[session.question.id] ?? [])
    .map((id) => studyTerms.find((t) => t.id === id))
    .filter((t): t is (typeof studyTerms)[number] => t !== undefined);

  return (
    <section
      className={`rounded-[1.75rem] border p-5 backdrop-blur sm:rounded-[2rem] sm:p-7 ${
        isCorrect
          ? "border-emerald-800/50 bg-emerald-950/20"
          : "border-rose-800/50 bg-rose-950/15"
      }`}
    >
      <div className="flex flex-col gap-5">
        {/* ── ヘッダー ── */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                isCorrect
                  ? "bg-emerald-900/60 text-emerald-300"
                  : "bg-rose-900/60 text-rose-300"
              }`}
            >
              {isCorrect ? <CheckCircleIcon /> : <XCircleIcon />}
            </div>
            <div>
              <p className="text-[11px] tracking-[0.22em] text-slate-500">解説</p>
              <h2
                className={`text-xl font-semibold tracking-tight sm:text-2xl ${
                  isCorrect ? "text-emerald-100" : "text-rose-100"
                }`}
              >
                {isCorrect ? "正解です" : "不正解です"}
              </h2>
            </div>
          </div>
          <StatusChip
            label={isCorrect ? "正解" : "不正解"}
            tone={isCorrect ? "success" : "danger"}
          />
        </div>

        {/* ── 回答比較 ── */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div
            className={`rounded-[1.2rem] border p-4 ${
              isCorrect
                ? "border-emerald-800/40 bg-emerald-950/30"
                : "border-rose-800/40 bg-rose-950/25"
            }`}
          >
            <p className="text-[11px] tracking-[0.16em] text-slate-500">あなたの回答</p>
            <p className={`mt-2 text-sm font-medium leading-6 ${isCorrect ? "text-emerald-200" : "text-rose-200"}`}>
              {session.selectedChoice?.label}. {session.selectedChoice?.text}
            </p>
          </div>
          <div className="rounded-[1.2rem] border border-slate-700/60 bg-slate-900/55 p-4">
            <p className="text-[11px] tracking-[0.16em] text-slate-500">正答</p>
            <p className="mt-2 text-sm font-medium leading-6 text-emerald-200">
              {session.correctChoice?.label}. {session.correctChoice?.text}
            </p>
          </div>
        </div>

        {/* ── 解説 ── */}
        <div className="rounded-[1.25rem] border border-slate-800 bg-slate-900/55 p-4 sm:p-5">
          <p className="text-[11px] tracking-[0.16em] text-slate-500">解説</p>
          <p className="mt-2 text-sm leading-7 text-slate-200">
            {session.question.explanation}
          </p>
        </div>

        {/* ── 比較ポイント ── */}
        <div className="rounded-[1.25rem] border border-slate-800 bg-slate-950/70 p-4 sm:p-5">
          <p className="text-[11px] tracking-[0.16em] text-slate-500">比較ポイント</p>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            {session.question.comparePoint}
          </p>
        </div>

        {/* ── 覚える軸 ── */}
        <div className="rounded-[1.25rem] border border-slate-800 bg-slate-950/70 p-4 sm:p-5">
          <p className="text-[11px] tracking-[0.16em] text-slate-500">覚える軸</p>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            {session.question.rememberAxis}
          </p>
        </div>

        {/* ── 関連用語（不正解時のみ） ── */}
        {!isCorrect && relatedTermList.length > 0 ? (
          <div className="rounded-[1.25rem] border border-slate-800 bg-slate-950/70 p-4 sm:p-5">
            <p className="text-[11px] tracking-[0.16em] text-slate-500">この用語を確認する</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {relatedTermList.map((term) => (
                <Link
                  key={term.id}
                  href={`/terms?termId=${term.id}`}
                  className="inline-flex min-h-[36px] items-center rounded-full border border-sky-900/45 bg-sky-950/30 px-3 py-1 text-xs text-sky-200 transition hover:border-sky-700 hover:text-sky-100"
                >
                  {term.name}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
