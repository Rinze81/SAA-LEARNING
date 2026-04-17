"use client";

import { useMemo, useState } from "react";
import type { QuizAttemptRecord } from "@/lib/study/types";

type Props = {
  attempts: QuizAttemptRecord[];
};

const DAYS = 90;
const WEEKS = Math.ceil(DAYS / 7);

const DAY_LABELS = ["日", "月", "火", "水", "木", "金", "土"];

function getColorClass(count: number): string {
  if (count === 0) return "bg-slate-800";
  if (count <= 4) return "bg-emerald-900";
  if (count <= 9) return "bg-emerald-700";
  if (count <= 19) return "bg-emerald-500";
  return "bg-emerald-400";
}

function formatDateJa(date: Date): string {
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

function toLocalDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function ActivityHeatmap({ attempts }: Props) {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  // Build date → count map
  const countByDay = useMemo(() => {
    const map = new Map<string, number>();
    for (const attempt of attempts) {
      const key = toLocalDateKey(new Date(attempt.timestamp));
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    return map;
  }, [attempts]);

  // Build the 90-day grid (Sunday-aligned weeks, oldest → newest left to right)
  const { grid, weekMonthLabels } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Go back 90 days, then rewind to the nearest Sunday on-or-before
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - (DAYS - 1));
    const startDay = startDate.getDay(); // 0=Sun
    startDate.setDate(startDate.getDate() - startDay); // rewind to Sunday

    const totalDays = Math.round(
      (today.getTime() - startDate.getTime()) / 86400000
    ) + 1;
    const totalWeeks = Math.ceil(totalDays / 7);

    // columns = weeks, rows = 0..6 (Sun..Sat)
    const cols: Array<Array<{ date: Date; count: number; isFuture: boolean } | null>> = [];
    for (let w = 0; w < totalWeeks; w++) {
      const col: Array<{ date: Date; count: number; isFuture: boolean } | null> = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + w * 7 + d);
        const isFuture = date > today;
        const isBeforeWindow =
          date < new Date(today.getTime() - (DAYS - 1) * 86400000);
        if (isBeforeWindow || isFuture) {
          col.push(null);
        } else {
          const key = toLocalDateKey(date);
          col.push({ date, count: countByDay.get(key) ?? 0, isFuture: false });
        }
      }
      cols.push(col);
    }

    // Month labels: show month name when it changes across the grid
    const labels: Array<{ week: number; label: string }> = [];
    let lastMonth = -1;
    for (let w = 0; w < cols.length; w++) {
      const firstCell = cols[w].find((c) => c !== null);
      if (firstCell) {
        const m = firstCell.date.getMonth();
        if (m !== lastMonth) {
          labels.push({ week: w, label: `${m + 1}月` });
          lastMonth = m;
        }
      }
    }

    return { grid: cols, weekMonthLabels: labels };
  }, [countByDay]);

  // Streak: count consecutive days ending today with at least 1 attempt
  const streak = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let days = 0;
    let cursor = new Date(today);
    while (true) {
      const key = toLocalDateKey(cursor);
      if ((countByDay.get(key) ?? 0) === 0) break;
      days++;
      cursor.setDate(cursor.getDate() - 1);
    }
    return days;
  }, [countByDay]);

  // Total in last 90 days
  const total = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const cutoff = new Date(today);
    cutoff.setDate(today.getDate() - (DAYS - 1));
    let sum = 0;
    for (const attempt of attempts) {
      const d = new Date(attempt.timestamp);
      d.setHours(0, 0, 0, 0);
      if (d >= cutoff && d <= today) sum++;
    }
    return sum;
  }, [attempts]);

  function showTooltip(
    cell: { date: Date; count: number },
    e: React.MouseEvent | React.TouchEvent,
  ) {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const parentRect = target.closest(".heatmap-scroll")?.getBoundingClientRect();
    const x = rect.left - (parentRect?.left ?? 0) + rect.width / 2;
    const y = rect.top - (parentRect?.top ?? 0) - 6;
    const label =
      cell.count === 0
        ? `${formatDateJa(cell.date)}：学習なし`
        : `${formatDateJa(cell.date)}：${cell.count}問回答`;
    setTooltip({ text: label, x, y });
  }

  return (
    <div className="rounded-[1.35rem] border border-slate-800 bg-slate-950/70 p-4 sm:p-5">
      <p className="text-[11px] tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-[0.22em]">
        学習アクティビティ
      </p>
      <p className="mt-1 text-sm font-medium text-slate-100">過去90日の回答記録</p>

      <div
        className="heatmap-scroll relative mt-4 overflow-x-auto"
        onMouseLeave={() => setTooltip(null)}
      >
        {/* Month labels */}
        <div className="mb-1 flex" style={{ paddingLeft: "1.5rem" }}>
          {grid.map((_, wi) => {
            const label = weekMonthLabels.find((l) => l.week === wi);
            return (
              <div key={wi} className="w-[14px] shrink-0 mr-[2px] text-[9px] text-slate-500">
                {label ? label.label : ""}
              </div>
            );
          })}
        </div>

        {/* Grid with day-of-week labels */}
        <div className="flex gap-0">
          {/* Day labels column */}
          <div className="mr-1 flex flex-col gap-[2px]">
            {DAY_LABELS.map((label, i) => (
              <div
                key={i}
                className="flex h-[14px] w-5 items-center justify-end text-[9px] text-slate-600"
              >
                {i % 2 === 0 ? label : ""}
              </div>
            ))}
          </div>

          {/* Week columns */}
          {grid.map((col, wi) => (
            <div key={wi} className="mr-[2px] flex flex-col gap-[2px]">
              {col.map((cell, di) => {
                if (!cell) {
                  return <div key={di} className="h-[14px] w-[14px] shrink-0" />;
                }
                return (
                  <div
                    key={di}
                    className={`h-[14px] w-[14px] shrink-0 cursor-pointer rounded-[3px] transition-opacity hover:opacity-80 ${getColorClass(cell.count)}`}
                    onMouseEnter={(e) => showTooltip(cell, e)}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      showTooltip(cell, e);
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-200 whitespace-nowrap shadow-lg"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            {tooltip.text}
          </div>
        )}
      </div>

      {/* Stats row */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-400">
        <span>
          🔥{" "}
          <span className="font-medium text-slate-200">
            {streak > 0 ? `${streak}日連続学習中` : "連続記録なし"}
          </span>
        </span>
        <span>
          📝{" "}
          <span className="font-medium text-slate-200">
            合計 {total}問回答
          </span>
        </span>
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center gap-1.5 text-[10px] text-slate-600">
        <span>少</span>
        {["bg-slate-800", "bg-emerald-900", "bg-emerald-700", "bg-emerald-500", "bg-emerald-400"].map(
          (cls, i) => (
            <div key={i} className={`h-[10px] w-[10px] rounded-[2px] ${cls}`} />
          ),
        )}
        <span>多</span>
      </div>
    </div>
  );
}
