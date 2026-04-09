import Link from "next/link";
import { ComparisonCard } from "@/components/study/comparison-card";
import { SectionFrame } from "@/components/ui/section-frame";
import { comparisonItems } from "@/lib/study/comparisons";

export default function ComparisonsPage() {
  return (
    <main className="min-h-screen px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5">
        <SectionFrame
          eyebrow="サービス比較"
          title="サービス比較"
          aside={
            <Link
              href="/quiz"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-800 px-5 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5"
            >
              問題演習へ進む
            </Link>
          }
        >
          <div className="rounded-[1.15rem] border border-slate-800 bg-slate-900/55 p-4">
            <p className="text-[11px] tracking-[0.18em] text-slate-500 sm:text-xs">
              比較テーマ数
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-100">
              {comparisonItems.length}
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              SAA で頻出の使い分けを優先しています。
            </p>
          </div>
        </SectionFrame>

        <section className="grid gap-4">
          {comparisonItems.map((item) => (
            <ComparisonCard key={item.id} item={item} />
          ))}
        </section>
      </div>
    </main>
  );
}
