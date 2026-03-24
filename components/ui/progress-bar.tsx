"use client";

import { useEffect, useState } from "react";

type ProgressBarProps = {
  value: number;
  max?: number;
  label?: string;
};

export function ProgressBar({ value, max = 100, label }: ProgressBarProps) {
  const safeMax = Math.max(max, 1);
  const target = Math.min(Math.max((value / safeMax) * 100, 0), 100);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // 1フレーム遅らせて CSS transition が firing するようにする
    const id = requestAnimationFrame(() => setWidth(target));
    return () => cancelAnimationFrame(id);
  }, [target]);

  return (
    <div className="space-y-2">
      {label ? (
        <div className="flex items-center justify-between gap-3 text-[11px] tracking-[0.16em] text-slate-400 sm:text-xs">
          <span>{label}</span>
          <span>{Math.round(target)}%</span>
        </div>
      ) : null}
      <div className="h-2 rounded-full bg-slate-900/90">
        <div
          className="h-full rounded-full bg-slate-200 transition-[width] duration-700 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
