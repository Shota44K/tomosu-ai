const USE_CASES = [
  {
    title: "AIお問合せ対応システム",
    description:
      "よくある質問への回答を自動化し、顧客満足度（一次解決率）の向上と、担当者の対応時間の短縮を実現します。",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h5"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M17 2v6h6"
        />
      </svg>
    ),
  },
  {
    title: "社内ナレッジ検索システム",
    description:
      "社内の膨大な資料から、必要な情報をAIが瞬時に探し出します。探す時間を90%削減し、業務の属人化を解消します。",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M21 21H3V3"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M7 7h10v10H7z"
        />
      </svg>
    ),
  },
  {
    title: "資料・レポート作成補助システム",
    description:
      "日報や報告書の作成工数を80%削減。データに基づいた高品質な資料を誰でも作成でき、品質の平準化に貢献します。",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M5 4h9l5 5v11a0 0 0 0 1 0 0H5a0 0 0 0 1 0 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9 4v4H5"
        />
      </svg>
    ),
  },
];

export default function UseCases() {
  return (
    <section id="usecases" className="bg-base">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="text-2xl font-bold text-primary md:text-3xl">
          貴社の業務課題を、AIで解決します。
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {USE_CASES.map((useCase) => (
            <article
              key={useCase.title}
              className="flex flex-col gap-4 rounded-2xl border border-primary/10 bg-white p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {useCase.icon}
              </div>
              <h3 className="text-lg font-semibold text-primary">
                {useCase.title}
              </h3>
              <p className="text-sm leading-relaxed text-text/80">
                {useCase.description}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-white shadow transition hover:bg-primary/90"
          >
            相談する
          </a>
        </div>
      </div>
    </section>
  );
}
