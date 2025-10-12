import type { Metadata } from "next";

const COMPANY_INFO = [
  { label: "会社名", value: "tomosu-AI" },
  { label: "所在地", value: "〒XXX-XXXX 〇〇県〇〇市〇〇 X-X-X" },
  { label: "設立", value: "2025年10月" },
  { label: "代表者", value: "甲浦 翔太" },
  { label: "連絡先", value: "shota.koura@tomosu-ai.com" },
];

export const metadata: Metadata = {
  title: "会社概要 | tomosu-AI",
  description:
    "tomosu-AIの会社概要ページです。所在地、設立、提供サービスの体制などをご紹介します。",
};

export default function CompanyPage() {
  return (
    <main className="bg-base text-text">
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-4xl px-4 py-20">
          <p className="text-sm font-semibold text-white/80">Company</p>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">
            会社概要
          </h1>
          <p className="mt-6 text-base text-white/80">
            tomosu-AIは、中堅・中小企業の経営課題をAIで解決することをミッションに、
            試作品の無償開発から本開発・運用までを伴走するパートナーです。
          </p>
        </div>
      </section>
      <section className="bg-white/90">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <h2 className="text-2xl font-bold text-primary md:text-3xl">基本情報</h2>
          <dl className="mt-8 grid gap-4 text-sm text-text/80">
            {COMPANY_INFO.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-1 rounded-2xl border border-primary/10 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between"
              >
                <dt className="font-semibold text-text md:w-40">{item.label}</dt>
                <dd className="md:flex-1">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="bg-base">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <h2 className="text-2xl font-bold text-primary md:text-3xl">提供価値</h2>
          <div className="mt-8 space-y-6">
            <article className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-primary">事業内容</h3>
              <p className="mt-3 text-sm leading-relaxed text-text/80">
                中堅・中小企業向けに、生成AIや機械学習を活用した業務システムの
                企画・開発・運用をワンストップで提供しています。無料相談から開始し、
                短期間で効果検証ができる試作品開発を通じて投資判断を支援します。
              </p>
            </article>
            <article className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-primary">強み</h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-text/80">
                <li>大手コンサルティングファーム出身メンバーによる経営課題の深い理解</li>
                <li>企画から運用まで一気通貫で対応する小規模精鋭チーム</li>
                <li>試作品無償提供によるリスクゼロの投資判断プロセス</li>
              </ul>
            </article>
            <article className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-primary">お問い合わせ</h3>
              <p className="mt-3 text-sm leading-relaxed text-text/80">
                サービス内容に関するご質問や取材のご依頼は、
                <a
                  href="mailto:shota.koura@tomosu-ai.com"
                  className="text-primary underline underline-offset-4"
                >
                  shota.koura@tomosu-ai.com
                </a>
                までご連絡ください。
                また、Webサイトの「相談する」ボタンからもお問い合わせいただけます。
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

