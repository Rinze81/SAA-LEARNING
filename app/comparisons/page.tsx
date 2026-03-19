import { FeatureHub } from "@/components/ui/feature-hub";

export default function ComparisonsPage() {
  return (
    <FeatureHub
      eyebrow="比較"
      title="似たサービスの違いを整理する場所"
      description="SAA で迷いやすい『結局どちらを選ぶのか』を、保存先やネットワークなどの観点で整理するページです。"
      role="用語理解を、選択肢を切るための判断軸に変える役割を持たせます。"
      nextStep="既存の比較データや解説をつないで、サービス差分をテーマ単位で見られる形に広げます。"
      links={[
        {
          href: "/quiz",
          label: "問題に進む",
          description: "整理した違いを、そのまま問題で確認します。",
        },
        {
          href: "/review",
          label: "復習へ送る",
          description: "迷いが残るテーマを復習の受け皿へつなぎます。",
        },
        {
          href: "/terms",
          label: "用語へ戻る",
          description: "定義から戻したいときは用語ページへ戻ります。",
        },
      ]}
    />
  );
}
