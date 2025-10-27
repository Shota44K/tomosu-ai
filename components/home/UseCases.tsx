'use client';

const USE_CASES = [
  {
    industry: "消費財メーカー",
    title: "消費者向けAIチャットボット",
    description:
      "商品の選び方や利用方法などの悩みを解決するAIチャットボットによりユーザー体験を向上。",
    achievement: "ユーザー満足度・アプリの継続利用率向上",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        className="h-6 w-6"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <circle cx="9" cy="10" r="1" />
        <circle cx="15" cy="10" r="1" />
        <path d="M9 14a5 5 0 0 0 6 0" />
      </svg>
    ),
  },
  {
    industry: "一般財団法人",
    title: "公共文章に関するQAチャット",
    description:
      "膨大な専門文章を扱う業務をRAGシステムで効率化。テキストだけでなく、図表を含めた正確な検索性能を実現。",
    achievement: "専任要員の80%減を達成",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        className="h-6 w-6"
      >
        <path d="M3 3v18h18" />
        <path d="M18 17V9" />
        <path d="M13 17V5" />
        <path d="M8 17v-3" />
      </svg>
    ),
  },
  {
    industry: "工業製品メーカー",
    title: "社内ナレッジ検索AI",
    description:
      "膨大な技術文書や製品情報から必要な情報を検索。顧客対応業務の効率化を実現。",
    achievement: "技術者の顧客対応時間削減",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        className="h-6 w-6"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <path d="M8 7h8" />
        <path d="M8 11h8" />
        <path d="M8 15h6" />
      </svg>
    ),
  },
  {
    industry: "税理士法人",
    title: "財務申告業務効率化AI",
    description:
      "会計データに基づいて適用可能控除の抽出を担うAIソリューションを開発中。",
    achievement: "現在、無償PoC推進中",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        className="h-6 w-6"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8" />
        <path d="M8 17h8" />
        <path d="M8 9h2" />
      </svg>
    ),
  },
];

export default function UseCases() {
  return (
    <section id="usecases" className="bg-white/90">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-8 lg:px-12">
        <header className="text-center md:text-left mb-9">
          <span className="inline-flex w-full max-w-[16rem] items-center justify-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary mb-9">
            開発実績
          </span>
          <h2 className="text-2xl font-bold text-primary md:text-3xl">
            <span className="hidden md:inline">幅広い業界において、AIシステムを開発しています</span>
            <span className="block md:hidden">幅広い業界において、</span>
            <span className="block md:hidden">AIシステムを開発しています</span>
          </h2>
        </header>
        
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:gap-8">
          {USE_CASES.map((useCase) => (
            <article
              key={useCase.title}
              className="flex flex-col gap-5 rounded-2xl border border-primary/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* ヘッダー部分 */}
              <div className="flex items-center gap-4">
                <div className="flex h-12.5 w-12.5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {useCase.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-block rounded-full bg-accent/10 px-3 py-0.5 text-xs font-semibold text-accent mb-2">
                    {useCase.industry}
                  </span>
                  <h3 className="text-lg font-bold leading-snug text-primary">
                    {useCase.title}
                  </h3>
                </div>
              </div>

              {/* 説明文 */}
              <p className="text-sm leading-relaxed text-text/80">
                {useCase.description}
              </p>

              {/* 成果 */}
              <div className="mt-auto pt-4 border-t border-primary/10">
                <div className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-5 w-5 shrink-0 text-accent mt-0.5"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <p className="text-sm font-semibold leading-relaxed text-primary">
                    {useCase.achievement}
                  </p>
                </div>
              </div>
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