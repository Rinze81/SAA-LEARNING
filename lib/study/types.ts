export type QuizAttemptRecord = {
  questionId: string;
  category: string;
  isCorrect: boolean;
  timestamp: number;
};

export type CategoryPriority = {
  category: string;
  score: number;
  reviewCount: number;
  recentMistakes: number;
  recentAttempts: number;
  accuracy: number | null;
  unattemptedCount: number;
  lastAttemptAt: number | null;
};

export type StudyRecommendation = {
  focusCategory: string;
  nextQuestionId: string;
  quizHref: string;
  reviewHref: string;
  comparisonsHref: string;
  reason: string;
};

export type StudyAnalytics = {
  priorities: CategoryPriority[];
  recommendation: StudyRecommendation;
  totalAttempts: number;
  overallAccuracy: number;
  reviewedToday: number;
  recentMistakes: number;
  streakDays: number;
};
