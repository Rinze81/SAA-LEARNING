"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { quizQuestions } from "@/lib/quiz/data";
import type { QuizQuestion } from "@/lib/quiz/types";
import type { MockExamResult, MockExamAnswers } from "@/lib/mock-exam/types";
import {
  readMockExamResults,
  saveMockExamResult,
  readMockExamSession,
  saveMockExamSession,
  clearMockExamSession,
} from "@/lib/mock-exam/storage";
import { SectionFrame } from "@/components/ui/section-frame";

const EXAM_COUNT = 65;
const EXAM_SECONDS = 130 * 60; // 7800
const PASS_PERCENT = 72;

type Phase = "start" | "exam" | "result";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fmtTimer(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

function fmtDate(iso: string): string {
  return new Intl.DateTimeFormat("ja-JP", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function MockExamExperience() {
  const [phase, setPhase] = useState<Phase>("start");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<MockExamAnswers>({});
  const [idx, setIdx] = useState(0);
  const [seconds, setSeconds] = useState(EXAM_SECONDS);
  const [pastResults, setPastResults] = useState<MockExamResult[]>([]);
  const [examResult, setExamResult] = useState<MockExamResult | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Always-fresh finish function via ref (avoids stale closure in timer effect)
  const finishRef = useRef<(timedOut: boolean) => void>(() => {});
  finishRef.current = (timedOut: boolean) => {
    if (phase !== "exam") return;

    const score = questions.filter((q, i) => answers[i] === q.correctChoiceId).length;
    const percentage = Math.round((score / EXAM_COUNT) * 100);
    const timeUsed = timedOut ? EXAM_SECONDS : EXAM_SECONDS - seconds;

    const breakdown: Record<string, { correct: number; total: number }> = {};
    questions.forEach((q, i) => {
      if (!breakdown[q.category]) breakdown[q.category] = { correct: 0, total: 0 };
      breakdown[q.category].total++;
      if (answers[i] === q.correctChoiceId) breakdown[q.category].correct++;
    });

    const result: MockExamResult = {
      date: new Date().toISOString(),
      score,
      total: EXAM_COUNT,
      percentage,
      passed: percentage >= PASS_PERCENT,
      timeUsed,
      categoryBreakdown: breakdown,
    };

    saveMockExamResult(result);
    clearMockExamSession();
    setExamResult(result);
    setPhase("result");
    setShowConfirm(false);
  };

  // Hydration + session restore
  useEffect(() => {
    setHydrated(true);
    setPastResults(readMockExamResults().slice(0, 3));

    const session = readMockExamSession();
    if (session && session.questionIds.length === EXAM_COUNT) {
      const qMap = new Map(quizQuestions.map((q) => [q.id, q]));
      const restored = session.questionIds
        .map((id) => qMap.get(id))
        .filter((q): q is QuizQuestion => q !== undefined);
      if (restored.length === EXAM_COUNT) {
        setQuestions(restored);
        setAnswers(session.answers);
        setIdx(session.currentIndex);
        setSeconds(session.remainingSeconds);
        setPhase("exam");
      }
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (phase !== "exam") return;
    const timer = setInterval(() => {
      setSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  // Time's up → finish
  useEffect(() => {
    if (phase === "exam" && seconds === 0) {
      finishRef.current(true);
    }
  }, [phase, seconds]);

  // Persist session to sessionStorage whenever exam state changes
  useEffect(() => {
    if (phase !== "exam" || questions.length === 0) return;
    saveMockExamSession({
      questionIds: questions.map((q) => q.id),
      answers,
      currentIndex: idx,
      remainingSeconds: seconds,
      startedAt: new Date().toISOString(),
    });
  }, [phase, questions, answers, idx, seconds]);

  function startExam() {
    const picked = shuffle(quizQuestions).slice(0, EXAM_COUNT);
    setQuestions(picked);
    setAnswers({});
    setIdx(0);
    setSeconds(EXAM_SECONDS);
    setPhase("exam");
  }

  function restart() {
    clearMockExamSession();
    setQuestions([]);
    setAnswers({});
    setIdx(0);
    setSeconds(EXAM_SECONDS);
    setExamResult(null);
    setPastResults(readMockExamResults().slice(0, 3));
    setPhase("start");
  }

  if (!hydrated) return null;

  // ── 画面1: 開始画面 ────────────────────────────────────────────────────
  if (phase === "start") {
    return (
      <main className="min-h-screen px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
          <SectionFrame eyebrow="模擬試験モード" title="本番形式で腕試し">
            <div className="space-y-5">
              <p className="text-sm leading-7 text-slate-300">
                65問・制限時間130分。本番試験と同じ形式で挑戦しましょう。
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {(
                  [
                    { label: "出題数", value: "65問" },
                    { label: "制限時間", value: "130分" },
                    { label: "合格ライン", value: "72%（47問）" },
                  ] as const
                ).map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-[1.2rem] border border-slate-800 bg-slate-900/60 p-4 text-center"
                  >
                    <p className="text-[11px] tracking-[0.18em] text-slate-500">{label}</p>
                    <p className="mt-1 text-xl font-semibold text-slate-100">{value}</p>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={startExam}
                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-slate-100 px-6 text-base font-semibold text-slate-950 transition hover:-translate-y-0.5 sm:w-auto sm:px-10"
              >
                試験開始
              </button>
            </div>
          </SectionFrame>

          {pastResults.length > 0 && (
            <SectionFrame eyebrow="過去の結果" title="直近のスコア">
              <div className="grid gap-3">
                {pastResults.map((r, i) => (
                  <div
                    key={i}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-[1.2rem] border border-slate-800 bg-slate-950/70 p-4"
                  >
                    <div className="space-y-0.5">
                      <p className="text-xs text-slate-500">{fmtDate(r.date)}</p>
                      <p className="text-sm font-medium text-slate-200">
                        {r.score} / {r.total}問正解（{r.percentage}%）
                      </p>
                      <p className="text-xs text-slate-500">
                        所要時間: {Math.floor(r.timeUsed / 60)}分{r.timeUsed % 60}秒
                      </p>
                    </div>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                        r.passed
                          ? "border-emerald-800 bg-emerald-950/60 text-emerald-300"
                          : "border-rose-800 bg-rose-950/60 text-rose-300"
                      }`}
                    >
                      {r.passed ? "合格" : "不合格"}
                    </span>
                  </div>
                ))}
              </div>
            </SectionFrame>
          )}
        </div>
      </main>
    );
  }

  // ── 画面2: 試験中 ──────────────────────────────────────────────────────
  if (phase === "exam") {
    const q = questions[idx];
    const answeredCount = Object.keys(answers).length;
    const isLowTime = seconds > 0 && seconds <= 600;

    return (
      <>
        {/* 終了確認ダイアログ */}
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
            <div className="mx-4 w-full max-w-sm rounded-[1.5rem] border border-slate-700 bg-slate-900 p-6 shadow-xl">
              <h3 className="text-base font-semibold text-slate-100">試験を終了しますか？</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                未回答が{EXAM_COUNT - answeredCount}問あります。終了すると採点されます。
              </p>
              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={() => finishRef.current(false)}
                  className="min-h-[44px] flex-1 rounded-full bg-slate-100 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
                >
                  終了して採点
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirm(false)}
                  className="min-h-[44px] flex-1 rounded-full border border-slate-700 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5"
                >
                  戻る
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="min-h-screen pb-16">
          {/* 試験ヘッダー（TopContextBar の下に固定） */}
          <div className="sticky top-16 z-30 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-400">
                  問題{" "}
                  <span className="font-semibold text-slate-100">{idx + 1}</span>
                  {" / "}
                  {EXAM_COUNT}
                </span>
                <span className="hidden text-xs text-slate-600 sm:inline">
                  回答済 {answeredCount} 問
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`font-mono text-xl font-semibold tabular-nums transition-colors ${
                    isLowTime ? "text-rose-400" : "text-slate-100"
                  }`}
                >
                  {fmtTimer(seconds)}
                </span>
                <button
                  type="button"
                  onClick={() => setShowConfirm(true)}
                  className="min-h-[36px] rounded-full border border-slate-700 px-4 text-sm text-slate-300 transition hover:border-rose-800 hover:text-rose-300"
                >
                  試験を終了する
                </button>
              </div>
            </div>
          </div>

          {/* メインエリア */}
          <div className="mx-auto grid max-w-7xl gap-5 px-4 pt-5 sm:px-6 lg:grid-cols-[1fr_260px] lg:px-8">
            {/* 問題 + 選択肢 */}
            <div className="flex flex-col gap-4">
              {q.context && (
                <div className="rounded-[1.2rem] border border-slate-800 bg-slate-900/55 p-4">
                  <p className="text-[11px] tracking-[0.16em] text-slate-500">前提</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{q.context}</p>
                </div>
              )}

              <div className="rounded-[1.35rem] border border-slate-800 bg-slate-950/80 p-5 sm:p-6">
                <p className="mb-3 text-[11px] tracking-[0.16em] text-slate-500">
                  {q.category}
                </p>
                <p className="text-base leading-8 text-slate-100 sm:text-lg">{q.prompt}</p>
              </div>

              <div className="grid gap-3">
                {q.choices.map((choice) => {
                  const isSelected = answers[idx] === choice.id;
                  return (
                    <button
                      key={choice.id}
                      type="button"
                      onClick={() =>
                        setAnswers((prev) => ({ ...prev, [idx]: choice.id }))
                      }
                      className={`w-full rounded-[1.2rem] border p-4 text-left transition-all ${
                        isSelected
                          ? "border-sky-700 bg-sky-950/60 text-sky-100"
                          : "border-slate-800 bg-slate-900/60 text-slate-200 hover:border-slate-700 hover:bg-slate-900"
                      }`}
                    >
                      <span
                        className={`mr-3 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                          isSelected ? "border-sky-400" : "border-current"
                        }`}
                      >
                        {choice.label}
                      </span>
                      {choice.text}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIdx((i) => Math.max(0, i - 1))}
                  disabled={idx === 0}
                  className="min-h-[44px] rounded-full border border-slate-800 px-6 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 disabled:opacity-30 disabled:hover:translate-y-0"
                >
                  前の問題
                </button>
                <button
                  type="button"
                  onClick={() => setIdx((i) => Math.min(EXAM_COUNT - 1, i + 1))}
                  disabled={idx === EXAM_COUNT - 1}
                  className="min-h-[44px] rounded-full bg-slate-100 px-6 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 disabled:opacity-30 disabled:hover:translate-y-0"
                >
                  次の問題
                </button>
              </div>
            </div>

            {/* 問題番号パネル */}
            <div className="lg:sticky lg:top-[104px] lg:self-start">
              <div className="rounded-[1.35rem] border border-slate-800 bg-slate-950/70 p-4">
                <p className="mb-3 text-[11px] tracking-[0.18em] text-slate-500">
                  回答状況 {answeredCount} / {EXAM_COUNT}
                </p>
                <div className="grid grid-cols-10 gap-1.5">
                  {questions.map((_, i) => {
                    const isAnswered = i in answers;
                    const isCurrent = i === idx;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setIdx(i)}
                        className={`aspect-square w-full rounded-md text-[10px] font-medium transition-all ${
                          isCurrent
                            ? "bg-sky-500 text-white ring-2 ring-sky-400 ring-offset-1 ring-offset-slate-950"
                            : isAnswered
                            ? "bg-emerald-900/70 text-emerald-200 hover:bg-emerald-900"
                            : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                        }`}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded bg-sky-500" />
                    現在
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded bg-emerald-900/70" />
                    回答済
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded bg-slate-800" />
                    未回答
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── 画面3: 結果画面 ────────────────────────────────────────────────────
  if (phase === "result" && examResult) {
    const { score, total, percentage, passed, timeUsed, categoryBreakdown } =
      examResult;
    const categories = Object.entries(categoryBreakdown).sort(
      ([, a], [, b]) => a.correct / a.total - b.correct / b.total,
    );

    return (
      <main className="min-h-screen px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
          {/* スコアカード */}
          <SectionFrame eyebrow="試験結果">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-3">
                <div
                  className={`inline-flex rounded-full border px-5 py-2 text-xl font-bold ${
                    passed
                      ? "border-emerald-700 bg-emerald-950/60 text-emerald-300"
                      : "border-rose-700 bg-rose-950/60 text-rose-300"
                  }`}
                >
                  {passed ? "合格" : "不合格"}
                </div>
                <p className="text-3xl font-semibold text-slate-100 sm:text-4xl">
                  {score} / {total}問正解
                </p>
                <p className="text-lg text-slate-400">
                  正答率{" "}
                  <span className="font-semibold text-slate-200">{percentage}%</span>
                  <span className="ml-3 text-sm">（合格ライン {PASS_PERCENT}%）</span>
                </p>
                <p className="text-sm text-slate-500">
                  所要時間: {Math.floor(timeUsed / 60)}分{timeUsed % 60}秒
                </p>
              </div>
              <div className="flex flex-wrap gap-3 sm:flex-col sm:items-end">
                <button
                  type="button"
                  onClick={restart}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-slate-100 px-6 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
                >
                  もう一度挑戦
                </button>
                <Link
                  href="/"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-800 px-6 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5"
                >
                  ホームに戻る
                </Link>
              </div>
            </div>
          </SectionFrame>

          {/* カテゴリ別正答率 */}
          <SectionFrame eyebrow="カテゴリ別正答率">
            <div className="grid gap-2">
              {categories.map(([cat, { correct, total: catTotal }]) => {
                const pct = Math.round((correct / catTotal) * 100);
                return (
                  <div
                    key={cat}
                    className="flex items-center gap-3 rounded-[1rem] border border-slate-800 bg-slate-950/60 px-4 py-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm text-slate-200">{cat}</p>
                        <p className="shrink-0 text-sm font-semibold text-slate-100">
                          {correct}/{catTotal}
                          <span className="ml-1.5 text-xs font-normal text-slate-400">
                            ({pct}%)
                          </span>
                        </p>
                      </div>
                      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                        <div
                          className={`h-full rounded-full transition-all ${
                            pct >= PASS_PERCENT ? "bg-emerald-500" : "bg-rose-500"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionFrame>

          {/* 問題ごとの正誤一覧 */}
          <SectionFrame eyebrow="問題ごとの正誤">
            <div className="grid gap-2">
              {questions.map((q, i) => {
                const userAnswer = answers[i];
                const isCorrect = userAnswer === q.correctChoiceId;
                const correctChoice = q.choices.find(
                  (c) => c.id === q.correctChoiceId,
                );

                return (
                  <div
                    key={q.id}
                    className={`rounded-[1.1rem] border p-4 ${
                      isCorrect
                        ? "border-emerald-900/60 bg-emerald-950/30"
                        : "border-rose-900/60 bg-rose-950/30"
                    }`}
                  >
                    <div className="flex flex-wrap items-start gap-3">
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                          isCorrect
                            ? "bg-emerald-900/60 text-emerald-300"
                            : "bg-rose-900/60 text-rose-300"
                        }`}
                      >
                        {isCorrect ? "正解" : "不正解"}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] text-slate-500">
                          問題 {i + 1} · {q.category}
                        </p>
                        <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-200">
                          {q.prompt}
                        </p>
                        <p className="mt-1.5 text-xs text-slate-400">
                          正解:{" "}
                          <span className="text-slate-200">
                            {correctChoice?.text ?? "不明"}
                          </span>
                        </p>
                        {!isCorrect && userAnswer && (
                          <p className="mt-0.5 text-xs text-slate-500">
                            あなたの回答:{" "}
                            <span className="text-rose-300">
                              {q.choices.find((c) => c.id === userAnswer)?.text ??
                                "不明"}
                            </span>
                          </p>
                        )}
                        {!userAnswer && (
                          <p className="mt-0.5 text-xs text-slate-500">未回答</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionFrame>

          {/* 下部ボタン */}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={restart}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-slate-100 px-6 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
            >
              もう一度挑戦
            </button>
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-800 px-6 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5"
            >
              ホームに戻る
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return null;
}
