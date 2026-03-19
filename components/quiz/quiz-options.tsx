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
      title={session.isSubmitted ? "選択結果を比較して差分をつかむ" : "4つの候補から最も合うものを選ぶ"}
      description={
        session.isSubmitted
          ? "正解、不正解、自分が選んだものの差を見比べて、次回の判断軸に変えます。"
          : "似て見える選択肢ほど、条件との一致で比べるのがポイントです。"
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
