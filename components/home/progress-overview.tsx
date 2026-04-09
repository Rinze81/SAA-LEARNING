"use client";

import { useEffect, useState } from "react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SectionFrame } from "@/components/ui/section-frame";
import type { CategoryStat, HomeSnapshot } from "@/lib/home/types";

type ProgressOverviewProps = {
  snapshot: HomeSnapshot;
  isHydrated: boolean;
};

export function ProgressOverview({ snapshot, isHydrated }: ProgressOverviewProps) {
  return (
    <SectionFrame
      eyebrow="学習の進み具合"
      title="進捗"
      aside={
        <div className="rounded-full border border-slate-800 px-4 py-2 text-sm text-slate-300">
          学習時間 {snapshot.progress.studyHours}h
        </div>
      }
    >
      <div className="grid gap-4 sm:gap-5">
        <div className="grid gap-4 lg:grid-cols-[0.96fr_1.04fr]">
          <div className="rounded-[1.35rem] border border-slate-800 bg-slate-900/70 p-4 sm:p-5">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
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

        {/* カテゴリ別正解率グラフ */}
        <CategoryAccuracyChart stats={snapshot.categoryStats} isHydrated={isHydrated} />
      </div>
    </SectionFrame>
  );
}

type CategoryAccuracyChartProps = {
  stats: CategoryStat[];
  isHydrated: boolean;
};

function CategoryAccuracyChart({ stats, isHydrated }: CategoryAccuracyChartProps) {
  return (
    <div className="rounded-[1.35rem] border border-slate-800 bg-slate-900/50 p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-[0.22em]">
            カテゴリ別正解率
          </p>
          <p className="mt-1 text-sm font-medium text-slate-200">
            分野ごとの習熟度
          </p>
        </div>
        <AccuracyLegend />
      </div>

      {!isHydrated ? (
        <SkeletonBars />
      ) : stats.length === 0 ? (
        <p className="py-4 text-center text-sm text-slate-500">
          問題を解くとカテゴリ別の正解率が表示されます
        </p>
      ) : (
        <div className="grid gap-3">
          {stats.map((stat, i) => (
            <CategoryBar key={stat.category} stat={stat} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryBar({ stat, index }: { stat: CategoryStat; index: number }) {
  const { category, accuracy, unattemptedCount } = stat;
  const hasAttempts = accuracy !== null;
  const barValue = accuracy ?? 0;

  const [width, setWidth] = useState(0);

  useEffect(() => {
    // インデックスに応じてカスケード遅延（100ms × index）
    const id = setTimeout(
      () => requestAnimationFrame(() => setWidth(barValue)),
      index * 100,
    );
    return () => clearTimeout(id);
  }, [barValue, index]);

  const barColor =
    !hasAttempts
      ? "bg-slate-700"
      : barValue >= 70
        ? "bg-emerald-500"
        : barValue >= 40
          ? "bg-amber-400"
          : "bg-rose-500";

  const textColor =
    !hasAttempts
      ? "text-slate-500"
      : barValue >= 70
        ? "text-emerald-400"
        : barValue >= 40
          ? "text-amber-400"
          : "text-rose-400";

  return (
    <div className="rounded-[1.1rem] border border-slate-800/80 bg-slate-950/45 p-3.5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-slate-200">{category}</p>
            {unattemptedCount > 0 && (
              <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[11px] text-slate-500">
                未着手 {unattemptedCount}問
              </span>
            )}
          </div>
        </div>
        <span className={`shrink-0 text-sm font-semibold ${textColor}`}>
          {hasAttempts ? `${barValue}%` : "未回答"}
        </span>
      </div>
      <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full transition-[width] duration-700 ease-out ${barColor}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function AccuracyLegend() {
  return (
    <div className="flex items-center gap-3">
      {[
        { color: "bg-emerald-500", label: "70%+" },
        { color: "bg-amber-400", label: "40%+" },
        { color: "bg-rose-500", label: "〜39%" },
      ].map(({ color, label }) => (
        <div key={label} className="flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full ${color}`} />
          <span className="text-[11px] text-slate-500">{label}</span>
        </div>
      ))}
    </div>
  );
}

function SkeletonBars() {
  return (
    <div className="grid gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-[1.1rem] border border-slate-800/80 bg-slate-950/45 p-3.5"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="h-4 w-24 animate-pulse rounded bg-slate-800" />
            <div className="h-4 w-10 animate-pulse rounded bg-slate-800" />
          </div>
          <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full animate-pulse rounded-full bg-slate-700"
              style={{ width: `${40 + i * 15}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
