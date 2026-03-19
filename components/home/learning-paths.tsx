import Link from "next/link";
import { SectionFrame } from "@/components/ui/section-frame";
import type { HomeSnapshot } from "@/lib/home/types";

type LearningPathsProps = {
  snapshot: HomeSnapshot;
};

export function LearningPaths({ snapshot }: LearningPathsProps) {
  return (
    <SectionFrame
      eyebrow="学習ルート"
      title="今の理解に合わせて、学ぶ順番を選ぶ"
      description="用語の整理、比較での判断、優先クイズのどこからでも始められます。今の課題に合う流れを選んで学習を進めましょう。"
    >
      <div className="grid gap-4">
        {snapshot.paths.map((path, index) => (
          <Link
            key={path.key}
            href={path.href}
            className="group grid gap-4 rounded-[1.35rem] border border-slate-800 bg-slate-900/55 p-4 transition hover:border-slate-700 hover:bg-slate-900 sm:p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-[11px] tracking-[0.2em] text-slate-500 sm:text-xs sm:tracking-[0.24em]">
                  0{index + 1}
                </p>
                <h3 className="text-lg font-semibold text-slate-50 sm:text-xl">
                  {path.title}
                </h3>
              </div>
              <span className="rounded-full border border-slate-800 px-3 py-1 text-[11px] text-slate-300 sm:text-xs">
                {path.pace}
              </span>
            </div>

            <p className="text-sm leading-6 text-slate-400 sm:leading-7">{path.description}</p>

            <div className="grid gap-3 border-t border-slate-800 pt-4 sm:grid-cols-[1fr_auto] sm:items-end">
              <div className="space-y-1">
                <p className="text-[11px] tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-[0.22em]">
                  このルートがおすすめな理由
                </p>
                <p className="text-sm text-slate-200">{path.reason}</p>
              </div>
              <p className="text-sm font-medium text-slate-100 transition group-hover:translate-x-1">
                {path.cta}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </SectionFrame>
  );
}
