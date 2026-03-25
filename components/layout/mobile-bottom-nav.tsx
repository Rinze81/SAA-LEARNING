"use client";

import Link from "next/link";
import { appNavItems } from "@/lib/navigation";

type MobileBottomNavProps = {
  pathname: string;
};

export function MobileBottomNav({ pathname }: MobileBottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-800/90 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-6 gap-1 px-2 py-2 sm:px-4">
        {appNavItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-h-[58px] flex-col items-center justify-center rounded-2xl px-2 text-center transition-all duration-150 active:scale-95 active:opacity-80 ${
                isActive
                  ? "bg-slate-100 text-slate-950"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              }`}
            >
              <span className="text-[11px] font-medium tracking-[0.18em]">
                {item.shortLabel}
              </span>
              <span className="mt-1 text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
