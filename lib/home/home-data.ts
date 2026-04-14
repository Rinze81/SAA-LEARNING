import type { HomeSnapshot, PersistedHomeState } from "@/lib/home/types";
import { quizQuestions } from "@/lib/quiz/data";
import { buildStudyAnalytics } from "@/lib/study/analytics";
import type { StudyAnalytics } from "@/lib/study/types";
import { ROADMAP_STEPS, ROADMAP_TERM_TOTAL } from "@/lib/study/roadmap-data";
import { studyTerms } from "@/lib/study/terms";
import { comparisonItems } from "@/lib/study/comparisons";

const ROADMAP_READ_KEY = "saa-roadmap-read";
const COMPARISON_READ_KEY = "saa-comparison-read";
const COMPARISON_TOTAL = comparisonItems.length;

function readTermsMastery(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = localStorage.getItem(ROADMAP_READ_KEY);
    const ids: string[] = raw ? (JSON.parse(raw) as string[]) : [];
    return Math.min(100, Math.round((ids.length / ROADMAP_TERM_TOTAL) * 100));
  } catch {
    return 0;
  }
}

function readRoadmapProgress(): {
  completedTopics: number;
  totalTopics: number;
  overallPercent: number;
} {
  const totalTopics = ROADMAP_STEPS.length;
  if (typeof window === "undefined") {
    return { completedTopics: 0, totalTopics, overallPercent: 0 };
  }
  try {
    const raw = localStorage.getItem(ROADMAP_READ_KEY);
    const readIds = new Set<string>(raw ? (JSON.parse(raw) as string[]) : []);
    const completedTopics = ROADMAP_STEPS.filter((step) => {
      const validIds = step.termIds.filter((id) =>
        studyTerms.some((t) => t.id === id),
      );
      return validIds.length > 0 && validIds.every((id) => readIds.has(id));
    }).length;
    const overallPercent = Math.round((completedTopics / totalTopics) * 100);
    return { completedTopics, totalTopics, overallPercent };
  } catch {
    return { completedTopics: 0, totalTopics, overallPercent: 0 };
  }
}

function readComparisonMastery(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = localStorage.getItem(COMPARISON_READ_KEY);
    const ids: string[] = raw ? (JSON.parse(raw) as string[]) : [];
    return Math.min(100, Math.round((ids.length / COMPARISON_TOTAL) * 100));
  } catch {
    return 0;
  }
}

const STORAGE_KEY = "saa-home-state";

const defaultState: Required<PersistedHomeState> = {
  overallPercent: 0,
  completedTopics: 0,
  totalTopics: ROADMAP_STEPS.length,
  studyHours: 0,
  quizAccuracy: 0,
  termsMastery: 0,
  comparisonMastery: 0,
  streakDays: 0,
  reviewedToday: 0,
  weakDomain: "データなし",
  lastVisitedPath: "/quiz",
};

function createFallbackAnalytics(): StudyAnalytics {
  const fallbackQuestion = quizQuestions[0];
  const fallbackCategory = fallbackQuestion?.category ?? "Storage";

  return {
    priorities: [
      {
        category: fallbackCategory,
        score: 0,
        reviewCount: 0,
        recentMistakes: 0,
        recentAttempts: 0,
        accuracy: null,
        unattemptedCount: quizQuestions.filter(
          (q) => q.category === fallbackCategory,
        ).length,
        lastAttemptAt: null,
      },
    ],
    recommendation: {
      focusCategory: fallbackCategory,
      nextQuestionId: fallbackQuestion?.id ?? "",
      quizHref: fallbackQuestion ? `/quiz?questionId=${fallbackQuestion.id}` : "/quiz",
      reviewHref: "/review",
      comparisonsHref: "/comparisons",
      reason:
        "保存済みの学習状況は読み込み後に反映されます。まずは次の 1 問から始めましょう。",
    },
    totalAttempts: 0,
    overallAccuracy: 0,
    reviewedToday: 0,
    recentMistakes: 0,
    streakDays: 0,
  };
}

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

type BuildHomeSnapshotOptions = {
  analytics?: StudyAnalytics;
};

