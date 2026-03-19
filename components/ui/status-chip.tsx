type StatusChipProps = {
  label: string;
  tone?: "default" | "accent" | "success" | "danger";
};

export function StatusChip({
  label,
  tone = "default",
}: StatusChipProps) {
  const toneClass = {
    default: "border-slate-800 bg-slate-900 text-slate-300",
    accent: "border-sky-900/70 bg-sky-950/60 text-sky-200",
    success: "border-emerald-900/70 bg-emerald-950/60 text-emerald-200",
    danger: "border-rose-900/70 bg-rose-950/60 text-rose-200",
  }[tone];

  return (
    <span
      className={`inline-flex min-h-[32px] items-center rounded-full border px-3 py-1 text-[11px] tracking-[0.16em] ${toneClass}`}
    >
      {label}
    </span>
  );
}
