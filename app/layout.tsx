import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk, Noto_Sans_JP } from "next/font/google";
import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const bodyFont = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "AWS SAA Learning App",
  description: "AWS SAA learning dashboard",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" className="dark">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} bg-slate-950 text-slate-100 antialiased`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
