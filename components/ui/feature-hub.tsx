import Link from "next/link";
import { SectionFrame } from "@/components/ui/section-frame";

type FeatureLink = {
  href: string;
  label: string;
  description: string;
};

type FeatureHubProps = {
  eyebrow: string;
  title: string;
  description: string;
  role: string;
  nextStep: string;
  links: FeatureLink[];
};

export function FeatureHub({
  eyebrow,
  title,
  description,
  role,
  nextStep,
  links,
}: FeatureHubProps) {
  return (
    <main className="min-h-screen px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-5">
        <SectionFrame
          eyebrow={eyebrow}
          title={title}
          description={description}
        >
          <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[1.35rem] border border-slate-800 bg-slate-900/60 p-4 sm:p-5">
              <p className="text-[11px] tracking-[0.18em] text-slate-500">この画面の役割</p>
              <p className="mt-2 text-sm leading-7 text-slate-200">{role}</p>
            </div>
            <div className="rounded-[1.35rem] border border-slate-800 bg-slate-900/45 p-4 sm:p-5">
              <p className="text-[11px] tracking-[0.18em] text-slate-500">次に足すもの</p>
              <p className="mt-2 text-sm leading-7 text-slate-200">{nextStep}</p>
            </div>
          </div>
        </SectionFrame>

        <SectionFrame
          eyebrow="導線"
          title="ここから次に進めるようにしておく"
          description="各ページが孤立しないように、次に行く候補だけを最低限つないでいます。"
        >
          <div className="grid gap-3 md:grid-cols-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-[1.25rem] border border-slate-800 bg-slate-900/55 p-4 transition hover:border-slate-700 hover:bg-slate-900"
              >
                <p className="text-sm font-medium text-slate-100">{link.label}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {link.description}
                </p>
              </Link>
            ))}
          </div>
        </SectionFrame>
      </div>
    </main>
  );
}
