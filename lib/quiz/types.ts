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
};

export type QuizAnswerState = {
  selectedChoiceId: string | null;
  isSubmitted: boolean;
  isCorrect: boolean | null;
};
