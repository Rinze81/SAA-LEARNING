export type Difficulty = 'basic' | 'standard' | 'advanced';

export type QuizFilter = {
  category: string;       // "all" or specific category name
  difficulty: Difficulty | 'all';
  untriedOnly: boolean;   // show only questions not in saa-quiz-attempts
  reviewOnly: boolean;    // show only questions in saa-review-records
};

export const DEFAULT_QUIZ_FILTER: QuizFilter = {
  category: "all",
  difficulty: "all",
  untriedOnly: false,
  reviewOnly: false,
};

export type QuizOption = {
  id: string;
  label: string;
  text: string;
  hint?: string;
};

export type QuizQuestion = {
  id: string;
  category: string;
  prompt: string;
  context?: string;
  choices: QuizOption[];
  correctChoiceId: string;
  explanation: string;
  comparePoint: string;
  rememberAxis: string;
  modeLabel: string;
  relatedTerms?: string[];
  difficulty: Difficulty;
};

export type QuizAnswerState = {
  selectedChoiceId: string | null;
  isSubmitted: boolean;
  isCorrect: boolean | null;
};
