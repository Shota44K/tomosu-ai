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
        </div>
      </section>
      <section className="bg-white/90">
        <div className="mx-auto max-w-4xl px-4 py-16">
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
    </main>
  );
}

