"use client";

const TIMER_KEY = "saa-study-timer";

interface TimerData {
  /** YYYY-MM-DD → その日の累計秒数 */
  daily: Record<string, number>;
  /** タイマー計測中かどうか */
  running: boolean;
  /** 計測開始時刻（Date.now()）。running=true のときのみ有効 */
  startedAt: number | null;
}

// ── ユーティリティ ────────────────────────────────────────────────────────────

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function dateKey(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  return d.toISOString().slice(0, 10);
}

function load(): TimerData {
  if (typeof window === "undefined") {
    return { daily: {}, running: false, startedAt: null };
  }
  try {
    const raw = localStorage.getItem(TIMER_KEY);
    if (!raw) return { daily: {}, running: false, startedAt: null };
    return JSON.parse(raw) as TimerData;
  } catch {
    return { daily: {}, running: false, startedAt: null };
  }
}

function save(data: TimerData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TIMER_KEY, JSON.stringify(data));
}

/**
 * 計測中の場合、日付をまたいだ分を各日のバケツへ振り分けてから
 * 最新状態を返す。ブラウザを長時間閉じていたケースを正しく処理する。
 */
function flush(data: TimerData): TimerData {
  if (!data.running || data.startedAt === null) return data;

  const startDate = new Date(data.startedAt).toISOString().slice(0, 10);
  const todayStr = today();

  if (startDate === todayStr) {
    // 日付をまたいでいない → そのまま
    return data;
  }

  // 日付をまたいだ → 開始日から昨日までの分を daily に積む
  const next = { ...data, daily: { ...data.daily } };
  let cursor = new Date(data.startedAt);
  const now = Date.now();

  while (true) {
    const cursorDate = cursor.toISOString().slice(0, 10);
    if (cursorDate >= todayStr) break;

    // この日の 23:59:59 を計算
    const endOfDay = new Date(cursorDate + "T23:59:59.999Z").getTime();
    const elapsed = Math.floor(
      (Math.min(endOfDay, now) - cursor.getTime()) / 1000,
    );
    next.daily[cursorDate] = (next.daily[cursorDate] ?? 0) + Math.max(0, elapsed);

    // 翌日の 00:00:00 へ進める
    cursor = new Date(cursorDate + "T00:00:00.000Z");
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  // startedAt を今日の 00:00:00 にリセット
  next.startedAt = new Date(todayStr + "T00:00:00.000Z").getTime();
  save(next);
  return next;
}

// ── 公開 API ─────────────────────────────────────────────────────────────────

/** タイマーを開始する */
export function startTimer(): void {
  const data = load();
  if (data.running) return;
  data.running = true;
  data.startedAt = Date.now();
  save(data);
}

/** タイマーを停止し、今日の累計に加算する */
export function stopTimer(): void {
  const data = flush(load());
  if (!data.running || data.startedAt === null) return;
  const elapsed = Math.floor((Date.now() - data.startedAt) / 1000);
  const todayStr = today();
  data.daily[todayStr] = (data.daily[todayStr] ?? 0) + elapsed;
  data.running = false;
  data.startedAt = null;
  save(data);
}

/** 今日の累計秒数（計測中のリアルタイム分を含む） */
export function getTodayTotalSeconds(): number {
  const data = flush(load());
  const accumulated = data.daily[today()] ?? 0;
  if (!data.running || data.startedAt === null) return accumulated;
  const live = Math.floor((Date.now() - data.startedAt) / 1000);
  return accumulated + live;
}

/** 計測中かどうか */
export function isTimerRunning(): boolean {
  return load().running;
}

/** 過去 N 日分（今日含む）のデータを返す。インデックス末尾が今日 */
export function getRecentDays(n = 7): { date: string; seconds: number }[] {
  const data = flush(load());
  return Array.from({ length: n }, (_, i) => {
    const key = dateKey(n - 1 - i);
    const base = data.daily[key] ?? 0;
    // 今日かつ計測中の場合はリアルタイム分を含める
    const isToday = key === today();
    const live =
      isToday && data.running && data.startedAt !== null
        ? Math.floor((Date.now() - data.startedAt) / 1000)
        : 0;
    return { date: key, seconds: base + live };
  });
}

/** 過去 7 日間の合計時間（時間単位、小数点切り捨て） */
export function getWeeklyTotalHours(): number {
  const total = getRecentDays(7).reduce((s, d) => s + d.seconds, 0);
  return Math.floor(total / 3600);
}
