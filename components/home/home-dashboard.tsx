"use client";

import { HomeHero } from "@/components/home/home-hero";
import { LearningPaths } from "@/components/home/learning-paths";
import { ProgressOverview } from "@/components/home/progress-overview";
import { TodayFocus } from "@/components/home/today-focus";
import { useHomeDashboard } from "@/lib/home/use-home-dashboard";

export function HomeDashboard() {
  const { snapshot, isHydrated } = useHomeDashboard();

  return (
    <main className="min-h-screen px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
        <HomeHero snapshot={snapshot} isHydrated={isHydrated} />
        {isHydrated && snapshot.weakCategories.length > 0 ? (
          <section className="grid gap-3 rounded-[1.5rem] border border-slate-800 bg-slate-950/75 p-4 sm:grid-cols-3 sm:p-5">
            {snapshot.weakCategories.map((item, index) => (
              <div
                key={item.category}
                className="rounded-[1.15rem] border border-slate-800 bg-slate-900/55 p-4"
              >
                <p className="text-[11px] tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-[0.22em]">
                  弱点 {index + 1}
                </p>
                <p className="mt-2 text-base font-medium text-slate-100">
                  {item.category}
                </p>
                <p className="mt-1.5 text-sm leading-6 text-slate-400">
                  {item.detail}
                </p>
              </div>
            ))}
          </section>
        ) : (
          <section className="grid gap-3 rounded-[1.5rem] border border-slate-800 bg-slate-950/75 p-4 sm:grid-cols-3 sm:p-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-[1.15rem] border border-slate-800 bg-slate-900/55 p-4"
              >
                <div className="h-3 w-16 rounded bg-slate-800" />
                <div className="mt-3 h-5 w-24 rounded bg-slate-800" />
                <div className="mt-2 h-4 w-32 rounded bg-slate-900" />
              </div>
            ))}
          </section>
        )}
        <div className="grid gap-5 xl:grid-cols-[1.35fr_0.95fr]">
          <ProgressOverview snapshot={snapshot} isHydrated={isHydrated} />
          <LearningPaths snapshot={snapshot} />
        </div>
        <TodayFocus snapshot={snapshot} isHydrated={isHydrated} />
      </div>
    </main>
  );
}
