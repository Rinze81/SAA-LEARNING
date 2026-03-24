import { QuizExperience } from "@/components/quiz/quiz-experience";

type QuizPageProps = {
  searchParams?: {
    questionId?: string;
    category?: string;
  };
};

export default function QuizPage({ searchParams }: QuizPageProps) {
  return (
    <QuizExperience
      initialQuestionId={searchParams?.questionId}
      initialCategory={searchParams?.category}
    />
  );
}
