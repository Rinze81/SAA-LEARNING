import { FeatureHub } from "@/components/ui/feature-hub";

export default function TermsPage() {
  return (
    <FeatureHub
      eyebrow="用語"
      title="重要サービスの役割を短く思い出す場所"
      description="まずは各サービスが何をするものかを戻すためのページです。ホームや問題演習の前に頭を温める入口として使います。"
      role="細かい仕様を覚える前に、EC2・S3・RDS などの責務を短く確認する役割を持たせます。"
      nextStep="既存 data / types をつないで、用語カードやカテゴリ別の見直しに広げやすい土台にします。"
      links={[
        {
          href: "/comparisons",
          label: "比較へ進む",
          description: "用語を思い出したあと、違いの整理に進みます。",
        },
        {
          href: "/quiz",
          label: "問題で確かめる",
          description: "思い出した内容を問題で確認します。",
        },
        {
          href: "/",
          label: "ホームへ戻る",
          description: "全体の進み具合と次の一歩を確認します。",
        },
      ]}
    />
  );
}
