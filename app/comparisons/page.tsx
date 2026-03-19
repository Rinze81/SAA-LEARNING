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
          title="似た AWS サービスの違いを、使いどころで理解する"
          description="SAA で迷いやすい比較テーマを、試験での見分け方まで含めてカードで整理しています。まずは違いを読み、そのあと問題演習で判断軸を確かめる流れに向いています。"
          aside={
            <Link
              href="/quiz"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-800 px-5 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5"
            >
              問題演習へ進む
            </Link>
          }
        >
          <div className="grid gap-3 sm:grid-cols-3">
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

            <div className="rounded-[1.15rem] border border-slate-800 bg-slate-900/55 p-4">
              <p className="text-[11px] tracking-[0.18em] text-slate-500 sm:text-xs">
                読み方
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                まず要約、次にサービスごとの差分、最後に試験での見分け方を見ると理解しやすくなります。
              </p>
            </div>

            <div className="rounded-[1.15rem] border border-slate-800 bg-slate-900/55 p-4">
              <p className="text-[11px] tracking-[0.18em] text-slate-500 sm:text-xs">
                次の学習
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                比較で整理したあとにクイズへ進むと、選択肢を切る理由が言語化しやすくなります。
              </p>
            </div>
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
