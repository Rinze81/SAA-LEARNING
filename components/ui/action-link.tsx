import Link from "next/link";
import type { ReactNode } from "react";

type ActionLinkProps = {
  href: string;
  children: ReactNode;
  label: string;
  tone?: "primary" | "muted";
  className?: string;
};

export function ActionLink({
  href,
  children,
  label,
  tone = "primary",
  className = "",
}: ActionLinkProps) {
  const toneClass =
    tone === "primary"
      ? "bg-slate-100 text-slate-950"
      : "border border-slate-800 bg-slate-900 text-slate-100";

  return (
    <Link
      href={href}
      className={`inline-flex min-h-[52px] items-center justify-center rounded-full px-5 text-sm font-semibold transition hover:-translate-y-0.5 sm:min-h-[48px] ${toneClass} ${className}`}
    >
      <span className="sr-only">{label}</span>
      {children}
    </Link>
  );
}
