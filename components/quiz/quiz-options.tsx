import { QuizOptionCard } from "@/components/quiz/quiz-option-card";
import { SectionFrame } from "@/components/ui/section-frame";
import type { useQuizSession } from "@/lib/quiz/use-quiz-session";

type QuizOptionsProps = {
  session: ReturnType<typeof useQuizSession>;
};

export function QuizOptions({ session }: QuizOptionsProps) {
  return (
    <SectionFrame
      eyebrow="選択肢"
      title={
        session.isSubmitted
          ? "選択肢を見比べて、判断の差を確認する"
          : "4 つの候補から、最も適切なものを選ぶ"
      }
      description={
        session.isSubmitted
          ? "正解と誤答の違いを見ながら、問題に含まれていた判断軸を確認しましょう。"
          : "料金、可用性、共有責任、アクセスパターンなど、設問に効いている条件を見極めながら選びましょう。"
      }
    >
      <div className="grid gap-3">
        {session.question.choices.map((option) => {
          const isSelected = session.selectedChoiceId === option.id;
          const isCorrectChoice = option.id === session.question.correctChoiceId;
          const isWrongSelected =
            session.isSubmitted && isSelected && !isCorrectChoice;

          return (
            <QuizOptionCard
              key={option.id}
              option={option}
              isSelected={isSelected}
              isSubmitted={session.isSubmitted}
              isCorrectChoice={session.isSubmitted && isCorrectChoice}
              isWrongSelected={Boolean(isWrongSelected)}
              onSelect={() => session.selectChoice(option.id)}
            />
          );
        })}
      </div>
    </SectionFrame>
  );
}
