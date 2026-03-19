export type ReviewRecord = {
  questionId: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  category: string;
  timestamp: number;
};
