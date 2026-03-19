import type { QuizOption } from "@/lib/quiz/types";

type QuizOptionCardProps = {
  option: QuizOption;
  isSelected: boolean;
  isSubmitted: boolean;
  isCorrectChoice: boolean;
  isWrongSelected: boolean;
  onSelect: () => void;
};

export function QuizOptionCard({
  option,
  isSelected,
  isSubmitted,
  isCorrectChoice,
  isWrongSelected,
  onSelect,
}: QuizOptionCardProps) {
  let stateClass =
    "border-slate-800 bg-slate-900/55 hover:border-slate-700 hover:bg-slate-900";

  if (isSubmitted && isCorrectChoice) {
    stateClass = "border-emerald-700 bg-emerald-950/40";
  } else if (isSubmitted && isWrongSelected) {
    stateClass = "border-rose-700 bg-rose-950/35";
  } else if (isSelected) {
    stateClass = "border-sky-700 bg-sky-950/35";
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={isSubmitted}
      className={`grid min-h-[92px] w-full grid-cols-[auto_1fr] gap-4 rounded-[1.25rem] border p-4 text-left transition sm:min-h-[96px] sm:p-5 ${stateClass}`}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-current/20 bg-slate-950/60 text-sm font-semibold text-slate-100">
        {option.label}
      </span>
      <span className="space-y-1">
        <span className="block text-sm font-medium leading-6 text-slate-100 sm:text-[15px]">
          {option.text}
        </span>
        {option.hint ? (
          <span className="block text-sm leading-6 text-slate-400">
            {option.hint}
          </span>
        ) : null}
      </span>
    </button>
  );
}
