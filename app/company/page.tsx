import type { Metadata } from "next";

const COMPANY_INFO = [
  { label: "会社名", value: "tomosu-AI" },
  { label: "所在地", value: "〒160-0023 東京都新宿区西新宿3丁目3番13号西新宿水間ビル2F" },
  { label: "設立", value: "2025年10月" },
  { label: "代表", value: "甲浦 翔太" },
  { label: "事業内容", value: "生成AI活用コンサルティング、AIシステムの開発" },
];

export const metadata: Metadata = {
  title: "会社概要 | tomosu-AI",
  description:
    "tomosu-AIの会社概要ページです。所在地、設立、提供サービスの体制などをご紹介します。",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

export default function CompanyPage() {
  return (
    <div className="min-h-full bg-white text-text">
      <main>
        <section className="bg-primary text-white">
          <div className="mx-auto max-w-6xl px-4 pt-20 pb-10 sm:px-6 md:px-8 lg:px-12">
            <h1 className="mt-4 text-3xl font-bold md:text-4xl">
              会社概要
            </h1>
          </div>
        </section>
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 pt-4 pb-18 sm:px-6 md:px-8 lg:px-12 lg:pb-31 lg:pt-26 xl:pt-26 xl:py-34">
            <dl className="mt-9 divide-y divide-primary/10 border-t border-primary/10 text-sm text-text">
              {COMPANY_INFO.map((item) => (
                <div
                  key={item.label}
                  className="grid gap-2 py-5 md:grid-cols-[140px_minmax(0,1fr)] md:gap-10"
                >
                  <dt className="text-sm font-medium text-text/70">
                    {item.label}
                  </dt>
                  <dd className="text-base text-text">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
    </div>
  );
}