export function buildHomeSnapshot(
  state: PersistedHomeState,
  options: BuildHomeSnapshotOptions = {},
): HomeSnapshot {
  const merged = { ...defaultState, ...state };
  const analytics = options.analytics ?? createFallbackAnalytics();
  const topPriorities =
    analytics.priorities.length > 0
      ? analytics.priorities.slice(0, 3)
      : createFallbackAnalytics().priorities;
  const focusCategory = analytics.recommendation.focusCategory || merged.weakDomain;
  const focusQuestion = quizQuestions.find(
    (question) => question.id === analytics.recommendation.nextQuestionId,
  );
  const quizAccuracy =
    analytics.totalAttempts > 0 ? analytics.overallAccuracy : merged.quizAccuracy;
  const reviewedToday =
    analytics.reviewedToday > 0 ? analytics.reviewedToday : merged.reviewedToday;
  const streakDays = analytics.streakDays > 0 ? analytics.streakDays : merged.streakDays;
  const weakDomain = topPriorities[0]?.category ?? merged.weakDomain;

  const categoryStats = analytics.priorities.map((p) => ({
    category: p.category,
    accuracy: p.accuracy,
    totalAttempts: p.recentAttempts,
    unattemptedCount: p.unattemptedCount,
  }));

  return {
    hero: {
      primaryLabel: `${focusCategory} の次の 1 問から始める`,
      primaryDescription: analytics.recommendation.reason,
      primaryHref: analytics.recommendation.quizHref || "/quiz",
      secondaryHref: merged.lastVisitedPath,
      metrics: [
        {
          label: "学習継続日数",
          value: `${streakDays}日`,
          caption: "連続して学習できている日数",
        },
        {
          label: "今日の復習",
          value: `${reviewedToday}件`,
          caption: "直近 24 時間で見直した問題数",
        },
        {
          label: "弱点カテゴリ",
          value: weakDomain,
          caption: "次に優先して取り組む領域",
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
          label: "クイズ正答率",
          value: `${quizAccuracy}%`,
          caption: "演習全体の回答結果を反映",
        },
        {
          label: "用語理解",
          value: `${merged.termsMastery}%`,
          caption: "ロードマップで既読にした用語の割合",
        },
        {
          label: "比較判断",
          value: `${merged.comparisonMastery}%`,
          caption: "確認済みの比較テーマの割合",
        },
      ],
      bars: [
        {
          label: "用語理解",
          value: merged.termsMastery,
          caption: "ロードマップで既読にした用語の割合",
        },
        {
          label: "比較判断",
          value: merged.comparisonMastery,
          caption: "確認済みの比較テーマの割合",
        },
        {
          label: "クイズ精度",
          value: quizAccuracy,
          caption: "最近の回答でどれだけ安定して選べているか",
        },
      ],
    },
    paths: [
      {
        key: "terms",
        title: "用語の使い分けを言葉で整理する",
        description:
          "クイズで迷ったカテゴリに出てくるサービス名を、用途とセットで確認して理解を固める流れです。",
        reason: "判断の土台になる言葉が曖昧だと、問題文を読んでも選択肢の差が見えにくくなります。",
        cta: "用語学習へ進む",
        href: "/terms",
        pace: "ウォームアップ",
      },
      {
        key: "comparisons",
        title: `${focusCategory} を比較で理解する`,
        description:
          "似たサービスを並べて見比べながら、なぜその選択が最適なのかを整理する流れです。",
        reason: `${focusCategory} は今の弱点カテゴリなので、比較の判断軸を先に整える効果が高いです。`,
        cta: "比較表へ進む",
        href: "/comparisons",
        pace: "判断軸づくり",
      },
      {
        key: "quiz",
        title: `${focusCategory} の問題演習に進む`,
        description:
          "復習リストに保存された誤答カテゴリと最近の回答状況から、次に解くべき問題を優先して出題します。",
        reason: analytics.recommendation.reason,
        cta: "問題演習へ進む",
        href: analytics.recommendation.quizHref || "/quiz",
        pace: "本番演習",
      },
    ],
    weakCategories: topPriorities.map((priority) => ({
      category: priority.category,
      detail:
        priority.reviewCount > 0
          ? `復習リスト ${priority.reviewCount} 件 / 直近の誤答 ${priority.recentMistakes} 件`
          : `直近の誤答 ${priority.recentMistakes} 件 / 未着手 ${priority.unattemptedCount} 問`,
    })),
    focus: {
      title: `${focusCategory} を今日の主軸にする`,
      description:
        focusQuestion?.comparePoint ??
        `${focusCategory} は似た選択肢の差を言葉にできるようにすると、一気に正答率が安定しやすいカテゴリです。`,
      whyNow: analytics.recommendation.reason,
      href: analytics.recommendation.quizHref || "/quiz",
      readiness: Math.round(
        (merged.termsMastery + merged.comparisonMastery) / 2,
      ),
      stepTitle: `${focusCategory} をステップで見直す`,
      stepDescription:
        "解いた問題を起点に、解説と比較ポイントまで一連の流れで確認できる構成にしています。",
      checkpoints: [
        {
          label: "次の 1 問",
          value: focusQuestion?.prompt ?? "問題データの準備後に、次の 1 問を表示します。",
        },
        {
          label: "覚える軸",
          value:
            focusQuestion?.rememberAxis ??
            "正解だけでなく、他の選択肢を外せる理由まで言えるようにしていきましょう。",
        },
        {
          label: "復習の状況",
          value: `${focusCategory} に復習 ${topPriorities[0]?.reviewCount ?? 0} 件 / 直近の誤答 ${topPriorities[0]?.recentMistakes ?? 0} 件`,
        },
      ],
      actions: [
        `まずは ${focusCategory} の問題演習を 1 問解く`,
        "解説を読みながら、誤答の理由と正答の理由をセットで確認する",
        "まだ迷う場合は比較表に戻って、似たサービスとの違いを整理する",
      ],
    },
    categoryStats,
  };
}

export function buildClientHomeSnapshot(state: PersistedHomeState): HomeSnapshot {
  const termsMastery = readTermsMastery();
  const comparisonMastery = readComparisonMastery();
  const { completedTopics, totalTopics, overallPercent } = readRoadmapProgress();
  return buildHomeSnapshot(
    { ...state, termsMastery, comparisonMastery, completedTopics, totalTopics, overallPercent },
    { analytics: buildStudyAnalytics() },
  );
}
