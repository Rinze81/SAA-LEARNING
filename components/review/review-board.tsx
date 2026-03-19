"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { SectionFrame } from "@/components/ui/section-frame";
import { StatusChip } from "@/components/ui/status-chip";
import { quizQuestions } from "@/lib/quiz/data";
import { readReviewRecords, removeReviewRecord, STUDY_SYNC_EVENT } from "@/lib/review/storage";
import type { ReviewRecord } from "@/lib/review/types";

function formatDate(timestamp: number) {
  return new Intl.DateTimeFormat("ja-JP", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(timestamp);
}

export function ReviewBoard() {
  const [records, setRecords] = useState<ReviewRecord[]>([]);

  useEffect(() => {
    const sync = () => setRecords(readReviewRecords());

    sync();
    window.addEventListener(STUDY_SYNC_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(STUDY_SYNC_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const enrichedRecords = useMemo(
    () =>
      records.map((record) => ({
        ...record,
        question: quizQuestions.find((question) => question.id === record.questionId) ?? null,
      })),
    [records],
  );

  const categorySummary = useMemo(() => {
    const grouped = new Map<string, number>();

    for (const record of records) {
      grouped.set(record.category, (grouped.get(record.category) ?? 0) + 1);
    }

    return Array.from(grouped.entries()).sort((left, right) => right[1] - left[1]);
  }, [records]);

  return (
    <main className="min-h-screen px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
        <SectionFrame
          eyebrow="復習リスト"
          title="間違えた問題を、判断軸ごとに見直す"
          description="復習リストに追加した問題をまとめて確認できます。解き直しと比較ポイントの確認を行いながら、サービス選定の視点を整理しましょう。"
          aside={
            <Link
              href="/quiz"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-800 px-5 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5"
            >
              問題演習へ戻る
            </Link>
          }
        >
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[1.35rem] border border-slate-800 bg-slate-950/70 p-4 sm:p-5">
              <p className="text-[11px] tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-[0.22em]">
                弱点カテゴリ
              </p>
              {categorySummary.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {categorySummary.map(([category, count]) => (
                    <StatusChip
                      key={category}
                      label={`${category} ${count}件`}
                      tone={count > 1 ? "danger" : "accent"}
                    />
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  まだ復習リストに問題はありません。問題演習で間違えた問題を追加すると、ここから確認できます。
                </p>
              )}
            </div>

            <div className="rounded-[1.35rem] border border-slate-800 bg-slate-900/50 p-4 sm:p-5">
              <p className="text-[11px] tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-[0.22em]">
                今日の進め方
              </p>
              <ol className="mt-4 grid gap-3">
                <li className="rounded-[1.1rem] border border-slate-800 bg-slate-950/60 p-4 text-sm leading-6 text-slate-300">
                  1. 件数の多いカテゴリから見て、どこで判断がぶれているかを確認する
                </li>
                <li className="rounded-[1.1rem] border border-slate-800 bg-slate-950/60 p-4 text-sm leading-6 text-slate-300">
                  2. 解き直して正答を取るよりも、外した理由と比較ポイントを言葉にする
                </li>
                <li className="rounded-[1.1rem] border border-slate-800 bg-slate-950/60 p-4 text-sm leading-6 text-slate-300">
                  3. 比較表に戻って、似たサービスとの違いを整理する
                </li>
              </ol>
            </div>
          </div>
        </SectionFrame>

        <SectionFrame
          eyebrow="復習キュー"
          title="あとで見直す問題"
          description="演習中に保存した誤答を一覧で確認できます。問題文の流れを思い出しながら、順番に解き直していきましょう。"
          className="bg-slate-900/60"
        >
          {enrichedRecords.length > 0 ? (
            <div className="grid gap-4">
              {enrichedRecords.map((record) => (
                <article
                  key={record.questionId}
                  className="rounded-[1.35rem] border border-slate-800 bg-slate-950/70 p-4 sm:p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusChip label={record.category} tone="accent" />
                        <StatusChip label={`追加: ${formatDate(record.timestamp)}`} />
                      </div>
                      <h2 className="text-base font-medium leading-7 text-slate-100 sm:text-lg">
                        {record.question?.prompt ?? "問題データが見つかりませんでした。"}
                      </h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/quiz?questionId=${record.questionId}`}
                        className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-slate-100 px-4 text-sm font-semibold text-slate-950 transition"
                      >
                        解き直す
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeReviewRecord(record.questionId)}
                        className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-800 px-4 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5"
                      >
                        キューから外す
                      </button>
                    </div>
                  </div>

                  {record.question ? (
                    <div className="mt-4 grid gap-3 lg:grid-cols-3">
                      <div className="rounded-[1.1rem] border border-slate-800 bg-slate-900/60 p-4">
                        <p className="text-[11px] tracking-[0.16em] text-slate-500">
                          あなたの回答
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-200">
                          {
                            record.question.choices.find(
                              (choice) => choice.id === record.selectedAnswer,
                            )?.text ?? "未回答"
                          }
                        </p>
                      </div>
                      <div className="rounded-[1.1rem] border border-slate-800 bg-slate-900/60 p-4">
                        <p className="text-[11px] tracking-[0.16em] text-slate-500">
                          正答
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-200">
                          {
                            record.question.choices.find(
                              (choice) => choice.id === record.correctAnswer,
                            )?.text ?? "不明"
                          }
                        </p>
                      </div>
                      <div className="rounded-[1.1rem] border border-slate-800 bg-slate-900/60 p-4">
                        <p className="text-[11px] tracking-[0.16em] text-slate-500">
                          比較ポイント
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {record.question.comparePoint}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-[1.35rem] border border-dashed border-slate-800 bg-slate-950/60 p-6 text-sm leading-7 text-slate-400">
              復習キューは空です。問題演習で気になった問題や誤答を保存すると、ここから見直せます。
            </div>
          )}
        </SectionFrame>
      </div>
    </main>
  );
}
