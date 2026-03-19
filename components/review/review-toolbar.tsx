import type { useReviewItems } from "@/lib/review/use-review-items";

type ReviewToolbarProps = {
  review: ReturnType<typeof useReviewItems>;
};

export function ReviewToolbar({ review }: ReviewToolbarProps) {
  return (
    <section className="grid gap-3 rounded-[1.35rem] border border-slate-800 bg-slate-950/70 p-4 sm:p-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="grid gap-2 text-sm text-slate-300">
          <span className="text-[11px] tracking-[0.16em] text-slate-500">並び順</span>
          <select
            value={review.sort}
            onChange={(event) => review.setSort(event.target.value as "newest" | "oldest")}
            className="min-h-[44px] rounded-2xl border border-slate-800 bg-slate-900 px-3 text-sm text-slate-100 outline-none"
          >
            <option value="newest">新しい順</option>
            <option value="oldest">古い順</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm text-slate-300">
          <span className="text-[11px] tracking-[0.16em] text-slate-500">状態</span>
          <select
            value={review.statusFilter}
            onChange={(event) => review.setStatusFilter(event.target.value as "all" | "pending")}
            className="min-h-[44px] rounded-2xl border border-slate-800 bg-slate-900 px-3 text-sm text-slate-100 outline-none"
          >
            <option value="all">すべて</option>
            <option value="pending">未復習のみ</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm text-slate-300">
          <span className="text-[11px] tracking-[0.16em] text-slate-500">カテゴリ</span>
          <select
            value={review.categoryFilter}
            onChange={(event) => review.setCategoryFilter(event.target.value)}
            className="min-h-[44px] rounded-2xl border border-slate-800 bg-slate-900 px-3 text-sm text-slate-100 outline-none"
          >
            <option value="all">すべて</option>
            {review.categories.map((category) => (
              <option key={category.label} value={category.label}>
                {category.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
