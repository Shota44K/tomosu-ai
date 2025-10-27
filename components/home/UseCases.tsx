const USE_CASES = [
  {
    title: "AIお問合せ対応システム",
    description:
      "問い合わせ対応への回答を自動化し、顧客満足度の向上と担当者の対応時間の短縮を実現。",
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
      "社内の膨大な資料から、必要な情報をAIが瞬時に探し出す。業務の効率性及び属人化を解消。",
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
    title: "資料作成補助システム",
    description:
      "営業提案資料の作成工数を削減。過去提案資料に基づいた高品質な資料の作成をサポート。",
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
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-8 lg:px-12">
        <header className="text-center md:text-left mb-9">
          <span className="inline-flex w-full max-w-[16rem] items-center justify-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary mb-9">
            AIシステム開発実績
          </span>
          <h2 className="text-2xl font-bold text-primary md:text-3xl">
            AIシステム開発実績
          </h2>
        </header>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {USE_CASES.map((useCase) => (
            <article
              key={useCase.title}
              className="flex flex-col gap-4 rounded-2xl border border-primary/10 bg-white p-6 shadow-sm"
            >
              <div className="min-h-[4rem] space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {useCase.icon}
                </div>
                <h3 className="text-xl font-semibold leading-snug text-primary">
                  {useCase.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-text/80">
                {useCase.description}
              </p>
            </article>
          ))}
        </div>
        <div className="hidden mt-10 text-center md:block">
          <a
            href="#contact"
            className="hidden min-w-[12rem] items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow transition hover:bg-primary/90 md:inline-flex"
          >
            無料で相談する（30分） &gt;
          </a>
        </div>
      </div>
    </section>
  );
}
