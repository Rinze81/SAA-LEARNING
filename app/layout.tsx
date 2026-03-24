import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";

export const metadata: Metadata = {
  title: "AWS SAA Learning App",
  description: "AWS SAA learning dashboard",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
