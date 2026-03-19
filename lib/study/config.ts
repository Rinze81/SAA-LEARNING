export const STUDY_ANALYTICS_CONFIG = {
  recentWindowDays: 5,
  categoryPriorityWeights: {
    reviewCount: 5,
    recentMistake: 4,
    unattemptedQuestion: 2,
    missingAccuracyPenalty: 2,
    lowAccuracyPenaltyScale: 10,
    lowAccuracyBaseline: 0.75,
    staleDayBoostCap: 3,
  },
  questionOrderWeights: {
    categoryScore: 100,
    categoryRank: 10,
    reviewQuestionBoost: 6,
    unattemptedQuestionBoost: 4,
  },
} as const;
