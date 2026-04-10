export type AppNavItem = {
  href: "/" | "/terms" | "/comparisons" | "/quiz" | "/review" | "/roadmap" | "/mock-exam";
  label: string;
  shortLabel: string;
  description: string;
};

export const appNavItems: AppNavItem[] = [
  {
    href: "/",
    label: "ホーム",
    shortLabel: "Home",
    description: "全体の現在地と次の一歩を確認する画面",
  },
  {
    href: "/terms",
    label: "用語",
    shortLabel: "Terms",
    description: "重要サービスの役割を短く思い出す画面",
  },
  {
    href: "/comparisons",
    label: "比較",
    shortLabel: "Compare",
    description: "似たサービスの違いを整理する画面",
  },
  {
    href: "/quiz",
    label: "問題",
    shortLabel: "Quiz",
    description: "問題を解いて理由まで理解する画面",
  },
  {
    href: "/review",
    label: "復習",
    shortLabel: "Review",
    description: "あとで見直すテーマを集める画面",
  },
  {
    href: "/roadmap",
    label: "地図",
    shortLabel: "Map",
    description: "どの順番で用語を学ぶかを示すロードマップ",
  },
  {
    href: "/mock-exam",
    label: "模試",
    shortLabel: "Exam",
    description: "65問・130分の本番形式模擬試験",
  },
];

export function getNavItem(pathname: string) {
  return appNavItems.find((item) => item.href === pathname) ?? appNavItems[0];
}
