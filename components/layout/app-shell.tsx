"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { TopContextBar } from "@/components/layout/top-context-bar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen pb-28">
      <TopContextBar pathname={pathname} />
      <div className="pt-16">{children}</div>
      <MobileBottomNav pathname={pathname} />
    </div>
  );
}
