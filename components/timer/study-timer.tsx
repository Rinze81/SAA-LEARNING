"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getRecentDays,
  getTodayTotalSeconds,
  isTimerRunning,
  startTimer,
  stopTimer,
} from "@/lib/timer/storage";

// ── フォーマット ──────────────────────────────────────────────────────────────

function formatMmSs(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function formatShort(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m`;
  return `${seconds}s`;
}

function formatMonthDay(dateStr: string): string {
  // タイムゾーンずれを防ぐため T00:00:00 を付けない
  const [, m, d] = dateStr.split("-");
  return `${parseInt(m)}/${parseInt(d)}`;
}

// ── 週間バーチャート ──────────────────────────────────────────────────────────

type DayRecord = { date: string; seconds: number };

function WeeklyBars({ days }: { days: DayRecord[] }) {
  const maxSeconds = Math.max(...days.map((d) => d.seconds), 1);
  const todayIdx = days.length - 1;

  return (
    <div className="flex flex-col gap-1.5">
      {days.map(({ date, seconds }, i) => {
        const isToday = i === todayIdx;
        const pct = Math.round((seconds / maxSeconds) * 100);
        return (
          <div key={date} className="flex items-center gap-3">
            <span
              className={`w-9 shrink-0 text-right text-[11px] tabular-nums ${
                isToday ? "text-sky-400" : "text-slate-500"
              }`}
            >
              {formatMonthDay(date)}
            </span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
              <div
                className={`h-full rounded-full transition-[width] duration-500 ${
                  isToday ? "bg-sky-500" : "bg-slate-600"
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span
              className={`w-12 shrink-0 text-right text-[11px] tabular-nums ${
                isToday ? "text-slate-200" : "text-slate-500"
              }`}
            >
              {seconds > 0 ? formatShort(seconds) : "—"}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── メインコンポーネント ──────────────────────────────────────────────────────

export function StudyTimer() {
  const [mounted, setMounted] = useState(false);
  const [running, setRunning] = useState(false);
  const [todaySeconds, setTodaySeconds] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [weeklyDays, setWeeklyDays] = useState<DayRecord[]>([]);

  // マウント時に localStorage から状態を復元
  useEffect(() => {
    setRunning(isTimerRunning());
    setTodaySeconds(getTodayTotalSeconds());
    setWeeklyDays(getRecentDays(7));
    setMounted(true);
  }, []);

  // 1 秒ごとに表示を更新（計測中のみ）
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const secs = getTodayTotalSeconds();
      setTodaySeconds(secs);
      // 展開時は週間データも更新
      if (expanded) {
        setWeeklyDays(getRecentDays(7));
      }
    }, 1000);
    return () => clearInterval(id);
  }, [running, expanded]);

  const handleToggle = useCallback(() => {
    if (running) {
      stopTimer();
      setRunning(false);
      setTodaySeconds(getTodayTotalSeconds());
      setWeeklyDays(getRecentDays(7));
    } else {
      startTimer();
      setRunning(true);
    }
  }, [running]);

  const handleExpand = useCallback(() => {
    setExpanded((v) => {
      if (!v) setWeeklyDays(getRecentDays(7)); // 開くたびに最新化
      return !v;
    });
  }, []);

  // SSR 中は何も表示しない（localStorage を参照するため）
  if (!mounted) return null;

  return (
    <div className="rounded-[1.35rem] border border-slate-800/80 bg-slate-900/50">
      {/* ── メイン行 ── */}
      <div className="flex items-center gap-3 px-4 py-3 sm:px-5">
        {/* スタート / ストップボタン */}
        <button
          type="button"
          onClick={handleToggle}
          aria-label={running ? "タイマーを停止" : "タイマーを開始"}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition active:scale-95 ${
            running
              ? "border-rose-700/60 bg-rose-950/40 text-rose-300 hover:border-rose-600 hover:bg-rose-950/60"
              : "border-sky-700/60 bg-sky-950/40 text-sky-300 hover:border-sky-600 hover:bg-sky-950/60"
          }`}
        >
          {running ? (
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
              <rect x="3" y="2" width="3.5" height="12" rx="0.75" />
              <rect x="9.5" y="2" width="3.5" height="12" rx="0.75" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
              <path d="M3.5 2.5l9 5.5-9 5.5V2.5z" />
            </svg>
          )}
        </button>

        {/* 時間表示 */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-[11px] tracking-[0.16em] text-slate-500">今日の学習</p>
            {running && (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-800/50 bg-emerald-950/30 px-2 py-0.5 text-[10px] tracking-[0.12em] text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                計測中
              </span>
            )}
          </div>
          <p className="mt-0.5 font-mono text-xl font-semibold tabular-nums text-slate-100">
            {formatMmSs(todaySeconds)}
          </p>
        </div>

        {/* 展開ボタン */}
        <button
          type="button"
          onClick={handleExpand}
          aria-label={expanded ? "詳細を閉じる" : "7日間の記録を表示"}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-700/60 text-slate-400 transition hover:border-slate-500 hover:text-slate-200 active:scale-95"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            aria-hidden
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </button>
      </div>

      {/* ── 展開: 週間記録 ── */}
      {expanded && (
        <div className="border-t border-slate-800/60 px-4 pb-4 pt-3 sm:px-5">
          <p className="mb-3 text-[11px] tracking-[0.18em] text-slate-500">過去 7 日間</p>
          <WeeklyBars days={weeklyDays} />
        </div>
      )}
    </div>
  );
}
