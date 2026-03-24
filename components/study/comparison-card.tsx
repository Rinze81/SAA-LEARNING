"use client";

import { useState } from "react";
import { StatusChip } from "@/components/ui/status-chip";
import type { ComparisonItem } from "@/lib/study/comparisons";

type ComparisonCardProps = {
  item: ComparisonItem;
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export function ComparisonCard({ item }: ComparisonCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="rounded-[1.5rem] border border-slate-800/80 bg-slate-950/75 shadow-[0_18px_60px_rgba(2,6,23,0.28)]">
      {/* ── ヘッダー（常時表示・タップで開閉） ── */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
        aria-expanded={isOpen}
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <StatusChip label={item.category} tone="accent" />
            <StatusChip label={`${item.services.length} サービス比較`} />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
              {item.title}
            </h2>
            <p className="text-sm leading-7 text-slate-300 sm:text-[15px]">
              {item.summary}
            </p>
          </div>
        </div>
        <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-800 bg-slate-900/60">
          <ChevronIcon open={isOpen} />
        </span>
      </button>

      {/* ── アコーディオン本体 ── */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-4 border-t border-slate-800/60 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
            {/* サービス別詳細 */}
            <div className="grid gap-3">
              {item.services.map((service) => (
                <section
                  key={service.name}
                  className="rounded-[1.25rem] border border-slate-800 bg-slate-900/65 p-4"
                >
                  <div className="space-y-2">
                    <h3 className="text-base font-semibold text-slate-100 sm:text-lg">
                      {service.name}
                    </h3>
                    <p className="text-sm leading-6 text-slate-400">
                      {service.summary}
                    </p>
                  </div>

                  <dl className="mt-4 grid gap-3">
                    {service.points.map((point) => (
                      <div
                        key={`${service.name}-${point.label}`}
                        className="rounded-2xl border border-slate-800/80 bg-slate-950/75 px-4 py-3"
                      >
                        <dt className="text-xs tracking-[0.16em] text-slate-500">
                          {point.label}
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-slate-200">
                          {point.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ))}
            </div>

            {/* 試験での見分けポイント + 結論 */}
            <div className="grid gap-3 sm:grid-cols-2">
              <section className="rounded-[1.25rem] border border-sky-900/45 bg-sky-950/30 p-4">
                <p className="text-xs tracking-[0.16em] text-sky-300">
                  試験での見分けポイント
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-200">
                  {item.examTip}
                </p>
              </section>

              <section className="rounded-[1.25rem] border border-emerald-900/45 bg-emerald-950/25 p-4">
                <p className="text-xs tracking-[0.16em] text-emerald-300">結論</p>
                <p className="mt-2 text-sm leading-7 text-slate-200">
                  {item.conclusion}
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
