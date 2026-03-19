import Link from "next/link";
import { SectionFrame } from "@/components/ui/section-frame";

export function ReviewEmptyState() {
  return (
    <SectionFrame
      eyebrow="復習"
      title="復習する問題はまだありません"
      description="クイズで間違えた問題がここに表示されます。"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/quiz"
          className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-slate-100 px-5 text-sm font-semibold text-slate-950"
        >
          クイズへ戻る
        </Link>
        <Link
          href="/comparisons"
          className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-slate-800 px-5 text-sm font-semibold text-slate-100"
        >
          比較を見る
        </Link>
      </div>
    </SectionFrame>
  );
}
