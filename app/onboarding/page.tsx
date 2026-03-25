"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ONBOARDING_KEY = "saa-onboarding-done";

// ── Step 1 コンテンツ ────────────────────────────────────────────────────────

function LearningCycleItem({
  icon,
  label,
  desc,
}: {
  icon: string;
  label: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-[1.25rem] border border-slate-800 bg-slate-900/60 p-4 text-center">
      <span className="text-3xl">{icon}</span>
      <p className="text-sm font-semibold text-slate-100">{label}</p>
      <p className="text-xs leading-5 text-slate-400">{desc}</p>
    </div>
  );
}

function Step1() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2 text-center">
        <p className="text-xs tracking-[0.18em] text-sky-400">STEP 1 / 3</p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
          AWS SAA を、判断軸で理解する
        </h1>
        <p className="text-sm leading-7 text-slate-400">
          このアプリは「どのサービスをいつ選ぶか」を体で覚えるための4つの学習サイクルで構成されています。
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <LearningCycleItem
          icon="📖"
          label="用語"
          desc="サービスの役割と特徴を把握する"
        />
        <LearningCycleItem
          icon="⚖️"
          label="比較"
          desc="似たサービスの違いを整理する"
        />
        <LearningCycleItem
          icon="✏️"
          label="問題"
          desc="判断軸を鍛える演習問題を解く"
        />
        <LearningCycleItem
          icon="🔁"
          label="復習"
          desc="間違えた問題を繰り返して定着させる"
        />
      </div>

      {/* 学習サイクルの矢印 */}
      <div className="flex items-center justify-center gap-2 rounded-[1.25rem] border border-sky-900/40 bg-sky-950/20 px-4 py-3">
        <span className="text-xs text-sky-300">用語</span>
        <span className="text-slate-600">→</span>
        <span className="text-xs text-sky-300">比較</span>
        <span className="text-slate-600">→</span>
        <span className="text-xs text-sky-300">問題</span>
        <span className="text-slate-600">→</span>
        <span className="text-xs text-sky-300">復習</span>
        <span className="text-slate-600">→</span>
        <span className="text-xs text-emerald-300">合格</span>
      </div>
    </div>
  );
}

// ── Step 2 コンテンツ ────────────────────────────────────────────────────────

const STEP2_CARDS = [
  {
    step: "01",
    icon: "📖",
    title: "用語でサービスを把握する",
    desc: "まずは各 AWS サービスの役割と特徴を頭に入れましょう。構成図付きで視覚的に理解できます。",
    color: "border-sky-900/45 bg-sky-950/20",
    labelColor: "text-sky-400",
  },
  {
    step: "02",
    icon: "⚖️",
    title: "比較で違いを整理する",
    desc: "EC2 vs Lambda、SQS vs SNS など、試験で問われる「使い分け」を比較表で整理します。",
    color: "border-violet-900/45 bg-violet-950/20",
    labelColor: "text-violet-400",
  },
  {
    step: "03",
    icon: "✏️",
    title: "問題を解いて判断軸を鍛える",
    desc: "実際の試験形式に近い問題で、どのサービスをいつ選ぶかの感覚を身につけます。",
    color: "border-amber-900/45 bg-amber-950/20",
    labelColor: "text-amber-400",
  },
  {
    step: "04",
    icon: "🔁",
    title: "復習で間違いを定着させる",
    desc: "間違えた問題は復習キューに自動で追加されます。繰り返し解いて弱点を潰しましょう。",
    color: "border-emerald-900/45 bg-emerald-950/20",
    labelColor: "text-emerald-400",
  },
];

