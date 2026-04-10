export type MockExamResult = {
  date: string;
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  timeUsed: number;
  categoryBreakdown: {
    [category: string]: { correct: number; total: number };
  };
};

export type MockExamAnswers = Record<number, string>;

export type MockExamSession = {
  questionIds: string[];
  answers: MockExamAnswers;
  currentIndex: number;
  remainingSeconds: number;
  startedAt: string;
};
