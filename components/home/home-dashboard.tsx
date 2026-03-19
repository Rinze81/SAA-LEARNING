"use client";

import { HomeHero } from "@/components/home/home-hero";
import { LearningPaths } from "@/components/home/learning-paths";
import { ProgressOverview } from "@/components/home/progress-overview";
import { TodayFocus } from "@/components/home/today-focus";
import { useHomeDashboard } from "@/lib/home/use-home-dashboard";

export function HomeDashboard() {
  const snapshot = useHomeDashboard();

  return (
    <main className="min-h-screen px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
        <HomeHero snapshot={snapshot} />
        <div className="grid gap-5 xl:grid-cols-[1.35fr_0.95fr]">
          <ProgressOverview snapshot={snapshot} />
          <LearningPaths snapshot={snapshot} />
        </div>
        <TodayFocus snapshot={snapshot} />
      </div>
    </main>
  );
}
