import { ActionLink } from "@/components/ui/action-link";
import { ProgressBar } from "@/components/ui/progress-bar";
import type { HomeSnapshot } from "@/lib/home/types";

type HomeHeroProps = {
  snapshot: HomeSnapshot;
};

export function HomeHero({ snapshot }: HomeHeroProps) {
  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-950 sm:rounded-[2rem]">
      <div className="grid gap-6 p-5 sm:gap-7 sm:p-7 lg:grid-cols-[1.25fr_0.75fr] lg:p-10">
        <div className="space-y-6 sm:space-y-7">
          <div className="space-y-3">
            <p className="text-[11px] tracking-[0.24em] text-slate-500 sm:text-xs sm:tracking-[0.3em]">
              学習を止めずに再開する
            </p>
            <div className="space-y-2.5">
              <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
                次にやることが、開いた瞬間にわかるホーム。
              </h1>
              <p className="max-w-xl text-sm leading-6 text-slate-400 sm:text-[15px] sm:leading-7">
                まず優先アクション、そのあとに進み具合と学習モードを確認できる構成です。
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <div className="rounded-[1.35rem] border border-slate-800 bg-slate-900/70 p-4 sm:p-5">
              <p className="text-[11px] tracking-[0.2em] text-slate-500 sm:text-xs sm:tracking-[0.24em]">
                次にやること
              </p>
              <p className="mt-2.5 text-lg font-medium leading-7 text-slate-100 sm:text-[1.35rem]">
                {snapshot.hero.primaryLabel}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {snapshot.hero.primaryDescription}
              </p>
            </div>
            <div className="grid gap-3 sm:min-w-[11rem]">
              <ActionLink
                href={snapshot.hero.primaryHref}
                label="学習を再開"
                className="w-full"
              >
                このまま始める
              </ActionLink>
              <ActionLink
                href={snapshot.hero.secondaryHref}
                label="前回の場所を見る"
                tone="muted"
                className="w-full"
              >
                前回の続きへ
              </ActionLink>
            </div>
          </div>
        </div>

        <div className="grid gap-4 self-stretch rounded-[1.5rem] border border-slate-800 bg-slate-900/60 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] tracking-[0.2em] text-slate-500 sm:text-xs sm:tracking-[0.24em]">
                現在地
              </p>
              <p className="mt-2.5 text-4xl font-semibold text-slate-50 sm:text-[2.5rem]">
                {snapshot.progress.overallPercent}%
              </p>
            </div>
            <p className="max-w-[8.5rem] text-right text-sm leading-6 text-slate-400 sm:max-w-[10rem]">
              {snapshot.progress.completedTopics} / {snapshot.progress.totalTopics}
              {" "}テーマ完了
            </p>
          </div>

          <ProgressBar
            value={snapshot.progress.overallPercent}
            label="仕上がりの目安"
          />

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {snapshot.hero.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[1.2rem] border border-slate-800 bg-slate-950/80 p-4"
              >
                <p className="text-[11px] tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-[0.22em]">
                  {metric.label}
                </p>
                <p className="mt-2.5 text-2xl font-semibold text-slate-100">
                  {metric.value}
                </p>
                <p className="mt-1.5 text-sm leading-6 text-slate-400">
                  {metric.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
