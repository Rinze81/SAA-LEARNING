"use client";

import { ReviewEmptyState } from "@/components/review/review-empty-state";
import { ReviewHeader } from "@/components/review/review-header";
import { ReviewList } from "@/components/review/review-list";
import { useReviewItems } from "@/lib/review/use-review-items";

export function ReviewBoard() {
  const review = useReviewItems();

  return (
    <main className="min-h-screen px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-5">
        <ReviewHeader review={review} />
        {review.hasItems ? <ReviewList review={review} /> : <ReviewEmptyState />}
      </div>
    </main>
  );
}
