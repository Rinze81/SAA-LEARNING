import { SectionFrame } from "@/components/ui/section-frame";
import { StatusChip } from "@/components/ui/status-chip";
import type { useReviewItems } from "@/lib/review/use-review-items";

type ReviewHeaderProps = {
  review: ReturnType<typeof useReviewItems>;
};

export function ReviewHeader({ review }: ReviewHeaderProps) {
  return (
    <SectionFrame
      eyebrow="復習"
      title="間違えた問題を見直す"
      description="選んだ答えと正解を並べて確認します。"
      aside={
        <div className="flex flex-wrap items-center gap-2">
          <StatusChip
            label={`${review.totalCount} 件`}
            tone={review.hasItems ? "accent" : "default"}
          />
          <StatusChip label={`未復習 ${review.pendingCount} 件`} />
        </div>
      }
    >
      <div className="flex flex-wrap gap-2">
        {review.categories.slice(0, 4).map((category) => (
          <StatusChip
            key={category.label}
            label={`${category.label} ${category.count}`}
            tone="default"
          />
        ))}
      </div>
    </SectionFrame>
  );
}
