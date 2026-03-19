"use client";

import Link from "next/link";
import { getNavItem } from "@/lib/navigation";

type TopContextBarProps = {
  pathname: string;
};

export function TopContextBar({ pathname }: TopContextBarProps) {
  const current = getNavItem(pathname);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-slate-800/80 bg-slate-950/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <Link href="/" className="text-sm font-semibold text-slate-100">
            AWS SAA Learning App
          </Link>
          <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
            <span className="rounded-full border border-slate-800 px-2 py-1 text-[10px] tracking-[0.16em] text-slate-300">
              {current.label}
            </span>
            <span className="truncate">{current.description}</span>
          </div>
        </div>
        <Link
          href="/quiz"
          className="inline-flex min-h-[40px] shrink-0 items-center justify-center rounded-full border border-slate-800 px-4 text-sm font-medium text-slate-100 transition hover:-translate-y-0.5"
        >
          問題へ
        </Link>
      </div>
    </header>
  );
}
