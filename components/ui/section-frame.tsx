import type { ReactNode } from "react";

type SectionFrameProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  aside?: ReactNode;
  className?: string;
};

export function SectionFrame({
  eyebrow,
  title,
  description,
  children,
  aside,
  className = "",
}: SectionFrameProps) {
  return (
    <section
      className={`rounded-[1.75rem] border border-slate-800/80 bg-slate-950/70 p-5 backdrop-blur sm:rounded-[2rem] sm:p-7 lg:p-8 ${className}`}
    >
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2.5">
            {eyebrow ? (
              <p className="text-[11px] tracking-[0.22em] text-slate-500 sm:text-xs sm:tracking-[0.28em]">
                {eyebrow}
              </p>
            ) : null}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl lg:text-3xl">
                {title}
              </h2>
              {description ? (
                <p className="max-w-2xl text-sm leading-6 text-slate-400 sm:text-[15px] sm:leading-7">
                  {description}
                </p>
              ) : null}
            </div>
          </div>
          {aside}
        </div>
        {children}
      </div>
    </section>
  );
}
