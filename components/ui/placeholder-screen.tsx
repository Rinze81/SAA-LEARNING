import Link from "next/link";

type PlaceholderScreenProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PlaceholderScreen({
  eyebrow,
  title,
  description,
}: PlaceholderScreenProps) {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-4xl gap-6">
        <section className="rounded-[2rem] border border-slate-800 bg-slate-950/80 p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.32em] text-slate-500">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-slate-100 px-5 text-sm font-semibold text-slate-950"
            >
              ホームへ戻る
            </Link>
            <div className="inline-flex min-h-[48px] items-center rounded-full border border-slate-800 px-5 text-sm text-slate-300">
              UI の器だけ先に用意済み
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
