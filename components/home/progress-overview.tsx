import { ProgressBar } from "@/components/ui/progress-bar";
import { SectionFrame } from "@/components/ui/section-frame";
import type { HomeSnapshot } from "@/lib/home/types";

type ProgressOverviewProps = {
  snapshot: HomeSnapshot;
};

export function ProgressOverview({ snapshot }: ProgressOverviewProps) {
  return (
    <SectionFrame
      eyebrow="進み具合"
      title="進捗を、次の判断に使える形で見る"
      description="数字を並べるだけでなく、どこから手を付けると効率がいいかが見えるようにしています。"
      aside={
        <div className="rounded-full border border-slate-800 px-4 py-2 text-sm text-slate-300">
          学習時間 {snapshot.progress.studyHours}h
        </div>
      }
    >
      <div className="grid gap-4 sm:gap-5">
        <div className="grid gap-4 lg:grid-cols-[0.96fr_1.04fr]">
          <div className="rounded-[1.35rem] border border-slate-800 bg-slate-900/70 p-4 sm:p-5">
            <p className="text-sm leading-6 text-slate-400">
              苦手を先に戻せるように、判断に直結する指標をまとめています。
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {snapshot.progress.highlights.map((item) => (
                <div key={item.label} className="space-y-1.5">
                  <p className="text-[11px] tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-[0.22em]">
                    {item.label}
                  </p>
                  <p className="text-2xl font-semibold text-slate-100">
                    {item.value}
                  </p>
                  <p className="text-sm leading-6 text-slate-400">
                    {item.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 rounded-[1.35rem] border border-slate-800 bg-slate-900/50 p-4 sm:gap-4 sm:p-5">
            {snapshot.progress.bars.map((bar) => (
              <div
                key={bar.label}
                className="rounded-[1.1rem] border border-slate-800/80 bg-slate-950/45 p-3.5 sm:p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-200">{bar.label}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">{bar.caption}</p>
                  </div>
                  <span className="text-sm text-slate-300">{bar.value}%</span>
                </div>
                <div className="mt-3">
                  <ProgressBar value={bar.value} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
