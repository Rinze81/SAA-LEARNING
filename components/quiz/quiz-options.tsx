import { SectionFrame } from "@/components/ui/section-frame";
import type { useQuizSession } from "@/lib/quiz/use-quiz-session";
import { QuizOptionCard } from "@/components/quiz/quiz-option-card";

type QuizOptionsProps = {
  session: ReturnType<typeof useQuizSession>;
};

export function QuizOptions({ session }: QuizOptionsProps) {
  return (
    <SectionFrame
      eyebrow="選択肢"
      title={session.isSubmitted ? "選択結果を比較する" : "4択から最も合うものを選ぶ"}
      description={
        session.isSubmitted
          ? "回答後は、正解・自分の選択・違いを見比べられる状態に切り替わります。"
          : "押しやすさを優先したカード型です。迷ったら要件に戻って選びます。"
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
