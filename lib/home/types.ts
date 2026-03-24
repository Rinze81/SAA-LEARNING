export type HeroMetric = {
  label: string;
  value: string;
  caption: string;
};

export type ProgressHighlight = {
  label: string;
  value: string;
  caption: string;
};

export type ProgressBarItem = {
  label: string;
  value: number;
  caption: string;
};

export type LearningPath = {
  key: "terms" | "comparisons" | "quiz";
  title: string;
  description: string;
  reason: string;
  cta: string;
  href: string;
  pace: string;
};

export type FocusCheckpoint = {
  label: string;
  value: string;
};

export type CategoryStat = {
  category: string;
  accuracy: number | null;
  totalAttempts: number;
  unattemptedCount: number;
};

export type HomeSnapshot = {
  hero: {
    primaryLabel: string;
    primaryDescription: string;
    primaryHref: string;
    secondaryHref: string;
    metrics: HeroMetric[];
  };
  progress: {
    overallPercent: number;
    completedTopics: number;
    totalTopics: number;
    studyHours: number;
    highlights: ProgressHighlight[];
    bars: ProgressBarItem[];
  };
  categoryStats: CategoryStat[];
  paths: LearningPath[];
  weakCategories: {
    category: string;
    detail: string;
  }[];
  focus: {
    title: string;
    description: string;
    whyNow: string;
    href: string;
    readiness: number;
    stepTitle: string;
    stepDescription: string;
    checkpoints: FocusCheckpoint[];
    actions: string[];
  };
};

export type PersistedHomeState = {
  overallPercent?: number;
  completedTopics?: number;
  totalTopics?: number;
  studyHours?: number;
  quizAccuracy?: number;
  termsMastery?: number;
  comparisonMastery?: number;
  streakDays?: number;
  reviewedToday?: number;
  weakDomain?: string;
  lastVisitedPath?: string;
};
