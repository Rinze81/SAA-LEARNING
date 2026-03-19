import { StatusChip } from "@/components/ui/status-chip";
import type { ComparisonItem } from "@/lib/study/comparisons";

type ComparisonCardProps = {
  item: ComparisonItem;
};

export function ComparisonCard({ item }: ComparisonCardProps) {
  return (
    <article className="rounded-[1.5rem] border border-slate-800/80 bg-slate-950/75 p-5 shadow-[0_18px_60px_rgba(2,6,23,0.28)] sm:p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <StatusChip label={item.category} tone="accent" />
          <StatusChip label={`${item.services.length} サービス比較`} />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
            {item.title}
          </h2>
          <p className="text-sm leading-7 text-slate-300 sm:text-[15px]">
            {item.summary}
          </p>
        </div>

        <div className="grid gap-3">
          {item.services.map((service) => (
            <section
              key={service.name}
              className="rounded-[1.25rem] border border-slate-800 bg-slate-900/65 p-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-slate-100 sm:text-lg">
                    {service.name}
                  </h3>
                </div>
                <p className="text-sm leading-6 text-slate-400">
                  {service.summary}
                </p>
              </div>

              <dl className="mt-4 grid gap-3">
                {service.points.map((point) => (
                  <div
                    key={`${service.name}-${point.label}`}
                    className="rounded-2xl border border-slate-800/80 bg-slate-950/75 px-4 py-3"
                  >
                    <dt className="text-xs tracking-[0.16em] text-slate-500">
                      {point.label}
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-slate-200">
                      {point.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <section className="rounded-[1.25rem] border border-sky-900/45 bg-sky-950/30 p-4">
            <p className="text-xs tracking-[0.16em] text-sky-300">
              試験での見分けポイント
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-200">
              {item.examTip}
            </p>
          </section>

          <section className="rounded-[1.25rem] border border-emerald-900/45 bg-emerald-950/25 p-4">
            <p className="text-xs tracking-[0.16em] text-emerald-300">結論</p>
            <p className="mt-2 text-sm leading-7 text-slate-200">
              {item.conclusion}
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
