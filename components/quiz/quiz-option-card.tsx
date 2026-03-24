import type { QuizOption } from "@/lib/quiz/types";

function CheckIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

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
  let containerClass =
    "border-slate-800 bg-slate-900/55 hover:border-slate-700 hover:bg-slate-900/80";
  let labelClass = "border-current/20 bg-slate-950/60 text-slate-100";

  if (isSubmitted && isCorrectChoice) {
    containerClass = "border-emerald-600/70 bg-emerald-950/40";
    labelClass = "border-emerald-600/40 bg-emerald-900/40 text-emerald-300";
  } else if (isSubmitted && isWrongSelected) {
    containerClass = "border-rose-600/70 bg-rose-950/40";
    labelClass = "border-rose-600/40 bg-rose-900/40 text-rose-300";
  } else if (isSelected) {
    containerClass = "border-sky-600/60 bg-sky-950/35";
    labelClass = "border-sky-600/40 bg-sky-900/30 text-sky-200";
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={isSubmitted}
      className={`grid min-h-[56px] w-full grid-cols-[auto_1fr] gap-4 rounded-[1.25rem] border p-4 text-left transition-all duration-200 active:scale-[0.98] sm:min-h-[60px] sm:p-5 ${containerClass}`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-all duration-200 ${labelClass}`}
      >
        {isSubmitted && isCorrectChoice ? (
          <CheckIcon />
        ) : isSubmitted && isWrongSelected ? (
          <XIcon />
        ) : (
          option.label
        )}
      </span>
      <span className="space-y-1 self-center">
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
