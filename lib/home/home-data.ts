import type { HomeSnapshot, PersistedHomeState } from "@/lib/home/types";

const STORAGE_KEY = "saa-home-state";

const defaultState: Required<PersistedHomeState> = {
  overallPercent: 42,
  completedTopics: 11,
  totalTopics: 26,
  studyHours: 18,
  quizAccuracy: 68,
  termsMastery: 54,
  comparisonMastery: 47,
  streakDays: 4,
  reviewedToday: 12,
  weakDomain: "VPC / Route 53 / ELB の使い分け",
  lastVisitedPath: "/quiz",
};

export function readPersistedHomeState(): PersistedHomeState {
  if (typeof window === "undefined") {
    return defaultState;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return defaultState;
  }

  try {
    const parsed = JSON.parse(raw) as PersistedHomeState;
    return { ...defaultState, ...parsed };
  } catch {
    return defaultState;
  }
}

export function buildHomeSnapshot(state: PersistedHomeState): HomeSnapshot {
  const merged = { ...defaultState, ...state };

  return {
    hero: {
      primaryLabel: `${merged.weakDomain} を先に整理する`,
      primaryDescription:
        "苦手な比較を先に戻すと、その後の問題演習が進めやすくなります。",
      primaryHref: "/quiz",
      secondaryHref: merged.lastVisitedPath,
      metrics: [
        {
          label: "連続学習",
          value: `${merged.streakDays}日`,
          caption: "学習リズムを保てています",
        },
        {
          label: "今日触れた量",
          value: `${merged.reviewedToday}項目`,
          caption: "今日はここまで進めています",
        },
        {
          label: "今の弱点",
          value: "ネットワーク",
          caption: merged.weakDomain,
        },
      ],
    },
    progress: {
      overallPercent: merged.overallPercent,
      completedTopics: merged.completedTopics,
      totalTopics: merged.totalTopics,
      studyHours: merged.studyHours,
      highlights: [
        {
          label: "問題正答率",
          value: `${merged.quizAccuracy}%`,
          caption: "本番形式での安定度",
        },
        {
          label: "用語理解",
          value: `${merged.termsMastery}%`,
          caption: "サービスの役割を説明できる割合",
        },
        {
          label: "比較理解",
          value: `${merged.comparisonMastery}%`,
          caption: "違いを答え分けられる割合",
        },
      ],
      bars: [
        {
          label: "用語理解",
          value: merged.termsMastery,
          caption: "サービスの責務と用途を言い換えられるか",
        },
        {
          label: "比較理解",
          value: merged.comparisonMastery,
          caption: "S3 / EBS / EFS のような差分判断",
        },
        {
          label: "問題対応力",
          value: merged.quizAccuracy,
          caption: "文脈を読んで選択肢を捨てる力",
        },
      ],
    },
    paths: [
      {
        key: "terms",
        title: "用語から確認",
        description:
          "各サービスの役割を短く思い出す入口です。学習を再開した直後でも入りやすくしています。",
        reason: "まず全体像を思い出したいとき向けです。",
        cta: "用語を見直す",
        href: "/terms",
        pace: "ウォームアップ",
      },
      {
        key: "comparisons",
        title: "違いで整理する",
        description:
          "似たサービスの使い分けに絞る入口です。SAAで迷いやすい比較を短時間で戻せます。",
        reason: "どちらを選ぶべきかを整理したいとき向けです。",
        cta: "比較を見直す",
        href: "/comparisons",
        pace: "判断整理",
      },
      {
        key: "quiz",
        title: "問題で確かめる",
        description:
          "実戦形式で理解の穴を見つける入口です。選んだ理由まで確認したい日に向いています。",
        reason: "合格優先で弱点を洗い出したいときに最短です。",
        cta: "問題に進む",
        href: "/quiz",
        pace: "本番形式",
      },
    ],
    focus: {
      title: "Storage の使い分け",
      description:
        "S3 / EBS / EFS / FSx は頻出で、用途の違いを問われやすいテーマです。",
      whyNow:
        "保存先を選ぶ理由が曖昧なままだと、設計問題でも選択肢を切りづらくなります。",
      href: "/comparisons",
      readiness: Math.round(
        (merged.termsMastery + merged.comparisonMastery) / 2,
      ),
      stepTitle: "3つの保存先を用途で言い分ける",
      stepDescription:
        "仕様を覚えるより先に、要件から保存先を選べる状態を今日のゴールにします。",
      checkpoints: [
        {
          label: "思い出す",
          value: "S3 はオブジェクト、EBS は単一 EC2 向け、EFS は共有ファイル",
        },
        {
          label: "比べる",
          value: "共有性・接続先・用途の違いを一言で整理する",
        },
        {
          label: "使う",
          value: "問題文から『なぜそれを選ぶか』まで説明する",
        },
      ],
      actions: [
        "用語で S3 / EBS / EFS の定義を 3 分だけ見直す",
        "比較で共有可否とユースケースの違いを並べて見る",
        "問題でストレージ系を 5 問だけ解いて判断理由を確認する",
      ],
    },
  };
}
