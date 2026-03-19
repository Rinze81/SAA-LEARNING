import Link from "next/link";
import { StatusChip } from "@/components/ui/status-chip";
import type { QuizQuestion } from "@/lib/quiz/types";
import type { ReviewRecord } from "@/lib/review/types";

type ReviewCardItem = {
  record: ReviewRecord;
  question: QuizQuestion;
  selectedChoice?: QuizQuestion["choices"][number];
  correctChoice?: QuizQuestion["choices"][number];
};

type ReviewCardProps = {
  item: ReviewCardItem;
  onDismiss: () => void;
  onRetry: () => void;
};

function summarizePrompt(prompt: string) {
  return prompt.length > 88 ? `${prompt.slice(0, 88)}...` : prompt;
}

function getStatusLabel(status: ReviewRecord["status"]) {
  return status === "retried" ? "再挑戦済み" : "未復習";
}

function getStatusTone(status: ReviewRecord["status"]) {
  return status === "retried" ? "success" : "default";
}

export function ReviewCard({ item, onDismiss, onRetry }: ReviewCardProps) {
  return (
    <article className="rounded-[1.5rem] border border-slate-800 bg-slate-950/75 p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <StatusChip label={item.question.category} tone="accent" />
            <StatusChip label={getStatusLabel(item.record.status)} tone={getStatusTone(item.record.status)} />
          </div>

          <div className="rounded-[1.25rem] border border-slate-800 bg-slate-900/55 p-4">
            <p className="text-[11px] tracking-[0.18em] text-slate-500">問題</p>
            <p className="mt-2 text-sm leading-7 text-slate-100">
              {summarizePrompt(item.question.prompt)}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.2rem] border border-rose-900/60 bg-rose-950/25 p-4">
              <p className="text-[11px] tracking-[0.18em] text-rose-200">選んだ答え</p>
              <p className="mt-2 text-sm leading-6 text-slate-100">
                {item.selectedChoice
                  ? `${item.selectedChoice.label}. ${item.selectedChoice.text}`
                  : "未回答で保存"}
              </p>
            </div>
            <div className="rounded-[1.2rem] border border-emerald-900/60 bg-emerald-950/25 p-4">
              <p className="text-[11px] tracking-[0.18em] text-emerald-200">正解</p>
              <p className="mt-2 text-sm leading-6 text-slate-100">
                {item.correctChoice
                  ? `${item.correctChoice.label}. ${item.correctChoice.text}`
                  : "正解を確認できません"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[1.25rem] border border-slate-800 bg-slate-900/45 p-4">
            <p className="text-[11px] tracking-[0.18em] text-slate-500">迷いやすい点</p>
            <p className="mt-2 text-sm leading-7 text-slate-200">
              {item.question.comparePoint}
            </p>
          </div>

          <div className="rounded-[1.25rem] border border-slate-800 bg-slate-900/45 p-4">
            <p className="text-[11px] tracking-[0.18em] text-slate-500">判断の軸</p>
            <p className="mt-2 text-sm leading-7 text-slate-200">
              {item.question.rememberAxis}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href={`/quiz?questionId=${item.record.questionId}`}
              onClick={onRetry}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-slate-100 px-5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
            >
              再挑戦する
            </Link>
            <button
              type="button"
              onClick={onDismiss}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-800 px-5 text-sm font-semibold text-slate-100 transition hover:bg-slate-900"
            >
              一覧から外す
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
