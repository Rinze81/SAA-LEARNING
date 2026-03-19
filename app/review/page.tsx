import { FeatureHub } from "@/components/ui/feature-hub";

export default function ReviewPage() {
  return (
    <FeatureHub
      eyebrow="復習"
      title="あとで見直すテーマを集める場所"
      description="クイズで迷った問題や、比較し直したいテーマをここに戻してくる前提のページです。"
      role="今は骨組みだけですが、今後は復習リスト、苦手カテゴリ、やり直し導線の受け皿になります。"
      nextStep="quiz の復習登録や正答率履歴をつなげて、あとで見返す価値が高い画面に育てます。"
      links={[
        {
          href: "/quiz",
          label: "問題に戻る",
          description: "解きながら復習対象を追加する流れに戻ります。",
        },
        {
          href: "/comparisons",
          label: "比較で整理する",
          description: "違いが曖昧だったテーマを比較画面で戻します。",
        },
        {
          href: "/",
          label: "ホームで全体を見る",
          description: "今日の一歩と進み具合を見直します。",
        },
      ]}
    />
  );
}