function Step2() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2 text-center">
        <p className="text-xs tracking-[0.18em] text-sky-400">STEP 2 / 3</p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
          はじめての人はここから
        </h1>
        <p className="text-sm leading-7 text-slate-400">
          この順番で進めると、知識が体系的に積み上がります。
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {STEP2_CARDS.map((card) => (
          <div
            key={card.step}
            className={`flex items-start gap-4 rounded-[1.25rem] border p-4 ${card.color}`}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-900/60">
              <span className="text-base">{card.icon}</span>
            </div>
            <div className="space-y-1">
              <p className={`text-[11px] tracking-[0.16em] ${card.labelColor}`}>
                {card.step}
              </p>
              <p className="text-sm font-semibold text-slate-100">
                {card.title}
              </p>
              <p className="text-xs leading-5 text-slate-400">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Step 3 コンテンツ ────────────────────────────────────────────────────────

function Step3({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2 text-center">
        <p className="text-xs tracking-[0.18em] text-sky-400">STEP 3 / 3</p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
          さっそく始めよう
        </h1>
        <p className="text-sm leading-7 text-slate-400">
          どちらから始めても大丈夫です。自分のペースで進めましょう。
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/terms"
          onClick={onComplete}
          className="flex flex-col items-center gap-3 rounded-[1.5rem] border border-sky-800/50 bg-sky-950/30 p-6 text-center transition hover:border-sky-600 hover:bg-sky-950/50"
        >
          <span className="text-4xl">📖</span>
          <div className="space-y-1">
            <p className="font-semibold text-sky-100">用語から始める</p>
            <p className="text-xs leading-5 text-slate-400">
              AWS サービスの役割を一つひとつ確認しながら進めたい人向け
            </p>
          </div>
          <span className="mt-1 inline-flex min-h-[36px] items-center rounded-full border border-sky-700 bg-sky-900/50 px-4 text-xs font-medium text-sky-200">
            用語集を開く →
          </span>
        </Link>

        <Link
          href="/quiz"
          onClick={onComplete}
          className="flex flex-col items-center gap-3 rounded-[1.5rem] border border-emerald-800/50 bg-emerald-950/25 p-6 text-center transition hover:border-emerald-600 hover:bg-emerald-950/40"
        >
          <span className="text-4xl">✏️</span>
          <div className="space-y-1">
            <p className="font-semibold text-emerald-100">問題から始める</p>
            <p className="text-xs leading-5 text-slate-400">
              すでに基礎知識がある人、問題を解きながら覚えたい人向け
            </p>
          </div>
          <span className="mt-1 inline-flex min-h-[36px] items-center rounded-full border border-emerald-700 bg-emerald-900/50 px-4 text-xs font-medium text-emerald-200">
            問題を解く →
          </span>
        </Link>
      </div>

      <button
        type="button"
        onClick={onComplete}
        className="mx-auto text-xs text-slate-500 underline underline-offset-4 transition hover:text-slate-300"
      >
        ホームへ戻る
      </button>
    </div>
  );
}

// ── メインコンポーネント ──────────────────────────────────────────────────────

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0=loading, 1〜3=steps
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      if (localStorage.getItem(ONBOARDING_KEY) === "true") {
        router.replace("/");
        return;
      }
    }
    setStep(1);
  }, [router]);

  function completeOnboarding() {
    localStorage.setItem(ONBOARDING_KEY, "true");
  }

  function handleSkip() {
    completeOnboarding();
    router.replace("/");
  }

  function handleNext() {
    setStep((s) => s + 1);
  }

  if (!mounted || step === 0) return null;

  return (
    <main className="flex min-h-screen items-start justify-center px-4 pb-16 pt-8 sm:items-center sm:pt-8">
      <div className="w-full max-w-xl">
        {/* カード */}
        <div className="rounded-[1.5rem] border border-slate-800/80 bg-slate-950/75 shadow-[0_18px_60px_rgba(2,6,23,0.35)]">
          {/* プログレスバー */}
          <div className="flex gap-1.5 rounded-t-[1.5rem] bg-slate-900/50 px-6 py-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  n <= step ? "bg-sky-500" : "bg-slate-700"
                }`}
              />
            ))}
          </div>

          {/* コンテンツ */}
          <div className="p-6 sm:p-8">
            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 onComplete={completeOnboarding} />}
          </div>

          {/* フッター */}
          {step < 3 && (
            <div className="flex items-center justify-between border-t border-slate-800/60 px-6 py-4 sm:px-8">
              <button
                type="button"
                onClick={handleSkip}
                className="text-xs text-slate-500 underline underline-offset-4 transition hover:text-slate-300"
              >
                スキップ
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-sky-600 px-6 text-sm font-medium text-white transition hover:bg-sky-500"
              >
                次へ
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden
                >
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
