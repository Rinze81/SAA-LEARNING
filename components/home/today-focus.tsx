import Link from "next/link";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SectionFrame } from "@/components/ui/section-frame";
import type { HomeSnapshot } from "@/lib/home/types";

type TodayFocusProps = {
  snapshot: HomeSnapshot;
  isHydrated: boolean;
};

export function TodayFocus({ snapshot, isHydrated }: TodayFocusProps) {
  const { focus } = snapshot;

  return (
    <SectionFrame
      eyebrow="今日の重点ポイント"
      title={`今日は ${focus.title}`}
      description={focus.description}
      aside={
        <Link
          href={focus.href}
          className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-800 px-5 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5"
        >
          ここから進める
        </Link>
      }
      className="bg-slate-900/60"
    >
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.35rem] border border-slate-800 bg-slate-950/75 p-4 sm:p-5">
          <p className="text-[11px] tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-[0.22em]">
            今これをやる理由
          </p>
          <p className="mt-2.5 text-base font-medium leading-7 text-slate-100 sm:text-lg">
            {focus.whyNow}
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {isHydrated
              ? focus.checkpoints.map((checkpoint) => (
                  <div
                    key={checkpoint.label}
                    className="rounded-[1.15rem] border border-slate-800 bg-slate-900/70 p-4"
                  >
                    <p className="text-[11px] tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-[0.22em]">
                      {checkpoint.label}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">
                      {checkpoint.value}
                    </p>
                  </div>
                ))
              : Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-[1.15rem] border border-slate-800 bg-slate-900/70 p-4"
                  >
                    <div className="h-3 w-16 rounded bg-slate-800" />
                    <div className="mt-3 h-10 rounded bg-slate-900" />
                  </div>
                ))}
          </div>
        </div>

        <div className="grid gap-4 rounded-[1.35rem] border border-slate-800 bg-slate-950/70 p-4 sm:p-5">
          <div>
            <p className="text-[11px] tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-[0.22em]">
              次の学習
            </p>
            <p className="mt-2.5 text-xl font-semibold text-slate-50 sm:text-2xl">
              {focus.stepTitle}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-400 sm:leading-7">
              {focus.stepDescription}
            </p>
          </div>
          <ProgressBar value={focus.readiness} label="理解の準備度" />
          <ol className="grid gap-3">
            {isHydrated
              ? focus.actions.map((action, index) => (
                  <li
                    key={action}
                    className="grid grid-cols-[auto_1fr] gap-3 rounded-[1.15rem] border border-slate-800 bg-slate-900/50 p-3.5 sm:p-4"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-sm text-slate-300">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-6 text-slate-200">{action}</p>
                  </li>
                ))
              : Array.from({ length: 3 }).map((_, index) => (
                  <li
                    key={index}
                    className="grid grid-cols-[auto_1fr] gap-3 rounded-[1.15rem] border border-slate-800 bg-slate-900/50 p-3.5 sm:p-4"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-sm text-slate-300">
                      {index + 1}
                    </span>
                    <div className="mt-1 h-5 rounded bg-slate-900" />
                  </li>
                ))}
          </ol>
        </div>
      </div>
    </SectionFrame>
  );
}
