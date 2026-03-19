import { ReviewCard } from "@/components/review/review-card";
import { ReviewToolbar } from "@/components/review/review-toolbar";
import type { useReviewItems } from "@/lib/review/use-review-items";

type ReviewListProps = {
  review: ReturnType<typeof useReviewItems>;
};

export function ReviewList({ review }: ReviewListProps) {
  return (
    <section className="grid gap-4">
      <div className="flex items-center justify-between gap-4 rounded-[1.35rem] border border-slate-800 bg-slate-950/70 p-4 sm:p-5">
        <div>
          <p className="text-[11px] tracking-[0.18em] text-slate-500">復習一覧</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            気になる問題からそのまま見直せます。
          </p>
        </div>
        <button
          type="button"
          onClick={review.clearAll}
          className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-slate-800 px-4 text-sm text-slate-300 transition hover:bg-slate-900"
        >
          すべて削除
        </button>
      </div>

      <ReviewToolbar review={review} />

      {review.items.map((item) => (
        <ReviewCard
          key={item.record.questionId}
          item={item}
          onDismiss={() => review.dismiss(item.record.questionId)}
          onRetry={() => review.markRetried(item.record.questionId)}
        />
      ))}
    </section>
  );
}
