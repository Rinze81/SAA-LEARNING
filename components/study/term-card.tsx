import { StatusChip } from "@/components/ui/status-chip";
import type { StudyTerm } from "@/lib/study/terms";

type TermCardProps = {
  term: StudyTerm;
};

export function TermCard({ term }: TermCardProps) {
  return (
    <article className="rounded-[1.5rem] border border-slate-800/80 bg-slate-950/75 p-5 shadow-[0_18px_60px_rgba(2,6,23,0.28)] sm:p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <StatusChip label={term.category} tone="accent" />
          <StatusChip label="基礎用語" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
            {term.name}
          </h2>
          <p className="text-sm leading-7 text-slate-200 sm:text-[15px]">
            {term.shortDefinition}
          </p>
        </div>

        <section className="rounded-[1.25rem] border border-slate-800 bg-slate-900/65 p-4">
          <p className="text-xs tracking-[0.16em] text-slate-500">意味</p>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            {term.description}
          </p>
        </section>

        <div className="grid gap-3 sm:grid-cols-2">
          <section className="rounded-[1.25rem] border border-sky-900/45 bg-sky-950/30 p-4">
            <p className="text-xs tracking-[0.16em] text-sky-300">
              試験でどう出るか
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-200">
              {term.examTip}
            </p>
          </section>

          <section className="rounded-[1.25rem] border border-emerald-900/45 bg-emerald-950/25 p-4">
            <p className="text-xs tracking-[0.16em] text-emerald-300">
              関連サービス / 関連概念
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {term.related.map((item) => (
                <span
                  key={`${term.id}-${item}`}
                  className="inline-flex min-h-[32px] items-center rounded-full border border-emerald-900/45 bg-emerald-950/35 px-3 py-1 text-xs text-emerald-100"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
